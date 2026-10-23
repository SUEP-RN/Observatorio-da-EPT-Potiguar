/* CONTATO: aparece no rodapé de todas as páginas.
   Preencha o e-mail da SUEP (enquanto estiver vazio, a linha de e-mail não aparece). */
window.CONTATO = {
  email: "suep@educar.rn.gov.br",
  endereco: ["Av. Senador Salgado Filho", "Lagoa Nova · Natal/RN", "CEP 59064-901"],
  // Na revista aparece @suepseecrn; confira qual é o perfil certo
  instagram: "https://www.instagram.com/suespseecrn/"
};

/* PAINÉIS: para publicar um painel, cole em "link" o endereço do Power BI
   (Arquivo › Inserir relatório › Publicar na Web). */
window.PAINEIS = [
  {
    id: "indicadores-ept-2025",
    titulo: "Indicadores de Qualidade da EPT 2025",
    resumo:
      "Rendimento escolar, proficiência no SAEB e IDEB das unidades da rede estadual com oferta de EPT em tempo integral e parcial.",
    temas: ["Rendimento escolar", "SAEB", "IDEB"],
    atualizado: "Outubro de 2026",
    miniatura: "img/miniatura-indicadores.png",
    destaques: [],
    paginas: [
      "Início",
      "Visão Geral",
      "DIRECs",
      "Rendimento por Curso",
      "Jornada e Perfil",
      "SAEB e IDEB",
      "Painel por Escola"
    ],
    fonte:
      "Monitoramento dos indicadores de qualidade da EPT (RN) 2025 · SUEP/SEEC-RN. SAEB e IDEB: INEP.",
    link: "https://app.powerbi.com/view?r=eyJrIjoiMjEyMjRmZTAtNjAxNy00NDE3LThhMzUtNzBmOTBlZDA3OWE2IiwidCI6ImY5NmYxNTc1LTdjMmEtNDA5OS05NzljLTUxMGY1MDIxZGE2YiJ9"
  },
  {
    id: "visitas-tecnicas-2026",
    titulo: "Visitas Técnicas 2026",
    resumo:
      "Resultados das visitas técnicas da SUEP às unidades da rede estadual de EPT: oferta, docentes, permanência, infraestrutura e relação com o setor produtivo.",
    temas: ["Visitas técnicas", "Oferta", "Infraestrutura"],
    atualizado: "2026",
    miniatura: "img/miniatura-visitas.png",
    destaques: [],
    paginas: [
      "Capa",
      "Visão Geral",
      "Oferta",
      "Docentes",
      "Planejamento e Integração",
      "Pesquisa e Inovação",
      "Permanência",
      "PPP e Documentos",
      "Sistemas",
      "Setor Produtivo",
      "Infraestrutura"
    ],
    fonte: "Pesquisa de visitas técnicas · SUEP/SEEC-RN.",
    link: "https://app.powerbi.com/view?r=eyJrIjoiOTY0Nzg5MDItMDk0ZC00YTYxLWE1MTAtNWExMDdhNWMxNmNlIiwidCI6ImY5NmYxNTc1LTdjMmEtNDA5OS05NzljLTUxMGY1MDIxZGE2YiJ9"
  }
];
