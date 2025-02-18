import React, { useState, useEffect } from "react";
import "./Cronometro.css";

// Componente Cronometro
const Cronometro = () => {
    const [tiempo, setTiempo] = useState(0);  // Tiempo inicial es 0
    const [enMarcha, setEnMarcha] = useState(false);  // El cronómetro no está en marcha al principio

    // Usamos useEffect para manejar el intervalo
    useEffect(() => {
        let intervalo;
        if (enMarcha) {
            intervalo = setInterval(() => {
                setTiempo(tiempo => tiempo + 1);  // Aumentamos el tiempo en 1 cada segundo
            }, 1000);
        } else {
            clearInterval(intervalo);  // Detenemos el cronómetro si no está en marcha
        }
        return () => clearInterval(intervalo);  // Limpiamos el intervalo al desmontar el componente
    }, [enMarcha]);  // Este useEffect se ejecuta cada vez que cambia el estado "enMarcha"

    // Función para iniciar o detener el cronómetro
    const iniciarDetener = () => {
        setEnMarcha(!enMarcha);  // Cambiamos el estado de "enMarcha"
    };

    // Función para reiniciar el cronómetro
    const reiniciar = () => {
        setEnMarcha(false);  // Detenemos el cronómetro
        setTiempo(0);  // Reiniciamos el tiempo a 0
    };

    // Convertimos el tiempo en minutos y segundos
    const minutos = String(Math.floor(tiempo / 60)).padStart(2, '0');  // Calculamos los minutos
    const segundos = String(tiempo % 60).padStart(2, '0');  // Calculamos los segundos

    return (
        <div className="cronometro-container">
            {/* Mostramos el tiempo con formato minutos:segundos */}
            <h2 className="cronometro-tiempo">{minutos}:{segundos}</h2>
            
            {/* Botón para iniciar o detener el cronómetro */}
            <button className="cronometro-boton" onClick={iniciarDetener}>
                {enMarcha ? 'Detener' : 'Iniciar'}  {/* Cambia el texto dependiendo del estado */}
            </button>
            
            {/* Botón para reiniciar el cronómetro */}
            <button className="cronometro-boton reiniciar" onClick={reiniciar}>Reiniciar</button>
        </div>
    );
};

export default Cronometro