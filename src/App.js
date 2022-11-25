import React, { useState, useEffect } from 'react';
import './App.css';
import Table from './components/Table';
import PlanetContext from './context/PlanetContext';
import fetchPlanets from './services/fetchPlanets';

function App() {
  const [planets, setPlanets] = useState([]);
  useEffect(() => {
    async function planetsAPI() {
      const data = await fetchPlanets();
      setPlanets(data);
    }
    planetsAPI();
  }, []);

  return (
    <PlanetContext.Provider value={ planets }>
      <Table />
    </PlanetContext.Provider>
  );
}

export default App;
