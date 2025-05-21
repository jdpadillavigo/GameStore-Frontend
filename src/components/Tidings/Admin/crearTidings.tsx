import React, { RefObject } from 'react'
import './AdminTidings.css'

interface CrearTidingsProps {
    tituloRef: RefObject<HTMLInputElement|null>;
    categoriaRef: RefObject<HTMLInputElement|null>;
    autorRef: RefObject<HTMLInputElement|null>;
    redaccionRef: RefObject<HTMLTextAreaElement|null>;
    imagenRef: RefObject<HTMLInputElement|null>;
    subirNoticiaOnClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
    portadaNoticias: string;
}

const CrearTidings: React.FC<CrearTidingsProps> = ({
    tituloRef,
    categoriaRef,
    autorRef,
    redaccionRef,
    imagenRef,
    subirNoticiaOnClick,
    portadaNoticias
}) => (
    <div className="gestion-noticia-container">
        <form className="gestion-noticia-form">
            <img src={portadaNoticias} alt="Portada_noticia" className="gestion-noticia-img" />
            <h2 className="gestion-noticia-title">Crear Noticia</h2>
            <p className="gestion-noticia-desc">Rellena todos los campos para crear una nueva noticia.</p>
            <div className="gestion-noticia-field">
                <label className="gestion-noticia-label">Título: </label>
                <input type="text" className="gestion-noticia-input" ref={tituloRef}/>
            </div>
            <div className="gestion-noticia-field">
                <label className="gestion-noticia-label">Categoria: </label>
                <input type="text" id="categoria" className="gestion-noticia-input" ref={categoriaRef}/>
            </div>
            <div className="gestion-noticia-field">
                <label className="gestion-noticia-label">Autor: </label>
                <input type="text" id="autor" className="gestion-noticia-input" ref={autorRef}/>
            </div>
            <div className="gestion-noticia-field">
                <label className="gestion-noticia-label">Redaccion: </label>
                <textarea
                    id="redaccion"
                    className="gestion-noticia-input gestion-noticia-textarea"
                    rows={10}
                    ref={redaccionRef}
                />
            </div>
            <div className="gestion-noticia-field">
                <label className="gestion-noticia-label">Imagen (URL): </label>
                <input type="text" id="imagen" className="gestion-noticia-input" ref={imagenRef}/>
            </div>
            <button
                type="submit"
                className="gestion-noticia-btn"
                onClick={subirNoticiaOnClick}
            >
                Crear Noticia
            </button>
        </form>
    </div>
)
export default CrearTidings;