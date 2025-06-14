import { useState, useEffect } from "react"
import { onGetDespeses } from "../firebase/firebase"
import { QuerySnapshot } from "firebase/firestore";

export const useCollection = (projectId)=>{

    const [documents, setDocuments] = useState(null);

    useEffect(()=>{
        const unsubscribe = onGetDespeses(projectId, (querySnapshot) => {
            let resultats = [];
            querySnapshot.docs.forEach((doc)=>{
                resultats.push({...doc.data(), id:doc.id});
            });
            setDocuments(resultats);
        });
        return ()=>unsubscribe();
    }, [projectId]);

    return {documents};
}