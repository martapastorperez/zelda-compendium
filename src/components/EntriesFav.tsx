import { Entry } from '../types'

type EntriesFavProps = {
    favourites: Entry
    addToFavs: (entry: Entry) => void
}

export const EntriesFav = ({ favourites, addToFavs }: EntriesFavProps) => {
    const handleRemoveFromFavs = () => {
        addToFavs(favourites)
    }

    return (
        <div className="flex w-full items-center justify-center gap-x-36 border-b pt-2 pb-2 border-white/20 ">

            <img src={favourites.image} alt={favourites.name} className="w-24 h-24 object-cover" />

            <div className="flex flex-col w-full max-w-[200px]">
                <h2 className="text-2xl text-white font-semibold">{favourites.name}</h2>
                <h3 className="text-lg text-gray-400">{favourites.id}</h3>
            </div>

            <img
                src="/icons/heart.png"
                alt="Favourite icon"
                className="h-7 opacity-50 hover:opacity-100 transition-all cursor-pointer"
                onClick={handleRemoveFromFavs}
            />
        </div>
    );
};
