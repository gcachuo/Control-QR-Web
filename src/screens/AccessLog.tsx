import React, {useEffect, useState} from "react";
import Drawer from "../components/Drawer";
import { getVisits } from "../services/firebase/getVisits";
import {Avatar, List, ListItem, ListItemAvatar, ListItemButton, ListItemText} from "@mui/material";

interface Visit {
    uid: string;
    type: string;
    guestName: string;
    creatorUid: string;
    creatorName: string;
    creatorAddress: string;
    createdTime: number;
}

function AccessLogScreen() {
  const [visits, setVisits] = useState([]);

  useEffect(() => {
    getVisits().then((result) => {
      const visitList = result!.map((visit) => ({
        uid: visit.uid,
          type: visit.type,
        guestName: visit.guestName,
        creatorUid: visit.creatorUid,
        creatorName: visit.creatorName,
        creatorAddress: visit.creatorAddress,
        createdTime: visit.createdTime,
      }));
      // @ts-ignore
      setVisits(visitList);
    })
        .catch((error: any) => {
          console.log("Error fetching user list:", error);
        });
  },[]);

  return (
    <div>
      <Drawer title={"Autorizaciones"} />
      <List>
        {visits &&
            visits.sort((a: Visit,b: Visit)=>b.createdTime-a.createdTime).map(
                (item: Visit) => (
                    <ListItem key={item.uid}>
                      <ListItemButton>
                        <ListItemText
                            primary={item.guestName}
                            secondary={
                              `${(new Date(item.createdTime)).toISOString().split('T')[0]} - ${item.creatorName} - ${item.creatorAddress}`
                            }
                        />
                      </ListItemButton>
                    </ListItem>
                )
            )}
      </List>
    </div>
  );
}

export default AccessLogScreen;
