import { useState } from "react";

// ─── DATA ────────────────────────────────────────────────────────────────────

const USER_MAP = {
  jpabong: "YORDYN HERNANDEZ REYES",
  jllopear: "YORDYN HERNANDEZ REYES",
  nmunores: "YORDYN HERNANDEZ REYES",
  aporrasa: "YORDYN HERNANDEZ REYES",
  amartpal: "KAREN ALEXA VALENCIA COSSIO",
  mgiralot: "YORDYN HERNANDEZ REYES",
  zoscaran: "YORDYN HERNANDEZ REYES",
  llopemor: "YORDYN HERNANDEZ REYES",
  ygarcmer: "KAREN ALEXA VALENCIA COSSIO",
  smarinti: "KAREN ALEXA VALENCIA COSSIO",
  sfuentru: "YORDYN HERNANDEZ REYES",
  lgiralpe: "KAREN ALEXA VALENCIA COSSIO",
  lruedaar: "YORDYN HERNANDEZ REYES",
  mvasqmon: "YORDYN HERNANDEZ REYES",
  jrodrech: "KAREN ALEXA VALENCIA COSSIO",
  amelguro: "KAREN ALEXA VALENCIA COSSIO",
  lholgusa: "YORDYN HERNANDEZ REYES",
  jcastsan: "YORDYN HERNANDEZ REYES",
  jcorreta: "KAREN ALEXA VALENCIA COSSIO",
  kguardia: "KAREN ALEXA VALENCIA COSSIO",
  garamont: "KAREN ALEXA VALENCIA COSSIO",
  kvegarod: "KAREN ALEXA VALENCIA COSSIO",
  pruda: "KAREN ALEXA VALENCIA COSSIO",
  otro: "Prueba",
  tpatinru: "Administrador",
};

const MOMENTOS = [
  { id: "saludo", label: "Saludo comercial" },
  { id: "sondeo", label: "Sondeo comercial" },
  { id: "oferta", label: "Presentación de oferta" },
  { id: "objeciones", label: "Manejo de objeciones" },
  { id: "cierres", label: "Cierres" },
  { id: "faq", label: "Preguntas frecuentes" },
];

const PLANTILLAS = {
  saludo: [
    {
      id: "saludo_oferta",
      nombre: "Saludo con oferta",
      texto: `¡Hola! Soy [nombre asesor] 👋🏻 quien te acompañará en tu proceso de *portabilidad para Tigo.*\n\n🤩 ¡Has hecho una gran elección!\n*[Escribe la oferta que está en el HSM]*\nAntes de continuar dime, ¿cuál es tu nombre para personalizar la interacción? 😊`,
    },
    {
      id: "saludo_sin_oferta",
      nombre: "Saludo sin oferta",
      texto: `¡Hola! Soy [nombre asesor] 👋🏻 quien te acompañará en tu proceso de portabilidad para Tigo.\n\nPrimero, dime tu nombre para personalizar aún más tu experiencia 😄\n\n✨ Cuéntame, ¿hay alguna oferta que te haya interesado especialmente y en la que te gustaría que profundicemos?`,
    },
  ],
  sondeo: [
    {
      id: "sondeo1",
      nombre: "Sondeo de necesidad",
      texto: `Hola [nombre cliente] 😊, me alegra que estés aquí.\n\nPara ofrecerte la mejor alternativa, cuéntame:\n\n📱 ¿Cuántos datos usas actualmente en tu plan?\n📞 ¿Haces muchas llamadas o usas más datos?\n💸 ¿Tienes un presupuesto mensual en mente?\n\nCon eso, te armo la oferta perfecta para ti 🎯`,
    },
    {
      id: "sondeo2",
      nombre: "Sondeo rápido",
      texto: `[nombre cliente], antes de mostrarte la oferta, una pregunta rápida:\n\n¿Tu prioridad es internet 📶, llamadas 📞, o una combinación de ambos?\n\n¡Con eso te tengo la respuesta perfecta! ✅`,
    },
  ],
  oferta: [
    {
      id: "oferta1",
      nombre: "Presentación combo",
      texto: `¡Ya tienes tu combo ganador listo para disfrutar! 🎉\n\n💻 Internet de [MB] de velocidad para navegar sin límites\n📱 Línea móvil con [GB] para estar siempre conectado\n📺 Televisión con tus canales favoritos\n\nTodo esto con un descuento del [%DESCUENTO]\nPor solo [$PRECIO]`,
    },
    {
      id: "oferta2",
      nombre: "Oferta directa",
      texto: `[nombre cliente], te tengo algo muy especial 🎯\n\n*Plan [MB]MB + [GB]GB móvil*\n✅ Sin letra pequeña\n✅ Instalación rápida\n✅ Soporte 24/7\n\n*Solo hoy: [$PRECIO]* con el [%DESCUENTO] de descuento incluido 💸\n\n¿Lo activamos?`,
    },
  ],
  objeciones: [
    {
      id: "obj1",
      nombre: "Objeción de precio",
      texto: `Nombre Cliente, *hoy este plan te queda en [$PRECIO] con el [%DESCUENTO] de descuento*, cuando normalmente su valor es de [$PRECIO] 💸\n\n*Estás ahorrando más de [$PRECIO] en total* 🔥\n\n¿Qué dices: lo activamos a este número [número registrado en Tigo Chat] o quieres una línea nueva?`,
    },
    {
      id: "obj2",
      nombre: "Objeción de permanencia",
      texto: `Listo, lo podemos manejar como prefieras 🤝\n\n👉 *Con permanencia:* no pagas costo de conexión 💸\n👉 *Sin permanencia:* pagas la instalación pero tienes más flexibilidad\n\n¿Prefieres tomarlo con permanencia o sin permanencia?`,
    },
  ],
  cierres: [
    {
      id: "cierre1",
      nombre: "Cierre con cédula",
      texto: `🪪 ¿Me indicas tu cédula para iniciar con el ingreso de la oferta?`,
    },
    {
      id: "cierre2",
      nombre: "Cierre con confirmación",
      texto: `¿Te llega la confirmación a este número o a otro? 📲`,
    },
    {
      id: "cierre3",
      nombre: "Cierre con documento",
      texto: `Para iniciar con el ingreso, necesito que me envíes una foto del documento por lado y lado 📸`,
    },
    {
      id: "cierre4",
      nombre: "Cierre de urgencia",
      texto: `[nombre cliente], esta oferta es válida *solo por hoy* ⏳\n\n¿La tomamos ahora para que no pierdas el descuento del [%DESCUENTO]? 🎯`,
    },
  ],
  faq: [
    {
      id: "faq1",
      nombre: "Facturación",
      texto: `Tranquilo, funciona así 👇\n\nLa factura llega unos 5 días después de instalar 📄\nTienes tiempo para pagarla con calma (aprox. 15 días) 💸\nY el descuento ya viene incluido en esa factura 🙌\n\n¿Te ayudo con algo más?`,
    },
    {
      id: "faq2",
      nombre: "Cobertura",
      texto: `¡Buena pregunta! 📶\n\nTigo tiene cobertura en *más de 1.000 municipios* del país. Para verificar si tu dirección tiene señal, solo necesito:\n\n📍 Tu dirección exacta\n🏙️ Ciudad o municipio\n\n¿Me la compartes? 😊`,
    },
  ],
};

// ─── BIBLIOTECA DE RESPUESTAS GUIADAS ────────────────────────────────────────

const BIBLIOTECA = {
  cotizando: `Es verdad, hay muchas opciones 👀\n\nLa idea es que realmente *encuentres algo que sí te funcione 🙌*\n\n¿Qué es lo más importante para ti al elegir un plan?\n📶 Más megas / más datos\n💸 Mejor precio / más descuento`,
  pareja: `Buena idea, así lo ven con calma 🙌\n\nPara que esa conversación sea más clara, ¿qué es lo que hoy sienten que les está faltando en la oferta?`,
  pensar: `Te entiendo 😊\n\nSin embargo, si lo tomas hoy tienes este beneficio disponible 👇\n*Descuento especial + beneficios desde el primer mes*\n\n¿Lo dejamos listo a tu nombre?`,
  masCaroOtro: `Súper válido 👀\n\nJusto para ayudarte a decidir, hoy tienes un *beneficio adicional* por tomar el servicio en este momento 🎁\n\n¿Lo activamos a este número o a uno nuevo?`,
  permanencia: `Listo, lo podemos manejar como prefieras 🤝\n\n👉 *Con permanencia:* no pagas costo de conexión 💸\n👉 *Sin permanencia:* pagas la instalación pero tienes más flexibilidad\n\n¿Prefieres tomarlo con permanencia o sin permanencia?`,
  infoEquivocada: `Esa parte es general y aplica para varios servicios 😊\n\nEn tu caso no es necesario tenerla en cuenta, solo enfócate en las condiciones de tu producto 👍\n\n¿Seguimos con el proceso?`,
  menosMesGratis: `Entiendo, el ahorro es importante 🤝\n\nJusto hoy tienes un beneficio que vale la pena 👇\n*La idea es que inicies ahorrando desde el primer mes 🙌*\n\n¿Lo activamos?`,
  otraOperadora: `Total, el precio pesa mucho 💸\n\nJusto por eso aquí tienes un *beneficio desde el inicio 🎁* y un servicio pensado para darte mejor experiencia.\n\n¿Lo comparamos rápido?`,
  lineaMovil: `¡Perfecto! 💙\n\nAl ser cliente hogar, tienes un *precio preferencial en tu línea móvil 🙌*\n\n¿Lo dejamos activado?`,
  recarga: `¡De una, te entiendo! 🤝\n\nPor ser cliente hogar, puedes tener un plan desde lo que ya recargas, pero con más beneficios:\n*WhatsApp ilimitado + más gigas + minutos sin preocuparte por saldo 📱*\n\n¿Lo activamos?`,
  factura: `Tranquilo, funciona así 👇\n\nLa factura llega unos 5 días después de instalar 📄\nTienes tiempo para pagarla con calma (aprox. 15 días) 💸\nY el descuento ya viene incluido en esa factura 🙌\n\n¿Te ayudo con algo más?`,
  retoma: `[nombre cliente] 👋\nQuedé pendiente de ayudarte con la opción que vimos 🙌\nSi tienes alguna duda, con gusto te la aclaro.\n*¿Continuamos?*`,
  generico: `Te entiendo 😊\n\nJusto hoy tienes un *beneficio especial* disponible para ti 🎯\n\n¿Lo revisamos y lo dejamos listo?\nIndícame tu cédula para comenzar 🪪`,
};

