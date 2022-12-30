import React from "react";

const Banner = () => {
  return (
    <div
      className="hero w-full  text-white h-full"
      style={{
        // backgroundImage: `url(https://www.bproperty.com/blog/wp-content/uploads/cover-3.jpg)`,
        backgroundImage: `url(https://web.frazerconsultants.com/wp-content/uploads/2017/07/A-lobby-with-chairs-and-tables.jpg)`, backgroundColor: 'rgba(192,192,192,1)',
      }}
    >
      <div className="hero-content flex-col lg:flex-row-reverse">
        {/* <img src="" className="lg:w-1/2 rounded-lg shadow-2xl" alt="" /> */}
        <div>
          <h1 className="text-5xl font-bold">Furniture Bazar</h1>
          <p className="py-6">
          Old furniture drop here and pick your favorite one.
          </p>
          <button className="btn btn-primary bg-gradient-to-r from-primary to-secondary text-white">
            Get Started
          </button>
        </div>
      </div>
    </div>
  );
};

export default Banner;
