import { KeyboardEvent } from 'react';
import { screen, render } from '@testing-library/react';

import { getRadioButtons } from './getRadioButtons';

const TestComponent = () => (
  <span role="radiogroup">
    <span role="radio" />
    <span role="button" />
    <span role="radio" />
  </span>
);

it('returns an array of radio buttons', () => {
  render(<TestComponent />);

  const radios = screen.getAllByRole('radio');

  const event = {
    target: radios[0],
  } as unknown as KeyboardEvent<HTMLDivElement>;

  const result = getRadioButtons(event);
  expect(result).toEqual(Array.from(radios));
});

it('returns an empty array if the parent is not found', () => {
  render(<TestComponent />);

  const event = {
    target: null,
  } as unknown as KeyboardEvent<HTMLDivElement>;

  const result = getRadioButtons(event);
  expect(result).toEqual([]);
});

it('returns an empty array if the parent has no children', () => {
  render(<span role="radiogroup" />);

  const event = {
    target: screen.getByRole('radiogroup'),
  } as unknown as KeyboardEvent<HTMLDivElement>;

  const result = getRadioButtons(event);
  expect(result).toEqual([]);
});

it('returns an empty array if the parent has no radio buttons', () => {
  render(
    <span role="radiogroup">
      <span role="button" />
    </span>,
  );

  const event = {
    target: screen.getByRole('radiogroup'),
  } as unknown as KeyboardEvent<HTMLDivElement>;

  const result = getRadioButtons(event);
  expect(result).toEqual([]);
});
