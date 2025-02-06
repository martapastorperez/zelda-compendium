import { useState } from "react" 
import { Entries } from "../components/Entries" 
import useEntrys from "../hooks/useEntry" 
import { Entry } from "../types" 
import { ModalEntryDetails } from "../components/ModalEntryDetails" 
import { ClipLoader } from "react-spinners"

type SearchViewProps = {
  filteredEntries: Entry[] 
} 

export const SearchView = ({ filteredEntries }: SearchViewProps) => {
  const [IdEntries, setIdEntries] = useState<Entry | null>(null) 
  const [isOpen, setIsOpen] = useState(false)  

  const { data, getEntryById, isLoading, error } = useEntrys() 

  const getEntryId = (id: Entry["id"]) => {
    const entry = getEntryById(id) 
    setIdEntries(entry) 
    setIsOpen(true) 
  } 

  if (isLoading) return (
    <div className="flex justify-center items-center h-screen">
      <ClipLoader color='#ffffff' />
    </div>
  )

  if (error) return <p>Error: {error}</p>

  return (
    <>
      <div className="h-[85vh] gap-4 overflow-y-scroll">
        <div className="grid grid-cols-10 gap-4">
          {(filteredEntries.length > 0 ? filteredEntries : data).map((entry) => (
            <Entries
              key={entry.id}
              categoryEntries={entry}
              getEntryId={getEntryId}
            />
          ))}
        </div>
      </div>

      {IdEntries && (
        <ModalEntryDetails
          key={IdEntries.id}
          entryDetails={IdEntries}
          isOpen={isOpen}
          setIsOpen={setIsOpen}
        />
      )}
    </>
  ) 
} 
