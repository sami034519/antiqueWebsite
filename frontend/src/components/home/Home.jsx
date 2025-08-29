import React from "react";
import desktopImg from "../../images/bannerdeskf.webp"; // change path to your image
import mobileImg from "../../images/mobilehome.webp";   // change path to your image
import Collection from "../collections/Collections";
import ContactUs from "../Contactus/Contactus";
import OurVision from "../Ourvision/Vision";
const Home = () => {
  return (
    <>
    <div className="w-full mt-16 lg:mt-20 overflow-hidden">
      {/* Desktop Image */}
      <img
        src={desktopImg}
        alt="Desktop Banner"
        className="hidden md:block w-full h-[80vh]"
      />

      {/* Mobile Image */}
      <img
        src={mobileImg}
        alt="Mobile Banner"
        className="block md:hidden w-full h-[90vh]"
      />
    </div>
    {/* //Collection */}
<Collection/>
<OurVision/>
<ContactUs/>
    </>
  );
};

export default Home;
