import React from "react"
import portadaNoticias from "/images/news/Portada_noticias.jpg"
import './AdminTidings.css'

interface VistaPreEdicionProps {
    categorias: string[];
    autores: string[];
    filtroCategoria: string;
    setFiltroCategoria: (cat: string) => void;
    filtroAutor: string;
    setFiltroAutor: (autor: string) => void;
    noticiasFiltradas: any[];
    handleEditar: (noticia: any) => void;
    navigateInicio: () => void;
}

const VistaPreEdicion: React.FC<VistaPreEdicionProps> = ({
    categorias,
    autores,
    filtroCategoria,
    setFiltroCategoria,
    filtroAutor,
    setFiltroAutor,
    noticiasFiltradas,
    handleEditar,
    navigateInicio
}) => (
    <div className="gestion-noticia-container gestion-noticia-editar-outer">
        <div className="gestion-noticia-form">
            <br></br>
            <img src={portadaNoticias} className="gestion-noticia-img" />
            <h2 className="gestion-noticia-title">Edición de Noticias</h2>
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
            <div className="gestion-noticia-eliminar-lista">
                {noticiasFiltradas.length === 0 && (
                    <div className="gestion-noticia-eliminar-vacio">No hay noticias para mostrar.</div>
                )}
                {noticiasFiltradas.map(noticia => (
                    <div
                        key={noticia.id}
                        className="gestion-noticia-eliminar-item"
                    >
                        <strong>{noticia.title}</strong>
                        <span className="gestion-noticia-eliminar-item-desc">
                            {noticia.categoria} | {noticia.autor}
                        </span>
                        <button
                            className="gestion-noticia-btn gestion-noticia-btn-editar"
                            style={{ marginLeft: "auto" }}
                            onClick={() => handleEditar(noticia)}
                        >
                            Editar
                        </button>
                    </div>
                ))}
            </div>
        </div>
    </div>
);

export default VistaPreEdicion;