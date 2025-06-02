import './GamingNews.css'
import portadaNoticias from "../../../public/images/news/Portada_noticias.jpg"
import { nota } from '../../components/Tidings/listaTidings'
import { useNoticias } from '../../contexts/noticiasContext'

const ContenidoNoticia = () => {
  const { listaDeNoticias } = useNoticias();
  const noticiaSeleccionada = listaDeNoticias.find((elemento: nota) => elemento.select);

  return (
    <div>
      {noticiaSeleccionada ? (
        <div>
          <img
            src={portadaNoticias}
            alt="Imagen de la noticia"
          />
          <div>
            <div>
              <img src={noticiaSeleccionada.image}/>
              <span>Redactado por: {noticiaSeleccionada.autor}</span>
              <span> | Escrtio hace {noticiaSeleccionada.dias} días</span>
            </div>
            <div>
              {noticiaSeleccionada.redaccion}
            </div>
          </div>
        </div>
      ) : (
        <div>No hay noticia seleccionada.</div>
      )}
    </div>
  )
}
export default ContenidoNoticia;