
const express = require('express');
const { VM } = require('vm2');
const { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } = require('@google/generative-ai');
const Conversation = require('../../models/conversation');

const User = require("../../models/user");
const Doctor = require("../../models/doctor");
const Patient = require("../../models/patient");
const Appointment = require('../../models/appointment');
const Departement = require('../../models/Departement');
const Prescription = require('../../models/prescription');
const Medicine = require('../../models/medicine');

const router = express.Router();

const MODEL_NAME = "gemini-2.0-flash";
const API_KEY = "AIzaSyAYKVzCMMspeEDAm-F4WhuMh0KleyVdi8U";

// 📌 Définir les modèles Mongoose


// 📌 Préparer les modèles en string pour les prompts

async function saveConversation(content, role, userId = null) {
  try {
    if (!['user', 'model'].includes(role)) {
      throw new Error('Invalid role. Must be "user" or "model"');
    }

    // Chercher la dernière conversation du user
    let conversation = await Conversation.findOne({ userId }).sort({ timestamp: -1 });

    if (!conversation) {
      // Créer une nouvelle conversation
      conversation = new Conversation({
        userId,
        question: role === 'user' ? content : '',
        messages: [{ role, content }]
      });
    } else {
      // Ajouter le message à la conversation existante
      conversation.messages.push({ role, content });

      // Mettre à jour la question si ce message est une nouvelle question
      if (role === 'user' && !conversation.question) {
        conversation.question = content;
      }
    }

    // Mettre à jour la réponse finale si c’est le modèle qui parle
    if (role === 'model') {
      conversation.finalResponse = content;
    }

    await conversation.save();
    console.log('Conversation sauvegardée avec succès.');

  } catch (err) {
    console.error('Erreur dans saveConversation:', err);
  }
}

const UserModelAsString = `
{
  email: String,
  username: String,
  password: String,
  activated: Boolean,
  verificationToken: {
    token: String,
    expires: Date
  },
  firstName: String,
  lastName: String,
  userType: 'Admin' | 'Patient' | 'Doctor',
  timestamps: true
}`;

const PatientModelAsString = `
{
  userId: ObjectId (ref: 'User'),
  phone: String,
  address: String,
  gender: String,
  dob: String
}`;

const DoctorModelAsString = `
{
  userId: ObjectId (ref: 'User'),
  phone: String,
  department: String,
  address: String,
  imageUrls: [String]
}`;

const AppointmentModelAsString = `
{
  appointmentDate: Date,  (ex:2025-04-28T00:00:00.000+00:00)
  appointmentTime: String, (ex: "1:00 PM" or "1:00 AM")
  appointmentType: String, (ex: "hospital" or "online" )
  isTimeSlotAvailable: Boolean,
  patientId: ObjectId (ref: 'Patient'),
  doctorId: ObjectId (ref: 'Doctor'),
  completed: Boolean,
  timestamps: true
}`;

const DepartementModelAsString = `
{
  name: String,
  description: String,
  imageUrls: [String]
}`;

const PrescriptionModelAsString = `
{
  appointmentId: ObjectId (ref: 'Appointment'),
  prescribedMed: [{
    medicineId: ObjectId (ref: 'Medicine'),
    dosage: String,
    qty: Number
  }],
  remarks: String,
  paid: Boolean,
  timestamps: true
}`;


const ConversationModelAsString = `
{
  userId: ObjectId (ref: 'User', default: null),
  question: String (required),
  rawResult: Mixed,
  finalResponse: String,
  messages: [{
    role: String (enum: ['user', 'model'], required),
    content: String (required)
  }],
  timestamp: Date (default: Date.now)
}
`;



const MedicineModelAsString = `
{
  company: String,
  name: String,
  description: String,
  price: Number,
  timestamps: true
}`;


