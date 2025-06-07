import { useEffect, useState } from 'react'
import { nota } from '../viewTidings'
import './Create_update_noticia.css'
import { listaCategoriasNoticias } from '../../../contexts/noticiasContext' 

interface CrearNoticiaProps {
  onCrear?: (nueva: nota) => void
  onEditar?: (editada: nota) => void
  onVolver: () => void
  totalNoticias: number
  noticiaEditar?: nota
  noticiaEliminada?: nota // Nuevo prop
}

const CrearNoticia = ({
  onCrear,
  onEditar,
  onVolver,
  totalNoticias,
  noticiaEditar,
  noticiaEliminada
}: CrearNoticiaProps) => {
  const [form, setForm] = useState({
    title: '',
    categoria: '',
    autor: '',
    redaccion: '',
    image: ''
  })

  // Muestra el mensaje de eliminación y despues de un tiempo sale de la ventana
  useEffect(() => {
    if (noticiaEliminada) {
      const timer = setTimeout(() => {
        onVolver()
      }, 2000)
      return () => clearTimeout(timer)
    }
  }, [noticiaEliminada, onVolver])

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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
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

  if (noticiaEliminada) {
    return (
      <div className="modal_crear_noticia">
        <div className="modal_content">
          <div className="noticia_eliminada_titulo">
            {noticiaEliminada.title.toUpperCase()}
          </div>
          <div className="noticia_eliminada_imagen">
            <img
              src={noticiaEliminada.image}
              alt={noticiaEliminada.title}
              className="noticia_eliminada_img"
            />
          </div>
          <div className="noticia_eliminada_mensaje">
            NOTICIA ELIMINADA
          </div>
        </div>
      </div>
    )
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
            <select
              name="categoria"
              value={form.categoria}
              onChange={handleChange}
              required
            >
              <option value="" hidden>Selecciona una categoría</option>
              {listaCategoriasNoticias.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
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