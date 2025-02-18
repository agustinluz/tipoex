/**Crear una aplicación para realizar un juego sobre preguntas de geografía, en el que el usuario deberá
responder cuál es la provincia a la que pertenece una localidad concreta. El funcionamiento será el
siguiente: (6 ptos.)
 se irán mostrando nombres de localidades de forma aleatoria.
 el usuario indicará cuál es la provincia a la que corresponde (por ej. mediante un select,
botones,...).
 al finalizar indicará el número de aciertos y de errores obtenidos.
 las localidades podrían ser las siguientes: Écija, Carmona, Dos Hermanas, Montilla, Lucena,
Baena, Torremolinos, Antequera y Mijas. */

import React, { useState } from "react";

const preguntas = [
    { localidad: "Écija", provincia: "Sevilla" },
    { localidad: "Carmona", provincia: "Sevilla" },
    { localidad: "Dos Hermanas", provincia: "Sevilla" },
    { localidad: "Montilla", provincia: "Córdoba" },
    { localidad: "Lucena", provincia: "Córdoba" },
    { localidad: "Baena", provincia: "Córdoba" },
    { localidad: "Torremolinos", provincia: "Málaga" },
    { localidad: "Antequera", provincia: "Málaga" },
    { localidad: "Mijas", provincia: "Málaga" }
];

const provincias = ["Sevilla", "Córdoba", "Málaga"];

const GeografiaQuiz = () => {
    const [indice, setIndice] = useState(0);
    const [respuesta, setRespuesta] = useState("");
    const [aciertos, setAciertos] = useState(0);
    const [errores, setErrores] = useState(0);
    const [terminado, setTerminado] = useState(false);

    const verificarRespuesta = () => {
        if (respuesta === preguntas[indice].provincia) {
            setAciertos(aciertos + 1);
        } else {
            setErrores(errores + 1);
        }

        if (indice < preguntas.length - 1) {
            setIndice(indice + 1);
            setRespuesta("");
        } else {
            setTerminado(true);
        }
    };

    return (
        <div>
            {terminado ? (
                <div>
                    <h2>Juego terminado</h2>
                    <p>Aciertos: {aciertos}</p>
                    <p>Errores: {errores}</p>
                </div>
            ) : (
                <div>
                    <h2>¿A qué provincia pertenece {preguntas[indice].localidad}?</h2>
                    <select value={respuesta} onChange={(e) => setRespuesta(e.target.value)}>
                        <option value="">Selecciona una provincia</option>
                        {provincias.map((prov, i) => (
                            <option key={i} value={prov}>{prov}</option>
                        ))}
                    </select>
                    <button onClick={verificarRespuesta} disabled={!respuesta}>Responder</button>
                </div>
            )}
        </div>
    );
};

export default GeografiaQuiz;
