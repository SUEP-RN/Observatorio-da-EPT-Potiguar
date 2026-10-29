/* Página dos cursos: lista os 18 cursos e mostra a página de cada um pelo endereço (cursos.html#informatica). */
(function () {
  var CURSOS = window.CURSOS || [], UNID = window.UNIDADES || [];
  var FORMA = { integrado: "Integrado ao ensino médio", ejatec: "EJATEC", concomitante: "Concomitante", subsequente: "Subsequente" };
  var lista = document.getElementById("lista-cursos");
  var detalhe = document.getElementById("detalhe");
  var catalogo = document.getElementById("catalogo");

  function el(tag, cls, txt) { var e = document.createElement(tag); if (cls) e.className = cls; if (txt != null) e.textContent = txt; return e; }
  function plural(n, um, varios) { return n + " " + (n === 1 ? um : varios); }

  // oferta de cada curso a partir das unidades de 2026
  CURSOS.forEach(function (c) {
    c.unidades = []; c.municipios = {}; c.formas = {};
    UNID.forEach(function (u) {
      u.cursos.forEach(function (x) {
        if (x.nome !== c.nome) return;
        c.unidades.push(u);
        c.municipios[u.municipio] = (c.municipios[u.municipio] || 0) + 1;
        x.formas.forEach(function (f) { c.formas[f] = (c.formas[f] || 0) + 1; });
      });
    });
  });

  // lista
  CURSOS.forEach(function (c) {
    var a = el("a", "curso-cartao"); a.href = "#" + c.id;
    a.appendChild(el("h3", null, c.nome));
    a.appendChild(el("p", null, c.faz));
    var n = Object.keys(c.municipios).length;
    a.appendChild(el("span", "curso-onde", c.unidades.length ? plural(c.unidades.length, "unidade", "unidades") + " em " + plural(n, "município", "municípios") : "Sem turmas em 2026"));
    lista.appendChild(a);
  });

  function mostrar() {
    var id = location.hash.replace("#", "");
    var c = CURSOS.filter(function (x) { return x.id === id; })[0];
    if (!c) { detalhe.hidden = true; catalogo.hidden = false; document.title = "Cursos técnicos · SUEP/SEEC-RN"; return; }
    catalogo.hidden = true; detalhe.hidden = false;
    document.title = "Técnico em " + c.nome + " · SUEP/SEEC-RN";
    detalhe.innerHTML = "";
    var voltar = el("a", "voltar", "Todos os cursos"); voltar.href = "#"; detalhe.appendChild(voltar);
    detalhe.appendChild(el("h2", "etiqueta pequena", "Técnico em " + c.nome));

    var grade = el("div", "curso-grade");
    var txt = el("div", "curso-texto");
    txt.appendChild(el("h3", null, "O que faz"));
    txt.appendChild(el("p", null, c.faz));
    txt.appendChild(el("h3", null, "Onde pode trabalhar"));
    txt.appendChild(el("p", null, c.atua));
    var acoes = el("div", "acoes");
    var mapa = el("a", "botao indigo", "Ver no mapa onde tem"); mapa.href = "onde-estudar.html#curso=" + encodeURIComponent(c.nome);
    var est = el("a", "botao contorno-indigo", "Estrutura curricular"); est.href = "documentos.html?busca=" + encodeURIComponent(c.nome) + "#estruturas";
    acoes.appendChild(mapa); acoes.appendChild(est); txt.appendChild(acoes);
    grade.appendChild(txt);

    var oferta = el("aside", "curso-oferta");
    oferta.appendChild(el("h3", null, "Oferta em 2026"));
    var nMun = Object.keys(c.municipios).length;
    var num = el("p", "curso-numeros");
    num.appendChild(el("strong", null, String(c.unidades.length)));
    num.appendChild(document.createTextNode(" " + (c.unidades.length === 1 ? "unidade" : "unidades") + " em " + plural(nMun, "município", "municípios")));
    oferta.appendChild(num);
    var fs = Object.keys(FORMA).filter(function (f) { return c.formas[f]; });
    if (fs.length) {
      oferta.appendChild(el("h4", null, "Formas de oferta"));
      var ul = el("ul", "curso-formas");
      fs.forEach(function (f) {
        var li = el("li");
        var a = el("a", null, FORMA[f]); a.href = "onde-estudar.html#curso=" + encodeURIComponent(c.nome) + "&forma=" + f;
        li.appendChild(a); li.appendChild(el("span", null, plural(c.formas[f], "unidade", "unidades")));
        ul.appendChild(li);
      });
      oferta.appendChild(ul);
    }
    if (nMun) {
      oferta.appendChild(el("h4", null, "Municípios"));
      var ms = el("ul", "curso-municipios");
      Object.keys(c.municipios).sort(function (a, b) { return a.localeCompare(b, "pt"); }).forEach(function (m) {
        var li = el("li"); var a = el("a", null, m);
        a.href = "onde-estudar.html#municipio=" + encodeURIComponent(m) + "&curso=" + encodeURIComponent(c.nome);
        li.appendChild(a); ms.appendChild(li);
      });
      oferta.appendChild(ms);
    }
    grade.appendChild(oferta);
    detalhe.appendChild(grade);
    detalhe.scrollIntoView({ block: "start" });
  }
  window.addEventListener("hashchange", mostrar);
  mostrar();
})();
