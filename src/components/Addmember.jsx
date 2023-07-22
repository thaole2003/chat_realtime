import React, { useState,useEffect ,useContext} from 'react';
import styled from 'styled-components';
import { collection, query, where, getDoc,onSnapshot } from 'firebase/firestore';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase';
import {useAuthState} from 'react-firebase-hooks/auth'
import { auth } from '../firebase';
import { RoomContext } from '../RoomContext';
const CenteredWrapper = styled.div`
z-index: 12;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
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
const Title = styled.h1`
  font-size: 24px;
  margin-bottom: 16px;
`;

const Input = styled.input`
  padding: 8px;
  font-size: 16px;
  margin-bottom: 16px;
`;

const CheckboxList = styled.div`
  display: flex;
  flex-direction: column;
  /* align-items: center; */
`;

const CheckboxItem = styled.div`
  margin-bottom: 8px;
  display: flex;
  /* align-items: center; */
`;

const Checkbox = styled.input`
  margin-right: 8px;
  /* width: 8px; */
`;

const Addmember = () => {
const roomContext = useContext(RoomContext);
    const [selectedUsers, setSelectedUsers] = useState([]);
    const handleCheckboxChange = (userUid, checked) => {
      if (checked) {
        setSelectedUsers([...selectedUsers, userUid]);
      } else {
        setSelectedUsers(selectedUsers.filter((uid) => uid !== userUid));
      }
    };
    console.log(selectedUsers);
    const [myU] = useAuthState(auth)
    const [searchQuery, setSearchQuery] = useState('');
    const [users, setUsers] = useState([]);
     console.log(myU.uid);
    // const handleSearchQueryChange = (event) => {
    //     setSearchQuery(event.target.value);
    //     console.log(searchQuery);
    //   };
      const [roomData, setRoomData] = useState(null);
      useEffect(() => {
        const fetchRoomData = async () => {
          try {
            const roomRef = doc(db, 'rooms', roomContext.roomid);
            const roomSnapshot = await getDoc(roomRef);
    
            if (roomSnapshot.exists()) {
              setRoomData(roomSnapshot.data());
            } else {
              console.log('Room không tồn tại.');
            }
          } catch (error) {
            console.error('Lỗi khi lấy dữ liệu của room:', error);
          }
        };
    
        fetchRoomData();
      }, [roomContext.roomid]);
      console.log(roomData);
    useEffect(() => {
        if (myU.uid) {
          const q = query(
            collection(db, 'users'),
            where('uid', '!=', myU.uid)
          );
    
          const unsubscribe = onSnapshot(q, (querySnapshot) => {
            let userList = [];
            querySnapshot.forEach((doc) => {
                if(doc.id !== myU.uid){
                    userList.push({ ...doc.data(), id: doc.id });
            }
            });
            setUsers(userList);
          });
    
          return () => {
            unsubscribe();
          };
        }
      }, [searchQuery]);
  // console.log(users);

    const handleSaveUsersToRoom = async () => {
      try {
        const roomRef = doc(db, 'rooms', roomContext.roomid);
        const roomSnapshot = await getDoc(roomRef);
    
        if (roomSnapshot.exists()) {
          const roomData = roomSnapshot.data();
          const updatedUsers = [...roomData.users, ...selectedUsers];
          
          await updateDoc(roomRef, { users: updatedUsers });
          setSelectedUsers([]);
          console.log('Đã cập nhật thành công users trong room.');
          alert('Thêm thành công người dùng vào nhóm')
        } else {
          console.log('Room không tồn tại.');
        }
      } catch (error) {
        console.error('Lỗi khi cập nhật users trong room:', error);
      }
    };

  

  return (
    <CenteredWrapper>
      <Title>Mời thành viên</Title>
      {/* <Input
        type="text"
        value={searchQuery}
        onChange={handleSearchQueryChange}
        placeholder="Nhập dữ liệu..."
      /> */}
 <CheckboxList>
        {users.map((user) => (
         !roomData.users.includes(user.uid) && 
         <CheckboxItem key={user.uid}>
          <Checkbox
            type="checkbox"
            checked={selectedUsers.includes(user.uid)}
            onChange={(e) => handleCheckboxChange(user.uid, e.target.checked)}
          />
          <span className='text-black'>{user.displayName}</span>
        </CheckboxItem>
        ))}
      </CheckboxList>
      <Button onClick={handleSaveUsersToRoom}  disabled={selectedUsers.length === 0}>Lưu thông tin</Button>
    </CenteredWrapper>
  );
};

export default Addmember;
