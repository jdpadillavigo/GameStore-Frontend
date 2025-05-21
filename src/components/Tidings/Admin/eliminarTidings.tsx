import React from "react"
import portadaNoticias from "/images/news/Portada_noticias.jpg"
import './AdminTidings.css'

interface EliminarTidingsProps {
    categorias: string[];
    autores: string[];
    filtroCategoria: string;
    setFiltroCategoria: (cat: string) => void;
    filtroAutor: string;
    setFiltroAutor: (autor: string) => void;
    noticiasFiltradas: any[];
    seleccionadas: number[];
    handleCheckbox: (id: number) => void;
    eliminarSeleccionadas: () => void;
}

const EliminarTidings: React.FC<EliminarTidingsProps> = ({
    categorias,
    autores,
    filtroCategoria,
    setFiltroCategoria,
    filtroAutor,
    setFiltroAutor,
    noticiasFiltradas,
    seleccionadas,
    handleCheckbox,
    eliminarSeleccionadas
}) => (
    <div className="gestion-noticia-eliminar-outer">
        <div className="gestion-noticia-eliminar">
            <br/>
            <img src={portadaNoticias} className="gestion-noticia-img"/>
            <h2 className="gestion-noticia-eliminar-title">Eliminación de Noticias</h2>
            {/* Filtros */}
            <div className="gestion-noticia-eliminar-filtros">
                <select
                    className="gestion-noticia-input"
                    value={filtroCategoria}
                    onChange={e => setFiltroCategoria(e.target.value)}
                >
                    <option value="Todas">Todas las categorías</option>
                    {categorias.map(cat => (
                        <option key={cat} value={cat}>{cat}</option>
                    ))}
                </select>
                <select
                    className="gestion-noticia-input"
                    value={filtroAutor}
                    onChange={e => setFiltroAutor(e.target.value)}
                >
                    <option value="Todos">Todos los autores</option>
                    {autores.map(autor => (
                        <option key={autor} value={autor}>{autor}</option>
                    ))}
                </select>
            </div>
            {/* Lista de noticias con checkbox */}
            <div className="gestion-noticia-eliminar-lista">
                {noticiasFiltradas.length === 0 && (
                    <div className="gestion-noticia-eliminar-vacio">No hay noticias para mostrar.</div>
                )}
                {noticiasFiltradas.map(noticia => (
                    <label
                        key={noticia.id}
                        className="gestion-noticia-eliminar-item"
                        style={{ justifyContent: "space-between" }}
                    >
                        <input
                            type="checkbox"
                            checked={seleccionadas.includes(noticia.id)}
                            onChange={() => handleCheckbox(noticia.id)}
                            style={{ marginRight: 8 }}
                        />
                        <span className="gestion-noticia-eliminar-item-desc">
                            Cat: {noticia.categoria} | Aut: {noticia.autor}
                        </span>
                        <strong style={{ marginLeft: "auto" }}>{noticia.title}</strong>
                    </label>
                ))}
            </div>
            {/* Botón de eliminación */}
            <button
                className="gestion-noticia-btn"
                style={{
                    background: seleccionadas.length ? '#d32f2f' : '#ccc',
                    color: '#fff',
                    padding: '10px 0',
                    borderRadius: 6,
                    fontWeight: 600,
                    cursor: seleccionadas.length ? 'pointer' : 'not-allowed'
                }}
                disabled={seleccionadas.length === 0}
                onClick={eliminarSeleccionadas}
            >
                Eliminar Noticias Seleccionadas
            </button>
        </div>
    </div>
);

export default EliminarTidings;