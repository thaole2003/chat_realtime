import { createContext, useState } from 'react';

const RoomContext = createContext();

const RoomProvider = ({ children }) => {
  const [roomid, setRoomid] = useState('');
  const [roomname, setRoomname] = useState('');
  const [activeRoom, setActiveRoom] = useState(null); 
  const [showComponent, setShowComponent] = useState(false);
  const [showComponentAdd, setShowComponentAdd] = useState(false);
    const functSetRoom = (id,name)=>{
      setActiveRoom(id);
        setRoomid(id);
        setRoomname(name)
    }
    const showCreat = () =>{
      setShowComponent(!showComponent);
    }
    const showAdd = () =>{
      setShowComponentAdd(!showComponentAdd);
    }
    const value={
        roomid,functSetRoom,roomname,activeRoom,showCreat,showComponent,showAdd,showComponentAdd
    }
  return (
    <RoomContext.Provider value={value}>
      {children}
    </RoomContext.Provider>
  );
};

export  {RoomContext,RoomProvider};
