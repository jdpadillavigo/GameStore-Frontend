import { useNavigate } from 'react-router-dom'
import './News.css'
import portadaNoticias from "../../../../public/images/news/Portada_noticias.jpg"
import { nota } from '../../../components/Tidings/listaTidings'
import VerNoticias from '../../../components/Tidings/viewTidings'
import { typeCategory } from '../../../components/Tidings/viewTidings'
import { useNoticias } from '../../../contexts/noticiasContext'
import { useState } from 'react'

const ExploreAD = () => {
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
      <div>
          <img src={portadaNoticias} alt="Portada_noticias" className='img_portadaAdmin'/>
          <h1 className='title_noticiasAdmin'>Noticias</h1>
          <VerNoticias
            registros={noticiasSeleccionadas(listaDeNoticias)}
            categorias={categoriasUnicas(listaDeNoticias)}
            categoriaSeleccionada={categoriaSeleccionada}
            setCategoriaSeleccionada={setCategoriaSeleccionada}
          />
          <div className='borrar_temporal'>
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
  )
}

export default ExploreAD;