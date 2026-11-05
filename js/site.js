/* Monta as partes comuns (topo, rodapé) e as listas.
   O mesmo arquivo serve aos dois sites, que ficam em endereços separados:
     - site público da SUEP/EPT: Site.iniciar("inicio" | "ept" | "sobre" | "onde-estudar" | "cursos" | "como-entrar" | "acompanhamento" | "boas-praticas" | "agenda" | "documentos")
     - site dos painéis (uso interno): Site.iniciar("lista" | "painel", "paineis")
   Não precisa editar este arquivo: contato em js/contato.js e painéis em js/paineis.js. */
window.Site = (function () {
  var paineis = window.PAINEIS || [];
  var contato = window.CONTATO || {};
  var BASE = "";
  var SITE = "publico";

  // versão do site.js (?v=...), usada também na lista da busca para o navegador não guardar uma lista velha
  var VERSAO = (function () { var s = document.currentScript; var m = s && /[?&]v=([^&]+)/.exec(s.src); return m ? m[1] : ""; })();

  var ICONES = {
    lupa: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" aria-hidden="true"><circle cx="11" cy="11" r="6.5"/><path d="m20 20-4.2-4.2"/></svg>',
    instagram: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/></svg>'
  };

  function el(tag, classe, texto) {
    var e = document.createElement(tag);
    if (classe) e.className = classe;
    if (texto !== undefined) e.textContent = texto;
    return e;
  }
  function raiz(caminho) { return BASE + caminho; }
  function imagem(caminho) { return /^https?:/.test(caminho) ? caminho : raiz(caminho); }

  function linkValido(link) {
    return typeof link === "string" && /^https:\/\/app\.powerbi\.com\/view\?r=/.test(link.trim());
  }
  function semAcento(t) {
    return (t || "").normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();
  }

  /* ------------------------------------------------------------ topo */
  function montarTopo(atual) {
    var lugar = document.getElementById("topo");
    if (!lugar) return;

    var faixa = el("div", "faixa-cores");
    faixa.setAttribute("aria-hidden", "true");
    faixa.innerHTML = "<i></i><i></i><i></i><i></i>";

    var itens, nome, sub, inicio;
    if (SITE === "paineis") {
      itens = [["index.html", "Painéis", "lista"]];
      if (contato.sitePublico) {
        itens.push([contato.sitePublico, "Site da SUEP", ""], [contato.sitePublico + "ept.html", "EPT estadual", ""], [contato.sitePublico + "sobre.html", "A SUEP", ""]);
      }
      nome = "Painéis da EPT/RN"; sub = "Uso interno · SUEP/SEEC-RN"; inicio = "index.html";
    } else {
      // poucos itens no topo; as páginas ficam agrupadas pelo que a pessoa procura
      itens = [
        ["index.html", "Início", "inicio"],
        { grupo: "Quem somos", itens: [
          ["ept.html", "A EPT no RN", "ept", "Governança, unidades, cursos e história"],
          ["sobre.html", "A SUEP", "sobre", "O setor, o que faz e a equipe"]
        ] },
        { grupo: "Onde estudar", itens: [
          ["onde-estudar.html", "Encontre sua escola", "onde-estudar", "Busca por cidade e curso, com o mapa"],
          ["cursos.html", "Cursos técnicos", "cursos", "O que faz cada técnico e onde há oferta"],
          ["como-entrar.html", "Como entrar", "como-entrar", "Formas de oferta, matrícula e perguntas frequentes"],
          ["programas.html", "Programas da EPT", "programas", "Pronatec, Bolsa-Formação e Mulheres Mil"]
        ] },
        { grupo: "Escola e mundo do trabalho", itens: [
          ["boas-praticas.html", "Boas práticas", "boas-praticas", "Projetos premiados e experiências das escolas"],
          ["estagio-trabalho.html", "Estágio e trabalho", "estagio-trabalho", "Estágio, aprendizagem e empresas parceiras"],
          ["acompanhamento.html", "Acompanhamento da EPT", "acompanhamento", "Dados das visitas técnicas"]
        ] },
        { grupo: "Para as escolas", itens: [
          ["documentos.html", "Documentos", "documentos", "Orientações, legislação, estruturas e PPCs"],
          ["agenda.html", "Agenda formativa", "agenda", "Formações para gestores e professores"]
        ] }
      ];
      nome = "SUEP · EPT/RN"; sub = "Subcoordenadoria de Educação Profissional e Tecnológica"; inicio = "index.html";
    }
    function link(i) {
      return '<a href="' + i[0] + '"' + (i[2] && i[2] === atual ? ' aria-current="page"' : "") + ">" +
        (i[3] ? "<b>" + i[1] + "</b><span>" + i[3] + "</span>" : i[1]) + "</a>";
    }
    var seta = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" aria-hidden="true"><path d="m6 9 6 6 6-6"/></svg>';
    var menu = itens.map(function (i, n) {
      if (!i.grupo) return link(i);
      var ativo = i.itens.some(function (s) { return s[2] === atual; });
      return '<div class="menu-grupo' + (ativo ? " atual" : "") + '">' +
        '<button class="menu-grupo-botao" type="button" aria-expanded="false" aria-controls="submenu-' + n + '">' + i.grupo + seta + "</button>" +
        '<div class="submenu" id="submenu-' + n + '">' + i.itens.map(link).join("") + "</div></div>";
    }).join("");

    // com muitas abas, o nome ao lado dos logos sai para o menu caber na mesma linha
    var topo = el("header", "topo" + (itens.length > 3 ? " menu-longo" : ""));
    topo.innerHTML =
      '<div class="conteiner">' +
        '<a class="marca" href="' + inicio + '" aria-label="' + nome + ', página inicial">' +
          '<img src="' + raiz("img/logo-governo-rn.png") + '" alt="Governo do Rio Grande do Norte">' +
          '<span class="divisor" aria-hidden="true"></span>' +
          '<img src="' + raiz("img/logo-suep.png") + '" alt="SUEP">' +
          '<span class="marca-nome">' + nome + "<small>" + sub + "</small></span>" +
        "</a>" +
        '<button class="menu-botao" type="button" aria-expanded="false" aria-controls="menu-principal" aria-label="Abrir menu">' +
          '<span aria-hidden="true"><i></i><i></i><i></i></span></button>' +
        '<nav class="menu" id="menu-principal" aria-label="Principal">' +
          '<div class="menu-cabeca"><span>Páginas</span>' +
            '<button class="menu-fechar" type="button" aria-label="Fechar menu">' +
              '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" aria-hidden="true"><path d="M6 6l12 12M18 6 6 18"/></svg></button></div>' +
          menu +
          // site público: a lupa fica no lugar do Instagram (que continua no rodapé, em Contato)
          (SITE === "publico"
            ? '<button class="busca-botao no-menu" type="button" aria-haspopup="dialog" aria-label="Pesquisar no site">' + ICONES.lupa + "</button>"
            : (contato.instagram ? '<a class="menu-insta" href="' + contato.instagram + '" target="_blank" rel="noopener" aria-label="Instagram da SUEP">' + ICONES.instagram + "</a>" : "")) +
          '<a class="menu-destaque" href="#contato">Contato</a>' +
        "</nav>" +
        '<span class="menu-fundo" aria-hidden="true"></span>' +
        (SITE === "publico" ? '<button class="busca-botao fora-menu" type="button" aria-haspopup="dialog" aria-label="Pesquisar no site">' + ICONES.lupa + "</button>" : "") +
      "</div>";

    lugar.appendChild(faixa);
    lugar.appendChild(topo);

    // no celular e no tablet o menu é uma gaveta que abre pela esquerda
    var botao = topo.querySelector(".menu-botao");
    function abrir(sim) {
      topo.classList.toggle("menu-aberto", sim);
      document.documentElement.classList.toggle("sem-rolagem", sim);
      botao.setAttribute("aria-expanded", sim ? "true" : "false");
      if (sim) topo.querySelector(".menu-fechar").focus(); else if (document.activeElement && topo.contains(document.activeElement)) botao.focus();
    }
    botao.addEventListener("click", function () { abrir(true); });
    topo.querySelector(".menu-fechar").addEventListener("click", function () { abrir(false); });
    topo.querySelector(".menu-fundo").addEventListener("click", function () { abrir(false); });
    document.addEventListener("keydown", function (e) { if (e.key === "Escape" && topo.classList.contains("menu-aberto")) abrir(false); });
    topo.querySelector(".menu").addEventListener("click", function (e) {
      if (e.target.closest("a")) abrir(false);
    });

    // grupos do menu: abrem ao clicar (e ao passar o mouse no computador); fecham ao clicar fora ou com Esc
    var grupos = Array.prototype.slice.call(topo.querySelectorAll(".menu-grupo"));
    function fecharGrupos(exceto) {
      grupos.forEach(function (g) {
        if (g === exceto) return;
        g.classList.remove("aberto");
        g.querySelector(".menu-grupo-botao").setAttribute("aria-expanded", "false");
      });
    }
    grupos.forEach(function (g) {
      var b = g.querySelector(".menu-grupo-botao");
      b.addEventListener("click", function () {
        var abre = !g.classList.contains("aberto");
        fecharGrupos(g);
        g.classList.toggle("aberto", abre);
        b.setAttribute("aria-expanded", abre ? "true" : "false");
      });
    });
    document.addEventListener("click", function (e) { if (!e.target.closest(".menu-grupo")) fecharGrupos(); });
    document.addEventListener("keydown", function (e) {
      if (e.key !== "Escape") return;
      var aberto = grupos.filter(function (g) { return g.classList.contains("aberto"); })[0];
      if (aberto) { fecharGrupos(); aberto.querySelector(".menu-grupo-botao").focus(); }
    });
  }

  /* ------------------------------------------------------------ busca no site (lupa do topo)
     A lista com o texto das páginas, dos cursos e das cidades fica em js/busca-indice.js,
     gerada por gerar-busca.ps1, e só é baixada quando a pessoa abre a busca. */
  var PALAVRAS_VAZIAS = ["a", "o", "as", "os", "de", "da", "do", "das", "dos", "e", "em", "no", "na", "nos", "nas", "um", "uma", "para", "por", "com", "que", "como", "sobre", "ao"];
  var SUGESTOES = ["Administração", "Mossoró", "Mulheres Mil", "estágio", "matrícula", "Informática"];

  function semAcentoMesmoTamanho(t) {
    // tira acentos sem mudar o tamanho do texto, para achar a posição do termo no texto original
    var r = "";
    for (var i = 0; i < t.length; i++) r += (semAcento(t[i]) || t[i]).charAt(0) || t[i];
    return r;
  }
  function escapar(t) { return t.replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); }
  function marcar(texto, termos) {
    var norm = semAcentoMesmoTamanho(texto), faixas = [];
    termos.forEach(function (t) { var i = norm.indexOf(t); while (i >= 0) { faixas.push([i, i + t.length]); i = norm.indexOf(t, i + t.length); } });
    faixas.sort(function (a, b) { return a[0] - b[0]; });
    var out = "", pos = 0;
    faixas.forEach(function (f) { if (f[0] < pos) return; out += escapar(texto.slice(pos, f[0])) + "<mark>" + escapar(texto.slice(f[0], f[1])) + "</mark>"; pos = f[1]; });
    return out + escapar(texto.slice(pos));
  }
  function trecho(texto, termos) {
    var norm = semAcentoMesmoTamanho(texto), i = -1;
    termos.some(function (t) { i = norm.indexOf(t); return i >= 0; });
    if (i < 0 || texto.length <= 170) return texto.slice(0, 170) + (texto.length > 170 ? "…" : "");
    var ini = Math.max(0, i - 60); ini = texto.lastIndexOf(" ", ini) + 1;
    var fim = Math.min(texto.length, ini + 170); if (fim < texto.length) fim = texto.lastIndexOf(" ", fim);
    return (ini > 0 ? "…" : "") + texto.slice(ini, fim) + (fim < texto.length ? "…" : "");
  }

  function montarBusca() {
    var botoes = Array.prototype.slice.call(document.querySelectorAll(".busca-botao"));
    if (!botoes.length) return;
    var indice = null, carregando = null;
    function carregar() {
      if (indice || carregando) return carregando;
      carregando = new Promise(function (ok, erro) {
        var s = document.createElement("script");
        s.src = raiz("js/busca-indice.js") + (VERSAO ? "?v=" + VERSAO : "");
        s.onload = function () {
          indice = (window.BUSCA_INDICE || []).map(function (i) {
            i._t = semAcento(i.t); i._n = semAcento(i.n); i._x = semAcento(i.x || ""); return i;
          });
          ok();
        };
        s.onerror = function () { carregando = null; erro(); };
        document.head.appendChild(s);
      });
      return carregando;
    }

    var caixa = el("div", "busca");
    caixa.hidden = true;
    caixa.innerHTML =
      '<div class="busca-fundo" data-fechar></div>' +
      '<div class="busca-janela" role="dialog" aria-modal="true" aria-label="Pesquisar no site">' +
        '<form class="busca-campo" role="search">' + ICONES.lupa +
          '<input type="search" placeholder="O que você procura? Ex.: Administração, Mossoró" aria-label="Termo de busca" autocomplete="off" enterkeyhint="search">' +
          '<button class="busca-fechar" type="button" data-fechar aria-label="Fechar busca"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" aria-hidden="true"><path d="M6 6l12 12M18 6 6 18"/></svg></button>' +
        "</form>" +
        '<div class="busca-corpo"><p class="busca-aviso" aria-live="polite"></p><ul class="busca-lista"></ul></div>' +
      "</div>";
    document.body.appendChild(caixa);
    var campo = caixa.querySelector("input"), lista = caixa.querySelector(".busca-lista"), aviso = caixa.querySelector(".busca-aviso");
    var ativo = -1;

    function sugerir() {
      aviso.textContent = "Pesquise páginas, cursos técnicos e cidades com escola.";
      lista.innerHTML = '<li class="busca-sugestoes">' + SUGESTOES.map(function (s) { return '<button type="button">' + s + "</button>"; }).join("") + "</li>";
      lista.querySelectorAll("button").forEach(function (b) { b.addEventListener("click", function () { campo.value = b.textContent; procurar(); campo.focus(); }); });
    }

    function procurar() {
      var q = campo.value.trim();
      ativo = -1;
      if (q.length < 2) { sugerir(); return; }
      if (!indice) { aviso.textContent = "Carregando…"; carregar().then(procurar, function () { aviso.textContent = "Não foi possível carregar a busca. Verifique a conexão e tente de novo."; }); return; }
      var termos = semAcento(q).split(/[^a-z0-9ºª]+/).filter(function (t) { return t && (t.length > 1 || /\d/.test(t)) && PALAVRAS_VAZIAS.indexOf(t) < 0; });
      if (!termos.length) termos = [semAcento(q)];
      var achados = [];
      indice.forEach(function (i) {
        // cidades e "onde há oferta" só aparecem pelo nome (senão um curso traria dezenas de cidades)
        var tudo = i._t + " " + i._n + " " + i._x;
        if ((i.k === "cidade" || i.k === "oferta") && !termos.some(function (t) { return i._t.indexOf(t) >= 0; })) return;
        if (!termos.every(function (t) { return tudo.indexOf(t) >= 0; })) return;
        var nota = 0;
        termos.forEach(function (t) {
          if (i._t.indexOf(t) >= 0) nota += 10;
          if (i._n.indexOf(t) >= 0) nota += 4;
          nota += Math.min(5, i._x.split(t).length - 1);
        });
        if (i.k === "curso" && i._t.indexOf(termos[0]) >= 0) nota += 12;
        if (i.k === "cidade" && i._t.indexOf(termos.join(" ")) >= 0) nota += 14;
        if (i.k === "oferta") nota += 10;
        if (i.k === "pagina") nota += 2;
        achados.push({ i: i, nota: nota });
      });
      achados.sort(function (a, b) { return b.nota - a.nota; });
      // a mesma seção não aparece duas vezes, e no máximo 10 resultados
      var vistos = {}, mostrar = [];
      achados.forEach(function (r) { var c = r.i.p + "#" + (r.i.a || "") + r.i.t; if (!vistos[c] && mostrar.length < 10) { vistos[c] = 1; mostrar.push(r.i); } });

      aviso.textContent = mostrar.length
        ? (achados.length > 10 ? "Os 10 resultados mais próximos de “" + q + "”" : mostrar.length + (mostrar.length === 1 ? " resultado" : " resultados") + " para “" + q + "”")
        : "Nada encontrado para “" + q + "”. Tente outra palavra ou procure nos documentos.";
      lista.innerHTML = mostrar.map(function (i) {
        var href = raiz(i.p) + (i.a ? "#" + i.a : "");
        var tipo = i.k === "curso" ? "Curso técnico" : (i.k === "cidade" || i.k === "oferta") ? "Onde estudar" : i.n;
        return '<li><a class="busca-item tipo-' + i.k + '" href="' + escapar(href) + '"><small>' + escapar(tipo) + "</small><b>" + marcar(i.t, termos) + "</b>" +
          (i.x ? "<span>" + marcar(trecho(i.x, termos), termos) + "</span>" : "") + "</a></li>";
      }).join("") +
        '<li><a class="busca-item busca-docs" href="' + raiz("documentos.html") + "?busca=" + encodeURIComponent(q) + '"><small>Documentos</small><b>Procurar “' + escapar(q) + '” nos documentos</b><span>Orientações, legislação, estruturas curriculares e PPCs para baixar.</span></a></li>';
    }

    function itens() { return Array.prototype.slice.call(lista.querySelectorAll(".busca-item")); }
    function destacar(n) {
      var todos = itens(); if (!todos.length) return;
      ativo = (n + todos.length) % todos.length;
      todos.forEach(function (a, k) { a.classList.toggle("ativo", k === ativo); });
      todos[ativo].scrollIntoView({ block: "nearest" });
    }

    var anterior = null;
    function abrir() {
      anterior = document.activeElement;
      caixa.hidden = false;
      document.documentElement.classList.add("sem-rolagem-busca");
      carregar();
      campo.select(); campo.focus();
      procurar();
    }
    function fechar() {
      caixa.hidden = true;
      document.documentElement.classList.remove("sem-rolagem-busca");
      if (anterior && anterior.focus) anterior.focus();
    }

    botoes.forEach(function (b) { b.addEventListener("click", abrir); b.addEventListener("pointerenter", carregar); });
    caixa.addEventListener("click", function (e) {
      if (e.target.closest("[data-fechar]")) { fechar(); return; }
      var a = e.target.closest("a.busca-item");
      if (!a) return;
      // link para a mesma página: fecha a busca; a página de escolas só lê o filtro ao carregar
      var destino = new URL(a.href, location.href);
      if (destino.pathname === location.pathname) {
        fechar();
        if (destino.hash && /municipio=|curso=/.test(destino.hash)) { e.preventDefault(); location.hash = destino.hash; location.reload(); }
      }
    });
    caixa.querySelector("form").addEventListener("submit", function (e) {
      e.preventDefault();
      var todos = itens(); var alvo = todos[ativo >= 0 ? ativo : 0];
      if (alvo) alvo.click();
    });
    campo.addEventListener("input", procurar);
    campo.addEventListener("keydown", function (e) {
      if (e.key === "ArrowDown") { e.preventDefault(); destacar(ativo + 1); }
      if (e.key === "ArrowUp") { e.preventDefault(); destacar(ativo - 1); }
    });
    document.addEventListener("keydown", function (e) {
      if (!caixa.hidden && e.key === "Escape") { fechar(); return; }
      if (!caixa.hidden && e.key === "Tab") {
        // o foco fica dentro da janela de busca
        var foco = Array.prototype.slice.call(caixa.querySelectorAll("input, button, a")).filter(function (x) { return x.offsetParent; });
        var i = foco.indexOf(document.activeElement);
        if (e.shiftKey && i <= 0) { e.preventDefault(); foco[foco.length - 1].focus(); }
        else if (!e.shiftKey && i === foco.length - 1) { e.preventDefault(); foco[0].focus(); }
      }
      // atalho: Ctrl+K ou "/" abrem a busca (fora de campos de texto)
      var digitando = /input|textarea|select/i.test((document.activeElement || {}).tagName || "");
      if (caixa.hidden && ((e.key === "k" && (e.ctrlKey || e.metaKey)) || (e.key === "/" && !digitando))) { e.preventDefault(); abrir(); }
    });
  }

  /* ------------------------------------------------------------ rodapé */
  function montarRodape() {
    var r = document.getElementById("rodape");
    if (!r) return;
    r.innerHTML =
      '<div class="rodape-ondas" aria-hidden="true"><svg viewBox="0 0 1440 70" preserveAspectRatio="none">' +
        '<path d="M0 40 C 240 0, 480 70, 760 34 S 1200 10, 1440 44 V70 H0 Z" fill="#a9c92b"/>' +
        '<path d="M0 52 C 300 22, 560 74, 860 46 S 1240 30, 1440 56 V70 H0 Z" fill="#222b63"/>' +
      "</svg></div>";

    var grade = el("div", "conteiner rodape-grade");
    grade.id = "contato";

    var c1 = el("div");
    c1.innerHTML = '<span class="rodape-logos"><img src="' + raiz("img/logo-governo-rn.png") + '" alt="Governo do Rio Grande do Norte"><i aria-hidden="true"></i><img src="' + raiz("img/logo-suep.png") + '" alt="SUEP"></span>';
    c1.appendChild(el("p", null, SITE === "paineis"
      ? "Painéis de dados da Rede Estadual de Educação Profissional e Tecnológica do Rio Grande do Norte."
      : "Educação Profissional e Tecnológica na rede pública estadual do Rio Grande do Norte."));
    grade.appendChild(c1);

    var c2 = el("div");
    c2.appendChild(el("h2", null, "SEEC/RN"));
    c2.appendChild(el("p", null, "Secretaria de Estado da Educação, do Esporte e do Lazer do Rio Grande do Norte"));
    grade.appendChild(c2);

    var c3 = el("div");
    c3.appendChild(el("h2", null, "Contato"));
    var end = el("address");
    (contato.endereco || []).forEach(function (l) { end.appendChild(el("span", null, l)); });
    if (contato.email) {
      var a = el("a", "rodape-email", contato.email);
      a.href = "mailto:" + contato.email;
      end.appendChild(a);
    }
    c3.appendChild(end);
    grade.appendChild(c3);

    var c4 = el("div");
    c4.appendChild(el("h2", null, "SUEP"));
    c4.appendChild(el("p", "destaque-lima", "Subcoordenadoria de Educação Profissional e Tecnológica"));
    if (contato.instagram) {
      var ig = el("a", "rodape-insta");
      ig.href = contato.instagram; ig.target = "_blank"; ig.rel = "noopener";
      ig.innerHTML = ICONES.instagram + "<span>Siga no Instagram</span>";
      c4.appendChild(ig);
    }
    grade.appendChild(c4);
    r.appendChild(grade);

    var base = el("div", "rodape-base");
    base.textContent = "© " + new Date().getFullYear() + " Governo do Estado do Rio Grande do Norte · SEEC/RN · SUEP";
    r.appendChild(base);
    var faixa = el("div", "faixa-cores");
    faixa.setAttribute("aria-hidden", "true");
    faixa.innerHTML = "<i></i><i></i><i></i><i></i>";
    r.appendChild(faixa);
  }

  /* ------------------------------------------------------------ cartões dos painéis */
  function cartao(p) {
    var publicado = linkValido(p.link);
    var art = el("article", "painel");
    art.dataset.busca = semAcento([p.titulo, p.resumo].concat(p.temas || []).join(" "));

    var caixa = el("div", "painel-imagem");
    var img = el("img");
    img.src = imagem(p.miniatura || "img/ilustracao-rn.png");
    img.alt = "Capa do painel " + p.titulo;
    img.loading = "lazy";
    caixa.appendChild(img);
    caixa.appendChild(el("span", "selo" + (publicado ? "" : " em-breve"), publicado ? "Disponível" : "Em breve"));
    art.appendChild(caixa);

    var corpo = el("div", "painel-corpo");
    corpo.appendChild(el("h3", null, p.titulo));
    corpo.appendChild(el("p", null, p.resumo));
    if (p.temas && p.temas.length) {
      var temas = el("div", "temas");
      p.temas.forEach(function (t) { temas.appendChild(el("span", null, t)); });
      corpo.appendChild(temas);
    }
    var rodape = el("div", "painel-rodape");
    rodape.appendChild(el("small", null, (p.paginas || []).length + " páginas · " + (p.atualizado || "")));
    var botao = el("a", "botao indigo", "Abrir painel");
    botao.href = "painel.html?id=" + encodeURIComponent(p.id);
    rodape.appendChild(botao);
    corpo.appendChild(rodape);
    art.appendChild(corpo);
    return art;
  }

  function montarLista() {
    var grade = document.getElementById("grade");
    if (!grade) return;
    paineis.forEach(function (p) { grade.appendChild(cartao(p)); });
    var total = document.getElementById("total-paineis");
    if (total) total.textContent = paineis.length + (paineis.length === 1 ? " painel" : " painéis");
    var busca = document.getElementById("busca");
    var vazio = document.getElementById("vazio");
    busca.addEventListener("input", function () {
      var termo = semAcento(busca.value.trim());
      var visiveis = 0;
      Array.prototype.forEach.call(grade.children, function (c) {
        var mostra = !termo || c.dataset.busca.indexOf(termo) >= 0;
        c.hidden = !mostra;
        if (mostra) visiveis++;
      });
      vazio.hidden = visiveis > 0;
    });
  }

  function montarPainel() {
    var id = new URLSearchParams(location.search).get("id");
    var p = paineis.filter(function (x) { return x.id === id; })[0] || paineis[0];
    if (!p) return;
    document.title = p.titulo + " · Painéis da EPT/RN";
    document.getElementById("trilha-titulo").textContent = p.titulo;
    document.getElementById("titulo").textContent = p.titulo;
    document.getElementById("resumo").textContent = p.resumo;
    document.getElementById("fonte").textContent = p.fonte + (p.atualizado ? " Atualizado em: " + p.atualizado + "." : "");
    var lista = document.getElementById("paginas");
    (p.paginas || []).forEach(function (nome) { lista.appendChild(el("li", null, nome)); });

    var quadro = document.getElementById("quadro");
    if (linkValido(p.link)) {
      var caixa = el("div", "quadro-proporcao");
      var iframe = el("iframe");
      iframe.title = p.titulo;
      iframe.src = p.link.trim();
      iframe.setAttribute("allowfullscreen", "true");
      caixa.appendChild(iframe);
      quadro.appendChild(caixa);
      var cheia = document.getElementById("tela-cheia");
      cheia.href = p.link.trim();
      cheia.hidden = false;
    } else {
      var ag = el("div", "aguardando");
      var img = el("img");
      img.src = imagem(p.miniatura || "img/ilustracao-rn.png");
      img.alt = "";
      ag.appendChild(img);
      ag.appendChild(el("h2", null, "Este painel será publicado em breve"));
      ag.appendChild(el("p", null, "O painel interativo aparecerá aqui assim que for liberado pela equipe da SUEP."));
      quadro.appendChild(ag);
    }
  }

  /* ------------------------------------------------------------ documentos para download */
  var ICONE_BAIXAR = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 4v11"/><path d="m7 10 5 5 5-5"/><path d="M5 20h14"/></svg>';
  var ICONE_ABRIR = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M14 4h6v6"/><path d="M20 4 10 14"/><path d="M19 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h5"/></svg>';

  function tamanho(b) {
    if (!b) return "";
    var mb = b / 1048576;
    return mb >= 1 ? mb.toFixed(1).replace(".", ",") + " MB" : Math.max(1, Math.round(b / 1024)) + " KB";
  }

  function montarDocumentos() {
    var docs = window.DOCUMENTOS || [];
    var cats = window.DOC_CATEGORIAS || [];
    var abas = document.getElementById("divisorias");
    var lista = document.getElementById("docs-lista");
    var pasta = document.getElementById("pasta");
    var resultado = document.getElementById("docs-resultado");
    var busca = document.getElementById("docs-busca");
    if (!abas) return;
    docs.forEach(function (d) { d._busca = semAcento([d.titulo, d.sub, d.nota, d.tipo].join(" ")); });

    var atual = (location.hash || "").replace("#", "");
    if (!cats.some(function (c) { return c.id === atual; })) atual = cats[0] && cats[0].id;

    cats.forEach(function (c, i) {
      var b = el("button", "divisoria");
      b.type = "button";
      b.setAttribute("role", "tab");
      b.dataset.cat = c.id;
      b.dataset.cor = String(i % 4);
      var qtd = docs.filter(function (d) { return d.cat === c.id; }).length;
      b.innerHTML = "<span></span><small></small>";
      b.querySelector("span").textContent = c.nome;
      b.querySelector("small").textContent = qtd + (qtd === 1 ? " item" : " itens");
      b.addEventListener("click", function () { atual = c.id; busca.value = ""; history.replaceState(null, "", "#" + c.id); desenhar(); });
      abas.appendChild(b);
    });

    function linha(d) {
      var li = el("li", "doc");
      var rotulo = d.tipo === "PASTA" ? "DRIVE" : d.tipo;
      var tipo;
      if (d.miniatura) {
        // miniatura da 1ª página do documento, com o tipo num selo por cima
        tipo = el("a", "doc-capa");
        tipo.href = encodeURI(d.arquivo);
        tipo.setAttribute("download", "");
        tipo.setAttribute("tabindex", "-1");
        tipo.setAttribute("aria-hidden", "true");
        var img = el("img");
        img.src = encodeURI(d.miniatura);
        img.alt = "";
        img.loading = "lazy";
        tipo.appendChild(img);
        tipo.appendChild(el("span", "doc-selo tipo-" + (d.tipo || "").toLowerCase(), rotulo));
      } else {
        tipo = el("span", "doc-tipo tipo-" + (d.tipo || "").toLowerCase(), rotulo);
      }
      var info = el("div", "doc-info");
      info.appendChild(el("strong", null, d.titulo));
      var meta = [];
      if (d.versao) meta.push(d.versao);
      if (d.nota) meta.push(d.nota);
      if (d.tamanho) meta.push(tamanho(d.tamanho));
      if (meta.length) info.appendChild(el("span", null, meta.join(" · ")));
      var a = el("a", "botao doc-botao");
      if (d.link) {
        a.href = d.link; a.target = "_blank"; a.rel = "noopener";
        a.innerHTML = ICONE_ABRIR + "<span>Abrir</span>";
        a.setAttribute("aria-label", "Abrir no Google Drive: " + d.titulo);
      } else {
        a.href = encodeURI(d.arquivo);
        a.setAttribute("download", "");
        a.innerHTML = ICONE_BAIXAR + "<span>Baixar</span>";
        a.setAttribute("aria-label", "Baixar " + d.titulo + " (" + d.tipo + ", " + tamanho(d.tamanho) + ")");
      }
      li.appendChild(tipo); li.appendChild(info); li.appendChild(a);
      return li;
    }

    function desenhar() {
      var termo = semAcento(busca.value.trim());
      var visiveis = termo
        ? docs.filter(function (d) { return termo.split(/\s+/).every(function (p) { return d._busca.indexOf(p) >= 0; }); })
        : docs.filter(function (d) { return d.cat === atual; });
      Array.prototype.forEach.call(abas.children, function (b) {
        var ativa = !termo && b.dataset.cat === atual;
        b.classList.toggle("ativa", ativa);
        b.setAttribute("aria-selected", ativa ? "true" : "false");
      });
      var corAtual = termo ? "busca" : String(cats.map(function (c) { return c.id; }).indexOf(atual) % 4);
      pasta.dataset.cor = corAtual;
      lista.innerHTML = "";
      resultado.textContent = termo
        ? visiveis.length + (visiveis.length === 1 ? " documento encontrado" : " documentos encontrados") + " para “" + busca.value.trim() + "”"
        : "";
      if (!visiveis.length) { lista.appendChild(el("p", "vazio", "Nenhum documento encontrado. Tente outra palavra.")); return; }
      var grupos = [];
      visiveis.forEach(function (d) {
        var chave = (termo ? cats.filter(function (c) { return c.id === d.cat; })[0].nome + " · " : "") + d.sub;
        var g = grupos.filter(function (x) { return x.nome === chave; })[0];
        if (!g) { g = { nome: chave, itens: [] }; grupos.push(g); }
        g.itens.push(d);
      });
      grupos.forEach(function (g) {
        var sec = el("section", "doc-grupo");
        var h = el("h2", null, g.nome);
        h.appendChild(el("small", null, g.itens.length + (g.itens.length === 1 ? " arquivo" : " arquivos")));
        sec.appendChild(h);
        var ul = el("ul", "doc-lista");
        g.itens.forEach(function (d) { ul.appendChild(linha(d)); });
        sec.appendChild(ul);
        lista.appendChild(sec);
      });
    }

    busca.addEventListener("input", desenhar);
    window.addEventListener("hashchange", function () {
      var h = location.hash.replace("#", "");
      if (cats.some(function (c) { return c.id === h; })) { atual = h; busca.value = ""; desenhar(); }
    });
    // busca vinda de outra página (ex.: documentos.html?busca=Informática, a partir da página do curso)
    var pedida = new URLSearchParams(location.search).get("busca");
    if (pedida) busca.value = pedida;
    desenhar();
  }

  /* Instagram em links soltos das páginas (data-instagram) */
  function ligarInstagram() {
    document.querySelectorAll("[data-instagram]").forEach(function (a) {
      if (contato.instagram) a.href = contato.instagram; else a.hidden = true;
    });
    document.querySelectorAll("[data-email]").forEach(function (a) {
      if (contato.email) { a.href = "mailto:" + contato.email; if (a.hasAttribute("data-email-texto")) a.textContent = contato.email; }
      else a.hidden = true;
    });
  }

  function iniciar(pagina, site) {
    SITE = site === "paineis" ? "paineis" : "publico";
    montarTopo(pagina);
    montarBusca();
    montarRodape();
    ligarInstagram();
    if (pagina === "lista") montarLista();
    if (pagina === "painel") montarPainel();
    if (pagina === "documentos") montarDocumentos();
  }

  return { iniciar: iniciar };
})();
