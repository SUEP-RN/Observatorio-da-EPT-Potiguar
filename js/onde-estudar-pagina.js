/* Encontre seu curso técnico: filtros por município/escola e curso, mapa clicável e lista de unidades.
   O endereço guarda a busca (#municipio=...&curso=...) para poder compartilhar o link. */
(function () {
  var UNID = window.UNIDADES || [];
  var MAPA = window.MAPA_RN || { municipios: {} };
  var TIPO = { IERN: "IERN", CEEP: "CEEP", CENEP: "CENEP", Escola: "Escola estadual" };
  var OFERTA = { "Tempo Integral": "tempo integral", "Parcial": "tempo parcial", "Integral e Parcial": "tempo integral e parcial" };
  var NS = "http://www.w3.org/2000/svg";

  var texto = document.getElementById("f-texto");
  var curso = document.getElementById("f-curso");
  var limpar = document.getElementById("f-limpar");
  var lista = document.getElementById("lista");
  var resumo = document.getElementById("resumo");
  var svg = document.getElementById("mapa-svg");
  var dica = document.getElementById("mapa-dica");

  function sem(t) { return (t || "").normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase().trim(); }
  function el(tag, cls, txt) { var e = document.createElement(tag); if (cls) e.className = cls; if (txt != null) e.textContent = txt; return e; }
  function plural(n, um, varios) { return n + " " + (n === 1 ? um : varios); }

  // opções dos filtros
  var cursos = {}, municipios = {};
  var porMapa = {}; // unidades por município, com o nome do mapa do IBGE (ex.: Açu = Assú)
  UNID.forEach(function (u) {
    u.cursos.forEach(function (c) { cursos[c] = 1; });
    municipios[u.municipio] = (municipios[u.municipio] || 0) + 1;
    porMapa[u.mapa] = (porMapa[u.mapa] || 0) + 1;
    u._busca = sem(u.nome + " " + u.municipio + " " + u.mapa);
  });
  Object.keys(cursos).sort(function (a, b) { return a.localeCompare(b, "pt"); }).forEach(function (c) { var o = el("option", null, c); o.value = c; curso.appendChild(o); });
  var dl = document.getElementById("lista-municipios");
  Object.keys(municipios).sort(function (a, b) { return a.localeCompare(b, "pt"); }).forEach(function (m) { var o = el("option"); o.value = m; dl.appendChild(o); });

  // mapa
  svg.setAttribute("viewBox", "0 0 " + MAPA.largura + " " + MAPA.altura);
  var caminhos = {};
  Object.keys(MAPA.municipios).forEach(function (nome) {
    var p = document.createElementNS(NS, "path");
    p.setAttribute("d", MAPA.municipios[nome]);
    var n = porMapa[nome] || 0;
    if (n) {
      p.classList.add("tem", n === 1 ? "n1" : n <= 3 ? "n2" : "n3");
      p.setAttribute("tabindex", "0");
      p.setAttribute("role", "button");
      p.setAttribute("aria-label", nome + ": " + plural(n, "unidade", "unidades") + " com curso técnico");
      p.addEventListener("click", function () { escolherMunicipio(nome); });
      p.addEventListener("keydown", function (e) { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); escolherMunicipio(nome); } });
    }
    p.addEventListener("mousemove", function (e) {
      var r = svg.getBoundingClientRect();
      dica.hidden = false;
      dica.textContent = nome + (n ? " · " + plural(n, "unidade", "unidades") : " · sem oferta");
      dica.style.left = (e.clientX - r.left) + "px"; dica.style.top = (e.clientY - r.top) + "px";
    });
    p.addEventListener("mouseleave", function () { dica.hidden = true; });
    svg.appendChild(p);
    caminhos[nome] = p;
  });

  function escolherMunicipio(nomeMapa) {
    // usa o nome como as escolas escrevem (Açu, e não Assú)
    var u = UNID.filter(function (x) { return x.mapa === nomeMapa; })[0];
    var nome = u ? u.municipio : nomeMapa;
    texto.value = sem(texto.value) === sem(nome) ? "" : nome;
    atualizar(true);
  }

  function filtrar() {
    var t = sem(texto.value), c = curso.value;
    return UNID.filter(function (u) {
      return (!t || u._busca.indexOf(t) >= 0) && (!c || u.cursos.indexOf(c) >= 0);
    });
  }

  function desenhar(vis) {
    var c = curso.value, t = sem(texto.value);
    // mapa: destaca o município buscado e apaga os que não têm o curso escolhido
    var comCurso = {}, buscado = {};
    UNID.forEach(function (u) {
      if (!c || u.cursos.indexOf(c) >= 0) comCurso[u.mapa] = 1;
      if (t && (sem(u.municipio) === t || sem(u.mapa) === t)) buscado[u.mapa] = 1;
    });
    Object.keys(caminhos).forEach(function (nome) {
      var p = caminhos[nome];
      p.classList.toggle("escolhido", !!t && (buscado[nome] || sem(nome) === t));
      p.classList.toggle("apagado", !!c && p.classList.contains("tem") && !comCurso[nome]);
    });

    lista.innerHTML = "";
    var nMun = {};
    vis.forEach(function (u) { nMun[u.municipio] = 1; });
    var qtdMun = Object.keys(nMun).length;
    if (!vis.length) {
      resumo.textContent = "Nenhuma unidade encontrada";
      var v = el("p", "vazio-busca");
      v.innerHTML = "";
      v.appendChild(document.createTextNode(c && t
        ? "Não há oferta de " + c + " em “" + texto.value.trim() + "”. Limpe o município para ver todas as cidades com esse curso, ou procure a DIREC da sua região."
        : "Confira se o nome do município está escrito certo, ou escolha um município no mapa."));
      lista.appendChild(v);
      return;
    }
    resumo.textContent = (c ? c + ": " : "") + plural(vis.length, "unidade", "unidades") + " em " + plural(qtdMun, "município", "municípios");

    // agrupa por município, em ordem alfabética
    var grupos = {};
    vis.forEach(function (u) { (grupos[u.municipio] = grupos[u.municipio] || []).push(u); });
    Object.keys(grupos).sort(function (a, b) { return a.localeCompare(b, "pt"); }).forEach(function (m) {
      var sec = el("section", "cidade");
      var h = el("h3", null, m);
      h.appendChild(el("small", null, grupos[m][0].direc));
      sec.appendChild(h);
      var ul = el("ul", "unidades-lista");
      grupos[m].sort(function (a, b) { return a.nome.localeCompare(b.nome, "pt"); }).forEach(function (u) {
        var li = el("li", "unid"); li.dataset.tipo = u.tipo;
        li.appendChild(el("strong", null, u.nome));
        li.appendChild(el("span", "meta", TIPO[u.tipo] + (u.oferta ? ", " + (OFERTA[u.oferta] || u.oferta.toLowerCase()) : "")));
        if (!u.cursos.length) {
          li.appendChild(el("span", "a-confirmar", "Unidade nova na rede em 2026: confirme os cursos com a escola ou a DIREC."));
          ul.appendChild(li);
          return;
        }
        var cs = el("ul", "cursos-unid"); cs.setAttribute("aria-label", "Cursos técnicos");
        u.cursos.forEach(function (nomeCurso) {
          var b = el("button", null, nomeCurso); b.type = "button";
          b.setAttribute("aria-pressed", nomeCurso === c ? "true" : "false");
          b.title = nomeCurso === c ? "Mostrar todos os cursos" : "Ver onde mais tem " + nomeCurso;
          b.addEventListener("click", function () { curso.value = nomeCurso === c ? "" : nomeCurso; if (nomeCurso !== c) texto.value = ""; atualizar(true); });
          var item = el("li"); item.appendChild(b); cs.appendChild(item);
        });
        li.appendChild(cs);
        ul.appendChild(li);
      });
      sec.appendChild(ul);
      lista.appendChild(sec);
    });
  }

  function atualizar(rolar) {
    var vis = filtrar();
    limpar.hidden = !texto.value && !curso.value;
    desenhar(vis);
    var h = [];
    if (texto.value.trim()) h.push("municipio=" + encodeURIComponent(texto.value.trim()));
    if (curso.value) h.push("curso=" + encodeURIComponent(curso.value));
    history.replaceState(null, "", h.length ? "#" + h.join("&") : location.pathname);
    if (rolar && window.innerWidth < 960) resumo.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  // busca vinda do endereço
  (location.hash || "").replace(/^#/, "").split("&").forEach(function (par) {
    var kv = par.split("="); var v = decodeURIComponent(kv[1] || "");
    if (kv[0] === "municipio") texto.value = v;
    if (kv[0] === "curso" && cursos[v]) curso.value = v;
  });

  texto.addEventListener("input", function () { atualizar(false); });
  texto.addEventListener("change", function () { atualizar(true); });
  curso.addEventListener("change", function () { atualizar(true); });
  limpar.addEventListener("click", function () { texto.value = ""; curso.value = ""; atualizar(false); texto.focus(); });
  atualizar(false);
})();
