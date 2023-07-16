import React,{useContext} from "react";
import { RoomContext } from "../RoomContext";
const Chats = ({room})=>{
  const context = useContext(RoomContext);
  const handleClick = () => {
    // console.log(room.id);
    context.functSetRoom(room.id,room.name)
        
  };

    return (
   

        <div className="chats" onClick={handleClick}>
        <div className="userChat">
        <div className="userChatInfo">
          <span>{room.name}</span>
           <p>{room.description}</p>
       </div>
     </div>
       </div>
               
         


    )
}
export default Chats;