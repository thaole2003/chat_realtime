import React from "react";
import SignIn from './Auth/SignIn';
import LogOut from './Auth/LogOut';
import {auth} from '../firebase'
import {useAuthState} from 'react-firebase-hooks/auth'
const Navbar = ()=>{
  const [user] = useAuthState(auth)
  // console.log(user)
    return (
        <div className='flex w-full justify-between h-[50px] p-2 bg-violet-900'>
        <span className="logo self-center font-sans text-base font-bold uppercase basis-1/3 text-white">App Chat</span>
          {user ? <LogOut user={user} /> : <SignIn />}
       
      </div>
    )
}
export default Navbar;