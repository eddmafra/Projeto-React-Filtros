import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from "@testing-library/user-event";
import App from '../App';
import MocksTest from './MocksTest';
import { clear } from '@testing-library/user-event/dist/clear';

describe('test', () => {
  beforeEach(() => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: jest.fn().mockResolvedValue(MocksTest)
    });
    render(<App />);
  })
  test('Verify table and size', async () => {
  const table = await screen.findAllByTestId('planet-name')
  expect(table).toHaveLength(10);
});
test('Verify name filter', async () => {
  const nameFilter = await screen.findByTestId('name-filter');
  userEvent.type(nameFilter, 'oo');
  let findTable = await screen.findAllByTestId('planet-name');
  expect(findTable).toHaveLength(2);
});
test('Verify filters', async () => {
    let columnFilter = await screen.findByTestId('column-filter')
    const comparisonFilter = await screen.findByTestId('comparison-filter');
    const valueFilter = await screen.findByTestId('value-filter');
    const btnFilter = await screen.findByTestId('button-filter');
    expect(columnFilter).toHaveLength(5);
    userEvent.selectOptions(columnFilter, 'diameter');
    userEvent.selectOptions(comparisonFilter, 'maior que');
    userEvent.type(valueFilter, '12000');
    userEvent.click(btnFilter);
    let findTable = await screen.findAllByTestId('planet-name');
    expect(findTable).toHaveLength(5);
    expect(columnFilter).toHaveLength(4);
})
test('Verify filters', async () => {
    let columnFilter = await screen.findByTestId('column-filter')
    const comparisonFilter = await screen.findByTestId('comparison-filter');
    const valueFilter = await screen.findByTestId('value-filter');
    const btnFilter = await screen.findByTestId('button-filter');

    userEvent.selectOptions(columnFilter, 'diameter');
    userEvent.selectOptions(comparisonFilter, 'maior que');
    userEvent.type(valueFilter, '12000');
    userEvent.click(btnFilter);
    userEvent.selectOptions(columnFilter, 'orbital_period');
    userEvent.selectOptions(comparisonFilter, 'menor que');
    userEvent.clear(valueFilter);
    userEvent.type(valueFilter, '400');
    userEvent.click(btnFilter);
    userEvent.selectOptions(columnFilter, 'surface_water');
    userEvent.selectOptions(comparisonFilter, 'igual a');
    userEvent.clear(valueFilter);
    userEvent.type(valueFilter, '40');
    userEvent.click(btnFilter);
    let findTable = await screen.findAllByTestId('planet-name');
    expect(findTable).toHaveLength(1);
    let btnDelete = await screen.findAllByRole('button', {name: /x/i});
    expect(btnDelete).toHaveLength(3);
    userEvent.click(btnDelete[0]);
    expect(btnDelete).toHaveLength(3);
    expect(findTable).toHaveLength(1);
});
  test('Verify reset filter button', async () => {
    let columnFilter = await screen.findByTestId('column-filter')
    const comparisonFilter = await screen.findByTestId('comparison-filter');
    const valueFilter = await screen.findByTestId('value-filter');
    const btnFilter = await screen.findByTestId('button-filter');
      userEvent.selectOptions(columnFilter, 'diameter');
    userEvent.selectOptions(comparisonFilter, 'maior que');
    userEvent.type(valueFilter, '12000');
    userEvent.click(btnFilter);
    userEvent.selectOptions(columnFilter, 'orbital_period');
    userEvent.selectOptions(comparisonFilter, 'menor que');
    userEvent.clear(valueFilter);
    userEvent.type(valueFilter, '400');
    userEvent.click(btnFilter);
    const resetFilter = await screen.findByTestId('button-remove-filters')
    userEvent.click(resetFilter);
  const table = await screen.findAllByTestId('planet-name')
  expect(table).toHaveLength(10);
});
});
