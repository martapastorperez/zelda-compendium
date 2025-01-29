import { Dialog, DialogPanel} from "@headlessui/react";
import { Entry } from "../types";

type ModalEntriesDetailsProps = {
  entryDetails: Entry;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
};

export const ModalEntryDetails = ({ entryDetails, isOpen, setIsOpen }: ModalEntriesDetailsProps) => {
  return (
    <Dialog open={isOpen} onClose={() => setIsOpen(false)} className="relative z-50">
      <div className="fixed inset-0 flex items-center justify-center p-4 bg-black/40">
        <DialogPanel className="w-[90vh] space-y-4 border border-white/20 bg-black/90 p-10 shadow-lg">
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
                <div>
                  <h2 className="text-3xl text-white">Common Locations</h2>
                  {entryDetails.common_locations?.map((location) => (
                    <p key={location} className="text-white">{location}</p>
                  ))}
                </div>

                {/* Objetos que suelta */}
                <div>
                  <h2 className="text-3xl text-white">Droppable Items</h2>
                  {entryDetails.drops?.map((drop) => (
                    <p key={drop} className="text-white">{drop}</p>
                  ))}
                </div>
              </div>
            </div>
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
