import { Dialog, DialogPanel } from "@headlessui/react"
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
      <div className="fixed inset-0 flex items-center justify-center p-4 bg-black/40">
        <DialogPanel className="w-[90vh] h-[80vh] space-y-4 border border-white/20 bg-black/90 p-10 shadow-lg overflow-y-scroll">
          <div>
            <h1 className="text-4xl pb-5 text-center">Favourites</h1>
            {Array.isArray(favs) && favs.length > 0 ? (
              favs.map((favourite) => (
                <EntriesFav key={favourite.id} favourites={favourite} addToFavs={AddToFavs} />
              ))
            ) : (
              <p className="text-white">No hay favoritos aún.</p>
            )}
          </div>

          {/* Botón para cerrar */}
          <div className="flex justify-end gap-4 mt-4">
            <button
              className="px-4 py-2 text-white border border-white/20 bg-black/90 hover:bg-white"
              onClick={() => setIsOpen(false)}
            >
              Cerrar
            </button>
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  );
};
