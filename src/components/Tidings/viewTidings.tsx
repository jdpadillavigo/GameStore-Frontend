import ListaNoticias, { nota } from '../../components/Tidings/listaTidings'
import "./viewTidings.css"

export type typeCategory = string

interface Reg {
    registros : nota[]
    categorias : typeCategory[]
    categoriaSeleccionada : string
    setCategoriaSeleccionada : (categoria: string) => void
}
const VerNoticias = (props : Reg) => {
    const obtenerCategoria = (e : React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault()
        const categoria = e.currentTarget.innerText
        props.setCategoriaSeleccionada(categoria)
    }
    return <div className='vistaNoticia'>
        <div className='noticia-container'>
            <ListaNoticias listaNotas={props.registros}/>
        </div>
        <div className='filter-container'>
            <h3>Quiere ver por categoría</h3>
            {props.categorias.map((tipo : typeCategory) => {
                return <div>
                    <a
                        onClick={obtenerCategoria}
                        className={props.categoriaSeleccionada === tipo ? "selected" : ""}
                    >
                        <input
                            type="checkbox"
                            name="categoria"
                            value={tipo}
                            checked={props.categoriaSeleccionada === tipo}
                            onChange={() => props.setCategoriaSeleccionada(tipo)}
                        />
                        {tipo}
                    </a>
                </div>
            })}
        </div>
    </div>
}
export default VerNoticias