import React, { useContext } from 'react';
import PlanetContext from '../context/PlanetContext';

export default function Table() {
  const {
    planets, setPlanets,
    filtersCombo, setFiltersCombo,
    filtered, setFilter,
    filteredColumn, setFilterColumn,
    filteredComparison, setFilterComparison,
    filteredValue, setFilterValue,
    columns, setColumns,
    originalPlanets,
    order, setOrder,
    orderOptions, setOrderOptions,
    options,
    tableTitles } = useContext(PlanetContext);

  const valueFilter = () => {
    const nameFiltered = planets
      .filter((el) => el.name.toLowerCase().includes(filtered.toLowerCase()));
    let filterColumnPlanets = [];
    if (filteredComparison === 'maior que') {
      filterColumnPlanets = nameFiltered
        .filter((e) => Number(e[filteredColumn]) > Number(filteredValue));
    }
    if (filteredComparison === 'menor que') {
      filterColumnPlanets = nameFiltered
        .filter((e) => Number(e[filteredColumn]) < Number(filteredValue));
    }
    if (filteredComparison === 'igual a') {
      filterColumnPlanets = nameFiltered
        .filter((e) => (e[filteredColumn]) === (filteredValue));
    }
    setPlanets(filterColumnPlanets);
  };

  const valueFilterDelete = (remainingFilter) => {
    console.log(remainingFilter);
    console.log(originalPlanets);
    let filterColumnPlanets = [];
    remainingFilter.forEach((el) => {
      if (el.filteredComparison === 'maior que') {
        filterColumnPlanets = originalPlanets
          .filter((e) => Number(e[el.filteredColumn]) > Number(el.filteredValue));
      }
      if (el.filteredComparison === 'menor que') {
        filterColumnPlanets = originalPlanets
          .filter((e) => Number(e[el.filteredColumn]) < Number(el.filteredValue));
      }
      if (el.filteredComparison === 'igual a') {
        filterColumnPlanets = originalPlanets
          .filter((e) => (e[el.filteredColumn]) === (el.filteredValue));
      }
    });
    setPlanets(filterColumnPlanets);
  };

  const getFiltered = () => {
    const deleteColumn = columns.filter((e) => e !== filteredColumn);
    setColumns(deleteColumn);
    setFiltersCombo([...filtersCombo,
      { filteredColumn, filteredComparison, filteredValue }]);
    setFilterColumn(deleteColumn[0]);
    valueFilter();
  };

  const deleteFilter = ({ target }) => {
    const deleteFilterBtn = filtersCombo.filter((e) => e.filteredColumn !== target.value);
    setFiltersCombo(deleteFilterBtn);
    setColumns([target.value, ...columns]);
    setPlanets(originalPlanets);
    valueFilterDelete(deleteFilterBtn);
  };
  const resetFilters = () => {
    setFiltersCombo([]);
    setColumns([
      'population',
      'orbital_period',
      'diameter',
      'rotation_period',
      'surface_water',
    ]);
    setPlanets(originalPlanets);
  };
  const orderFilter = (value) => {
    const orderedPlanets = planets
      .filter((e) => e[orderOptions] !== 'unknown');
    const unkowns = planets
      .filter((el) => el[orderOptions] === 'unknown');
    switch (value) {
    case 'ASC':
      orderedPlanets.sort((a, b) => Number(+a[orderOptions]) - Number(+b[orderOptions]));
      break;
    default:
      orderedPlanets.sort((a, b) => Number(+b[orderOptions]) - Number(+a[orderOptions]));
      break;
    }
    setPlanets([...orderedPlanets, ...unkowns]);
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
              <button type="button" onClick={ deleteFilter } value={ e.filteredColumn }>
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
      <div>
        <select
          onChange={ ({ target }) => setOrderOptions(target.value) }
          data-testid="column-sort"
        >
          { options.map((e, i) => <option key={ i } value={ e }>{e}</option>)}
        </select>
        <label htmlFor="ASC">
          ASC
          <input
            data-testid="column-sort-input-asc"
            type="radio"
            name="orderRadio"
            value="ASC"
            onChange={ ({ target }) => setOrder(target.value) }
          />
        </label>
        <label htmlFor="DESC">
          DESC
          <input
            data-testid="column-sort-input-desc"
            type="radio"
            name="orderRadio"
            value="DESC"
            onChange={ ({ target }) => setOrder(target.value) }
          />
        </label>
        <button
          data-testid="column-sort-button"
          type="button"
          onClick={ () => { orderFilter(order); } }
        >
          Ordenar
        </button>
      </div>
      <table>
        <thead>
          <tr>
            {tableTitles.map((e, i) => <th key={ i }>{e}</th>)}
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
