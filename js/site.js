/* Monta as partes comuns (topo, rodapé) e as listas.
   O mesmo arquivo serve aos dois sites, que ficam em endereços separados:
     - site público da SUEP/EPT: Site.iniciar("inicio" | "ept" | "sobre" | "acompanhamento" | "boas-praticas" | "agenda" | "documentos")
     - site dos painéis (uso interno): Site.iniciar("lista" | "painel", "paineis")
   Não precisa editar este arquivo: contato em js/contato.js e painéis em js/paineis.js. */
window.Site = (function () {
  var paineis = window.PAINEIS || [];
  var contato = window.CONTATO || {};
  var BASE = "";
  var SITE = "publico";

  var ICONES = {
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
      itens = [
        ["index.html", "Início", "inicio"],
        ["ept.html", "EPT estadual", "ept"],
        ["onde-estudar.html", "Onde estudar", "onde-estudar"],
        ["sobre.html", "A SUEP", "sobre"],
        ["acompanhamento.html", "Acompanhamento", "acompanhamento"],
        ["boas-praticas.html", "Boas práticas", "boas-praticas"],
        ["agenda.html", "Agenda formativa", "agenda"],
        ["documentos.html", "Documentos", "documentos"]
      ];
      nome = "SUEP · EPT/RN"; sub = "Subcoordenadoria de Educação Profissional e Tecnológica"; inicio = "index.html";
    }
    var menu = itens.map(function (i) {
      return '<a href="' + i[0] + '"' + (i[2] && i[2] === atual ? ' aria-current="page"' : "") + ">" + i[1] + "</a>";
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
          (contato.instagram ? '<a class="menu-insta" href="' + contato.instagram + '" target="_blank" rel="noopener" aria-label="Instagram da SUEP">' + ICONES.instagram + "</a>" : "") +
          '<a class="menu-destaque" href="#contato">Contato</a>' +
        "</nav>" +
        '<span class="menu-fundo" aria-hidden="true"></span>' +
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
    c1.innerHTML = '<span class="rodape-logos"><img src="' + raiz("img/logo-governo-rn.png") + '" alt="Governo do Rio Grande do Norte"><img src="' + raiz("img/logo-suep.png") + '" alt="SUEP"></span>';
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
    montarRodape();
    ligarInstagram();
    if (pagina === "lista") montarLista();
    if (pagina === "painel") montarPainel();
    if (pagina === "documentos") montarDocumentos();
  }

  return { iniciar: iniciar };
})();
