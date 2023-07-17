import React,{useContext} from "react";
import { RoomContext } from "../RoomContext";
const style = {
  active: `bg-sky-700`
};
const Chats = ({room})=>{
  const context = useContext(RoomContext);
  const handleClick = () => {
    // console.log(room.id);
    context.functSetRoom(room.id,room.name)
        
  };

    return (
   

      <div
      className={`chats ${context.activeRoom === room.id ? style.active : ""}`}
      onClick={handleClick}
    >
        <div className="userChat">
        <div className="userChatInfo">
          <span>{room.name}</span>
           <div>{room.description}</div>
       </div>
     </div>
       </div>
               
         


    )
}
export default Chats;