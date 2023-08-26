import {
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import Drawer from "../components/Drawer";
import { getUsers } from "../services/firebase/getUsers";
import FloatingButton from "../components/FloatingButton";
import AddUserModal from "../components/AddUserModal";

function UsersScreen() {
  const [users, setUsers] = useState([]);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    getUsers()
      .then((result) => {
        const userList = result!.map((user) => ({
          uid: user.uid,
          displayName: user.name,
          photoUrl: user.photoURL,
          address: user.address,
          phoneNumber: user.phoneNumber,
        }));
        // @ts-ignore
        setUsers(userList);
      })
      .catch((error: any) => {
        console.log("Error fetching user list:", error);
      });
  }, []);

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div>
      <Drawer title={"Usuarios"} />
      <List>
        {users &&
          users.map(
            (item: {
              displayName: string;
              photoUrl: string;
              uid: string;
              address: string;
              phoneNumber: string;
            }) => (
              <ListItem key={item.uid}>
                <ListItemButton>
                  <ListItemAvatar>
                    <Avatar alt={item.displayName} src={item.photoUrl} />
                  </ListItemAvatar>
                  <ListItemText
                    primary={item.displayName}
                    secondary={`${item.address} - ${item.phoneNumber}`}
                  />
                </ListItemButton>
              </ListItem>
            )
          )}
      </List>
      <AddUserModal open={showModal} handleClose={handleCloseModal} />
      <FloatingButton onClick={handleOpenModal} />
    </div>
  );
}

export default UsersScreen;
