import React, { useState, useEffect, useContext } from "react";
import add from '../img/icon_add.png'
import iconCacel from '../img/iconCancel.png'
import { db } from '../firebase';
import { query, collection,  onSnapshot,where,getDocs,orderBy,} from 'firebase/firestore';
import SendMessage from "./SendMessage";
import MessageChat from "./MessageChat";
import {auth} from '../firebase'
import {useAuthState} from 'react-firebase-hooks/auth'
import { RoomContext } from "../RoomContext"; 
import Addmember from './Addmember';
const Chat = ()=>{
  const [showComponent, setShowComponent] = useState(false);
  // const [srcIcon, setSrcIcon] = useState('add');

  const handleButtonClick = () => {
    setShowComponent(!showComponent);
    // setSrcIcon(srcIcon== 'add' ? 'iconCacel': 'add' )
    // console.log(showComponent);
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
  const [oRoom,setORoom] = useState([])
  const [roomId, setRoomId] = useState('');
  const [messages, setMessages] = useState([]);
  const [isRoomIdSet, setIsRoomIdSet] = useState(false);
  const contextRoom = useContext(RoomContext);
  // console.log('context room:' +contextRoom);
  // console.log('context id:' +contextRoom.roomid);
  // console.log('context isRoomIdSet:' +isRoomIdSet);
  // console.log('context roomid:' +roomId);
  useEffect(() => {
    if (!isRoomIdSet && roomId) {
      const getRoomById = async () => {
        try {
          const q = query(collection(db, 'rooms'), where('id', '==', roomId));
          const querySnapshot = await getDocs(q);
    
          if (!querySnapshot.empty) {
            const roomData = querySnapshot.docs[0].data();
            setORoom([{ ...roomData, id: querySnapshot.docs[0].id }]);
          } else {
            setORoom([]); // Nếu không tìm thấy bản ghi với roomId, setORoom thành mảng rỗng
          }
        } catch (error) {
          console.error('Error getting room data:', error);
          // Xử lý lỗi nếu có
        }
      };
  
      getRoomById();
    }
  }, [isRoomIdSet, roomId]);
  console.log(oRoom);
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
          <span></span>
          <div className="chatIcons  content-center">
          {contextRoom.roomname && (
  <label htmlFor="" className="text-xl flex gap-2 content-center">
    <p>Phòng chat :</p>
    <p className="text-pink-700">{contextRoom.roomname} </p> |
  </label>
)}
          { roomId &&  <img onClick={handleButtonClick} className="pr-3" src={!showComponent? add : iconCacel} alt="" /> } 
          {showComponent && <Addmember handleButtonClick ={handleButtonClick}/>}
          </div>
        </div>
        <div   className="flex flex-col p-[10px] messages overflow-y-scroll">
        {user && messages && messages.map((message) => (
                    <MessageChat  key={message.id} message={message} />
                    
                  ))}
        </div>
       <div id="scroll-container"></div>
        <div className="sendchat  w-full absolute bottom-0 h-[50px]">
                    {user && roomId &&  <SendMessage /> }
                    
          </div>
     
      </div>
    )
}

export default Chat;