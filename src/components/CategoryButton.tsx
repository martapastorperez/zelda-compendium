import { Category } from "../types"

type CategoryButtonsProps={
    category:Category
    categoryName:string
    categoryIcon:string
    onCategorySelect: (category: Category) => void
}

export const CategoryButton = ({category, categoryName, categoryIcon, onCategorySelect}:CategoryButtonsProps) => {

    const setCategory=(category:Category)=>{
        onCategorySelect(category) 
    }
    
  return (
    <button onClick={()=>setCategory(category)} className="group flex flex-col items-center">
        <p className="font-bold pb-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        {categoryName}
        </p>
        <img
        src={categoryIcon}
        className="h-8 opacity-55 group-hover:opacity-100 transition-opacity duration-300"
        />
    </button>
  )
}
