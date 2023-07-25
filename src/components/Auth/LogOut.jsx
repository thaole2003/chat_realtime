import React from "react";
import { auth } from "../../firebase";
const style = {
  button: `bg-gray-200 pr-1 items-center gap-1 flex text-black  hover:bg-red-800 hover:text-white hover:text-white rounded-lg h-9`,
};

const LogOut = (props) => {
  const handleLogoutClick = () => {
    const shouldLogout = window.confirm("Are you sure you want to log out?");
    if (shouldLogout) {
      auth.signOut();
    }
  };
  return (
    <>
      <div className="flex justify-around items-center gap-3">
        <img
          className="w-10 h-10  rounded-full hidden lg:block "
          src={props.user.photoURL}
          alt=""
        />
        <button onClick={handleLogoutClick} className={style.button}>
          <div></div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            className="w-5 h-5  m-4 hover:text-white "
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M5.636 5.636a9 9 0 1012.728 0M12 3v9"
            />
          </svg>
        </button>
      </div>
    </>
  );
};

export default LogOut;
