import React,{useState} from 'react';
import Sidebar from '../components/Sidebar';
import Chat from '../components/Chat';
import { RoomProvider } from '../RoomContext';
import { styled } from 'styled-components';
const  Home =()=>  {
  // const [isDarkMode, setIsDarkMode] = useState(false);

// Hàm chuyển đổi chế độ sáng/tối

        return (
          <RoomProvider>
            <Homee className='home'>
            <div className="container">
              <Sidebar/>
              <Chat/>
            </div>
          </Homee>
          </RoomProvider>
    );
}

export default Home;
const Homee = styled.div`
    background-image:url('https://64.media.tumblr.com/913fc95846350c30232a5608a322b78e/tumblr_obykzyjxZt1vbllj8o4_1280.png');
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center center;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
`