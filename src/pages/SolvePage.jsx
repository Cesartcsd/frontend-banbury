import { useState } from "react";
import FormSolve from "../components/FormSolve";
import Resultado from "../components/Resultado";
import { solveRequest } from "../services/api";

export default function SolvePage() {
  const [resultado, setResultado] = useState(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(body) {
    try {
      setResultado(null); // limpa resultado anterior antes de um novo cálculo
      setLoading(true);
      const res = await solveRequest(body);

      const message =
        typeof res?.message === "string" ? res.message.trim() : "";
      const isNoSetpoint =
        message &&
        (message.toLowerCase().includes("nenhum setpoint") ||
          message.toLowerCase().includes("nenhum set point"));

      if (isNoSetpoint) {
        // Quando a API indica que não encontrou setpoints viáveis,
        // mostramos a mensagem e preservamos objective_value/violations se vierem.
        setResultado({
          message: message || "Nenhum setpoint viável encontrado",
          ...(res?.objective_value !== undefined && {
            objective_value: res.objective_value,
          }),
          ...(res?.violations && { violations: res.violations }),
        });
      } else {
        setResultado(res);
      }
    } catch (err) {
      setResultado(null); // garante que resultado antigo não persista em erro
      alert("Erro: " + err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <h1>Otimização – Máquina Bambury</h1>

      <FormSolve onSubmit={handleSubmit} />

      {loading && <p>Calculando...</p>}

      <Resultado data={resultado} />
    </>
  );
}
