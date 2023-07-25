import React, { useState } from "react";
import styled from "styled-components";
import { auth, db } from "../../firebase";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import iconCancel from "../../img/iconCancel.png";
import Swal from "sweetalert2";
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
  border-radius: 20px;
  h2 {
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
  border-radius: 10px;
`;

const Button = styled.button`
  background-color: #4caf50;
  color: white;
  padding: 8px 16px;
  border: none;
  cursor: pointer;
  border-radius: 20px;
  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;

const CreateChatRoom = ({ handleButtonClick }) => {
  const { uid } = auth.currentUser;
  let [name, setName] = useState("");
  let [description, setDescription] = useState("");
  let [descriptionError, setDescriptionError] = useState("");
  let [descriptionSucces, setDescriptionSucces] = useState(true);
  const handleDescriptionChange = (event) => {
    const value = event.target.value;
    if (value.length <= 100) {
      setDescription(value);
      setDescriptionError("");
      setDescriptionSucces(true);
    } else {
      setDescriptionError("Mô tả không được dài quá 100 kí tự.");
      setDescriptionSucces(false);
    }
  };
  const handleCreate = async () => {
    try {
      await addDoc(collection(db, "rooms"), {
        name: name,
        description: description,
        users: [uid],
        timestamp: serverTimestamp(),
      });
      setName("");
      setDescription("");
      handleButtonClick();
      Swal.fire("Đã tạo thành công!", "", "success");
    } catch (error) {
      console.error("Error creating chat room: ", error);
    }
  };
  const handleCloseModal = async () => {
    handleButtonClick();
  };
  return (
    <Container>
      <div className="flex justify-between">
        <h2>Tạo phòng chat</h2>
        <div onClick={handleCloseModal} className="cursor-pointer">
          <img className="w-5 h-5" src={iconCancel} alt="" />
        </div>
      </div>
      <FormGroup>
        <Label>Tên:</Label>
        <Input
          type="text"
          value={name}
          onChange={(event) => setName(event.target.value)}
          required
        />
      </FormGroup>
      <FormGroup>
        <Label>Mô tả:</Label>
        <Input
          type="text"
          value={description}
          onChange={handleDescriptionChange}
        />
        {descriptionError && <p className="text-red-500">{descriptionError}</p>}
      </FormGroup>
      <FormGroup>
        <Button onClick={handleCreate} disabled={!name || !descriptionSucces}>
          Tạo
        </Button>
      </FormGroup>
    </Container>
  );
};

export default CreateChatRoom;
