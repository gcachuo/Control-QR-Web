import React, { useState } from "react";
import { Box, Button, Divider, Modal, TextField } from "@mui/material";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import { FirebaseError } from "firebase/app";

const AddUserModal = ({
  open,
  handleClose,
}: {
  open: boolean;
  handleClose: any;
}) => {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleCreateUser = async () => {
    try {
      const auth = getAuth();
      await createUserWithEmailAndPassword(auth, email, password);

      // Aquí puedes guardar el resto de los campos en Firebase Firestore u otra base de datos

      handleClose();
    } catch (error) {
      if (error instanceof FirebaseError) {
        console.error("Error al crear el usuario:", error.toString());
      } else {
        console.error(error);
      }
    }
  };

  return (
    <>
      <Modal open={open} onClose={handleClose}>
        <Box
          style={{
            backgroundColor: "white",
            marginLeft: 30,
            marginRight: 30,
            padding: 30,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <h2>Agregar Usuario</h2>
          <TextField
            label="Nombre"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            label="Dirección"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
          <TextField
            label="Teléfono"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          <Divider style={{ margin: 20 }} />
          <TextField
            label="Correo Electrónico"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            label="Contraseña"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Box
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "right",
              marginTop: 30,
            }}
          >
            <Button onClick={handleClose}>Cerrar</Button>
            <Button variant={"contained"} onClick={handleCreateUser}>
              Crear Usuario
            </Button>
          </Box>
        </Box>
      </Modal>
    </>
  );
};

export default AddUserModal;
