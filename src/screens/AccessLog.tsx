import React, { useEffect } from "react";
import Drawer from "../components/Drawer";
import { getVisits } from "../services/firebase/getVisits";

function AccessLogScreen() {
  useEffect(() => {
    getVisits().then();
  });

  return (
    <div>
      <Drawer title={"Autorizaciones"} />
    </div>
  );
}

export default AccessLogScreen;
