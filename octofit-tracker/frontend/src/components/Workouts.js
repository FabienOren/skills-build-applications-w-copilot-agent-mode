import React, { useEffect, useState } from 'react';

const getApiUrl = () => {
  const codespace = process.env.REACT_APP_CODESPACE_NAME;
  return codespace
    ? `https://${codespace}-8000.app.github.dev/api/workouts/`
    : '/api/workouts/';
};

export default function Workouts() {
  const [workouts, setWorkouts] = useState([]);
  useEffect(() => {
    const url = getApiUrl();
    fetch(url)
      .then(res => res.json())
      .then(data => {
        const results = data.results || data;
        setWorkouts(results);
        console.log('Workouts endpoint:', url);
        console.log('Fetched workouts:', results);
      });
  }, []);
  return (
    <div>
      <h2>Workouts</h2>
      <ul>
        {workouts.map((w, i) => (
          <li key={w.id || i}>{JSON.stringify(w)}</li>
        ))}
      </ul>
    </div>
  );
}
