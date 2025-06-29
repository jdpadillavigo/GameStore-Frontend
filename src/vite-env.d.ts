/// <reference types="vite/client" />

// Extender la interfaz Window con SpeechRecognition
interface Window {
    SpeechRecognition: typeof SpeechRecognition;
    webkitSpeechRecognition: typeof webkitSpeechRecognition;
}