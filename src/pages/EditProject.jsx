import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getProjecte, updateProjecte, getUsuaris } from '../firebase/firebase';

export default function EditProject() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [nom, setNom] = useState('');
  const [participants, setParticipants] = useState([]);
  const [usuaris, setUsuaris] = useState([]);

  useEffect(() => {
    const carregarProjecte = async () => {
      const snap = await getProjecte(id);
      if (snap.exists()) {
        const data = snap.data();
        setNom(data.nom);
        setParticipants(data.participants || []);
      }

      const snapshot = await getUsuaris();
      //const tots = usuarisSnap.docs.map(doc => ({ uid: doc.id, ...doc.data() }));
      setUsuaris(snapshot.docs.map(doc => ({ uid: doc.id, ...doc.data() })));
      console.log("Usuaris:", usuaris);
    };

    carregarProjecte();
  }, [id]);

  const toggleParticipant = (uid) => {
    setParticipants(prev =>
      prev.includes(uid)
        ? prev.filter(p => p !== uid)
        : [...prev, uid]
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    updateProjecte(id, nom, participants);
    navigate('/');
  };

return (
    <div className="register-container">
        <form className="register-form" onSubmit={handleSubmit}>
            <h1 className="form-title">Edita projecte</h1>
            <div className="form-group">
                <label className="form-label">
                    Nom del projecte:
                    <input
                        type="text"
                        className="form-control"
                        value={nom}
                        onChange={e => setNom(e.target.value)}
                        required
                    />
                </label>
            </div>
            <div className="form-group">
                <strong>Participants:</strong>
                {usuaris.map(u => (
                    <label
                    key={u.uid}
                    className="form-label"
                    style={{ display: 'block' }}
                    >
                    <input
                        type="checkbox"
                        checked={participants.includes(u.uid)}
                        onChange={() => toggleParticipant(u.uid)}
                        style={{ margin: 0 }}
                    />
                    {u.username}
                    </label>
                ))}
            </div>
            <button type="submit" className="submit-button">Actualitzar</button>
        </form>
    </div>
);
}
