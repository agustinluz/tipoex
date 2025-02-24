import React, { useState, useEffect } from "react";

// Lista de preguntas: cada localidad tiene asociada su provincia correcta.
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

// Lista de provincias disponibles para responder
const provincias = ["Sevilla", "Córdoba", "Málaga"];

const GeografiaQuiz = () => {
    // Estado para almacenar las preguntas en orden aleatorio
    const [preguntas, setPreguntas] = useState([]); 
    
    // Estado para controlar en qué pregunta estamos
    const [indice, setIndice] = useState(0);
    
    // Estado para almacenar la respuesta seleccionada por el usuario
    const [respuesta, setRespuesta] = useState("");
    
    // Estado para contar las respuestas correctas
    const [aciertos, setAciertos] = useState(0);
    
    // Estado para contar las respuestas incorrectas
    const [errores, setErrores] = useState(0);
    
    // Estado para saber si el juego ha terminado
    const [terminado, setTerminado] = useState(false);

    // useEffect se ejecuta al cargar el componente, mezclando las preguntas aleatoriamente
    useEffect(() => {
        setPreguntas([...preguntasBase].sort(() => Math.random() - 0.5));
    }, []);

    // Función que verifica si la respuesta del usuario es correcta o incorrecta
    const verificarRespuesta = () => {
        if (respuesta === preguntas[indice].provincia) {
            // Si la respuesta es correcta, aumentamos el contador de aciertos
            setAciertos(aciertos + 1);
        } else {
            // Si es incorrecta, aumentamos el contador de errores
            setErrores(errores + 1);
        }

        // Si aún quedan preguntas, pasamos a la siguiente
        if (indice < preguntas.length - 1) {
            setIndice(indice + 1);
            setRespuesta(""); // Reiniciamos la selección para la próxima pregunta
        } else {
            // Si no hay más preguntas, finalizamos el juego
            setTerminado(true);
        }
    };

    return (
        <div>
            {terminado ? (
                // Si el juego ha terminado, mostramos los resultados
                <div>
                    <h2>Juego terminado</h2>
                    <p>Aciertos: {aciertos}</p>
                    <p>Errores: {errores}</p>
                </div>
            ) : preguntas.length > 0 ? (
                // Si el juego no ha terminado, mostramos la pregunta actual
                <div>
                    <h2>¿A qué provincia pertenece {preguntas[indice].localidad}?</h2>
                    
                    {/* Select para que el usuario elija una provincia */}
                    <select value={respuesta} onChange={(e) => setRespuesta(e.target.value)}>
                        <option value="">Selecciona una provincia</option>
                        {provincias.map((prov, i) => (
                            <option key={i} value={prov}>{prov}</option>
                        ))}
                    </select>

                    {/* Botón para responder, solo habilitado si se ha seleccionado una opción */}
                    <button onClick={verificarRespuesta} disabled={!respuesta}>Responder</button>
                </div>
            ) : (
                // Mensaje de carga mientras se generan las preguntas
                <p>Cargando preguntas...</p>
            )}
        </div>
    );
};

export default GeografiaQuiz;
