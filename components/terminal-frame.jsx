export function TerminalFrame({ eyebrow, title, children }) {
  return (
    <main className="terminalScreen">
      <section className="terminalPanel">
        {eyebrow ? <p className="terminalEyebrow">{eyebrow}</p> : null}
        <h1 className="terminalTitle">
          <span>{title}</span>
          <span aria-hidden="true" className="terminalCursor" />
        </h1>
        <div className="terminalContent">{children}</div>
      </section>
    </main>
  );
}
