import React, { useRef, useEffect } from "react";
import { auth } from "../firebase";
import { firebaseTimestampToHour } from "../service";
import { calculateTimeDifferenceInMinutes } from "../service";
import Tooltip from "@mui/material/Tooltip";
import { LikeFilled } from "@ant-design/icons";
const Message = ({ message }) => {
  const chatContainerRef = useRef(null);
  useEffect(() => {
    // Scroll the chat container to the bottom when messages change
    chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
  }, [message]);

  return (
    <div className="chat-container" ref={chatContainerRef}>
      {message.uid !== auth.currentUser.uid &&
        message.text === "" &&
        message.isSendLike === true && (
          <div className="flex items-end w-[50%] overflow-hidden pb-2 mb-2">
            <Tooltip title={message.name}>
              {" "}
              <img
                className="w-7 h-7 rounded-full mr-4"
                src={message.photoURL}
                alt="Avatar"
              />{" "}
            </Tooltip>
            <div className="relative  rounded-lg w-auto max-w-[80%] h-auto">
              <Tooltip
                placement="right"
                trigger={["hover", "focus"]}
                rootClose={false}
                title={
                  calculateTimeDifferenceInMinutes(message.createdAt) <= 59 ? (
                    <div className="text-gray-200 text-[8px] text-left">
                      {" "}
                      đã gửi{" "}
                      {calculateTimeDifferenceInMinutes(message.createdAt)} phút
                      trước
                    </div>
                  ) : (
                    <div className="text-gray-200 text-[8px]  text-left">
                      {firebaseTimestampToHour(message.createdAt)}
                    </div>
                  )
                }
              >
                {" "}
                <LikeFilled className="text-3xl  text-gray-100" />{" "}
              </Tooltip>
            </div>
          </div>
        )}

      {message.uid !== auth.currentUser.uid &&
        message.text !== "" &&
        message.isSendLike !== true && (
          <div className="flex items-end mb-2 w-[50%] overflow-hidden  pb-2">
            <Tooltip title={message.name}>
              {" "}
              <img
                className="w-7 h-7 rounded-full mr-4"
                src={message.photoURL}
                alt="Avatar"
              />{" "}
            </Tooltip>
            <div className="relative bg-blue-200 p-2 rounded-lg w-auto max-w-[80%] h-auto">
              <div className="text-gray-800 break-words text-xl max-w-full h-auto cursor-pointer">
                {message.text}
              </div>
              {calculateTimeDifferenceInMinutes(message.createdAt) <= 59 ? (
                <div className="text-gray-500 text-[8px] text-left">
                  {" "}
                  đã gửi {calculateTimeDifferenceInMinutes(
                    message.createdAt
                  )}{" "}
                  phút trước
                </div>
              ) : (
                <div className="text-gray-500 text-[8px]  text-left">
                  {firebaseTimestampToHour(message.createdAt)}
                </div>
              )}
            </div>
          </div>
        )}

      {message.uid === auth.currentUser.uid &&
        message.text === "" &&
        message.isSendLike === true && (
          <div className="flex items-end mb-2 w-[50%] float-right pb-2">
            <div className=" ml-auto rounded-lg w-auto max-w-[80%] h-auto">
              <Tooltip
                placement="left"
                trigger={["hover", "focus"]}
                rootClose={false}
                title={
                  calculateTimeDifferenceInMinutes(message.createdAt) <= 59 ? (
                    <div className="text-gray-200 text-[8px] text-right">
                      {" "}
                      đã gửi{" "}
                      {calculateTimeDifferenceInMinutes(message.createdAt)} phút
                      trước
                    </div>
                  ) : (
                    <div className="text-gray-200 text-[8px] text-right">
                      {firebaseTimestampToHour(message.createdAt)}
                    </div>
                  )
                }
              >
                {" "}
                <LikeFilled className="text-3xl text-gray-100" />{" "}
              </Tooltip>
            </div>
            <Tooltip title={message.name}>
              {" "}
              <img
                className="w-8 h-8 rounded-full ml-4"
                src={message.photoURL}
                alt="Avatar"
              />
            </Tooltip>
          </div>
        )}
      {message.uid === auth.currentUser.uid &&
        message.text !== "" &&
        message.isSendLike !== true && (
          <div className="flex items-end mb-2 w-[50%] float-right pb-2">
            <div className="bg-blue-200  p-2 ml-auto rounded-lg w-auto max-w-[80%] h-auto">
              <div className="text-gray-800 break-words text-xl">
                {message.text}
              </div>

              {calculateTimeDifferenceInMinutes(message.createdAt) <= 59 ? (
                <div className="text-gray-500 text-[8px] text-right">
                  {" "}
                  đã gửi {calculateTimeDifferenceInMinutes(
                    message.createdAt
                  )}{" "}
                  phút trước
                </div>
              ) : (
                <div className="text-gray-500 text-[8px] text-right">
                  {firebaseTimestampToHour(message.createdAt)}
                </div>
              )}
            </div>
            <Tooltip title={message.name}>
              {" "}
              <img
                className="w-8 h-8 rounded-full ml-4"
                src={message.photoURL}
                alt="Avatar"
              />
            </Tooltip>
          </div>
        )}
    </div>
  );
};
export default Message;
