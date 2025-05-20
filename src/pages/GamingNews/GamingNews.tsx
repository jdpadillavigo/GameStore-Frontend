import { useState } from 'react'
import VerNoticias from '../../components/Tidings/viewTidings'
import { nota } from '../../components/Tidings/listaTidings'
import { typeCategory } from '../../components/Tidings/filterTidings'
import portadaNoticias from "/images/news/Portada_noticias.jpg"

export const listaDeNoticias : nota[] = [
  {
    id: 1,
    title: "Las suscripciones vitalicias ya no duran toda la vida y el mejor ejemplo llega de la mano de una empresa de VPN",
    categoria: "Tecnologia",
    autor: "Brenda Giacconi",
    dias: 3,
    select: false
  },
  {
    id: 2,
    title: "Es un juego de acción y fantasía, se está desarrollando en España y lo mejor es que podrás probarlo pronto. Blades of Fire anuncia una demo",
    categoria: "Tecnologia",
    autor: "Abelardo González",
    dias: 1,
    select: false
  },
  {
    id: 3,
    title: "Cómo una serie fue capaz de redefinir el lore de todo un juego y ser (casi) tan famosa como él",
    categoria: "League of Legends",
    autor: "Bárbara Gimeno",
    dias: 0,
    select: false
  },
  {
    id: 4,
    title: "Tras registrar resultados excelentes, Microsoft saca la guadaña y despide a casi 7.000 empleados en todo el mundo",
    categoria: "Tecnologia",
    autor: "Brenda Giacconi",
    dias: 5,
    select: false
  },
  {
    id: 5,
    title: "Willyrex estaría reuniendo a Los Vengadores del streaming para un último baile de Karmaland",
    categoria: "Entretenimiento",
    autor: "José A. Mateo Albuerne",
    dias: 1,
    select: false
  },
  {
    id: 6,
    title: "Hace 60 años salió en una serie de ciencia ficción, hoy es una de las grandes leyendas del género. ¿Reconoces a Kurt Russell?",
    categoria: "Cine",
    autor: "Marcos Yasif",
    dias: 8,
    select: false
  },
  {
    id: 7,
    title: "Es un juegazo. Rumores o no, un exdesarrollador de Rockstar tiene claro que GTA 4 debería ser rescatado como es debido con un remaster",
    categoria: "Videojuegos",
    autor: "Alberto Lloria",
    dias: 10,
    select: false
  }
]

/*export const [listaDeNoticias,setListaDeNoticias] = useState([
    {
      id: 1,
      title: "Las suscripciones vitalicias ya no duran toda la vida y el mejor ejemplo llega de la mano de una empresa de VPN",
      categoria: "Tecnologia",
      autor: "Brenda Giacconi",
      dias: 3,
      select: false
    },
    {
      id: 2,
      title: "Es un juego de acción y fantasía, se está desarrollando en España y lo mejor es que podrás probarlo pronto. Blades of Fire anuncia una demo",
      categoria: "Tecnologia",
      autor: "Abelardo González",
      dias: 1,
      select: false
    },
    {
      id: 3,
      title: "Cómo una serie fue capaz de redefinir el lore de todo un juego y ser (casi) tan famosa como él",
      categoria: "League of Legends",
      autor: "Bárbara Gimeno",
      dias: 0,
      select: false
    },
    {
      id: 4,
      title: "Tras registrar resultados excelentes, Microsoft saca la guadaña y despide a casi 7.000 empleados en todo el mundo",
      categoria: "Tecnologia",
      autor: "Brenda Giacconi",
      dias: 5,
      select: false
    },
    {
      id: 5,
      title: "Willyrex estaría reuniendo a Los Vengadores del streaming para un último baile de Karmaland",
      categoria: "Entretenimiento",
      autor: "José A. Mateo Albuerne",
      dias: 1,
      select: false
    },
    {
      id: 6,
      title: "Hace 60 años salió en una serie de ciencia ficción, hoy es una de las grandes leyendas del género. ¿Reconoces a Kurt Russell?",
      categoria: "Cine",
      autor: "Marcos Yasif",
      dias: 8,
      select: false
    },
    {
      id: 7,
      title: "Es un juegazo. Rumores o no, un exdesarrollador de Rockstar tiene claro que GTA 4 debería ser rescatado como es debido con un remaster",
      categoria: "Videojuegos",
      autor: "Alberto Lloria",
      dias: 10,
      select: false
    }
  ])
*/
const GamingNews = () => {
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState<string>('Todos')
  const noticiasSeleccionadas = (datos: nota[]) => {
    if (categoriaSeleccionada === 'Todos') return datos;
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

export default GamingNews;
