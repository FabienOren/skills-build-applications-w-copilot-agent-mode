import React, { useEffect, useState } from 'react';

const getApiUrl = () => {
  const codespace = process.env.REACT_APP_CODESPACE_NAME;
  return codespace
    ? `https://${codespace}-8000.app.github.dev/api/teams/`
    : '/api/teams/';
};

export default function Teams() {
  const [teams, setTeams] = useState([]);
  useEffect(() => {
    const url = getApiUrl();
    fetch(url)
      .then(res => res.json())
      .then(data => {
        const results = data.results || data;
        setTeams(results);
        console.log('Teams endpoint:', url);
        console.log('Fetched teams:', results);
      });
  }, []);
  return (
    <div>
      <h2>Teams</h2>
      <ul>
        {teams.map((t, i) => (
          <li key={t.id || i}>{JSON.stringify(t)}</li>
        ))}
      </ul>
    </div>
  );
}
