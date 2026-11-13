import { useRef, useState } from "react";

export default function useSpeechRecognition() {
  const recognitionRef = useRef(null);
  const [listening, setListening] = useState(false);
  const supported = typeof window !== "undefined" && ("SpeechRecognition" in window || "webkitSpeechRecognition" in window);

  function start() {
    if (!supported) return false;
    const Recognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new Recognition();
    recognition.lang = "en-IN";
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.onstart = () => setListening(true);
    recognition.onend = () => setListening(false);
    recognitionRef.current = recognition;
    recognition.start();
    return true;
  }
  function stop() { recognitionRef.current?.stop(); }
  return { supported, listening, start, stop, recognitionRef };
}
