import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import SwiperCore from "swiper";
import "swiper/css/bundle";
import ListingDoctor from './ListingDoctor.jsx'

export default function OurDoctors() {
  const [saleListings, setSaleListings] = useState([]);
  SwiperCore.use([Navigation]);
 
  useEffect(() => {
    const fetchSaleListings = async () => {
      try {
        const res = await fetch(
          "http://localhost:3001/doctors/"
        );
        const data = await res.json();
        console.log(data) ;
        setSaleListings(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchSaleListings() ;
  }, []);
  return (
    <div>
   
      <div id="doctortext" className="flex flex-col gap-6 p-28 px-3 max-w-6xl mx-auto">
        <h1 className="text-slate-700 font-bold text-3xl lg:text-6xl">
        Meet Our  <span className="text-slate-500">Doctors</span>
          <br />
         
        </h1>
        <div className="text-gray-400 text-xs sm:text-sm">
        At Al Rahma Hospital, we pride ourselves on our team of dedicated and highly skilled medical professionals. 
          <br />
          Our doctors are committed to providing exceptional healthcare with a compassionate touch. Each member of our team brings a wealth of experience and expertise, ensuring that you receive the best possible care. Whether you are seeking routine medical advice or specialized treatment, our doctors are here to guide you every step of the way. Discover more about our esteemed doctors and how they can assist you in achieving optimal health and well-being.{" "}
        </div>
        
      </div>


      <div className="max-w-6xl mx-auto p-3 flex flex-col gap-8 my-10">
          <div className="">
            <div className="my-3">
              <h2 className="text-2xl font-semibold text-slate-600">
              Our Doctors{" "}
              </h2>
             
            </div>
            <div className="flex flex-wrap gap-4">

              {saleListings.map((listing) => (
                <ListingDoctor id="cardslool"  listing={listing} key={listing._id} />
              ))}
            </div>
          </div>
      
      </div>
    </div>
  );
}
