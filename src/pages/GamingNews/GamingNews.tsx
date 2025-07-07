import './GamingNews.css'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import VerNoticias, { nota } from '../../components/Tidings/viewTidings'
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
  const [autorSeleccionado, setAutorSeleccionado] = useState<string>('Todos')
  const [orden, setOrden] = useState<'antiguo' | 'actual'>('actual')

  // Filtrado de las noticias y ordenamiento
  const noticiasFiltradas = (datos: nota[]) => {
    let filtradas = datos
    if (categoriaSeleccionada !== 'Todos') {
      filtradas = filtradas.filter(elem => elem.categoria === categoriaSeleccionada)
    }
    if (autorSeleccionado !== 'Todos') {
      filtradas = filtradas.filter(elem => elem.autor === autorSeleccionado)
    }
    if (orden === 'actual') {
      filtradas = [...filtradas].sort((a, b) => b.dias - a.dias)
    } else {
      filtradas = [...filtradas].sort((a, b) => a.dias - b.dias)
    }
    return filtradas
  }

  // Categorías únicas
  const categoriasUnicas = (datos: nota[]) => {
    const todasCategorias = datos.map(elem => elem.categoria)
    return ['Todos', ...Array.from(new Set(todasCategorias))]
  }

  // Autores únicos
  const autoresUnicos = (datos: nota[]) => {
    const todosAutores = datos.map(elem => elem.autor)
    return ['Todos', ...Array.from(new Set(todosAutores))]
  }
  return (
      <div>
          <div className="img_portadaNews-gradient">
            <img src='/images/news/imagen_portada.gif' alt="Portada_noticias" className='img_portada'/>
          </div>
          <h1 className='title_noticias'>Noticias</h1>
          <VerNoticias
            registros={noticiasFiltradas(listaDeNoticias)}
            categorias={categoriasUnicas(listaDeNoticias)}
            categoriaSeleccionada={categoriaSeleccionada}
            setCategoriaSeleccionada={setCategoriaSeleccionada}
            autores={autoresUnicos(listaDeNoticias)}
            autorSeleccionado={autorSeleccionado}
            setAutorSeleccionado={setAutorSeleccionado}
            orden={orden}
            setOrden={setOrden}
          />
      </div>
  )
}

export default Explore;
