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
      onClick={handleClick}>
        <div className="userChat flex items-center">
        <img
          src="https://images.pexels.com/photos/17286889/pexels-photo-17286889/free-photo-of-nh-ng-ng-i-dam-dong-am-nh-c-vui-v.jpeg?auto=compress&cs=tinysrgb&w=800&lazy=load" // Thay bằng đường dẫn đến ảnh logo của bạn
          alt="Logo"
          className="w-8 h-8 rounded-full mr-3 hidden lg:block" // Tùy chỉnh kích thước và hình dạng của ảnh logo
        />
        <div className="userChatInfo">
          <span className="text-sm lg:text-lg">{room.name}</span>
           <div className="hidden lg:block ">{room.description}</div>
       </div>
     </div>
       </div>
               
         


    )
}
export default Chats;