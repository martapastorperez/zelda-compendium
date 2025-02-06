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
        <div className='flex justify-around pb-5 items-center'>
            <img src={favourites.image} alt={favourites.name} className='w-25' />
            <div>
                <h2 className='text-2xl'>{favourites.name}</h2>
                <h3 className='text-2xl'>{favourites.id}</h3>
            </div>
            <img
                src='/icons/heart.png'
                alt='Favourite icon'
                className='h-7 opacity-50 hover:opacity-100 transition-all cursor-pointer'
                onClick={handleRemoveFromFavs}
            />
        </div>
    );
};
