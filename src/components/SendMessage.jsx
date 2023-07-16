import React, { useState ,useContext} from 'react';
import {auth, db} from '../firebase'
import {addDoc, collection, serverTimestamp} from 'firebase/firestore'
import { RoomContext } from '../RoomContext';
const style = {
    form: `w-full h-full items-center  flex text-xl  bottom-0`,
    input: `w-full  p-5 h-full  outline-none border-none text-lg`,
    button: `w-[20%] h-full bg-green-500`,
  };
const SendMessage = () => {
  const context = useContext(RoomContext);
  
    const [input, setInput] = useState('');
    const sendMessage = async (e) => {
        e.preventDefault()
        if (input === '') {
            alert('Please enter a valid message')
            return
        }
        const {uid, displayName,photoURL} = auth.currentUser
        // console.log( auth.currentUser);
        await addDoc(collection(db, 'messages'), {
            text: input,
            name: displayName,
            uid,
            photoURL: photoURL,
            room_id: context.roomid,
            createdAt: serverTimestamp(),
            updatedAt: serverTimestamp()
            
        })
        setInput('')
      }
  return (
    <form onSubmit={sendMessage} className={style.form}>
    <input
      value={input}
      onChange={(e) => setInput(e.target.value)}
      className={style.input}
      type='text'
      placeholder='Message'
    />
    <button className={style.button} type='submit'>
      Send
    </button>
  </form>
  
  )
}

export default SendMessage