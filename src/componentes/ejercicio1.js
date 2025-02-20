import React, { useState, useEffect } from "react";
import "./Cronometro.css";

const Cronometro = () => {
    // 🕒 Guardamos los segundos que han pasado
    const [segundos, setSegundos] = useState(0);
    // ⏯️ Guardamos si el cronómetro está en marcha o no
    const [activo, setActivo] = useState(false);

    // ⏳ Si está activo, suma 1 cada segundo
    useEffect(() => {
        if (!activo) return; // Si está en pausa, no hacemos nada
        const intervalo = setInterval(() => {
            setSegundos(prev => prev + 1);
        }, 1000);
        return () => clearInterval(intervalo); // Limpiar cuando se detiene
    }, [activo]); // Se ejecuta cada vez que 'activo' cambia

    // 🔘 Cambiar entre iniciar y detener
    const manejarInicioPausa = () => setActivo(!activo);

    // 🔄 Reiniciar el cronómetro
    const reiniciarCronometro = () => {
        setSegundos(0);
        setActivo(false);
    };

    // ⏰ Convertir segundos a minutos y segundos con 2 cifras
    const minutos = String(Math.floor(segundos / 60)).padStart(2, "0");
    const segs = String(segundos % 60).padStart(2, "0");

    return (
        <div className="cronometro-container">
            <h2 className="cronometro-tiempo">{minutos}:{segs}</h2>
            <button className="cronometro-boton" onClick={manejarInicioPausa}>
                {activo ? "Detener" : "Iniciar"}
            </button>
            <button className="cronometro-boton reiniciar" onClick={reiniciarCronometro}>
                Reiniciar
            </button>
        </div>
    );
};

export default Cronometro;
