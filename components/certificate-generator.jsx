"use client";

import { useState } from "react";
import {
  buildBinaryDuck,
  buildCertificateText,
  isValidFullName,
  normalizeFullName,
  sanitizeCertificateFileName,
} from "../lib/guild-certificate";

const BINARY_DUCK_PREVIEW = buildBinaryDuck().slice(0, 8).join("\n");

export function CertificateGenerator() {
  const [fullName, setFullName] = useState("");
  const [message, setMessage] = useState("O certificado será emitido em .txt com selo binário oficial da Guilda.");
  const [hasError, setHasError] = useState(false);

  function handleChange(event) {
    setFullName(event.target.value);

    if (hasError) {
      setHasError(false);
      setMessage("O certificado será emitido em .txt com selo binário oficial da Guilda.");
    }
  }

  function handleDownload() {
    if (!isValidFullName(fullName)) {
      setHasError(true);
      setMessage("Informe nome e sobrenome para gerar o certificado.");
      return;
    }

    const normalizedName = normalizeFullName(fullName);
    const certificateText = buildCertificateText(normalizedName);
    const fileName = sanitizeCertificateFileName(normalizedName);
    const blob = new Blob([certificateText], {
      type: "text/plain;charset=utf-8",
    });
    const objectUrl = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = objectUrl;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(objectUrl);

    setHasError(false);
    setMessage(`Certificado gerado: ${fileName}`);
  }

  return (
    <section className="ritualCard ritualCard--certificate">
      <div className="certificateLayout">
        <div className="certificatePanel">
          <p className="ritualCardTitle">Certificado personalizado</p>
          <h2 className="ritualCardHeading">Gerar certificado .txt</h2>
          <p className="ritualCardText">
            Digite seu nome completo para emitir um certificado simbólico da Guilda com
            o pato binário oficial da depuração.
          </p>

          <div className="certificateForm">
            <label className="srOnly" htmlFor="full-name">
              Nome completo
            </label>
            <input
              id="full-name"
              autoComplete="name"
              className="terminalInput"
              onChange={handleChange}
              placeholder="Nome completo"
              type="text"
              value={fullName}
            />
            <button className="terminalButton terminalButton--full" onClick={handleDownload} type="button">
              Gerar certificado .txt
            </button>
          </div>

          <p className={hasError ? "terminalError terminalInlineMessage" : "terminalMuted terminalInlineMessage"} role="status">
            {message}
          </p>
        </div>

        <div className="certificatePreview">
          <p className="ritualCardTitle">Selo central do certificado</p>
          <pre className="certificatePreviewArt">{BINARY_DUCK_PREVIEW}</pre>
          <p className="ritualCardText">
            O arquivo final inclui a versão completa do pato em visão lateral, preenchida
            com 1 e 0.
          </p>
        </div>
      </div>
    </section>
  );
}
