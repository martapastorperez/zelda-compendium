import axios from "axios";

import { useEffect, useState } from "react";
import { Category, Entry } from "../types";

export default function useEntrys(){

    const entryUrl = `https://botw-compendium.herokuapp.com/api/v3/compendium/all`;

    const [data, setData] = useState<Entry[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string>();
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          setIsLoading(true);
          const response = await axios.get(entryUrl);
          console.log(response.data);
          
          setData(response.data.data); // Guardar los datos obtenidos
          console.log(data,'aaas');
          
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



  
    return { data, isLoading, error, getEntryByCategory, getEntryById };
  }
  