const TIPO_LABELS = {
  cotizando: "Solo está cotizando",
  pareja: "Quiere consultar con su pareja",
  pensar: "Necesita pensarlo",
  permanencia: "Objeción de permanencia",
  masCaroOtro: "Precio / otra oferta",
  infoEquivocada: "Información equivocada",
  menosMesGratis: "Descuento insuficiente",
  otraOperadora: "Tiene otra operadora",
  lineaMovil: "Ya tiene línea móvil",
  recarga: "Prefiere recargar",
  factura: "Duda sobre factura",
  retoma: "Retoma de conversación",
  generico: "Caso general",
};

function detectarTipo(msg) {
  const m = msg.toLowerCase();
  if (/cotiz|solo estoy mirando|solo pregunt|comparando/.test(m)) return "cotizando";
  if (/pareja|esposo|esposa|marido|mujer|consultar|preguntar/.test(m)) return "pareja";
  if (/pensar|d[eé]j[ae]me|ma[ñn]ana|luego|despu[eé]s/.test(m)) return "pensar";
  if (/permanencia|fidelidad|contrato|compromiso/.test(m)) return "permanencia";
  if (/m[aá]s caro|otro lado|otra empresa|m[aá]s barato|caro/.test(m)) return "masCaroOtro";
  if (/informaci[oó]n equivocada|me dijeron|no era as[ií]/.test(m)) return "infoEquivocada";
  if (/mes gratis|no es promoci[oó]n|menos de un mes/.test(m)) return "menosMesGratis";
  if (/otro operador|claro|movistar|wom|telf/.test(m)) return "otraOperadora";
  if (/l[ií]nea m[oó]vil|ya tengo l[ií]nea/.test(m)) return "lineaMovil";
  if (/recar[ag]|no quiero plan|prepago/.test(m)) return "recarga";
  if (/factura|cobro|primer recibo|cu[aá]nto pago|primer mes/.test(m)) return "factura";
  if (/retoma|no contestaste|d[oó]nde quedamos|seguimos/.test(m)) return "retoma";
  return "generico";
}

// ─── MOCK DATA ────────────────────────────────────────────────────────────────

const MOCK_USAGE = {
  jpabong: { plantillas: 47, ia: 23, momentos: { saludo: 12, sondeo: 8, oferta: 10, objeciones: 9, cierres: 5, faq: 3 } },
  jllopear: { plantillas: 31, ia: 14, momentos: { saludo: 9, sondeo: 6, oferta: 7, objeciones: 5, cierres: 3, faq: 1 } },
  nmunores: { plantillas: 56, ia: 34, momentos: { saludo: 14, sondeo: 11, oferta: 13, objeciones: 10, cierres: 6, faq: 2 } },
  aporrasa: { plantillas: 22, ia: 10, momentos: { saludo: 6, sondeo: 4, oferta: 5, objeciones: 4, cierres: 2, faq: 1 } },
  amartpal: { plantillas: 63, ia: 41, momentos: { saludo: 16, sondeo: 13, oferta: 15, objeciones: 11, cierres: 7, faq: 1 } },
  mgiralot: { plantillas: 19, ia: 7, momentos: { saludo: 5, sondeo: 3, oferta: 4, objeciones: 4, cierres: 2, faq: 1 } },
  zoscaran: { plantillas: 38, ia: 19, momentos: { saludo: 10, sondeo: 8, oferta: 9, objeciones: 7, cierres: 3, faq: 1 } },
};

const MOCK_SKILLS = {
  jpabong: { tono: 88, persuasion: 91, cierre: 84 },
  jllopear: { tono: 74, persuasion: 79, cierre: 68 },
  nmunores: { tono: 92, persuasion: 95, cierre: 89 },
  aporrasa: { tono: 65, persuasion: 70, cierre: 62 },
  amartpal: { tono: 94, persuasion: 97, cierre: 93 },
  mgiralot: { tono: 61, persuasion: 65, cierre: 58 },
  zoscaran: { tono: 82, persuasion: 86, cierre: 79 },
};

// ─── HELPERS ──────────────────────────────────────────────────────────────────

function formatWAText(text) {
  const parts = [];
  const regex = /(\*[^*]+\*|\[[^\]]+\])/g;
  let lastIdx = 0;
  let match;
  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIdx) parts.push({ type: "text", content: text.slice(lastIdx, match.index) });
    const val = match[0];
    if (val.startsWith("*") && val.endsWith("*")) {
      parts.push({ type: "bold", content: val.slice(1, -1) });
    } else {
      parts.push({ type: "placeholder", content: val });
    }
    lastIdx = match.index + val.length;
  }
  if (lastIdx < text.length) parts.push({ type: "text", content: text.slice(lastIdx) });
  return parts;
}

function calcEfectividad(text) {
  const hasEmoji = /[\u{1F300}-\u{1FFFF}]/u.test(text);
  const hasBold = /\*[^*]+\*/.test(text);
  const hasQuestion = /\?/.test(text);
  const hasPlaceholders = /\[[^\]]+\]/.test(text);
  const wordCount = text.split(/\s+/).length;
  const len = text.length;

  let tono = Math.min(95, 55 + (hasEmoji ? 15 : 0) + (len > 80 ? 10 : 0) + (wordCount > 20 ? 10 : 0) + (hasBold ? 5 : 0));
  let persuasion = Math.min(97, 50 + (hasBold ? 20 : 0) + (hasQuestion ? 15 : 0) + (hasEmoji ? 8 : 0) + (len > 100 ? 4 : 0));
  let cierre = Math.min(95, 45 + (hasQuestion ? 25 : 0) + (hasBold ? 10 : 0) + (len > 60 ? 10 : 0) + (hasEmoji ? 5 : 0));

  const sugerencias = [];
  if (tono < 80) sugerencias.push("Agrega un emoji para hacer el mensaje más cercano y empático.");
  if (persuasion < 80) sugerencias.push("Resalta el beneficio principal en negritas para aumentar la persuasión.");
  if (cierre < 75) sugerencias.push("Incluye una pregunta directa de cierre al final del mensaje.");
  if (hasPlaceholders) sugerencias.push("⚠️ Tienes campos sin personalizar en rojo. Complétalos antes de enviar.");
  if (wordCount < 15) sugerencias.push("El mensaje es muy corto. Considera agregar más contexto o beneficios.");

  return { tono, persuasion, cierre, sugerencias };
}

function getStoredData(key, def) {
  try { const d = localStorage.getItem(key); return d ? JSON.parse(d) : def; } catch { return def; }
}
function storeData(key, val) {
  try { localStorage.setItem(key, JSON.stringify(val)); } catch {}
}

// ─── COLORS ───────────────────────────────────────────────────────────────────

const C = {
  azul: "#001A7B",
  cian: "#0BBBEF",
  limon: "#D2D600",
  morado: "#A259FE",
  menta: "#09CF82",
  avatarBlue: "#00377D",
};

// ─── GLOBAL CSS ───────────────────────────────────────────────────────────────

