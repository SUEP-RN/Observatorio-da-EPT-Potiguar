window.Site = (function () {
  var paineis = window.PAINEIS || [];

  // Só aceita links de "Publicar na Web" do Power BI
  function linkValido(link) {
    return typeof link === "string" && /^https:\/\/app\.powerbi\.com\/view\?r=/.test(link.trim());
  }

  function el(tag, classe, texto) {
    var e = document.createElement(tag);
    if (classe) e.className = classe;
    if (texto !== undefined) e.textContent = texto;
    return e;
  }

  function semAcento(t) {
    return (t || "").normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();
  }

  function cartao(p) {
    var publicado = linkValido(p.link);
    var art = el("article", "painel");
    art.dataset.busca = semAcento([p.titulo, p.resumo].concat(p.temas || []).join(" "));

    var imagem = el("div", "painel-imagem" + (p.miniatura ? "" : " sem-imagem"));
    var img = el("img");
    img.src = p.miniatura || "img/ilustracao-rn.png";
    img.alt = p.miniatura ? "Capa do painel " + p.titulo : "";
    img.loading = "lazy";
    imagem.appendChild(img);
    imagem.appendChild(el("span", "etiqueta" + (publicado ? "" : " em-breve"), publicado ? "Disponível" : "Em breve"));
    art.appendChild(imagem);

    var corpo = el("div", "painel-corpo");
    corpo.appendChild(el("h3", null, p.titulo));
    corpo.appendChild(el("p", null, p.resumo));

    if (p.temas && p.temas.length) {
      var temas = el("div", "temas");
      p.temas.forEach(function (t) { temas.appendChild(el("span", null, t)); });
      corpo.appendChild(temas);
    }
    if (p.destaques && p.destaques.length) {
      var d = el("div", "destaques");
      p.destaques.forEach(function (x) {
        var c = el("div");
        c.appendChild(el("strong", null, x.valor));
        c.appendChild(el("span", null, x.rotulo));
        d.appendChild(c);
      });
      corpo.appendChild(d);
    }
    var rodape = el("div", "painel-rodape");
    rodape.appendChild(el("small", null, (p.paginas || []).length + " páginas · " + (p.atualizado || "")));
    var botao = el("a", "botao", "Abrir painel →");
    botao.href = "painel.html?id=" + encodeURIComponent(p.id);
    rodape.appendChild(botao);
    corpo.appendChild(rodape);
    art.appendChild(corpo);
    return art;
  }

  function montarInicio() {
    var grade = document.getElementById("grade");
    paineis.forEach(function (p) { grade.appendChild(cartao(p)); });

    // Números da abertura: quantos painéis e quantas páginas de análise
    var totalPaginas = paineis.reduce(function (s, p) { return s + (p.paginas || []).length; }, 0);
    var publicados = paineis.filter(function (p) { return linkValido(p.link); }).length;
    var numeros = document.getElementById("numeros");
    var itens = [[paineis.length, paineis.length === 1 ? "painel" : "painéis"], [totalPaginas, "páginas de análise"]];
    if (publicados > 0) itens.push([publicados, publicados === 1 ? "disponível agora" : "disponíveis agora"]);
    itens.forEach(function (n) {
      var c = el("div", "numero");
      c.appendChild(el("strong", null, String(n[0])));
      c.appendChild(el("span", null, n[1]));
      numeros.appendChild(c);
    });

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
      iframe.loading = "lazy";
      caixa.appendChild(iframe);
      quadro.appendChild(caixa);
      var cheia = document.getElementById("tela-cheia");
      cheia.href = p.link.trim();
      cheia.hidden = false;
    } else {
      var aguardando = el("div", "aguardando");
      var img = el("img");
      img.src = p.miniatura || "img/ilustracao-rn.png";
      img.alt = "";
      aguardando.appendChild(img);
      aguardando.appendChild(el("h2", null, "Este painel será publicado em breve"));
      aguardando.appendChild(el("p", null, "O painel interativo aparecerá aqui assim que for liberado pela equipe da SUEP."));
      quadro.appendChild(aguardando);
    }
  }

  return { montarInicio: montarInicio, montarPainel: montarPainel };
})();
