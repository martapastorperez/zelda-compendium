import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react"
import useEntrys from "../hooks/useEntry"
import { EntriesFav } from "./EntriesFav"
import { useEffect } from "react"

type ModalFavoritesProps = {
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
}

export const ModalFavorites = ({ isOpen, setIsOpen }: ModalFavoritesProps) => {

  const { AddToFavs, favs, setFavs, getItem } = useEntrys()

  useEffect(() => {
    setFavs(getItem())
  }, [isOpen])

  return (
    <Dialog open={isOpen} onClose={() => setIsOpen(false)} className="relative z-50">
      <div className="fixed inset-0 flex items-center justify-center bg-black/40">
        <DialogPanel className="w-[90vh] h-[80vh] space-y-4 border border-white/20 bg-black/90  shadow-lg overflow-y-scroll">
          <DialogTitle className="sticky top-0 bg-black/90 z-10 border-b border-white/20 ">
            <div className="flex justify-between pl-26 pr-26 pt-8">
              <h1 className="text-4xl pb-5 text-center">Favourites</h1>
              {/* Botón para cerrar */}
              <button
                className="px-4 py-2 pl-10 text-white opacity-55 hover:opacity-100 text-3xl"
                onClick={() => setIsOpen(false)}
              >
                X
              </button>
            </div>
          </DialogTitle>
          <div>
            {Array.isArray(favs) && favs.length > 0 ? (
              favs.map((favourite) => (
                <EntriesFav key={favourite.id} favourites={favourite} addToFavs={AddToFavs} />
              ))
            ) : (
              <p className="text-white">No hay favoritos aún.</p>
            )}
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  );
};
