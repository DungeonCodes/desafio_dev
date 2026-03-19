import { GuildGateTerminal } from "../../components/guild-gate-terminal";
import { TerminalFrame } from "../../components/terminal-frame";

const FRAGMENT_HINT = "<!-- fragmento_2: MESTRA -->";

const GATE_STATUS = [
  { label: "Área", value: "PORTÃO DA GUILDA" },
  { label: "Status", value: "ACESSO RESTRITO" },
];

export default function PortaoDaGuildaPage() {
  return (
    <>
      <div
        aria-hidden="true"
        className="sourceHint"
        dangerouslySetInnerHTML={{ __html: FRAGMENT_HINT }}
      />
      <TerminalFrame
        eyebrow="Ritual de iniciação"
        footer="Dica: abra o console e descubra quais comandos este sistema aceita."
        screenClassName="terminalScreen--vault"
        statusItems={GATE_STATUS}
        subtitle="A chave de iniciação foi dividida em 3 fragmentos."
        title="Você chegou ao Portão da Guilda."
      >
        <div className="ritualGrid ritualGrid--gate">
          <section className="ritualStack">
            <article className="ritualCard">
              <p className="ritualCardTitle">Rota de descoberta</p>
              <ul className="ritualTriad">
                <li className="ritualTriadItem">
                  <span aria-hidden="true" className="ritualTriadMarker" />
                  <p className="ritualTriadText">Quem observa encontra o primeiro.</p>
                </li>
                <li className="ritualTriadItem">
                  <span aria-hidden="true" className="ritualTriadMarker" />
                  <p className="ritualTriadText">Quem investiga descobre o segundo.</p>
                </li>
                <li className="ritualTriadItem">
                  <span aria-hidden="true" className="ritualTriadMarker" />
                  <p className="ritualTriadText">Quem interage revela o terceiro.</p>
                </li>
              </ul>
            </article>

            <article className="ritualCard ritualCard--fragment">
              <p className="ritualCardTitle">Registro encontrado</p>
              <div className="fragmentPanel">
                <span className="fragmentLabel">Fragmento 1</span>
                <strong className="fragmentValue">GUILDA</strong>
              </div>
            </article>

            <article className="ritualCard">
              <p className="ritualCardTitle">Canal de console</p>
              <p className="ritualCardText">
                O terminal da Guilda aceita comandos curtos e responde com novas pistas.
              </p>
              <div className="ritualActions">
                <span className="consoleCallout">ajudaGuilda()</span>
              </div>
            </article>
          </section>

          <GuildGateTerminal />
        </div>
      </TerminalFrame>
    </>
  );
}
