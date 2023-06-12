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

function UsersScreen() {
  const [users, setUsers] = useState([]);

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
      <FloatingButton />
    </div>
  );
}

export default UsersScreen;
