import { useState } from "react";

export default function FormSolve({ onSubmit }) {
  const [recipe, setRecipe] = useState("PE27-MBB1");

  const [targets, setTargets] = useState({
    TPM_2: { min: 30, max: 45 },
    TPM_90: { min: 160, max: 180 },
    Pico_Max: { min: 88, max: 120 },
    Visc_Mooney: { min: 70, max: 75 },
  });

  const [contexto, setContexto] = useState({
    entrada: 13,
    saida: 25,
  });

  function updateTarget(name, field, value) {
    setTargets((prev) => ({
      ...prev,
      [name]: {
        ...prev[name],
        [field]: Number(value),
      },
    }));
  }

  function handleSubmit(e) {
    e.preventDefault();

    const body = {
      recipe,
      targets,
      context: {
        "Temperatura entrada de agua": Number(contexto.entrada),
        "Temperatura saida de agua": Number(contexto.saida),
      },
      iterations: 2500,
      mode: "offline",
    };

    onSubmit(body);
  }

  return (
    <form className="form" onSubmit={handleSubmit}>
      <h2>Recipe</h2>

      <input
        type="text"
        value={recipe}
        onChange={(e) => setRecipe(e.target.value)}
      />

      <h2>Targets desejados</h2>

      {Object.keys(targets).map((key) => (
        <div key={key} className="field-group">
          <label>{key}</label>
          <input
            type="number"
            value={targets[key].min}
            onChange={(e) => updateTarget(key, "min", e.target.value)}
            placeholder="min"
          />
          <input
            type="number"
            value={targets[key].max}
            onChange={(e) => updateTarget(key, "max", e.target.value)}
            placeholder="max"
          />
        </div>
      ))}

      <h2>Contexto</h2>
      <label>Temperatura entrada água</label>
      <input
        type="number"
        value={contexto.entrada}
        onChange={(e) =>
          setContexto({ ...contexto, entrada: e.target.value })
        }
      />

      <label>Temperatura saída água</label>
      <input
        type="number"
        value={contexto.saida}
        onChange={(e) => setContexto({ ...contexto, saida: e.target.value })}
      />

      <button type="submit">Calcular parâmetros</button>
    </form>
  );
}
