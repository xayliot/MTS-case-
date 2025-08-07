import { StrictMode, useState } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import SideBar from './sidebar.tsx'
import App from './App.tsx'
import Register from './register.tsx'

const RootComponent = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const sidebarWidth = '18rem';

  return (
    <div className="flex flex-col h-screen flex-1">
     <nav className={`
        bg-gray-800 text-white p-4 flex items-center fixed w-full z-40
        transition-transform duration-1000
        ${isSidebarOpen ? `transform translate-x-[${sidebarWidth}]` : 'translate-x-0'}
      `}>
        <button 
          onClick={() => setIsSidebarOpen(true)}
          className="p-2 rounded-md hover:bg-gray-700 transition-colors"
          aria-label="Toggle sidebar"
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-6 w-6" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M4 6h16M4 12h16M4 18h16" 
            />
          </svg>
        </button>
        <h1 className="ml-4 text-xl font-semibold">My Application</h1>
      </nav>

      <div className="flex-1 overflow-auto bg-gray-100">
      </div>

      {isSidebarOpen && (
        <div className="fixed inset-0 z-50">
          <div 
        
            onClick={() => setIsSidebarOpen(false)}
          />
          <SideBar 
        isOpen={isSidebarOpen}  
        onClose={() => setIsSidebarOpen(false)}
      />
        </div>
      )}
    </div>
  );
};

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App/>
    {/* <Register></Register> */}
    {/* <RootComponent /> */}
  </StrictMode>
);