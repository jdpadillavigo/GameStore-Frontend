import { useState } from 'react'
import { nota } from '../../../components/Tidings/viewTidings'
import './CrearNoticia.css'

const CrearNoticia = ({
    onCrear,
    onVolver,
    totalNoticias
    }: {
        onCrear: (nueva: nota) => void,
        onVolver: () => void,
        totalNoticias: number
    }) => {
        const [form, setForm] = useState({
        title: '',
        categoria: '',
        autor: '',
        redaccion: '',
        image: ''
        })
        const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
            setForm({ ...form, [e.target.name]: e.target.value })
        }
        const handleSubmit = (e: React.FormEvent) => {
            e.preventDefault()
            const nuevaNoticia: nota = {
            id: totalNoticias + 1,
            title: form.title,
            categoria: form.categoria,
            autor: form.autor,
            redaccion: form.redaccion,
            image: form.image,
            dias: Math.floor(Math.random() * 26) + 5,
            select: false
            }
            onCrear(nuevaNoticia)
        }
    return (
        <div className="modal-crear-noticia">
        <div className="modal-content">
            <h2>Crear Nueva Noticia</h2>
            <form onSubmit={handleSubmit}>
            <div className="form-group">
                <label>Título</label>
                <input name="title" value={form.title} onChange={handleChange} required />
            </div>
            <div className="form-group">
                <label>Categoría</label>
                <input name="categoria" value={form.categoria} onChange={handleChange} required />
            </div>
            <div className="form-group">
                <label>Autor</label>
                <input name="autor" value={form.autor} onChange={handleChange} required />
            </div>
            <div className="form-group">
                <label>Redacción</label>
                <textarea name="redaccion" value={form.redaccion} onChange={handleChange} required />
            </div>
            <div className="form-group">
                <label>Imagen (URL):</label>
                <input name="image" value={form.image} onChange={handleChange} required />
            </div>
            <div className="form-footer">
                <button type="submit" className="new_noticia_btn_crear">Crear</button>
                <button type="button" className="new_noticia_btn_volver" onClick={onVolver}>Volver</button>
            </div>
            </form>
        </div>
        </div>
    )
}
export default CrearNoticia