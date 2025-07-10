import "./viewTidings.css"

export interface nota {
    id : number
    title : string
    category : string
    author : string
    redaction: string
    image : string
    days : number
}

interface Reg {
    registros : nota[]
    categorias : string[]
    categoriaSeleccionada : string
    setCategoriaSeleccionada : (categoria: string) => void
    autores: string[]
    autorSeleccionado: string
    setAutorSeleccionado: (autor: string) => void
    orden: 'antiguo' | 'actual'
    setOrden: (orden: 'antiguo' | 'actual') => void
}
const VerNoticias = (props : Reg) => {
    const obtenerCategoria = (e : React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault()
        const categoria = e.currentTarget.innerText
        props.setCategoriaSeleccionada(categoria)
    }
    const handleCheckboxChange = (tipo: string) => {
        props.setCategoriaSeleccionada(tipo)
    }
    const obtenerAutor = (e : React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault()
        const autor = e.currentTarget.innerText
        props.setAutorSeleccionado(autor)
    }
    const handleAutorCheckboxChange = (autor: string) => {
        props.setAutorSeleccionado(autor)
    }
    const handleOrdenCheckboxChange = (orden: 'antiguo' | 'actual') => {
        props.setOrden(orden)
    }
    return <div className='vistaNoticia'>
        <div className='noticia_container'>
            {props.registros.length === 0 ? (
                <div className="no-noticias-msg">
                    No existe noticia relacionada
                </div>
            ) : 
            props.registros.map((elemento : nota) => {
                return (
                    <div className="noticia" key={elemento.id}>
                        <div className="contenido_nota">
                            <div className="titulo_nota">{elemento.title}</div><br></br>
                            <div className="categoria_nota"> Redactado por {elemento.author}</div>
                            <div className="extra_nota"> Hace {elemento.days} dias - {elemento.category}</div>
                        </div>
                        <div className="img_nota">
                            <img src={elemento.image} alt="imgNoticias" />
                        </div>
                    </div>
                )
            })}
        </div>
        <div className='filter_container'>
            <div className="title_filter_container"> Filtrar por </div>
            <div className="space_filter">
                <p>Categorías</p>
                {props.categorias.map((tipo : string) => (
                    <div key={tipo}>
                        <a
                            onClick={obtenerCategoria}
                            className={props.categoriaSeleccionada === tipo ? "selected" : ""}
                        >
                            <input
                                type="checkbox"
                                name="categoria"
                                value={tipo}
                                checked={props.categoriaSeleccionada === tipo}
                                onChange={() => handleCheckboxChange(tipo)}
                                onClick={e => e.stopPropagation()}
                            />
                            {tipo}
                        </a>
                    </div>
                ))}
                <p>Autores</p>
                {props.autores.map((autor : string) => (
                    <div key={autor}>
                        <a
                            onClick={obtenerAutor}
                            className={props.autorSeleccionado === autor ? "selected" : ""}
                        >
                            <input
                                type="checkbox"
                                name="autor"
                                value={autor}
                                checked={props.autorSeleccionado === autor}
                                onChange={() => handleAutorCheckboxChange(autor)}
                                onClick={e => e.stopPropagation()}
                            />
                            {autor}
                        </a>
                    </div>
                ))}
                <p>Orden</p>
                <div>
                    <a
                        onClick={e => { e.preventDefault(); props.setOrden('actual') }}
                        className={props.orden === 'actual' ? "selected" : ""}
                    >
                        <input
                            type="checkbox"
                            name="orden"
                            value="actual"
                            checked={props.orden === 'actual'}
                            onChange={() => handleOrdenCheckboxChange('actual')}
                            onClick={e => e.stopPropagation()}
                        />
                        Más actual al antiguo
                    </a>
                </div>
                <div>
                    <a
                        onClick={e => { e.preventDefault(); props.setOrden('antiguo') }}
                        className={props.orden === 'antiguo' ? "selected" : ""}
                    >
                        <input
                            type="checkbox"
                            name="orden"
                            value="antiguo"
                            checked={props.orden === 'antiguo'}
                            onChange={() => handleOrdenCheckboxChange('antiguo')}
                            onClick={e => e.stopPropagation()}
                        />
                        Más antiguo al actual
                    </a>
                </div>
            </div>
        </div>
    </div>
}
export default VerNoticias