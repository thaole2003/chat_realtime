import React, { useState, useContext } from "react";
import { auth, db } from "../firebase";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { RoomContext } from "../RoomContext";
import { LikeFilled, SendOutlined } from "@ant-design/icons";

const style = {
  form: `w-full h-full items-center  flex text-xl gap-5 pb-4 `,
  input: `w-[93%]  p-5 h-full bg-transparent md:bg-white rounded-xl  outline-none border-none text-lg text-gray-800`,
};

const SendMessage = () => {
  const context = useContext(RoomContext);
  const [message, setMessage] = useState("");
  const sendMessage = async (e) => {
    e.preventDefault();
    const { uid, displayName, photoURL } = auth.currentUser;
    if (message.trim() === "") {
      await addDoc(collection(db, "messages"), {
        text: message,
        name: displayName,
        uid,
        isSendLike: true,
        photoURL: photoURL,
        room_id: context.roomid,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });
      return;
    }
    await addDoc(collection(db, "messages"), {
      text: message,
      name: displayName,
      uid,
      photoURL: photoURL,
      isSendLike: false,
      room_id: context.roomid,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });
    setMessage("");
  };

  return (
    <form onSubmit={sendMessage} className={style.form}>
      <input
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        className={style.input}
        type="text"
        placeholder="Nhập lời nhắn ..."
      />
      <button
        className={
          "h-full items-center pb-2 pr-3 flex justify-center justify-items-center bg-transparent rounded-xlhover:scale-110 transition duration-300 ease-in-out"
        }
        type="submit"
      >
        {message.trim() === "" ? (
          <LikeFilled className="text-3xl text-blue-500" />
        ) : (
          <SendOutlined className="text-3xl text-blue-500" />
        )}
      </button>
    </form>
  );
};

export default SendMessage;
