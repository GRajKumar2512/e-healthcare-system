import React from "react";
import { Outlet } from "react-router-dom";

const AuthLayout = () => {
  return (
    <section className="w-screen h-screen flex items-center justify-center bg-primary overflow-hidden">
      <div className="flex w-[80%] bg-white py-10">
        <div className="hidden lg:block w-1/2 px-10">
          <h1 className="text-4xl text-gray-500">
            Manage <br /> <span className="text-primary">Healthcare</span>
          </h1>
          <p className="text-gray-500 pt-4 leading-6">
            Unlock your personalized health journey with our secure healthcare
            system.
          </p>
          <div className="flex justify-center pt-4">
            <img
              src="/public/assets/doctor.jpg"
              alt="logo"
              height={300}
              width={300}
              className="object-contain"
            />
          </div>
        </div>
        <div className="flex-1">
          <Outlet />
        </div>
      </div>
    </section>
  );
};

export default AuthLayout;
