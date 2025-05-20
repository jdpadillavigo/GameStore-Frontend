import { useState } from 'react';
import { nota } from '../../../components/Tidings/listaTidings';
import VerNoticias from '../../../components/Tidings/viewTidings'
import { typeCategory } from '../../../components/Tidings/filterTidings';
import { listaDeNoticias } from '../../GamingNews/GamingNews';
import portadaNoticias from "/images/news/Portada_noticias.jpg";
import './News.css';

const News = () => {
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState<string>('Todos');
  const noticiasSeleccionadas = (datos: nota[]) => {
    if (categoriaSeleccionada === 'Todos') return datos;
    return datos.filter((elem: nota) => elem.categoria === categoriaSeleccionada);
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

export default News;