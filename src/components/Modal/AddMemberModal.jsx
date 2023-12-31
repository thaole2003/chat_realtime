import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import { getDoc } from "firebase/firestore";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase";

import { RoomContext } from "../../RoomContext";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
const CenteredWrapper = styled.div`
  z-index: 999;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  padding: 20px;
  min-width: 200px;
  width: auto;
  background-color: #f0f0f0;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;
const Button = styled.button`
  background-color: #4caf50;
  color: white;
  padding: 8px 16px;
  border: none;
  cursor: pointer;

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;
const CheckBoxList = styled.div`
  display: flex;
  flex-direction: column;
`;

const CheckboxItem = styled.div`
  margin-bottom: 8px;
  display: flex;
`;

const Checkbox = styled.input`
  margin-right: 8px;
`;

const AddMemberModal = ({ handleButtonClick }) => {
  const roomContext = useContext(RoomContext);
  const [selectedUsers, setSelectedUsers] = useState([]);

  const [users] = useState([]);
  const [roomData, setRoomData] = useState(null);

  const handleCheckboxChange = (userUid, checked) => {
    if (checked) {
      setSelectedUsers([...selectedUsers, userUid]);
    } else {
      setSelectedUsers(selectedUsers.filter((uid) => uid !== userUid));
    }
  };

  useEffect(() => {
    const fetchRoomData = async () => {
      try {
        const roomRef = doc(db, "rooms", roomContext.roomid);
        const roomSnapshot = await getDoc(roomRef);

        if (roomSnapshot.exists()) {
          setRoomData(roomSnapshot.data());
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchRoomData();
  }, [roomContext.roomid]);
  const handleSaveUsersToRoom = async () => {
    try {
      const roomRef = doc(db, "rooms", roomContext.roomid);
      const roomSnapshot = await getDoc(roomRef);

      if (roomSnapshot.exists()) {
        const roomData = roomSnapshot.data();
        const updatedUsers = [...roomData.users, ...selectedUsers];

        await updateDoc(roomRef, { users: updatedUsers });
        setSelectedUsers([]);
        handleButtonClick();

        Swal.fire("Đã mời thành công!", "", "success");
      } else {
        toast.success("Có lỗi xảy ra. Vui lòng thử lại sau.", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
    } catch (error) {
      toast.success("Có lỗi xảy ra. Vui lòng thử lại sau.", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  return (
    <CenteredWrapper>
      <div className="flex justify-between ">
        <h3 className="text-black">Mời thành viên mới</h3>
        <div
          className="cursor-pointer ml-auto text-black "
          onClick={handleButtonClick}
        >
          &otimes;
        </div>
      </div>
      <CheckBoxList>
        {users.map(
          (user) =>
            !roomData.users.includes(user.uid) && (
              <CheckboxItem key={user.uid}>
                <Checkbox
                  type="checkbox"
                  checked={selectedUsers.includes(user.uid)}
                  onChange={(e) =>
                    handleCheckboxChange(user.uid, e.target.checked)
                  }
                />
                <span className="text-black">{user.displayName}</span>
              </CheckboxItem>
            )
        )}
      </CheckBoxList>
      <Button
        onClick={handleSaveUsersToRoom}
        disabled={selectedUsers.length === 0}
      >
        Mời thành viên
      </Button>
    </CenteredWrapper>
  );
};

export default AddMemberModal;
