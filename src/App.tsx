
import { useState } from 'react' 
import './App.css'
import useEntrys from './hooks/useEntry' 
import { DashboardView } from './views/DashboardView' 
import { SearchView } from './views/SearchView' 
import { ModalFavorites } from './components/ModalFavorites' 


function App() {

  const { data, isLoading, error, filterEntries, filteredEntries, filterSort} = useEntrys() 
  const [isSearchVisible, setIsSearchVisible] = useState(false) 
  const [searchQuery, setSearchQuery] = useState("") 
  const [isOpen, setIsOpen] = useState(false) 


  const handleSearchToggle = () => {
    setIsSearchVisible(!isSearchVisible) 
  } 

  const handleFavorite = () => {
    setIsOpen(true)
  } 

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value 
    setSearchQuery(query) 
    filterEntries(query) 
  } 

  const handleFilterSort = () => {
    if (filteredEntries.length>0) {
      filterSort(filteredEntries)  
    } else {
      filterSort(data)  
    }
  } 

  
  if (isLoading) return <p>Loading...</p> 
  if (error) return <p>Error: {error}</p> 

  return (
    <>
      <div className="absolute inset-0 bg-[url('/santuario-fondo.jpg')] bg-cover bg-center blur-sm brightness-50"></div>
      <header className="relative z-20 h-24 bg-black/40 border-b border-white/20">
        <div className="h-full flex items-center justify-between px-8">
          <h1 className="text-6xl text-white">Compendium</h1>

          {isSearchVisible && (
            <input
              type="text"
              value={searchQuery}
              onChange={handleChange}
              placeholder="Search by name or ID..."
              className="w-[85vh] p-2 bg-black/40 text-white border border-white/20 rounded-md focus:outline-none focus:ring focus:ring-white/50 transition-all"
            />
          )}

          <div className="flex gap-7">
            <img src="/icons/search.png" className="w-6 opacity-50 hover:opacity-100 transition-all" onClick={handleSearchToggle} />
            {isSearchVisible && (
            <img src="/icons/sort-arrows.png" className="w-6  opacity-50 hover:opacity-100 transition-all" onClick={handleFilterSort} />)}
            <img src="/icons/heart.png" className="w-6 opacity-50 hover:opacity-100 transition-all" onClick={handleFavorite} />
            <ModalFavorites isOpen={isOpen}
              setIsOpen={setIsOpen} />
          </div>
        </div>
      </header>
      <div className="relative z-10 h-[calc(100vh-6rem)] p-8 overflow-hidden">
        {isSearchVisible ? (<SearchView filteredEntries={filteredEntries} />) : (<DashboardView />)}
      </div>
    </>
  )
}

export default App
