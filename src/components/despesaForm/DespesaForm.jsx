import { useState, useEffect } from 'react';
import './DespesaForm.css'
import { getParticipantsProjecte, getParticipantsDespesa } from '../../firebase/firebase';
import { useAuth } from '../../context/authProvider';
import { useParams } from 'react-router-dom';



export default function DespesaForm({ afegirDespesa, idProjecte, idDespesa }) {

  const [concepte, setConcepte] = useState("");
  const [quantia, setQuantia] = useState("");
  const [pagatPer, setPagatPer] = useState("");
  const [participantsProjecte, setParticipantsProjecte] = useState([]);
  const [participantsDespesa, setParticipantsDespesa] = useState([]);
  const { currentUser } = useAuth();

  useEffect(() => {
    const carregarParticipantsProjecte = async () => {
      const participantsProjecte = await getParticipantsProjecte(idProjecte);
      setParticipantsProjecte(participantsProjecte);
    
    };
    const carregarParticipantsDespesa = async () => {
      const participantsDespesa = await getParticipantsDespesa(idProjecte, idDespesa);
      setParticipantsDespesa(participantsDespesa);
    
    };
    carregarParticipantsProjecte();
    if(idDespesa != undefined) {
      carregarParticipantsDespesa();
    }
  }, []);

  const resetForm = () => {
    setConcepte("");
    setQuantia("");
    setPagatPer("");
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    const despesa = {
      concepte: concepte,
      quantia: quantia,
      pagatPer: pagatPer,
      id: Math.floor(Math.random() * 1000),
      participants: participantsDespesa,
    }
    afegirDespesa(despesa);
    resetForm();
  };

  // Afegeix o elimina un participant per a pagar
  const toggleParticipant = (uid) => {
    setParticipantsDespesa(prev =>
      prev.includes(uid)
        ? prev.filter(id => id !== uid)
        : [...prev, uid]
    );
  };

  return (
    <form className='despesa-form' onSubmit={handleSubmit}>
        <label>
            <span>Concepte</span>
            <input type="text" onChange={(e) => setConcepte(e.target.value)} value={concepte} />
        </label>
        <label>
            <span>Quantia</span>
            <input type="text" onChange={(e) => setQuantia(e.target.value)} value={quantia} />
        </label>
        <label>
            <span>Pagat per</span>
              <select onChange={(e) => setPagatPer(e.target.value)} value={pagatPer}>
                <option value="">-- Selecciona qui ha pagat --</option>
                {participantsProjecte.map((usuari) => (
                  <option key={usuari.uid} value={usuari.uid}>
                    {usuari.uid === currentUser.uid ? '(Tu)' : usuari.username}
                  </option>
                ))}
              </select>
        </label>
        <div className="form-group">
          <strong>Dividir entre:</strong>
          <div style={{ marginLeft: '1rem' }}>
            {participantsProjecte.map((usuari) => {
              console.log("Usuari:", usuari.uid);
              return (
                <label key={usuari.uid} className="form-label">
                  <input
                      type="checkbox"
                      className="input-field"
                      checked={participantsDespesa.includes(usuari.uid)}
                      onChange={() => toggleParticipant(usuari.uid)}
                  />
                  {usuari.uid === currentUser.uid ? '(Tu)' :  usuari.username}
                </label>
              )})}
          </div>
        </div>
        <button>Afegir</button>
    </form>
  )
}
