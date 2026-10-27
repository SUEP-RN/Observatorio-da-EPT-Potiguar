/* Capa de teste: movimento das fotos com o mouse, faixa de cursos sem fim,
   engrenagens soltas nas seções e seções que aparecem ao rolar. */
(function () {
  var parado = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // faixa de cursos: duplica a lista para correr sem emenda
  var faixa = document.getElementById("faixa-cursos");
  if (faixa) {
    Array.prototype.slice.call(faixa.children).forEach(function (li) {
      var c = li.cloneNode(true); c.setAttribute("aria-hidden", "true"); faixa.appendChild(c);
    });
  }

  // fotos, mapa e engrenagens se mexem um pouco seguindo o mouse
  var capa = document.getElementById("capa");
  var pecas = capa ? capa.querySelectorAll("[data-p]") : [];
  if (capa && !parado) {
    capa.addEventListener("mousemove", function (e) {
      var r = capa.getBoundingClientRect();
      var x = (e.clientX - r.left) / r.width - 0.5;
      var y = (e.clientY - r.top) / r.height - 0.5;
      Array.prototype.forEach.call(pecas, function (p) {
        var k = Number(p.dataset.p) || 0;
        p.style.transform = "translate(" + (-x * k).toFixed(1) + "px," + (-y * k).toFixed(1) + "px)";
      });
    });
    capa.addEventListener("mouseleave", function () {
      Array.prototype.forEach.call(pecas, function (p) { p.style.transform = ""; });
    });
  }

  // engrenagens soltas em algumas seções
  var ENG = '<svg viewBox="0 0 100 100"><use href="#engrenagem"/></svg>';
  [[".numeros", "right: 3%; top: 40px; width: 64px; height: 64px; --c: var(--amarelo)"],
   [".acontece", "left: 46%; top: 30px; width: 54px; height: 54px; --c: var(--amarelo)"],
   [".vozes", "right: 4%; top: 36px; width: 70px; height: 70px; --c: #222b63"]].forEach(function (par) {
    var s = document.querySelector(par[0]);
    if (!s) return;
    if (getComputedStyle(s).position === "static") s.style.position = "relative";
    var e = document.createElement("span");
    e.className = "eng-solta"; e.setAttribute("aria-hidden", "true"); e.style.cssText = par[1]; e.innerHTML = ENG;
    s.appendChild(e);
  });

  // seções aparecem suavemente ao rolar a página
  if (!parado && "IntersectionObserver" in window) {
    var obs = new IntersectionObserver(function (itens) {
      itens.forEach(function (i) { if (i.isIntersecting) { i.target.classList.add("visivel"); obs.unobserve(i.target); } });
    }, { threshold: 0.12 });
    document.querySelectorAll("main > section:not(.capa-viva) .conteiner").forEach(function (c) { c.classList.add("revelar"); obs.observe(c); });
  }
})();
