import React from 'react';
import {auth} from '../firebase'



const Message = ({ message }) => {


  return (
    <div>

{ message.uid !== auth.currentUser.uid&& 
  <div class="flex items-center mb-4">
    <img class="w-10 h-10 rounded-full mr-4" src={message.photoURL} alt="Avatar"/>
    <div className='bg-blue-200  p-2 rounded-lg max-w-lg'>
      <p class="font-bold">{message.name}</p>
      <p class="text-gray-600">{message.text}</p>
    </div>
  </div>
}
  
    { message.uid === auth.currentUser.uid&& 
    <div class="flex items-end mb-4">
  <div class="ml-auto">
    <div class="bg-blue-200 p-2 rounded-lg max-w-lg">
      <p class="font-bold text-right">{message.name}</p>
      <p class="text-gray-600 text-right">{message.text}</p>
    </div>
  </div>
  <img class="w-10 h-10 rounded-full ml-4" src={message.photoURL} alt="Avatar"/>
</div>

}

  </div>

  );
};
  //  <div className=''>
  //     <div className={`${style.message} ${messageClass}`}>
  //       <p className={style.name}>{message.name}</p>
  //       <p></p>
  //     </div>
  //   </div>
export default Message;