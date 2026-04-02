import React, { useEffect, useState } from 'react';

const getApiUrl = () => {
  const codespace = process.env.REACT_APP_CODESPACE_NAME;
  return codespace
    ? `https://${codespace}-8000.app.github.dev/api/activities/`
    : '/api/activities/';
};

export default function Activities() {
  const [activities, setActivities] = useState([]);
  useEffect(() => {
    const url = getApiUrl();
    fetch(url)
      .then(res => res.json())
      .then(data => {
        const results = data.results || data;
        setActivities(results);
        console.log('Activities endpoint:', url);
        console.log('Fetched activities:', results);
      });
  }, []);
  return (
    <div>
      <h2>Activities</h2>
      <ul>
        {activities.map((a, i) => (
          <li key={a.id || i}>{JSON.stringify(a)}</li>
        ))}
      </ul>
    </div>
  );
}
