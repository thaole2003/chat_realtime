import { createContext, useState } from 'react';

const RoomContext = createContext();

const RoomProvider = ({ children }) => {
  const [roomid, setRoomid] = useState('');
  const [roomname, setRoomname] = useState('');
  const [activeRoom, setActiveRoom] = useState(null); 
    const functSetRoom = (id,name)=>{
      setActiveRoom(id);
        setRoomid(id);
        setRoomname(name)
        // console.log(roomid);
    }
    const value={
        roomid,functSetRoom,roomname,activeRoom
    }
  return (
    <RoomContext.Provider value={value}>
      {children}
    </RoomContext.Provider>
  );
};

export  {RoomContext,RoomProvider};