// 📌 API POST : /ask
router.post('/', async (req, res) => {
  const { question,selectedLanguage } = req.body;
  console.log('------------------------------------');
  console.log(question);
  console.log(selectedLanguage);
  console.log('------------------------------------');
  await saveConversation(question,"user")

  const prompt = `
Tu es un moteur intelligent connecté à un serveur Node.js utilisant Mongoose avec les modèles suivants :

User: ${UserModelAsString}

Patient: ${PatientModelAsString}

Doctor: ${DoctorModelAsString}

Appointment: ${AppointmentModelAsString}

Departement: ${DepartementModelAsString}

Prescription: ${PrescriptionModelAsString}
Conversation: ${ConversationModelAsString}

Medicine: ${MedicineModelAsString}

Ta mission :
- Si la question POSÉE nécessite une opération de base de données MongoDB (extraction, filtrage, comptage...), réponds uniquement avec une fonction JavaScript auto-exécutée de ce type : (async () => { ... })()
  - Utilise uniquement les modèles ci-dessus.
  - Ne fais aucun (import), ni accès à des fichiers ou packages externes.
  - Retourne directement le résultat (nombre, tableau, string, etc).
  -ne oublier pas la relation entre les table de base de doner atravers les id  pour avoir plus de information sur les unite comme acceder au docteur ou patient  atraver le user id pour avoir des info complete 
  -le resultat de code doit etre claire
  - Tu peux accéder à **ta propre mémoire** via le modèle (Conversation), ce qui te permet de relire des échanges passés (messages, questions, réponses...).

- chaque docteur est lier a un departement a travers le nom de departement   alors tu doit comparer entre  department.name    ==  doctors.department
- Si la question est **générale** ou **ne nécessite pas de code MongoDB**, alors réponds uniquement avec une fonction JavaScript auto-exécutée de ce type : (async () => { ... })() qui return la reponse de question comme chaine de caractere 

Conversation: ${ConversationModelAsString}

Ce modèle représente une conversation enregistrée entre un utilisateur et l’assistant. Voici les champs qui le composent :

- (question): la question initiale posée par l’utilisateur. Ce champ est requis.
- (rawResult): la réponse brute générée par l’assistant avant d’être formatée (peut contenir du texte, du code, ou un résultat structuré).
- (finalResponse): la réponse finale lisible que l’utilisateur voit à l’écran.
- (messages): un tableau représentant l’historique de la conversation. Chaque élément contient :
  - (role): le rôle de l’émetteur du message, soit "user" pour l’utilisateur, soit "model" pour l’assistant.
  - (content): le contenu textuel du message.
- (timestamp): la date et l’heure d’enregistrement de la conversation, générée automatiquement lors de la création.

Architecture de la base de données :

- Chaque utilisateur (User) peut être un 'Admin', 'Patient' ou 'Doctor' selon la valeur du champ 'userType'.
- Chaque Patient est relié à un User via 'userId'.
- Chaque Doctor est relié à un User via 'userId'.

Relations supplémentaires :
- Un Doctor est aussi lié à un Department à travers son champ 'department', qui correspond exactement au 'name' du modèle Department (Department.name == Doctor.department).
 - les nom de departmentdans db pour pas avoir des comflit (Infectious diseases,Radiologie,Orthopedie,Neurologie,Oncologie,Cardiologie)

Recherche de disponibilité par département :

Si la question cherche les docteurs disponibles par nom de département :

D'abord trouver les docteurs dont doctor.department == department.name.

Ensuite, pour chaque docteur, chercher dans les Appointments :

S'il existe des créneaux (isTimeSlotAvailable = true) sans patientId → Ce docteur est disponible.
  
Gestion des Rendez-vous (Appointment) :
- Un rendez-vous (Appointment) possède un doctorId (référence à Doctor) et un patientId (référence à Patient).
- S'il existe un Appointment avec :
  - **doctorId défini** ET **patientId non défini** ET **isTimeSlotAvailable = true** → Cela signifie que **le docteur est disponible** à cet horaire.
  - **doctorId défini** ET **patientId défini** → Cela signifie que **le créneau est réservé par un patient**.
- Le champ 'completed' indique si le rendez-vous s'est **réellement déroulé avec succès** :
  - **completed = true** → Rendez-vous passé avec succès.
  - **completed = false** → Rendez-vous réservé mais pas encore effectué.

Règles importantes pour la recherche :
- Pour savoir si un docteur appartient à un département, compare Doctor.department avec Department.name.
- Pour trouver la disponibilité d'un docteur, recherche les appointments avec doctorId, patientId null et isTimeSlotAvailable true.
- Pour l'historique ou les rendez-vous pris, cherche les appointments où patientId est défini.

Attention :
- Respecte toujours les relations entre modèles via les IDs.
- Les opérations doivent être claires, efficaces et utiliser les bons modèles.


Utilise ce modèle pour :
- retrouver les dernières conversations (par date grâce à (timestamp))
- afficher les questions posées précédemment
- analyser les messages échangés
- sauvegarder un nouvel échange (question/réponse)

Aucun identifiant utilisateur (userId) n’est nécessaire dans ce contexte. Le modèle est donc parfaitement adapté à des interactions anonymes ou globales.




Question :
${question}

`;

  
  const genAI = new GoogleGenerativeAI(API_KEY);
  const model = genAI.getGenerativeModel({ model: MODEL_NAME });

  const generationConfig = {
    temperature: 0.7,
    topK: 0,
    topP: 1,
    maxOutputTokens: 2048,
  };

  const safetySettings = [
    {
      category: HarmCategory.HARM_CATEGORY_HARASSMENT,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
  ];

  const chat = model.startChat({
    generationConfig,
    safetySettings,
    history: [],
  });

  try {
    const result = await chat.sendMessage(prompt);
    console.log("result",result)
    const code = result.response.text().replace(/```(javascript)?/g, '').replace(/```/g, '');
    console.log("code",code)

    // 📌 Exécution sécurisée avec VM2
    const vm = new VM({
sandbox: {
  User,
  Patient,
  Doctor,
  Appointment,
  Departement,
  Prescription,
  Medicine,
  Conversation,
  console // pour pouvoir afficher dans Gemini
},
      timeout: 1000,
    });

    const asyncEval = async () => {
        try {
          return await vm.run(`(${code}); run();`);
        } catch (execErr) {
          console.error("Erreur dans le code généré :", execErr);
          throw new Error("Erreur d'exécution du code généré.");
        }
      };

// Force le code à être une IIFE
const wrappedCode = `${code.replace(/^async function run\(\)\s*{/, '').replace(/}$/, '')}`;
console.log('------------------------------------');
console.log("wrappedCode",wrappedCode);
console.log('------------------------------------');
      
const resultPromise = vm.run(wrappedCode);
const output = await resultPromise;
console.log('------------------------------------');


let outputString = output;

if (typeof output === 'object' && output !== null) {
  try {
    outputString = JSON.stringify(output, null, 2); // Pretty print
  } catch (err) {
    console.error("Erreur de conversion en JSON:", err);
    throw new Error("Impossible de convertir l'objet en JSON");
  }
}

console.log("${outputString}",outputString);
console.log('------------------------------------');

const prompt2 = `

Tu es un assistant intelligent et professionnel. Tu dois générer une réponse humaine, claire, fluide et compréhensible à une question posée par un utilisateur  pas un code js.
❓ Question posée par l'utilisateur :
${question}

📊 Résultat brut de la requête :
${output }
${outputString}
Voici le contexte :
- La question a été posée par un utilisateur final.
- Une réponse brute technique ou synthétique a été obtenue à partir d’une base de données doit etre en lettre  alphabetique.
- Tu dois maintenant formuler une réponse claire, humaine et fluide à partir de cette information.

🎯 Ta mission :
- Identifie la langue utilisée dans la question est  ${selectedLanguage} 
- Utilise exactement cette même langue pour rédiger la réponse.
- Analyse attentivement la question pour comprendre l’intention de l’utilisateur.
- Reformule la réponse brute de manière professionnelle, naturelle, claire et compréhensible.
- Ta réponse doit être complète, informative, bien structurée et agréable à lire.
- Ne te limite pas à reformuler la réponse brute. Enrichis-la si nécessaire pour que l'utilisateur comprenne bien.
- Emploie un ton professionnel, mais accessible.
- Utilise des phrases simples, sans jargon technique, sauf si nécessaire.
- pas de nembre etulisr=er des caractere alphabetique
- L'application est un **système de gestion d'hôpital**, pas un site de e-commerce.
- Les "patients" sont des **patients de l'hôpital**, pas des "clients".
- Les "services", "consultations", "médicaments", "opérations", etc., ne sont **pas des produits commerciaux**.
- Ne jamais utiliser les mots "produits", "clients", "achats", "ventes".
- Utiliser un vocabulaire adapté au domaine médical : "patients", "médecins", "consultations", "services de santé", "traitements", etc.
- La réponse doit donner l'impression de provenir d'un professionnel de la santé ou d'un agent hospitalier.

---
ne jamais repond avec un code 

❓ Question posée par l'utilisateur :
${question}

📊 Résultat brut de la requête :
${output}
${outputString}

---

✍️ Rédige maintenant une réponse fluide, complète et professionnelle, dans la **même langue que la question**.

`;


 console.log('------------------------------------');
    console.log("res",output);
    console.log('------------------------------------');
    console.log("res",prompt2);

const result2 = await chat.sendMessage(prompt2);
const response = result2.response.text().replace(/\*/g, '').replace(/\p{Emoji}/ug, '').replace(/\#/g, '');
await saveConversation(response,"model")
console.log("final res");

console.log("res",response);

res.json({ response });



   // const output = await asyncEval();


   
  } catch (err) {
    console.error("Erreur :", err);
    res.status(500).json({ error: "Erreur lors du traitement de la requête." });
  }
});
module.exports = router;

