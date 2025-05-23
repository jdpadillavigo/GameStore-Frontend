import './GamingNews.css'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import VerNoticias from '../../components/Tidings/viewTidings'
import { typeCategory } from '../../components/Tidings/filterTidings';
import { useNoticias } from '../../components/Tidings/noticiasContext';
import { nota } from '../../components/Tidings/listaTidings';
import portadaNoticias from '../../../public/images/news/Portada_noticias.jpg'

const Explore = () => {
  const navigate = useNavigate()

  useEffect(() => {
    const rol = localStorage.getItem('rol')
    if (rol === 'usuario') {
      navigate('/noticias', { replace: true })
    }
  }, [navigate])

  const { listaDeNoticias } = useNoticias();
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
        <img src={portadaNoticias} alt="Portada_noticias" className='portada-noticias'/>
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
