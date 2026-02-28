import React from 'react';
import useFetch from '../hooks/useFetch';

const QuoteOfTheDay = () => {
  // Wywołujemy hook, podając URL do API cytatów
  const { data, loading, error, refetch } = useFetch('https://api.quotable.io/random');

  if (loading) return <p>Ładowanie cytatu...</p>;
  if (error) return <p style={{ color: 'red' }}>Błąd: {error}</p>;

  return (
    <div className="quote-container" style={{ textAlign: 'center', padding: '20px', borderBottom: '1px solid #ccc' }}>
      <h3>Cytat Dnia</h3>
      {data && (
        <>
          <p style={{ fontSize: '1.2rem', fontStyle: 'italic' }}>"{data.content}"</p>
          <p><strong>— {data.author}</strong></p>
        </>
      )}
      <button onClick={refetch}>Losuj inny cytat</button>
    </div>
  );
};

export default QuoteOfTheDay;