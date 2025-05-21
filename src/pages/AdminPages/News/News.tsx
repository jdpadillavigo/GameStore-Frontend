import { useNavigate } from 'react-router-dom'
import './News.css'
import portadaNoticias from "/images/news/Portada_noticias.jpg"
import { nota } from '../../../components/Tidings/listaTidings'
import VerNoticias from '../../../components/Tidings/viewTidings'
import { typeCategory } from '../../../components/Tidings/filterTidings'
import { useNoticias } from '../../../components/Tidings/noticiasContext'
import { useState } from 'react'

const Explore = () => {
  const { listaDeNoticias } = useNoticias()
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState<string>('Todos')
  const navigate = useNavigate()
  const noticiasSeleccionadas = (datos: nota[]) => {
    if (categoriaSeleccionada === 'Todos') return datos
    return datos.filter((elem: nota) => elem.categoria === categoriaSeleccionada)
  }
  const categoriasUnicas = (datos : nota[]) => {
    const todasCategorias = datos.map((elem : nota) => elem.categoria)
    const [categorias,setCategorias] = useState <typeCategory[]>(['Todos'])
    todasCategorias.map((item : typeCategory)=>{
      if(!categorias.includes(item)){
        setCategorias([...categorias,item])
      }
    })
    return categorias
  }
  return (
    <div className='news-page'>
        <img src={portadaNoticias} alt="Portada_noticias" className='portada-noticias'/>
        <div className="admin-bar">
          <div className="admin-description">
            <h1>Modo administrador</h1>
            <div>
              Como administrador puede gestionar y controlar la visualización de todas las noticias que ven los usuarios. Es decir, tiene el poder de administrar el contenido publicado, asegurando que la información sea relevante y actualizada.
            </div>
            <div>
              <strong>Crear:</strong>
              Agrega una nueva noticia a la página completando los campos requeridos. La noticia será visible para todos los usuarios una vez publicada.
            </div>
            <div>
              <strong>Editar:</strong>
              Modifica el contenido de una noticia especifica; el contenido, la categoría u otros detalles del mismo. Esto permite mantener la información precisa y actualizada en todo momento.
            </div>
            <div>
              <strong>Eliminar:</strong>
              Elimina de forma permanente la noticia seleccionada, quitándola tanto de la página como de la vista de los usuarios.
            </div>
          </div>
          <div className="admin-buttons-centered">
            <button
              className="admin-btn crear"
              onClick={() => navigate('/a/noticias/gestion', { state: { accion: 'crear' } })}
            >
              Crear
            </button>
            <button
              className="admin-btn editar"
              onClick={() => navigate('/a/noticias/gestion', { state: { accion: 'editar' } })}
            >
              Editar
            </button>
            <button
              className="admin-btn eliminar"
              onClick={() => navigate('/a/noticias/gestion', { state: { accion: 'eliminar' } })}
            >
              Eliminar
            </button>
          </div>
        </div>
        <h1 className='title_noticias'>Noticias</h1>
        <VerNoticias
          registros={noticiasSeleccionadas(listaDeNoticias)}
          categorias={categoriasUnicas(listaDeNoticias)}
          categoriaSeleccionada={categoriaSeleccionada}
          setCategoriaSeleccionada={setCategoriaSeleccionada}
        />
    </div>
  )
}

export default Explore;