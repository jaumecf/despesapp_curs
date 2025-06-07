import { firebaseConfig } from "./config"

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app"
import { getFirestore, addDoc, collection, setDoc, getDocs, getDoc, onSnapshot, doc, deleteDoc, serverTimestamp } from "firebase/firestore"
import { getAuth} from 'firebase/auth'; 

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export const auth = getAuth(app);


export const onGetDespeses = (projecteId, callback) =>
  onSnapshot(collection(db, "projectes", projecteId, "despeses"), callback);

export const onGetDespesa = (id, callback) =>
  onSnapshot(doc(db, "projectes", projecteId, "despeses", id), callback);

export const saveDespesa = async (projecteId, despesa) => {
  //console.log(projecteId);
  const docRef = await addDoc(collection(db, "projectes", projecteId, "despeses"), despesa);
  return docRef.id;   
}

export const deleteDespesa = async (projecteId, id) => {
  deleteDoc(doc(db, "projectes", projecteId, "despeses", id));
}


// PROJECTES

export const getProjectes = () =>
  getDocs(collection(db, "projectes"));

export const getProjecte = (id) =>
  getDoc(doc(db, "projectes", id));

export const getParticipants = async (projectId) => {
  const docRef = doc(db, "projectes", projectId);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    const data = docSnap.data();
    const participantPromises = data.participants.map(uid =>  getUsuari(uid));
    const participants = await Promise.all(participantPromises);
    return participants;
  } else {
    return [];
  }
}

export const saveProjecte = async (nom, userId, participants) => {
  const docRef = await addDoc(collection(db, "projectes"),{
        nom,
        creatPer: userId,
        createdAt: serverTimestamp(),
        participants: participants,
      });
  return docRef.id;
}

export const updateProjecte = async (projectId, nom, participants) => {
  const ref = doc(db, "projectes", projectId);
  await setDoc(ref, {
    nom,
    participants,
  }, { merge: true });
  return ref.id;
}

export const deleteProjecte = async (projectId) => {
  // Elimina totes les despeses relacionades
  const despesesSnap = await getDocs(collection(db, "projectes", projectId, "despeses"));
  for (const despesaDoc of despesesSnap.docs) {
      await deleteDespesa(despesaDoc.ref);
  }
  // Elimina el projecte
  await deleteDoc(doc(db, "projectes", projectId));
}


// USUARIS

export const saveUsuari = async (email, name, userId) => {
  const docRef = await setDoc(doc(db, "usuaris", userId), {
  email: email,
  username: name,
  uid: userId,
  }, { merge: true });
  return docRef;
}

export const getUsuaris = () =>
  getDocs(collection(db, "usuaris"));

export const getUsuari = async (userId) => {
  const docSnap = await getDoc(doc(db, "usuaris", userId));
  if (docSnap.exists()) {
    return { uid: userId, ...docSnap.data() };
  } else {
    console.warn(`Usuari amb ID ${userId} no trobat.`);
    return null;
  }
};