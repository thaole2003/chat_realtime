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


const Sidebar = ()=>{
  const [showComponent, setShowComponent] = useState(false);

  const handleButtonClick = () => {
    setShowComponent(!showComponent);
    // console.log(showComponent);
  };

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
        {user && rooms && <Search rooms={rooms}/> }
        {user && (
  <>
    <Bt onClick={handleButtonClick} className="flex content-center gap-2">
      <BtIMG src={!showComponent ?addg : iconCacel} alt="" />
      <p className="text-xl pt-3 text-white">Thêm phòng</p>
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