import React, { useState, useEffect, useRef } from "react";
import "./Cronometro.css";

const Cronometro = () => {
    // 🕒 Estado para almacenar los segundos transcurridos
    const [segundos, setSegundos] = useState(0);
    // ⏯️ Estado para saber si el cronómetro está corriendo o en pausa
    const [activo, setActivo] = useState(false);
    // 🔗 Referencia al intervalo para mantenerlo entre renders sin re-crearlo
    const intervaloRef = useRef(null);

    useEffect(() => {
        if (activo) {
            // ⏱️ Si está activo, iniciamos el intervalo y guardamos su referencia
            intervaloRef.current = setInterval(() => {
                setSegundos(prev => prev + 1);
            }, 1000);
        } else {
            // 🛑 Si no está activo, limpiamos el intervalo
            clearInterval(intervaloRef.current);
        }

        // 🚨 Cleanup: Se limpia al desmontar o al cambiar 'activo'
        return () => clearInterval(intervaloRef.current);
    }, [activo]);

    // 🔘 Alternar entre iniciar y detener el cronómetro
    const manejarInicioPausa = () => setActivo(prev => !prev);

    // 🔄 Reiniciar el cronómetro a 0 y detenerlo
    const reiniciarCronometro = () => {
        setSegundos(0);
        setActivo(false);
        clearInterval(intervaloRef.current); // Aseguramos que el intervalo se detenga
    };

    // ⏰ Convertimos segundos en minutos y segundos con formato 00:00
    const minutos = String(Math.floor(segundos / 60)).padStart(2, "0");
    const segs = String(segundos % 60).padStart(2, "0");

    return (
        <div className="cronometro-container">
            {/* ⏱️ Mostramos el tiempo en formato MM:SS */}
            <h2 className="cronometro-tiempo">{minutos}:{segs}</h2>

            {/* 🔘 Botón para iniciar o detener el cronómetro */}
            <button className="cronometro-boton" onClick={manejarInicioPausa}>
                {activo ? "Detener" : "Iniciar"}
            </button>

            {/* 🔄 Botón para reiniciar el cronómetro */}
            <button className="cronometro-boton reiniciar" onClick={reiniciarCronometro}>
                Reiniciar
            </button>
        </div>
    );
};

export default Cronometro;