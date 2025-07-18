import { useState, useEffect } from 'react'
import './News.css'
import { nota } from '../../../components/Tidings/viewTidings'
import CrudNoticia from '../../../components/Tidings/Admin/Create_update_noticia'
const URL = "http://localhost:5000"

const ExploreAD = () => {
  const [creando, setCreando] = useState(false)
  const [editando, setEditando] = useState<nota | null>(null)
  const [eliminando, setEliminando] = useState<nota | null>(null)
  const [modoEliminar, setModoEliminar] = useState(false)

  const [ lista, setLista ] = useState<nota[]>([])

  const httpObtenerNoticias = async() => {
    try{
      const response = await fetch(`${URL}/noticias`)
      const data = await response.json()
      setLista(data)
    }catch(error) {
      console.error(error);
    }
  }
  useEffect(() => {
    httpObtenerNoticias()
  }, [])

  const httpInsertarNoticia = async (elem : nota) => {
    try{
      const resp = await fetch(`${URL}/noticias`, {
        method : "post",
        headers : {
          "Content-Type" : "application/json"
        },
        body : JSON.stringify(elem)
      })
      const data = await resp.json()
      console.log('Noticias recibidas:', data)
    }catch(error){
      console.error(error)
    }
  }

  const httpEditarNoticia = async (elem : nota) => {
    try{
      const resp = await fetch(`${URL}/noticias/${elem.id}`, {
        method : "PUT",
        headers : {
          "Content-Type" : "application/json"
        },
        body : JSON.stringify(elem)
      })
    } catch(error){
      console.error(error)
    }
  }

  const httpEliminarNoticia = async (ntId : number) => {
    try{
      const resp = await fetch(`${URL}/noticias/${ntId}`, {
        method : "DELETE",
        body : JSON.stringify(ntId)
      })
    } catch(error){
      console.error(error)
    }
  }

  useEffect(() => {
    // Escucha el evento para activar modo eliminar desde CrearNoticia
    const handler = () => setModoEliminar(true)
    window.addEventListener('activarModoEliminar', handler)
    return () => window.removeEventListener('activarModoEliminar', handler)
  }, [])

  const volverANoticias = () => {
    setCreando(false)
    setEditando(null)
    setEliminando(null)
    setModoEliminar(false)
  }

  const crearNoticia = async (nueva: nota) => {
    //console.log(nueva)
    await httpInsertarNoticia(nueva)
    await httpObtenerNoticias()
    setCreando(false)
  }

  const editarNoticia = async (noticiaEditada: nota) => {
    //console.log(noticiaEditada)
    await httpEditarNoticia(noticiaEditada)
    await httpObtenerNoticias()
    setEditando(null)
  }

  const handleEditarClick = (noticia: nota) => {
    setEditando(noticia)
    setCreando(false)
    setEliminando(null)
    setModoEliminar(false)
  }

  const handleEliminarClick = (noticia: nota) => {
    setEliminando(noticia)
    setCreando(false)
    setEditando(null)
    setModoEliminar(true)
  }

  const eliminarNoticia = async (id: number) => {
    //console.log(id)
    await httpEliminarNoticia(id)
    await httpObtenerNoticias()
    volverANoticias()
  }

  return (
    <div>
      <div className="space_white_admin"/>
      <div className='container'>
        <div className='workspace_container'>
          {/* Lista de noticias siempre visible */}
          <>
            <div className='title_noticiasAdmin'>Noticias</div>
            <div className="ad_crear_noticia_row">
              <div><strong>Crear una noticia:</strong></div>
              <button
                className="ad_noticia_btn_crear"
                onClick={() => setCreando(true)}
              >
                Crear
              </button>
            </div>
            <div className='ad_vistaNoticia'>
              <div className='ad_noticia_container'>
                {lista.map((elemento: nota) => (
                  <div className="ad_noticia" key={elemento.id}>
                    <div className='ad_noticia_contenido'>
                      <div className="ad_contenido_nota">
                        <div className="ad_titulo_nota"><strong>Titulo:</strong> {elemento.title} </div>
                        <div className="ad_autor_nota"><strong>Autor:</strong> {elemento.author} </div>
                        <div className="ad_categoria_nota"><strong>Categoria:</strong> {elemento.category} </div>
                        <div className="ad_dias_nota">
                          {elemento.days === 0
                          ? `Redactado hoy`
                          : `Redactado hace ${elemento.days} días`}
                        </div>
                      </div>
                      <div className="ad_img_nota">
                        <img src={elemento.image} alt="imgNoticias" />
                      </div>
                    </div>
                    <div className='ad_noticia_btns'>
                      <button
                        className="ad_noticia_btn_editar"
                        onClick={() => handleEditarClick(elemento)}
                      >
                        Editar
                      </button>
                      <button
                        className="ad_noticia_btn_eliminar"
                        onClick={() => handleEliminarClick(elemento)}
                      >
                        Eliminar
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
          {/* Modales superpuestos */}
          {creando && !modoEliminar && (
            <div className="modal_overlay">
              <CrudNoticia
                onCrear={crearNoticia}
                onVolver={volverANoticias}
                generarID={Math.floor(Math.random() * (2100000000 - 1000000000 + 1)) + 1000000000}
              />
            </div>
          )}
          {editando && !modoEliminar && (
            <div className="modal_overlay">
              <CrudNoticia
                onEditar={editarNoticia}
                noticiaEditar={editando}
                onVolver={volverANoticias}
                generarID={0}
              />
            </div>
          )}
          {modoEliminar && eliminando && (
            <div className="modal_overlay">
              <CrudNoticia
                noticiaEditar={eliminando}
                modoEliminar={true}
                onEliminar={eliminarNoticia}
                onVolver={volverANoticias}
                generarID={0}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default ExploreAD