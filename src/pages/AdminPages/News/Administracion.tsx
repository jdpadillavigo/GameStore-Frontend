import { useLocation, useNavigate } from 'react-router-dom'
import portadaNoticias from "../../../../public/images/news/Portada_noticias.jpg"
import { useNoticias } from '../../../components/Tidings/noticiasContext'
import { nota } from '../../../components/Tidings/listaTidings';
import { useRef, useState } from 'react';
import CrearTidings from '../../../components/Tidings/Admin/crearTidings';
import EliminarTidings from '../../../components/Tidings/Admin/eliminarTidings';
import EditarTidings from '../../../components/Tidings/Admin/editarTidings';
import VistaPreEdicion from '../../../components/Tidings/Admin/vistaPreEdicion';

const GestionNoticia = () => {
    const { listaDeNoticias, setListaDeNoticias } = useNoticias()
    const location = useLocation()
    const accion = location.state?.accion
    const navigate = useNavigate()

    const tituloRef = useRef<HTMLInputElement>(null)
    const categoriaRef = useRef<HTMLInputElement>(null)
    const autorRef = useRef<HTMLInputElement>(null)
    const redaccionRef = useRef<HTMLTextAreaElement>(null)
    const imagenRef = useRef<HTMLInputElement>(null)


    const subirNoticiaOnClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        const nuevaNoticia: nota = {
            id: listaDeNoticias.length+1,
            title: tituloRef.current?.value || "",
            categoria: categoriaRef.current?.value || "",
            autor: autorRef.current?.value || "",
            redaccion: redaccionRef.current?.value || "",
            image: imagenRef.current?.value || "",
            dias: (Math.floor(Math.random() * 1) + 20),
            select: false
        };
        const nuevasNoticias : nota[] = [...listaDeNoticias, nuevaNoticia]
        setListaDeNoticias(nuevasNoticias)
        localStorage.setItem('noticias', JSON.stringify(nuevasNoticias))
        console.log(nuevaNoticia)
        navigate('/a/noticias')
    };

    if (accion === 'crear') {
        return (
            <CrearTidings
                tituloRef={tituloRef}
                categoriaRef={categoriaRef}
                autorRef={autorRef}
                redaccionRef={redaccionRef}
                imagenRef={imagenRef}
                subirNoticiaOnClick={subirNoticiaOnClick}
                portadaNoticias={portadaNoticias}
            />
        )
    }
    if (accion === 'editar') {
        // Estados para filtros y edición
        const [filtroCategoria, setFiltroCategoria] = useState<string>('Todas');
        const [filtroAutor, setFiltroAutor] = useState<string>('Todos');
        const [editando, setEditando] = useState<number | null>(null);
        const [form, setForm] = useState<{
            id: number;
            title: string;
            categoria: string;
            autor: string;
            redaccion: string;
            image: string;
        } | null>(null);

        // Obtener categorías y autores únicos
        const categorias = Array.from(new Set(listaDeNoticias.map(n => n.categoria)));
        const autores = Array.from(new Set(listaDeNoticias.map(n => n.autor)));

        // Filtrar noticias según filtros
        const noticiasFiltradas = listaDeNoticias.filter(n =>
            (filtroCategoria === 'Todas' || n.categoria === filtroCategoria) &&
            (filtroAutor === 'Todos' || n.autor === filtroAutor)
        );

        // Cuando se presiona "Editar", cargar datos en el formulario
        const handleEditar = (noticia: any) => {
            setEditando(noticia.id);
            setForm({
                id: noticia.id,
                title: noticia.title,
                categoria: noticia.categoria,
                autor: noticia.autor,
                redaccion: noticia.redaccion,
                image: noticia.image
            });
        };

        // Cuando se cambia un campo del formulario
        const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
            if (!form) return;
            setForm({
                ...form,
                [e.target.name]: e.target.value
            });
        };

        // Aplicar cambios
        const aplicarCambios = () => {
            if (!form) return;
            const nuevasNoticias = listaDeNoticias.map(n =>
                n.id === form.id
                    ? { ...n, ...form }
                    : n
            );
            setListaDeNoticias(nuevasNoticias);
            localStorage.setItem('noticias', JSON.stringify(nuevasNoticias));
            setEditando(null);
            setForm(null);
            navigate('/a/noticias')
        };

        // Cancelar edición
        const cancelarEdicion = () => {
            setEditando(null);
            setForm(null);
        };

        // Vista de edición de una noticia
        if (editando && form) {
            return (
                <EditarTidings
                    form={form}
                    handleChange={handleChange}
                    aplicarCambios={aplicarCambios}
                    cancelarEdicion={cancelarEdicion}
                />
            );
        }

        // Vista previa de edición
        return (
            <VistaPreEdicion
                categorias={categorias}
                autores={autores}
                filtroCategoria={filtroCategoria}
                setFiltroCategoria={setFiltroCategoria}
                filtroAutor={filtroAutor}
                setFiltroAutor={setFiltroAutor}
                noticiasFiltradas={noticiasFiltradas}
                handleEditar={handleEditar}
                navigateInicio={() => navigate('/a/noticias')}
            />
        );
    }
    if (accion === 'eliminar') {
        // Obtener categorías y autores únicos
        const categorias = Array.from(new Set(listaDeNoticias.map(n => n.categoria)));
        const autores = Array.from(new Set(listaDeNoticias.map(n => n.autor)));

        // Estados para filtros y selección
        const [filtroCategoria, setFiltroCategoria] = useState<string>('Todas');
        const [filtroAutor, setFiltroAutor] = useState<string>('Todos');
        const [seleccionadas, setSeleccionadas] = useState<number[]>([]);

        // Filtrar noticias según filtros
        const noticiasFiltradas = listaDeNoticias.filter(n =>
            (filtroCategoria === 'Todas' || n.categoria === filtroCategoria) &&
            (filtroAutor === 'Todos' || n.autor === filtroAutor)
        )

        // Manejar selección de checkbox
        const handleCheckbox = (id: number) => {
            setSeleccionadas(prev =>
                prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
            )
        }

        // Eliminar noticias seleccionadas
        const eliminarSeleccionadas = () => {
            const nuevasNoticias = listaDeNoticias.filter(n => !seleccionadas.includes(n.id))
            setListaDeNoticias(nuevasNoticias)
            localStorage.setItem('noticias', JSON.stringify(nuevasNoticias))
            setSeleccionadas([])
            navigate('/a/noticias')
        }

        return (
            <EliminarTidings
                categorias={categorias}
                autores={autores}
                filtroCategoria={filtroCategoria}
                setFiltroCategoria={setFiltroCategoria}
                filtroAutor={filtroAutor}
                setFiltroAutor={setFiltroAutor}
                noticiasFiltradas={noticiasFiltradas}
                seleccionadas={seleccionadas}
                handleCheckbox={handleCheckbox}
                eliminarSeleccionadas={eliminarSeleccionadas}
            />
        )
    }
}

export default GestionNoticia;