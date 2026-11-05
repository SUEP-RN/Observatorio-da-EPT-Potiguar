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
    if (window.iconeCurso) { var ic = el("span", "curso-icone"); ic.innerHTML = window.iconeCurso(c.id); a.appendChild(ic); }
    a.appendChild(el("h3", null, c.nome));
    a.appendChild(el("p", null, c.faz.split(/\.\s/)[0].replace(/\.?$/, "."))); // só a primeira frase no cartão
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

    // cabeça: ícone, nome e a apresentação do curso
    var cab = el("div", "curso-cabeca");
    if (window.iconeCurso) { var ic = el("span", "curso-icone grande"); ic.innerHTML = window.iconeCurso(c.id); cab.appendChild(ic); }
    var tit = el("div");
    tit.appendChild(el("h2", "etiqueta pequena", "Técnico em " + c.nome));
    if (c.sobre) tit.appendChild(el("p", "curso-sobre", c.sobre));
    cab.appendChild(tit);
    detalhe.appendChild(cab);

    var grade = el("div", "curso-grade");
    var txt = el("div", "curso-texto");
    if (c.aprende && c.aprende.length) {
      txt.appendChild(el("h3", null, "O que você vai aprender"));
      var ap = el("ul", "curso-aprende");
      c.aprende.forEach(function (a) { ap.appendChild(el("li", null, a)); });
      txt.appendChild(ap);
    }
    var duas = el("div", "curso-duas");
    var faz = el("div", "curso-bloco"); faz.appendChild(el("h3", null, "O que o técnico faz")); faz.appendChild(el("p", null, c.faz)); duas.appendChild(faz);
    var atua = el("div", "curso-bloco"); atua.appendChild(el("h3", null, "Onde pode trabalhar")); atua.appendChild(el("p", null, c.atua)); duas.appendChild(atua);
    txt.appendChild(duas);
    if (c.combina) {
      var comb = el("p", "curso-combina");
      comb.appendChild(el("b", null, "Combina com você se: "));
      comb.appendChild(document.createTextNode(c.combina.charAt(0).toLowerCase() + c.combina.slice(1)));
      txt.appendChild(comb);
    }
    var acoes = el("div", "acoes");
    var mapa = el("a", "botao indigo", "Ver escolas que oferecem o curso"); mapa.href = "onde-estudar.html#curso=" + encodeURIComponent(c.nome);
    var entrar = el("a", "botao contorno-indigo", "Como entrar"); entrar.href = "como-entrar.html";
    var est = el("a", "botao contorno-indigo", "Estrutura curricular"); est.href = "documentos.html?busca=" + encodeURIComponent(c.nome) + "#estruturas";
    acoes.appendChild(mapa); acoes.appendChild(entrar); acoes.appendChild(est); txt.appendChild(acoes);
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

    // curso anterior e próximo, para quem quer conhecer vários
    var i = CURSOS.indexOf(c), ant = CURSOS[(i - 1 + CURSOS.length) % CURSOS.length], prox = CURSOS[(i + 1) % CURSOS.length];
    var nav = el("nav", "curso-vizinhos"); nav.setAttribute("aria-label", "Outros cursos");
    var a1 = el("a", "anterior"); a1.href = "#" + ant.id; a1.appendChild(el("small", null, "Curso anterior")); a1.appendChild(el("b", null, ant.nome));
    var a2 = el("a", "proximo"); a2.href = "#" + prox.id; a2.appendChild(el("small", null, "Próximo curso")); a2.appendChild(el("b", null, prox.nome));
    nav.appendChild(a1); nav.appendChild(a2);
    detalhe.appendChild(nav);
    detalhe.scrollIntoView({ block: "start" });
  }
  window.addEventListener("hashchange", mostrar);
  mostrar();
})();
