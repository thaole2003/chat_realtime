import React, { useState ,useContext} from 'react';
import {auth, db} from '../firebase'
import {addDoc, collection, serverTimestamp} from 'firebase/firestore'
import { RoomContext } from '../RoomContext';
import { styled } from 'styled-components';
const style = {
    form: `w-full h-full items-center  flex text-xl gap-5 pb-5 `,
    input: `w-[90%]  p-5 h-full bg-transparent rounded-xl  outline-none border-none text-lg text-gray-300`,
    button: `w-[10%] p-5 h-full bg-transparent pr-20px rounded-xl content-center justify-center flex items-center`,
  };
  const Button = styled.button`
  cursor: pointer;
  &:disabled {
    /* background-color: #ccc; */
    cursor: not-allowed;
  }
`;

const SendMessage = () => {
  const context = useContext(RoomContext);
  
    const [input, setInput] = useState('');
    const sendMessage = async (e) => {
        e.preventDefault()
        if (input.trim() === '') {
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
      placeholder='Nhập lời nhắn ...'
    />
    <Button  className={style.button} type='submit'  disabled={!input}>
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
</svg>

    </Button>
  </form>
  
  )
}

export default SendMessage