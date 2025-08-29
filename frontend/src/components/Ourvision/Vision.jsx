import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { Gem, Diamond, Crown } from "lucide-react"; // lucide-react icons

export default function OurVision() {
  useEffect(() => {
    AOS.init({ duration: 900, easing: "ease-in-out", once: true });
  }, []);

  const visionData = [
    {
      id: 1,
      title: "Jewellery",
      description:
        "Our jewellery pieces are crafted with timeless elegance, blending tradition and modernity to create designs that inspire confidence and beauty.",
      icon: <Crown className="w-10 h-10 text-yellow-600" />,
      aos: "fade-right",
    },
    {
      id: 2,
      title: "Gemstones",
      description:
        "We bring you ethically sourced gemstones, each with its unique brilliance, to add a touch of luxury and positive energy to your life.",
      icon: <Diamond className="w-10 h-10 text-blue-600" />,
      aos: "fade-up",
    },
    {
      id: 3,
      title: "Antiques",
      description:
        "Our antiques collection reflects history and heritage, offering rare and timeless pieces that carry the charm of the past into your space.",
      icon: <Gem className="w-10 h-10 text-green-600" />,
      aos: "fade-left",
    },
  ];

  return (
    <div className="px-6 md:px-12 py-16 bg-gradient-to-r overflow-hidden from-yellow-50 via-white to-yellow-50">
      {/* Heading */}
      <div className="text-center mb-12" data-aos="fade-down">
        <h2 className="text-4xl md:text-5xl font-bold text-gray-800">
          Our Vision
        </h2>
        <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
          At the heart of our brand lies a commitment to preserving heritage,
          celebrating craftsmanship, and delivering timeless elegance through
          our exclusive collections.
        </p>
      </div>

      {/* Vision Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {visionData.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-2xl shadow-lg p-8 text-center hover:shadow-2xl transition transform hover:-translate-y-2"
            data-aos={item.aos}
          >
            <div className="flex justify-center mb-4">{item.icon}</div>
            <h3 className="text-2xl font-semibold text-gray-800 mb-3">
              {item.title}
            </h3>
            <p className="text-gray-600 text-sm">{item.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
