import React, { useContext } from 'react';
import PlanetContext from '../context/PlanetContext';

export default function Table() {
  const {
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
    setColumns } = useContext(PlanetContext);

  const valueFilter = () => {
    const nameFiltered = planets
      .filter((el) => el.name.toLowerCase().includes(filtered.toLowerCase()));
    let filterColumnPlanets = [];
    if (filteredComparison === 'maior que') {
      // console.log(planets);
      filterColumnPlanets = nameFiltered
        .filter((e) => Number(e[filteredColumn]) > Number(filteredValue));
    }
    if (filteredComparison === 'menor que') {
      filterColumnPlanets = nameFiltered
        .filter((e) => Number(e[filteredColumn]) < Number(filteredValue));
    }
    if (filteredComparison === 'igual a') {
      // console.log(planets);
      filterColumnPlanets = nameFiltered
        .filter((e) => (e[filteredColumn]) === (filteredValue));
    }
    // console.log(filterColumnPlanets);
    setPlanets(filterColumnPlanets);
  };

  const getFiltered = () => {
    console.log(filtersCombo);
    // console.log(planets);
    const deleteColumn = columns.filter((e) => e !== filteredColumn);
    setColumns(deleteColumn);
    setFiltersCombo([...filtersCombo,
      { filteredColumn, filteredComparison, filteredValue }]);
    setFilterColumn(deleteColumn[0]);
    valueFilter();
  };

  const deleteFilter = (event) => {
    console.log(event);
  };
  const resetFilters = () => {

  };

  return (
    <div>
      <div>
        <input
          type="text"
          data-testid="name-filter"
          value={ filtered }
          onChange={ ({ target }) => {
            setFilter(target.value);
          } }
        />
      </div>
      <div>
        <select
          name="column-filter"
          id="column-filter"
          data-testid="column-filter"
          value={ filteredColumn }
          onChange={ ({ target }) => setFilterColumn(target.value) }
        >
          {columns.map((e, i) => (
            <option value={ e } key={ i }>{e}</option>
          ))}
        </select>
        <select
          name="comparison-filter"
          id="comparison-filter"
          data-testid="comparison-filter"
          value={ filteredComparison }
          onChange={ ({ target }) => setFilterComparison(target.value) }
        >
          <option value="maior que">maior que</option>
          <option value="menor que">menor que</option>
          <option value="igual a">igual a</option>
        </select>
        <input
          type="number"
          name="value-filter"
          id="value-filter"
          data-testid="value-filter"
          value={ filteredValue }
          onChange={ ({ target }) => setFilterValue(target.value) }
        />
        <button
          type="button"
          data-testid="button-filter"
          onClick={ getFiltered }
        >
          Filtrar

        </button>
      </div>
      <div>
        {filtersCombo
          .map((e, i) => (
            <span key={ i } data-testid="filter">
              <p key={ i }>
                {
                  `${e.filteredColumn} ${e.filteredComparison} ${e.filteredValue}`
                }
              </p>
              <button type="button" onClick={ deleteFilter }>
                X
              </button>
            </span>
          ))}
        <button
          type="button"
          data-testid="button-remove-filters"
          onClick={ resetFilters }
        >
          Remover Filtros

        </button>
      </div>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Rotation Period</th>
            <th>Orbital Period</th>
            <th>Diameter</th>
            <th>Climate</th>
            <th>Gravity</th>
            <th>Terrain</th>
            <th>Surface Water</th>
            <th>Population</th>
            <th>Films</th>
            <th>Created</th>
            <th>Edited</th>
            <th>Url</th>
          </tr>
        </thead>
        <tbody>
          {planets
            .filter((el) => el.name.toLowerCase().includes(filtered.toLowerCase()))
            .map((e) => (
              <tr key={ e.name }>
                <td data-testid="planet-name">{e.name}</td>
                <td>{e.rotation_period}</td>
                <td>{e.orbital_period}</td>
                <td>{e.diameter}</td>
                <td>{e.climate}</td>
                <td>{e.gravity}</td>
                <td>{e.terrain}</td>
                <td>{e.surface_water}</td>
                <td>{e.population}</td>
                <td>{e.films}</td>
                <td>{e.created}</td>
                <td>{e.edited}</td>
                <td>{e.url}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}
