
import './App.css'

function App() {

  return (
    <>
    <div className="absolute inset-0 bg-[url('/santuario-fondo.jpg')] bg-cover bg-center blur-sm brightness-50"></div>

    <header className="relative z-20 h-24 bg-black/40 border-b border-white/20">
      <div className="h-full flex items-center justify-between px-8">
        <h1 className="text-6xl text-white">Compendium</h1>
          <p>Menu</p>
      </div>
    </header>
    <div className="relative z-10 h-[calc(100vh-6rem)] p-8 overflow-hidden">
      <p>Dashboard o search</p>
    </div>
  </>
  )
}

export default App
