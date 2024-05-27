import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom';

function About() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3001/departements'); // Replace with your API endpoint
        setData(response.data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);
  return (
    <div className='page-content'>
  
    <section className="text-gray-600 body-font">
      <div className="container mx-auto flex px-5 py-8 md:flex-row flex-col items-center">
        <div className="lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center">
          <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900">
          Our Departments
            <br className="hidden lg:inline-block" />
            
          </h1>
          <p id='text' className="mb-8 leading-relaxed">
          At Al Rahma Hospital, we take pride in offering a comprehensive range of specialized medical services. Our departments are equipped with the latest technology and led by dedicated, highly qualified professionals, ready to meet your healthcare needs with compassion and expertise. Explore our various departments and the quality care we provide to ensure the well-being of you and your loved ones.
          </p>
          
        </div>
        <div id = "image" className="lg:w-full lg:w-full md:w-1/2 w-5/6">
          <img id = "image" className="object-cover object-center rounded" alt="hero" src="https://firebasestorage.googleapis.com/v0/b/abdo-eb1c2.appspot.com/o/17168218032231000_F_388003741_3pDGioOwlLIEr0Af2DaepDlLxc3tgqUZ.jpg?alt=media&token=c3b79ea2-3527-4a0a-9962-cbe9095d7eee" />
        </div>
      </div>
    </section>

   

    <div id='cardsload' className="px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">
      <div className="grid gap-5 row-gap-5 mb-8 lg:grid-cols-4 sm:grid-cols-2">
        {data.map((card, index) => (
          <Link  id='cardslool' key={index} to={`/departement/${card._id}`} aria-label="View Item" className="inline-block overflow-hidden duration-300 transform bg-white rounded shadow-sm hover:-translate-y-2">
            <div className="flex flex-col h-full">
              <img src={card.imageUrls[0]} className="object-cover w-full h-48" alt="" />
              <div className="flex-grow border border-t-0 rounded-b">
                <div className="p-5">
                  <h6 className="mb-2 font-semibold leading-5">{card.name}</h6>
                  <p className="text-sm text-gray-900">{card.description}</p>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  </div>
  )
}

export default About