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
  <div class="flex items-end mb-2 w-[50%] overflow-hidden">
    <Tooltip title={message.name}>  <img class="w-7 h-7 rounded-full mr-4" src={message.photoURL} alt="Avatar"/> </Tooltip>
    <div className='relative bg-blue-200 p-2 rounded-lg w-auto max-w-[80%] h-auto'>
      {/* <p className="font-bold">{message.name}</p> */}
      <Tooltip
        title={calculateTimeDifferenceInMinutes(message.createdAt) <= 59
          ? <div className="text-white text-xs text-right"> đã gửi {calculateTimeDifferenceInMinutes(message.createdAt)} phút trước</div>
          : <div className="text-white text-xs text-right">{firebaseTimestampToHour(message.createdAt)}</div>}
        placement="right"
        trigger={['hover', 'focus']}
        rootClose={false} 
        // Thêm vào để khi hover ra khỏi Tooltip thì Tooltip vẫn hiển thị, chỉ biến mất khi click ra ngoài
      >
        <div className="text-gray-800 break-words text-xl max-w-full h-auto cursor-pointer">{message.text}</div>
      </Tooltip>
    </div>
  </div>

}
  
    { message.uid === auth.currentUser.uid&& 
   <div class="flex items-end mb-2 w-[50%] float-right">

    <div className='bg-blue-200  p-2 ml-auto rounded-lg w-auto max-w-[80%] h-auto'>
      {/* <p class="font-bold">{message.name}</p> */}
      <Tooltip title= { calculateTimeDifferenceInMinutes(message.createdAt) <= 59 
    ? <div class="text-white text-xs text-right"> đã gửi {calculateTimeDifferenceInMinutes(message.createdAt)} phút trước</div>
     :  <div class="text-white text-xs text-right">{firebaseTimestampToHour(message.createdAt)}</div>  } 
     placement="left"
     trigger={['hover', 'focus']}
     rootClose={false} 
     >  <div class="text-gray-800 break-words text-xl">{message.text}</div></Tooltip>
     
    </div>
   <Tooltip title={message.name}> <img class="w-8 h-8 rounded-full ml-4" src={message.photoURL} alt="Avatar"/></Tooltip>
 </div>
 

}

  </div>

  );
};
export default Message;