import './GamingNews.css'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import VerNoticias, { nota } from '../../components/Tidings/viewTidings'
import { typeCategory } from '../../components/Tidings/viewTidings'
import { useNoticias } from '../../contexts/noticiasContext'

const Explore = () => {
  const navigate = useNavigate()

  useEffect(() => {
    const rol = localStorage.getItem('rol')
    if (rol === 'admin') {
      navigate('/a/noticias')
    }
  }, [navigate])

  const { listaDeNoticias } = useNoticias()
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState<string>('Todos')
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
          <div className="img_portadaNews-gradient">
            <img src='/images/news/Portada_noticias.jpg' alt="Portada_noticias" className='img_portada'/>
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
