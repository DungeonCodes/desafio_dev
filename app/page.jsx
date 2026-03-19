import { TerminalFrame } from "../components/terminal-frame";

const SOURCE_HINT = "<!-- pista: a próxima porta é /portao-da-guilda -->";

const HOME_STATUS = [
  { label: "Status do sistema", value: "BLOQUEADO" },
  { label: "Protocolo", value: "INICIAÇÃO" },
];

export default function HomePage() {
  return (
    <>
      <div
        aria-hidden="true"
        className="sourceHint"
        dangerouslySetInnerHTML={{ __html: SOURCE_HINT }}
      />
      <TerminalFrame
        eyebrow="O Batismo do Código-Fonte"
        footer="Nem tudo aparece na tela."
        screenClassName="terminalScreen--entry"
        statusItems={HOME_STATUS}
        subtitle="Somente os curiosos avançam."
        title="O sistema da Guilda está bloqueado."
      >
        <div className="ritualGrid ritualGrid--home">
          <section className="ritualCard ritualCard--spotlight">
            <p className="terminalLead">Nem tudo aparece na tela.</p>
            <p className="ritualCardText">
              A entrada da Guilda responde melhor a quem observa com calma e procura
              sinais além da interface principal.
            </p>
            <div className="ritualActions">
              <a className="terminalButton" href="#registro-de-varredura">
                Iniciar varredura
              </a>
              <span className="consoleCallout">Observe além da superfície</span>
            </div>
          </section>

          <section className="ritualCard" id="registro-de-varredura">
            <p className="ritualCardTitle">Leitura do sistema</p>
            <div className="ritualLogList">
              <div className="ritualLogItem">
                <span className="ritualLogIndex">01</span>
                <p className="ritualCardText">Status atual: bloqueio ativo.</p>
              </div>
              <div className="ritualLogItem">
                <span className="ritualLogIndex">02</span>
                <p className="ritualCardText">
                  Protocolo de iniciação aguardando alguém curioso.
                </p>
              </div>
              <div className="ritualLogItem">
                <span className="ritualLogIndex">03</span>
                <p className="ritualCardText">
                  Algumas pistas preferem o Inspect ao palco principal.
                </p>
              </div>
            </div>
          </section>
        </div>
      </TerminalFrame>
    </>
  );
}
