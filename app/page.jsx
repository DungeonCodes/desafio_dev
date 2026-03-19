import { TerminalFrame } from "../components/terminal-frame";

const SOURCE_HINT =
  "<!-- pista_1: QSBwcsOzeGltYSByb3RhIMOpIC9sb2dpbi1ndWlsZGE= -->";

export default function HomePage() {
  return (
    <>
      <div
        aria-hidden="true"
        className="sourceHint"
        dangerouslySetInnerHTML={{ __html: SOURCE_HINT }}
      />
      <TerminalFrame eyebrow="Protocolo de Entrada" title="O sistema está bloqueado.">
        <p className="terminalLead">Encontre a chave.</p>
        <p className="terminalMuted">
          Apenas quem entende os sinais poderá liberar o acesso.
        </p>
      </TerminalFrame>
    </>
  );
}
