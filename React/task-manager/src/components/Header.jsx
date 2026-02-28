// src/components/Header.jsx
import React from "react";
import "./Header.css"; // opcjonalnie, jeśli chcesz dodać style

function Header() {
  const today = new Date();
  const formattedDate = today.toLocaleDateString(undefined, {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <header className="header">
      <h1>📝 Menedżer Zadań</h1>
      <p>{formattedDate}</p>
    </header>
  );
}

export default Header;
