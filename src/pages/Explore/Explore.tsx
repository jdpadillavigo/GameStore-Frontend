import './Explore.css';
import portadaNoticias from "../../assets/images/noticia/Portada_noticias.jpg"
import { nota } from '../../components/Tidings/listaTidings'
import { useState } from 'react'
import VerNoticias from '../../components/Tidings/viewTidings'
import { typeCategory } from '../../components/Tidings/filterTidings';
import { useNoticias } from '../../components/Tidings/noticiasContext';

const Explore = () => {
  const { listaDeNoticias,setListaDeNoticias } = useNoticias();
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState<string>('All')
  const noticiasSeleccionadas = (datos: nota[]) => {
    if (categoriaSeleccionada === 'All') return datos;
    return datos.filter((elem: nota) => elem.categoria === categoriaSeleccionada)
  }
  const categoriasUnicas = (datos : nota[]) => {
    const todasCategorias = datos.map((elem : nota) => elem.categoria)
    const [categorias,setCategorias] = useState <typeCategory[]>(['All'])
    todasCategorias.map((item : typeCategory)=>{
          if(!categorias.includes(item)){
              setCategorias([...categorias,item])
          }
    })
    return categorias
  }

  return (
    <div>
        <img src={portadaNoticias} alt="Portada_noticias" />
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