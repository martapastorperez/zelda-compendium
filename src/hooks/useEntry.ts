import axios from "axios" 

import { useEffect, useState } from "react" 
import { Category, Entry } from "../types" 

export default function useEntrys(){

    const entryUrl = `https://botw-compendium.herokuapp.com/api/v3/compendium/all` 

    const [data, setData] = useState<Entry[]>([]) 
    const [isLoading, setIsLoading] = useState(true) 
    const [error, setError] = useState<string>() 
    const [filteredEntries, setFilteredEntries] = useState<Entry[]>([]) 
    const [isSortedAsc, setIsSortedAsc] = useState(true)  
    const [favs, setFavs] = useState(getItem)

    useEffect(() => {
        localStorage.setItem('Favs', JSON.stringify(favs))
    }, [favs])
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          setIsLoading(true) 
          const response = await axios.get(entryUrl)           
          setData(response.data.data) 
        } catch (error) {
          setError("An unknown error occurred") 
        } finally {
          setIsLoading(false) 
        }
      } 
  
      fetchData() 
    }, [entryUrl]) 


    const getEntryByCategory=(category:Category):Entry[]=>{
        return data.filter((entry) => entry.category === category)
    }

    const getEntryById=(id:Entry['id']):Entry=>{
        const entry= data.find((entry) => entry.id === id) 
        if (!entry) {
            throw new Error(`Entry with ID ${id} not found`) 
        }
        return entry 
    }


    // Función para filtrar resultados basado en una query
    const filterEntries = (query: string):Entry[] => {
        const lowerQuery = query.toLowerCase() 
        const filtered = data.filter(
            (entry) =>
                entry.name.toLowerCase().includes(lowerQuery) ||
                entry.id.toString().includes(lowerQuery)
        ) 
        setFilteredEntries(filtered) 
        return filtered
    }

    // Función para ordenar las entradas por ID
    const sortEntriesById = (entries: Entry[]): Entry[] => {
      return [...entries].sort((a, b) =>
        isSortedAsc ? a.id - b.id : b.id - a.id
      )
    }

    // Función para manejar la ordenación y actualizar el estado
    const filterSort = (entries: Entry[]): void => {
      const sortedEntries = sortEntriesById(entries) 
      setFilteredEntries(sortedEntries)  // Actualiza filteredEntries con los elementos ordenados
      setIsSortedAsc((prev) => !prev)  // Alterna el orden
    }

    // Función para agregar o eliminar favoritos
    const AddToFavs = (entryFav: Entry) => {
      setFavs((prevFavs) => {
        const entryExist = prevFavs.some((fav) => fav.id === entryFav.id) 
        let updatedFavs 

        if (!entryExist) {
          updatedFavs = [...prevFavs, entryFav] 
        } else {
          updatedFavs = prevFavs.filter((fav) => fav.id !== entryFav.id) 
        }

        localStorage.setItem("Favs", JSON.stringify(updatedFavs)) 
        return updatedFavs 
      })
    }

    function getItem() : Entry[] {
      const storedFavs = localStorage.getItem('Favs') 
      return storedFavs ? JSON.parse(storedFavs) : [] 
    }

    return {
      data,
      isLoading,
      error,
      getEntryByCategory,
      getEntryById,
      filterEntries,
      filteredEntries,
      filterSort,
      sortEntriesById,
      setFilteredEntries,
      setData,
      AddToFavs,
      favs,
      setFavs,
      getItem,
    }
  }
