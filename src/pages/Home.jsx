import React from 'react';
import Sidebar from '../components/Sidebar';
import Chat from '../components/Chat';
import { auth } from '../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
const  Home =()=>  {
  const [user] = useAuthState(auth);

        return (
            <div className='home'>
            <div className="container">
              <Sidebar/>
              <Chat/>
            </div>
          </div>
    );
}

export default Home;