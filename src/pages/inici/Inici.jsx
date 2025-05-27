import { useState, useEffect } from 'react';

import DespesesLlista from '../../components/despesesLlista/DespesesLlista';
import Modal from '../../components/modal/Modal';
import DespesaForm from '../../components/despesaForm/DespesaForm';

import { onGetCollection, deleteDespesa, saveDespesa } from '../../firebase/firebase';
import { useCollection } from '../../hooks/useCollection';

export default function Inici() {
    const [mostraModal, setMostraModal] = useState(false);
    const { documents: despeses } = useCollection('despeses');
    //const [despeses, setDespeses] = useState(null);

    useEffect(() => {
        const unsubscribe = onGetCollection("despeses", (querySnapshot) => {
            let resultats = [];

            querySnapshot.forEach((doc) => {
                resultats.push({ ...doc.data(), id: doc.id });
            });

            console.log(resultats);
            //setDespeses(resultats);
        });
        return () => unsubscribe();
    }, []);

    const afegirDespesa = (despesa) => {
        saveDespesa(despesa).then(() => {
            //setDespeses([...despeses, despesa]);
            setModal(false);
        }).catch((error) => {
            console.log("Error afegint la despesa: ", error);
        });
    }

    const eliminarDespesa = (id) => {
        deleteDespesa(id).then(() => {
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
                <DespesaForm afegirDespesa={afegirDespesa} />
            </Modal>}
            <div>
                <button onClick={() => setMostraModal(true)}>Afegir Despesa</button>
            </div>
        </div>
    )
}
