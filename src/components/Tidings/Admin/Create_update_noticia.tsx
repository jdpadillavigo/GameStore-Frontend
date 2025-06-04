import { useState, useEffect } from 'react'
import { nota } from '../viewTidings'
import './Create_update_noticia.css'

interface CrearNoticiaProps {
  onCrear?: (nueva: nota) => void
  onEditar?: (editada: nota) => void
  onVolver: () => void
  totalNoticias: number
  noticiaEditar?: nota
}

const CrearNoticia = ({
  onCrear,
  onEditar,
  onVolver,
  totalNoticias,
  noticiaEditar
}: CrearNoticiaProps) => {
  const [form, setForm] = useState({
    title: '',
    categoria: '',
    autor: '',
    redaccion: '',
    image: ''
  })

  useEffect(() => {
    if (noticiaEditar) {
      setForm({
        title: noticiaEditar.title,
        categoria: noticiaEditar.categoria,
        autor: noticiaEditar.autor,
        redaccion: noticiaEditar.redaccion,
        image: noticiaEditar.image
      })
    } else {
      setForm({
        title: '',
        categoria: '',
        autor: '',
        redaccion: '',
        image: ''
      })
    }
  }, [noticiaEditar])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (noticiaEditar && onEditar) {
      const noticiaActualizada: nota = {
        ...noticiaEditar,
        ...form
      }
      onEditar(noticiaActualizada)
    } else if (onCrear) {
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
  }

  return (
    <div className="modal_crear_noticia">
      <div className="modal_content">
        <h2>{noticiaEditar ? "Editar Noticia" : "Crear Nueva Noticia"}</h2>
        <form onSubmit={handleSubmit}>
          <div className="form_group">
            <label>Título</label>
            <input name="title" value={form.title} onChange={handleChange} required />
          </div>
          <div className="form_group">
            <label>Categoría</label>
            <input name="categoria" value={form.categoria} onChange={handleChange} required />
          </div>
          <div className="form_group">
            <label>Autor</label>
            <input name="autor" value={form.autor} onChange={handleChange} required />
          </div>
          <div className="form_group">
            <label>Redacción</label>
            <textarea name="redaccion" value={form.redaccion} onChange={handleChange} required />
          </div>
          <div className="form_group">
            <label>Imagen (URL):</label>
            <input name="image" value={form.image} onChange={handleChange} required />
          </div>
          <div className="form_footer">
            <button type="submit" className="Create_Update_noticia_btn">
              {noticiaEditar ? "Editar" : "Crear"}
            </button>
            <button type="button" className="new_noticia_btn_volver" onClick={onVolver}>Volver</button>
          </div>
        </form>
      </div>
    </div>
  )
}
export default CrearNoticia