import './Content.css'
import portadaNoticias from "../../../public/images/news/Portada_noticias.jpg"
import { nota } from '../../components/Tidings/listaTidings'
import { useNoticias } from '../../components/Tidings/noticiasContext'

const ContenidoNoticia = () => {
  const { listaDeNoticias } = useNoticias();
  const noticiaSeleccionada = listaDeNoticias.find((elemento: nota) => elemento.select);

  return (
    <div className="contenedor-noticia">
      {noticiaSeleccionada ? (
        <div className="nota-periodistica fila-noticia">
          <img
            className="imagen-noticia mitad-ancho"
            src={portadaNoticias}
            alt="Imagen de la noticia"
          />
          {/* Contenido a la derecha */}
          <div className="contenido-noticia-seleccionada">
            <div className="info-noticia">
              <img src={noticiaSeleccionada.image}/>
              <span className="autor-noticia">Redactado por: {noticiaSeleccionada.autor}</span>
              <span className="dias-noticia"> | Escrtio hace {noticiaSeleccionada.dias} días</span>
            </div>
            <div className="redaccion-noticia">
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