import ListaNoticias, { nota } from '../../components/Tidings/listaTidings'
import FilterTidings, { typeCategory } from "./filterTidings"
import "./viewTidings.css"

interface Reg {
    registros : nota[]
    categorias : typeCategory[]
    categoriaSeleccionada : string
    setCategoriaSeleccionada : (categoria: string) => void
}
const VerNoticias = (props : Reg) => {
    return <div className='vistaNoticia'>
        <div className='noticia-container'>
            <ListaNoticias listaNotas={props.registros}/>
        </div>
        <div>
            <FilterTidings
                items={props.categorias}
                categoriaSeleccionada={props.categoriaSeleccionada}
                setCategoriaSeleccionada={props.setCategoriaSeleccionada}
            />
        </div>
    </div>
}
export default VerNoticias