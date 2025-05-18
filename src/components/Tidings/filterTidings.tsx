import "./viewTidings.css"
import "./filterTidings.css"

export type typeCategory = string

interface typeCategoryProps {
    items : typeCategory[]
    categoriaSeleccionada : String
    setCategoriaSeleccionada: (categoria: string) => void
}

const FilterTidings = (props: typeCategoryProps) => {
    const obtenerCategoria = (e : React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault()
        const categoria = e.currentTarget.innerText
        console.log(categoria)
        props.setCategoriaSeleccionada(categoria)
    }
    return (
        <div className='filter-container'>
            <h3>Quiere ver por categoría</h3>
            {props.items.map((tipo : typeCategory) => {
                return <div>
                    <a
                        href="/explorar"
                        onClick={obtenerCategoria}
                        className={props.categoriaSeleccionada === tipo ? "selected" : ""}
                    >
                        {tipo}
                    </a>
                </div>
            })}
        </div>
    )
}

export default FilterTidings
