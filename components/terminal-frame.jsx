export function TerminalFrame({
  eyebrow,
  title,
  subtitle,
  statusItems = [],
  footer,
  screenClassName = "",
  children,
}) {
  const screenClasses = ["terminalScreen", screenClassName].filter(Boolean).join(" ");

  return (
    <main className={screenClasses}>
      <section className="terminalPanel">
        {statusItems.length ? (
          <div className="terminalStatusStrip">
            {statusItems.map(({ label, value }) => (
              <div className="terminalStatusPill" key={`${label}-${value}`}>
                <span className="terminalStatusLabel">{label}</span>
                <strong className="terminalStatusValue">{value}</strong>
              </div>
            ))}
          </div>
        ) : null}
        <div className="terminalHeader">
          {eyebrow ? <p className="terminalEyebrow">{eyebrow}</p> : null}
          <h1 className="terminalTitle">
            <span>{title}</span>
            <span aria-hidden="true" className="terminalCursor" />
          </h1>
          {subtitle ? <p className="terminalSubtitle">{subtitle}</p> : null}
        </div>
        <div aria-hidden="true" className="terminalSeparator" />
        <div className="terminalContent">{children}</div>
        {footer ? (
          <>
            <div aria-hidden="true" className="terminalSeparator" />
            <p className="terminalFooter">{footer}</p>
          </>
        ) : null}
      </section>
    </main>
  );
}
