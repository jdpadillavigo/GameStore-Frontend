import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface Review {
  author: string;
  message: string;
  stars: number;
}

export interface Game {
  id: string;
  title: string;
  description: string;
  trailer: string;
  images: string[];
  reviews: Review[];
  release_date: string;
  category: string;
  base_price: number;
  discount: number;
  platform: string;
}

interface GamesContextType {
  games: Record<string, Game>;
  setGames: (games: Record<string, Game>) => void;
  addGame: (game: Game) => Promise<void>;
  removeGame: (id: string) => Promise<void>;
  updateGame: (id: string, updatedGame: Game) => Promise<void>;
  fetchGames: () => Promise<void>;
}

interface GamesProviderProps {
  children: ReactNode;
}

const GamesContext = createContext<GamesContextType | undefined>(undefined);

const BACKEND_URL = 'http://localhost:5000';

export const GamesProvider = ({ children }: GamesProviderProps) => {
  const [games, setGames] = useState<Record<string, Game>>({});

  useEffect(() => {
    fetchGames();
  }, []);

  const fetchGames = async () => {
    try {
      const response = await fetch(`${BACKEND_URL}/juegos`);
      const data = await response.json();
      const gamesMap = data.reduce((acc: Record<string, Game>, game: Game) => {
        acc[game.id] = game;
        return acc;
      }, {});
      setGames(gamesMap);
    } catch (error) {
      console.error('Error al cargar juegos desde el backend:', error);
    }
  };

  const addGame = async (game: Game) => {
    try {
      const response = await fetch(`${BACKEND_URL}/juegos`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(game),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.msg || 'Error al agregar juego');
      }

      setGames((prev) => ({ ...prev, [game.id]: game }));
    } catch (error) {
      console.error('Error al agregar juego:', error);
    }
  };

  const updateGame = async (id: string, updatedGame: Game) => {
    try {
      const encodedId = encodeURIComponent(id);
      const response = await fetch(`${BACKEND_URL}/juego/${encodedId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedGame),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.msg || 'Error al actualizar juego');
      }

      setGames((prev) => {
        const updatedGames = { ...prev };
        updatedGames[id] = updatedGame;
        return updatedGames;
      });
    } catch (error) {
      console.error('Error al actualizar juego:', error);
    }
  };

  const removeGame = async (id: string) => {
    try {
      const encodedId = encodeURIComponent(id);
      const response = await fetch(`${BACKEND_URL}/juego/${encodedId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.msg || 'Error al eliminar juego');
      }

      setGames((prev) => {
        const updated = { ...prev };
        delete updated[id];
        return updated;
      });
    } catch (error) {
      console.error('Error al eliminar juego:', error);
    }
  };

  return (
    <GamesContext.Provider
      value={{
        games,
        setGames,
        addGame,
        removeGame,
        updateGame,
        fetchGames,
      }}
    >
      {children}
    </GamesContext.Provider>
  );
};

export const useGamesContext = () => {
  const context = useContext(GamesContext);
  if (!context) {
    throw new Error('useGamesContext debe usarse dentro de GamesProvider');
  }
  return context;
};
