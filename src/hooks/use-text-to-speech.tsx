
import { useState, useCallback, useRef } from 'react';

interface UseTextToSpeechOptions {
  rate?: number;
  pitch?: number;
  volume?: number;
  voice?: SpeechSynthesisVoice | null;
}

export const useTextToSpeech = (options: UseTextToSpeechOptions = {}) => {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  const {
    rate = 1,
    pitch = 1,
    volume = 1,
    voice = null
  } = options;

  const loadVoices = useCallback(() => {
    const availableVoices = speechSynthesis.getVoices();
    setVoices(availableVoices);
  }, []);

  const speak = useCallback((text: string) => {
    if (speechSynthesis.speaking) {
      speechSynthesis.cancel();
    }

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = rate;
    utterance.pitch = pitch;
    utterance.volume = volume;
    
    if (voice) {
      utterance.voice = voice;
    }

    utterance.onstart = () => {
      setIsSpeaking(true);
      setIsPaused(false);
    };

    utterance.onend = () => {
      setIsSpeaking(false);
      setIsPaused(false);
    };

    utterance.onerror = () => {
      setIsSpeaking(false);
      setIsPaused(false);
    };

    utteranceRef.current = utterance;
    speechSynthesis.speak(utterance);
  }, [rate, pitch, volume, voice]);

  const pause = useCallback(() => {
    if (speechSynthesis.speaking && !speechSynthesis.paused) {
      speechSynthesis.pause();
      setIsPaused(true);
    }
  }, []);

  const resume = useCallback(() => {
    if (speechSynthesis.paused) {
      speechSynthesis.resume();
      setIsPaused(false);
    }
  }, []);

  const stop = useCallback(() => {
    if (speechSynthesis.speaking) {
      speechSynthesis.cancel();
      setIsSpeaking(false);
      setIsPaused(false);
    }
  }, []);

  // Load voices on mount
  useState(() => {
    loadVoices();
    speechSynthesis.addEventListener('voiceschanged', loadVoices);
    return () => {
      speechSynthesis.removeEventListener('voiceschanged', loadVoices);
    };
  });

  return {
    speak,
    pause,
    resume,
    stop,
    isSpeaking,
    isPaused,
    voices,
    isSupported: 'speechSynthesis' in window
  };
};
