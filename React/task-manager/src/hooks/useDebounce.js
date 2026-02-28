import { useState, useEffect } from 'react';

function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    // Ustawiamy timer, który zaktualizuje wartość po określonym czasie
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // KLUCZOWE: Cleanup function - jeśli value zmieni się przed upływem delay, 
    // poprzedni timer zostaje wyczyszczony i startuje nowy.
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

export default useDebounce;