import { Entry } from "../types"

type EntriesDetailsProps={
    entryDetails:Entry
}

export const EntriesDetails = ({entryDetails}:EntriesDetailsProps) => {

  return (
    <div  className="bg-black/40 border border-white/20 p-16 place-content-center">
        <div className="flex gap-6">
            <img
            src={entryDetails.image}
            alt={entryDetails.name}
            className="w-full h-auto"
            />
            <div>
                <h1 className="text-white text-5xl">{entryDetails.name}</h1>
                <p className="text-white">{entryDetails.description}</p>
                <div className="grid grid-cols-2 pt-5">
                    <div>
                        <h1 className="text-white text-3xl">Common Locations</h1>
                        {entryDetails.common_locations?.map(locations=>(
                             <p key={locations} className="text-white">{locations}</p>
                        ))}
                    </div>
                    <div>
                        <h1 className="text-white text-3xl">Droppable Items</h1>
                        {entryDetails.drops?.map(drop=>(
                            <p key={drop} className="text-white">{drop}</p>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}
