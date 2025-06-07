import { useState } from 'react'
import './News.css'
import { useNoticias } from '../../../contexts/noticiasContext'
import { nota } from '../../../components/Tidings/viewTidings'
import CrearNoticia from '../../../components/Tidings/Admin/Create_update_noticia'

const ExploreAD = () => {
  const { listaDeNoticias, setListaDeNoticias } = useNoticias()
  const [creando, setCreando] = useState(false)
  const [editando, setEditando] = useState<nota | null>(null)
  const [eliminada, setEliminada] = useState<nota | null>(null)

  const volverANoticias = () => {
    setCreando(false)
    setEditando(null)
    setEliminada(null)
  }

  const crearNoticia = (nueva: nota) => {
    setListaDeNoticias([...listaDeNoticias, nueva])
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

  const eliminarOnClick = (id: number) => {
    const noticia = listaDeNoticias.find(noticia => noticia.id === id)
    setListaDeNoticias(listaDeNoticias.filter(noticia => noticia.id !== id))
    if (noticia) {
      setEliminada(noticia)
      setCreando(false)
      setEditando(null)
    }
  }

  const handleEditarClick = (noticia: nota) => {
    setEditando(noticia)
    setCreando(false)
    setEliminada(null)
  }

  return (
    <div>
      <div className="img_portadaAdmin-gradient">
        <img src="/images/news/imagen_portada_prueba3.gif" alt="Portada_noticias" className="img_portadaAdmin" />
      </div>
      <div className='container'>
        <div className='workspace_container'>
          {eliminada ? (
            <CrearNoticia
              noticiaEliminada={eliminada}
              onVolver={volverANoticias}
              totalNoticias={listaDeNoticias.length}
            />
          ) : creando ? (
            <CrearNoticia
              onCrear={crearNoticia}
              onVolver={volverANoticias}
              totalNoticias={listaDeNoticias.length}
            />
          ) : editando ? (
            <CrearNoticia
              onEditar={editarNoticia}
              noticiaEditar={editando}
              onVolver={volverANoticias}
              totalNoticias={listaDeNoticias.length}
            />
          ) : (
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
                          onClick={() => eliminarOnClick(elemento.id)}
                        >
                          Eliminar
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default ExploreAD