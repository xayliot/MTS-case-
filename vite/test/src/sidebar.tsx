import { useEffect, useRef } from 'react';
import HomeIco from '/home.svg?url';
import TeamIco from '/team.png?url';
import AvaImg from '/johnava.jpg?url';

function SideBar({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const sidebarRef = useRef<HTMLDivElement>(null);

  const navItems = [
    { icon: HomeIco, label: 'Dashboard', count: 5 },
    { icon: TeamIco, label: 'Team', count: '21+' },
    { icon: TeamIco, label: 'Projects' },
    { icon: TeamIco, label: 'Calendar' },
    { icon: TeamIco, label: 'Documents' },
    { icon: TeamIco, label: 'Reports' }
  ];

  const teams = [
    { id: 1, name: 'Lions' },
    { id: 2, name: 'Zebras' },
    { id: 3, name: 'Tigers' },
    { id: 4, name: 'Bears' }
  ];

  const getInitial = (name: string) => name.charAt(0).toUpperCase();

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target as Node)) {
        onClose();
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClose]);

  return (
    <>
      {/* {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={onClose}
        />
      )} */}
      <div 
        ref={sidebarRef}
        className={`bg-[#503AF6] w-2xs h-dvh flex flex-col gap-5 px-6 fixed md:static z-50 transition-transform duration-300
           ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}
      >
        <div className="h-16 w-32 flex items-center">
          <img 
            src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=white" 
            alt="Logo" 
            className="h-10 w-10" 
          />
        </div>

        <nav className="flex flex-1">
          <ul className="flex-1 gap-7 flex flex-col">
            <li>
              <ul className="-m-2">
                {navItems.map((item, index) => (
                  <li key={index} className="flex rounded-b-2xl">
                    <a 
                      href="#" 
                      className="flex flex-1 w-14 h-8 items-center gap-3 p-2 hover:bg-[#442DD8] rounded-lg transition-colors"
                    >
                      <img src={item.icon} alt="" className="h-8" />
                      {item.label}
                      {item.count && (
                        <span className="ml-auto w-9 border rounded-4xl min-w-max text-xs p-0.5 px-2.5 bg-[#503AF6] text-center">
                          {item.count}
                        </span>
                      )}
                    </a>
                  </li>
                ))}
              </ul>
            </li>

            <li>
              <div className="text-xs font-medium text-white mt-4 mb-2">Your teams</div>
              <ul className="mt-2 -m-2">
                {teams.map(team => (
                  <li key={team.id}>
                    <a 
                      href="#" 
                      className="flex gap-3 p-2 items-center hover:bg-[#442DD8] rounded-lg transition-colors"
                    >
                      <span className="flex border rounded-lg justify-center h-6 w-6 text-center shrink-0 items-center text-sm">
                        {getInitial(team.name)}
                      </span>
                      <span className="truncate">{team.name}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </li>

            <li className='mt-auto -mx-6 hover:bg-[#442DD8] rounded-lg transition-colors'>
              <a href="#" className='flex py-3 px-6 items-center gap-4'>
                <img src={AvaImg} alt="" className='h-8 w-8 rounded-full object-cover'/>
                <span className="font-medium text-xs">John Week</span>
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
}

export default SideBar;