import React,{useEffect,useState,useContext} from "react";
import { query, collection, orderBy, onSnapshot ,where} from 'firebase/firestore';
import iconCacel from '../img/iconCancel.png'
import addg from "../img/addg.png";
import Navbar from "./Navbar"
import Search from "./Search"
import Chats from "./Chats"
import {auth,db} from '../firebase'
import {useAuthState} from 'react-firebase-hooks/auth'
import CreateChatRoom from "./ChatRoom";
import styled from 'styled-components';
import classNames from 'classnames';
import { RoomContext } from "../RoomContext";

const Sidebar = ()=>{
  const roomContext = useContext(RoomContext);
  const showComponent= roomContext.showComponent;
  // const [showComponent, setShowComponent] = useState(false);

  const handleButtonClick = roomContext.showCreat;

  const [rooms, setRooms] = useState([]);
  const [user] = useAuthState(auth)

  useEffect(() => {
    if (user) {
      const q = query(collection(db, 'rooms'), where('users', 'array-contains', user.uid));
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        let rooms = [];
        querySnapshot.forEach((doc) => {
          rooms.push({ ...doc.data(), id: doc.id });
        });
        setRooms(rooms);
      });

      return () => {
        unsubscribe();
      };
    }
  }, [user?.uid]); 
  // console.log(user);
  // console.log(rooms[0].name);
    return (
        <Container className="sidebar ">
        <Navbar />
        <div className="z-50">
        {user && rooms && <Search  rooms={rooms}/> }

        </div>
        <hr />
        {user && (
  <>
    <Bt onClick={handleButtonClick} className="flex items-center p-2 gap-2">
      <BtIMG src={!showComponent ?addg : iconCacel} alt="" />
      <div className="text-xl text-white hidden lg:block">Thêm phòng</div>
    </Bt>
    {showComponent && <CreateChatRoom />}
  </>
)}      <div className="chatroom overflow-y-scroll">


        {user && rooms && rooms.map((room) => (
                    <Chats  key={room.id}  room={room} />
                    
                  ))}
            </div>
                   
            
      </Container>
    )
}
export default Sidebar;
const Container = styled.div`



`;
const Bt = styled.button`
padding: 10px;
  display: flex;
  align-items: center;
`;
const BtIMG = styled.img`
  width: 35px;
  height: 35px;
`;