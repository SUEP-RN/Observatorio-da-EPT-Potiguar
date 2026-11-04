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
    var grupos = "main > section:not(:first-child) .secao-cabeca, .destaques > div, .praticas article, .egresso, .voz, .premio, .passos li, .tipos-estagio article, .relato > div, .ciclo li, .cifra, .indicadores li, .mais-destaques li, .escolas li, .abas, .mapa-estagio, .perguntas details, .convite, .selo-nacional, .parceiros li, .duas-barras > div";
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
    // 2025: revista da EPT, p. 69. 2026: unidades com estudantes estagiando no dia da visita técnica (pesquisa da SUEP).
    var anos = {
      "2025": { lista: ["Areia Branca","Mossoró","Apodi","Severiano Melo","Upanema","Pendências","Alto do Rodrigues","Afonso Bezerra","Pedro Avelino","João Câmara","Ceará-Mirim","Extremoz","São Gonçalo do Amarante","Ielmo Marinho","Macaíba","Natal","Parnamirim","São José de Mipibu","Goianinha","Canguaretama","Nova Cruz","Santa Cruz","Currais Novos","Acari","Parelhas","Caicó","Jucurutu","Serra Negra do Norte"],
        info: "28 municípios com estagiários em 2025", legenda: "Municípios com estagiários em 2025", nota: "Municípios com estagiários da rede ao longo de 2025, segundo a revista da EPT.", tem: "tem estagiários da rede em 2025" },
      "2026": { lista: ["Natal","Mossoró","Apodi","São Gonçalo do Amarante","Acari","Canguaretama","Ceará-Mirim","Currais Novos","Extremoz","Goianinha","Jardim de Piranhas","João Câmara","Parelhas","Santa Cruz","São Bento do Norte","Severiano Melo"],
        unidades: { "Natal": 10, "Mossoró": 5, "Apodi": 2, "São Gonçalo do Amarante": 2 },
        info: "16 municípios com estudantes estagiando nas visitas de 2026", legenda: "Municípios com estudantes estagiando no dia da visita técnica de 2026", nota: "31 unidades tinham estudantes estagiando no dia da visita técnica de 2026. Outras 53 foram registradas como ainda não aptas a ter estagiários.", tem: "estudantes estagiando no dia da visita" }
    };
    var info = document.getElementById("mapa-info"), nota = document.getElementById("mapa-nota"), legenda = document.getElementById("mapa-legenda");
    var ul = document.getElementById("lista-estagio"), atual = anos["2025"];
    svg.setAttribute("viewBox", "0 0 " + m.largura + " " + m.altura);
    var ns = "http://www.w3.org/2000/svg", caminhos = {};
    Object.keys(m.municipios).forEach(function (nome) {
      var p = document.createElementNS(ns, "path");
      p.setAttribute("d", m.municipios[nome]);
      var t = document.createElementNS(ns, "title"); t.textContent = nome; p.appendChild(t);
      function mostrar() {
        if (!info) return;
        var tem = atual.lista.indexOf(nome) >= 0, n = atual.unidades && atual.unidades[nome];
        info.textContent = tem ? nome + ": " + (n ? n + " unidades com " : "") + atual.tem : nome;
      }
      p.addEventListener("mouseenter", mostrar);
      p.addEventListener("click", mostrar);
      p.addEventListener("mouseleave", function () { if (info) info.textContent = atual.info; });
      caminhos[nome] = p;
      svg.appendChild(p);
    });
    function aplicar(ano) {
      atual = anos[ano];
      var ordem = 0;
      Object.keys(caminhos).forEach(function (nome) {
        var tem = atual.lista.indexOf(nome) >= 0;
        caminhos[nome].setAttribute("class", tem ? "com" : "");
        if (tem) caminhos[nome].style.setProperty("--atraso", (ordem++ * 45) + "ms");
      });
      if (info) info.textContent = atual.info;
      if (nota) nota.textContent = atual.nota;
      if (legenda) legenda.textContent = atual.legenda;
      if (ul) {
        ul.innerHTML = "";
        atual.lista.slice().sort(function (a, b) { return a.localeCompare(b, "pt"); }).forEach(function (n) { var li = document.createElement("li"); li.textContent = n; ul.appendChild(li); });
      }
    }
    // Página Estágio e trabalho: os dois anos juntos (municípios com estágio em 2025 ou em 2026)
    if (svg.dataset.modo === "juntos") {
      var a = anos["2025"].lista, b = anos["2026"].lista;
      var uniao = a.concat(b.filter(function (n) { return a.indexOf(n) < 0; }));
      anos.juntos = { lista: uniao, info: uniao.length + " municípios com estágio em 2025 ou em 2026",
        legenda: "Municípios com estagiários em 2025 ou em 2026",
        nota: "2025: municípios com estagiários ao longo do ano, segundo a revista da EPT. 2026: municípios com estudantes estagiando no dia da visita técnica." };
      aplicar("juntos");
      Object.keys(caminhos).forEach(function (nome) {
        var p = caminhos[nome];
        p.addEventListener("mouseenter", mostrarJuntos);
        p.addEventListener("click", mostrarJuntos);
        function mostrarJuntos() {
          if (!info) return;
          var em25 = a.indexOf(nome) >= 0, em26 = b.indexOf(nome) >= 0, n = anos["2026"].unidades[nome];
          if (!em25 && !em26) { info.textContent = nome; return; }
          info.textContent = nome + ": estágio " + (em25 && em26 ? "em 2025 e em 2026" : em25 ? "em 2025" : "em 2026") + (n ? " (" + n + " unidades com estagiários na visita de 2026)" : "");
        }
      });
      return;
    }
    aplicar("2025");
  }

  function iniciar() { mapa(); abas(); preparar(); }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", iniciar); else iniciar();
})();
