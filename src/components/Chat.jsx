import React, { useState, useEffect, useContext,useRef} from "react";
import add from '../img/icon_add.png'
import iconCacel from '../img/iconCancel.png'
import { db,auth } from '../firebase';
import { query, collection,  onSnapshot,where,getDocs,getDoc,orderBy} from 'firebase/firestore';
import SendMessage from "./SendMessage";
import MessageChat from "./MessageChat";
import {useAuthState} from 'react-firebase-hooks/auth'
import { RoomContext } from "../RoomContext"; 
import Addmember from './Addmember';
import LogOut from "./Auth/LogOut";
import SignIn from "./Auth/SignIn";
const Chat = ()=>{
  const [showComponent, setShowComponent] = useState(false);
  const scrollRef = useRef(null);

  const handleButtonClick = () => {
    setShowComponent(!showComponent);
  };
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
  // const [oRoom,setORoom] = useState([])
  const [roomId, setRoomId] = useState('');
  const [messages, setMessages] = useState([]);
  const [isRoomIdSet, setIsRoomIdSet] = useState(false);
  const contextRoom = useContext(RoomContext);
  useEffect(() => {
    // Auto scroll to the bottom when messages change or component mounts
    scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages]);
  useEffect(() => {
    if (contextRoom.roomid && !isRoomIdSet) {
      setRoomId(contextRoom.roomid);
      setIsRoomIdSet(true);
      
    }
    setIsRoomIdSet(false);

  }, [contextRoom.roomid, isRoomIdSet]);

  useEffect(() => {
    if (!isRoomIdSet && roomId) {
      const q = query(
        collection(db, 'messages'),
        where('room_id', '==', roomId),
      );

      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        let messageList = [];
        querySnapshot.forEach((doc) => {
          messageList.push({ ...doc.data(), id: doc.id });
        });
        messageList.sort((a, b) => a.createdAt - b.createdAt);
        setMessages(messageList);
      });

      return () => {
        unsubscribe();
      };
    }
  }, [isRoomIdSet, roomId]);

  console.log(messages);

    return (
        <div className="chat flex flex-col relative gap-2">
        <div className="chatInfo w-full top-0 bg-violet-700">
       

          <div className="chatIcons flex ">
          { user &&  roomId && contextRoom.roomname && (
  <label htmlFor="" className="text-xl font-bold flex gap-2 content-center">
    <div className="hidden lg:block">Phòng chat :</div>
    <p className="text-white shadow-xl shadow-slate-200">{contextRoom.roomname} </p>  |
    {user &&  roomId &&  <img onClick={handleButtonClick} className="pr-3 pb-2" src={!showComponent? add : iconCacel} alt="" /> } 
   
  </label>
)}
          {showComponent && <Addmember handleButtonClick ={handleButtonClick}/>}
          </div>
          <div className="chatIcons">
          {user ? <LogOut user={user} /> : <SignIn />}

          </div>
        </div>
        <div ref={scrollRef}   className="flex flex-col p-[10px]  messages overflow-y-scroll">
        {
  user && messages ? (
    messages.map((message) => (
      <MessageChat key={message.id} message={message} />
    ))
  ) : (
    <div className="text-white text-2xl">Hãy đăng nhập và chọn phòng để bắt đầu sử dụng!</div>
  )
}
        </div>
       <div id="scroll-container"  ></div>
        <div className="sendchat  w-full absolute bottom-0 h-[50px]">
                    {user && roomId &&  <SendMessage  /> }
                    
          </div>
     
      </div>
    )
}

export default Chat;