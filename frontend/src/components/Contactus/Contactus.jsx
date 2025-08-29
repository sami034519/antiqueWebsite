import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import contactus from "../../images/contactus.jpg";

export default function ContactUs() {
  useEffect(() => {
    AOS.init({ duration: 800, easing: "ease-in-out", once: false });
  }, []);

  return (
    <div className="px-6 md:px-12 py-12 bg-gray-50 overflow-hidden">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-center">

        {/* Left Image */}
        <div data-aos="fade-right">
          <img
            src={contactus}
            alt="Contact Us"
            className="w-full h-[500px] object-cover rounded-2xl shadow-lg"
          />
        </div>

        {/* Right Form */}
        <div
          className="bg-white p-6 md:p-10 rounded-2xl shadow-lg"
          data-aos="fade-left"
          data-aos-delay="200"
        >
          <h2 className="text-3xl font-semibold mb-6" data-aos="fade-up">
            Get in Touch
          </h2>

          <form className="space-y-4">
            {/* Name */}
            <div data-aos="fade-up" data-aos-delay="100">
              <label className="block text-sm font-medium mb-1">Name</label>
              <input
                type="text"
                placeholder="Your Name"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-yellow-500 focus:outline-none"
              />
            </div>

            {/* Email */}
            <div data-aos="fade-up" data-aos-delay="200">
              <label className="block text-sm font-medium mb-1">Email</label>
              <input
                type="email"
                placeholder="Your Email"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-yellow-500 focus:outline-none"
              />
            </div>

            {/* Message */}
            <div data-aos="fade-up" data-aos-delay="300">
              <label className="block text-sm font-medium mb-1">Message</label>
              <textarea
                rows="4"
                placeholder="Write your message..."
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-yellow-500 focus:outline-none"
              ></textarea>
            </div>

            {/* Button */}
            <div data-aos="zoom-in" data-aos-delay="400">
              <button
                type="submit"
                className="relative w-full bg-yellow-600 text-white font-semibold py-2 px-4 rounded-lg overflow-hidden group"
              >
                {/* Green overlay animation */}
                <span className="absolute inset-0 bg-primary translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-in-out"></span>

                {/* Text stays above */}
                <span className="relative z-10 group-hover:text-white">Send Message</span>
              </button>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
}
