const CERTIFICATE_WIDTH = 68;
const DUCK_WIDTH = 62;

const DUCK_INTERVALS = [
  [12, 18],
  [8, 21],
  [4, 23],
  [0, 24],
  [0, 24],
  [3, 23],
  [7, 25],
  [12, 31],
  [16, 39],
  [19, 46],
  [21, 53],
  [22, 58],
  [21, 60],
  [20, 61],
  [19, 60],
  [20, 57],
  [22, 54],
  [26, 47],
  [31, 39],
];

function centerLine(text, width = CERTIFICATE_WIDTH) {
  if (text.length >= width) {
    return text;
  }

  const leftPadding = Math.floor((width - text.length) / 2);
  return `${" ".repeat(leftPadding)}${text}`;
}

function fitLine(label, value) {
  return `${label}${value}`;
}

function buildBinaryLine(start, end, rowIndex) {
  const characters = [];

  for (let column = 0; column < DUCK_WIDTH; column += 1) {
    if (column < start || column > end) {
      characters.push(" ");
      continue;
    }

    characters.push((rowIndex + column) % 2 === 0 ? "1" : "0");
  }

  return characters.join("");
}

export function buildBinaryDuck() {
  const lines = DUCK_INTERVALS.map(([start, end], rowIndex) => buildBinaryLine(start, end, rowIndex));

  const eyeRow = 2;
  const eyeColumn = 10;
  const eyeLine = lines[eyeRow];
  lines[eyeRow] = `${eyeLine.slice(0, eyeColumn)}@${eyeLine.slice(eyeColumn + 1)}`;
  lines[3] = `>${lines[3].slice(1)}`;
  lines[4] = `>${lines[4].slice(1)}`;

  return lines.map((line) => centerLine(line, CERTIFICATE_WIDTH));
}

export function normalizeFullName(name) {
  return name.trim().replace(/\s+/g, " ");
}

export function isValidFullName(name) {
  const normalizedName = normalizeFullName(name);
  const parts = normalizedName.split(" ").filter(Boolean);

  if (parts.length < 2) {
    return false;
  }

  return parts[0].length >= 2 && parts[parts.length - 1].length >= 2;
}

export function sanitizeCertificateFileName(name) {
  const normalizedName = normalizeFullName(name)
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");

  const safeName = normalizedName || "participante";
  return `certificado-guilda-${safeName}.txt`;
}

export function buildCertificateText(name) {
  const displayName = normalizeFullName(name);
  const upperName = displayName.toUpperCase();
  const separator = "=".repeat(CERTIFICATE_WIDTH);
  const duckLines = buildBinaryDuck();

  const certificateLines = [
    separator,
    centerLine("GUILDA DO CODIGO-FONTE"),
    centerLine("CERTIFICADO DE INICIACAO TECH"),
    separator,
    "",
    centerLine("Certificamos que"),
    "",
    centerLine(upperName),
    "",
    centerLine('concluiu com sucesso o desafio'),
    centerLine('"O Batismo do Código-Fonte"'),
    "",
    centerLine("e demonstrou curiosidade, investigacao e coragem"),
    centerLine("para explorar pistas na tela, no inspect e no console."),
    "",
    fitLine("Status.............: ", "ACESSO LIBERADO"),
    fitLine("Nivel..............: ", "INICIADO NA GUILDA"),
    fitLine("Recompensa.........: ", "DESBLOQUEADA"),
    "",
    centerLine("Selo binario oficial da Guilda:"),
    "",
    ...duckLines,
    "",
    centerLine("Pato de Borracha da Depuracao aprovado pela Guilda"),
    "",
    "Emitido por:",
    "Colégio Sapucaia",
    "",
    separator,
  ];

  return certificateLines.join("\r\n");
}
