import React, { useState, useEffect } from "react";

// Lista de localidades con sus provincias
const preguntasBase = [
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
    const [preguntas, setPreguntas] = useState([]); // Preguntas en orden aleatorio
    const [indice, setIndice] = useState(0);
    const [respuesta, setRespuesta] = useState("");
    const [aciertos, setAciertos] = useState(0);
    const [errores, setErrores] = useState(0);
    const [terminado, setTerminado] = useState(false);

    // Mezcla las preguntas de forma aleatoria al inicio del juego
    useEffect(() => {
        setPreguntas([...preguntasBase].sort(() => Math.random() - 0.5));
    }, []);

    const verificarRespuesta = () => {
        if (respuesta === preguntas[indice].provincia) {
            setAciertos(aciertos + 1);
        } else {
            setErrores(errores + 1);
        }

        if (indice < preguntas.length - 1) {
            setIndice(indice + 1);
            setRespuesta(""); // Reinicia la selección
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
            ) : preguntas.length > 0 ? (
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
            ) : (
                <p>Cargando preguntas...</p>
            )}
        </div>
    );
};
export default GeografiaQuiz;