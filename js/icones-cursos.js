/* Ícones dos 18 cursos técnicos (traço de 24x24, desenhados para o site). */
window.ICONES_CURSOS = {
  "administracao": '<rect x="3" y="7" width="18" height="13" rx="2.5"/><path d="M8.5 7V5.5A1.5 1.5 0 0 1 10 4h4a1.5 1.5 0 0 1 1.5 1.5V7"/><path d="M3 12.5h18"/><path d="M10.5 12.5v1.5h3v-1.5"/>',
  "agroecologia": '<path d="M12 21v-8"/><path d="M12 13c0-4.5-3-7.5-8-7.5 0 4.5 3 7.5 8 7.5z"/><path d="M12 15.5c0-4 2.6-6.5 7-6.5 0 4-2.6 6.5-7 6.5z"/><path d="M7 21h10"/>',
  "alimentos": '<path d="M4 11h13a0 0 0 0 1 0 0v2a6 6 0 0 1-6 6h-1a6 6 0 0 1-6-6v-2z"/><path d="M17 12.5h1.5a2 2 0 0 1 0 4H16"/><path d="M8 4.5c.8.8.8 2.2 0 3M11.5 4.5c.8.8.8 2.2 0 3"/>',
  "edificacoes": '<path d="M4 21V10l6-4v15"/><path d="M10 21V4h8a2 2 0 0 1 2 2v15"/><path d="M3 21h18"/><path d="M13.5 8h3M13.5 11.5h3M13.5 15h3M6.5 13h1M6.5 16.5h1"/>',
  "eletrotecnica": '<path d="M13 2.5 5 13.5h6l-1 8 8-11h-6z"/>',
  "guia-de-turismo": '<path d="M12 21s-6.5-6-6.5-11a6.5 6.5 0 0 1 13 0c0 5-6.5 11-6.5 11z"/><circle cx="12" cy="10" r="2.4"/>',
  "informatica": '<rect x="3" y="4" width="18" height="12" rx="2"/><path d="M8 20h8M12 16v4"/><path d="m9.5 8.5-2 1.5 2 1.5M14.5 8.5l2 1.5-2 1.5"/>',
  "logistica": '<path d="M2.5 6.5h11v9h-11z"/><path d="M13.5 9.5h4l3 3v3h-7"/><circle cx="6.5" cy="17.5" r="1.8"/><circle cx="17" cy="17.5" r="1.8"/>',
  "manutencao-e-suporte-em-informatica": '<path d="M14.7 6.3a4 4 0 0 0-5.4 5.4L3.5 17.5a1.8 1.8 0 0 0 2.5 2.5l5.8-5.8a4 4 0 0 0 5.4-5.4l-2.5 2.5-2.5-.5-.5-2.5z"/>',
  "meio-ambiente": '<circle cx="12" cy="12" r="9"/><path d="M12 21c-2.5-2.5-3.5-5.5-3.5-9S9.5 5.5 12 3"/><path d="M4 9.5c2.5 1 5 1 8 0s5.5-1 8 0"/><path d="M15 21c0-3 1.5-5 5-5.5"/>',
  "mineracao": '<path d="M5 16a7 7 0 0 1 14 0"/><path d="M3 16h18l-1.5 3h-15z"/><path d="M9.5 9.5V16M14.5 9.5V16"/><circle cx="12" cy="7.2" r="1.8"/><path d="M10.2 5.2 8.5 3.8M13.8 5.2l1.7-1.4"/>',
  "nutricao-e-dietetica": '<path d="M12 8c-1.6-1.3-4-1.5-5.6-.2C4.4 9.4 4.5 13 6 16c1.2 2.4 3 4.5 4.6 4 .6-.2 1-.5 1.4-.5s.8.3 1.4.5c1.6.5 3.4-1.6 4.6-4 1.5-3 1.6-6.6-.4-8.2-1.6-1.3-4-1.1-5.6.2z"/><path d="M12 8c0-2 1-3.5 3-4.5"/>',
  "planejamento-e-controle-da-producao": '<rect x="5" y="4" width="14" height="17" rx="2"/><path d="M9 4V3h6v1"/><path d="m8.5 10 1.5 1.5 3-3M8.5 16l1.5 1.5 3-3"/><path d="M15 10.5h1.5M15 16.5h1.5"/>',
  "quimica": '<path d="M9.5 3h5M10.5 3v6l-5.5 9.5a1.8 1.8 0 0 0 1.6 2.5h10.8a1.8 1.8 0 0 0 1.6-2.5L13.5 9V3"/><path d="M7.5 14.5h9"/>',
  "redes-de-computadores": '<rect x="9.5" y="2.5" width="5" height="4.5" rx="1"/><rect x="2.5" y="16.5" width="5" height="4.5" rx="1"/><rect x="16.5" y="16.5" width="5" height="4.5" rx="1"/><path d="M12 7v5M5 16.5V12h14v4.5M12 12v4.5"/>',
  "seguranca-do-trabalho": '<path d="M12 3 5 5.8v5.5c0 4.5 3 8 7 9.7 4-1.7 7-5.2 7-9.7V5.8z"/><path d="m9 12 2 2 4-4.5"/>',
  "sistemas-de-energia-renovavel": '<circle cx="12" cy="8" r="3"/><path d="M12 2v1.5M6.3 3.8l1 1M17.7 3.8l-1 1M4 9h1.5M18.5 9H20"/><path d="M5.5 14h13l2 6.5h-17z"/><path d="M12 14v6.5M4.8 17.2h14.4"/>',
  "vestuario": '<path d="M8.5 3.5 4 6l1.8 4.2 2.2-1V20.5h8V9.2l2.2 1L20 6l-4.5-2.5a3.5 3.5 0 0 1-7 0z"/>'
};
window.iconeCurso = function (id) {
  var p = window.ICONES_CURSOS[id]; if (!p) return "";
  return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">' + p + '</svg>';
};
// Na página "A EPT no RN", coloca o ícone ao lado do nome de cada curso.
document.addEventListener("DOMContentLoaded", function () {
  document.querySelectorAll('.cursos li a[href^="cursos.html#"]').forEach(function (a) {
    var id = a.getAttribute("href").split("#")[1];
    if (!window.ICONES_CURSOS[id] || a.querySelector(".curso-icone")) return;
    var s = document.createElement("span"); s.className = "curso-icone mini"; s.innerHTML = window.iconeCurso(id); a.insertBefore(s, a.firstChild);
  });
});
