// Header.test.js
import React from 'react';
import { render, screen } from '@testing-library/react';
import Header from '../components/Header.js';

test('deve renderizar o logotipo do Twitter', () => {
  render(<Header />);
  const logoElement = screen.getByAltText(/Twitter/i); // use um alt text apropriado se tiver
  expect(logoElement).toBeInTheDocument();
});

test('deve renderizar todos os ícones', () => {
  render(<Header />);
  const homeIcon = screen.getByRole('img', { name: /home/i }); // ajuste conforme necessário
  const phoneIcon = screen.getByRole('img', { name: /phone/i });
  const playIcon = screen.getByRole('img', { name: /play/i });
  const settingsIcon = screen.getByRole('img', { name: /settings/i });

  expect(homeIcon).toBeInTheDocument();
  expect(phoneIcon).toBeInTheDocument();
  expect(playIcon).toBeInTheDocument();
  expect(settingsIcon).toBeInTheDocument();
});
