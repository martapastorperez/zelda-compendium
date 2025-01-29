import axios from "axios";

import { useEffect, useState } from "react";
import { Category, Entry } from "../types";

export default function useEntrys(){

    const entryUrl = `https://botw-compendium.herokuapp.com/api/v3/compendium/all`;

    const [data, setData] = useState<Entry[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string>();
    const [filteredEntries, setFilteredEntries] = useState<Entry[]>([]);

  
    useEffect(() => {
      const fetchData = async () => {
        try {
          setIsLoading(true);
          const response = await axios.get(entryUrl);          
          setData(response.data.data);
        } catch (error) {
          setError("An unknown error occurred");
        } finally {
          setIsLoading(false);
        }
      };
  
      fetchData();
    }, [entryUrl]);


    const getEntryByCategory=(category:Category):Entry[]=>{
        return data.filter((entry) => entry.category === category);
    }

    const getEntryById=(id:Entry['id']):Entry=>{
        const entry= data.find((entry) => entry.id === id);
        if (!entry) {
            throw new Error(`Entry with ID ${id} not found`);
        }
        return entry;
    }


    // Función para filtrar resultados basado en una query
    const filterEntries = (query: string):Entry[] => {
        const lowerQuery = query.toLowerCase();
        const filtered = data.filter(
            (entry) =>
                entry.name.toLowerCase().includes(lowerQuery) ||
                entry.id.toString().includes(lowerQuery)
        );
        setFilteredEntries(filtered);
        return filtered
    };

  
    return { data, isLoading, error, getEntryByCategory, getEntryById , filterEntries, filteredEntries};
  }
  
