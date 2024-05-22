const express = require("express");
const router = express.Router();

const {
    getDoctors,
    getDoctorById,
    saveDoctor,
    updateDoctor,
    editDoctorActivatedStatus,
    deleteDoctor
} = require('../controllers/DoctorController.js');



// Routes pour les fonctionnalités de base des médecins
router.get('/doctors', getDoctors);
router.get('/doctors/:id', getDoctorById);
router.post('/doctors', saveDoctor);
router.patch('/doctors/:id', updateDoctor);
router.delete('/doctors/:id', deleteDoctor);

// Route pour obtenir l'état "activated" d'un utilisateur


// Route pour éditer l'état "activated" d'un utilisateur
router.patch('/doctors/:userId/activated', editDoctorActivatedStatus);

module.exports = router;
