import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { useGameStore } from '../../store/useGameStore';
import GameCard from '../GameCard';

// Mock the Zustand store
jest.mock('../../store/useGameStore');

const mockGame = {
  slug: 'test-game',
  name: 'Test Game',
  thumbnail: 'https://example.com/game.jpg',
  borderColor: '#ff0000'
};

describe('GameCard', () => {
  const mockIsFavorite = jest.fn();
  const mockToggleFavorite = jest.fn();

  beforeEach(() => {
    useGameStore.mockImplementation((selector) => {
      const state = {
        isFavorite: mockIsFavorite,
        toggleFavorite: mockToggleFavorite,
      };
      return selector(state);
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders game image', () => {
    mockIsFavorite.mockReturnValue(false);
    render(<GameCard game={mockGame} />);
    expect(screen.getByAltText('Test Game')).toBeInTheDocument();
  });

  it('shows outline heart when not favorite', () => {
    mockIsFavorite.mockReturnValue(false);
    render(<GameCard game={mockGame} />);
    expect(screen.getByLabelText(/add to favorites/i)).toBeInTheDocument();
    expect(screen.getByText('♡')).toBeInTheDocument();
  });

  it('shows filled heart when favorite', () => {
    mockIsFavorite.mockReturnValue(true);
    render(<GameCard game={mockGame} />);
    expect(screen.getByLabelText(/remove from favorites/i)).toBeInTheDocument();
    expect(screen.getByText('❤️')).toBeInTheDocument();
  });

  it('calls toggleFavorite when heart is clicked', () => {
    mockIsFavorite.mockReturnValue(false);
    render(<GameCard game={mockGame} />);
    
    const heartButton = screen.getByRole('button');
    fireEvent.click(heartButton);
    
    expect(mockToggleFavorite).toHaveBeenCalledWith('test-game');
  });

  it('handles missing thumbnail gracefully', () => {
    mockIsFavorite.mockReturnValue(false);
    const gameNoImg = { ...mockGame, thumbnail: null };
    render(<GameCard game={gameNoImg} />);
    // Should still render the favorite button
    expect(screen.getByRole('button')).toBeInTheDocument();
  });
}); 