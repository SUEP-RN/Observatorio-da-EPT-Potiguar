/* Cursos técnicos. Em cursos.html, lista os 18 cursos. Cada curso tem sua página (curso-informatica.html),
   gerada por gerar-cursos.ps1 com <body data-curso="informatica">; este script completa essa página.
   Os endereços antigos (cursos.html#informatica) levam à página nova. */
(function () {
  var CURSOS = window.CURSOS || [], UNID = window.UNIDADES || [];
  var FORMA = { integrado: "Integrado ao ensino médio", ejatec: "EJATEC", concomitante: "Concomitante", subsequente: "Subsequente" };
  var lista = document.getElementById("lista-cursos");
  var detalhe = document.getElementById("detalhe");
  var PAGINA = document.body.getAttribute("data-curso");

  function el(tag, cls, txt) { var e = document.createElement(tag); if (cls) e.className = cls; if (txt != null) e.textContent = txt; return e; }
  function plural(n, um, varios) { return n + " " + (n === 1 ? um : varios); }
  function endereco(c) { return "curso-" + c.id + ".html"; }
  function achar(id) { return CURSOS.filter(function (x) { return x.id === id; })[0]; }

  // endereço antigo: cursos.html#informatica
  if (!PAGINA) {
    var antigo = achar(location.hash.replace("#", ""));
    if (antigo) { location.replace(endereco(antigo)); return; }
  }

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
  if (lista) CURSOS.forEach(function (c) {
    var a = el("a", "curso-cartao"); a.href = endereco(c);
    if (window.iconeCurso) { var ic = el("span", "curso-icone"); ic.innerHTML = window.iconeCurso(c.id); a.appendChild(ic); }
    a.appendChild(el("h3", null, c.nome));
    a.appendChild(el("p", null, c.faz.split(/\.\s/)[0].replace(/\.?$/, "."))); // só a primeira frase no cartão
    var n = Object.keys(c.municipios).length;
    a.appendChild(el("span", "curso-onde", c.unidades.length ? plural(c.unidades.length, "unidade", "unidades") + " em " + plural(n, "município", "municípios") : "Sem turmas em 2026"));
    lista.appendChild(a);
  });

  // página de um curso: o texto já vem no HTML (para o Google); aqui ela ganha a oferta, os ícones e os links
  function mostrar() {
    var c = achar(PAGINA);
    if (!c || !detalhe) return;
    detalhe.innerHTML = "";
    var voltar = el("a", "voltar", "Todos os cursos"); voltar.href = "cursos.html"; detalhe.appendChild(voltar);

    // cabeça: ícone e a apresentação do curso (o nome está no título da página)
    var cab = el("div", "curso-cabeca");
    if (window.iconeCurso) { var ic = el("span", "curso-icone grande"); ic.innerHTML = window.iconeCurso(c.id); cab.appendChild(ic); }
    var tit = el("div");
    if (c.sobre) tit.appendChild(el("p", "curso-sobre", c.sobre));
    cab.appendChild(tit);
    detalhe.appendChild(cab);

    // texto em uma coluna só, com o mesmo estilo em todas as partes
    var grade = el("div", "curso-grade");
    var txt = el("div", "curso-texto");
    function parte(titulo, conteudo) {
      var s = el("section", "curso-parte");
      s.appendChild(el("h3", null, titulo));
      s.appendChild(conteudo);
      txt.appendChild(s);
    }
    if (c.aprende && c.aprende.length) {
      var ap = el("ul", "curso-aprende");
      c.aprende.forEach(function (a) { ap.appendChild(el("li", null, a)); });
      parte("O que você vai aprender", ap);
    }
    parte("O que o técnico faz", el("p", null, c.faz));
    parte("Onde pode trabalhar", el("p", null, c.atua));
    if (c.combina) parte("Combina com você se", el("p", null, c.combina));
    var acoes = el("div", "curso-acoes");
    var mapa = el("a", "botao indigo", "Ver escolas que oferecem o curso"); mapa.href = "onde-estudar.html#curso=" + encodeURIComponent(c.nome);
    var entrar = el("a", null, "Como entrar"); entrar.href = "como-entrar.html";
    var est = el("a", null, "Estrutura curricular"); est.href = "documentos.html?busca=" + encodeURIComponent(c.nome) + "#estruturas";
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
      // a lista de cidades fica recolhida, para o quadro não ficar carregado
      var det = el("details", "curso-cidades");
      det.appendChild(el("summary", null, "Ver " + (nMun === 1 ? "o município" : "os " + nMun + " municípios")));
      var ms = el("ul", "curso-municipios");
      Object.keys(c.municipios).sort(function (a, b) { return a.localeCompare(b, "pt"); }).forEach(function (m) {
        var li = el("li"); var a = el("a", null, m);
        a.href = "onde-estudar.html#municipio=" + encodeURIComponent(m) + "&curso=" + encodeURIComponent(c.nome);
        li.appendChild(a); ms.appendChild(li);
      });
      det.appendChild(ms);
      oferta.appendChild(det);
    }
    grade.appendChild(oferta);
    detalhe.appendChild(grade);

    // curso anterior e próximo, para quem quer conhecer vários
    var i = CURSOS.indexOf(c), ant = CURSOS[(i - 1 + CURSOS.length) % CURSOS.length], prox = CURSOS[(i + 1) % CURSOS.length];
    var nav = el("nav", "curso-vizinhos"); nav.setAttribute("aria-label", "Outros cursos");
    var a1 = el("a", "anterior"); a1.href = endereco(ant); a1.appendChild(el("small", null, "Curso anterior")); a1.appendChild(el("b", null, ant.nome));
    var a2 = el("a", "proximo"); a2.href = endereco(prox); a2.appendChild(el("small", null, "Próximo curso")); a2.appendChild(el("b", null, prox.nome));
    nav.appendChild(a1); nav.appendChild(a2);
    detalhe.appendChild(nav);
  }
  if (PAGINA) mostrar();
})();
