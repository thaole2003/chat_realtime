import React, { useEffect, useState } from "react";
import { query, collection, onSnapshot, where } from "firebase/firestore";
import addRoom from "../img/addg.png";
import Navbar from "./Navbar";
import Search from "./Search";
import Chats from "./Chats";
import { auth, db } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import CreateChatRoom from "../components/Modal/ChatRoom";
import styled from "styled-components";

const Sidebar = () => {
  const [showModalAdd, setShowModalAdd] = useState(false);
  const [showOverlay, setShowOverlay] = useState(false);

  const handleButtonClick = () => {
    setShowModalAdd(!showModalAdd);
    setShowOverlay(!showModalAdd);
  };

  const [rooms, setRooms] = useState([]);
  const [user] = useAuthState(auth);

  useEffect(() => {
    if (user) {
      const q = query(
        collection(db, "rooms"),
        where("users", "array-contains", user.uid)
      );
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
  }, [user]);

  return (
    <Container className="sidebar">
      <Navbar />
      <div className="z-50">{user && rooms && <Search rooms={rooms} />}</div>
      <hr />
      {user && (
        <>
          <Btn
            onClick={handleButtonClick}
            className="flex items-center p-2 gap-2"
          >
            <BtnImg src={addRoom} alt="" />
            <div className="text-xl text-white hidden lg:block">Thêm phòng</div>
          </Btn>
          {showOverlay && <Overlay onClick={handleButtonClick} />}
          {showModalAdd && (
            <CreateChatRoom handleButtonClick={handleButtonClick} />
          )}
        </>
      )}
      <div className="chatroom overflow-y-scroll">
        {user &&
          rooms &&
          rooms.map((room) => <Chats key={room.id} room={room} />)}
      </div>
    </Container>
  );
};

export default Sidebar;

const Container = styled.div``;

const Btn = styled.button`
  padding: 10px;
  display: flex;
  align-items: center;
`;

const BtnImg = styled.img`
  width: 35px;
  height: 35px;
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 100;
`;
