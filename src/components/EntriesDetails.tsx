import useEntrys from "../hooks/useEntry"
import { Entry } from "../types"

type EntriesDetailsProps = {
    entryDetails: Entry
}

export const EntriesDetails = ({ entryDetails }: EntriesDetailsProps) => {

    const { AddToFavs, favs } = useEntrys()

    const isFav = favs.some((fav) => fav.id === entryDetails.id)

    const handleClick = (entryDetails: Entry) => {
        AddToFavs(entryDetails)
    }

    return (
        <div className="bg-black/40 border border-white/20 p-16 place-content-center">
            <div className="flex justify-end">
                <svg
                    onClick={() => handleClick(entryDetails)}
                    className={`w-8 h-auto cursor-pointer transition-all hover:scale-110 ${isFav ? "text-red-500" : "text-white opacity-55 hover:opacity-100"}`}
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        fillRule="evenodd"
                        d="M12 4.248c-3.148-5.402-12-2.912-12 3.192 0 4.48 5.373 7.978 12 14.56 6.627-6.582 12-10.08 12-14.56 0-6.104-8.852-8.594-12-3.192z"
                        clipRule="evenodd"
                    />
                </svg>
            </div>
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
                        {entryDetails.common_locations && entryDetails.common_locations.length > 0 && (
                            <div>
                                <h1 className="text-white text-3xl">Common Locations</h1>
                                {entryDetails.common_locations?.map(locations => (
                                    <p key={locations} className="text-white">{locations}</p>
                                ))}
                            </div>
                        )}
                        {entryDetails.drops && entryDetails.drops.length > 0 && (
                            <div>
                                <h1 className="text-white text-3xl">Droppable Items</h1>
                                {entryDetails.drops?.map(drop => (
                                    <p key={drop} className="text-white">{drop}</p>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}
