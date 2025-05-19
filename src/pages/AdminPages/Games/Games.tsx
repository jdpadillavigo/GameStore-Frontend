import { useEffect, useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { useGamesContext, Game } from '../../../contexts/GamesContext';
import "./Games.css";

const Games = () => {
  const [game, setGame] = useState<Game[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [editingGame, setEditingGame] = useState<Game | null>(null);
  const [gameToDelete, setGameToDelete] = useState<Game | null>(null);

  const { games, addGame, removeGame, updateGame } = useGamesContext();
  
  const [newGame, setNewGame] = useState({
    title: '',
    description: '',
    trailer: '',
    images: [],
    reviews: [],
    release_date: '',
    category: '',
    base_price: 0,
    discount: 0,
    platform: ''
  });

  const handleAddGame = () => {
    addGame(newGame); // Agrega un nuevo juego
  };

  const handleRemoveGame = (title: string) => {
    removeGame(title); // Elimina un juego por su título
  };

  const handleUpdateGame = (title: string, updatedGame: typeof newGame) => {
    updateGame(title, updatedGame); // Actualiza un juego por su título
  };

  const [form, setForm] = useState({ date: "", category: "", name: "", price: "", discount: "" });

  // useEffect(() => {
  //   setGames(sampleGames);
  // }, []);

  const openAddModal = () => {
    setEditingGame(null);
    setForm({ date: "", category: "", name: "", price: "", discount: "" });
    setShowModal(true);
  };

  const openEditModal = (game: Game) => {
    setEditingGame(game);
    setForm({
      date: game.release_date,
      category: game.category,
      name: game.title,
      price: String(game.base_price),
      discount: String(game.discount),
    });
    setShowModal(true);
  };

  const openDeleteModal = (game: Game) => {
    setGameToDelete(game);
    setShowDeleteModal(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    // const newGame: Game = {
    //   id: editingGame ? editingGame.id : Date.now(),
    //   date: form.date,
    //   category: form.category,
    //   name: form.name,
    //   price: parseFloat(form.price),
    //   discount: parseInt(form.discount),
    // };

    // if (editingGame) {
    //   setGames(games.map(g => g.id === editingGame.id ? newGame : g));
    // } else {
    //   setGames([...games, newGame]);
    // }

    // setShowModal(false);
  };

  const handleDelete = () => {
    // if (gameToDelete) {
    //   setGames(games.filter(g => g.id !== gameToDelete.id));
    //   setShowDeleteModal(false);
    // }
  };

  return (
    <div className="games-page">
      <div className="games-table-container">
        <div className="header-row">
          <h1>Juegos</h1>
          <div className="header-actions">
            <button className="filter-btn">Filtrar</button>
            <button className="add-btn" onClick={openAddModal}>+ Agregar</button>
          </div>
        </div>

        <div className="games-table-container__games">
          <table className="games-table">
            <thead>
              <tr>
                <th>Fecha de lanzamiento</th>
                <th>Categoría</th>
                <th>Nombre</th>
                <th>Precio base</th>
                <th>Descuento</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(games).map(([key, game]) => (
                <tr key={key}>
                  <td>{game.release_date}</td>
                  <td>{game.category}</td>
                  <td>{game.title}</td>
                  <td>S/. {game.base_price.toFixed(2)}</td>
                  <td>{game.discount}%</td>
                  <td className="actions">
                    <FaEdit className="edit-icon" onClick={() => openEditModal(game)} />
                    <FaTrash className="delete-icon" onClick={() => openDeleteModal(game)} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Modal Agregar / Editar */}
        {showModal && (
          <div className="modal">
            <div className="modal-content">
              <h2>{editingGame ? "Edit Game" : "Add Game"}</h2>
              <input name="date" placeholder="Date" value={form.date} onChange={handleChange} />
              <input name="category" placeholder="Category" value={form.category} onChange={handleChange} />
              <input name="name" placeholder="Name" value={form.name} onChange={handleChange} />
              <input name="price" placeholder="Price" value={form.price} onChange={handleChange} />
              <input name="discount" placeholder="Discount" value={form.discount} onChange={handleChange} />
              <div className="modal-actions">
                <button onClick={() => setShowModal(false)}>Cancel</button>
                <button onClick={handleSubmit}>Submit</button>
              </div>
            </div>
          </div>
        )}

        {/* Modal Confirmar Eliminación */}
        {showDeleteModal && (
          <div className="modal">
            <div className="modal-content">
              <h2>Delete game</h2>
              <p>Are you sure that you want to delete this register?</p>
              <div className="modal-actions">
                <button onClick={() => setShowDeleteModal(false)}>Cancel</button>
                <button onClick={handleDelete}>Submit</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Games;




