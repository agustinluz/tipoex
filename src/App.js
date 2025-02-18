
import React, {useState} from "react";
import Ejercicio1 from "./componentes/ejercicio1";
import Ejercicio2 from "./componentes/ejercicio2";

const App = () => {
  const [mostrarEjercicio, setMostrarEjercicio] = useState(1); // Controlar qué ejercicio mostrar

  return (
      <div>
          <h1>Mi Cronómetro</h1>
          <button onClick={() => setMostrarEjercicio(1)}>Ejercicio 1</button>
          <button onClick={() => setMostrarEjercicio(2)}>Ejercicio 2</button>
          
          {mostrarEjercicio === 1 && <Ejercicio1 />}
          {mostrarEjercicio === 2 && <Ejercicio2 />}
      </div>
  );
};

export default App;
