import { useState } from "react";
import { CategoryButton } from "../components/CategoryButton";
import { Entries } from "../components/Entries";
import { categories } from "../constants/CategoriesData";
import useEntrys from "../hooks/useEntry"
import { Category, Entry } from "../types";



export const DashboardView = () => {

    const {data, isLoading, error, getEntryByCategory} = useEntrys()
    const [categoryEntries, setCategoryEntries] = useState<Entry[]>([]);

    const handleCategorySelect = (category: Category) => {
        const categoryEntries = getEntryByCategory(category);
        setCategoryEntries(categoryEntries)
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

        {/* Entradas */}
        <div className="h-5/6 grid grid-cols-2 gap-4">
           
            <div className="grid grid-cols-4 gap-4  overflow-y-scroll ">
                {categoryEntries.map((entries) => (
                <Entries
                    key={entries.id} 
                    categoryEntries={entries}
                />
                ))}
            </div>

            {/* Detalles de la entrada */}
            <div>
           
            </div>
        </div>
    </>

  )
}
