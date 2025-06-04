import { firebaseConfig } from "./config"

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app"
import { getFirestore, addDoc, collection, setDoc, getDocs, onSnapshot, doc, deleteDoc } from "firebase/firestore"
import { getAuth} from 'firebase/auth'; 

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export const auth = getAuth(app);

export const saveDespesa = async (despesa) => {
  console.log(despesa);
  const docRef = await addDoc(collection(db, "despeses"), despesa);

  return docRef.id;   
}

export const getDespeses = () => 
  getDocs(collection(db, "despeses"));

export const onGetCollection = (collectionName, callback) =>
  onSnapshot(collection(db, collectionName), callback);

export const onGetDespesa = (id, callback) =>
  onSnapshot(doc(db, "despeses", id), callback);

export const deleteDespesa = async (id) => {
  deleteDoc(doc(db, "despeses", id));
}

export const getProjectes = () =>
  getDocs(collection(db, "projectes"));

export const saveProjecte = async (projecte) => {
  const docRef = await addDoc(collection(db, "projectes"), projecte);
  return docRef.id;
}

export const deleteProjecte = async (id) => {
  // Elimina totes les despeses relacionades
  const despesesSnap = await getDocs(collection(db, "projectes", projectId, "despeses"));
  for (const despesaDoc of despesesSnap.docs) {
      await deleteDespesa(despesaDoc.ref);
  }

  // Elimina el projecte
  await deleteDoc(doc(db, "projectes", projectId));
}
export const getProjecte = (id) =>
  getDocs(doc(db, "projectes", id));