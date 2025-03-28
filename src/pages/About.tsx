import React from "react";

export const About = () => {
  return (
    <div className='space-y-8'>
      <h1 className='text-4xl font-semibold'>About </h1>
      <div className='space-y-4'>
        <p>
          This is a simple e-commerce application built with React and TypeScript, express, tailwind with integrated
          stripe payment functionality. It allows users to browse products, add them to their cart, and place orders.
        </p>
        <p>
          The application is designed to be user-friendly and responsive, providing a seamless shopping experience
          across devices.
        </p>
      </div>
    </div>
  );
};
