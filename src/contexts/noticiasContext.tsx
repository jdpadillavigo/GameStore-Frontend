import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { nota } from '../components/Tidings/viewTidings'

const noticiasPorDefecto: nota[] = []

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
    const stored = data ? JSON.parse(data) : []
    return mergeNoticias(noticiasPorDefecto, stored)
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