import { Entry } from "../types"

type EntriesProps={
    categoryEntries:Entry
}

export const Entries = ({categoryEntries}:EntriesProps) => {

 

  return (
    <div
        key={categoryEntries.id}
        className="relative h-auto bg-black/40 border border-white/20 p-2 hover:border-white hover:shadow-[0_0_10px_2px_white] transition-all"
       
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
