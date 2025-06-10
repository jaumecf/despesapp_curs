import React from 'react'
import { Link } from 'react-router-dom'
import estils from './DespesesLlista.module.css'

export default function DespesesLlista({ idProjecte, despeses, eliminarDespesa }) {
    return (
        <div>
            {
                despeses.map((despesa, index) => (
                    <div className={estils.targeta} key={despesa.id}>
                        <Link to={`/despesa/${idProjecte}/${despesa.id}/`}>
                        <h2>{index + 1} - {despesa.concepte}</h2>
                        </Link>
                        <button onClick={() => eliminarDespesa(idProjecte, despesa.id)}>Eliminar Despesa</button>
                    </div>
                ))
            }
        </div>
    )
}
