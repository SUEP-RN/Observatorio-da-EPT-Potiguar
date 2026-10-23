/* Monta as partes comuns (topo, rodapé) e as listas a partir de js/paineis.js.
   Dois sites usam este arquivo:
     - site público (raiz): Site.iniciar("inicio" | "sobre")
     - site dos painéis (pasta paineis/): Site.iniciar("lista" | "painel", "paineis")
   Não precisa editar este arquivo: textos e links ficam em paineis.js. */
window.Site = (function () {
  var paineis = window.PAINEIS || [];
  var contato = window.CONTATO || {};
  var BASE = "";        // caminho até a raiz do site público ("" ou "../")
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
      itens = [["index.html", "Painéis", "lista"], [raiz("index.html"), "Site da SUEP", ""], [raiz("sobre.html"), "A SUEP e a EPT", ""]];
      nome = "Painéis da EPT/RN"; sub = "Dados da Rede Estadual de Educação Profissional"; inicio = "index.html";
    } else {
      itens = [["index.html", "Início", "inicio"], ["sobre.html", "A SUEP e a EPT", "sobre"], ["paineis/index.html", "Painéis de dados", ""]];
      nome = "SUEP · EPT/RN"; sub = "Subcoordenadoria de Educação Profissional e Tecnológica"; inicio = "index.html";
    }
    var menu = itens.map(function (i) {
      return '<a href="' + i[0] + '"' + (i[2] && i[2] === atual ? ' aria-current="page"' : "") + ">" + i[1] + "</a>";
    }).join("");

    var topo = el("header", "topo");
    topo.innerHTML =
      '<div class="conteiner">' +
        '<a class="marca" href="' + inicio + '" aria-label="' + nome + ', página inicial">' +
          '<img src="' + raiz("img/logo-governo-rn.png") + '" alt="Governo do Rio Grande do Norte">' +
          '<span class="divisor" aria-hidden="true"></span>' +
          '<img src="' + raiz("img/logo-suep.png") + '" alt="SUEP">' +
          '<span class="marca-nome">' + nome + "<small>" + sub + "</small></span>" +
        "</a>" +
        '<nav class="menu" aria-label="Principal">' + menu +
          (contato.instagram ? '<a class="menu-insta" href="' + contato.instagram + '" target="_blank" rel="noopener" aria-label="Instagram da SUEP">' + ICONES.instagram + "</a>" : "") +
          '<a class="menu-destaque" href="#contato">Contato</a>' +
        "</nav>" +
      "</div>";

    lugar.appendChild(faixa);
    lugar.appendChild(topo);
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
    var botao = el("a", "botao indigo", "Abrir painel →");
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

  /* Instagram em links soltos das páginas (data-instagram) */
  function ligarInstagram() {
    document.querySelectorAll("[data-instagram]").forEach(function (a) {
      if (contato.instagram) a.href = contato.instagram; else a.hidden = true;
    });
  }

  function iniciar(pagina, site) {
    SITE = site === "paineis" ? "paineis" : "publico";
    BASE = SITE === "paineis" ? "../" : "";
    montarTopo(pagina);
    montarRodape();
    ligarInstagram();
    if (pagina === "lista") montarLista();
    if (pagina === "painel") montarPainel();
  }

  return { iniciar: iniciar };
})();
