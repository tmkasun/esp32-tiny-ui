import React from 'react';
import { render, screen } from '@testing-library/react';
import System from './pages/System';

test('renders learn react link', () => {
  render(<System />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
