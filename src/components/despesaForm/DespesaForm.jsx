import { useState, useEffect } from 'react';
import './DespesaForm.css'
import { getParticipants } from '../../firebase/firebase';
import { useAuth } from '../../context/authProvider';
import { useParams } from 'react-router-dom';



export default function DespesaForm({ afegirDespesa }) {

  const [concepte, setConcepte] = useState("");
  const [quantia, setQuantia] = useState("");
  const [pagatPer, setPagatPer] = useState("");
  const [participants, setParticipants] = useState([]);
  const { currentUser } = useAuth();
  const { id } = useParams();

  useEffect(() => {
    const carregarParticipants = async () => {
      const usuarisList = await getParticipants(id);
      console.log("Participants:", usuarisList);
      setParticipants(usuarisList);
    
    };
    carregarParticipants();
  }, [currentUser]);

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
      id: Math.floor(Math.random() * 1000)
    }
    afegirDespesa(despesa);
    resetForm();
  };

  // Afegeix o elimina un participant per a pagar
  const toggleParticipant = (uid) => {
    if (uid === currentUser.uid) return; // no permet desmarcar-se a si mateix
    setParticipants(prev =>
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
                {participants.map((usuari) => (
                  <option key={usuari.uid} value={usuari.uid}>
                    {usuari.uid === currentUser.uid ? '(Tu)' : usuari.username}
                  </option>
                ))}
              </select>
        </label>
        <div className="form-group">
                <strong>Dividir entre:</strong>
                <div style={{ marginLeft: '1rem' }}>
                    {participants.map((usuari) => {
                        console.log("Usuari:", usuari.uid);
                        return (
                        <label key={usuari.uid} style={{ display: 'block' }}>
                            <input
                                type="checkbox"
                                className="input-field"
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
