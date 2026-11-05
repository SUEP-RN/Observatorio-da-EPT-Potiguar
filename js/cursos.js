/* Os 18 cursos técnicos da rede estadual: o que é o curso, o que se aprende, o que o técnico faz e onde trabalha.
   A oferta (unidades, municípios, formas) vem de js/onde-estudar.js. Para editar um texto, mude só aqui
   e depois rode gerar-busca.ps1, para a busca do site ler o texto novo.
   Mantenha as chaves entre aspas duplas: o gerador da busca lê esta lista como JSON. */
window.CURSOS = [
  {
    "id": "administracao", "nome": "Administração",
    "sobre": "Toda organização precisa de alguém que cuide das pessoas, do dinheiro, dos materiais e do atendimento. O curso prepara para apoiar essa gestão no dia a dia, em empresas de qualquer tamanho, em órgãos públicos e no próprio negócio.",
    "aprende": ["Rotinas de pessoal: admissão, folha de pagamento e direitos trabalhistas", "Noções de contabilidade, custos e finanças", "Compras, controle de estoque e vendas", "Marketing, atendimento ao cliente e comunicação empresarial", "Empreendedorismo e plano de negócios"],
    "faz": "Apoia a gestão de empresas e órgãos públicos. Organiza documentos e arquivos, acompanha as rotinas de pessoal, ajuda no controle financeiro, nas compras e nas vendas, e atende clientes e fornecedores.",
    "atua": "Empresas de todos os setores, comércio, bancos e cooperativas, escritórios de contabilidade, órgãos públicos e o próprio negócio.",
    "combina": "Você gosta de organizar, de planejar e de lidar com pessoas e números."
  },
  {
    "id": "agroecologia", "nome": "Agroecologia",
    "sobre": "A agroecologia produz alimentos respeitando o solo, a água e a vida no campo, sem depender de agrotóxicos. É um curso ligado à agricultura familiar, que tem grande peso no interior do Rio Grande do Norte.",
    "aprende": ["Manejo e conservação do solo e da água", "Cultivo de hortas, pomares e lavouras de base ecológica", "Criação de animais e produção de adubos naturais", "Convivência com o semiárido e uso da água da chuva", "Organização de cooperativas e venda da produção"],
    "faz": "Planeja e conduz a produção agropecuária de base ecológica. Orienta agricultores no manejo do solo, das plantas e dos animais, cuida da água e da biodiversidade e ajuda a organizar a venda da produção.",
    "atua": "Propriedades rurais e agricultura familiar, cooperativas e associações, assistência técnica rural, feiras e projetos ambientais.",
    "combina": "Você gosta do campo, da natureza e de produzir alimentos saudáveis."
  },
  {
    "id": "alimentos", "nome": "Alimentos",
    "sobre": "Do leite ao pão, quase tudo o que comemos passa por algum processamento antes de chegar à mesa. O curso ensina a transformar, conservar e garantir a qualidade dos alimentos e bebidas.",
    "aprende": ["Processamento de leite, carnes, frutas, hortaliças e panificados", "Higiene, boas práticas e segurança dos alimentos", "Análises de laboratório e controle de qualidade", "Embalagem, conservação e armazenamento", "Desenvolvimento de novos produtos"],
    "faz": "Acompanha o processamento, a conservação e o controle de qualidade de alimentos e bebidas. Faz análises, aplica as normas de higiene e ajuda a desenvolver novos produtos.",
    "atua": "Agroindústrias, laticínios, padarias e indústrias de bebidas, laboratórios, serviços de inspeção de alimentos e o próprio negócio.",
    "combina": "Você se interessa por cozinha, ciência e por como as coisas são produzidas."
  },
  {
    "id": "edificacoes", "nome": "Edificações",
    "sobre": "Casas, escolas, prédios e pontes começam no papel. O curso prepara para participar de todas as etapas da construção civil, do desenho do projeto à obra pronta.",
    "aprende": ["Desenho técnico e projetos no computador", "Materiais e técnicas de construção", "Orçamento e planejamento de obras", "Instalações elétricas e hidráulicas de edificações", "Topografia e segurança no canteiro de obras"],
    "faz": "Desenvolve e acompanha projetos e obras de construção civil. Faz desenhos e orçamentos, controla materiais e prazos e acompanha a execução no canteiro, junto com engenheiros e arquitetos.",
    "atua": "Construtoras, escritórios de engenharia e arquitetura, obras públicas, prefeituras e lojas de materiais de construção.",
    "combina": "Você gosta de desenhar, de matemática e de ver um projeto virar realidade."
  },
  {
    "id": "eletrotecnica", "nome": "Eletrotécnica",
    "sobre": "A energia elétrica move casas, comércios e indústrias. O curso forma quem projeta, instala e mantém as instalações elétricas, sempre com atenção às normas de segurança.",
    "aprende": ["Eletricidade e circuitos elétricos", "Instalações elétricas residenciais, prediais e industriais", "Máquinas elétricas, motores e comandos", "Leitura de projetos e normas de segurança", "Eficiência energética e noções de energia solar"],
    "faz": "Projeta, instala e mantém instalações elétricas, máquinas e quadros de comando. Faz medições, encontra e corrige defeitos e segue as normas de segurança em todo o trabalho.",
    "atua": "Indústrias, concessionárias de energia, empresas de instalação e manutenção elétrica, construção civil e trabalho autônomo.",
    "combina": "Você gosta de entender como os aparelhos funcionam e de trabalhar com as mãos."
  },
  {
    "id": "guia-de-turismo", "nome": "Guia de Turismo",
    "sobre": "O Rio Grande do Norte recebe visitantes do Brasil e do mundo por suas praias, dunas, serras e cultura. O guia de turismo é quem apresenta esses lugares com conhecimento, segurança e boa conversa.",
    "aprende": ["História, cultura e geografia do RN e do Brasil", "Planejamento e condução de roteiros", "Atendimento e relação com o visitante", "Noções de língua estrangeira", "Primeiros socorros e segurança em passeios"],
    "faz": "Conduz e orienta visitantes em roteiros turísticos. Apresenta a cultura, a história e a natureza da região, cuida do grupo durante o passeio e ajuda a planejar os roteiros.",
    "atua": "Agências e operadoras de turismo, hotéis e pousadas, eventos, museus e atrativos turísticos, e trabalho como guia autônomo.",
    "combina": "Você gosta de conversar, de conhecer lugares e de contar histórias."
  },
  {
    "id": "informatica", "nome": "Informática",
    "sobre": "Quase todo trabalho hoje passa por um computador ou um celular. O curso ensina a criar programas e sites e a cuidar dos sistemas que as empresas e as pessoas usam todos os dias.",
    "aprende": ["Lógica e programação", "Criação de sites e aplicativos", "Banco de dados", "Montagem, configuração e manutenção de computadores", "Noções de redes e de segurança da informação"],
    "faz": "Desenvolve programas e sites, cuida de bancos de dados e dá suporte ao uso de computadores. Instala e configura sistemas e ajuda as pessoas a usar a tecnologia no trabalho.",
    "atua": "Empresas de tecnologia, setores de TI de empresas e órgãos públicos, escolas e trabalho autônomo, inclusive à distância.",
    "combina": "Você gosta de tecnologia, de resolver problemas e de aprender coisas novas."
  },
  {
    "id": "logistica", "nome": "Logística",
    "sobre": "Para um produto chegar à prateleira ou à casa de alguém, ele precisa ser comprado, guardado, transportado e entregue no tempo certo. A logística organiza todo esse caminho.",
    "aprende": ["Compras e relação com fornecedores", "Controle de estoques e armazenagem", "Transporte e distribuição de cargas", "Custos, prazos e indicadores de desempenho", "Sistemas de gestão e comércio exterior"],
    "faz": "Organiza o caminho dos materiais e produtos: compras, estoques, armazenagem, transporte e entrega. Planeja rotas e prazos, controla custos e busca formas de entregar mais rápido e melhor.",
    "atua": "Indústrias, comércio e supermercados, transportadoras, centros de distribuição, portos e aeroportos.",
    "combina": "Você gosta de organizar, de planejar e de fazer as coisas acontecerem no prazo."
  },
  {
    "id": "manutencao-e-suporte-em-informatica", "nome": "Manutenção e Suporte em Informática",
    "sobre": "Quando o computador para, o trabalho para. O curso forma quem monta, conserta e mantém computadores funcionando e ajuda as pessoas a resolver problemas com a tecnologia.",
    "aprende": ["Montagem e manutenção de computadores e notebooks", "Instalação de sistemas operacionais e programas", "Impressoras e outros periféricos", "Redes locais e internet", "Atendimento ao usuário e cópias de segurança"],
    "faz": "Monta, configura e conserta computadores e periféricos, instala sistemas e atende os usuários. Encontra a causa dos defeitos, troca peças e orienta sobre o uso seguro dos equipamentos.",
    "atua": "Assistências técnicas, setores de TI de empresas e órgãos públicos, lojas de informática e atendimento autônomo.",
    "combina": "Você gosta de abrir, montar e consertar aparelhos e de ajudar outras pessoas."
  },
  {
    "id": "meio-ambiente", "nome": "Meio Ambiente",
    "sobre": "Cuidar da água, do ar, do solo e do lixo é uma necessidade de toda cidade e de toda empresa. O curso prepara para acompanhar a qualidade ambiental e propor soluções para os problemas do lugar onde se vive.",
    "aprende": ["Ecologia e recursos naturais", "Análise da qualidade da água, do ar e do solo", "Gestão de resíduos e reciclagem", "Legislação e licenciamento ambiental", "Educação ambiental e recuperação de áreas degradadas"],
    "faz": "Monitora a qualidade do ar, da água e do solo e participa de projetos de gestão ambiental e de resíduos. Coleta amostras, faz relatórios e desenvolve ações de educação ambiental.",
    "atua": "Órgãos ambientais, prefeituras, empresas e indústrias, consultorias, cooperativas de reciclagem e organizações sociais.",
    "combina": "Você se preocupa com a natureza e quer ajudar a resolver problemas ambientais."
  },
  {
    "id": "mineracao", "nome": "Mineração",
    "sobre": "Muitos materiais do dia a dia, do cimento ao celular, vêm de minérios. O curso prepara para trabalhar na pesquisa, na extração e no beneficiamento desses recursos, com segurança e cuidado ambiental.",
    "aprende": ["Geologia e identificação de minerais", "Pesquisa mineral e topografia", "Técnicas de extração e beneficiamento de minérios", "Segurança na mineração", "Controle ambiental e recuperação de áreas mineradas"],
    "faz": "Acompanha a pesquisa, a extração e o beneficiamento de minérios, com segurança e cuidado ambiental. Faz levantamentos de campo, coleta amostras e acompanha as operações na mina e no laboratório.",
    "atua": "Mineradoras, pedreiras, laboratórios, empresas de pesquisa mineral e órgãos de fiscalização.",
    "combina": "Você gosta de trabalhar ao ar livre e se interessa por rochas, solos e ciência."
  },
  {
    "id": "nutricao-e-dietetica", "nome": "Nutrição e Dietética",
    "sobre": "Uma boa alimentação faz diferença na saúde em todas as idades. O curso prepara para cuidar do preparo e da qualidade das refeições e para apoiar ações de alimentação saudável, junto com o nutricionista.",
    "aprende": ["Nutrição e grupos de alimentos", "Técnica dietética e preparo de refeições", "Higiene e segurança dos alimentos", "Planejamento de cardápios", "Alimentação em escolas, hospitais e na comunidade"],
    "faz": "Cuida do preparo e da qualidade das refeições e apoia ações de alimentação saudável, junto com o nutricionista. Acompanha a produção na cozinha, controla a higiene e ajuda a montar cardápios.",
    "atua": "Restaurantes, cozinhas industriais, hospitais e clínicas, escolas e creches, e serviços de alimentação coletiva.",
    "combina": "Você gosta de cozinhar e se interessa por saúde e bem-estar."
  },
  {
    "id": "planejamento-e-controle-da-producao", "nome": "Planejamento e Controle da Produção",
    "sobre": "Toda fábrica precisa saber o que produzir, quanto, quando e com quais materiais. O curso prepara para planejar e acompanhar a produção para que ela aconteça no prazo, com qualidade e sem desperdício.",
    "aprende": ["Planejamento e programação da produção", "Controle de materiais e estoques", "Custos de produção", "Qualidade e melhoria dos processos", "Organização do trabalho e segurança"],
    "faz": "Planeja e acompanha a produção: prazos, materiais, custos e qualidade. Organiza a sequência do trabalho, acompanha os resultados e propõe melhorias nos processos.",
    "atua": "Indústrias, confecções, agroindústrias e empresas de serviços.",
    "combina": "Você gosta de organizar, de números e de encontrar jeitos de fazer melhor."
  },
  {
    "id": "quimica", "nome": "Química",
    "sobre": "A química está na água que bebemos, nos remédios, nos alimentos e nos produtos de limpeza. O curso prepara para trabalhar em laboratórios e indústrias, garantindo a qualidade do que é produzido.",
    "aprende": ["Química geral, orgânica e analítica", "Técnicas e segurança de laboratório", "Análises químicas e controle de qualidade", "Processos químicos industriais", "Tratamento de água e de efluentes"],
    "faz": "Faz análises e ensaios em laboratório e acompanha processos químicos na indústria. Prepara soluções, registra resultados e cuida da qualidade e da segurança dos processos.",
    "atua": "Indústrias químicas, de alimentos e de bebidas, laboratórios, estações de tratamento de água e setores de controle de qualidade.",
    "combina": "Você gosta de ciência, de experimentos e de trabalhar com cuidado e precisão."
  },
  {
    "id": "redes-de-computadores", "nome": "Redes de Computadores",
    "sobre": "A internet, o celular e os sistemas das empresas dependem de redes que funcionem bem e com segurança. O curso forma quem instala, configura e protege essas redes.",
    "aprende": ["Fundamentos de redes e de internet", "Cabeamento e redes sem fio", "Configuração de roteadores e servidores", "Segurança da informação", "Manutenção e suporte de redes"],
    "faz": "Instala, configura e mantém redes de computadores e internet, com atenção à segurança. Monta a estrutura de cabos e equipamentos, resolve falhas de conexão e protege os dados.",
    "atua": "Provedores de internet, empresas de telecomunicações, setores de TI de empresas e órgãos públicos.",
    "combina": "Você gosta de tecnologia e quer entender como a internet funciona por dentro."
  },
  {
    "id": "seguranca-do-trabalho", "nome": "Segurança do Trabalho",
    "sobre": "Todo trabalhador tem direito a voltar para casa com saúde. O curso prepara para identificar os riscos de cada atividade e organizar ações que evitem acidentes e doenças no trabalho.",
    "aprende": ["Identificação e avaliação de riscos", "Normas de segurança e saúde no trabalho", "Equipamentos de proteção individual e coletiva", "Prevenção e combate a incêndios", "Primeiros socorros e treinamento de equipes"],
    "faz": "Identifica riscos e organiza ações para prevenir acidentes e doenças no trabalho. Faz inspeções, orienta e treina os trabalhadores e acompanha o cumprimento das normas.",
    "atua": "Indústrias, construção civil, empresas de serviços, hospitais, órgãos públicos e consultorias.",
    "combina": "Você é atento aos detalhes e quer cuidar da saúde e da vida das pessoas."
  },
  {
    "id": "sistemas-de-energia-renovavel", "nome": "Sistemas de Energia Renovável",
    "sobre": "O Rio Grande do Norte é um dos maiores produtores de energia eólica do Brasil e tem sol forte o ano inteiro. O curso prepara para trabalhar com essas fontes limpas, um setor que cresce no estado.",
    "aprende": ["Eletricidade e instalações elétricas", "Sistemas de energia solar fotovoltaica", "Energia eólica e outras fontes limpas", "Instalação, operação e manutenção de sistemas", "Eficiência energética e segurança"],
    "faz": "Instala e mantém sistemas de energia solar, eólica e de outras fontes limpas. Dimensiona e monta os sistemas, acompanha o funcionamento e faz a manutenção dos equipamentos.",
    "atua": "Empresas de energia solar e eólica, instaladoras, indústrias e concessionárias de energia, um setor forte no RN.",
    "combina": "Você se interessa por tecnologia e quer trabalhar com energia limpa."
  },
  {
    "id": "vestuario", "nome": "Vestuário",
    "sobre": "Por trás de cada roupa há criação, modelagem e produção. O curso prepara para participar de todo esse caminho, da ideia no papel à peça pronta, em confecções ou no próprio ateliê.",
    "aprende": ["Desenho de moda e criação de coleções", "Modelagem e corte", "Costura e acabamento", "Tecidos e materiais", "Produção, custos e negócio de moda"],
    "faz": "Participa da criação, da modelagem e da produção de roupas, do desenho à peça pronta. Escolhe tecidos, faz moldes, acompanha a costura e cuida da qualidade das peças.",
    "atua": "Confecções, ateliês, indústria têxtil, lojas de moda e negócio próprio.",
    "combina": "Você gosta de moda, de criar e de trabalhar com as mãos."
  }
];
