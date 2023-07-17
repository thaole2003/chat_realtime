import React,{useRef,useEffect} from 'react';
import {auth} from '../firebase'
import { firebaseTimestampToHour } from "../service";
import { calculateTimeDifferenceInMinutes } from '../service';
import Tooltip from "@mui/material/Tooltip";

const Message = ({ message }) => {
  const chatContainerRef = useRef(null);
  useEffect(() => {
    // Scroll the chat container to the bottom when messages change
    chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
  }, [message]);

  return (
    <div  className="chat-container"
    ref={chatContainerRef}>

{ message.uid !== auth.currentUser.uid&& 
  <div class="flex items-end mb-2">
    <Tooltip title={message.name}>  <img class="w-7 h-7 rounded-full mr-4" src={message.photoURL} alt="Avatar"/> </Tooltip>
    <div className='bg-blue-200  p-2 rounded-lg max-w-lg'>
      {/* <p class="font-bold">{message.name}</p> */}
      <Tooltip title= { calculateTimeDifferenceInMinutes(message.createdAt) <= 59 
    ? <p class="text-white text-xs text-right"> đã gửi {calculateTimeDifferenceInMinutes(message.createdAt)} phút trước</p>
     :  <p class="text-white text-xs text-right">{firebaseTimestampToHour(message.createdAt)}</p>  } >  <div class="text-gray-800  text-xl">{message.text}</div></Tooltip>
     
    </div>
  </div>
}
  
    { message.uid === auth.currentUser.uid&& 
    <div class="flex items-end mb-2">
  <div class="ml-auto">
    <div class="bg-blue-200 p-2  rounded-lg max-w-lg">
     
  <Tooltip title= { calculateTimeDifferenceInMinutes(message.createdAt) <= 59 
    ? <p class="text-white text-xs text-right"> đã gửi {calculateTimeDifferenceInMinutes(message.createdAt)} phút trước</p>
     :  <p class="text-white text-xs text-right">{firebaseTimestampToHour(message.createdAt)}</p>  } >  <div class="text-gray-800 text-xl text-right ">{message.text}</div></Tooltip>
   
    </div>
  </div>
  <Tooltip title={message.name}> <img class="w-8 h-8 rounded-full ml-4" src={message.photoURL} alt="Avatar"/></Tooltip>
</div>

}

  </div>

  );
};
export default Message;