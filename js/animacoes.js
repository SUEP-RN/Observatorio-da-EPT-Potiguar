/* Movimento das páginas de "Escola e mundo do trabalho": surgimento ao rolar, números que contam,
   barras que crescem, abas e o mapa do estágio. Sem JavaScript, tudo aparece normalmente. */
(function () {
  var calmo = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var temObservador = "IntersectionObserver" in window;

  /* ---------- números que contam ---------- */
  function contar(el) {
    var txt = el.textContent.trim();
    var m = txt.match(/^([^\d]*)([\d.]+)(.*)$/);
    if (!m) return;
    var alvo = parseInt(m[2].replace(/\./g, ""), 10);
    if (!alvo || alvo < 2) return;
    var ini = null, dur = Math.min(1600, 700 + alvo / 4);
    function passo(t) {
      if (!ini) ini = t;
      var p = Math.min(1, (t - ini) / dur), v = Math.round(alvo * (1 - Math.pow(1 - p, 3)));
      el.textContent = m[1] + v.toLocaleString("pt-BR") + m[3];
      if (p < 1) requestAnimationFrame(passo); else el.textContent = txt;
    }
    requestAnimationFrame(passo);
  }

  /* ---------- surgimento ao rolar ---------- */
  function preparar() {
    if (calmo || !temObservador) return;
    document.documentElement.classList.add("anima");
    var grupos = "main > section:not(:first-child) .secao-cabeca, .destaques > div, .praticas article, .egresso, .voz, .premio, .passos li, .tipos-estagio article, .relato > div, .ciclo li, .cifra, .indicadores li, .mais-destaques li, .escolas li, .abas, .mapa-estagio, .perguntas details, .convite, .selo-nacional, .parceiros li";
    var itens = document.querySelectorAll(grupos);
    var vistos = new IntersectionObserver(function (es) {
      es.forEach(function (e) {
        if (!e.isIntersecting) return;
        var el = e.target;
        el.classList.add("visivel");
        el.querySelectorAll(".trilho i[data-largura]").forEach(function (i) { i.style.width = i.dataset.largura; });
        var n = el.matches("strong, b") ? [el] : el.querySelectorAll(".destaques strong, .cifra strong, .mais-destaques b, .rotulo b");
        if (el.matches(".destaques > div, .cifra, .mais-destaques li, .indicadores li")) n = el.querySelectorAll("strong, b");
        Array.prototype.forEach.call(n, function (x) { if (!x.dataset.contou) { x.dataset.contou = 1; contar(x); } });
        vistos.unobserve(el);
      });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.12 });
    Array.prototype.forEach.call(itens, function (el) {
      // atraso em cascata entre irmãos
      var irmaos = el.parentNode ? Array.prototype.indexOf.call(el.parentNode.children, el) : 0;
      el.style.setProperty("--atraso", Math.min(irmaos, 6) * 70 + "ms");
      el.classList.add("revela");
      vistos.observe(el);
    });
    document.querySelectorAll(".trilho i").forEach(function (i) { i.dataset.largura = i.style.width; i.style.width = "0"; });
  }

  /* ---------- abas ---------- */
  function abas() {
    document.querySelectorAll("[data-abas]").forEach(function (caixa) {
      var botoes = caixa.querySelectorAll('[role="tab"]');
      function ativar(b, foco) {
        botoes.forEach(function (x) {
          var sel = x === b;
          x.setAttribute("aria-selected", sel); x.tabIndex = sel ? 0 : -1;
          var p = document.getElementById(x.getAttribute("aria-controls"));
          if (p) { p.hidden = !sel; if (sel) { p.classList.remove("entrando"); void p.offsetWidth; p.classList.add("entrando"); } }
        });
        if (foco) b.focus();
      }
      botoes.forEach(function (b, i) {
        b.addEventListener("click", function () { ativar(b); });
        b.addEventListener("keydown", function (e) {
          var j = e.key === "ArrowRight" ? i + 1 : e.key === "ArrowLeft" ? i - 1 : null;
          if (j === null) return;
          e.preventDefault(); ativar(botoes[(j + botoes.length) % botoes.length], true);
        });
      });
    });
  }

  /* ---------- mapa do estágio (revista, p. 69) ---------- */
  function mapa() {
    var svg = document.getElementById("mapa-estagio"), m = window.MAPA_RN;
    if (!svg || !m) return;
    var com = ["Areia Branca","Mossoró","Apodi","Severiano Melo","Upanema","Pendências","Alto do Rodrigues","Afonso Bezerra","Pedro Avelino","João Câmara","Ceará-Mirim","Extremoz","São Gonçalo do Amarante","Ielmo Marinho","Macaíba","Natal","Parnamirim","São José de Mipibu","Goianinha","Canguaretama","Nova Cruz","Santa Cruz","Currais Novos","Acari","Parelhas","Caicó","Jucurutu","Serra Negra do Norte"];
    var info = document.getElementById("mapa-info"), padrao = info ? info.textContent : "";
    svg.setAttribute("viewBox", "0 0 " + m.largura + " " + m.altura);
    var ns = "http://www.w3.org/2000/svg", ordem = 0;
    Object.keys(m.municipios).forEach(function (nome) {
      var p = document.createElementNS(ns, "path");
      p.setAttribute("d", m.municipios[nome]);
      var tem = com.indexOf(nome) >= 0;
      if (tem) {
        p.setAttribute("class", "com");
        p.style.setProperty("--atraso", (ordem++ * 45) + "ms");
        var t = document.createElementNS(ns, "title"); t.textContent = nome; p.appendChild(t);
      }
      function mostrar() { if (info) info.textContent = tem ? nome + ": tem estagiários da rede" : nome; }
      p.addEventListener("mouseenter", mostrar);
      p.addEventListener("click", mostrar);
      p.addEventListener("mouseleave", function () { if (info) info.textContent = padrao; });
      svg.appendChild(p);
    });
    var ul = document.getElementById("lista-estagio");
    if (ul) com.slice().sort(function (a, b) { return a.localeCompare(b, "pt"); }).forEach(function (n) { var li = document.createElement("li"); li.textContent = n; ul.appendChild(li); });
  }

  function iniciar() { mapa(); abas(); preparar(); }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", iniciar); else iniciar();
})();
