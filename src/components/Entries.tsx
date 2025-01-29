import { Entry } from "../types"

type EntriesProps={
    categoryEntries:Entry
    getEntryId: (id: Entry['id']) => void
}

export const Entries = ({categoryEntries, getEntryId}:EntriesProps) => {

    const handleClick=(id:Entry['id'])=>{
        getEntryId(id);
      }

  return (
    <div
        key={categoryEntries.id}
        className="h-fit relative bg-black/40 border border-white/20 p-2 hover:border-white hover:shadow-[0_0_10px_2px_white] transition-all"
        onClick={()=>handleClick(categoryEntries.id)}
    >
      <img
        src={categoryEntries.image}
        alt={categoryEntries.name}
        className="w-full h-auto"
      />
      <div className="absolute bottom-2 right-2 bg-black/80 border border-white/20 text-white text-sm px-2 py-1">
        {categoryEntries.id}
      </div>
    </div>
  )
}
