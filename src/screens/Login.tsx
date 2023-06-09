import React, { useState } from "react";
import {
  AuthError,
  createUserWithEmailAndPassword,
  getAuth,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
} from "firebase/auth";
import toastr from "toastr";
import {
  Box as View,
  Button,
  InputLabel as Text,
  TextField as TextInput,
} from "@mui/material";
import { useAuth } from "../hooks/useAuth";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string>(null as unknown as string);
  const { user } = useAuth();
  const isLoggedIn = !!user;

  const handleSignUp = () => {
    createUserWithEmailAndPassword(getAuth(), email, password).catch((error) =>
      handleErrors(error)
    );
  };

  const handleLogin = () => {
    setError("");

    if (!email) {
      return;
    }

    signInWithEmailAndPassword(getAuth(), email, password).catch(
      (error: AuthError) => handleErrors(error)
    );
  };

  const handleResetPassword = () => {
    setError("");

    sendPasswordResetEmail(getAuth(), email)
      .then(() => {
        toastr.info(
          "Revisa tu correo electrónico para restablecer tu contraseña.",
          "Correo electrónico enviado"
        );
      })
      .catch((error) => handleErrors(error));
  };

  const handleErrors = (error: AuthError) => {
    switch (error.code) {
      case "auth/missing-email":
        setError("Por favor ingrese su correo.");
        break;
      case "auth/too-many-requests":
        setError(
          "El acceso a esta cuenta ha sido temporalmente desactivado debido a múltiples intentos fallidos de inicio de sesión. Puede restaurarlo de inmediato restableciendo su contraseña o puede intentarlo de nuevo más tarde."
        );
        break;
      case "auth/invalid-email":
        setError("El correo no esta en el formato correcto");
        break;
      case "auth/wrong-password":
        setError("Los datos ingresados no son correctos");
        break;
      case "auth/email-already-in-use":
        setError(
          "Esta cuenta ya esta registrada, intente iniciar sesión con su contraseña."
        );
        break;
      case "auth/weak-password":
        setError("La contraseña debe ser de al menos 6 caracteres");
        break;
      case "auth/internal-error":
      default:
        if (!password) {
          setError("Por favor ingrese su contraseña");
          return;
        }
        setError(error.message);
        break;
    }
  };

  return (
    <View sx={{ marginHorizontal: 60 }}>
      {isLoggedIn ? (
        <View style={{ alignItems: "center" }}></View>
      ) : (
        <>
          <TextInput
            placeholder="Email"
            value={email}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              setEmail(event.target.value)
            }
            style={styles.TextInput}
            autoCapitalize="none"
          />
          <TextInput
            placeholder="Password"
            value={password}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              setPassword(event.target.value)
            }
            style={styles.TextInput}
          />
          {error && <Text style={{ color: "red" }}>{error}</Text>}
          <Button onClick={handleLogin}>Inicia Sesión</Button>
          <Button onClick={handleResetPassword}>Olvide mi contraseña</Button>
          {false && <Button onClick={handleSignUp}>Registrate</Button>}
        </>
      )}
    </View>
  );
}

const styles = {
  TextInput: { marginBottom: 15 },
};
