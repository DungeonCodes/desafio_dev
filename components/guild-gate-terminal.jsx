"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const DEFAULT_MESSAGE = "Una os 3 fragmentos com _.";

const GUILD_COMMANDS = {
  ajudaGuilda() {
    return ["Comandos disponíveis:", "- pistaGuilda()", "- statusGuilda()", "- fragmentoGuilda()"].join("\n");
  },
  pistaGuilda() {
    return ["A chave nasce da união de 3 partes.", "Nem todas estão visíveis."].join("\n");
  },
  statusGuilda() {
    return ["Os caminhos já foram indicados.", "Observe. Investigue. Interaja."].join("\n");
  },
  fragmentoGuilda() {
    return "Fragmento 3: 2026";
  },
};

export function GuildGateTerminal() {
  const router = useRouter();
  const [accessKey, setAccessKey] = useState("");
  const [feedback, setFeedback] = useState(DEFAULT_MESSAGE);
  const [hasError, setHasError] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const previousValues = {};
    const commandNames = Object.keys(GUILD_COMMANDS);

    commandNames.forEach((commandName) => {
      previousValues[commandName] = window[commandName];
      window[commandName] = GUILD_COMMANDS[commandName];
    });

    console.log(
      "%cTerminal da Guilda iniciado.",
      "color:#7fffd4;font-family:monospace;font-size:14px;font-weight:700;",
    );
    console.log(
      "%cDigite ajudaGuilda()",
      "color:#f1fff8;font-family:monospace;font-size:13px;",
    );

    return () => {
      commandNames.forEach((commandName) => {
        if (typeof previousValues[commandName] === "undefined") {
          delete window[commandName];
          return;
        }

        window[commandName] = previousValues[commandName];
      });
    };
  }, []);

  async function handleSubmit(event) {
    event.preventDefault();
    setIsSubmitting(true);
    setHasError(false);
    setFeedback("Validando sequência...");

    try {
      const response = await fetch("/api/guilda/validar", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ key: accessKey }),
      });

      const payload = await response.json().catch(() => null);

      if (!response.ok || !payload?.ok) {
        setHasError(true);
        setFeedback(payload?.message ?? "Acesso negado.");
        return;
      }

      setFeedback("Acesso autorizado. Abrindo o portão...");
      router.push("/aprovado");
    } catch {
      setHasError(true);
      setFeedback("Falha de conexão com o terminal da Guilda.");
    } finally {
      setIsSubmitting(false);
    }
  }

  function handleChange(event) {
    setAccessKey(event.target.value);

    if (hasError || feedback !== DEFAULT_MESSAGE) {
      setHasError(false);
      setFeedback(DEFAULT_MESSAGE);
    }
  }

  return (
    <section className="ritualCard ritualCard--auth">
      <p className="ritualCardTitle">Terminal de autenticação</p>
      <h2 className="ritualCardHeading">Insira a chave de iniciação</h2>
      <p className="ritualCardText">
        Junte os 3 fragmentos na ordem correta para liberar o acesso ao núcleo da Guilda.
      </p>

      <div className="statusNote">
        <div className="statusNoteRow">
          <span className="statusNoteKey">Observação</span>
          <span className="statusNoteValue">1 fragmento visível na interface</span>
        </div>
        <div className="statusNoteRow">
          <span className="statusNoteKey">Investigação</span>
          <span className="statusNoteValue">1 fragmento oculto no HTML</span>
        </div>
        <div className="statusNoteRow">
          <span className="statusNoteKey">Interação</span>
          <span className="statusNoteValue">1 fragmento responde no console</span>
        </div>
      </div>

      <form className="terminalForm" onSubmit={handleSubmit}>
        <label className="srOnly" htmlFor="guild-initiation-key">
          Chave de iniciação
        </label>
        <input
          id="guild-initiation-key"
          autoCapitalize="characters"
          autoComplete="off"
          className="terminalInput"
          onChange={handleChange}
          placeholder="una os 3 fragmentos com _"
          spellCheck="false"
          type="text"
          value={accessKey}
        />
        <button className="terminalButton terminalButton--full" disabled={isSubmitting} type="submit">
          {isSubmitting ? "Verificando..." : "Liberar acesso"}
        </button>
      </form>

      <p className={hasError ? "terminalError terminalInlineMessage" : "terminalMuted terminalInlineMessage"} role="status">
        {feedback}
      </p>
    </section>
  );
}