const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;1,9..40,400&family=DM+Mono:wght@400;500&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  html { font-size: 16px; }

  body {
    font-family: 'DM Sans', -apple-system, BlinkMacSystemFont, sans-serif;
    background: #F0F2F5;
    color: #1A1A2E;
    min-height: 100vh;
    -webkit-font-smoothing: antialiased;
  }

  ::-webkit-scrollbar { width: 5px; height: 5px; }
  ::-webkit-scrollbar-track { background: transparent; }
  ::-webkit-scrollbar-thumb { background: #CBD5E0; border-radius: 10px; }

  /* ── LOGIN ── */
  .login-page {
    min-height: 100vh;
    background: linear-gradient(145deg, #0A0E2A 0%, #001A7B 45%, #0A1A4A 72%, #050B1F 100%);
    display: flex; align-items: center; justify-content: center;
    padding: 24px; position: relative; overflow: hidden;
  }
  .login-page::before {
    content: ''; position: absolute;
    width: 700px; height: 700px; border-radius: 50%;
    background: radial-gradient(circle, rgba(11,187,239,0.07) 0%, transparent 68%);
    top: -150px; right: -150px;
  }
  .login-page::after {
    content: ''; position: absolute;
    width: 500px; height: 500px; border-radius: 50%;
    background: radial-gradient(circle, rgba(162,89,254,0.06) 0%, transparent 65%);
    bottom: -80px; left: -80px;
  }
  .login-card {
    background: rgba(255,255,255,0.98);
    border-radius: 22px; padding: 48px;
    width: 100%; max-width: 420px;
    box-shadow: 0 32px 80px rgba(0,0,0,0.45), 0 0 0 1px rgba(255,255,255,0.08);
    position: relative; z-index: 1;
  }
  .login-logo { display: flex; align-items: center; gap: 12px; margin-bottom: 36px; }
  .login-logo-icon {
    width: 44px; height: 44px; border-radius: 12px;
    background: #001A7B; display: flex; align-items: center;
    justify-content: center; font-size: 22px; flex-shrink: 0;
  }
  .login-logo-text { font-size: 20px; font-weight: 700; color: #001A7B; letter-spacing: -0.5px; }
  .login-logo-sub { font-size: 11px; font-weight: 500; color: #94A3B8; letter-spacing: 0.5px; text-transform: uppercase; margin-top: 1px; }
  .login-title { font-size: 26px; font-weight: 700; color: #0F172A; margin-bottom: 6px; letter-spacing: -0.5px; }
  .login-subtitle { font-size: 14px; color: #64748B; margin-bottom: 32px; }

  .form-group { margin-bottom: 20px; }
  .form-label { display: block; font-size: 13px; font-weight: 600; color: #374151; margin-bottom: 8px; }
  .form-input {
    width: 100%; padding: 13px 16px;
    border: 1.5px solid #E2E8F0; border-radius: 10px;
    font-size: 15px; font-family: 'DM Sans', sans-serif;
    color: #0F172A; background: #F8FAFC; outline: none; transition: all 0.2s;
  }
  .form-input:focus { border-color: #0BBBEF; background: white; box-shadow: 0 0 0 3px rgba(11,187,239,0.12); }
  .form-input::placeholder { color: #A0AEC0; }

  .user-preview {
    background: #EEF2FF; border: 1.5px solid #C7D2FE;
    border-radius: 10px; padding: 12px 16px;
    display: flex; align-items: center; gap: 10px; margin-bottom: 24px;
  }
  .user-preview-avatar {
    width: 36px; height: 36px; border-radius: 50%;
    background: #001A7B; display: flex; align-items: center;
    justify-content: center; font-size: 13px; font-weight: 700; color: white; flex-shrink: 0;
  }
  .user-preview-name { font-size: 14px; font-weight: 600; color: #001A7B; }
  .user-preview-role { font-size: 12px; color: #6366F1; }

  .error-msg {
    background: #FEF2F2; border: 1.5px solid #FECACA;
    color: #DC2626; padding: 10px 14px; border-radius: 8px;
    font-size: 13px; margin-bottom: 16px; font-weight: 500;
  }

  /* ── BUTTONS ── */
  .btn-primary {
    width: 100%; padding: 14px; background: #001A7B; color: white;
    border: none; border-radius: 10px; font-size: 15px; font-weight: 600;
    font-family: 'DM Sans', sans-serif; cursor: pointer; transition: all 0.2s; letter-spacing: 0.2px;
  }
  .btn-primary:hover { background: #0026B0; transform: translateY(-1px); box-shadow: 0 8px 24px rgba(0,26,123,0.3); }
  .btn-primary:active { transform: translateY(0); }
  .btn-primary:disabled { opacity: 0.5; cursor: not-allowed; transform: none; box-shadow: none; }

  .btn-cian {
    padding: 10px 18px; background: #0BBBEF; color: white;
    border: none; border-radius: 8px; font-size: 13px; font-weight: 600;
    font-family: 'DM Sans', sans-serif; cursor: pointer; transition: all 0.2s;
  }
  .btn-cian:hover { background: #09A8D4; transform: translateY(-1px); }
  .btn-cian:active { transform: translateY(0); }
  .btn-cian:disabled { opacity: 0.5; cursor: not-allowed; transform: none; }

  .btn-dark {
    padding: 10px 18px; background: #001A7B; color: white;
    border: none; border-radius: 8px; font-size: 13px; font-weight: 600;
    font-family: 'DM Sans', sans-serif; cursor: pointer; transition: all 0.2s;
  }
  .btn-dark:hover { background: #0026B0; }

  .btn-outline {
    padding: 8px 16px; background: transparent; color: #001A7B;
    border: 1.5px solid #001A7B; border-radius: 8px; font-size: 13px; font-weight: 600;
    font-family: 'DM Sans', sans-serif; cursor: pointer; transition: all 0.2s;
  }
  .btn-outline:hover { background: #001A7B; color: white; }

  .btn-ghost {
    padding: 8px 14px; background: transparent; color: #64748B;
    border: 1.5px solid #E2E8F0; border-radius: 8px; font-size: 13px; font-weight: 500;
    font-family: 'DM Sans', sans-serif; cursor: pointer; transition: all 0.2s;
  }
  .btn-ghost:hover { background: #F8FAFC; color: #374151; }

  /* ── APP SHELL ── */
  .app-shell { display: flex; flex-direction: column; min-height: 100vh; background: #F0F2F5; }

  .topbar {
    background: white; border-bottom: 1px solid #E2E8F0;
    padding: 0 24px; height: 60px; display: flex;
    align-items: center; justify-content: space-between;
    position: sticky; top: 0; z-index: 100;
    box-shadow: 0 1px 8px rgba(0,0,0,0.06);
  }
  .topbar-left { display: flex; align-items: center; gap: 16px; }
  .topbar-logo {
    display: flex; align-items: center; gap: 8px;
    font-size: 17px; font-weight: 700; color: #001A7B; letter-spacing: -0.3px;
  }
  .topbar-logo-icon {
    width: 32px; height: 32px; border-radius: 8px; background: #001A7B;
    display: flex; align-items: center; justify-content: center; font-size: 16px;
  }
  .topbar-divider { width: 1px; height: 24px; background: #E2E8F0; }
  .topbar-right { display: flex; align-items: center; gap: 12px; }

  .user-chip {
    display: flex; align-items: center; gap: 8px;
    background: #F8FAFC; border: 1px solid #E2E8F0;
    border-radius: 20px; padding: 5px 12px 5px 6px;
  }
  .user-chip-avatar {
    width: 28px; height: 28px; border-radius: 50%; background: #001A7B;
    display: flex; align-items: center; justify-content: center;
    font-size: 11px; font-weight: 700; color: white;
  }
  .user-chip-name { font-size: 13px; font-weight: 600; color: #374151; }

  .role-badge { font-size: 11px; font-weight: 600; padding: 3px 8px; border-radius: 12px; }
  .role-badge.asesor { background: #EEF2FF; color: #4F46E5; }
  .role-badge.admin { background: #FEF3C7; color: #92400E; }

  .sidebar {
    width: 220px; background: white; border-right: 1px solid #E2E8F0;
    height: calc(100vh - 60px); position: sticky; top: 60px;
    overflow-y: auto; flex-shrink: 0; padding: 16px 0;
  }
  .sidebar-section { margin-bottom: 8px; }
  .sidebar-section-label {
    font-size: 10px; font-weight: 700; color: #94A3B8; letter-spacing: 0.8px;
    text-transform: uppercase; padding: 4px 20px; margin-bottom: 4px;
  }
  .sidebar-item {
    display: flex; align-items: center; gap: 10px; padding: 10px 20px;
    font-size: 13.5px; font-weight: 500; color: #475569; cursor: pointer;
    transition: all 0.15s; border-left: 3px solid transparent;
  }
  .sidebar-item:hover { background: #F8FAFC; color: #001A7B; }
  .sidebar-item.active { background: #EEF2FF; color: #001A7B; font-weight: 600; border-left-color: #001A7B; }
  .sidebar-item-icon { font-size: 16px; width: 20px; text-align: center; }

  .main-content { flex: 1; display: flex; overflow: hidden; }
  .content-area { flex: 1; padding: 24px; overflow-y: auto; max-height: calc(100vh - 60px); }

  /* ── CARDS ── */
  .card { background: white; border-radius: 14px; border: 1px solid #E8EDF5; box-shadow: 0 2px 8px rgba(0,0,0,0.05); }
  .card-header {
    padding: 18px 20px 14px; border-bottom: 1px solid #F1F5F9;
    display: flex; align-items: center; justify-content: space-between;
  }
  .card-title { font-size: 15px; font-weight: 700; color: #0F172A; letter-spacing: -0.2px; }
  .card-body { padding: 20px; }

  /* ── ASESOR LAYOUT ── */
  .asesor-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; align-items: start; }

  /* ── MOMENTOS ── */
  .momentos-bar { display: flex; flex-wrap: wrap; gap: 6px; }
  .momento-btn {
    padding: 7px 14px; border-radius: 20px; font-size: 12.5px; font-weight: 600;
    cursor: pointer; border: 1.5px solid #E2E8F0; background: white; color: #475569;
    transition: all 0.2s; font-family: 'DM Sans', sans-serif;
  }
  .momento-btn:hover { border-color: #0BBBEF; color: #0BBBEF; }
  .momento-btn.active { background: #001A7B; border-color: #001A7B; color: white; }

  /* ── PLANTILLAS ── */
  .plantilla-list { display: flex; flex-direction: column; gap: 6px; margin-bottom: 16px; }
  .plantilla-item {
    padding: 10px 14px; border: 1.5px solid #E2E8F0; border-radius: 10px;
    cursor: pointer; transition: all 0.15s;
    display: flex; align-items: center; justify-content: space-between;
  }
  .plantilla-item:hover { border-color: #0BBBEF; background: #F0FBFF; }
  .plantilla-item.active { border-color: #001A7B; background: #EEF2FF; }
  .plantilla-item-name { font-size: 13px; font-weight: 600; color: #374151; }

  /* ── EDITOR ── */
  .mensaje-textarea {
    width: 100%; min-height: 220px; padding: 14px;
    border: 1.5px solid #E2E8F0; border-radius: 10px;
    font-size: 14px; font-family: 'DM Mono', monospace;
    color: #1A1A2E; background: #FAFBFC; resize: vertical;
    transition: border-color 0.2s; outline: none; line-height: 1.6;
  }
  .mensaje-textarea:focus { border-color: #0BBBEF; background: white; }

  /* ── RED PLACEHOLDERS (constructor only) ── */
  .placeholder-red { color: #E53E3E; font-weight: 700; }

  .placeholder-notice {
    display: flex; align-items: flex-start; gap: 8px;
    background: #FFF8E1; border: 1.5px solid #FFD54F;
    border-radius: 8px; padding: 10px 14px; margin: 10px 0;
    font-size: 12.5px; color: #795548; font-weight: 500; line-height: 1.4;
  }

  /* ── iOS PREVIEW ── */
  .iphone-outer {
    background: #E4E4E9;
    border-radius: 42px;
    padding: 10px;
    box-shadow: 0 20px 60px rgba(0,0,0,0.18), 0 4px 12px rgba(0,0,0,0.1), inset 0 0 0 1px rgba(255,255,255,0.5);
    max-width: 300px;
    margin: 0 auto;
  }
  .iphone-frame {
    background: #F2F2F7;
    border-radius: 34px;
    overflow: hidden;
    border: 1px solid #C8C8D0;
  }
  .iphone-statusbar {
    background: #F9F9F9;
    padding: 10px 18px 6px;
    display: flex; align-items: center; justify-content: space-between;
  }
  .iphone-statusbar-time { font-size: 13px; font-weight: 600; color: #1C1C1E; letter-spacing: -0.2px; }
  .iphone-statusbar-icons { display: flex; align-items: center; gap: 4px; font-size: 10px; color: #1C1C1E; font-weight: 600; }

  .iphone-nav {
    background: rgba(249,249,249,0.92);
    border-bottom: 0.5px solid #D1D1D6;
    padding: 8px 14px 10px;
    display: flex; align-items: center; gap: 10px;
    backdrop-filter: blur(10px);
  }
  .iphone-back-btn { font-size: 14px; color: #007AFF; font-weight: 500; display: flex; align-items: center; gap: 2px; white-space: nowrap; }
  .iphone-contact-info { flex: 1; text-align: center; }
  .iphone-contact-avatar {
    width: 34px; height: 34px; border-radius: 50%;
    background: #00377D;
    display: flex; align-items: center; justify-content: center;
    font-size: 14px; font-weight: 700; color: white;
    margin: 0 auto 2px;
  }
  .iphone-contact-name { font-size: 11.5px; font-weight: 600; color: #1C1C1E; line-height: 1; }
  .iphone-nav-actions { display: flex; gap: 12px; color: #007AFF; font-size: 16px; }

  .iphone-chat-bg {
    background: white;
    min-height: 200px;
    padding: 10px 12px 14px;
    position: relative;
  }
  .iphone-date-chip {
    text-align: center;
    font-size: 11px; color: #8E8E93; font-weight: 500;
    background: rgba(142,142,147,0.12);
    display: inline-block; padding: 3px 10px; border-radius: 10px;
    margin: 0 auto 12px; display: block; width: fit-content; margin: 0 auto 12px;
  }
  .iphone-msg-bubble {
    background: #E9E9EB;
    border-radius: 18px 18px 18px 4px;
    padding: 9px 13px 7px;
    max-width: 88%;
    display: inline-block;
    word-break: break-word;
  }
  .iphone-msg-text {
    font-size: 14px; color: #1C1C1E;
    white-space: pre-wrap; line-height: 1.45;
    font-family: -apple-system, 'DM Sans', sans-serif;
  }
  .iphone-msg-text .wa-bold { font-weight: 700; }
  .iphone-msg-time { font-size: 10px; color: #8E8E93; margin-top: 4px; text-align: right; }

  .iphone-input-area {
    background: rgba(249,249,249,0.95);
    border-top: 0.5px solid #D1D1D6;
    padding: 7px 12px 10px;
    display: flex; align-items: center; gap: 8px;
  }
  .iphone-input-pill {
    flex: 1; background: white; border: 1px solid #D1D1D6;
    border-radius: 18px; padding: 7px 12px;
    font-size: 13px; color: #8E8E93;
    font-family: -apple-system, 'DM Sans', sans-serif;
  }
  .iphone-send { width: 28px; height: 28px; border-radius: 50%; background: #00377D; display: flex; align-items: center; justify-content: center; color: white; font-size: 14px; flex-shrink: 0; }

  .copy-btn-big {
    width: 100%; padding: 14px; background: #0BBBEF; color: white;
    border: none; border-radius: 10px; font-size: 14px; font-weight: 700;
    font-family: 'DM Sans', sans-serif; cursor: pointer; transition: all 0.2s;
    letter-spacing: 0.5px; text-transform: uppercase; margin-top: 14px;
  }
  .copy-btn-big:hover { background: #09A8D4; transform: translateY(-1px); box-shadow: 0 6px 20px rgba(11,187,239,0.3); }
  .copy-btn-big:active { transform: translateY(0); }
  .copy-success { background: #09CF82 !important; box-shadow: 0 6px 20px rgba(9,207,130,0.3) !important; }

  /* ── EFECTIVIDAD ── */
  .efectividad-bar-container { margin-bottom: 14px; }
  .efectividad-bar-label { display: flex; justify-content: space-between; font-size: 12.5px; color: #475569; font-weight: 500; margin-bottom: 5px; }
  .efectividad-bar-bg { background: #F1F5F9; border-radius: 100px; height: 8px; overflow: hidden; }
  .efectividad-bar-fill { height: 100%; border-radius: 100px; transition: width 0.8s ease; }
  .efectividad-sugerencias { background: #F0FBFF; border: 1.5px solid #BAE6FD; border-radius: 10px; padding: 12px 14px; margin-top: 12px; }
  .efectividad-sugerencias-title { font-size: 12px; font-weight: 700; color: #0369A1; margin-bottom: 6px; text-transform: uppercase; letter-spacing: 0.4px; }
  .efectividad-sugerencia { font-size: 12.5px; color: #0369A1; margin-bottom: 4px; padding-left: 12px; position: relative; }
  .efectividad-sugerencia::before { content: '›'; position: absolute; left: 0; font-weight: 700; }

  /* ── IA PANEL ── */
  .ia-panel { background: #F8FAFC; border: 1.5px solid #E2E8F0; border-radius: 12px; padding: 16px; margin-top: 12px; }
  .ia-chat-bubble {
    background: #EEF2FF; border-radius: 4px 12px 12px 12px; padding: 12px 14px;
    font-size: 13.5px; color: #1E1B4B; white-space: pre-wrap; line-height: 1.6;
    margin-bottom: 10px; border: 1px solid #C7D2FE;
  }
  .ia-tipo-chip {
    display: inline-flex; align-items: center; gap: 4px;
    background: #F1F5F9; border-radius: 6px; padding: 3px 8px;
    font-size: 11px; color: #475569; font-weight: 600; margin-bottom: 8px;
  }

  /* ── HABILIDADES ── */
  .skill-bar-item { margin-bottom: 12px; }
  .skill-bar-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 4px; }
  .skill-bar-name { font-size: 12.5px; font-weight: 600; color: #374151; }
  .skill-bar-score { font-size: 13px; font-weight: 700; }
  .skill-bar-bg { height: 10px; background: #F1F5F9; border-radius: 5px; overflow: hidden; }
  .skill-bar-fill { height: 100%; border-radius: 5px; transition: width 1s ease; }

  .habilidad-score-circle {
    width: 64px; height: 64px; border-radius: 50%;
    display: flex; align-items: center; justify-content: center;
    font-size: 18px; font-weight: 800; border: 3px solid; flex-shrink: 0;
  }

  /* ── FEEDBACK / MODAL ── */
  .modal-overlay {
    position: fixed; inset: 0; background: rgba(0,0,0,0.52);
    z-index: 200; display: flex; align-items: center; justify-content: center;
    padding: 24px; backdrop-filter: blur(3px);
  }
  .modal {
    background: white; border-radius: 20px; width: 100%;
    max-width: 600px; max-height: 88vh; overflow-y: auto;
    box-shadow: 0 32px 80px rgba(0,0,0,0.25);
  }
  .modal-header {
    padding: 24px 28px 20px; border-bottom: 1px solid #F1F5F9;
    position: sticky; top: 0; background: white; z-index: 1; border-radius: 20px 20px 0 0;
  }
  .modal-title { font-size: 18px; font-weight: 700; color: #0F172A; }
  .modal-subtitle { font-size: 13.5px; color: #64748B; margin-top: 4px; line-height: 1.5; }
  .modal-body { padding: 24px 28px; }
  .modal-footer { padding: 16px 28px 24px; display: flex; gap: 10px; justify-content: flex-end; }

  .survey-question { margin-bottom: 22px; }
  .survey-q-label { font-size: 13.5px; font-weight: 600; color: #1E293B; margin-bottom: 10px; line-height: 1.4; }
  .survey-q-number {
    display: inline-block; background: #001A7B; color: white;
    font-size: 11px; font-weight: 700; width: 22px; height: 22px;
    border-radius: 50%; text-align: center; line-height: 22px; margin-right: 8px;
  }
  .survey-options { display: flex; flex-direction: column; gap: 6px; }
  .survey-option {
    display: flex; align-items: center; gap: 10px; padding: 10px 14px;
    border: 1.5px solid #E2E8F0; border-radius: 8px; cursor: pointer;
    transition: all 0.15s; font-size: 13.5px; color: #374151;
  }
  .survey-option:hover { border-color: #0BBBEF; background: #F0FBFF; }
  .survey-option.selected { border-color: #001A7B; background: #EEF2FF; color: #001A7B; font-weight: 600; }
  .survey-radio { width: 16px; height: 16px; border-radius: 50%; border: 2px solid #CBD5E1; flex-shrink: 0; transition: all 0.15s; }
  .survey-option.selected .survey-radio { border-color: #001A7B; background: #001A7B; box-shadow: inset 0 0 0 3px white; }
  .survey-textarea {
    width: 100%; padding: 12px 14px; border: 1.5px solid #E2E8F0; border-radius: 8px;
    font-size: 13.5px; font-family: 'DM Sans', sans-serif; color: #1A1A2E;
    background: #F8FAFC; resize: vertical; min-height: 80px; outline: none; transition: border-color 0.2s;
  }
  .survey-textarea:focus { border-color: #0BBBEF; background: white; }

  .section-divider { display: flex; align-items: center; gap: 12px; margin: 24px 0; }
  .section-divider-line { flex: 1; height: 1px; background: #E2E8F0; }
  .section-divider-text { font-size: 12px; font-weight: 700; color: #94A3B8; text-transform: uppercase; letter-spacing: 0.6px; white-space: nowrap; }

  /* ── SUGERENCIAS ── */
  .sugerencia-textarea {
    width: 100%; padding: 12px 14px; border: 1.5px solid #E2E8F0; border-radius: 10px;
    font-size: 13.5px; font-family: 'DM Sans', sans-serif; color: #1A1A2E;
    background: #F8FAFC; resize: vertical; min-height: 90px; outline: none; transition: border-color 0.2s;
  }
  .sugerencia-textarea:focus { border-color: #0BBBEF; background: white; }

  /* ── ADMIN ── */
  .admin-tabs {
    display: flex; gap: 4px; background: #F1F5F9;
    border-radius: 12px; padding: 4px; margin-bottom: 24px; flex-wrap: wrap;
  }
  .admin-tab {
    padding: 9px 18px; border-radius: 8px; font-size: 13px; font-weight: 600;
    cursor: pointer; border: none; background: transparent; color: #64748B;
    transition: all 0.15s; font-family: 'DM Sans', sans-serif;
  }
  .admin-tab.active { background: white; color: #001A7B; box-shadow: 0 2px 8px rgba(0,0,0,0.1); }

  .stats-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(160px, 1fr)); gap: 14px; margin-bottom: 24px; }
  .stat-card { background: white; border: 1px solid #E8EDF5; border-radius: 12px; padding: 18px; text-align: center; box-shadow: 0 2px 6px rgba(0,0,0,0.04); }
  .stat-card-number { font-size: 30px; font-weight: 700; letter-spacing: -1px; margin-bottom: 4px; }
  .stat-card-label { font-size: 12px; color: #64748B; font-weight: 500; }
  .stat-card-accent { width: 32px; height: 4px; border-radius: 2px; margin: 6px auto 0; }

  .data-table { width: 100%; border-collapse: collapse; font-size: 13.5px; }
  .data-table th {
    background: #F8FAFC; padding: 10px 14px; text-align: left;
    font-size: 11px; font-weight: 700; color: #94A3B8; text-transform: uppercase;
    letter-spacing: 0.4px; border-bottom: 1px solid #E2E8F0;
  }
  .data-table td { padding: 12px 14px; border-bottom: 1px solid #F1F5F9; color: #374151; }
  .data-table tr:hover td { background: #F8FAFC; }

  .badge { display: inline-block; padding: 3px 9px; border-radius: 12px; font-size: 11.5px; font-weight: 600; }
  .badge-green { background: #D1FAE5; color: #065F46; }
  .badge-blue { background: #EEF2FF; color: #3730A3; }
  .badge-cyan { background: #E0F9FF; color: #0E7490; }

  .chart-bar-horizontal { display: flex; align-items: center; gap: 10px; margin-bottom: 10px; }
  .chart-bar-label { font-size: 12px; color: #64748B; width: 100px; flex-shrink: 0; }
  .chart-bar-track { flex: 1; height: 16px; background: #F1F5F9; border-radius: 4px; overflow: hidden; }
  .chart-bar-fill { height: 100%; border-radius: 4px; display: flex; align-items: center; padding-left: 8px; }
  .chart-bar-fill span { font-size: 11px; font-weight: 700; color: white; }

  .momento-usage-item { display: flex; align-items: center; gap: 10px; margin-bottom: 8px; }
  .momento-usage-name { font-size: 12.5px; color: #475569; width: 150px; flex-shrink: 0; }
  .momento-usage-bar { flex: 1; height: 10px; background: #F1F5F9; border-radius: 5px; overflow: hidden; }
  .momento-usage-fill { height: 100%; border-radius: 5px; }
  .momento-usage-count { font-size: 12px; font-weight: 700; color: #374151; width: 36px; text-align: right; }

  /* ── TOAST ── */
  .success-toast {
    position: fixed; bottom: 24px; right: 24px;
    background: #09CF82; color: white; padding: 12px 20px;
    border-radius: 10px; font-size: 14px; font-weight: 600;
    box-shadow: 0 8px 24px rgba(9,207,130,0.3); z-index: 300;
    animation: slideInToast 0.3s ease;
  }
  @keyframes slideInToast { from { transform: translateX(80px); opacity: 0; } to { transform: translateX(0); opacity: 1; } }

  /* ── RESPONSIVE ── */
  @media (max-width: 960px) {
    .asesor-grid { grid-template-columns: 1fr; }
    .sidebar { display: none; }
    .stats-grid { grid-template-columns: repeat(2, 1fr); }
  }
  @media (max-width: 600px) {
    .login-card { padding: 32px 22px; }
    .content-area { padding: 14px; }
    .topbar { padding: 0 14px; }
    .topbar-logo span { display: none; }
    .stats-grid { grid-template-columns: 1fr; }
    .modal { max-height: 92vh; }
    .admin-tab { padding: 8px 12px; font-size: 12px; }
    .card-body { padding: 14px; }
  }
`;

// ─── COMPONENTS ───────────────────────────────────────────────────────────────

function LoginPage({ onLogin }) {
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");

  const preview = username.trim().toLowerCase();
  const isKnown = preview && USER_MAP[preview] !== undefined;
  const isAdmin = preview === "tpatinru";
  const lider = isKnown ? USER_MAP[preview] : null;

  const handleLogin = () => {
    const u = username.trim().toLowerCase();
    if (!u) { setError("Por favor ingresa tu usuario."); return; }
    if (!USER_MAP[u]) { setError("Usuario no encontrado. Verifica e intenta de nuevo."); return; }
    onLogin(u, u === "tpatinru" ? "admin" : "asesor", USER_MAP[u]);
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <div className="login-logo">
          <div className="login-logo-icon">💬</div>
          <div>
            <div className="login-logo-text">Facilitador Chat</div>
            <div className="login-logo-sub">Tigo · Herramienta comercial</div>
          </div>
        </div>
        <div className="login-title">Bienvenido</div>
        <div className="login-subtitle">Ingresa con tu usuario para comenzar</div>

        {error && <div className="error-msg">⚠️ {error}</div>}

        <div className="form-group">
          <label className="form-label">Usuario</label>
          <input
            className="form-input"
            type="text"
            placeholder="Ej: jpabong"
            value={username}
            onChange={e => { setUsername(e.target.value); setError(""); }}
            onKeyDown={e => e.key === "Enter" && handleLogin()}
            autoFocus
          />
        </div>

        {isKnown && (
          <div className="user-preview">
            <div className="user-preview-avatar">{preview.slice(0, 2).toUpperCase()}</div>
            <div>
              <div className="user-preview-name">{preview} {isAdmin && "🔑"}</div>
              <div className="user-preview-role">
                {isAdmin ? "Administrador del sistema" : `Equipo: ${lider}`}
              </div>
            </div>
          </div>
        )}

        <button className="btn-primary" onClick={handleLogin}>Ingresar →</button>

        <div style={{ marginTop: 20, padding: "12px 14px", background: "#F8FAFC", borderRadius: 8, fontSize: 12, color: "#94A3B8", lineHeight: 1.5 }}>
          <strong style={{ color: "#64748B" }}>Usuarios de prueba:</strong><br />
          jpabong, nmunores, amartpal, tpatinru (admin)
        </div>
      </div>
    </div>
  );
}

// ── iOS Preview ────────────────────────────────────────────────────────────────
function IphonePreview({ text }) {
  const parts = formatWAText(text || "");
  const now = new Date();
  const timeStr = `${now.getHours()}:${String(now.getMinutes()).padStart(2, "0")}`;
  const dateLabel = now.toLocaleDateString("es-CO", { weekday: "long", day: "numeric", month: "long" });

  return (
    <div className="iphone-outer">
      <div className="iphone-frame">
        {/* Status bar */}
        <div className="iphone-statusbar">
          <span className="iphone-statusbar-time">{timeStr}</span>
          <div className="iphone-statusbar-icons">
            <span>●●●</span>
            <span style={{ marginLeft: 4 }}>Wi-Fi</span>
            <span style={{ marginLeft: 4 }}>🔋</span>
          </div>
        </div>

        {/* Nav bar */}
        <div className="iphone-nav">
          <div className="iphone-back-btn">‹ Chats</div>
          <div className="iphone-contact-info">
            <div className="iphone-contact-avatar">T</div>
            <div className="iphone-contact-name">Tigo Chat</div>
          </div>
          <div className="iphone-nav-actions">
            <span>📞</span>
            <span style={{ fontSize: 18 }}>⋯</span>
          </div>
        </div>

        {/* Chat area */}
        <div className="iphone-chat-bg">
          <div className="iphone-date-chip">
            {dateLabel.charAt(0).toUpperCase() + dateLabel.slice(1)}
          </div>
          {text ? (
            <div>
              <div className="iphone-msg-bubble">
                <div className="iphone-msg-text">
                  {parts.map((p, i) => {
                    // In preview: placeholders shown as normal text (no red)
                    if (p.type === "placeholder") return <span key={i}>{p.content}</span>;
                    if (p.type === "bold") return <strong key={i} className="wa-bold">{p.content}</strong>;
                    return <span key={i}>{p.content}</span>;
                  })}
                </div>
              </div>
              <div className="iphone-msg-time">{timeStr}</div>
            </div>
          ) : (
            <div style={{ textAlign: "center", padding: "32px 0", color: "#8E8E93", fontSize: 13 }}>
              Selecciona una plantilla para ver la vista previa
            </div>
          )}
        </div>

        {/* Input bar */}
        <div className="iphone-input-area">
          <span style={{ fontSize: 20, color: "#007AFF", lineHeight: 1 }}>+</span>
          <div className="iphone-input-pill">Mensaje</div>
          <div className="iphone-send">↑</div>
        </div>
      </div>
    </div>
  );
}

// ── Efectividad ────────────────────────────────────────────────────────────────
function Efectividad({ text }) {
  const { tono, persuasion, cierre, sugerencias } = calcEfectividad(text);
  const bars = [
    { label: "Tono comercial y empático", val: tono, color: C.cian },
    { label: "Persuasión comercial", val: persuasion, color: C.morado },
    { label: "Enfoque al cierre", val: cierre, color: C.menta },
  ];
  return (
    <div>
      {bars.map(b => (
        <div key={b.label} className="efectividad-bar-container">
          <div className="efectividad-bar-label">
            <span>{b.label}</span>
            <span style={{ fontWeight: 700, color: b.color }}>{b.val}%</span>
          </div>
          <div className="efectividad-bar-bg">
            <div className="efectividad-bar-fill" style={{ width: `${b.val}%`, background: b.color }} />
          </div>
        </div>
      ))}
      {sugerencias.length > 0 && (
        <div className="efectividad-sugerencias">
          <div className="efectividad-sugerencias-title">💡 Sugerencias de mejora</div>
          {sugerencias.map((s, i) => (
            <div key={i} className="efectividad-sugerencia">{s}</div>
          ))}
        </div>
      )}
    </div>
  );
}

// ── IA Panel ───────────────────────────────────────────────────────────────────
function IAPanel({ onInsert }) {
  const [clientMsg, setClientMsg] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const tipo = clientMsg.trim() ? detectarTipo(clientMsg) : null;

  const generate = async () => {
    if (!clientMsg.trim()) return;
    setLoading(true);
    setResponse("");

    const tipoDetectado = detectarTipo(clientMsg);
    const baseRespuesta = BIBLIOTECA[tipoDetectado] || BIBLIOTECA.generico;

    const prompt = `Eres un asistente IA para asesores comerciales de Tigo Colombia.

MENSAJE DEL CLIENTE:
"${clientMsg}"

RESPUESTA BASE DE LA BIBLIOTECA (úsala como guía, no la copies literal):
${baseRespuesta}

REGLAS ESTRICTAS:
- Máximo 70 palabras en total
- Tono cercano, empático y comercial en español colombiano
- Negritas con *asteriscos* solo para lo más importante
- Máximo 3 emojis, solo si aportan
- Cierra siempre con pregunta directa o llamado a la acción
- No saludes, no te presentes, ve al punto
- Sé breve, útil y orientado al cierre

Responde ÚNICAMENTE con el mensaje. Sin explicaciones, sin comillas, sin preamble.`;

    try {
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 300,
          messages: [{ role: "user", content: prompt }],
        }),
      });
      const data = await res.json();
      const text = data.content?.map(c => c.text || "").join("").trim() || "";
      setResponse(text || baseRespuesta);
    } catch {
      setResponse(baseRespuesta);
    }
    setLoading(false);
  };

  return (
    <div className="ia-panel">
      <div style={{ fontWeight: 700, fontSize: 13, color: "#374151", marginBottom: 3 }}>🤖 Asistente IA guiado</div>
      <div style={{ fontSize: 12, color: "#94A3B8", marginBottom: 10, lineHeight: 1.4 }}>
        Pega el mensaje del cliente. La IA responde con base en la biblioteca de objeciones, máx. 70 palabras.
      </div>

      <textarea
        className="mensaje-textarea"
        style={{ minHeight: 72, fontFamily: "'DM Sans', sans-serif", fontSize: 13 }}
        placeholder="Ej: Lo debo pensar... / Está muy caro / Lo quiero consultar con mi esposa..."
        value={clientMsg}
        onChange={e => { setClientMsg(e.target.value); setResponse(""); }}
      />

      {tipo && (
        <div style={{ marginTop: 5, marginBottom: 5 }}>
          <span className="ia-tipo-chip">
            🏷 Caso detectado: {TIPO_LABELS[tipo] || "General"}
          </span>
        </div>
      )}

      <div style={{ display: "flex", gap: 8, marginTop: 6 }}>
        <button className="btn-cian" onClick={generate} disabled={loading || !clientMsg.trim()} style={{ flex: 1 }}>
          {loading ? "Generando..." : "✨ Generar respuesta"}
        </button>
        {response && (
          <button className="btn-ghost" onClick={generate} disabled={loading} title="Regenerar">🔄</button>
        )}
      </div>

      {response && (
        <div style={{ marginTop: 12 }}>
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, color: "#94A3B8", marginBottom: 5 }}>
            <span>💬 Respuesta sugerida</span>
            <span>{response.trim().split(/\s+/).length} palabras</span>
          </div>
          <div className="ia-chat-bubble">{response}</div>
          <button className="btn-dark" onClick={() => onInsert(response)} style={{ width: "100%" }}>
            Enviar al constructor →
          </button>
        </div>
      )}
    </div>
  );
}

// ── Habilidades ────────────────────────────────────────────────────────────────
function HabilidadesIndex({ user }) {
  const skills = MOCK_SKILLS[user] || { tono: 75, persuasion: 78, cierre: 70 };
  const avg = Math.round((skills.tono + skills.persuasion + skills.cierre) / 3);
  const getColor = v => v >= 85 ? C.menta : v >= 70 ? C.cian : "#F59E0B";
  const getLabel = v => v >= 85 ? "Excelente" : v >= 70 ? "Bueno" : "En desarrollo";

  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 16, padding: 14, background: "#F8FAFC", borderRadius: 10 }}>
        <div className="habilidad-score-circle" style={{ borderColor: getColor(avg), color: getColor(avg) }}>{avg}</div>
        <div>
          <div style={{ fontSize: 14, fontWeight: 700, color: "#0F172A" }}>Índice conversacional</div>
          <div style={{ fontSize: 12, color: "#64748B", marginTop: 2 }}>Basado en tus últimas interacciones</div>
          <div style={{ fontSize: 12, fontWeight: 700, color: getColor(avg), marginTop: 4 }}>{getLabel(avg)}</div>
        </div>
      </div>
      {[
        { label: "Tono comercial y empático", val: skills.tono },
        { label: "Persuasión comercial", val: skills.persuasion },
        { label: "Enfoque al cierre", val: skills.cierre },
      ].map(s => (
        <div key={s.label} className="skill-bar-item">
          <div className="skill-bar-header">
            <span className="skill-bar-name">{s.label}</span>
            <span className="skill-bar-score" style={{ color: getColor(s.val) }}>{s.val}%</span>
          </div>
          <div className="skill-bar-bg">
            <div className="skill-bar-fill" style={{ width: `${s.val}%`, background: getColor(s.val) }} />
          </div>
        </div>
      ))}
    </div>
  );
}

// ── Sugerencias panel ──────────────────────────────────────────────────────────
function SugerenciasPanel({ user, lider }) {
  const [text, setText] = useState("");
  const [sent, setSent] = useState(false);

  const send = () => {
    if (!text.trim()) return;
    const list = getStoredData("fc_sugerencias", []);
    list.push({ user, lider, ts: new Date().toISOString(), texto: text.trim() });
    storeData("fc_sugerencias", list);
    setText("");
    setSent(true);
    setTimeout(() => setSent(false), 2500);
  };

  return (
    <div>
      <textarea
        className="sugerencia-textarea"
        placeholder="Escribe aquí tus sugerencias para mejorar el Facilitador Chat..."
        value={text}
        onChange={e => setText(e.target.value)}
      />
      <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 8 }}>
        <button className="btn-cian" onClick={send} disabled={!text.trim()}>
          {sent ? "✅ Enviada" : "Enviar sugerencia"}
        </button>
      </div>
    </div>
  );
}

// ── Feedback modal ─────────────────────────────────────────────────────────────
function FeedbackModal({ user, lider, onClose }) {
  const [step, setStep] = useState("intro");
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const setAnswer = (q, val) => setAnswers(p => ({ ...p, [q]: val }));

  const submit = () => {
    const surveys = getStoredData("fc_surveys", []);
    surveys.push({ user, lider, ts: new Date().toISOString(), answers });
    storeData("fc_surveys", surveys);
    setSubmitted(true);
  };

  if (submitted) return (
    <div className="modal-overlay">
      <div className="modal" style={{ maxWidth: 440, textAlign: "center" }}>
        <div style={{ padding: "48px 32px" }}>
          <div style={{ fontSize: 56, marginBottom: 16 }}>🙌</div>
          <div style={{ fontSize: 20, fontWeight: 700, color: "#0F172A", marginBottom: 8 }}>¡Gracias por tu feedback!</div>
          <div style={{ fontSize: 14, color: "#64748B", lineHeight: 1.6, marginBottom: 24 }}>Tu opinión es muy valiosa para mejorar esta herramienta.</div>
          <button className="btn-cian" onClick={onClose}>Cerrar</button>
        </div>
      </div>
    </div>
  );

  if (step === "intro") return (
    <div className="modal-overlay">
      <div className="modal" style={{ maxWidth: 500 }}>
        <div className="modal-header">
          <div className="modal-title">💬 Compartir feedback</div>
          <div className="modal-subtitle">
            ¡Gracias por probar el prototipo! Tu opinión es muy importante para nosotros. Nos encantaría conocer tu experiencia usando el Facilitador de WhatsApp: qué te pareció útil, qué fue fácil o difícil, y qué sugerencias tienes para mejorarlo.
          </div>
        </div>
        <div className="modal-footer">
          <button className="btn-ghost" onClick={onClose}>Cancelar</button>
          <button className="btn-cian" onClick={() => setStep("survey")}>Responder encuesta →</button>
        </div>
      </div>
    </div>
  );

  const OPTS_UTILIDAD = ["5 Muy útil / Muy valiosa para mi trabajo", "4 Útil", "3 Moderadamente útil", "2 Poco útil", "1 Nada útil para mi trabajo"];
  const OPTS_FACILIDAD = ["5 Muy fácil / Muy intuitiva", "4 Fácil de usar", "3 Ni fácil ni difícil", "2 Algo difícil", "1 Muy difícil de entender"];
  const OPTS_USARIA = ["Sí, definitivamente", "Probablemente sí", "No estoy seguro", "Probablemente no", "No"];

  return (
    <div className="modal-overlay">
      <div className="modal">
        <div className="modal-header">
          <div className="modal-title">📋 Encuesta de usabilidad</div>
          <div className="modal-subtitle">Sección 1 de 2 · Evaluación del prototipo</div>
        </div>
        <div className="modal-body">
          <div className="survey-question">
            <div className="survey-q-label"><span className="survey-q-number">1</span>Déjanos tu documento de identidad</div>
            <input className="form-input" placeholder="Número de documento" value={answers.doc || ""} onChange={e => setAnswer("doc", e.target.value)} />
          </div>

          {[
            { key: "utilidad", num: 2, label: "¿Qué tan útil crees que sería esta herramienta para tu trabajo diario?", opts: OPTS_UTILIDAD },
            { key: "facilidad", num: 3, label: "¿Qué tan fácil fue entender cómo usar la herramienta?", opts: OPTS_FACILIDAD },
            { key: "usaria", num: 4, label: "Si tuvieras esta herramienta hoy, ¿la usarías en tu trabajo diario?", opts: OPTS_USARIA },
          ].map(q => (
            <div key={q.key} className="survey-question">
              <div className="survey-q-label"><span className="survey-q-number">{q.num}</span>{q.label}</div>
              <div className="survey-options">
                {q.opts.map(o => (
                  <div key={o} className={`survey-option ${answers[q.key] === o ? "selected" : ""}`} onClick={() => setAnswer(q.key, o)}>
                    <div className="survey-radio" /><span>{o}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}

          <div className="section-divider">
            <div className="section-divider-line" />
            <div className="section-divider-text">Sección 2 · Experiencia</div>
            <div className="section-divider-line" />
          </div>

          {[
            { key: "confusio", n: 5, q: "¿En qué momento del flujo te sentiste más confundido o tuviste dudas?" },
            { key: "faltante", n: 6, q: "¿Hubo algo que esperabas que la herramienta hiciera y no encontraste?" },
            { key: "cambio", n: 7, q: "Si esta herramienta existiera hoy, ¿qué le cambiarías?" },
            { key: "adicional", n: 8, q: "¿Qué funcionalidad o ayuda adicional te gustaría que tuviera?" },
          ].map(item => (
            <div key={item.key} className="survey-question">
              <div className="survey-q-label"><span className="survey-q-number">{item.n}</span>{item.q}</div>
              <textarea className="survey-textarea" placeholder="Escribe aquí..." value={answers[item.key] || ""} onChange={e => setAnswer(item.key, e.target.value)} />
            </div>
          ))}
        </div>
        <div className="modal-footer">
          <button className="btn-ghost" onClick={onClose}>Cancelar</button>
          <button className="btn-cian" onClick={submit}>Enviar →</button>
        </div>
      </div>
    </div>
  );
}

// ── Admin Module ───────────────────────────────────────────────────────────────
function AdminModule() {
  const [tab, setTab] = useState("dashboard");
  const sugerencias = getStoredData("fc_sugerencias", []);
  const surveys = getStoredData("fc_surveys", []);

  const users = Object.entries(USER_MAP).filter(([u]) => u !== "tpatinru" && u !== "otro");
  const totalPlantillas = Object.values(MOCK_USAGE).reduce((s, u) => s + u.plantillas, 0);
  const totalIA = Object.values(MOCK_USAGE).reduce((s, u) => s + u.ia, 0);

  const exportCSV = (data, filename) => {
    if (!data.length) return;
    const keys = Object.keys(data[0]);
    const rows = [keys.join(","), ...data.map(r => keys.map(k => JSON.stringify(String(r[k] || ""))).join(","))];
    const blob = new Blob([rows.join("\n")], { type: "text/csv;charset=utf-8;" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = filename;
    a.click();
  };

  const momentoTotals = Object.values(MOCK_USAGE).reduce((acc, u) => {
    Object.entries(u.momentos).forEach(([k, v]) => { acc[k] = (acc[k] || 0) + v; });
    return acc;
  }, {});
  const maxMomento = Math.max(...Object.values(momentoTotals));

  return (
    <div>
      <div style={{ marginBottom: 20 }}>
        <div style={{ fontSize: 22, fontWeight: 700, color: "#0F172A", letterSpacing: -0.5 }}>Panel Administrador</div>
        <div style={{ fontSize: 13, color: "#64748B", marginTop: 3 }}>Vista exclusiva · tpatinru</div>
      </div>

      <div className="admin-tabs">
        {[{ id: "dashboard", label: "📊 Dashboard" }, { id: "usuarios", label: "👥 Usuarios" }, { id: "feedback", label: "💬 Feedback" }].map(t => (
          <button key={t.id} className={`admin-tab ${tab === t.id ? "active" : ""}`} onClick={() => setTab(t.id)}>{t.label}</button>
        ))}
      </div>

      {tab === "dashboard" && (
        <div>
          <div className="stats-grid">
            {[
              { label: "Plantillas generadas", val: totalPlantillas, color: C.cian },
              { label: "Respuestas IA", val: totalIA, color: C.morado },
              { label: "Asesores activos", val: 7, color: C.menta },
              { label: "Sugerencias recibidas", val: sugerencias.length, color: C.limon },
              { label: "Encuestas completadas", val: surveys.length, color: C.azul },
              { label: "Equipos", val: 2, color: "#F59E0B" },
            ].map(s => (
              <div key={s.label} className="stat-card">
                <div className="stat-card-number" style={{ color: s.color }}>{s.val}</div>
                <div className="stat-card-label">{s.label}</div>
                <div className="stat-card-accent" style={{ background: s.color }} />
              </div>
            ))}
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
            <div className="card">
              <div className="card-header"><div className="card-title">Uso por momento</div></div>
              <div className="card-body">
                {MOMENTOS.map(m => (
                  <div key={m.id} className="momento-usage-item">
                    <div className="momento-usage-name" style={{ fontSize: 12 }}>{m.label}</div>
                    <div className="momento-usage-bar">
                      <div className="momento-usage-fill" style={{ width: `${((momentoTotals[m.id] || 0) / maxMomento) * 100}%`, background: C.cian }} />
                    </div>
                    <div className="momento-usage-count">{momentoTotals[m.id] || 0}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="card">
              <div className="card-header"><div className="card-title">Ranking asesores</div></div>
              <div className="card-body">
                {Object.entries(MOCK_USAGE).sort((a, b) => b[1].plantillas - a[1].plantillas).map(([u, d], i) => (
                  <div key={u} className="chart-bar-horizontal">
                    <div className="chart-bar-label" style={{ fontWeight: i < 3 ? 700 : 400 }}>
                      {["🥇", "🥈", "🥉"][i] || `${i + 1}.`} {u}
                    </div>
                    <div className="chart-bar-track">
                      <div className="chart-bar-fill" style={{ width: `${(d.plantillas / 63) * 100}%`, background: i === 0 ? C.menta : C.cian }}>
                        <span>{d.plantillas}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
            <div className="card">
              <div className="card-header"><div className="card-title">Ranking por equipo</div></div>
              <div className="card-body">
                {[
                  { nombre: "YORDYN HERNANDEZ REYES", total: 213, asesores: 14 },
                  { nombre: "KAREN ALEXA VALENCIA COSSIO", total: 134, asesores: 9 },
                ].map((e, i) => (
                  <div key={e.nombre} style={{ padding: "12px 0", borderBottom: i === 0 ? "1px solid #F1F5F9" : "none" }}>
                    <div style={{ fontWeight: 700, fontSize: 13, color: "#0F172A", marginBottom: 4 }}>
                      {["🥇", "🥈"][i]} {e.nombre}
                    </div>
                    <div style={{ display: "flex", gap: 16, fontSize: 12, color: "#64748B" }}>
                      <span>📊 {e.total} interacciones</span>
                      <span>👥 {e.asesores} asesores</span>
                    </div>
                    <div style={{ marginTop: 6, height: 6, background: "#F1F5F9", borderRadius: 3, overflow: "hidden" }}>
                      <div style={{ height: "100%", width: `${(e.total / 347) * 100}%`, background: i === 0 ? C.menta : C.cian, borderRadius: 3 }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="card">
              <div className="card-header"><div className="card-title">Desempeño conversacional</div></div>
              <div className="card-body">
                {Object.entries(MOCK_SKILLS).map(([u, s]) => {
                  const avg = Math.round((s.tono + s.persuasion + s.cierre) / 3);
                  const color = avg >= 85 ? C.menta : avg >= 75 ? C.cian : "#F59E0B";
                  return (
                    <div key={u} style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
                      <div style={{ width: 32, height: 32, borderRadius: "50%", background: color, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 700, color: "white", flexShrink: 0 }}>{avg}</div>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontSize: 12.5, fontWeight: 600, color: "#374151", marginBottom: 2 }}>{u}</div>
                        <div style={{ height: 6, background: "#F1F5F9", borderRadius: 3, overflow: "hidden" }}>
                          <div style={{ height: "100%", width: `${avg}%`, background: color, borderRadius: 3 }} />
                        </div>
                      </div>
                      <span style={{ fontSize: 11, color: "#94A3B8", width: 72, textAlign: "right" }}>{avg >= 85 ? "Excelente" : avg >= 75 ? "Bueno" : "En desarrollo"}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}

      {tab === "usuarios" && (
        <div className="card">
          <div className="card-header">
            <div className="card-title">Gestión de usuarios ({users.length})</div>
            <button className="btn-cian" style={{ fontSize: 12 }}>+ Nuevo usuario</button>
          </div>
          <div style={{ overflowX: "auto" }}>
            <table className="data-table">
              <thead>
                <tr><th>Usuario</th><th>Líder</th><th>Plantillas</th><th>IA</th><th>Índice</th><th>Estado</th><th></th></tr>
              </thead>
              <tbody>
                {users.map(([u, l]) => {
                  const uso = MOCK_USAGE[u] || { plantillas: 0, ia: 0 };
                  const skill = MOCK_SKILLS[u];
                  const avg = skill ? Math.round((skill.tono + skill.persuasion + skill.cierre) / 3) : null;
                  const color = avg ? (avg >= 85 ? C.menta : avg >= 75 ? C.cian : "#F59E0B") : "#94A3B8";
                  return (
                    <tr key={u}>
                      <td><strong>{u}</strong></td>
                      <td style={{ fontSize: 12, color: "#64748B", maxWidth: 160 }}>{l}</td>
                      <td>{uso.plantillas || 0}</td>
                      <td>{uso.ia || 0}</td>
                      <td>{avg ? <span style={{ fontWeight: 700, color }}>{avg}%</span> : <span style={{ color: "#94A3B8" }}>—</span>}</td>
                      <td><span className="badge badge-green">Activo</span></td>
                      <td><button className="btn-ghost" style={{ fontSize: 12, padding: "4px 10px" }}>Editar</button></td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {tab === "feedback" && (
        <div>
          <div className="card" style={{ marginBottom: 16 }}>
            <div className="card-header">
              <div className="card-title">Sugerencias de asesores ({sugerencias.length})</div>
              <button className="btn-ghost" style={{ fontSize: 12 }} onClick={() => exportCSV(sugerencias, "sugerencias.csv")}>⬇ Exportar CSV</button>
            </div>
            <div style={{ overflowX: "auto" }}>
              <table className="data-table">
                <thead><tr><th>Asesor</th><th>Líder</th><th>Fecha</th><th>Sugerencia</th></tr></thead>
                <tbody>
                  {sugerencias.length === 0 ? (
                    <tr><td colSpan={4} style={{ textAlign: "center", color: "#94A3B8", padding: 24 }}>No hay sugerencias aún.</td></tr>
                  ) : sugerencias.map((s, i) => (
                    <tr key={i}>
                      <td><strong>{s.user}</strong></td>
                      <td style={{ fontSize: 12, color: "#64748B" }}>{s.lider}</td>
                      <td style={{ fontSize: 12, color: "#94A3B8" }}>{new Date(s.ts).toLocaleString("es-CO")}</td>
                      <td>{s.texto}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="card">
            <div className="card-header">
              <div className="card-title">Encuestas de usabilidad ({surveys.length})</div>
              <button className="btn-ghost" style={{ fontSize: 12 }} onClick={() => exportCSV(surveys.map(s => ({ usuario: s.user, lider: s.lider, fecha: s.ts, ...s.answers })), "encuestas.csv")}>⬇ Exportar CSV</button>
            </div>
            <div style={{ overflowX: "auto" }}>
              <table className="data-table">
                <thead><tr><th>Asesor</th><th>Utilidad</th><th>Facilidad</th><th>¿Lo usaría?</th><th>Fecha</th></tr></thead>
                <tbody>
                  {surveys.length === 0 ? (
                    <tr><td colSpan={5} style={{ textAlign: "center", color: "#94A3B8", padding: 24 }}>No hay encuestas aún.</td></tr>
                  ) : surveys.map((s, i) => (
                    <tr key={i}>
                      <td><strong>{s.user}</strong></td>
                      <td style={{ fontSize: 12 }}>{s.answers?.utilidad || "—"}</td>
                      <td style={{ fontSize: 12 }}>{s.answers?.facilidad || "—"}</td>
                      <td style={{ fontSize: 12 }}>{s.answers?.usaria || "—"}</td>
                      <td style={{ fontSize: 12, color: "#94A3B8" }}>{new Date(s.ts).toLocaleString("es-CO")}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ── Asesor Module ──────────────────────────────────────────────────────────────
function AsesorModule({ user, lider }) {
  const [momento, setMomento] = useState("saludo");
  const [plantillaIdx, setPlantillaIdx] = useState(0);
  const [mensaje, setMensaje] = useState(PLANTILLAS.saludo[0].texto);
  const [copySuccess, setCopySuccess] = useState(false);
  const [showIA, setShowIA] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);
  const [toast, setToast] = useState("");

  const showToast = msg => { setToast(msg); setTimeout(() => setToast(""), 2500); };

  const selectMomento = m => {
    setMomento(m);
    setPlantillaIdx(0);
    setMensaje(PLANTILLAS[m][0].texto);
  };

  const selectPlantilla = idx => {
    setPlantillaIdx(idx);
    setMensaje(PLANTILLAS[momento][idx].texto);
  };

  const copyMessage = () => {
    navigator.clipboard.writeText(mensaje).then(() => {
      setCopySuccess(true);
      showToast("✅ Mensaje copiado al portapapeles");
      setTimeout(() => setCopySuccess(false), 2000);
    }).catch(() => showToast("Selecciona y copia el mensaje manualmente."));
  };

  const insertIAResponse = text => {
    setMensaje(text);
    setShowIA(false);
    showToast("✅ Respuesta insertada en el constructor");
  };

  const hasPlaceholders = /\[[^\]]+\]/.test(mensaje);

  // Render highlighted textarea (red placeholders only in constructor)
  const renderConstructorPreview = () => {
    // We use a real textarea for editing; placeholders highlighted via warning notice
    // The red styling is communicated via the notice banner, not inline in textarea
    return null;
  };

  return (
    <div>
      {/* Momentos bar */}
      <div className="card" style={{ marginBottom: 16 }}>
        <div className="card-body" style={{ paddingTop: 14, paddingBottom: 14 }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: "#94A3B8", textTransform: "uppercase", letterSpacing: 0.6, marginBottom: 10 }}>
            Momento conversacional
          </div>
          <div className="momentos-bar">
            {MOMENTOS.map(m => (
              <button key={m.id} className={`momento-btn ${momento === m.id ? "active" : ""}`} onClick={() => selectMomento(m.id)}>
                {m.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="asesor-grid">
        {/* COLUMNA IZQUIERDA */}
        <div>
          <div className="card" style={{ marginBottom: 16 }}>
            <div className="card-header">
              <div className="card-title">✏️ Constructor de mensaje</div>
              <button className="btn-ghost" style={{ fontSize: 12 }} onClick={() => setShowIA(!showIA)}>
                {showIA ? "Ocultar IA" : "🤖 Usar IA"}
              </button>
            </div>
            <div className="card-body">
              <div style={{ fontSize: 11, fontWeight: 700, color: "#94A3B8", textTransform: "uppercase", letterSpacing: 0.5, marginBottom: 8 }}>
                Plantillas sugeridas
              </div>
              <div className="plantilla-list">
                {PLANTILLAS[momento].map((p, i) => (
                  <div key={p.id} className={`plantilla-item ${plantillaIdx === i ? "active" : ""}`} onClick={() => selectPlantilla(i)}>
                    <span className="plantilla-item-name">{p.nombre}</span>
                    {plantillaIdx === i && <span style={{ color: C.azul, fontWeight: 700 }}>✓</span>}
                  </div>
                ))}
              </div>

              {hasPlaceholders && (
                <div className="placeholder-notice">
                  <span style={{ flexShrink: 0 }}>⚠️</span>
                  <span>Todo lo que aparece entre corchetes como <span className="placeholder-red">[nombre asesor]</span>, <span className="placeholder-red">[$PRECIO]</span>, etc. debe personalizarse <strong>antes de enviar</strong>.</span>
                </div>
              )}

              <textarea
                className="mensaje-textarea"
                value={mensaje}
                onChange={e => setMensaje(e.target.value)}
                placeholder="Escribe o edita el mensaje aquí..."
              />

              <div style={{ display: "flex", gap: 8, marginTop: 10 }}>
                <button className="btn-ghost" style={{ fontSize: 12 }} onClick={() => setMensaje(PLANTILLAS[momento][plantillaIdx].texto)}>
                  🔄 Restaurar
                </button>
                <button className="btn-ghost" style={{ fontSize: 12 }} onClick={() => setMensaje("")}>
                  🗑 Limpiar
                </button>
              </div>

              {showIA && <IAPanel onInsert={insertIAResponse} />}
            </div>
          </div>

          <div className="card" style={{ marginBottom: 16 }}>
            <div className="card-header"><div className="card-title">📊 Efectividad del mensaje</div></div>
            <div className="card-body">
              {mensaje
                ? <Efectividad text={mensaje} />
                : <div style={{ textAlign: "center", color: "#94A3B8", fontSize: 13, padding: "16px 0" }}>Escribe un mensaje para ver el análisis</div>
              }
            </div>
          </div>

          <div className="card" style={{ marginBottom: 16 }}>
            <div className="card-header"><div className="card-title">🧠 Índice de habilidades conversacionales</div></div>
            <div className="card-body"><HabilidadesIndex user={user} /></div>
          </div>

          <div className="card">
            <div className="card-header"><div className="card-title">💡 Sugerencias del Facilitador</div></div>
            <div className="card-body">
              <div style={{ fontSize: 13, color: "#64748B", marginBottom: 12 }}>
                ¿Tienes una idea para mejorar esta herramienta? Compártela aquí.
              </div>
              <SugerenciasPanel user={user} lider={lider} />
            </div>
          </div>
        </div>

        {/* COLUMNA DERECHA */}
        <div>
          <div className="card" style={{ marginBottom: 16, position: "sticky", top: 80 }}>
            <div className="card-header">
              <div className="card-title">📱 Vista previa del mensaje</div>
              <span className="badge badge-cyan">Live</span>
            </div>
            <div className="card-body">
              <IphonePreview text={mensaje} />
              <button
                className={`copy-btn-big ${copySuccess ? "copy-success" : ""}`}
                onClick={copyMessage}
              >
                {copySuccess ? "✅ ¡COPIADO!" : "📋 COPIAR MENSAJE"}
              </button>
            </div>
          </div>

          <div className="card">
            <div className="card-body" style={{ textAlign: "center" }}>
              <div style={{ fontSize: 14, fontWeight: 600, color: "#374151", marginBottom: 6 }}>¿Probaste el Facilitador?</div>
              <div style={{ fontSize: 12.5, color: "#64748B", marginBottom: 14, lineHeight: 1.5 }}>
                Comparte tu experiencia con el equipo de diseño.
              </div>
              <button className="btn-outline" onClick={() => setShowFeedback(true)}>
                💬 Compartir feedback
              </button>
            </div>
          </div>
        </div>
      </div>

      {showFeedback && <FeedbackModal user={user} lider={lider} onClose={() => setShowFeedback(false)} />}
      {toast && <div className="success-toast">{toast}</div>}
    </div>
  );
}

// ─── APP ROOT ─────────────────────────────────────────────────────────────────

export default function App() {
  const [session, setSession] = useState(null);

  const login = (user, role, lider) => setSession({ user, role, lider });
  const logout = () => setSession(null);

  const isAdmin = session?.role === "admin";
  const initials = session ? session.user.slice(0, 2).toUpperCase() : "";

  return (
    <>
      <style>{CSS}</style>

      {!session ? (
        <LoginPage onLogin={login} />
      ) : (
        <div className="app-shell">
          {/* TOPBAR */}
          <div className="topbar">
            <div className="topbar-left">
              <div className="topbar-logo">
                <div className="topbar-logo-icon">💬</div>
                <span>Facilitador Chat</span>
              </div>
              {!isAdmin && (
                <>
                  <div className="topbar-divider" />
                  <span style={{ fontSize: 12, color: "#94A3B8", fontWeight: 500 }}>Equipo: {session.lider}</span>
                </>
              )}
            </div>
            <div className="topbar-right">
              <div className="user-chip">
                <div className="user-chip-avatar">{initials}</div>
                <span className="user-chip-name">{session.user}</span>
              </div>
              <span className={`role-badge ${isAdmin ? "admin" : "asesor"}`}>
                {isAdmin ? "🔑 Admin" : "Asesor"}
              </span>
              <button className="btn-ghost" onClick={logout} style={{ fontSize: 12 }}>Salir</button>
            </div>
          </div>

          <div className="main-content">
            {isAdmin && (
              <div className="sidebar">
                <div className="sidebar-section">
                  <div className="sidebar-section-label">Administración</div>
                  {[
                    { id: "dashboard", icon: "📊", label: "Dashboard" },
                    { id: "usuarios", icon: "👥", label: "Gestión de usuarios" },
                    { id: "feedback", icon: "💬", label: "Feedback almacenado" },
                  ].map(item => (
                    <div key={item.id} className="sidebar-item active" style={{ cursor: "default" }}>
                      <span className="sidebar-item-icon">{item.icon}</span>
                      {item.label}
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="content-area">
              {isAdmin
                ? <AdminModule />
                : <AsesorModule user={session.user} lider={session.lider} />
              }
            </div>
          </div>
        </div>
      )}
    </>
  );
}
