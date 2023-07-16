import React from 'react';
import {auth} from '../firebase'
import { firebaseTimestampToHour } from "../service";
import { calculateTimeDifferenceInMinutes } from '../service';


const Message = ({ message }) => {
  return (
    <div>

{ message.uid !== auth.currentUser.uid&& 
  <div class="flex items-center mb-4">
    <img class="w-10 h-10 rounded-full mr-4" src={message.photoURL} alt="Avatar"/>
    <div className='bg-blue-200  p-2 rounded-lg max-w-lg'>
      <p class="font-bold">{message.name}</p>
      <p class="text-gray-600">{message.text}</p>
      { calculateTimeDifferenceInMinutes(message.createdAt) <= 59 
    ? <p class="text-gray-500 text-xs text-right"> đã gửi {calculateTimeDifferenceInMinutes(message.createdAt)} phút trước</p>
     :  <p class="text-gray-500 text-xs text-right">{firebaseTimestampToHour(message.createdAt)}</p>  } 
    </div>
  </div>
}
  
    { message.uid === auth.currentUser.uid&& 
    <div class="flex items-end mb-2">
  <div class="ml-auto">
    <div class="bg-blue-200 p-2 rounded-lg max-w-lg">
      <p class="font-bold text-right">{message.name}</p>
      <p class="text-gray-600 text-right">{message.text}</p>

    { calculateTimeDifferenceInMinutes(message.createdAt) <= 59 
    ? <p class="text-gray-500 text-xs text-right"> đã gửi {calculateTimeDifferenceInMinutes(message.createdAt)} phút trước</p>
     :  <p class="text-gray-500 text-xs text-right">{firebaseTimestampToHour(message.createdAt)}</p>  } 
     
    </div>
  </div>
  <img class="w-10 h-10 rounded-full ml-4" src={message.photoURL} alt="Avatar"/>
</div>

}

  </div>

  );
};
export default Message;