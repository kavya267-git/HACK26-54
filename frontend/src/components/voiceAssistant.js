import React, { useState, useEffect } from 'react';
import { FaMicrophone, FaStop, FaVolumeUp, FaLanguage } from 'react-icons/fa';

const VoiceAssistant = ({ onTextReceived, language = 'hi-IN' }) => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [recognition, setRecognition] = useState(null);
  const [synthesis, setSynthesis] = useState(null);

  // Languages supported
  const languages = {
    'hi-IN': { name: 'हिन्दी', code: 'hi-IN' },
    'ta-IN': { name: 'தமிழ்', code: 'ta-IN' },
    'te-IN': { name: 'తెలుగు', code: 'te-IN' },
    'bn-IN': { name: 'বাংলা', code: 'bn-IN' },
    'kn-IN': { name: 'ಕನ್ನಡ', code: 'kn-IN' },
    'ml-IN': { name: 'മലയാളം', code: 'ml-IN' },
    'mr-IN': { name: 'मराठी', code: 'mr-IN' },
    'gu-IN': { name: 'ગુજરાતી', code: 'gu-IN' },
    'pa-IN': { name: 'ਪੰਜਾਬੀ', code: 'pa-IN' },
    'or-IN': { name: 'ଓଡ଼ିଆ', code: 'or-IN' },
    'as-IN': { name: 'অসমীয়া', code: 'as-IN' },
    'ur-IN': { name: 'اردو', code: 'ur-IN' }
  };

  useEffect(() => {
    // Initialize speech recognition
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      const recognitionInstance = new SpeechRecognition();
      
      recognitionInstance.continuous = true;
      recognitionInstance.interimResults = true;
      recognitionInstance.lang = language;

      recognitionInstance.onresult = (event) => {
        const current = event.resultIndex;
        const transcriptText = event.results[current][0].transcript;
        setTranscript(transcriptText);
        
        if (event.results[current].isFinal) {
          if (onTextReceived) {
            onTextReceived(transcriptText);
          }
        }
      };

      recognitionInstance.onerror = (event) => {
        console.error('Speech recognition error', event.error);
        setIsListening(false);
      };

      recognitionInstance.onend = () => {
        setIsListening(false);
      };

      setRecognition(recognitionInstance);
    }

    // Initialize speech synthesis
    if ('speechSynthesis' in window) {
      setSynthesis(window.speechSynthesis);
    }

    return () => {
      if (recognition) {
        recognition.stop();
      }
      if (synthesis) {
        synthesis.cancel();
      }
    };
  }, []);

  useEffect(() => {
    if (recognition) {
      recognition.lang = language;
    }
  }, [language, recognition]);

  const startListening = () => {
    if (recognition) {
      setTranscript('');
      recognition.start();
      setIsListening(true);
    } else {
      alert('Speech recognition is not supported in your browser. Please use Chrome, Edge, or Safari.');
    }
  };

  const stopListening = () => {
    if (recognition) {
      recognition.stop();
      setIsListening(false);
    }
  };

  const speak = (text) => {
    if (synthesis) {
      // Cancel any ongoing speech
      synthesis.cancel();

      const utterance = new SpeechSynthesisUtterance(text);
      
      // Set language
      utterance.lang = language;
      
      // Get available voices
      const voices = synthesis.getVoices();
      
      // Try to find an Indian voice
      const indianVoice = voices.find(voice => 
        voice.lang.includes(language.split('-')[0]) || 
        voice.name.includes('Hindi') || 
        voice.name.includes('Indian')
      );
      
      if (indianVoice) {
        utterance.voice = indianVoice;
      }

      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);

      synthesis.speak(utterance);
    } else {
      alert('Text-to-speech is not supported in your browser.');
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-bold">Voice Assistant</h3>
        <div className="flex items-center space-x-2">
          <FaLanguage className="text-gray-600" />
          <select 
            value={language}
            onChange={(e) => onTextReceived && onTextReceived('__LANGUAGE_CHANGE__' + e.target.value)}
            className="border rounded p-2"
          >
            {Object.entries(languages).map(([code, lang]) => (
              <option key={code} value={code}>{lang.name}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Microphone Button */}
      <div className="flex justify-center mb-6">
        <button
          onClick={isListening ? stopListening : startListening}
          className={`relative w-32 h-32 rounded-full transition-all duration-300 ${
            isListening 
              ? 'bg-red-500 animate-pulse scale-110' 
              : 'bg-orange-500 hover:bg-orange-600'
          }`}
        >
          <FaMicrophone className="text-white text-4xl mx-auto" />
          {isListening && (
            <span className="absolute -top-2 -right-2 w-4 h-4">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-4 w-4 bg-red-500"></span>
            </span>
          )}
        </button>
      </div>

      {/* Transcript Display */}
      {transcript && (
        <div className="mb-4 p-4 bg-gray-50 rounded-lg">
          <p className="text-lg">{transcript}</p>
        </div>
      )}

      {/* Speak Button (for testing) */}
      <div className="flex justify-center">
        <button
          onClick={() => speak(transcript || 'नमस्ते, मैं आपकी कैसे सहायता कर सकता हूँ?')}
          disabled={isSpeaking}
          className={`flex items-center space-x-2 px-6 py-3 rounded-lg ${
            isSpeaking 
              ? 'bg-gray-400 cursor-not-allowed' 
              : 'bg-green-600 hover:bg-green-700'
          } text-white`}
        >
          <FaVolumeUp />
          <span>{isSpeaking ? 'Speaking...' : 'Speak'}</span>
        </button>
      </div>

      {/* Browser Support Warning */}
      {!recognition && (
        <div className="mt-4 p-3 bg-yellow-100 text-yellow-800 rounded">
          ⚠️ Voice recognition is not supported in your browser. Please use Chrome, Edge, or Safari.
        </div>
      )}
    </div>
  );
};

export default VoiceAssistant;