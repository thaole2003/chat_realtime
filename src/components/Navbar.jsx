import React from "react";
import SignIn from './Auth/SignIn';
import LogOut from './Auth/LogOut';
import {auth} from '../firebase'
import { MessageInstance } from "antd/lib/message";
import iconMess from '../img/iconMess.png'
import {useAuthState} from 'react-firebase-hooks/auth'
const Navbar = ()=>{
  const [user] = useAuthState(auth)
  // console.log(user)
    return (
      
        <div className='flex w-full justify-between h-[50px] p-4 bg-violet-900'>
          {/* <MessageOutlined /> */}
          {/* <MessageInstance/> */}
          {/* <img className=" w-8 h-8" src={iconMess} alt="" /> */}
        <span className="logo text-2xl pt-5 self-center font-sans text-base font-bold uppercase basis-1/3 flex gap-1 content-center "><p className="text-red-400">Funny</p><p className="text-blue-500">Chat</p></span>
       
      </div>
    )
}
export default Navbar;