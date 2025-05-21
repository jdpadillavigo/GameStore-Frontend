import React from "react"
import './AdminTidings.css'

interface EditarTidingsProps {
    form: {
        id: number;
        title: string;
        categoria: string;
        autor: string;
        redaccion: string;
        image: string;
    };
    handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    aplicarCambios: () => void;
    cancelarEdicion: () => void;
}

const EditarTidings: React.FC<EditarTidingsProps> = ({
    form,
    handleChange,
    aplicarCambios,
    cancelarEdicion
}) => (
    <div className="gestion-noticia-container" style={{ justifyContent: "center" }}>
        <form className="gestion-noticia-form">
            <h2 className="gestion-noticia-title">Editar Noticia</h2>
            <div className="gestion-noticia-field">
                <label className="gestion-noticia-label">Título:</label>
                <input
                    type="text"
                    className="gestion-noticia-input"
                    name="title"
                    value={form.title}
                    onChange={handleChange}
                />
            </div>
            <div className="gestion-noticia-field">
                <label className="gestion-noticia-label">Categoría:</label>
                <input
                    type="text"
                    className="gestion-noticia-input"
                    name="categoria"
                    value={form.categoria}
                    onChange={handleChange}
                />
            </div>
            <div className="gestion-noticia-field">
                <label className="gestion-noticia-label">Autor:</label>
                <input
                    type="text"
                    className="gestion-noticia-input"
                    name="autor"
                    value={form.autor}
                    onChange={handleChange}
                />
            </div>
            <div className="gestion-noticia-field">
                <label className="gestion-noticia-label">Redacción:</label>
                <textarea
                    className="gestion-noticia-input gestion-noticia-textarea"
                    name="redaccion"
                    rows={8}
                    value={form.redaccion}
                    onChange={handleChange}
                />
            </div>
            <div className="gestion-noticia-field">
                <label className="gestion-noticia-label">Imagen (URL):</label>
                <input
                    type="text"
                    className="gestion-noticia-input"
                    name="image"
                    value={form.image}
                    onChange={handleChange}
                />
            </div>
            <div className="gestion-noticia-editar-botones">
                <button
                    type="button"
                    className="gestion-noticia-btn gestion-noticia-btn-aplicar"
                    onClick={aplicarCambios}
                >
                    Aplicar Cambios
                </button>
                <button
                    type="button"
                    className="gestion-noticia-btn gestion-noticia-btn-cancelar"
                    onClick={cancelarEdicion}
                >
                    Cancelar
                </button>
            </div>
        </form>
    </div>
);

export default EditarTidings;