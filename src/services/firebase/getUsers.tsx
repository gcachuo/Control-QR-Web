import {
  collection, DocumentData, getDocs, getFirestore, query as queryStore, QuerySnapshot,
} from "firebase/firestore";

// Obtener la lista de usuarios
export const getUsers = async () => {
  const db = getFirestore();
  const collectionStore = collection(db, "users");
  let userList: DocumentData[] = [];

  try {
    const usersRef = queryStore(collectionStore);
    const snapshot: QuerySnapshot = await getDocs(usersRef);
    const querySnapshot = snapshot.docs;

    // Iterar sobre los documentos y obtener los datos de cada usuario
    querySnapshot.forEach((userData) => {
      //console.log(userData.data());
      userList.push({ uid: userData.id, ...userData.data() });
    });

    return userList;
  } catch (error) {
    console.error("Error al obtener la lista de usuarios:", error);
  }
};
