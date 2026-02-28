import { useState, useEffect } from 'react';

function useLocalStorage(key, initialValue) {
  // 1. Lazy initial state - odczyt z localStorage tylko przy starcie [cite: 335, 336]
  const [value, setValue] = useState(() => {
    try {
      const saved = localStorage.getItem(key);
      return saved ? JSON.parse(saved) : initialValue;
    } catch (error) {
      // 2. Obsługa błędów JSON.parse [cite: 337]
      console.error("Błąd odczytu localStorage:", error);
      return initialValue;
    }
  });

  // 3. Automatyczny zapis przy każdej zmianie [cite: 336]
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue]; // Identyczny interfejs jak useState [cite: 338]
}

export default useLocalStorage;