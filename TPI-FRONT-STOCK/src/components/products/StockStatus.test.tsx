import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import StockStatus from './StockStatus';

describe('StockStatus', () => {
  it('muestra "AGOTADO" cuando stock es 0 (list)', () => {
    render(<StockStatus stock={0} variant="list"/>);
    expect(screen.getByText(/AGOTADO/i)).toBeInTheDocument();
  });

  it('muestra "PRODUCTO AGOTADO" cuando stock es 0 (detail)', () => {
    render(<StockStatus stock={0} variant="detail"/>);
    expect(screen.getByText(/PRODUCTO AGOTADO/i)).toBeInTheDocument();
  });

  it('muestra solo el número cuando stock es saludable (mayor a 10, list)', () => {
    render(<StockStatus stock={25} variant="list"/>);
    expect(screen.getByText('25')).toBeInTheDocument();
  });

  it('muestra "Unidades" cuando stock saludable y variant detail', () => {
    render(<StockStatus stock={15} variant="detail"/>);
    expect(screen.getByText(/Unidades/i)).toBeInTheDocument();
  });

  it('muestra "¡Stock Crítico!" y color rojo cuando stock <=3 (detail)', () => {
    render(<StockStatus stock={2} variant="detail"/>);
    expect(screen.getByText(/¡Stock Crítico!/)).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
  });

  it('muestra "Poco Stock" y color naranja cuando entre 4 y 10 (detail)', () => {
    render(<StockStatus stock={8} variant="detail"/>);
    expect(screen.getByText(/Poco Stock/)).toBeInTheDocument();
    expect(screen.getByText('8')).toBeInTheDocument();
  });

  it('muestra "STOCK BAJO" cuando bajo o crítico (list)', () => {
    render(<StockStatus stock={8} variant="list"/>);
    expect(screen.getByText(/STOCK BAJO/i)).toBeInTheDocument();
    expect(screen.getByText(/8/)).toBeInTheDocument();
  });
});
