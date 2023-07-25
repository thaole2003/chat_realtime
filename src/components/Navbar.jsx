import React from "react";

const Navbar = () => {
  return (
    <div className="flex w-full justify-between h-[50px] pb-5 pl-3 p bg-violet-900">
      <span className="logo text-2xl pt-5 self-center font-sans text-base font-bold uppercase basis-1/3 flex gap-1 content-center ">
        <p className="text-red-400">Funny</p>
        <p className="text-blue-500">Chat</p>
      </span>
    </div>
  );
};
export default Navbar;
