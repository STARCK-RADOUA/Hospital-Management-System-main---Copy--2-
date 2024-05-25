import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';


const Header = () => {
    let Links =[
      {name:"Home",link:'/'},
      {name:"About",link:'/about'},
      {name:"Contact us",link:'/contact'},
      {name:"Services",link:'/services'}
    ];
    let [open,setOpen]=useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();
  
    const handleSubmit = (e) => {
      e.preventDefault();
      const urlParams = new URLSearchParams(window.location.search);
      urlParams.set('searchTerm', searchTerm);
      const searchQuery = urlParams.toString();
      navigate(`/search?${searchQuery}`);
    };
  
    useEffect(() => {
      const urlParams = new URLSearchParams(window.location.search);
      const searchTermFromUrl = urlParams.get('searchTerm');
      if (searchTermFromUrl) {
        setSearchTerm(searchTermFromUrl);
      }
    }, [window.location.search]);
  
    
  
  return (
    <div className='flex justify-between items-center max-w-6xl mx-auto p-3 mb-11'>
          <div className='shadow-md w-full fixed top-0 left-0 mb-12'>
      <div className='md:flex items-center justify-between bg-white py-4 md:px-10 px-7'>
      <div className='font-bold text-2xl cursor-pointer flex items-center font-[Poppins] 
      text-gray-800'>
        <Link to='/'>
          <img className='logo' src="{logo}" alt='' />
        </Link>
      
      </div>
      
      <div onClick={()=>setOpen(!open)} className='text-3xl absolute right-8 top-6 cursor-pointer md:hidden'>
      <ion-icon name={open ? 'close':'menu'}></ion-icon>
      </div>

      <ul className={`md:flex md:items-center md:pb-0 pb-12 absolute md:static bg-white md:z-auto z-[-1] left-0 w-full md:w-auto md:pl-0 pl-9 transition-all duration-500 ease-in ${open ? 'top-20 ':'top-[-490px]'}`}>
        {
          Links.map((link)=>(
            <li key={link.name} className='md:ml-8 text-xl md:my-0 my-7'>
              <Link to={link.link} className='text-gray-800 hover:text-gray-400 duration-500'>{link.name}</Link>
            </li>
          ))
        }
        
      </ul>
      </div>
    </div>
    </div>

  )
}

export default Header



