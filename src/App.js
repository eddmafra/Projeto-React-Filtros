import React, { useState, useEffect } from 'react';
import './App.css';
import Table from './components/Table';
import PlanetContext from './context/PlanetContext';
import fetchPlanets from './services/fetchPlanets';

function App() {
  const [planets, setPlanets] = useState([]);
  const [filtered, setFilter] = useState('');
  const [filtersCombo, setFiltersCombo] = useState([]);
  const [filteredColumn, setFilterColumn] = useState('population');
  const [filteredComparison, setFilterComparison] = useState('maior que');
  const [filteredValue, setFilterValue] = useState('0');
  const [columns, setColumns] = useState([
    'population',
    'orbital_period',
    'diameter',
    'rotation_period',
    'surface_water',
  ]);

  const context = {
    planets,
    setPlanets,
    filtersCombo,
    setFiltersCombo,
    filtered,
    setFilter,
    filteredColumn,
    setFilterColumn,
    filteredComparison,
    setFilterComparison,
    filteredValue,
    setFilterValue,
    columns,
    setColumns,
  };

  useEffect(() => {
    async function planetsAPI() {
      const data = await fetchPlanets();
      setPlanets(data);
    }
    planetsAPI();
  }, []);

  return (
    <PlanetContext.Provider value={ context }>
      <Table />
    </PlanetContext.Provider>
  );
}

export default App;
