import React, { useState } from 'react'
import './News.css'
import portadaNoticias from "../../../../public/images/news/Portada_noticias.jpg"
import { useNoticias } from '../../../contexts/noticiasContext'
import { nota } from '../../../components/Tidings/viewTidings'
import CrearNoticia from '../../../components/Tidings/Admin/CrearNoticia'

const ExploreAD = ({
  CrearNoticiaComponent = CrearNoticia // Permite inyectar el componente de crear noticia
  }:
  {CrearNoticiaComponent?:
    React.ComponentType<{
    onCrear: (nueva: nota) => void,
    onVolver: () => void,
    totalNoticias: number
    }>
  } = {}) => {
    const { listaDeNoticias, setListaDeNoticias } = useNoticias()
    const [creando, setCreando] = useState(false)
    const volverANoticias = () => setCreando(false)
    const crearNoticia = (nueva: nota) => {
      setListaDeNoticias([...listaDeNoticias, nueva])
      setCreando(false)
    }
    const eliminarOnClick = (id: number) => {
      setListaDeNoticias(listaDeNoticias.filter(noticia => noticia.id !== id))
    }
  return <div>
      <img src={portadaNoticias} alt="Portada_noticias" className='img_portadaAdmin' />
      <div className='container'>
        <div className='workspace_container'>
          {creando
            ? (<CrearNoticiaComponent
              onCrear={crearNoticia}
              onVolver={volverANoticias}
              totalNoticias={listaDeNoticias.length}
              />)
            : (<>
              <div className='title_noticiasAdmin'>LISTA DE NOTICIAS</div>
              <div className="ad_crear_noticia_row">
                <div><strong>Crear una noticia:</strong>    </div>
                <button
                  className="ad_noticia_btn_crear"
                  onClick={() => setCreando(true)}
                >
                  Crear
                </button>
              </div>
              <div className='ad_vistaNoticia'>
                <div className='ad_noticia_container'>
                  {listaDeNoticias.map((elemento: nota) => {
                    return (
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
                          <button className="ad_noticia_btn_editar">
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
                    )
                  })}
                </div>
              </div>
              </>)
          }
        </div>
      </div>
  </div>
}
export default ExploreAD