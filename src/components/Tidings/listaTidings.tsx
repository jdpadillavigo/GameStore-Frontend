import "./listaTiding.css"
import noticia_1 from "../../assets/images/noticia/Noticia1.jpg"
import { Link } from 'react-router-dom';

export interface nota {
    id : number
    title : string
    categoria : string
    autor : string
    dias : number
    select : boolean
}

interface listaNoticiasProps {
    listaNotas : nota[]
}
const ListaNoticias = (props : listaNoticiasProps ) => {
    return <div>
        {props.listaNotas.map((elemento : nota) => {
            return (
                <div className="noticia">
                    <div className="contenido_nota">
                        <Link to={"/explore/contenido"}>
                            <div className="titulo_nota">{elemento.title}</div>
                        </Link>
                        <br></br>
                        <div className="categoria_nota"> Redactado por {elemento.autor}</div>
                        <div className="extra_nota"> Hace {elemento.dias} dias - {elemento.categoria}</div>
                    </div>
                    <div className="img_nota">
                        <img src={noticia_1} alt="imgNoticias" />
                    </div>
                </div>
            )
        })}
    </div>
}
export default ListaNoticias