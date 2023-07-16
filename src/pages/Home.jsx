import React,{useState} from 'react';
import Sidebar from '../components/Sidebar';
import Chat from '../components/Chat';
import { RoomProvider } from '../RoomContext';
const  Home =()=>  {
  // const [isDarkMode, setIsDarkMode] = useState(false);

// Hàm chuyển đổi chế độ sáng/tối

        return (
          <RoomProvider>
            <div className='home'>
            <div className="container">
              <Sidebar/>
              <Chat/>
            </div>
          </div>
          </RoomProvider>
    );
}

export default Home;