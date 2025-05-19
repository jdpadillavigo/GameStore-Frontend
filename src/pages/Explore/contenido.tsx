import './contenido.css'
import portadaNoticias from "../../assets/images/noticia/Portada_noticias.jpg"
import { nota } from '../../components/Tidings/listaTidings';
import { listaDeNoticias } from './Explore';

const ContenidoNoticia = () => {
  const titulo = "Contenido de la noticia"
  return (
      <div>
        <img src={portadaNoticias} alt="Portada_noticia" />
        <h1 className="title_noticias">{titulo}</h1>
        {listaDeNoticias.map((elemento: nota) => {
          return (
            <div className="contenido_nota">
              <div className="titulo_nota">{elemento.title}</div>
              <br></br>
              <div className="categoria_nota"> Redactado por {elemento.autor}</div>
              <div className="extra_nota"> Hace {elemento.dias} dias</div>
              <div>Redactado por: {elemento.categoria}</div>
            </div>
          )
        })
  }
      </div>
  );
};
export default ContenidoNoticia;