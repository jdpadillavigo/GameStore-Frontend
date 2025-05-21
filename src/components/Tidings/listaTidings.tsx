import "./listaTiding.css"
import { Link } from 'react-router-dom';
import { useNoticias } from './noticiasContext'; // Importa el hook

export interface nota {
    id : number
    title : string
    categoria : string
    autor : string
    redaccion: string
    image : string
    dias : number
    select : boolean
}
interface listaNoticiasProps {
    listaNotas : nota[]
}

const ListaNoticias = (props : listaNoticiasProps ) => {
    const { setListaDeNoticias } = useNoticias(); // Usa el contexto

    // Función para seleccionar una noticia
    const handleSelect = (id: number) => {
        setListaDeNoticias(prev =>
            prev.map(n =>
                n.id === id ? { ...n, select: true } : { ...n, select: false }
            )
        )
    }

    return <div>
        {props.listaNotas.map((elemento : nota) => {
            return (
                <div className="noticia" key={elemento.id}>
                    <div className="contenido_nota">
                        <Link 
                            to={"/noticias"}
                            onClick={() => handleSelect(elemento.id)}
                        >
                            <div className="titulo_nota">{elemento.title}</div>
                        </Link>
                        <br></br>
                        <div className="categoria_nota"> Redactado por {elemento.autor}</div>
                        <div className="extra_nota"> Hace {elemento.dias} dias - {elemento.categoria}</div>
                    </div>
                    <div className="img_nota">
                        <img src={elemento.image} alt="imgNoticias" />
                    </div>
                </div>
            )
        })}
    </div>
}

export default ListaNoticias