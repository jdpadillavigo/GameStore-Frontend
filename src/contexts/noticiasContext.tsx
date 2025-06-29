import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { nota } from '../components/Tidings/viewTidings'

export const listaCategoriasNoticias = [
  'Acción',
  'Aventura',
  'RPG',
  'Estrategia',
  'Deportes',
  'Indie',
  'Simulación',
  'Terror',
  'Shooter',
  'Puzzle',
  'Actualidad'
]

let noticiasPorDefecto: nota[] = [
  {
    id: 1,
    title: 'Nintendo Switch 2: la mejor consola',
    categoria: 'Actualidad',
    autor: 'Nintendo',
    redaccion: 'Se espera que los propietarios de la nueva consola de la compañía japonesa puedan ver videos en YouTube',
    image: 'https://i0.wp.com/levelup.buscafs.com/2025/06/Switch-2-3.jpg?resize=320,144&quality=75&strip=all',
    dias: 10,
    select: false
  },
  {
    id: 2,
    title: 'Xbox canceló el estreno de Gears of War: Reloaded',
    categoria: 'Shooter',
    autor: 'Equipo GameStore',
    redaccion: 'La compañía ofreció disculpas a los usuarios de la consola de Sony que serán afectados',
    image: 'https://i0.wp.com/levelup.buscafs.com/2025/06/Cancelan-Gears-para-PS5-en-Japont.jpg?resize=320,144&quality=75&strip=all',
    dias: 26,
    select: false
  },
  {
    id: 3,
    title: 'Tu aventura en Indiana Jones and the Great Circle continuará con The Order of Giants',
    categoria: 'Aventura',
    autor: 'Sony',
    redaccion: 'El contenido adicional debutará de forma simultánea en todas las plataformas',
    image: 'https://i0.wp.com/levelup.buscafs.com/2025/06/Indiana-528e009bdea8ecc04fc3-1536x864-1-401b99a11368a1b0820c.jpg?resize=320,144&quality=75&strip=all',
    dias: 18,
    select: false
  },
  {
    id: 4,
    title: 'Final Fantasy por fin deja exclusividad con PlayStation en consolas',
    categoria: 'Estrategia',
    autor: 'PlanetGame',
    redaccion: 'Microsoft reafirmó todas las mejoras que tendrá esta versión, tanto en single player como multijugador',
    image: 'https://i0.wp.com/levelup.buscafs.com/2025/06/Final-Fantasy-VII-Remake-Intergade-Final-Fantasy-XVI-port-Xbox-Square-Enix-Xbox-Games-Showcase.jpg?resize=320,144&quality=75&strip=all',
    dias: 30,
    select: false
  }
]

type NoticiasContextType = {
  listaDeNoticias: nota[]
  setListaDeNoticias: React.Dispatch<React.SetStateAction<nota[]>>
}

const NoticiasContext = createContext<NoticiasContextType | undefined>(undefined)

export const useNoticias = () => {
  const context = useContext(NoticiasContext)
  if (!context) throw new Error('useNoticias debe usarse dentro de NoticiasProvider')
  return context
}

function mergeNoticias(defaults: nota[], stored: nota[]): nota[] {
  //Evita duplicados por id
  const ids = new Set(stored.map(n => n.id))
  return [...stored, ...defaults.filter(n => !ids.has(n.id))]
}

export const NoticiasProvider = ({ children }: { children: ReactNode }) => {
  const [listaDeNoticias, setListaDeNoticias] = useState<nota[]>(() => {
    const data = localStorage.getItem('noticias')
    if (data) {
      return JSON.parse(data) // Usa solo las noticias guardadas
    }
    return noticiasPorDefecto // Solo si no hay nada guardado
  })

  useEffect(() => {
    localStorage.setItem('noticias', JSON.stringify(listaDeNoticias))
  }, [listaDeNoticias])

  return (
    <NoticiasContext.Provider value={{ listaDeNoticias, setListaDeNoticias }}>
      {children}
    </NoticiasContext.Provider>
  )
}