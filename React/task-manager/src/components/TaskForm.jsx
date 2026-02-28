import React, { useState, useRef, useEffect } from 'react';

function TaskForm({ addTask }) {
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState("medium");
  const [category, setCategory] = useState("Inne");
  const [error, setError] = useState("");

  const inputRef = useRef(null);

  const categories = ["Praca", "Dom", "Zakupy", "Inne"];

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (title.trim().length < 3) {
      setError("Tytuł musi mieć minimum 3 znaki");
      inputRef.current.focus(); //focus na błąd
      return;
    }

    addTask({
      id: Date.now(),
      title: title.trim(),
      completed: false,
      priority: priority,
      category: category,
    });

    //resetowanie pól
    setTitle("");
    setPriority("medium");
    setCategory("Inne");
    setError("");

    //przywrócenie focusu po dodaniu zadania
    inputRef.current.focus();
  };

  return (
    <form onSubmit={handleSubmit} className='task-form'>
      {/* Wyświetlanie błędu, jeśli istnieje */}
      {error && <p style={{color: 'red', fontSize: '12px' }}>{error}</p>}

      <input
        ref={inputRef} //podpięcie referencji pod element DOM
        type="text"
        placeholder="Nowe zadanie"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <select
        value={priority}
        onChange={(e) => setPriority(e.target.value)}
      >
        <option value="high">Wysoki</option>
        <option value="medium">Średni</option>
        <option value="low">Niski</option>
      </select>

      <select value={category} onChange={(e) => setCategory(e.target.value)}>
        {categories.map((cat) => (
          <option key={cat} value={cat}>{cat}</option>
        ))}
      </select>

      <button 
        type="submit"
        className="add-task">Dodaj
        </button>
    </form>
  );
}

export default TaskForm;
