import { useEffect, useState } from 'react'
import { nota } from '../viewTidings'
import './Create_update_noticia.css'
import { listaCategoriasNoticias } from '../../../contexts/noticiasContext' 

interface CrearNoticiaProps {
  onCrear?: (nueva: nota) => void
  onEditar?: (editada: nota) => void
  onEliminar?: (id: number) => void // Nuevo: para eliminar
  onVolver: () => void
  generarID: number
  noticiaEditar?: nota
  modoEliminar?: boolean // Nuevo: para saber si mostrar la vista de eliminar
}

const CrearNoticia = ({
  onCrear,
  onEditar,
  onEliminar,
  onVolver,
  generarID,
  noticiaEditar,
  modoEliminar
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
        id: generarID,
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

  // Vista de confirmación de eliminación
  if (modoEliminar && noticiaEditar) {
    return (
      <div className="modal_eliminar">
        <div className="modal_eliminar_content">
          <div className="modal_eliminar_content_mensaje">
            ¿Esta seguro que ud. quiere eliminar la noticia?
          </div>
          <div className="modal_eliminar_content_buttons">
            {/*Create_Update_noticia_btn y new_noticia_btn_volver estan al final del Create_update_noticia.css*/}
            <button
              className="Create_Update_noticia_btn"
              onClick={() => {
                if (onEliminar) onEliminar(noticiaEditar.id)
              }}
            >
              Confirmar
            </button>
            <button
              className="new_noticia_btn_volver"
              onClick={onVolver}
            >
              Volver
            </button>
          </div>
        </div>
      </div>
    )
  }

  // Vista normal de crear/editar
  return (
    <div className="modal_crear_noticia">
      <div className="modal_content">
        <h2>{noticiaEditar ? "Editar Noticia" : "Crear Nueva Noticia"}</h2>
        <form onSubmit={handleSubmit}>
          <div className="form_group">
            <label>Título</label>
            <input
              name="title"
              value={form.title}
              onChange={handleChange}
              required
              onInvalid={e => (e.currentTarget.setCustomValidity('No ingresó el titulo'))}
              onInput={e => (e.currentTarget.setCustomValidity(''))}
            />
          </div>
          <div className="form_group">
            <label>Categoría</label>
            <select
              name="categoria"
              value={form.categoria}
              onChange={handleChange}
              required
              onInvalid={e => (e.currentTarget.setCustomValidity('No seleccionó la categoria'))}
              onInput={e => (e.currentTarget.setCustomValidity(''))}
            >
              <option value="" hidden>Selecciona una categoría</option>
              {listaCategoriasNoticias.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>
          <div className="form_group">
            <label>Autor</label>
            <input
              name="autor"
              value={form.autor}
              onChange={handleChange}
              required
              onInvalid={e => (e.currentTarget.setCustomValidity('No ingresó el autor'))}
              onInput={e => (e.currentTarget.setCustomValidity(''))}
            />
          </div>
          <div className="form_group">
            <label>Redacción</label>
            <textarea
              name="redaccion"
              value={form.redaccion}
              onChange={handleChange}
              required
              onInvalid={e => (e.currentTarget.setCustomValidity('No ingresó el redacción'))}
              onInput={e => (e.currentTarget.setCustomValidity(''))}
            />
          </div>
          <div className="form_group">
            <label>Imagen (URL):</label>
            <input
              name="image"
              value={form.image}
              onChange={handleChange}
              required
              pattern="https://.*"
              onInvalid={e =>{
                if (!e.currentTarget.value) {
                  e.currentTarget.setCustomValidity('No ingresó la url de la imagen');
                } else if (!/^https:\/\/.*/.test(e.currentTarget.value)) {
                  e.currentTarget.setCustomValidity('Ingresó una URL incorrecta');
                } else {
                  e.currentTarget.setCustomValidity('');
                }
              }}
              onInput={e => (e.currentTarget.setCustomValidity(''))}
            />
          </div>
          <div className="form_footer">
            <button type="submit" className="Create_Update_noticia_btn">
              {noticiaEditar ? "Editar" : "Crear"}
            </button>
            <button type="button" className="new_noticia_btn_volver" onClick={onVolver}>Volver</button>
            {noticiaEditar && onEliminar && (
              <button
                type="button"
                className="ad_noticia_btn_eliminar"
                style={{ marginLeft: 8 }}
                onClick={e => {
                  e.preventDefault()
                  // Cambia a modo eliminar
                  window.dispatchEvent(new CustomEvent('activarModoEliminar'))
                }}
              >
                Eliminar
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  )
}
export default CrearNoticia