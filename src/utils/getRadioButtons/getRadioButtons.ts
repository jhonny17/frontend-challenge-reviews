import { KeyboardEvent } from 'react';

export const getRadioButtons = (event: KeyboardEvent<HTMLDivElement>) => {
  const target = event.target as HTMLSpanElement;
  const parent = target?.parentElement as HTMLSpanElement;
  if (!parent) return [];

  return Array.from(parent.children).filter(
    child => child.getAttribute('role') === 'radio',
  ) as HTMLElement[];
};
