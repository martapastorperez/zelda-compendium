import { CategoryButton } from "../components/CategoryButton";
import { categories } from "../constants/CategoriesData";
import useEntrys from "../hooks/useEntry"
import { Category } from "../types";



export const DashboardView = () => {

    const { getEntryByCategory} = useEntrys()

    const handleCategorySelect = (category: Category) => {
        const categoryEntries = getEntryByCategory(category);
        console.log(categoryEntries);
    }

  

   
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

      
    </>

  )
}
