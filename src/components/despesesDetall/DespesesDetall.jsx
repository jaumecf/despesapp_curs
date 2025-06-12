import React from 'react'
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'
import { onGetDespesa, getParticipantsProjecte, getParticipantsDespesa } from '../../firebase/firebase';


export default function DespesesDetall() {

    const { idProjecte, idDespesa } = useParams();
    const [despesa, setDespesa] = useState(null);
    const [participantsProjecte, setParticipantsProjecte] = useState([]);
    const [participantsDespesa, setParticipantsDespesa] = useState([]);

    useEffect(()=> {
        const carregarParticipantsProjecte = async () => {
            const participantsProjecte = await getParticipantsProjecte(idProjecte);
            setParticipantsProjecte(participantsProjecte);
        
        };
        const carregarParticipantsDespesa = async () => {
            const participantsDespesa = await getParticipantsDespesa(idProjecte, idDespesa);
            setParticipantsDespesa(participantsDespesa);
        
        };
        const unsubscribe = onGetDespesa(idProjecte, idDespesa, (docSnap)=> {
            if(docSnap.exists()) {
                setDespesa({...docSnap.data(), id:docSnap.id})
                console.log("Despesa carregada: ", docSnap.data());
            } else {
                setDespesa(null);
            }
        });
        carregarParticipantsProjecte();
        carregarParticipantsDespesa();
        return ()=> unsubscribe();
    }, [idProjecte, idDespesa]);

    function getUsername(uid) {
        return participantsProjecte.find(d => d.uid === uid)?.username ?? 'Desconegut';
    }

    if(!despesa) return <p>Despesa no trobada...</p>

    return (
        <div>
            <h2>Detall de la despesa</h2>
            <p><strong>Concepte:</strong>{despesa.concepte}</p>
            <p><strong>Quantia:</strong>{despesa.quantia}€</p>
            <p><strong>Pagar per:</strong>{getUsername(despesa.pagatPer)}</p>
            <p>Dividir entre:</p>
            <ul>
                {participantsDespesa.map((participant) => (
                    <li key={participant.uid}>{participant.username}</li>
                ))}
            </ul>
        </div>
    )
}
