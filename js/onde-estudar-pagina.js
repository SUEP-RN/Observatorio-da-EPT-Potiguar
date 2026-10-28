/* Encontre seu curso técnico: filtros por município/escola, curso e forma de oferta, mapa clicável e lista de unidades.
   O endereço guarda a busca (#municipio=...&curso=...&forma=...) para poder compartilhar o link. */
(function () {
  var UNID = window.UNIDADES || [];
  var MAPA = window.MAPA_RN || { municipios: {} };
  var TIPO = { IERN: "IERN", CEEP: "CEEP", CENEP: "CENEP", Escola: "Escola estadual" };
  var FORMA = { integrado: "Integrado", ejatec: "EJATEC", concomitante: "Concomitante", subsequente: "Subsequente" };
  var NS = "http://www.w3.org/2000/svg";

  var texto = document.getElementById("f-texto");
  var curso = document.getElementById("f-curso");
  var forma = document.getElementById("f-forma");
  var limpar = document.getElementById("f-limpar");
  var lista = document.getElementById("lista");
  var resumo = document.getElementById("resumo");
  var svg = document.getElementById("mapa-svg");
  var dica = document.getElementById("mapa-dica");

  function sem(t) { return (t || "").normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase().trim(); }
  function el(tag, cls, txt) { var e = document.createElement(tag); if (cls) e.className = cls; if (txt != null) e.textContent = txt; return e; }
  function plural(n, um, varios) { return n + " " + (n === 1 ? um : varios); }

  // a unidade atende o filtro de curso e de forma? (o mesmo curso precisa ter a forma escolhida)
  function cursosQueAtendem(u, c, f) {
    return u.cursos.filter(function (x) { return (!c || x.nome === c) && (!f || x.formas.indexOf(f) >= 0); });
  }

  var cursos = {}, porMapa = {};
  UNID.forEach(function (u) {
    u.cursos.forEach(function (c) { cursos[c.nome] = 1; });
    porMapa[u.mapa] = (porMapa[u.mapa] || 0) + 1;
    u._busca = sem(u.nome + " " + u.municipio);
  });
  Object.keys(cursos).sort(function (a, b) { return a.localeCompare(b, "pt"); }).forEach(function (c) { var o = el("option", null, c); o.value = c; curso.appendChild(o); });
  var dl = document.getElementById("lista-municipios");
  Object.keys(porMapa).sort(function (a, b) { return a.localeCompare(b, "pt"); }).forEach(function (m) { var o = el("option"); o.value = m; dl.appendChild(o); });

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

  function escolherMunicipio(nome) {
    texto.value = sem(texto.value) === sem(nome) ? "" : nome;
    atualizar(true);
  }

  function filtrar() {
    var t = sem(texto.value), c = curso.value, f = forma.value;
    return UNID.filter(function (u) {
      return (!t || u._busca.indexOf(t) >= 0) && (!(c || f) || cursosQueAtendem(u, c, f).length);
    });
  }

  function desenhar(vis) {
    var c = curso.value, f = forma.value, t = sem(texto.value);
    var atende = {};
    UNID.forEach(function (u) { if (!(c || f) || cursosQueAtendem(u, c, f).length) atende[u.mapa] = 1; });
    Object.keys(caminhos).forEach(function (nome) {
      var p = caminhos[nome];
      p.classList.toggle("escolhido", !!t && sem(nome) === t);
      p.classList.toggle("apagado", !!(c || f) && p.classList.contains("tem") && !atende[nome]);
    });

    lista.innerHTML = "";
    var nMun = {};
    vis.forEach(function (u) { nMun[u.municipio] = 1; });
    var filtroTxt = [c, f ? FORMA[f].toLowerCase() : ""].filter(Boolean).join(", ");
    if (!vis.length) {
      resumo.textContent = "Nenhuma unidade encontrada";
      lista.appendChild(el("p", "vazio-busca", (c || f) && t
        ? "Não há oferta de " + filtroTxt + " em “" + texto.value.trim() + "”. Limpe o município para ver todas as cidades com essa oferta, ou procure a DIREC da sua região."
        : "Confira se o nome do município está escrito certo, ou escolha um município no mapa."));
      return;
    }
    resumo.textContent = (filtroTxt ? filtroTxt.charAt(0).toUpperCase() + filtroTxt.slice(1) + ": " : "") +
      plural(vis.length, "unidade", "unidades") + " em " + plural(Object.keys(nMun).length, "município", "municípios");

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
        li.appendChild(el("span", "meta", TIPO[u.tipo] + (u.turnos.length ? ", " + u.turnos.join(" e ") : "")));
        var cs = el("ul", "cursos-unid"); cs.setAttribute("aria-label", "Cursos técnicos");
        u.cursos.forEach(function (x) {
          var item = el("li");
          var b = el("button", "curso-nome", x.nome); b.type = "button";
          b.setAttribute("aria-pressed", x.nome === c ? "true" : "false");
          b.title = x.nome === c ? "Mostrar todos os cursos" : "Ver onde mais tem " + x.nome;
          b.addEventListener("click", function () { curso.value = x.nome === c ? "" : x.nome; if (x.nome !== c) texto.value = ""; atualizar(true); });
          item.appendChild(b);
          x.formas.forEach(function (fm) { item.appendChild(el("span", "forma forma-" + fm, FORMA[fm])); });
          cs.appendChild(item);
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
    limpar.hidden = !texto.value && !curso.value && !forma.value;
    desenhar(vis);
    var h = [];
    if (texto.value.trim()) h.push("municipio=" + encodeURIComponent(texto.value.trim()));
    if (curso.value) h.push("curso=" + encodeURIComponent(curso.value));
    if (forma.value) h.push("forma=" + forma.value);
    history.replaceState(null, "", h.length ? "#" + h.join("&") : location.pathname);
    if (rolar) resumo.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  // botões "Ver onde tem" do quadro das formas de oferta, com o número de unidades de cada forma
  document.querySelectorAll("[data-conta]").forEach(function (s) {
    var n = UNID.filter(function (u) { return cursosQueAtendem(u, "", s.dataset.conta).length; }).length;
    s.textContent = "(" + n + (n === 1 ? " unidade)" : " unidades)");
  });
  document.querySelectorAll("[data-forma]").forEach(function (b) {
    b.addEventListener("click", function () { forma.value = b.dataset.forma; texto.value = ""; atualizar(true); });
  });

  (location.hash || "").replace(/^#/, "").split("&").forEach(function (par) {
    var kv = par.split("="); var v = decodeURIComponent(kv[1] || "");
    if (kv[0] === "municipio") texto.value = v;
    if (kv[0] === "curso" && cursos[v]) curso.value = v;
    if (kv[0] === "forma" && FORMA[v]) forma.value = v;
  });

  texto.addEventListener("input", function () { atualizar(false); });
  texto.addEventListener("change", function () { if (texto.value) atualizar(window.innerWidth < 960); });
  curso.addEventListener("change", function () { atualizar(window.innerWidth < 960); });
  forma.addEventListener("change", function () { atualizar(window.innerWidth < 960); });
  limpar.addEventListener("click", function () { texto.value = ""; curso.value = ""; forma.value = ""; atualizar(false); texto.focus(); });
  atualizar(false);
})();
