import './Explore.css';
import portadaNoticias from "../../assets/images/noticia/Portada_noticias.jpg"
import { nota } from '../../components/Tidings/listaTidings'
import { useState } from 'react'
import VerNoticias from '../../components/Tidings/viewTidings'

const Explore = () => {
  const [lista,setLista] = useState<nota[]>([
    {
      id: 1,
      title: "Las suscripciones vitalicias ya no duran toda la vida y el mejor ejemplo llega de la mano de una empresa de VPN",
      categoria: "Tecnologia",
      autor: "Brenda Giacconi",
      dias: 3
    },
    {
      id: 2,
      title: "Es un juego de acción y fantasía, se está desarrollando en España y lo mejor es que podrás probarlo pronto. Blades of Fire anuncia una demo",
      categoria: "Tecnologia",
      autor: "Abelardo González",
      dias: 1
    },{
      id: 3,
      title: "Cómo una serie fue capaz de redefinir el lore de todo un juego y ser (casi) tan famosa como él",
      categoria: "League of Legends",
      autor: "Bárbara Gimeno",
      dias: 0
    },
    {
      id: 4,
      title: "Tras registrar resultados excelentes, Microsoft saca la guadaña y despide a casi 7.000 empleados en todo el mundo",
      categoria: "Tecnologia",
      autor: "Brenda Giacconi",
      dias: 5
    },
    {
      id: 5,
      title: "Willyrex estaría reuniendo a Los Vengadores del streaming para un último baile de Karmaland",
      categoria: "Streamers",
      autor: "José A. Mateo Albuerne",
      dias: 1
    },
    {
      id: 6,
      title: "Hace 60 años salió en una serie de ciencia ficción, hoy es una de las grandes leyendas del género. ¿Reconoces a Kurt Russell?",
      categoria: "Cine",
      autor: "Marcos Yasif",
      dias: 8
    },
    {
      id: 7,
      title: "Es un juegazo. Rumores o no, un exdesarrollador de Rockstar tiene claro que GTA 4 debería ser rescatado como es debido con un remaster",
      categoria: "GTA V",
      autor: "Alberto Lloria",
      dias: 10
    }
  ])
  return (
    <div>
        <img src={portadaNoticias} alt="Portada_noticias" />
        <h1 className='title_noticias'>Noticias</h1>
        <VerNoticias registro={lista}/>
    </div>
  )
}

export default Explore;