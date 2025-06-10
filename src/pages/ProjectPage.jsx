import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import DespesesLlista from '../components/despesesLlista/DespesesLlista';
import Modal from '../components/modal/Modal';
import DespesaForm from '../components/despesaForm/DespesaForm';

import { onGetDespeses, deleteDespesa, saveDespesa } from '../firebase/firebase';
import { useCollection } from '../hooks/useCollection';

export default function ProjectPage() {
    const { id } = useParams();
    const [mostraModal, setMostraModal] = useState(false);
    const { documents: despeses } = useCollection(id);
    //const [despeses, setDespeses] = useState(null);

    const afegirDespesa = (despesa) => {
        console.log(id);
        saveDespesa(id, despesa).then(() => {
            
            //setDespeses([...despeses, despesa]);
            setMostraModal(false);
        }).catch((error) => {
            console.log("Error afegint la despesa: ", error);
        });
    }

    const eliminarDespesa = (id) => {
        deleteDespesa(id, id).then(() => {
        //setDespeses(despeses.filter((d) => d.id !== id));
        console.log("Despesa eliminada");
        }
        ).catch((error) => {
        console.log("Error eliminant la despesa: ", error);
        });
    };

    const handleTancar = () => {
        setMostraModal(false);
    }

    return (
        <div>
            <h1>Inici</h1>
            {despeses && <DespesesLlista despeses={despeses} eliminarDespesa={eliminarDespesa} />}
            {mostraModal && <Modal handleTancar={handleTancar} >
                <DespesaForm afegirDespesa={afegirDespesa} idProjecte={id}/>
            </Modal>}
            <div>
                <button onClick={() => setMostraModal(true)}>Afegir Despesa</button>
            </div>
        </div>
    )
}
