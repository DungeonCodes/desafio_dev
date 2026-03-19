import "./globals.css";

export const metadata = {
  title: "O Batismo do Código-Fonte",
  description: "Experiência introdutória em estilo terminal para a Guilda.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
