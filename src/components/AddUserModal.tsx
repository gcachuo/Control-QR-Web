import React, { useState } from "react";
import {
  Box,
  Button,
  Divider,
  InputLabel,
  Modal,
  TextField,
} from "@mui/material";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import { doc, DocumentData, getFirestore, setDoc } from "firebase/firestore";
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
  const [phoneNumber, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorText, setErrorText] = useState("");

  const handleCreateUser = async () => {
    try {
      setErrorText("");

      if (!name || !address || !phoneNumber) {
        setErrorText("Error al crear el usuario: " + "Llene todos los datos.");
        return;
      }

      const auth = getAuth();
      const db = getFirestore();

      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      const collectionRef = doc(db, "users", userCredential.user.uid);

      await setDoc(collectionRef, {
        address,
        name,
        phoneNumber,
      } as DocumentData);

      handleClose();
    } catch (error) {
      if (error instanceof FirebaseError) {
        const errorText =
          {
            "auth/invalid-email": "Correo Invalido.",
            "auth/missing-password": "Contraseña Invalida.",
            "auth/email-already-in-use": "El correo ya esta en uso.",
          }[error.code] ?? "Error desconocido.";
        console.error("Error al crear el usuario:", error.toString());
        setErrorText("Error al crear el usuario: " + errorText);
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
            value={phoneNumber}
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
          <InputLabel style={{ color: "red" }} color={"error"}>
            {errorText}
          </InputLabel>
        </Box>
      </Modal>
    </>
  );
};

export default AddUserModal;
