"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { TerminalFrame } from "../../components/terminal-frame";

const ACCESS_KEY = "CHAVE_MESTRA_GUILDA";

export default function LoginGuildaPage() {
  const router = useRouter();
  const [accessKey, setAccessKey] = useState("");
  const [error, setError] = useState("");

  function handleSubmit(event) {
    event.preventDefault();

    if (accessKey.trim() !== ACCESS_KEY) {
      setError("Acesso negado");
      return;
    }

    setError("");
    router.push("/aprovado");
  }

  function handleChange(event) {
    setAccessKey(event.target.value);

    if (error) {
      setError("");
    }
  }

  return (
    <TerminalFrame eyebrow="Validação da Guilda" title="Digite a chave para liberar o acesso">
      <form className="terminalForm" onSubmit={handleSubmit}>
        <label className="srOnly" htmlFor="guild-access-key">
          Chave de acesso
        </label>
        <input
          id="guild-access-key"
          autoCapitalize="none"
          autoComplete="off"
          className="terminalInput"
          onChange={handleChange}
          placeholder="CHAVE_MESTRA_GUILDA"
          spellCheck="false"
          type="text"
          value={accessKey}
        />
        <button className="terminalButton" type="submit">
          Validar acesso
        </button>
      </form>
      {error ? (
        <p className="terminalError" role="status">
          {error}
        </p>
      ) : (
        <p className="terminalMuted">A entrada correta libera a próxima camada.</p>
      )}
    </TerminalFrame>
  );
}
