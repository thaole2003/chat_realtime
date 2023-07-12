import React, { useState, useEffect, useRef } from "react";
import addg from "../img/addg.png";
import Add from "../img/add.png";
import More from "../img/more.png";
import { db } from '../firebase';
import { query, collection, orderBy, onSnapshot } from 'firebase/firestore';
import SendMessage from "./SendMessage";
import MessageChat from "./MessageChat";
import {auth} from '../firebase'
import {useAuthState} from 'react-firebase-hooks/auth'
// import Input from "./Input";

const Chat = ()=>{
  const scrollContainer = document.getElementById('scroll-container');
  window.addEventListener('change',()=>{
    if (scrollContainer) {
      scrollContainer.scrollTop = scrollContainer.scrollHeight;
    }
  })
  window.addEventListener('load',()=>{
    if (scrollContainer) {
      scrollContainer.scrollTop = scrollContainer.scrollHeight;
    }
  })
  if (scrollContainer) {
    scrollContainer.scrollTop = scrollContainer.scrollHeight;
  }

  const [user] = useAuthState(auth)
  const [messages, setMessages] = useState([]);
    useEffect(() => {
      // const scrollContainer = document.getElementById('scroll-container');
      // if (scrollContainer) {
      //   scrollContainer.scrollTop = scrollContainer.scrollHeight;
      // }
        const q = query(collection(db, 'messages'), orderBy('timestamp'));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
          let messages = [];
          querySnapshot.forEach((doc) => {
            messages.push({ ...doc.data(), id: doc.id });
          });
          setMessages(messages);
        });
        return () =>{ unsubscribe();
          //  scrollContainer = document.getElementById('scroll-container');
          if (scrollContainer) {
            scrollContainer.scrollTop = scrollContainer.scrollHeight;
          }};
      }, []);
      // console.log(messages);


    return (
        <div className="chat flex flex-col relative gap-2">
        <div className="chatInfo w-full top-0 bg-violet-700">
          <span></span>
          <div className="chatIcons">
            <img src={addg} alt="" />
            <img src={More} alt="" />
          </div>
        </div>
        <div id="scroll-container"  className="flex flex-col p-[10px] messages overflow-y-scroll">
        {user && messages && messages.map((message) => (
                    <MessageChat  key={message.id} message={message} />
                    
                  ))}
        </div>
       
        <div className="sendchat  w-full absolute bottom-0 h-[50px]">
                    {user &&  <SendMessage /> }
                    
          </div>
     
      </div>

    )
}
export default Chat;