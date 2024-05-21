import React, { useState } from "react";
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";
import css from "./Microphone.module.css";
import Box from "@mui/material/Box";

const maleVoices = {
  'ar-MA': 'Microsoft Mehdi Desktop - Arabic (Morocco)',
  'fr-FR': 'Microsoft Hortense Desktop - French (France)',
  'en-US': 'Microsoft David Desktop - English (United States)'
};

let msg = new SpeechSynthesisUtterance();
let hasSpoken = false;
let isSpeaking = false;
let messageSend = false;

const Microphone = () => {
  const { transcript, listening, resetTranscript, browserSupportsSpeechRecognition } = useSpeechRecognition();
  const [selectedLanguage, setSelectedLanguage] = useState('');
  const [chatResponse, setChatResponse] = useState("");

  const speechHandler = () => {
    if (chatResponse) {
      msg.text = chatResponse;
      window.speechSynthesis.speak(msg);
    }
  };

  const reset = () => {
    resetTranscript();
    hasSpoken = false;
    messageSend = false;
    setChatResponse("");
    window.speechSynthesis.cancel(); // Stop any ongoing speech
    isSpeaking = false;
  };

  async function askGpt(question) {
    msg = new SpeechSynthesisUtterance();

    switch (selectedLanguage) {
      case 'ar-MA':
        msg.lang = 'ar-MA';
        break;
      case 'fr-FR':
        msg.lang = 'fr-FR';
        break;
      case 'en-US':
        msg.lang = 'en-US';
        break;
      default:
        msg.lang = 'ar-MA'; // Langue par défaut
        break;
    }
    
    const voices = window.speechSynthesis.getVoices().find(({ name }) => maleVoices[selectedLanguage].includes(name));
    msg.voice = voices;

    try {
      const response = await fetch('http://localhost:3001/api/ask', { // Assuming your backend is running on port 3000
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ question, selectedLanguage }),
      });
      const data = await response.json();
      const responseText = data.response.replace(/\*/g, '').replace(/\#/g, '');
      setChatResponse(responseText);
      hasSpoken = false; // Reset hasSpoken so that the new response is read
    } catch (error) {
      console.error('Error fetching GPT response:', error);
    }
  }

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
  }

  if (!listening && !messageSend && transcript.length > 0) {
    messageSend = true;
    askGpt(transcript);
  }

  if (chatResponse.length > 0 && !isSpeaking && !hasSpoken) {
    isSpeaking = true;
    speechHandler();
    isSpeaking = false;
    hasSpoken = true;
  }

  const handleStartListening = () => {
    if (!selectedLanguage) {
      alert('Veuillez sélectionner une langue.');
      return;
    }
    SpeechRecognition.startListening({ language: selectedLanguage });
  };

  return (
    <Box className={css.chatBody} component="main" sx={{ flexGrow: 1, p: 3 }}>
      <div className={css.microphone}>
        <table className={css.table}>
          <tr>
            <th>
              <div className={css.state}>
                <p>Microphone: {listening ? 'activé' : 'désactivé'}</p>
              </div>
            </th>
            <th>
              <div className={css.chekfbox}>
                <select
                  className="form-select"
                  value={selectedLanguage}
                  onChange={(e) => setSelectedLanguage(e.target.value)}
                >
                  <option value="">language</option>
                  <option value="ar-MA">Arabe</option>
                  <option value="fr-FR">Français</option>
                  <option value="en-US">Anglais</option>
                </select>
              </div>
            </th>
          </tr>
        </table>
        
        <p className={css.transcript}>{transcript}</p>
        <div className={css.terminal}>
          <p className={css.chatIntro}>{"chatMed-AI >"}</p>
          <p className={css.response}>{chatResponse}</p>
        </div>
        <div className={css.buttons}>
          <button
            type="button"
            className="btn btn-success"
            onClick={() => {
              reset();
              handleStartListening();
            }}
          >
            <i className="fa fa-microphone"></i>
          </button>
          <button
            type="button"
            className="btn btn-danger"
            onClick={() => {
              window.speechSynthesis.cancel();
              isSpeaking = false;
            }}
          >
            <i className="fa fa-volume-up"></i>
          </button>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={reset}
          >
            <i className="fa fa-refresh"></i>
          </button>
        </div>
      </div>
    </Box>
  );
};

export default Microphone;
