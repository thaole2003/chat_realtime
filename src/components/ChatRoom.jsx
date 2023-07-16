import React, { useState,useContext } from 'react';
import styled from 'styled-components';
import {auth, db} from '../firebase'
import {addDoc, collection, serverTimestamp} from 'firebase/firestore'
import { MyContext } from './Chat';
// Styled Components
const Container = styled.div`
z-index: 999;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #f0f0f0;
  padding: 20px;
  width: 400px;
  h2{
    text-align: center;
    text-transform: uppercase;
    font-weight: 800;
  }
`;

const FormGroup = styled.div`
  margin-bottom: 10px;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 5px;
`;

const Input = styled.input`
  width: 100%;
  padding: 5px;
  border: 1px solid #ccc;
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

const CreateChatRoom = () => {
  const {uid} = auth.currentUser
  let [name, setName] = useState('');
  let [description, setDescription] = useState('');
  const [users, setUsers] = useState([]);

  // Xử lý sự kiện khi người dùng nhấn nút "Create"
  const handleCreate = async () => {
    try {
      await addDoc(collection(db, 'rooms'), {
        name: name,
        description: description,
        users: [uid],
        timestamp: serverTimestamp()
      });
      // console.log('Đã tạo một phòng');
      setName('');
      setDescription('');
    } catch (error) {
      console.error('Error creating chat room: ', error);
      // Xử lý logic khi có lỗi xảy ra trong quá trình tạo phòng chat
    }
    // console.log(name);
    // console.log(description);
    // console.log(inviteUsers);
    // Thực hiện tạo phòng chat và lưu thông tin vào cơ sở dữ liệu
    // ...
  };

  // Xử lý sự kiện khi người dùng nhập vào ô "Mời người dùng"


  return (
    <Container>
      <h2 >Create Chat Room</h2>
      <FormGroup>
        <Label>Name:</Label>
        <Input
          type="text"
          value={name}
          onChange={(event) => setName(event.target.value)}
          required
        />
      </FormGroup>
      <FormGroup>
        <Label>Description:</Label>
        <Input
          type="text"
          value={description}
          onChange={(event) => setDescription(event.target.value)}
        />
      </FormGroup>
   
      <FormGroup>
        <Button onClick={handleCreate} disabled={!name}>
          Create
        </Button>
      </FormGroup>
    </Container>
  );
};

export default CreateChatRoom;
