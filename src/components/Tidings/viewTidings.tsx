import "./viewTidings.css"

export type typeCategory = string

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
        <div className='noticia_container'>
            {props.registros.map((elemento : nota) => {
                return (
                    <div className="noticia" key={elemento.id}>
                        <div className="contenido_nota">
                            <div className="titulo_nota">{elemento.title}</div><br></br>
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
        <div className='filter_container'>
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