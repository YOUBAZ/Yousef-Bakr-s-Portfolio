import React from "react";

const About = () => {
  return (
    <div className="avatar flex flex-col justify-center items-center min-h-screen gap-3 mt-10">
      <div className="ring-primary ring-offset-base-100 md:w-60 w-24 rounded-full ring-2 ring-offset-2">
        <img
          className="md:w-40 md:h-40 w-24 h-24"
          src="https://img.daisyui.com/images/profile/demo/spiderperson@192.webp"
        />
      </div>
      <div className="text-center">
        <h1 className="text-2xl md:text-5xl font-bold">Yousef Bakr Zaki</h1>
        <p className="text-gray-600 dark:text-gray-400 md:text-3xl">
          Web Developer
        </p>
        <p className="mt-2 text-gray-500 dark:text-gray-300 md:text-3xl">
          Passionate about creating interactive and user-friendly web
          applications.
        </p>
      </div>
    </div>
  );
};

export default About;
