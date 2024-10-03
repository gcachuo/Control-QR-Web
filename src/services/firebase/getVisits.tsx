import {
  collection,
  DocumentData,
  getDocs,
  getFirestore,
  query as queryStore,
  QuerySnapshot,
    doc,
    getDoc
} from "firebase/firestore";

export const getVisits = async () => {
  const db = getFirestore();
  const collectionStore = collection(db, "visits");

  let visitsList: DocumentData[] = [];

  try {
    const snapshot = await getDocs(collectionStore);
    const querySnapshot = snapshot.docs;

    // Iterar sobre las visitas y obtener los datos de cada usuario
    for (const visitDoc of querySnapshot) {
      const visitData = visitDoc.data();

      // Obtener el documento del usuario (creatorUid) de la colección "users"
      const userDocRef = doc(db, "users", visitData.creatorUid);
      const userDoc = await getDoc(userDocRef);

      let creatorName = "Unknown";
      let creatorAddress = "Unknown";
      if (userDoc.exists()) {
        let data = userDoc.data();
        creatorName = data.name;
        creatorAddress = data.address;
      }

      // Combinar los datos de la visita con los datos del usuario
      visitsList.push({
        uid: visitDoc.id,
        type: visitData.type,
        guestName: visitData.guestName,
        creatorUid: visitData.creatorUid,
        creatorName,
        creatorAddress,
        createdTime: visitData.createdTime,
      });
    }

    return visitsList;
  } catch (error) {
    console.error("Error al obtener la lista de visitas:", error);
  }
};
