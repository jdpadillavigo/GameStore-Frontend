import './GamingNews.css'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import VerNoticias, { nota } from '../../components/Tidings/viewTidings'
const URL = "http://localhost:5000"

const Explore = () => {
  const navigate = useNavigate()

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

  useEffect(() => {
    const rol = localStorage.getItem('rol')
    if (rol === 'admin') {
      navigate('/a/noticias')
    }
  }, [navigate])

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
          <div className="space_blank"/>
          <h1 className='title_noticias'>Noticias</h1>
          <VerNoticias
            registros={noticiasFiltradas(lista)}
            categorias={categoriasUnicas(lista)}
            categoriaSeleccionada={categoriaSeleccionada}
            setCategoriaSeleccionada={setCategoriaSeleccionada}
            autores={autoresUnicos(lista)}
            autorSeleccionado={autorSeleccionado}
            setAutorSeleccionado={setAutorSeleccionado}
            orden={orden}
            setOrden={setOrden}
          />
      </div>
  )
}

export default Explore;
