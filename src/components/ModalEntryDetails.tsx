import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react"
import { Entry } from "../types"
import useEntrys from "../hooks/useEntry"

type ModalEntriesDetailsProps = {
  entryDetails: Entry
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
}

export const ModalEntryDetails = ({ entryDetails, isOpen, setIsOpen }: ModalEntriesDetailsProps) => {

  const { AddToFavs, favs } = useEntrys()

  const isFav = favs.some((fav) => fav.id === entryDetails.id)

  const handleClick = (entryDetails: Entry) => {
    AddToFavs(entryDetails)
  }

  return (
    <Dialog open={isOpen} onClose={() => setIsOpen(false)} className="relative z-50">
      <div className="fixed inset-0 flex items-center justify-center p-4 bg-black/40">
        <DialogPanel className="w-[90vh] space-y-4 border border-white/20 bg-black/90 p-10 shadow-lg">
          <DialogTitle className="text-lg font-bold">
            <div className="flex justify-end">
              <svg
                onClick={() => handleClick(entryDetails)}
                className={`w-6 h-auto cursor-pointer transition-all hover:scale-110 ${isFav ? "text-red-500" : "text-white opacity-55 hover:opacity-100"}`}
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

              {/* Botón para cerrar */}
              <button
                className="px-4 py-2 pl-10 text-white opacity-55 hover:opacity-100 text-3xl"
                onClick={() => setIsOpen(false)}
              >
                X
              </button>
            </div>
          </DialogTitle>

          <div className="flex gap-6">
            {/* Imagen de la entrada */}
            <img src={entryDetails.image} alt={entryDetails.name} className="w-full h-auto" />

            {/* Información de la entrada */}
            <div>
              <h1 className="text-5xl text-white">{entryDetails.name}</h1>
              <p className="text-white">{entryDetails.description}</p>

              {/* Información adicional */}
              <div className="grid grid-cols-2 pt-5">
                {/* Ubicaciones comunes */}
                {entryDetails.common_locations && entryDetails.common_locations.length > 0 && (
                  <div>
                    <h2 className="text-3xl text-white">Common Locations</h2>
                    {entryDetails.common_locations?.map((location) => (
                      <p key={location} className="text-white">{location}</p>
                    ))}
                  </div>
                )}
                {/* Objetos que suelta */}
                {entryDetails.drops && entryDetails.drops.length > 0 && (
                  <div>
                    <h2 className="text-3xl text-white">Droppable Items</h2>
                    {entryDetails.drops?.map((drop) => (
                      <p key={drop} className="text-white">{drop}</p>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  )
}
