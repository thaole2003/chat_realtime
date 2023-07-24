import React, {useState, useContext} from 'react';
import {auth, db} from '../firebase'
import {addDoc, collection, serverTimestamp} from 'firebase/firestore'
import {RoomContext} from '../RoomContext';
import IconSend from "../img/asSvg/iconSend.svg";
import {LikeFilled } from '@ant-design/icons';

const style = {
    form: `w-full h-full items-center  flex text-xl gap-5 pb-5 `,
    input: `w-[80%]  p-5 h-full bg-transparent md:bg-white rounded-xl  outline-none border-none text-lg text-gray-800`,
    button: `w-[10%] p-5 h-full bg-transparent pr-20px rounded-xl content-center justify-center flex items-center`,
};

const SendMessage = () => {
    const context = useContext(RoomContext);
    const [message, setMessage] = useState('');
    const sendMessage = async (e) => {
        e.preventDefault()
        const {uid, displayName, photoURL} = auth.currentUser
        if (message.trim() === '') {
            await addDoc(collection(db, 'messages'), {
                text: message,
                name: displayName,
                uid,
                isSendLike: true,
                photoURL: photoURL,
                room_id: context.roomid,
                createdAt: serverTimestamp(),
                updatedAt: serverTimestamp()

            })
            return
        }
        await addDoc(collection(db, 'messages'), {
            text: message,
            name: displayName,
            uid,
            photoURL: photoURL,
            isSendLike: false,
            room_id: context.roomid,
            createdAt: serverTimestamp(),
            updatedAt: serverTimestamp()

        })
        setMessage('')
    }

    return (
        <form onSubmit={sendMessage} className={style.form}>
            <input
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className={style.input}
                type='text'
                placeholder='Nhập lời nhắn ...'
            />
            <button
                className={"w-[10%] h-full bg-transparent rounded-xl content-center justify-end flex items-center hover:scale-110 transition duration-300 ease-in-out"}
                type='submit'>
                {message.trim() === '' ? (
          <LikeFilled className='text-3xl pb-2 text-gray-300' />
        ) : (
          <img src={IconSend} alt="" />
        )}
            </button>
        </form>

    )
}

export default SendMessage

