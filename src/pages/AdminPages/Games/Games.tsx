import { useEffect, useState } from "react";
import "./Games.css";
import { FaEdit, FaTrash } from "react-icons/fa";

type Game = {
  id: number;
  date: string;
  category: string;
  name: string;
  price: number;
  discount: number;
};

const sampleGames: Game[] = [
  { id: 1, date: "10/12/20", category: "Open World", name: "Grand Theft Auto V", price: 180, discount: 75 },
  { id: 2, date: "12/01/21", category: "Carreras", name: "Need for Speed Heat", price: 85, discount: 50 },
  { id: 3, date: "18/03/21", category: "RPG", name: "Elden Ring", price: 172.5, discount: 75 },
  { id: 4, date: "22/05/21", category: "Acción", name: "Cyberpunk 2077", price: 159, discount: 0 },
  { id: 5, date: "30/07/21", category: "Aventura", name: "Red Dead Redemption 2", price: 232.5, discount: 0 },
  { id: 6, date: "14/09/21", category: "Aventura", name: "Horizon Forbidden West", price: 210, discount: 30 },
  { id: 7, date: "01/11/21", category: "Acción", name: "Ghost of Tsushima", price: 199, discount: 20 },
  { id: 8, date: "15/01/22", category: "RPG", name: "Assassin’s Creed Valhalla", price: 219, discount: 10 },
  { id: 9, date: "10/03/22", category: "Acción", name: "Spider-Man", price: 189, discount: 25 },
  { id: 10, date: "20/06/22", category: "Horror", name: "Resident Evil 4 Remake", price: 129.99, discount: 20 }
];

const Games = () => {
  const [games, setGames] = useState<Game[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [editingGame, setEditingGame] = useState<Game | null>(null);
  const [gameToDelete, setGameToDelete] = useState<Game | null>(null);

  const [form, setForm] = useState({ date: "", category: "", name: "", price: "", discount: "" });

  useEffect(() => {
    setGames(sampleGames);
  }, []);

  const openAddModal = () => {
    setEditingGame(null);
    setForm({ date: "", category: "", name: "", price: "", discount: "" });
    setShowModal(true);
  };

  const openEditModal = (game: Game) => {
    setEditingGame(game);
    setForm({
      date: game.date,
      category: game.category,
      name: game.name,
      price: String(game.price),
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
    const newGame: Game = {
      id: editingGame ? editingGame.id : Date.now(),
      date: form.date,
      category: form.category,
      name: form.name,
      price: parseFloat(form.price),
      discount: parseInt(form.discount),
    };

    if (editingGame) {
      setGames(games.map(g => g.id === editingGame.id ? newGame : g));
    } else {
      setGames([...games, newGame]);
    }

    setShowModal(false);
  };

  const handleDelete = () => {
    if (gameToDelete) {
      setGames(games.filter(g => g.id !== gameToDelete.id));
      setShowDeleteModal(false);
    }
  };

  return (
    <div className="games-table-container">
      <div className="header-row">
        <h1>Games</h1>
        <div className="header-actions">
          <button className="filter-btn">Filter</button>
          <button className="add-btn" onClick={openAddModal}>+ Add</button>
        </div>
      </div>

      <table className="games-table">
        <thead>
          <tr>
            <th>Date</th>
            <th>Category</th>
            <th>Name</th>
            <th>Base price</th>
            <th>Discount</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {games.map((game) => (
            <tr key={game.id}>
              <td>{game.date}</td>
              <td>{game.category}</td>
              <td>{game.name}</td>
              <td>S/. {game.price.toFixed(2)}</td>
              <td>{game.discount}%</td>
              <td className="actions">
                <FaEdit className="edit-icon" onClick={() => openEditModal(game)} />
                <FaTrash className="delete-icon" onClick={() => openDeleteModal(game)} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

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
  );
};

export default Games;




