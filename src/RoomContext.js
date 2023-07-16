import { createContext, useState } from 'react';

const RoomContext = createContext();

const RoomProvider = ({ children }) => {
  const [roomid, setRoomid] = useState('');
  const [roomname, setRoomname] = useState('');
    const functSetRoom = (id,name)=>{
        setRoomid(id);
        setRoomname(name)
        // console.log(roomid);
    }
    const value={
        roomid,functSetRoom,roomname
    }
  return (
    <RoomContext.Provider value={value}>
      {children}
    </RoomContext.Provider>
  );
};

export  {RoomContext,RoomProvider};
