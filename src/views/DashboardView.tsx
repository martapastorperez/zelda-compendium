import { useState } from "react";
import { CategoryButton } from "../components/CategoryButton";
import { Entries } from "../components/Entries";
import { categories } from "../constants/CategoriesData";
import useEntrys from "../hooks/useEntry"
import { Category, Entry } from "../types";
import { EntriesDetails } from "../components/EntriesDetails";


export const DashboardView = () => {

    const {isLoading, error, getEntryByCategory, getEntryById} = useEntrys()
    const [categoryEntries, setCategoryEntries] = useState<Entry[]>([]);
    const [IdEntries, setIdEntries] = useState<Entry>();

    const handleCategorySelect = (category: Category) => {
        const categoryEntries = getEntryByCategory(category);
        setCategoryEntries(categoryEntries)
    }

    const getEntryId = (id: Entry['id']) => { 
        const idEntries = getEntryById(id)
        setIdEntries(idEntries)
    }

    if (isLoading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

   
  return (
    <>
        {/* Categorías */}
        <div className="h-1/6 flex justify-center items-center gap-10 pb-7">
        {categories.map((category) => (
            <CategoryButton
                key={category.label}
                categoryName={category.label}
                category={category.category}
                categoryIcon={category.icon}
                onCategorySelect={handleCategorySelect}
            />
            ))}
        </div>

        <div className="h-[70vh] grid grid-cols-2 gap-4">
            {categoryEntries.length > 0 &&
                <div className="grid grid-cols-4 gap-4  overflow-y-scroll">
                    {categoryEntries.map((entries) => (
                    <Entries
                        key={entries.id} 
                        categoryEntries={entries}
                        getEntryId={getEntryId}
                    />
                    ))}
                </div>
            }
            
            <div>
            {IdEntries && <EntriesDetails key={IdEntries.id} entryDetails={IdEntries} />}
            </div>
        </div>
    </>

  )
}
