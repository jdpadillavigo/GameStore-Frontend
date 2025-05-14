import "./viewTidings.css"
import ListaNoticias, { nota } from '../../components/Tidings/listaTidings'
import FilterTidings from "./filterTidings"

interface Reg {
    registro : nota[]
}

const VerNoticias = (props : Reg) => {
    return <div className='vistaNoticia'>
        <div className='noticia-container'>
            <ListaNoticias listaNotas={props.registro}/>
        </div>
        <FilterTidings />
    </div>
}
export default VerNoticias