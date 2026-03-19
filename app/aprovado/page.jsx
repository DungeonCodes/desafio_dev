import { TerminalFrame } from "../../components/terminal-frame";

const APPROVED_STATUS = [
  { label: "Status", value: "APROVADO" },
  { label: "Ritual", value: "CONCLUÍDO" },
];

export default function AprovadoPage() {
  return (
    <TerminalFrame
      eyebrow="Iniciação concluída"
      footer="Apresente esta tela ao professor para resgatar sua recompensa."
      screenClassName="terminalScreen--approved"
      statusItems={APPROVED_STATUS}
      subtitle="Você foi aceito na Guilda."
      title="Acesso liberado."
    >
      <div className="ritualGrid ritualGrid--approved">
        <section className="ritualCard ritualCard--spotlight">
          <p className="terminalLead">Missão concluída com sucesso.</p>
          <p className="ritualCardText">
            Seu ritual de entrada foi registrado. A Guilda reconhece quem observa,
            investiga e interage com o sistema.
          </p>
          <div className="ritualLogList">
            <div className="ritualLogItem">
              <span className="ritualLogIndex">01</span>
              <p className="ritualCardText">Portão liberado para o novo integrante.</p>
            </div>
            <div className="ritualLogItem">
              <span className="ritualLogIndex">02</span>
              <p className="ritualCardText">
                Apresente esta tela ao professor para concluir a cerimônia.
              </p>
            </div>
          </div>
        </section>

        <section className="ritualCard">
          <p className="ritualCardTitle">Prêmio de iniciação</p>
          <div className="ritualRewardGrid">
            <div className="rewardItem">
              <span className="rewardLabel">Recompensa desbloqueada</span>
              <strong className="rewardValue">Troféu 3D</strong>
            </div>
            <div className="rewardItem">
              <span className="rewardLabel">Bônus da missão</span>
              <strong className="rewardValue">Pacote de doces</strong>
            </div>
          </div>
          <div className="ritualActions">
            <a className="terminalButton terminalButton--full" download href="/certificado-guilda.txt">
              Baixar certificado simbólico
            </a>
          </div>
        </section>
      </div>
    </TerminalFrame>
  );
}
