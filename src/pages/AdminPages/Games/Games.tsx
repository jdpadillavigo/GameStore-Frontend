import { useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { useGamesContext, Game } from '../../../contexts/GamesContext';
import "./Games.css";

const Games = () => {
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [editingGame, setEditingGame] = useState<Game | null>(null);
  const [gameToDelete, setGameToDelete] = useState<Game | null>(null);

  const { games, setGames, addGame, removeGame, updateGame } = useGamesContext();

  const [form, setForm] = useState({ id: "", name: "", description: "", category: "", price: "", discount: "", date: "", trailer: "", image1: "", image2: "", image3: "", image4: "", platform: "" })

  const openAddModal = () => {
    setEditingGame(null)
    setForm({ id: "", name: "", description: "", category: "", price: "", discount: "", date: "", trailer: "", image1: "", image2: "", image3: "", image4: "", platform: "" })
    setShowModal(true)
  };

  const openEditModal = (gameId: string) => {
    const game = games[gameId];
    if (game) {
      setEditingGame(game);
      setForm({
        id: gameId,
        name: game.title,
        description: game.description,
        category: game.category,
        price: String(game.base_price),
        discount: String(game.discount),
        date: game.release_date,
        trailer: game.trailer,
        image1: game.images[0],
        image2: game.images[1],
        image3: game.images[2],
        image4: game.images[3],
        platform: game.platform
      });
      setShowModal(true);
    }
  };

  const openDeleteModal = (game: Game) => {
    setGameToDelete(game);
    setShowDeleteModal(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  };

  const handleSubmit = async () => {
    const updated: Game = {
      id: form.id,
      title: form.name,
      description: form.description,
      trailer: form.trailer,
      images: [form.image1, form.image2, form.image3, form.image4],
      reviews: editingGame?.reviews || [],
      release_date: form.date,
      category: form.category,
      base_price: parseFloat(form.price),
      discount: parseInt(form.discount),
      platform: form.platform
    };

    const currentGameId = editingGame ? Object.keys(games).find(id => games[id].title === editingGame.title) : null;

    if (currentGameId) {
      if (form.id !== currentGameId) {
        const newId = form.id;
        const updatedGames = { ...games };

        const { [currentGameId]: oldGame, ...remainingGames } = updatedGames;

        updatedGames[newId] = { ...updated };

        delete updatedGames[currentGameId];

        await updateGame(newId, updatedGames[newId]);
        setGames(updatedGames);
      } else {
        await updateGame(currentGameId, updated);
        setGames({ ...games, [currentGameId]: updated });
      }
    } else {
      await addGame(updated);
      setGames({ ...games, [form.id]: updated });
    }

    setShowModal(false);
  };

  const handleDelete = async () => {
    if (gameToDelete) {
      const gameId = Object.keys(games).find(id => games[id].title === gameToDelete.title);
      
      if (gameId) {
        await removeGame(gameId);
        setShowDeleteModal(false);
      } else {
        console.error("No se encontró la clave del juego para eliminarlo.");
      }
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
              {Object.entries(games).map(([id, game]) => (
                <tr id={id}>
                  <td>{game.release_date}</td>
                  <td>{game.category}</td>
                  <td>{game.title}</td>
                  <td>S/. {game.base_price.toFixed(2)}</td>
                  <td>{game.discount}%</td>
                  <td className="actions">
                    <FaEdit className="edit-icon" onClick={() => openEditModal(id)} />
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
                <div className="modal-content__inputs">
                  <div className="modal-content__input__1">
                    <label>ID:</label>
                    <input name="id" placeholder="Juego_ID" value={form.id} onChange={handleChange} required />
                    <label>Nombre:</label>
                    <input name="name" placeholder="Nombre" value={form.name} onChange={handleChange} required />
                    <label>Descripción:</label>
                    <input name="description" placeholder="Descripción" value={form.description} onChange={handleChange} required />
                    <label>Categorías:</label>
                    <input name="category" placeholder="Acción, Aventura" value={form.category} onChange={handleChange} required />
                    <label>Precio base (S/.):</label>
                    <input name="price" placeholder="230" value={form.price} onChange={handleChange} required />
                    <label>Descuento (%):</label>
                    <input name="discount" placeholder="10" value={form.discount} onChange={handleChange} required />
                    <label>Fecha de lanzamiento:</label>
                    <input name="date" placeholder="dd/mm/aaaa" value={form.date} onChange={handleChange} required />
                  </div>
                  <div className="modal-content__input__2">
                    <label>Trailer (URL):</label>
                    <input name="trailer" placeholder="https://youtube.com/embed/ID" value={form.trailer} onChange={handleChange} required />
                    <label>Imagen 1 (URL):</label>
                    <input name="image1" placeholder="imagen1.jpg" value={form.image1} onChange={handleChange} required />
                    <label>Imagen 2 (URL):</label>
                    <input name="image2" placeholder="imagen2.jpg" value={form.image2} onChange={handleChange} required />
                    <label>Imagen 3 (URL):</label>
                    <input name="image3" placeholder="imagen3.jpg" value={form.image3} onChange={handleChange} required />
                    <label>Imagen 4 (URL):</label>
                    <input name="image4" placeholder="imagen4.jpg" value={form.image4} onChange={handleChange} required />
                    <label>Plataformas:</label>
                    <input name="platform" placeholder="Windows, Xbox" value={form.platform} onChange={handleChange} required />
                  </div>
                </div>
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
                  Eliminar
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Games







