import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface Review {
  author: string;
  message: string;
  stars: number;
}

export interface Game {
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
  addGame: (key: string, game: Game) => Promise<void>;
  removeGame: (key: string) => Promise<void>;
  updateGame: (key: string, updatedGame: Game) => Promise<void>;
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
      setGames(data);
    } catch (error) {
      console.error('Error al cargar juegos desde el backend:', error);
    }
  };

  const addGame = async (key: string, game: Game) => {
    try {
      const response = await fetch(`${BACKEND_URL}/juegos`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ key, ...game }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.msg || 'Error al agregar juego');
      }

      setGames((prev) => ({ ...prev, [key]: game }));
    } catch (error) {
      console.error('Error al agregar juego:', error);
    }
  };

  const updateGame = async (key: string, updatedGame: Game) => {
    try {
      const encodedKey = encodeURIComponent(key);
      const response = await fetch(`${BACKEND_URL}/juego/${encodedKey}`, {
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
        delete updatedGames[key];
        updatedGames[updatedGame.title] = updatedGame;
        return updatedGames;
      });
    } catch (error) {
      console.error('Error al actualizar juego:', error);
    }
  };

  const removeGame = async (key: string) => {
    try {
      const encodedKey = encodeURIComponent(key);
      const response = await fetch(`${BACKEND_URL}/juego/${encodedKey}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.msg || 'Error al eliminar juego');
      }

      setGames((prev) => {
        const updated = { ...prev };
        delete updated[key];
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
