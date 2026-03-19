import { TerminalFrame } from "../../components/terminal-frame";

export default function AprovadoPage() {
  return (
    <TerminalFrame eyebrow="Protocolo Aceito" title="Acesso liberado.">
      <p className="terminalLead">Você foi aceito na Guilda.</p>
      <a className="terminalButton" download href="/premio-guilda.txt">
        Baixar arquivo
      </a>
      <p className="terminalMuted">
        Leve este artefato ao professor para concluir a dinâmica.
      </p>
    </TerminalFrame>
  );
}
