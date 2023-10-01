import {
  collection,
  DocumentData,
  getDocs,
  getFirestore,
  query as queryStore,
  QuerySnapshot,
} from "firebase/firestore";

export const getVisits = async () => {
  const db = getFirestore();
  const collectionStore = collection(db, "visits");

  let visitsList: DocumentData[] = [];

  try {
    const visitsRef = queryStore(collectionStore);
    const snapshot: QuerySnapshot = await getDocs(visitsRef);
    const querySnapshot = snapshot.docs;

    // Iterar sobre los documentos y obtener los datos de cada usuario
    querySnapshot.forEach((userData) => {
      //console.log(userData.data());
      visitsList.push({ uid: userData.id, ...userData.data() });
    });

    return visitsList;
  } catch (error) {
    console.error("Error al obtener la lista de visitas:", error);
  }
};
