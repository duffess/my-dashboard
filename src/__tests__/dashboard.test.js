import { render, screen } from '@testing-library/react';
import Dashboard from '../components/Dashboard';

test('deve renderizar o título do Dashboard', () => {
  render(<Dashboard />);
  const title = screen.getByText(/Dashboard/i);
  expect(title).toBeInTheDocument();
});

test('deve renderizar os cards de informações', () => {
  render(<Dashboard />);
  const cards = screen.getAllByRole('article'); 
  expect(cards.length).toBeGreaterThan(0);
});
