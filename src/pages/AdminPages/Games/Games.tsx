import { useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { useGamesContext, Game } from '../../../contexts/GamesContext';
import "./Games.css";

const Games = () => {
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [editingGame, setEditingGame] = useState<Game | null>(null);
  const [gameToDelete, setGameToDelete] = useState<Game | null>(null);

  const { games, addGame, removeGame, updateGame } = useGamesContext();

  const [form, setForm] = useState({ date: "", category: "", name: "", price: "", discount: "" });

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
    const updated: Game = {
      title: form.name,
      description: editingGame?.description || "",
      trailer: editingGame?.trailer || "",
      images: editingGame?.images || [],
      reviews: editingGame?.reviews || [],
      release_date: form.date,
      category: form.category,
      base_price: parseFloat(form.price),
      discount: parseInt(form.discount),
      platform: editingGame?.platform || ""
    };

    if (editingGame) {
      updateGame(editingGame.title, updated);
    } else {
      addGame(updated);
    }

    setShowModal(false);
  };

  const handleDelete = () => {
    if (gameToDelete) {
      removeGame(gameToDelete.title);
      setShowDeleteModal(false);
    }
  };

  return (
    <div className="games-page">
      <div className="games-wrapper">
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
          <div className="modal-overlay">
            <div className="modal">
              <h2>{editingGame ? "Editar juego" : "Agregar juego"}</h2>
              <div className="modal-content">
                <input name="date" placeholder="Fecha" value={form.date} onChange={handleChange} />
                <input name="category" placeholder="Categoría" value={form.category} onChange={handleChange} />
                <input name="name" placeholder="Nombre" value={form.name} onChange={handleChange} />
                <input name="price" placeholder="Precio" value={form.price} onChange={handleChange} />
                <input name="discount" placeholder="Descuento" value={form.discount} onChange={handleChange} />
                <div className="modal-actions">
                  <button onClick={() => setShowModal(false)}>Cancelar</button>
                  <button onClick={handleSubmit}>Guardar</button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Modal Confirmar Eliminación */}
        {showDeleteModal && (
          <div className="modal-overlay">
            <div className="modal">
              <h2>Eliminar juego</h2>
              <p>¿Está seguro que desea eliminar este registro?</p>
              <div className="modal-buttons">
                <button onClick={() => setShowDeleteModal(false)} className="btn-cancel">
                  Cancelar
                </button>
                <button onClick={handleDelete} className="btn-danger">
                  Entregar
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Games;







