import { useState, useEffect } from 'react'
import './News.css'
import { useNoticias } from '../../../contexts/noticiasContext'
import { nota } from '../../../components/Tidings/viewTidings'
import CrearNoticia from '../../../components/Tidings/Admin/Create_update_noticia'

const ExploreAD = () => {
  const { listaDeNoticias, setListaDeNoticias } = useNoticias()
  const [creando, setCreando] = useState(false)
  const [editando, setEditando] = useState<nota | null>(null)
  const [eliminando, setEliminando] = useState<nota | null>(null)
  const [modoEliminar, setModoEliminar] = useState(false)

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

  const crearNoticia = (nueva: nota) => {
    setListaDeNoticias([...listaDeNoticias, nueva])
    console.log("crear noticia",listaDeNoticias)
    setCreando(false)
  }

  const editarNoticia = (noticiaEditada: nota) => {
    setListaDeNoticias(
      listaDeNoticias.map(noticia =>
        noticia.id === noticiaEditada.id ? noticiaEditada : noticia
      )
    )
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

  const eliminarNoticia = (id: number) => {
    setListaDeNoticias(listaDeNoticias.filter(noticia => noticia.id !== id))
    volverANoticias()
  }

  return (
    <div>
      <div className="img_portadaAdmin-gradient">
        <img src="/images/news/imagen_portada_admin.gif" alt="Portada_noticias" className="img_portadaAdmin" />
      </div>
      <div className='container'>
        <div className='workspace_container'>
          {/* Lista de noticias siempre visible */}
          <>
            <div className='title_noticiasAdmin'>LISTA DE NOTICIAS</div>
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
                {listaDeNoticias.map((elemento: nota) => (
                  <div className="ad_noticia" key={elemento.id}>
                    <div className='ad_noticia_contenido'>
                      <div className="ad_contenido_nota">
                        <div className="ad_titulo_nota"><strong>Titulo:</strong> {elemento.title} </div>
                        <div className="ad_autor_nota"><strong>Autor:</strong> {elemento.autor} </div>
                        <div className="ad_categoria_nota"><strong>Categoria:</strong> {elemento.categoria} </div>
                        <div className="ad_dias_nota"><strong>Redactado hace</strong> {elemento.dias} <strong>dias</strong> </div>
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
              <CrearNoticia
                onCrear={crearNoticia}
                onVolver={volverANoticias}
                generarID={
                  listaDeNoticias.length === 0
                    ? 1
                    : Math.max(...listaDeNoticias.map(n => n.id)) + 1
                }
              />
            </div>
          )}
          {editando && !modoEliminar && (
            <div className="modal_overlay">
              <CrearNoticia
                onEditar={editarNoticia}
                noticiaEditar={editando}
                onVolver={volverANoticias}
                generarID={
                  listaDeNoticias.length === 0
                    ? 1
                    : Math.max(...listaDeNoticias.map(n => n.id)) + 1
                }
              />
            </div>
          )}
          {modoEliminar && eliminando && (
            <div className="modal_overlay">
              <CrearNoticia
                noticiaEditar={eliminando}
                modoEliminar={true}
                onEliminar={eliminarNoticia}
                onVolver={volverANoticias}
                generarID={
                  listaDeNoticias.length === 0
                    ? 1
                    : Math.max(...listaDeNoticias.map(n => n.id)) + 1
                }
              />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default ExploreAD