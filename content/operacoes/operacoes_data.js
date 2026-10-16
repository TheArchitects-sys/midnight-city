/**
 * MIDNIGHT CITY — BASE DE DADOS OFICIAL DE OPERAÇÕES, BANNERS E NOVATO PREMIUM
 * Autoridade Editorial: Especificação Completa de Operações (02/10/2026)
 * Contém o acervo integral canônico de Campanhas, Missões Fixas, Missões Temporárias (Samhain),
 * Banners Míticos (4 ativos + 29 prêmios com refinos R1-R5 + 6 coleções históricas) e Novato Premium (Ato I).
 */

const OPERATIONS_DATABASE = {
  version: "2.5.0-OPERATIONS-CANONICAL",
  lastRevision: "02/10/2026",
  discordInvite: "https://discord.gg/5xJp9PEZwC",
  discordMissionChannelNote: "Acesse o canal de missões no servidor do Discord para confirmar sua participação ou realizar rolagens acompanhadas.",

  // ── 1. CAMPANHAS PRINCIPAIS DA TEMPORADA ──
  campaigns: [
    {
      id: "valiria-vanaheim",
      title: "Valíria, a Cidade Imperial de Vanaheim",
      badge: "ALTO RISCO • VANAHEIM",
      riskLevel: "Alto Risco",
      location: "Cidade Imperial de Valíria / Vanaheim",
      focus: "Infiltração, resgate e combate contra forças dracônicas",
      participation: "A convocação aceita personagens de nível 1 a veteranos.",
      deadline: "Inscrições até 15/10/2026 • Horário de Brasília",
      image: "assets/valiria_mission.jpg",
      summary: "Após os acontecimentos no Jardim de Avalon, a movimentação de Rhaenys Targaryen tornou-se uma força imperial. Valíria ergue-se como fortaleza, prisão e declaração de guerra. Há prisioneiros da Égide e rastros dos Fragmentos do Caos rumo às Ilhas de Sempre Inverno.",
      dossierFull: `Por ordem do Conselho de Mármore, a Égide abre inscrições para uma operação de risco elevado em território inimigo. Após os acontecimentos no Jardim de Avalon, ficou evidente que a movimentação conduzida por Rhaenys Targaryen deixou de ser isolada: Vanaheim se tornou o centro de uma nova força imperial, e Valíria ergue-se como fortaleza, prisão e declaração aberta de guerra.

Esta convocação não se limita aos agentes mais experientes. Todos os personagens poderão se inscrever, inclusive personagens de nível 1. A Égide não procura apenas poder bruto, mas agentes capazes de sobreviver, investigar, obedecer ordens, improvisar e carregar uma missão que pode mudar o equilíbrio entre reinos, deuses e mortais.

Depois de resgatar os agentes raptados, tudo levará às Ilhas de Sempre Inverno, onde um Fragmento do Caos está escondido — alvo declarado da Rainha Dragão.`,
      objectives: [
        "Infiltrar-se em território imperial de Vanaheim através dos canais fluviais e acessos vigiados;",
        "Resgatar agentes da Égide capturados e mantidos em celas rúnicas;",
        "Investigar rastros dos Fragmentos do Caos sob domínio da Casa Targaryen;",
        "Reconhecer as defesas costeiras antes da ofensiva definitiva às Ilhas de Sempre Inverno."
      ]
    },
    {
      id: "cairo-oasis-falso",
      title: "O Filho Proibido nas Areias do Oásis Falso",
      badge: "OPERAÇÃO SENSÍVEL • CAIRO",
      riskLevel: "Operação Sensível",
      location: "Cairo / Oásis Falso e profundezas do Duat",
      focus: "Proteção, investigação espiritual e interferência diplomática e mística",
      participation: "A convocação aceita todos os personagens, sem restrição de nível mínimo.",
      deadline: "Inscrições até 15/10/2026 • Horário de Brasília",
      image: "assets/cairo_mission.jpg",
      summary: "Visões proféticas de Cleópatra no Cairo alertam que o filho adotivo da rainha e de Iskandar corre risco iminente de ser raptado ou reivindicado por Ísis. Ecos da tragédia do Submundo de Lin Faust e do Duat ameaçam se repetir.",
      dossierFull: `O Cairo encontra-se sob grave tensão profética. Visões recentes de Cleópatra, reconhecida por seu povo como profeta, indicam que uma ameaça silenciosa está se formando antes de se revelar por completo. O centro da missão é o filho adotivo da rainha e de Iskandar, que corre risco iminente de ser raptado ou reivindicado por Ísis.

Esta convocação não se limita aos mais fortes: fé, percepção, sensibilidade, coragem e capacidade de fazer escolhas difíceis serão tão vitais quanto armas afiadas. No Cairo, nem toda ameaça surgirá como inimiga declarada: algumas virão como promessa, herança, amor, fé ou chamado divino.

O objetivo é impedir que o Cairo seja preparado para repetir um destino terrível que outra linha temporal não conseguiu conter.`,
      objectives: [
        "Proteger o filho adotivo de Cleópatra e Iskandar, com possibilidade de extração se a situação exigir;",
        "Investigar o contato profético com sacerdotes fiéis a Ísis e o culto clandestino;",
        "Analisar os ecos do relato de Lin Faust sobre as abominações do Duat e os Abandonados;",
        "Interferir diplomaticamente e misticamente antes da consumação de uma tragédia cósmica."
      ]
    }
  ],

  // ── 2. MISSÕES FIXAS (PERMANENTES) & TURNOS ALEATÓRIOS ──
  fixedMissions: [
    {
      id: "m1-01",
      code: "M1-01",
      title: "Patrulha da Névoa no Tâmisa",
      type: "fixa",
      frequency: "Até 3x por semana",
      location: "Docks de Londres e margens do Tâmisa",
      summary: "Vigie as margens do Tâmisa, reconheça sinais sobrenaturais e contenha ameaças sob a névoa.",
      recommendation: "Custódios (linha de frente), Tecelões do Véu (reforço do disfarce), Inquisidores (caso haja suspeitos).",
      delivery: "A cada 3 turnos (mínimo de 8 linhas cada) ou 1 turno equivalente de 24 linhas.",
      rewards: "200 XP + 60 Golds",
      rewardsList: [
        { label: "200 XP", type: "xp" },
        { label: "60 Golds", type: "gold" }
      ],
      description: `As margens do Tâmisa são vigiadas há séculos, mas a névoa não guarda apenas ladrões comuns. Patrulhar essa região é percorrer pontes onde suicidas se jogam e onde o Véu precisa ser constantemente reforçado. A atividade exige silêncio, disciplina e atenção a sinais sutis: um reflexo que não deveria estar ali, um corpo que desaparece antes de tocar a água, uma sombra que caminha sobre a corrente. Algumas patrulhas terminam sem nada além do frio da noite, outras com cultistas sendo contidos discretamente.`
    },
    {
      id: "m1-02",
      code: "M1-02",
      title: "Ronda em Whitechapel",
      type: "fixa",
      frequency: "Até 3x por semana",
      location: "Whitechapel, leste de Londres",
      summary: "Mantenha o equilíbrio de Whitechapel, acompanhando gangues, cultos e rumores de criaturas noturnas.",
      recommendation: "Vigilantes (infiltração em gangues), Custódios (manutenção da ordem), Mediadores (negociação política local).",
      delivery: "A cada 3 turnos (mínimo de 8 linhas cada) ou 1 turno equivalente de 24 linhas.",
      rewards: "200 XP + 60 Golds",
      rewardsList: [
        { label: "200 XP", type: "xp" },
        { label: "60 Golds", type: "gold" }
      ],
      description: `Os becos estreitos de Whitechapel são terreno fértil para crimes, mas também para rumores de coisas mais antigas. Gangues mortais disputam território com cultos menores, e algumas vezes relatos de criaturas noturnas se misturam à violência cotidiana. Um Vigilante pode se infiltrar, um Custódio impor disciplina, um Mediador negociar com líderes locais. A tarefa é simples na superfície: manter o equilíbrio da região. Mas o verdadeiro trabalho é impedir que o caos mortal se torne brecha para o divino se manifestar em plena rua.`
    },
    {
      id: "m1-03",
      code: "M1-03",
      title: "Acalmar os Espíritos do Cemitério de Highgate",
      type: "fixa",
      frequency: "Até 3x por semana",
      location: "Highgate Cemetery",
      summary: "Conduza rituais e contenha espíritos inquietos para preservar a separação entre vivos e mortos.",
      recommendation: "Sanctificadores (cura espiritual), Arcanistas (rituais de contenção), Tecelões do Véu (encobrimento sobrenatural).",
      delivery: "A cada 3 turnos (mínimo de 8 linhas cada) ou 1 turno equivalente de 24 linhas.",
      rewards: "200 XP + 60 Reputação",
      rewardsList: [
        { label: "200 XP", type: "xp" },
        { label: "60 Reputação", type: "rep" }
      ],
      description: `Entre esculturas góticas e mausoléus cobertos de hera, o silêncio é interrompido por murmúrios que não pertencem a este tempo. O cemitério de Highgate é um lugar onde o Véu enfraquece com facilidade, e espíritos inquietos exigem intervenção. Tecelões do Véu, Arcanistas e Sanctificadores são os principais convocados, conduzindo rituais ou impondo barreiras sutis para que os mortos não transbordem sobre os vivos. A missão não é de combate, mas de contenção - e exige sensibilidade para não despertar aquilo que prefere dormir.`
    },
    {
      id: "m1-04",
      code: "M1-04",
      title: "Varredura nos Esgotos Antigos",
      type: "fixa",
      frequency: "Até 3x por semana",
      location: "Rede de esgotos romanos e vitorianos",
      summary: "Explore os esgotos antigos, investigue infiltrações e remova sinais de rituais ou invocações.",
      recommendation: "Custódios (segurança em corredores), Artífices de Ébano (selos e armadilhas), Vigilantes (rastreio de cultistas).",
      delivery: "A cada 3 turnos (mínimo de 8 linhas cada) ou 1 turno equivalente de 24 linhas.",
      rewards: "200 XP + 60 Golds",
      rewardsList: [
        { label: "200 XP", type: "xp" },
        { label: "60 Golds", type: "gold" }
      ],
      description: `Sob as ruas iluminadas por néon, os corredores úmidos e abafados guardam tanto água estagnada quanto segredos antigos. A missão é caminhar entre túneis romanos, limpando marcas de rituais, rastreando sinais de infiltração de cultistas e certificando-se de que nada tenha sido invocado indevidamente. É comum encontrar apenas graffiti, mas às vezes o cheiro de enxofre denuncia algo além do humano. Patrulhas mais desafiadoras já registraram presença de criaturas anfíbias menores ligadas ao mar, que preferem as profundezas.`
    },
    {
      id: "m1-05",
      code: "M1-05",
      title: "Rastreio de Cultos no Soho",
      type: "fixa",
      frequency: "Até 3x por semana",
      location: "Soho, West End",
      summary: "Infiltre-se nos espaços do Soho para identificar cultos, recolher provas e reportar suas atividades.",
      recommendation: "Vigilantes (espionagem), Inquisidores (investigação), Mediadores (manipular líderes locais).",
      delivery: "A cada 3 turnos (mínimo de 8 linhas cada) ou 1 turno equivalente de 24 linhas.",
      rewards: "200 XP + 60 Reputação",
      rewardsList: [
        { label: "200 XP", type: "xp" },
        { label: "60 Reputação", type: "rep" }
      ],
      description: `O bairro do Soho pulsa com casas noturnas, bares e teatros, mas por trás do brilho artificial existem portas que não aparecem em mapas. Cultos menores costumam se infiltrar nesses espaços, aproveitando a música e o fluxo de pessoas para mascarar seus rituais. O trabalho consiste em infiltrar-se, observar sem ser visto, seguir os passos errados até o porão certo - e só então agir. Nem sempre é necessário combater, muitas vezes apenas recolher provas, identificar líderes e reportar aos Inquisidores. Mas há noites em que uma invocação se perde, e a fumaça no teto não é mais humana.`
    },
    {
      id: "m1-06",
      code: "M1-06",
      title: "Caçada na Linha do Metrô Abandonada",
      type: "fixa",
      frequency: "Até 3x por semana",
      location: "Linhas abandonadas do metrô (estação Aldwych e trechos lacrados)",
      summary: "Explore túneis lacrados, instale selos e enfrente criaturas que habitam as linhas abandonadas.",
      recommendation: "Custódios (combate direto), Artífices de Ébano (manutenção dos selos), Inquisidores (recolher provas).",
      delivery: "A cada 3 turnos (mínimo de 8 linhas cada) ou 1 turno equivalente de 24 linhas.",
      rewards: "350 XP + 100 Golds + 50 Reputação",
      rewardsList: [
        { label: "350 XP", type: "xp" },
        { label: "100 Golds", type: "gold" },
        { label: "50 Reputação", type: "rep" }
      ],
      description: `Alguns trechos do metrô londrino foram lacrados após acidentes inexplicáveis, mas o Conselho sabe bem a verdade: criaturas atraídas pelos labirintos de ferro vagam por ali. O trabalho é de risco elevado, destinado a Custódios e Artífices, que devem explorar túneis apagados, instalar selos de contenção e eliminar o que restar. Monstros menores costumam habitar esses corredores, mas em raros casos relatos de criaturas maiores (como minotauros deslocados de seus próprios labirintos) tornam a tarefa quase suicida.`
    },
    {
      id: "m1-07",
      code: "M1-07",
      title: "Proteção de Diplomacia Oculta",
      type: "fixa",
      frequency: "Até 3x por semana",
      location: "Locais neutros de encontro, escolhidos pela Torre",
      summary: "Proteja encontros discretos entre facções, vigiando acessos e contendo interferências.",
      recommendation: "Mediadores (diplomacia), Custódios (segurança), Inquisidores (controle disciplinar).",
      delivery: "A cada 3 turnos (mínimo de 8 linhas cada) ou 1 turno equivalente de 24 linhas.",
      rewards: "200 XP + 60 Reputação",
      rewardsList: [
        { label: "200 XP", type: "xp" },
        { label: "60 Reputação", type: "rep" }
      ],
      description: `Nem toda batalha é travada com espadas. Reuniões secretas entre facções divinas e representantes da Égide ocorrem em lugares discretos: porões de igrejas, salões privados de hotéis ou templos escondidos. O trabalho dos agentes é assegurar que a diplomacia siga seu curso sem interrupções externas. A tensão está em vigiar portas, identificar intrusos e, em casos extremos, conter emissários rivais que preferem a força ao diálogo. Combate não é esperado, mas sempre possível.`
    },
    {
      id: "m1-08",
      code: "M1-08",
      title: "Investigação de Profecias no Museu Britânico",
      type: "fixa",
      frequency: "Até 3x por semana",
      location: "Museu Britânico, setor de antiguidades",
      summary: "Analise peças e inscrições do museu, identifique riscos e impeça a retirada de manuscritos.",
      recommendation: "Arquivistas de Avalon (interpretação), Arcanistas (rituais e leitura de energia), Vigilantes (observar suspeitos).",
      delivery: "A cada 3 turnos (mínimo de 8 linhas cada) ou 1 turno equivalente de 24 linhas.",
      rewards: "200 XP + 60 Reputação",
      rewardsList: [
        { label: "200 XP", type: "xp" },
        { label: "60 Reputação", type: "rep" }
      ],
      description: `Algumas peças em exposição carregam mais do que história. Inscrições roubadas da Biblioteca de Alexandria costumam reaparecer no Museu, disfarçadas de artefatos acadêmicos. Os Arquivistas são enviados para decifrar sinais, enquanto Vigilantes observam visitantes suspeitos. A tarefa é analisar, identificar possíveis riscos e impedir que manuscritos sejam levados. Muitas vezes não há combate, mas disputas intelectuais e perseguições discretas até becos vizinhos.`
    },
    {
      id: "m1-09",
      code: "M1-09",
      title: "Caçada às Keres no Tâmisa Noturno",
      type: "fixa",
      frequency: "Até 3x por semana",
      location: "Trechos do Tâmisa em noites sem lua",
      summary: "Enfrente bandos de Keres sobre o Tâmisa com um esquadrão preparado e coordenado.",
      recommendation: "Custódios (combate direto), Sanctificadores (suporte de cura), Arautos de campo (nível mais alto para coordenar esquadrão).",
      delivery: "A cada 3 turnos (mínimo de 8 linhas cada) ou 1 turno equivalente de 24 linhas.",
      rewards: "400 XP + 200 Golds + 60 Reputação",
      rewardsList: [
        { label: "400 XP", type: "xp" },
        { label: "200 Golds", type: "gold" },
        { label: "60 Reputação", type: "rep" }
      ],
      description: `Em raras ocasiões, a concentração de mortes violentas em Londres atrai mais do que ecos. Bandos de Keres surgem sobre a água como pássaros negros de carne rasgada, atacando tudo que se move. É uma missão de alto risco, para esquadrões preparados e coordenados. A caçada ocorre sempre sob a névoa espessa, onde os gritos são abafados pelo rio. Enfrentar essas criaturas significa entrar em combate direto com a morte em sua forma mais voraz.`
    },
    {
      id: "m1-10",
      code: "M1-10",
      title: "Patrulha no Hyde Park",
      type: "fixa",
      frequency: "Até 3x por semana",
      location: "Hyde Park, principalmente as clareiras internas",
      summary: "Vigie as clareiras do parque e contenha sinais de feitiçaria e energia mágica descontrolada.",
      recommendation: "Custódios (segurança física), Arcanistas (controle mágico), Tecelões do Véu (reparação da realidade).",
      delivery: "A cada 3 turnos (mínimo de 8 linhas cada) ou 1 turno equivalente de 24 linhas.",
      rewards: "100 XP + 50 Golds",
      rewardsList: [
        { label: "100 XP", type: "xp" },
        { label: "50 Golds", type: "gold" }
      ],
      description: `Durante o dia, o parque é um refúgio de tranquilidade. À noite, o espaço muda de natureza. Cultos pequenos utilizam clareiras para rituais, e é comum que os guardiões encontrem sinais de feitiçaria recente: cinzas ainda quentes, sangue fresco em pedras, símbolos gravados em árvores. A missão é assegurar que o local permaneça seguro, tanto para mortais quanto para a própria Égide. Criaturas ocasionais podem aparecer, mas a maior ameaça costuma ser o acúmulo de energia mágica fora de controle.`
    },
    {
      id: "m1-11",
      code: "M1-11",
      title: "Turnos Aleatórios de Roleplay Livre",
      type: "fixa",
      frequency: "Livre (sem limite semanal)",
      location: "Canais de #interações-ingame no servidor",
      summary: "Desenvolva cenas livres de seu personagem e receba XP proporcional à quantidade de palavras escritas.",
      recommendation: "Todos os personagens de qualquer ofício, afiliação ou nível.",
      delivery: "A cada turno escrito.",
      rewards: "10 XP a cada 40 palavras escritas",
      rewardsList: [
        { label: "10 XP / 40 palavras", type: "xp" }
      ],
      description: `Desenvolva a vida social, tramas pessoais, diálogos de treinamento e investigações informais do seu personagem no servidor da Égide. A pontuação é cumulativa e incentiva a escrita narrativa aprofundada.

Regra de Equivalência de Turnos:
Se o turno tiver mais linhas do que a atividade pede, ele poderá ser considerado como mais de um turno. Por exemplo, se a atividade pede 3 turnos de 8 linhas, e o jogador faz 1 turno denso com 24 linhas, não precisará realizar a escrita de mais dois.`
    }
  ],

  // ── 3. MISSÕES TEMPORÁRIAS — SAMHAIN ──
  seasonalMissions: {
    eventTitle: "Missões Temporárias — Samhain",
    ambientation: "O ar de Londres está mais frio. A névoa sobre o Tâmisa parece mais densa, carregando sussurros que não pertencem a este tempo. As abóboras esculpidas nas janelas não são apenas decoração; seus olhos vazios parecem seguir quem passa. É Samhain. A fronteira entre o nosso mundo e o Além se esvai, e os espíritos caminham entre nós, alguns em busca de paz, outros de travessura, e alguns... de vingança. A Égide está em alerta máximo, mas não pode estar em todo lugar. Para aqueles que sabem ouvir, a noite está cheia de oportunidades, perigos e segredos.",
    missions: [
      {
        id: "m2-01",
        code: "M2-01",
        title: "Ecos no Crossroads",
        variant: "verde",
        frequency: "Até 3x por semana cada",
        location: "The Crossroads - O Bar do Jazz, Soho",
        summary: "Ouça os espíritos no bar de jazz e descubra informações ou segredos de suas últimas memórias.",
        delivery: "A cada turno (mínimo 8 linhas), narrar a interação com um espírito e a informação ou segredo obtido.",
        rewards: "250 XP + 100 Contas Celestiais",
        rewardsList: [
          { label: "250 XP", type: "xp" },
          { label: "100 Contas", type: "contas" }
        ],
        description: `O bar de jazz, um ponto neutro para vivos e mortos, está mais movimentado que o normal. Os fantasmas dos músicos parecem tocar com mais melancolia, e espíritos recém-chegados, confusos pela fina barreira do Véu, sentam-se às mesas, revivendo suas últimas memórias. Sua tarefa não é lutar, mas ouvir. Misture-se, peça uma bebida e preste atenção aos lamentos e segredos que os mortos compartilham.`
      },
      {
        id: "m2-02",
        code: "M2-02",
        title: "Travessuras no Mercado de Camden",
        variant: "verde",
        frequency: "Até 3x por semana cada",
        location: "Camden Lock Market",
        summary: "Resolva discretamente as travessuras dos espíritos que confundem mortais no mercado de Camden.",
        delivery: "A cada turno (mínimo 8 linhas), descrever como você lidou com uma das travessuras dos espíritos.",
        rewards: "250 XP + 100 Contas Celestiais",
        rewardsList: [
          { label: "250 XP", type: "xp" },
          { label: "100 Contas", type: "contas" }
        ],
        description: `Pequenos espíritos travessos, como Cércones ou fadas entediadas, estão aproveitando o caos do Samhain para pregar peças nos mortais do mercado. Eles trocam as etiquetas de preço, fazem especiarias cheirarem a enxofre e sussurram mentiras nos ouvidos dos turistas. Sua missão é resolver a situação discretamente. Use sua astúcia para enganar, apaziguar ou afugentar os espíritos sem que os humanos percebam a verdadeira natureza do problema.`
      },
      {
        id: "m2-03",
        code: "M2-03",
        title: "Oferendas no Beco da Raposa",
        variant: "verde",
        frequency: "Até 3x por semana cada",
        location: "Beco da Raposa, Soho",
        summary: "Realize oferendas no beco consagrado a Hécate e acompanhe a reação dos espíritos das encruzilhadas.",
        delivery: "A cada turno (mínimo 8 linhas), narrar a entrega de uma oferenda e a reação (ou silêncio) dos espíritos.",
        rewards: "250 XP + 100 Contas Celestiais",
        rewardsList: [
          { label: "250 XP", type: "xp" },
          { label: "100 Contas", type: "contas" }
        ],
        description: `Durante o Samhain, o Beco da Raposa, consagrado a Hécate, torna-se um poderoso condutor de energia. Espíritos das encruzilhadas se reúnem ali, famintos por reconhecimento. Sua tarefa é realizar um pequeno ritual: deixar oferendas (leite, mel, moedas ou uma gota de sangue) em pontos específicos do beco para acalmar os espíritos e honrar a deusa. Quem sabe que visões ou bênçãos eles podem oferecer em troca?`
      },
      {
        id: "m2-04",
        code: "M2-04",
        title: "Vigília no Regent's Canal",
        variant: "verde",
        frequency: "Até 3x por semana cada",
        location: "Regent's Canal, Camden",
        summary: "Patrulhe o canal e fortaleça o Véu para orientar espíritos errantes de volta.",
        delivery: "A cada turno (mínimo 8 linhas), descrever como você reforçou um ponto fraco do Véu ou lidou com um espírito errante.",
        rewards: "250 XP + 100 Contas Celestiais",
        rewardsList: [
          { label: "250 XP", type: "xp" },
          { label: "100 Contas", type: "contas" }
        ],
        description: `O Regent's Canal é um ponto sensível do Véu, e no Samhain, suas águas escuras se tornam turvas com energia espiritual. Pequenas fendas se abrem, e almas perdidas tentam emergir. Sua missão é patrulhar as margens, usando pequenos rituais, sigilos de giz ou sua própria presença para fortalecer a barreira e gentilmente guiar os espíritos de volta, antes que eles se percam no mundo dos vivos.`
      },
      {
        id: "m2-05",
        code: "M2-05",
        title: "O Elenco Silencioso",
        variant: "amarela",
        frequency: "Até 2x por semana, sozinho",
        location: "O Teatro das Névoas, Soho",
        summary: "Interrompa uma apresentação que drena a plateia e derrote os fantasmas responsáveis.",
        delivery: "Derrote 2x Fantasmas de porte grande (com o dobro de atributos convencionais).",
        rewards: "300 XP + 50 Golds + 200 Contas Celestiais",
        rewardsList: [
          { label: "300 XP", type: "xp" },
          { label: "50 Golds", type: "gold" },
          { label: "200 Contas", type: "contas" }
        ],
        description: `A névoa no Teatro das Névoas está mais espessa que o normal. Nesta noite, os atores não são os da Companhia, mas sim Fantasmas poderosos que encenam uma tragédia esquecida, sua performance drenando a energia vital da plateia mortal hipnotizada. Você deve invadir o palco, interromper o terceiro ato e banir os "atores" principais antes que a peça chegue ao seu final fatal.`
      },
      {
        id: "m2-06",
        code: "M2-06",
        title: "A Melodia Inacabada",
        variant: "amarela",
        frequency: "Até 2x por semana, sozinho",
        location: "Loja de Vinil 'Ecos Perdidos', Soho",
        summary: "Quebre a influência de um vinil amaldiçoado e enfrente as harpias atraídas por sua canção.",
        delivery: "Derrote 3x Harpias (com o dobro de atributos convencionais).",
        rewards: "400 XP + 80 Golds + 350 Contas Celestiais",
        rewardsList: [
          { label: "400 XP", type: "xp" },
          { label: "80 Golds", type: "gold" },
          { label: "350 Contas", type: "contas" }
        ],
        description: `Na loja 'Ecos Perdidos', um vinil amaldiçoado começou a tocar sozinho. É o lamento de uma Sereia capturado em cera, e sua canção hipnótica está atraindo criaturas aladas para a loja, quebrando a discrição do lugar. O Sr. Crane, em silêncio, aponta para o toca-discos. Você precisa quebrar o encanto da melodia e derrotar as Harpias que foram atraídas pelo som de desespero.`
      },
      {
        id: "m2-07",
        code: "M2-07",
        title: "A Colheita de Abóboras",
        variant: "amarela",
        frequency: "Até 2x por semana, sozinho",
        location: "Wandsworth Common, bosques afastados",
        summary: "Derrote o espírito de colheita que transformou abóboras em guardiões monstruosos.",
        delivery: "Derrote 1x Karpoi (com o dobro de atributos convencionais).",
        rewards: "130 XP + 20 Golds + 20 Contas Celestiais + 15 Reputação",
        rewardsList: [
          { label: "130 XP", type: "xp" },
          { label: "20 Golds", type: "gold" },
          { label: "20 Contas", type: "contas" },
          { label: "15 Reputação", type: "rep" }
        ],
        description: `Nos bosques mais isolados de Wandsworth Common, uma energia antiga despertou. Um Karpoi, um espírito de colheita corrompido pela energia do Samhain, animou as abóboras de uma plantação esquecida, transformando-as em guardiões monstruosos. A criatura não é maligna, apenas territorial. Você precisa derrotar o Karpoi para que as abóboras voltem ao normal e os mortais possam celebrar seu festival em paz.`
      },
      {
        id: "m2-08",
        code: "M2-08",
        title: "A Anarquia das Máscaras da Mentira e da Verdade",
        variant: "vermelha",
        badge: "LENDÁRIO • ALTO RISCO",
        frequency: "Até 1x por semana • Grupo de até 3 pessoas",
        location: "O Teatro da Névoa (Coxias e Palco), Soho",
        summary: "Identifique e contenha três ocultistas sem causar dano nem interromper o espetáculo.",
        delivery: "3 turnos narrativos (mínimo 20 linhas cada) ou 1 turno denso de no mínimo 50 linhas, detalhando como o personagem isolou o ocultista e o prendeu silenciosamente.",
        rewards: "800 XP + 200 Golds + 1000 Contas Celestiais + 10 Orações Celestiais",
        rewardsList: [
          { label: "800 XP", type: "xp" },
          { label: "200 Golds", type: "gold" },
          { label: "1000 Contas", type: "contas" },
          { label: "10 Orações", type: "oracoes" }
        ],
        description: `Um grupo de ocultistas radicais, conhecidos como "Os Iluminadores", infiltrou-se no Teatro da Névoa. Eles descobriram que a barreira entre os mundos é mais fina no palco durante as apresentações e planejam realizar um ritual sutil durante o clímax da peça desta noite. O objetivo deles não é invocar um monstro, mas quebrar o Véu, transmitindo via magia a verdadeira natureza dos atores (espíritos e mortos-vivos) para o mundo mortal, provando a existência do sobrenatural. A Égide precisa que eles sejam neutralizados e capturados silenciosamente antes que o ritual se complete. Matar é proibido, pois o derramamento de sangue no Teatro poderia alimentar as entidades locais e causar um desastre maior.

Fase de Isolamento:
O personagem deve atrair o ocultista para um canto escuro das coxias, um camarim vazio ou um corredor labiríntico, sem alertar os outros ou a plateia.
• Rolagem: Teste de Furtividade ou Carisma (1d20, necessário: 12).
• Sucesso: O alvo é atraído para uma armadilha ou local isolado.
• Falha: O alvo percebe algo errado e tenta voltar para o palco. O teste de Contenção terá -2 Sucessos.

Fase de Contenção (Sem Violência):
O personagem deve prender o alvo (trancando-o em um "Espelho Prisão", usando magia de sono ou amarrando-o fisicamente antes que recite o encantamento).
• Rolagem: Teste de Sabedoria (cenário) ou Destreza (imobilização) (1d20, necessário: 14).
• Sucesso: O ocultista é neutralizado silenciosamente e fica preso até a extração da Égide.
• Falha: O ocultista grita ou inicia parte do ritual. O personagem deve fugir da área imediata para não ser visto como traidor. Alvo perdido.

Condições de Falha da Missão:
1. Se o jogador causar dano físico (HP) ao alvo, as entidades do teatro se voltam contra ele, expulsando-o violentamente.
2. Se falhar na Contenção de dois alvos, o ritual parcial acontece: penalidade de não poder enfrentar o boss semanal até realizar 3 missões diferentes de variante verde.`
      },
      {
        id: "m2-09",
        code: "M2-09",
        title: "A Promessa do Grifo",
        variant: "vermelha",
        badge: "LENDÁRIO • ESPIONAGEM",
        frequency: "Até 1x por semana • Grupo de até 3 pessoas",
        location: "O Teatro da Névoa (Salão de chá reservado), Soho",
        summary: "Infiltre-se numa reunião de cavaleiros de Poromiel e descubra o traidor da Égide e sua promessa.",
        delivery: "3 turnos narrativos (mínimo 20 linhas cada) focados na tensão de espionagem e duplo sentido ou 1 turno denso de no mínimo 50 linhas.",
        rewards: "900 XP + 250 Golds + 1000 Contas Celestiais + 15 Orações Celestiais",
        rewardsList: [
          { label: "900 XP", type: "xp" },
          { label: "250 Golds", type: "gold" },
          { label: "1000 Contas", type: "contas" },
          { label: "15 Orações", type: "oracoes" }
        ],
        description: `Rumores indicam que um pequeno esquadrão de paladinos de grifos de Poromiel (do mundo de Empyrean) atravessou fendas dimensionais e está em Londres, disfarçados com roupas civis modernas. Eles não estão aqui para atacar, mas para uma reunião de negócios. A inteligência sugere que um membro renegado da Égide de Avalon prometeu a eles uma forma de "poder" (tecnologia de sinetes ou proteção contra os cavaleiros de Navarre) em troca de segredos de seu mundo. Sua missão é infiltrar-se na reunião, identificar os cavaleiros disfarçados e descobrir quem é o contato da Égide e o que exatamente foi prometido.

Fase de Camuflagem:
Os cavaleiros estão nervosos e atentos a magia ou armas. Você deve parecer inofensivo ou um aliado em potencial.
• Rolagem: Teste de Carisma ou Sabedoria (1d20, necessário: 12).
• Sucesso: Eles aceitam sua presença na mesa ou permitem que ouça a conversa sem barreiras mentais.
• Falha: Eles mudam o idioma para a língua de Poromiel ou ficam em silêncio (-2 Sucessos no Interrogatório).

Fase de Interrogatório Sutil:
Extrair a informação sobre a "Promessa de Poder" feita pelo traidor da Égide.
• Rolagem: Teste de Percepção ou Carisma (1d20, necessário: 14).
• Sucesso: Você descobre um fragmento crucial (ex: "Foram prometidos ossos de dragão e amostras de sangue" ou "relatórios dos cavaleiros empyrean").
• Falha: Eles percebem que você sabe demais e saem imediatamente. Alvo perdido.

Condições de Falha:
Se for descoberto como espião (falha crítica ou 2 falhas de interrogatório), eles atacam ou fogem. O grupo falha se não conseguir o nome do traidor ou o conteúdo da promessa.`
      },
      {
        id: "m2-10",
        code: "M2-10",
        title: "A Enviada de Anfitrite (Boss Semanal)",
        variant: "vermelha",
        badge: "BOSS SEMANAL • COLOSSAL",
        frequency: "Até 1x por semana • Grupo de até 5 pessoas",
        location: "Margens do Rio Tâmisa, em Westminster",
        summary: "Enfrente Scylla às margens do Tâmisa, impedindo que seu ataque provoque uma tragédia entre civis.",
        delivery: "Derrote Scylla em combate tático de esquadrão no Discord.",
        rewards: "1200 XP + 500 Golds + 25 Orações Celestiais + 1000 Contas Celestiais",
        rewardsList: [
          { label: "1200 XP", type: "xp" },
          { label: "500 Golds", type: "gold" },
          { label: "25 Orações", type: "oracoes" },
          { label: "1000 Contas", type: "contas" }
        ],
        description: `Depois que suas fiéis servas foram assassinadas friamente em Londres sem trazer informações coletadas nos mortos da região, Anfitrite decidiu enviar uma serva mais poderosa, capaz de causar um desastre até mesmo contra um conselheiro nos tronos de mármore.

Nas pontes de Westminster, Scylla está na forma de uma jovem encantadora, e usa de seu carisma para isolar jovens e devorá-los. O sangue está dando a ela revelações, acesso a memórias do que eles viveram, do que viram e se lembram. A Égide não pode intervir diretamente sem arriscar uma guerra aberta. Caso ela seja atacada abertamente, dezenas de civis irão morrer, mas às margens enevoadas do Tâmisa será possível um duelo mortal, banindo a criatura de volta para as profundezas.

Ficha Completa do Chefe:
• Etnia: Greco-romana | Devoção: Atlante (rola com -1 sucesso contra descendentes desta)
• Classe: Divino | Porte: Colossal
• Rolagem de ação: 13d10 t4
• Atributos: 20.000 HP, 1.000 MANA, 300 SPD, 1.200 DEF [70% RD], 100% Taxa Crit, 200% Dano Crit.
• Tipo de Dano: DEF. Sempre ataca usando os ativos até zerar a mana; não desmaia.

Habilidades Especiais:
1. Aura de Drenagem Anímica [Passivo]: Qualquer ser humano a menos de 3 metros dela sofre 1d100 de dano necrótico no início do turno de Scylla. Scylla se cura pela metade do dano total causado por esta aura.
2. Aura de Desespero [Passivo]: A dificuldade de todos os testes de resistência contra Scylla aumenta (-2 sucessos). Ataques feitos contra ela têm desvantagem, a menos que passem em teste de Vontade (1d20, nec: 10) no início do turno (+3 com poderes de vontade/psicológicos).
3. Sussurros das Profundezas [Passivo - Ação Livre em 10% HP / 2.000 HP]: Invoca 1x esqueleto semidivino de filhos dos deuses atacantes com +50 SPD para buffá-la. Causa 'Medo' em raio de 10m (teste de Sabedoria 1d20, nec: 12 ou 'Incapacitado' por 1d3 rodadas). Custo: 0 mana. Uso único.
4. Tentáculos Assassinos [Ativo - 1 ação]: Custa 50 de mana. Ataca com até 3 tentáculos (+30% Dano Crit cada). Exige teste de Constituição (1d20, nec: 11) ou alvo fica Agarrado. Cooldown: 2 turnos.`
      }
    ]
  },

  // ── 4. BANNERS MÍTICOS (TEMPORÁRIOS & PERMANENTE) ──
  banners: [
    {
      id: "novo-mundo-bruxo",
      title: "O Novo Mundo Bruxo",
      heroImage: "assets/banners/banner_o_novo_mundo_bruxo.png",
      type: "temporario",
      badge: "TEMPORÁRIO • ATÉ 31/10/2026",
      deadline: "Disponível de 10/10 a 31/10/2026 • Horário de Brasília",
      description: "Feitiçaria ancestral, criaturas lendárias e o legado da Ordem de Merlin em uma coleção mística de artefatos, montarias e bênçãos místicas.",
      themeColor: "#6366f1",
      highlightPrizeId: "marca-de-merlin",
      prizes: [
        "marca-de-merlin",
        "fenix",
        "basilisco",
        "mala-de-quadribol",
        "varinha",
        "firebolt-s30"
      ],
      firstRollTable: {
        dice: "1d20",
        note: "Dificuldade 5 declarada no procedimento oficial.",
        ranges: [
          { range: "1–12", result: "10 Golds" },
          { range: "13–19", result: "1 kg de Prata Estelar" },
          { range: "20", result: "Prêmio Exclusivo (Realizar Segunda Rolagem)" }
        ]
      },
      secondRollTable: {
        dice: "1d20",
        ranges: [
          { range: "1–2", result: "Firebolt S30" },
          { range: "3–12", result: "Varinha" },
          { range: "13–18", result: "A Mala de Quadribol" },
          { range: "19–20", result: "Bênção / Pet Exclusivo (Consultar Terceira Rolagem)" }
        ]
      },
      thirdRollTable: {
        dice: "1d20",
        ranges: [
          { range: "1–10", result: "A Marca de Merlin, Aspecto do Espírito" },
          { range: "11–15", result: "Fênix" },
          { range: "16–20", result: "Basilisco" }
        ]
      }
    },

    {
      id: "grito-da-guerra",
      title: "O Grito da Guerra",
      heroImage: "assets/banners/banner_grito_da_guerra.png",
      type: "temporario",
      badge: "TEMPORÁRIO • ATÉ 15/10/2026",
      deadline: "Disponível até 15/10/2026 • Horário de Brasília",
      description: "Armas e bênçãos sagradas dos deuses Ares e Atena: velocidade furiosa, poder destrutivo crítico e proteção de vanguarda inabalável.",
      themeColor: "#c82924",
      highlightPrizeId: "compasso-sangue-ferro",
      prizes: [
        "compasso-sangue-ferro",
        "treze-meses-no-bronze",
        "vanguarda-de-pallas",
        "fear-sword",
        "panic-guns",
        "baluarte-pallas",
        "presas-noturnas"
      ],
      firstRollTable: {
        dice: "1d20",
        note: "Dificuldade 5 declarada no procedimento oficial.",
        ranges: [
          { range: "1–12", result: "10 Golds" },
          { range: "13–19", result: "1 kg de Matéria do Vazio" },
          { range: "20", result: "Prêmio Exclusivo (Realizar Segunda Rolagem)" }
        ]
      },
      secondRollTable: {
        dice: "1d20",
        ranges: [
          { range: "1–5", result: "Baluarte de Pallas & Lança Promachos" },
          { range: "6–10", result: "Fear’s Sword" },
          { range: "11–14", result: "Panic’s Guns" },
          { range: "15–18", result: "Presas Noturnas" },
          { range: "19–20", result: "Bênção Exclusiva (Consultar Terceira Rolagem)" }
        ]
      },
      thirdRollTable: {
        dice: "1d20",
        note: "Aviso: A fonte original indica que a terceira rolagem ocorre em 19–20 na tabela anterior, mas cita 'caso tire 20'. Confirme o procedimento com a moderação antes de rolar.",
        ranges: [
          { range: "1–10", result: "Compasso do Sangue e Ferro" },
          { range: "11–15", result: "Vanguarda de Pallas" },
          { range: "16–20", result: "Treze Meses no Bronze, O Grito da Guerra" }
        ]
      }
    },
    {
      id: "amor-esta-no-ar",
      title: "O Amor Está no Ar",
      heroImage: "assets/banners/banner_o_amor_esta_no_ar.png",
      type: "temporario",
      badge: "TEMPORÁRIO • ATÉ 15/10/2026",
      deadline: "Disponível até 15/10/2026 • Horário de Brasília",
      description: "Desejo, vínculos inquebráveis e o poder primordial da alma e da paixão em uma coleção de armas vivas e bênçãos de Afrodite, Eros e Psiquê.",
      themeColor: "#d946ef",
      highlightPrizeId: "idolo-perpetuo",
      prizes: [
        "idolo-perpetuo",
        "sombra-divina",
        "despertar-nova-era",
        "sono-estigio",
        "corrente-extase",
        "requiem-putto",
        "joia-da-alma",
        "desejo-da-alma",
        "death-scythe"
      ],
      firstRollTable: {
        dice: "1d20",
        note: "Dificuldade 5 declarada no procedimento oficial.",
        ranges: [
          { range: "1–12", result: "10 Golds" },
          { range: "13–19", result: "1 kg de Matéria do Vazio" },
          { range: "20", result: "Prêmio Exclusivo (Realizar Segunda Rolagem)" }
        ]
      },
      secondRollTable: {
        dice: "1d20",
        ranges: [
          { range: "1–5", result: "Corrente do Êxtase Carmesim" },
          { range: "6–10", result: "Réquiem de Putto" },
          { range: "11–14", result: "Jóia da Alma" },
          { range: "15–18", result: "Desejo da Alma" },
          { range: "19–20", result: "Bênção Exclusiva (Consultar Terceira Rolagem)" }
        ]
      },
      thirdRollTable: {
        dice: "1d20",
        note: "Aviso: A sequência de bênçãos deve ser confirmada com a moderação antes de usar suas orações.",
        ranges: [
          { range: "1", result: "Amor Infernal — Death Scythe" },
          { range: "2–5", result: "Ídolo Perpétuo" },
          { range: "6–10", result: "Sombra Divina Não Nomeada" },
          { range: "11–15", result: "O Despertar de uma Nova Era" },
          { range: "16–20", result: "Por Favor, Me Liberte do Sono Estígio…" }
        ]
      }
    },
    {
      id: "sombra-do-abandonado",
      title: "A Sombra do Abandonado",
      heroImage: "assets/banners/banner_a_sombra_do_abandonado.png",
      type: "temporario",
      badge: "TEMPORÁRIO • ATÉ 15/10/2026",
      deadline: "Disponível até 15/10/2026 • Horário de Brasília",
      description: "A autoridade ancestral sobre a umbra, o Poder Verdadeiro fora da Roda do Tempo e invocações profanas ligadas a Shayol Ghul e ao Tenebroso.",
      themeColor: "#6366f1",
      highlightPrizeId: "son-of-forsaken",
      prizes: [
        "son-of-forsaken",
        "coroa-noite-absoluta",
        "diario-abandonado",
        "lanterna-mashadar",
        "mythcarver"
      ],
      firstRollTable: {
        dice: "1d20",
        note: "Dificuldade 5 declarada no procedimento oficial.",
        ranges: [
          { range: "1–12", result: "10 Golds" },
          { range: "13–19", result: "1 kg de Matéria do Vazio" },
          { range: "20", result: "Prêmio Exclusivo (Realizar Segunda Rolagem)" }
        ]
      },
      secondRollTable: {
        dice: "1d20",
        ranges: [
          { range: "1–9", result: "Diário Abandonado" },
          { range: "10–19", result: "Lanterna de Mashadar e a Lâmina de Shadar Logoth" },
          { range: "20", result: "Bênção Exclusiva ou Vestígio (Realizar Terceira Rolagem)" }
        ]
      },
      thirdRollTable: {
        dice: "1d20",
        note: "Preserva as faixas originais da Coroa da Noite Absoluta conforme documentado.",
        ranges: [
          { range: "1–12", result: "A Coroa da Noite Absoluta" },
          { range: "13", result: "Mythcarver (Vestígio da Divergência)" },
          { range: "14–17", result: "A Coroa da Noite Absoluta" },
          { range: "18–20", result: "Son of Forsaken" }
        ]
      }
    },
    {
      id: "vestigios-da-divergencia",
      title: "Vestígios da Divergência",
      heroImage: "assets/banners/banner_vestigios_da_divergencia.png",
      type: "permanente",
      badge: "PERMANENTE • CICLO CONTÍNUO",
      deadline: "Permanece disponível de forma contínua após o término dos temporários.",
      description: "Relíquias com histórias próprias, poderes singulares e refinamentos do R1 ao R5 nascidas da catástrofe que separou os deuses do mundo mortal.",
      themeColor: "#f59e0b",
      highlightPrizeId: "deathwalkers-ward",
      prizes: [
        "deathwalkers-ward",
        "mythcarver",
        "titanstone-knuckles",
        "whisper",
        "cabals-ruin",
        "plate-dawnmartyr",
        "the-list",
        "fenthras",
        "spire-of-conflux"
      ],
      firstRollTable: {
        dice: "1d50",
        note: "Tabela permanente oficial de primeira rolagem (1d50) com artefatos, sub status, Joia do Destino e Exclusivos.",
        ranges: [
          { range: "1–30", result: "10 Golds" },
          { range: "31–40", result: "1x artefato roletável" },
          { range: "41–44", result: "1x artefato roletável com +1 sub status" },
          { range: "45–46", result: "1x artefato roletável com +2 sub status" },
          { range: "47–49", result: "1x Joias do Destino (Aprimoramento de criação de artefatos)" },
          { range: "50", result: "1x Prêmio Exclusivo (Realizar Segunda Rolagem de 1d46)" }
        ]
      },
      secondRollTable: {
        dice: "1d46",
        note: "Tabela oficial de segunda rolagem (1d46): se o resultado for 46, você escolhe livremente qualquer relíquia da lista.",
        ranges: [
          { range: "3, 13, 23, 42, 45", result: "Deathwalker’s Ward" },
          { range: "17, 19, 32, 33, 43", result: "Mythcarver" },
          { range: "2, 5, 11, 18, 37", result: "Titanstone Knuckles" },
          { range: "12, 16, 29, 31, 41", result: "Whisper" },
          { range: "9, 20, 30, 38, 44", result: "Cabal’s Ruin" },
          { range: "8, 10, 21, 26, 40", result: "The Plate of the Dawnmartyr" },
          { range: "14, 22, 25, 28, 34", result: "The List" },
          { range: "1, 4, 24, 27, 39", result: "Fenthras, o Arco da Traição Selvagem" },
          { range: "6, 7, 15, 35, 36", result: "Spire of Conflux" },
          { range: "46", result: "Escolha qual você deseja da lista" }
        ]
      }
    }
  ],

  // ── 4.1 BANNERS HISTÓRICOS ARQUIVADOS (DOCS OFICIAIS) ──
  historicalBanners: [
    {
      id: "banner-01",
      number: "Banner 01",
      title: "Três Grandes",
      docsUrl: "https://docs.google.com/document/d/1cP8vVF9EGLp9gvYJu_1qby2DJJ5gubLGbXEmHAyg5nc/edit?tab=t.0",
      summary: "Coleção mítica primordial dos Três Grandes Soberanos: Zeus, Poseidon e Hades. Bênçãos e armas ancestrais dos regentes do Olimpo, Mares e Submundo."
    },
    {
      id: "banner-02",
      number: "Banner 02",
      title: "Samhain",
      docsUrl: "https://docs.google.com/document/d/1WBPOsV0DkxY3npcoDJ0NsfckXADoZOveuHJmwftWK4c/edit?tab=t.0",
      summary: "O ciclo místico do limiar celta e celebração dos mortos. Ritos arcanos da encruzilhada, sombras ancestrais e artefatos de transição de era."
    },
    {
      id: "banner-03",
      number: "Banner 03",
      title: "Sangue de Lilith",
      docsUrl: "https://docs.google.com/document/d/1K9Moe9OEAmdvXhN6cQVcZAVrzp7rwCAGakIr-Ru6daI/edit?tab=t.0",
      summary: "A primogênita da rebelião da noite. Poderes de sangue, domínio noturno, vampirismo primordial e dádivas profanas das profundezas."
    },
    {
      id: "banner-04",
      number: "Banner 04",
      title: "Chamas da Rebelião",
      docsUrl: "https://docs.google.com/document/d/1xy1DnERq8bDt_je6b0awxqkVWXJ4ccngwN-FDcG-e9Y/preview",
      summary: "O fogo roubado dos deuses e o levante dos heróis mortais. Armamento incendiário, revolução de mármore e ímpeto bélico inextinguível."
    },
    {
      id: "banner-05",
      number: "Banner 05",
      title: "O Nó Solar",
      docsUrl: "https://docs.google.com/document/d/10Ezm81G7EFi80cdhj7eY5rZLL8dazOU3ELchrDylj0s/preview",
      summary: "A radiância dourada de Ra e Apolo unidas em laço solar. Bênçãos de purificação, calor cósmico e quebra de maldições estelares."
    },
    {
      id: "banner-06",
      number: "Banner 06",
      title: "O Sono Sem Sonhos",
      docsUrl: "https://docs.google.com/document/d/1YtoHTVx33MsN5RmgpRRGu8Ta1UTehNT6CHwQDr59y8w/edit?tab=t.0",
      summary: "O descanso perpétuo e as brumas do esquecimento de Hipnos e Tânatos. Poderes de contenção psíquica, névoa estígia e silêncio anímico."
    }
  ],

  // ── 5. CATÁLOGO DOS 29 PRÊMIOS COM REFINOS R1–R5 (P-01 A P-29) ──
  prizes: {
    "marca-de-merlin": {
      id: "marca-de-merlin",
      image: "assets/prizes/a marca de merlin.png",
      code: "P-30",
      name: "A Marca de Merlin, Aspecto do Espírito",
      bannerId: "novo-mundo-bruxo",
      nature: "Benção Exclusiva",
      classe: "Sonho",
      summary: "Sigilo espiritual gravado na alma que purifica a essência do feiticeiro, anula sacrifícios sombrios e converte a mana de feitiços inimigos em energia própria.",
      interpretive: `A Marca de Merlin, Aspecto do Espírito: Não é incomum que feiticeiros e magos extraordinários sejam reconhecidos pela Ordem de Merlin, que frequentemente tentará recrutá-los para suas fileiras. Mesmo quando a proposta é rejeitada, um conjurador reconhecido é marcado como aliado e, como tal, recebe um sigilo gravado não em sua pele, mas em seu próprio espírito. Essa marca de reconhecimento como exímio aliado das Forças da Luz transforma seu portador em um combatente nato; ela atua tanto como arma quanto como escudo contra o mal, de forma que a vitalidade e a essência do feiticeiro não podem ser utilizadas para alimentar magias ou rituais sombrios. Isso o invalida completamente como um possível sacrifício para as bruxas, as inimigas mais antigas da Ordem. Além disso, a Marca de Merlin transforma seu portador em um verdadeiro sifão mágico, criando um vácuo que absorve o poder, sobretudo o  corrompido, consumido na conjuração de feitiços inimigos, purificando essa força e adicionando-a à sua própria reserva de mana. Esse processo estende sua durabilidade em combate para que execute o encargo ancestral legado por Merlin. Adicionalmente, para uma execução mais precisa dessa tarefa, o sigilo amplifica a força de vontade do feiticeiro através de sua alma, tornando suas magias muito mais difíceis de serem contidas, ao mesmo tempo em que lhe concede maior resiliência contra feitiços de outrem. Por fim, mesmo aqueles que não são merlinianos são compelidos pela marca a manterem-se estritamente leais à Ordem e aos seus segredos.`,
      r1Effect: `Concede ao Merliniano 10% ATK [DEF/HP] de acordo com seu atributo principal, além de +30% de DANO CRIT. Custa: 300 mana. Dura: 2 turnos. As bruxas devem realizar um teste de Soberania/Alma [1d20, necessário: 8], caso falhem no teste elas sofrem de -1 sucesso em qualquer teste que faça, e o consumo de suas conjurações é aumentado em 10% do total base. Cooldown: 2 turnos.`,
      refinements: {
        R1: "Efeito base ativo: Concede ao Merliniano 10% ATK [DEF/HP], +30% DANO CRIT. Custo: 300 mana, Dura: 2 turnos. Teste de Soberania/Alma [1d20, nec: 8], falha impõe -1 sucesso e +10% no consumo de conjurações. Cooldown: 2 turnos.",
        R2: "15% ATK [DEF/HP], +40% DANO CRIT. [1d20, necessário: 9]. Consumo de 15%.",
        R3: "20% ATK [DEF/HP], +50% DANO CRIT. [1d20, necessário: 10]. Consumo de 20%.",
        R4: "25% ATK [DEF/HP], +60% DANO CRIT. [1d20, necessário: 11]. Consumo de 25%.",
        R5: "30% ATK [DEF/HP], +70% DANO CRIT. [1d20, necessário: 12]. Consumo de 30%. Consumo: 400 de Mana. Duração: 1 turno. Pode impor a uma bruxa o Priori Incantatem, fazendo com que ela tenha um duelo de Vontade contra o Merliniano, caso a vontade da bruxa seja mais fraca seus feitiços passam a ter o efeito inverso. Cooldown: 1x por evento."
      }
    },
    "fenix": {
      id: "fenix",
      image: "assets/prizes/fenix.png",
      code: "P-31",
      name: "Fênix",
      bannerId: "novo-mundo-bruxo",
      nature: "Pet Exclusivo (Suporte)",
      classe: "Pet de Suporte",
      summary: "Ave mística com 450 HP, 150 DEF e 400 mana; regenera HP com lágrimas, limpa debuffs com plumas e ressuscita seu mestre em explosão de cinzas.",
      interpretive: `Das cinzas às cinzas, do pó ao pó; um círculo não tem começo nem fim. A fênix é uma ave mística de fogo, reconhecida como o símbolo máximo do renascimento há milênios, uma reputação merecida, uma vez que, quando é abatida ou atinge uma idade avançada, seu corpo entra em combustão espontânea e, de suas cinzas, um novo espécime ganha vida. A graciosidade de suas penas flamejantes, douradas e carmesins só é equiparada às suas habilidades extraordinárias, que transformam essa criatura em um objeto de desejo para os maiores feiticeiros do mundo. Afinal, trata-se de um ser tão puro e empático que, ao chorar pelo indivíduo a quem escolher se ligar, as extravagantes propriedades regenerativas de suas lágrimas tornam-se capazes de fechar as feridas mais profundas. Além disso, ataques baseados em fogo direcionados ao seu companheiro serão totalmente absorvidos pela fênix, tornando o protegido imune a esse elemento. Adicionalmente, as Fênix exercem uma calorosa aura de energia contínua sobre seu aliado, funcionando como um sol particular e recuperam uma parcela da mana do feiticeiro a cada turno. No entanto, essas aves são atraídas apenas por indivíduos de coração puro. Fênix possuem aversão natural à magia das trevas e abandonarão imediatamente um companheiro que decide utilizá-la.

• Lágrima de Fênix: Ao derramar uma lágrima carregada de sua essência vital, a fênix transforma a dor em poder restaurador. A gota brilha como âmbar em chamas antes de tocar o alvo, espalhando um calor suave por seu corpo. Feridas se fecham, a exaustão se dissipa e a energia perdida começa a retornar, como se uma pequena centelha de vida tivesse sido reacendida em seu interior.
• Plumas da Fênix: Espalha penas incandescentes entre os aliados. Cada personagem pode consumir sua pena para remover um efeito negativo, ganhar movimento extra ou receber uma pequena cura.
• Coração da Fênix: Fortalece temporariamente um aliado com a essência da fênix, fazendo seus ataques causarem dano adicional de fogo e recuperarem uma pequena quantidade de HP ao acertar.
• Benção ao Portador: As chamas reconhecem naquele corpo algo semelhante à própria essência de uma fênix. O fogo comum perde parte de sua ferocidade ao tocá-lo, envolvendo sua pele em calor sem conseguir queimá-lo por inteiro.
• Ímpeto do Renascimento: Sempre que um aliado é curado pela fênix, ele recebe um pequeno bônus acumulável de dano ou velocidade.
• Última Centelha: Permite a Fênix ressuscitar.`,
      r1Effect: `A Fênix possui 450 HP, 150 DEF e 400 mana. Não possui rolagem própria. Caso seja morta, renasce das cinzas ao final do evento e retorna ao conjurador. Garante ao dono resistência contra dano de fogo comum.
- Lágrima de Fênix: Consome 100 de Mana. Duração: 1 turno. Através de suas lágrimas, a Fênix pode curar feridas, regenerando 10% HP da Fênix no alvo. Cooldown: 2 turnos. [Ativo]
- Plumas da Fênix: Consome 100 de Mana. Duração: 3 turnos. Pode remover 1 efeito negativo de aliados na rodada em questão. Cura aliados em +30 de HP e concede 6 de SPD, a cada vez que realizam um ataque; o buff de SPD pode acumular até 3x. Cooldown: 1 turno. [Ativo]
- Coração da Fênix: Consome 60 de Mana. Duração: 2 turno. O aliado abençoado recebe um bônus de 20% de DANO CRIT. Cada ataque bem sucedido regenera 5 HP para o abençoado. Cooldown: 1 turnos.
- Benção ao Portador: Garante ao dono resistência contra dano de fogo comum. [Passivo]
- Ímpeto do Renascimento: Caso o atributo principal do mestre seja ATK/DEF, ele adquire o valor total deste HP TOTAL. Sempre que um aliado recebe cura da Fênix ele recebe +3 de SPD e +10 de Mana. [Passivo]
- Última Centelha: Uma vez por evento, se o dono sofrer um dano que reduziria seu HP a 0, a fênix ativa o "Renascimento das Cinzas", sacrificando-se em uma explosão que faz com que o personagem volte 1 de HP. Além disso, ele volta atordoado por 2 turnos. [Ativo]`,
      refinements: {
        R1: "Efeito base ativo: 450 HP, 150 DEF, 400 mana. Resistência fogo comum. Lágrima (10% HP), Plumas (+30 HP, 6 SPD até 3x), Coração (20% DANO CRIT, 5 HP regenerado), Benção, Ímpeto (+3 SPD, +10 Mana), Última Centelha (ressuscita com 1 HP, atordoado 2 turnos).",
        R2: "500 HP, 200 DEF e 500 Mana. Lágrima de Fênix: 15% do HP total da Fênix como Cura. Plumas da Fênix: +60 HP e +9 de SPD. Coração da Fênix: 30% DANO CRIT.",
        R3: "550 HP, 250 DEF e 550 Mana. Lágrima de Fênix: 20% do HP total da Fênix como Cura. Plumas da Fênix: +90 HP e +12 de SPD. Coração da Fênix: 40% DANO CRIT. Ímpeto do Renascimento: 6 SPD + 20 de Mana.",
        R4: "600 HP, 300 DEF e 600 Mana. Lágrima de Fênix: 25% do HP total da Fênix como Cura. Plumas da Fênix: +120 HP e +15 de SPD. Coração da Fênix: 50% DANO CRIT. Duração: 3 turno. Ímpeto do Renascimento: 6 SPD + 20 de Mana.",
        R5: "650 HP, 350 DEF e 650 Mana. Lágrima de Fênix: 30% do HP total da Fênix como Cura. Plumas da Fênix: +150 HP e +18 de SPD. Duração: 2 turnos. Coração da Fênix: 60% DANO CRIT. Duração: 3 turno. Ímpeto do Renascimento: +3 SPD + 20 de Mana. Benção ao Portador: Garante ao dono imunidade contra dano de fogo comum."
      }
    },
    "basilisco": {
      id: "basilisco",
      image: "assets/prizes/basilisco.png",
      code: "P-32",
      name: "Basilisco",
      bannerId: "novo-mundo-bruxo",
      nature: "Pet Exclusivo (Combate)",
      classe: "Pet de Combate",
      summary: "Rei das Serpentes com 500 HP, 400 mana, 100 SPD, 150 ATK, 150 DEF, 10% Taxa, 100% Dano Crit. Rolagem: 11d10t4. Aplica veneno mortal, aura do medo, troca de pele e olhar da morte.",
      interpretive: `A infeliz eventualidade de um ovo de galinha ser chocado por um sapo resulta em uma das feras mais sombrias que rastejam por este mundo. Conhecido como o Rei das Serpentes, o basilisco é uma enorme cobra cujo mero olhar direto é fatal para os mortais; enxergá-lo através de reflexos não é muito melhor, uma vez que o indivíduo acabará completamente petrificado. Classificado como uma criatura de perigo máximo, sabe-se que este predador é um matador nato de feiticeiros e bruxas, sendo extremamente difícil de ser domado. Por essa razão, a espécie é terminantemente proibida pela Ordem de Merlin, que por via de regra tenta erradicá-la do mundo. Ter um desses espécimes como companheiro é considerado um crime gravíssimo, e as consequências pelo flagrante são severas. No entanto, a eficiência do uso dessa serpente em combate é inegável, fazendo com que alguns ainda optem por utilizá-la para caçar seus inimigos. A peçonha das presas do basilisco, detentora de um índice de letalidade absoluto, deixa suas vítimas extremamente vulneráveis aos feitiços de seu mestre. Diz-se que as lágrimas de fênix são o único antídoto conhecido para esse veneno. Ademais, embora fatal para mortais, o olhar de um basilisco não mata seres com sangue divino nas veias; em vez disso, drena-lhes progressivamente a vitalidade através de um processo que pode ser descrito como uma agonia lenta, em vez de um fim imediato.

• Veneno do Basilisco: Pode aplicar veneno mortal.
• Aura do Medo: Pode amplificar o efeito de seu venenos e outras condições mortais ao deixar suas presas com apavoradas.
• Olhar da Morte: Assim como nos mitos, pode causar a morte de criaturas com o seu olhar.
• Troca Pele: Abandona uma camada de escamas endurecidas, removendo um efeito negativo e devolvendo para uma presa.`,
      r1Effect: `Possui 500 HP, 400 de mana, 100 SPD, 150 ATK, 150 DEF, 10% TAXA CRIT, 100% DANO CRIT. Rolagem: 11d10t4.
- Veneno do Basilisco: Caso acerte um ataque físico, aplica 1 acúmulo de “Veneno do Basilisco” que causa 5% do atributo principal do Basilisco como DOT com duração de 3 turnos [Acúmulos máximos: 3] no alvo. [Passivo]
- Aura do Medo: Custo: 200 de mana. Dura: 2 turnos. Concede +5% dano total de DOT. Cooldown: 3 turnos. [Ativo]
- Olhar da Morte: Custa: 200 de mana do Basilisco. Uma vez por turno, o Basilisco pode abrir mão de suas ações para ativar a habilidade “Olhar da Morte”, realizando um teste de Constituição/Vontade [1d20, necessário: 8], caso falhe e seja um monstro de pequeno porte de classe comum e épico, serão automaticamente eliminados. Outros tipos de inimigo poderão receber estoque de petrificação, caso ele receba 8 no mesmo combate, caso o inimigo esteja com 25% HP TOTAL o alvo morre. Com limite de uma vez por turno. Cooldown: 3 turnos. [Ativo]
- Troca Pele: (Consome 100 de Mana. Duração: 1 turno. Permite ao Basilisco limpar até 2 debuffs aplicados a ele naquele turno, caso seja físico, ele devolve esse debuff para a sua presa principal. Cooldown: 4 turnos.) [Ativo]`,
      refinements: {
        R1: "Efeito base ativo: 500 HP, 400 mana, 100 SPD, 150 ATK, 150 DEF, 10% TAXA, 100% DANO CRIT. Rolagem: 11d10t4. Veneno do Basilisco: 5% DOT máx 3 acúmulos; Aura do Medo: +5% DOT; Olhar da Morte: teste nec: 8; Troca Pele: limpa 2 debuffs e devolve se físico.",
        R2: "550 HP, 110 SPD, 200 ATK, 200 DEF, 20% TAXA, 120% DANO CRIT. Rolagem: 12d10t4. Olhar da Morte: [1d20, necessário: 9].",
        R3: "600 HP, 120 SPD, 250 ATK, 250 DEF, 30% TAXA, 130% DANO CRIT. Rolagem: 12d10t4. Veneno do Basilisco: 10% do atributo principal do Basilisco como DOT. Olhar da Morte: [1d20, necessário: 10].",
        R4: "650 HP, 130 SPD, 250 ATK, 250 DEF, 40% TAXA, 140% DANO CRIT. Rolagem: 13d10t4. Veneno do Basilisco: 10% do atributo principal do Basilisco como DOT. Aura do Medo: +10% de dano total de DOT. Olhar da Morte: [1d20, necessário: 11].",
        R5: "700 HP, 150 SPD, 300 ATK, 300 DEF, 50% TAXA, 150% DANO CRIT. Rolagem: 14d10t3. Veneno do Basilisco: 10% do atributo principal do Basilisco como DOT. Aura do Medo: +10% de dano total de DOT. Olhar da Morte: [1d20, necessário: 12]."
      }
    },
    "mala-de-quadribol": {
      id: "mala-de-quadribol",
      image: "assets/prizes/A Mala de quadrbol.png",
      code: "P-33",
      name: "A Mala de Quadribol",
      bannerId: "novo-mundo-bruxo",
      nature: "Arma Exclusiva",
      classe: "Invocação / Controle",
      summary: "Arma que concede +4 atributos adaptativos [+40 ATK/+40 DEF/+120 HP] e consome slots de controle para conjurar sequencialmente Goles, Balaços e Pomo de Ouro.",
      interpretive: `O tremor constante das fechaduras costuma ser o primeiro indício de que esta não é uma bagagem apropriada para viagens convencionais. Revestida de couro e reforçada por ferragens encantadas, a mala conserva em seu interior um conjunto completo de bolas de quadribol, cada uma presa em seu próprio compartimento por razões bastante evidentes. Embora originalmente destinadas ao esporte, suas peças foram enfeitiçadas para reconhecer comandos de combate, transformando uma atividade já questionável em um método ainda menos regulamentado de resolver conflitos. A goles atravessa o campo em passes violentos, abrindo a guarda daqueles que tentam interceptá-la; os balaços perseguem suas vítimas com uma obstinação quase pessoal, golpeando braços, pernas e qualquer pretensão de manter a concentração. O pomo de ouro, por sua vez, permanece oculto até receber a ordem de marcar um adversário, passando a rodeá-lo em lampejos que denunciam seus movimentos ao portador. Não é necessário conhecer as regras do quadribol para utilizar o conjunto, embora seja recomendável recordar uma delas: perder uma bola de vista costuma ser o começo de um problema.

• Goles, passe violento: Guiada pela mente do seu mestre, a goles é uma bola feita de matéria mágica, que se lançada contra o adversário em um movimento que parece anunciar um passe, até que a força do impacto esclareça a verdadeira intenção de seu proprietário. Mais do que ferir, o golpe desloca a guarda da vítima e prepara uma oportunidade para quem vier em seguida.
• Balaços, marcação cerrada: Libertados de suas correias, os dois balaços investem contra a mesma presa por direções opostas. Enquanto um ameaça seu rosto, o outro procura alguma parte de seu corpo que ainda não tenha entendido a necessidade de fugir.
• Pomo de Ouro, fim de jogo: O pomo abandona seu compartimento e passa a orbitar um adversário, escapando de seus dedos por centímetros enquanto acompanha cada tentativa de reposicionamento. Para o proprietário da mala, o movimento das pequenas asas douradas revela o instante exato de atacar.`,
      r1Effect: `Concede +4 atributos adaptativos [+40 ATK/+40 DEF/+120 HP]. Conjuração do Quadribol - Custa: 100 de mana. Dura: 5 turnos. Permite consumir os slots de controle de criaturas remanescentes do bruxo para usar as bolas de um jogo clássico dos Merlinianos. Contudo, ele não escolhe qual bola é invocada, elas sempre são conjuradas em sequência, para cada slot de controle disponível: 1ª Goles; 2ª Balanços; e 3ª Pomo de Ouro. As ações das bolas usam a rolagem e atributos do bruxo, como se ele próprio estivesse atacando, e por conta disso não podem sofrer influência de Transferência de Atributo. Cooldown: 2 turnos.
- Goles, passe violento: Tratada como invocação. Possui +20% DANO CRIT em suas ações. Custa: 100 mana do bruxo, ação condicional. Caso acerte o mesmo alvo três vezes, poderá atingir um alvo bônus diferente com os sucessos e dano do último ataque em um alvo diferente. [Ativo]
- Balaços, marcação cerrada: Tratada como Invocação. Possui sempre o dobro de atributos SPD que o bruxo ganhe de objetos [artefatos e armas], caso sua velocidade seja maior que do inimigo ela sempre terá +10% TAXA CRIT. Caso acerte o alvo, ele deve realizar um teste de constituição [1d20, necessário: 8], se falhar recebe -6 SPD, acumulando até 3x. [Ativo]
- Pomo de Ouro, fim de jogo: Tratada como Invocação, possui metade das ações do mestre. Quando em campo doa suas ações para uso do bruxo em questão, permitindo que ele haja em sua vez. Sempre que um inimigo é derrotado, ela acumula estoques de Vitória. Caso Atinja 5 estoques. Permite o bruxo ganhar +1 dado. Dura: 3 turnos. Cooldown: 4 turnos. [Ativo]`,
      refinements: {
        R1: "Efeito base ativo: +4 atributos adaptativos [+40 ATK/+40 DEF/+120 HP]. Conjuração do Quadribol (Custo: 100 mana, Dura: 5 turnos, CD: 2 turnos). 1ª Goles (+20% DANO CRIT); 2ª Balaços (dobro SPD de objetos, +10% TAXA, teste nec: 8 impõe -6 SPD até 3x); 3ª Pomo (5 estoques de vitória = +1 dado por 3 turnos).",
        R2: "+5 atributos adaptativos [+50 ATK/+50 DEF/+150 HP]. +30% DANO CRIT. +20% TAXA CRIT, necessário: 9. 4 estoques.",
        R3: "+6 atributos adaptativos [+60 ATK/+60 DEF/+180 HP]. +40% DANO CRIT. +30% TAXA CRIT, necessário: 10. 3 estoques.",
        R4: "+7 atributos adaptativos [+70 ATK/+70 DEF/+210 HP]. +50% DANO CRIT. +40% TAXA CRIT, necessário: 11. 2 estoques.",
        R5: "+8 atributos adaptativos [+80 ATK/+80 DEF/+240 HP]. +60% DANO CRIT. +50% TAXA CRIT, necessário: 12. Ativa ao iniciar um combate."
      }
    },
    "varinha": {
      id: "varinha",
      image: "assets/prizes/varinha.png",
      code: "P-34",
      name: "VARINHA (Madeira), (Núcleo Mágico), (Tamanho), (Flexibilidade)",
      bannerId: "novo-mundo-bruxo",
      nature: "Arma Exclusiva",
      classe: "Foco Arcano",
      summary: "Foco mágico merliniano personalizado; concede +12 SPD, +10% Taxa Crítica e +10% Dano Crítico ao usuário.",
      interpretive: `É de conhecimento dos merlinianos que a varinha escolhe o feiticeiro. Através de uma combinação simples de madeiras especiais com núcleos mágicos, um artesão confecciona uma varinha; cada uma delas única, projetada sob medida para aquele que a irá empunhar, seja como ferramenta ou como arma para o ofício do merliniano. Embora dispensável para a conjuração de feitiços, a Ordem de Merlin, que preza pela superioridade e domínio mágico dos feiticeiros em suas fileiras, utiliza esses focos arcanos para que seus feitiços sejam os mais requintados entre quaisquer outros magos. Por isso, magias canalizadas através de uma varinha merliniana são extraordinárias, refinadas para que se extraia o máximo de sua capacidade, tornando os merlinianos destaques no Mundo Mágico. Pela facilidade para conjurar magias através desse foco arcano, o esforço do feiticeiro é potencialmente menor, reduzindo o custo energético de seus feitiços. Além disso, adaptando-se à ambição merliniana de ter controle sobre vertentes distintas, a varinha confere agilidade ao seu feiticeiro como resposta à conjuração de magias de diferentes origens, permitindo que mais ações mágicas sejam tomadas em um determinado período de tempo.

Personalize sua varinha escolhendo um elemento de cada lista (efeito puramente interpretativo):
• Madeira: Sabugueiro, Videira, Teixo, Cerejeira, Azevinho, Salgueiro, Acácia, Ébano, Faia, Aveleira, etc.
• Núcleo Mágico: Pelo de Unicórnio, Fibra de Coração de Dragão, Pena de Fênix, Pelo de Seminviso, Pelo de Cauda de Testrálio, etc.
• Tamanho: 20cm a 35cm.
• Flexibilidade: Rígida, Flexível, Razoavelmente Elástica, Suave, etc.`,
      r1Effect: `Concede ao usuário +12 SPD, +10% TAXA CRIT., +10% DANO CRIT.`,
      refinements: {
        R1: "+12 SPD, +10% TAXA CRIT., +10% DANO CRIT.",
        R2: "+15 SPD, +20% TAXA CRIT, +20% DANO CRIT.",
        R3: "+18 SPD, +20% TAXA CRIT, +20% DANO CRIT.",
        R4: "+21 SPD, +30% TAXA CRIT, +30% DANO CRIT.",
        R5: "+24 SPD, +40% TAXA CRIT, +40% DANO CRIT."
      }
    },
    "firebolt-s30": {
      id: "firebolt-s30",
      image: "assets/prizes/Firebolt s30.png",
      code: "P-35",
      name: "Firebolt S30",
      bannerId: "novo-mundo-bruxo",
      nature: "Artefato Exclusivo",
      classe: "Artefato Coringa",
      summary: "Vassoura de alta performance com forma retrátil de broche de prata; concede +20% SPD, +30 ATK [flex: DEF/HP], Aceleração Competitiva e Freio de Precisão.",
      interpretive: `Poucos objetos representam tão bem a arrogância do Mundo Mágico quanto uma vassoura desenvolvida para ultrapassar os próprios limites de seus pilotos. A Firebolt S30 é um modelo de altíssimo desempenho, cobiçado por jogadores profissionais de quadribol e por feiticeiros que preferem não descobrir se seus inimigos possuem uma boa pontaria. Seu cabo de madeira polida abriga encantamentos de equilíbrio, frenagem e aceleração capazes de responder às menores alterações na postura de seu condutor, permitindo curvas fechadas e mergulhos que fariam outros modelos se partirem ao meio. Entretanto, sua verdadeira vantagem está na capacidade de conservar parte da energia mágica utilizada durante o voo, acumulando-a nas cerdas até que elas adquiram um brilho semelhante ao de brasas. Ao executar uma aproximação ofensiva, o feiticeiro pode descarregar essa energia através de sua própria conjuração, fazendo com que a violência da arrancada acompanhe o impacto do feitiço. Naturalmente, a vassoura não torna seu proprietário um bom piloto; ela apenas permite que suas decisões ruins aconteçam muito mais depressa. A vassoura possui a forma retrátil de um broche de vassoura da cor prata, facilmente ajustável à roupa de Bruxo.`,
      r1Effect: `O artefato permite o voo livre na sua forma retrátil, sendo este lento e a poucos metros do chão. Na forma revelada, o bruxo pode voar em alta velocidade, podendo atingir quase qualquer atitude que um humano possa suportar, perfeita para um rebatedor. Concede como atributo principal: +20% SPD. Seus atributos secundários são: +30 ATK [flex: DEF/HP]. Aceleração Competitiva - Custa: 50 mana e não requer ação para ser ativado. Dura: 2 turnos. Concede +10% DANO CRIT. Cooldown: 1 turno. Freio de Precisão - Custa: 50 de mana. Garante +1 Sucesso em uma ação defensiva. Cooldown: 3 turnos. Por ser um artefato coringa, pode simular qualquer liga e ocupar qualquer posição de artefato de seu set. Limitado a usuários de magia. [Artefato Coringa]`,
      refinements: {
        R1: "Efeito base integral ativo (Voo livre retrátil e revelado. Atributo principal: +20% SPD. Secundários: +30 ATK [flex: DEF/HP]. Aceleração Competitiva: +10% DANO CRIT por 2 turnos, CD: 1 turno. Freio de Precisão: +1 Sucesso defensivo, CD: 3 turnos. Artefato Coringa, simula qualquer liga).",
        R2: "+20% SPD, +20% DANO CRIT.",
        R3: "+25% SPD, +20% DANO CRIT.",
        R4: "+25% SPD, +30% DANO CRIT.",
        R5: "+30% SPD, +40% DANO CRIT."
      }
    },

    "compasso-sangue-ferro": {
      id: "compasso-sangue-ferro",
      image: "assets/prizes/p01_compasso_sangue_ferro.png",
      imageWidth: 760,
      imageHeight: 816,
      code: "P-01",
      name: "Compasso do Sangue e Ferro",
      bannerId: "grito-da-guerra",
      nature: "Bênção Exclusiva",
      classe: "Destruição",
      summary: "Velocidade, críticos e sinergia com Ecos de Carnificina para concentrar a pressão ofensiva da equipe.",
      interpretive: `Ares transcende o caos aleatório; na essência mais pura e letal da guerra, ele é o ritmo ininterrupto do combate, a força motriz que faz um exército avançar em uníssono. Esta bênção é a materialização do frenesi bélico perfeito, feita sob medida para quem já distorceu a realidade para criar o seu próprio campo de batalha. Quando ativada, a percepção temporal do semideus é brutalmente acelerada, transformando seus movimentos em um borrão predatório de pura velocidade. Seus olhos brilham com um carmesim faminto, calculando as falhas na guarda inimiga em frações de segundo para garantir abates críticos. Ao fluir de uma arma para outra em seus ecos de violência, a bênção atua como o catalisador final da força centrífuga, fazendo o próprio espaço ceder ao peso e à velocidade de seus ataques sucessivos. Mais do que isso, como o epicentro do conflito, o guerreiro reverbera sua fúria com seus companheiros. Ele puxa para si uma faísca da agressividade latente de seus aliados, absorvendo uma fração de seus poderes ofensivos não como um parasita, mas como o porta-estandarte da matança. Esse dízimo tático centraliza toda a pressão da batalha nele, inspirando seus irmãos de armas ao assumir o fardo da linha de frente. Alimentado por essa energia compartilhada, o semideus se torna a ponta de lança absoluta, uma tempestade imparável de aço e pólvora que dita, sozinho, o ritmo da aniquilação coletiva.`,
      r1Effect: `Concede passivamente 20% SPD e 20% Taxa Crítica. Fúria Carmesim. Custo: 150 Mana. Duração: 2 Turnos. Ao ativar esse poder, o portador rouba 10 ATK por Aliado no campo para si [invocações não contam]. Cooldown: 5 turnos. Caso possua a habilidade Ecos de Carnificina, essa passa a conceder 10 ATK adicionais e o semideus inicia todos os combates com 10 marcadores Centelha de Guerra; adicionalmente cada ação que geraria Stacks gera 1 Stack Adicional. (OBS: Caso o portador receba SPD por passiva única ou bênção, os 20% SPD passam a 30 SPD flat.)`,
      refinements: {
        R1: "Efeito base integral ativo.",
        R2: "25% SPD, +30% Taxa; 10 ATK por Aliado; 10 ATK, 15 Stacks centelha, 1 Stack adicional.",
        R3: "30% SPD, +40% Taxa; 15 ATK por Aliado; 20 ATK, 20 Stacks centelha, 1 Stack adicional.",
        R4: "35% SPD, +50% Taxa; 15 ATK por Aliado; 30 ATK, 20 Stacks centelha, 2 Stacks adicionais.",
        R5: "40% SPD, +50% Taxa; 20 ATK por aliado; 40 ATK, os Surtos de ação da habilidade passam a ocorrer a cada 2 ações ofensivas, 30 Stacks centelha, 2 Stacks adicionais."
      }
    },
    "treze-meses-no-bronze": {
      id: "treze-meses-no-bronze",
      image: "assets/prizes/p02_treze_meses_bronze.png",
      code: "P-02",
      name: "Treze Meses no Bronze, O Grito da Guerra",
      bannerId: "grito-da-guerra",
      nature: "Bênção Exclusiva",
      classe: "Destruição",
      summary: "Fúria, vitalidade e dano crítico para fortalecer o combate em Berserker.",
      interpretive: `Quando os gigantes Alóadas trancaram Ares em um jarro de bronze por treze longos meses, o Deus da Guerra não orou por piedade; ele enlouqueceu. No escuro e sufocante metal, sua divindade foi destilada em puro ódio, uma sede de carnificina tão densa que, ao ser libertado, ele não era mais apenas o soberano tático das batalhas, mas um desastre natural incontrolável. Esta bênção invoca a exata agonia e o frenesi daquele confinamento, feita sob medida para aqueles que abraçam a fúria Berserker. Ao ser ativada, a mente do portador desliga qualquer resquício de autopreservação ou razão, afogando-se em uma fúria carmesim absoluta. O corpo do portador sofre uma mutação brutal: as veias saltam e escurecem sob a pele febril, e a musculatura hipertrofia até o limite do rompimento, convertendo seu imenso poder ofensivo em uma carapaça bestial de vitalidade insuperável. O próprio ar ao seu redor distorce com o calor de seu sangue fervente, emitindo o som agoniante de metal arranhando o bronze de um escudo. Em vez de lutar sozinho, a presença de seus aliados em campo atua como combustível para sua insanidade, afiando seus ataques com uma letalidade instintiva em meio ao caos. E quando o seu "Coração Selvagem" pulsa nesse estado de transe, o guerreiro transcende a mera força: todo o seu peso e agressividade são canalizados em golpes críticos devastadores. Estar diante dele não é enfrentar um guerreiro, mas o próprio avatar da matança encurralado, livre de suas correntes e sedento por sangue.`,
      r1Effect: `Concede passivamente 60 ATK e 20% Taxa Crítica. Fúria Carmesim. Custo: 100 Mana. Duração: 2 Turnos. Ao ativar esse poder, o portador recebe 1 bônus de crítico a cada 2 aliados em campo [invocações não contam; pode ser ativada no modo Berserker]. Cooldown: 5 turnos. Caso possua a habilidade Fúria Berserker e tenha pelo menos 1.000 de ATK, o portador recebe adicionalmente 10% do ATK como HP adicional (não podendo utilizar esse bônus para dano de HP). Coração Selvagem: Custo: 150 de Mana. Duração: 3 turnos. Obtém 1% do seu ATK em Dano Crítico. (Caso utilize junto à habilidade Fúria Berserker, Coração Selvagem não gastará ação, apenas a mana.) Cooldown: 3 Turnos.`,
      refinements: {
        R1: "Efeito base integral ativo.",
        R2: "80 ATK, +30% Taxa; 1 bônus por 2 aliados; 20% do ATK, 2% do ATK como dano crítico.",
        R3: "100 ATK, +40% Taxa; 1 bônus por 2 aliados; 30% do ATK, 3% do ATK como dano crítico.",
        R4: "120 ATK, +50% Taxa; 1 bônus por 1 aliado; 40% do ATK, 4% do ATK como dano crítico.",
        R5: "150 ATK, +50% Taxa; 2 bônus por 1 aliado; 50% do ATK, 5% do ATK como dano crítico."
      }
    },
    "vanguarda-de-pallas": {
      id: "vanguarda-de-pallas",
      image: "assets/prizes/p03_vanguarda_pallas.png",
      code: "P-03",
      name: "Vanguarda de Pallas",
      bannerId: "grito-da-guerra",
      nature: "Bênção Exclusiva",
      classe: "Destino",
      summary: "Proteção, eficiência de escudos e sincronização entre aliados da classe Destino.",
      interpretive: `Diferente da fúria visceral que consome os campos de guerra, a verdadeira soberania de Atena manifesta-se no silêncio estratégico que antecede o choque das espadas — na ordem inabalável que transforma o caos em vitória matemática. Quando a deusa da sabedoria abençoa um herdeiro, ela não o envia para a matança descontrolada, mas o consagra como o pilar absoluto de sua égide. Ao despertar este poder, o ar ao redor do semideus esfria e se aquieta, submerso em uma névoa densa de onde irradia uma luz dourada e celestial. O guerreiro assume uma postura de tranquilidade antinatural, tornando-se o epicentro de uma fortaleza viva. Ao seu redor, fileiras de colossais escudos translúcidos, espessos como vidro diamantino, emergem do chão, empunhados pelos ecos impassíveis de guerreiros em pesadas armaduras. Sob o domínio desse Aegis Verdadeiro, a proteção transcende a matéria, tornando-se a imposição de uma vontade superior que reescreve e amplifica a densidade de qualquer barreira aliada. Mais do que resistir, o filho da sabedoria orquestra a batalha de forma absoluta: através das Mentes Sincronizadas, ele estabelece uma rede tática invisível. O pensamento da equipe flui como um só, permitindo que a inexpugnável defesa do escudo se converta na força esmagadora da lança de um aliado, ou que o ímpeto da vanguarda solidifique as muralhas do protetor. Enfrentar essa bênção é golpear um muro de pura inteligência divina, onde a derrota do agressor já foi calculada muito antes do seu impacto.`,
      r1Effect: `Concede passivamente 20% DEF (ou 60 DEF) e +20 HP por Stack de RD (não podendo utilizar esse para dano de HP). Aegis Verdadeiro: Custo: 100 Mana. O portador pode utilizar essa habilidade em conjunto a outra habilidade de geração de Escudo gastando ação apenas para a ativação. Ao ativar esse poder obtém 10% de Eficiência de Escudo. Cooldown: 2 turnos. Mentes Sincronizadas: Custo: 200 de Mana. Duração: 1 Turno. Pode vincular a mente à de um outro DPS ou Tanker da classe Destino. Caso o portador não tenha realizado ataques, pode gerar um incremento da DEF do DPS sincronizado de 20% da sua própria DEF em um único ataque. Caso o portador da bênção seja o DPS, pode receber o incremento de 20% da DEF do tanker sincronizado. (Em caso o semideus possua o poder Escudo de Força Final e apenas possa agir como Tanker, ele pode fazer essa única ação como suporte.) Cooldown: 5 turnos.`,
      refinements: {
        R1: "Efeito base integral ativo.",
        R2: "+25% DEF (ou 80 DEF), +40 HP por Stack de RD, 15% Eficiência de Escudo; 30% de incremento de DEF.",
        R3: "+30% DEF (ou 100 DEF), +40 HP por Stack de RD, 20% Eficiência de Escudo; 30% de incremento de DEF.",
        R4: "+35% DEF (ou 130 DEF), +50 HP por Stack de RD, 25% Eficiência de Escudo; 40% de incremento de DEF.",
        R5: "+40% DEF (ou 150 DEF), +60 HP por Stack de RD, 30% Eficiência de Escudo; Duração de Mentes Sincronizadas: 2 turnos e 50% de incremento de DEF."
      }
    },
    "fear-sword": {
      id: "fear-sword",
      image: "assets/prizes/p04_fears_sword.png",
      code: "P-04",
      name: "Fear’s Sword",
      bannerId: "grito-da-guerra",
      nature: "Arma e Equipamento",
      summary: "Uma espada bastarda de Phobos que intensifica críticos e combina com as pistolas do Pânico para roubo de vida.",
      interpretive: `Forjada na essência do próprio Medo (Phobos), a Fear's Sword é uma espada bastarda colossal, desenhada para esmagar tanto a armadura quanto a sanidade do inimigo. Sua lâmina larga e incrivelmente pesada é feita de um aço escuro e desgastado por incontáveis batalhas, lembrando a textura de obsidiana lascada. O guarda-mão abandona a elegância em favor da brutalidade pura: esculpido na forma de uma mandíbula bestial escancarada, faz parecer que a própria lâmina é uma língua de ferro escuro projetada pela fera. Quando o filho da guerra canaliza sua mana, a arma desperta de seu sono inerte. Fissuras irregulares ao longo da lâmina se abrem e começam a pulsar com uma violenta energia carmesim, exalando um calor opressivo e o cheiro metálico de sangue. Cada corte não apenas dilacera a carne, mas se alimenta do terror do alvo, drenando sua vitalidade para sustentar o frenesi do portador.`,
      r1Effect: `Concede +50 ATK. Custa: 30 de mana para liberar a energia carmesim, fornecendo 10% Dano Crítico. Caso possua no inventário do personagem a Panic’s Guns, recebe 1% de roubo de vida.`,
      refinements: {
        R1: "Efeito base integral ativo.",
        R2: "60 ATK, +20% DANO CRIT, 2% de roubo de vida.",
        R3: "70 ATK, +30% DANO CRIT, 3% de roubo de vida.",
        R4: "80 ATK, +40% DANO CRIT, 4% de roubo de vida.",
        R5: "90 ATK, +50% DANO CRIT, 5% de roubo de vida."
      }
    },
    "panic-guns": {
      id: "panic-guns",
      image: "assets/prizes/p05_panics_guns.png",
      code: "P-05",
      name: "Panic’s Guns",
      bannerId: "grito-da-guerra",
      nature: "Arma e Equipamento",
      summary: "Pistolas gêmeas de Deimos que combinam velocidade, dano crítico e bônus como segunda arma.",
      interpretive: `Batizadas em homenagem ao Pânico (Deimos), estas pistolas gêmeas de grosso calibre são a personificação absoluta do caos e da velocidade tática no campo de batalha. Diferente das armas modernas de metal polido, as Panic's Guns possuem um aspecto ancestral e opressivo. Uma é forjada em ferro fundido negro e a outra em bronze severamente envelhecido, ambas com canos ranhurados e adornos entalhados que lembram sutilmente rostos distorcidos em agonia. O peso e o balanceamento são milimétricos, permitindo que elas fluam nas mãos do semideus como extensões naturais de seu corpo, perfeitas para saques relâmpagos. Ao ativar o modo explosivo, o tambor de ambas gira com um zumbido estridente de engrenagens aceleradas. As balas convencionais são banhadas em poder bélico puro, transformando-se em projéteis de energia destrutiva. Quando usadas em sincronia com sua lâmina irmã, elas criam uma tempestade rítmica e ensurdecedora que dita o fim inevitável de quem ousar cruzar o seu caminho.`,
      r1Effect: `Concede +12 SPD e 20 ATK. Custa: 30 de mana para ativar o modo explosivo, obtendo +10% de Dano Crítico ao portador. Caso seja utilizada como segunda arma, fornece +1 bônus de Dano e mantém o bônus de SPD na primeira arma.`,
      refinements: {
        R1: "Efeito base integral ativo.",
        R2: "18 de SPD, 30 ATK, +10% DANO CRIT, +1 Bônus de Dano.",
        R3: "24 de SPD, 40 ATK, +20% DANO CRIT, +2 Bônus de Dano.",
        R4: "27 de SPD, 50 ATK, +20% DANO CRIT, +2 Bônus de Dano.",
        R5: "30 de SPD, 60 ATK, +50% DANO CRIT, +3 Bônus de Dano."
      }
    },
    "baluarte-pallas": {
      id: "baluarte-pallas",
      image: "assets/prizes/p06_baluarte_pallas_promachos.png",
      code: "P-06",
      name: "Baluarte de Pallas & Lança Promachos",
      bannerId: "grito-da-guerra",
      nature: "Arma e Equipamento",
      summary: "Escudo e lança atenienses para absorver ataques destinados a aliados e fortalecer defesas.",
      interpretive: `Enquanto a guerra de Ares se baseia no caos, a de Atena ergue-se na ordem inquebrável. O Baluarte de Pallas não é um mero escudo defensivo, mas uma obra-prima de engenharia divina forjada em prata celestial e ouro polido. Em seu centro, repousa o entalhe majestoso de uma coruja em pleno voo, cujos olhos parecem julgar as intenções do inimigo. A Lança Promachos, sua parceira inseparável, é uma arma de alcance perfeitamente balanceada, com uma haste de metal leve e uma lâmina em formato de folha, afiada para encontrar o menor erro na guarda adversária. Quando o semideus canaliza a Égide Verdadeira, uma barreira de energia geométrica translúcida se projeta a partir do escudo, permitindo que o portador assuma o controle do campo de batalha. Ele se torna o guardião absoluto da falange, interceptando golpes letais destinados aos seus aliados com a precisão fria de quem já calculou o desfecho do embate muito antes do primeiro ataque ser desferido.`,
      r1Effect: `Concede +30 DEF e 30 HP. Égide Verdadeira: Custa: 50 de mana. Duração: 2 turnos para ativar o escudo, podendo transferir um ataque que um aliado recebeu para si. Cooldown: 3 turnos.`,
      refinements: {
        R1: "Efeito base integral ativo.",
        R2: "+40 de DEF e +30 de HP.",
        R3: "+50 de DEF e +60 de HP; Égide Verdadeira: Ao ativar recebe +1 Sucesso na defesa.",
        R4: "+60 de DEF, +60 de HP; Égide Verdadeira: Ao ativar recebe +1 Sucesso na defesa.",
        R5: "+70 de DEF, +90 de HP; Égide Verdadeira: Ao ativar recebe +2 Sucessos na defesa."
      }
    },
    "presas-noturnas": {
      id: "presas-noturnas",
      image: "assets/prizes/p07_presas_noturnas.png",
      imageWidth: 1024,
      imageHeight: 1024,
      code: "P-07",
      name: "Presas Noturnas",
      bannerId: "grito-da-guerra",
      nature: "Arma e Equipamento",
      summary: "Adagas gêmeas furtivas que desafiam a percepção inimiga e abrem oportunidades ofensivas letais.",
      interpretive: `A sabedoria também habita nas sombras e no silêncio antes do bote. As Presas Noturnas são um par de adagas gêmeas incrivelmente finas, forjadas não para o choque de espadas, mas para a letalidade furtiva. Suas lâminas são feitas de um metal escuro e fosco que não reflete a luz, lembrando as penas de ébano de uma coruja caçadora. Os cabos são ergonômicos e silenciosos, envolvidos em couro negro. Estas armas foram desenhadas para os filhos de Atena que operam na vanguarda da inteligência e do assassinato tático. Ao injetar mana nas lâminas, o Golpe de Oportunidade desperta: as adagas começam a dobrar a luz ao redor do portador, apagando sua presença visual do campo de batalha. A invisibilidade proporcionada não é um truque espalhafatoso, mas um apagamento frio e calculado, garantindo que o inimigo só perceba a lâmina no momento exato em que a sua guarda foi penetrada em seu ponto mais cego e vital.`,
      r1Effect: `Concede +40 DEF e 10% Dano Crítico. Golpe de Oportunidade: Custa: 100 de mana. Duração: 2 turnos. Inimigos devem rolar um teste de percepção de invisibilidade comum [1d20, necessário: 7]; caso falhem, o portador recebe +1 sucesso ofensivo. Cooldown: 2 turnos.`,
      refinements: {
        R1: "Efeito base integral ativo.",
        R2: "+50 de DEF e +20% de Dano Crítico; Necessário: 8; +1 sucesso.",
        R3: "+60 de DEF e 30% de Dano Crítico; Necessário: 9; +1 sucesso.",
        R4: "+70 de DEF, 40% de Dano Crítico; Necessário: 10; +1 sucesso.",
        R5: "+80 de DEF, 50% de Dano Crítico; Necessário: 11; +2 sucessos."
      }
    },

    // BANNERS: O AMOR ESTÁ NO AR (P-08 a P-16)
    "idolo-perpetuo": {
      id: "idolo-perpetuo",
      image: "assets/prizes/p08_idolo_perpetuo.png",
      imageWidth: 799,
      imageHeight: 816,
      code: "P-08",
      name: "Ídolo Perpétuo",
      bannerId: "amor-esta-no-ar",
      nature: "Bênção Exclusiva",
      classe: "Desejo",
      summary: "Acumule Adoração a cada abate e converta em ataque maciço ou multiplicador de cura.",
      interpretive: `Antes do desejo ser entendido como amor, luxúria ou obsessão, ele já existia como uma força absoluta, uma necessidade primitiva que fazia homens abandonarem reinos, matarem irmãos e se ajoelharem diante de deuses falsos apenas para tocar aquilo que acreditavam precisar. O Desejo não governa pela força; governa porque tudo no universo, inevitavelmente, quer alguma coisa. E aqueles escolhidos por essa bênção deixam de ser vistos como simples indivíduos. Tornam-se centros gravitacionais de necessidade emocional, figuras cuja presença distorce a razão de todos ao redor. Não importa se caminham por salões dourados ou ruínas ensanguentadas: olhares os seguem como devotos famintos diante de uma aparição divina. Sua voz parece preencher lacunas internas que as pessoas sequer sabiam possuir, enquanto sua imagem passa a provocar uma mistura desconfortável de adoração, inveja, obsessão e dependência. Alguns desejam protegê-lo. Outros desejam possuí-lo. Muitos desejam destruí-lo apenas para suportar a dor de não poder alcançá-lo. Ainda assim, todos o desejam. O portador desta bênção aprende a transformar essa devoção involuntária em poder bruto, alimentando-se da atenção emocional alheia como um soberano alimentado pelas preces de seus fiéis. Quanto mais olhares recaem sobre ele, mais sua presença se torna impossível de ignorar, até que sua simples aproximação faça multidões agirem como peregrinos enlouquecidos tentando tocar uma divindade viva, mesmo que precisem atravessar sangue, fogo ou cadáveres para isso.`,
      r1Effect: `Concede +10% ATK passivamente. Custa: 200 de mana. Duração: 3 turnos. Durante esse período adquire +20 ATK de cada aliado em campo [aquele que for maior]. Sempre que o portador ou seus aliados derrotarem algum inimigo, acumula 1 stack de "Adoração" [máximo: 5]. Cada stack concede +1% multiplicador de cura OU +20 ATK.`,
      refinements: {
        R1: "Efeito base integral ativo.",
        R2: "+20% ATK. Adoração: +2% multiplicador ou +30 ATK.",
        R3: "+30% ATK. Adoração: +3% multiplicador ou +40 ATK.",
        R4: "+40% ATK. Adoração: +5% multiplicador ou +50 ATK.",
        R5: "+50% ATK. Adoração: +10% multiplicador ou +60 ATK."
      }
    },
    "sombra-divina": {
      id: "sombra-divina",
      image: "assets/prizes/p09_sombra_divina_nao_nomeada.png",
      code: "P-09",
      name: "Sombra Divina Não Nomeada",
      bannerId: "amor-esta-no-ar",
      nature: "Bênção Exclusiva",
      classe: "Desejo",
      summary: "Concentre todos os efeitos positivos da equipe em um Vínculo Absoluto, com eficácia dobrada para amor verdadeiro.",
      interpretive: `Entre todas as histórias associadas ao Amor, nenhuma foi tão lembrada pelos próprios deuses quanto aquela entre Eros e Psique. Existem amores que nascem da beleza, outros da obsessão, mas o vínculo entre ambos teve início sobre algo muito mais perigoso: confiança cega. Todas as noites, Psique dividia seus aposentos com uma presença divina que jamais podia enxergar completamente. Ele surgia envolto pela escuridão, tocava sua pele, sussurrava em seus ouvidos e desaparecia antes da alvorada, proibindo-a de contemplar seu verdadeiro rosto. Inevitavelmente, a curiosidade a levou a trair a confiança do deus, que desejava apenas ser amado sem que sua beleza se tornasse um obstáculo entre os dois. Esse único ato deu origem a provações cruéis, separações e sofrimentos que obrigaram ambos a compreender o que realmente sentiam um pelo outro antes de finalmente se tornarem inseparáveis. Uma união jamais feita por luxúria ou obsessão, mas um vínculo tão profundo que desafiou ordens divinas, rompeu separações impossíveis e atravessou provações destinadas a destruir qualquer mortal. Psique não amou Eros apenas por sua beleza ou poder, ela escolheu continuar desejando-o mesmo quando restavam apenas sofrimento, silêncio e ausência. E Eros, pela primeira vez, abandonou a posição de força para amar alguém de forma igualmente vulnerável. Essa bênção representa exatamente essa deformação perigosa do amor: a escolha de concentrar tudo em uma única pessoa, até que o resto do mundo deixe de importar. Aqueles tocados por ela perdem a capacidade de dividir verdadeiramente aquilo que possuem. Seus poderes deixam de se espalhar igualmente entre aliados e passam a convergir violentamente para um único vínculo escolhido, como se toda devoção, esperança e proteção emocional fossem canalizadas para apenas uma alma. O portador aprende que o desejo mais intenso não é possuir muitos corações, mas entregar tudo de si a apenas um. Em combate, essa ligação se manifesta de maneira quase sobrenatural: ferimentos parecem menos pesados quando o escolhido permanece de pé, magias tornam-se mais violentas quando lançadas para protegê-lo, e até mesmo curas assumem uma intensidade antinatural, como se o universo aceitasse dobrar regras apenas para impedir que aquele laço fosse quebrado. Contudo, essa bênção também é uma condenação emocional. Quanto mais forte o vínculo, mais devastador se torna o medo de perder aquilo que finalmente se permitiu amar.`,
      r1Effect: `Concede +100 ATK passivamente. Uma vez por combate, o portador pode escolher um "Vínculo Absoluto". Sempre que utilizar buffs, curas, proteções ou efeitos positivos em área/equipe, poderá optar por cancelar completamente o efeito sobre todos os demais aliados e concentrar toda a potência daquele efeito apenas no Vínculo Absoluto. Habilidades concentradas dessa forma possuem seus valores aumentados em 25% de eficiência. Caso o alvo seja seu amor verdadeiro, a eficiência é dobrada para 50% (respeitando os limites canônicos do RPG).`,
      refinements: {
        R1: "Efeito base integral ativo.",
        R2: "+120 ATK. Eficiência concentrada: 30% padrão ou 60% amor verdadeiro.",
        R3: "+140 ATK. Eficiência concentrada: 35% padrão ou 70% amor verdadeiro.",
        R4: "+160 ATK. Eficiência concentrada: 40% padrão ou 80% amor verdadeiro.",
        R5: "+200 ATK. Eficiência concentrada: 50% padrão ou 100% amor verdadeiro."
      }
    },
    "despertar-nova-era": {
      id: "despertar-nova-era",
      image: "assets/prizes/p10_o_despertar_de_uma_nova_era.png",
      code: "P-10",
      name: "O Despertar de uma Nova Era",
      bannerId: "amor-esta-no-ar",
      nature: "Bênção Exclusiva",
      classe: "Sonho",
      summary: "Expanda os vínculos da alma entre múltiplos aliados e favoreça ações de apoio com redução de cooldown.",
      interpretive: `Diferente dos Titãs ou dos Primordiais, Psiquê não conquistou o Olimpo pela guerra, pelo sangue ou por um domínio cósmico violento. Ela o fez pela mais pura e aterradora resiliência. Quando Zeus lhe ofereceu a taça de ambrosia para salvá-la do sono da morte, a bebida não a transformou em algo novo; apenas revelou a imensidão de um espírito que suportou o peso do mundo sem se quebrar. O Panteão curva-se à força, mas o universo inteiro prendeu a respiração diante da compaixão e da empatia de uma mortal. Esta bênção não é uma manifestação de fúria, mas a recriação do exato milissegundo dessa Apoteose. É o poder da alma humana se aproximando à frequência do divino. Ao ativar a bênção, a alma do semideus agora brilha em uma cor que representa a origem de sua alma, ficando visível a todos no campo. O campo de batalha, antes caótico, é engolido por uma calmaria opressiva. Não é o silêncio do medo, mas o peso de uma reverência absoluta. A gravidade parece falhar perto dele, e o ar ganha o perfume sutil de flores elísias. Estar diante desse semideus é como olhar diretamente para a própria essência da vida. Nesse estado de graça inabalável, o herdeiro não luta apenas com as mãos, mas com o próprio tecido espiritual da realidade. Ao manifestar a Alma Acelerada, a luz em seu peito se estilhaça em dezenas de fios dourados e cintilantes que cruzam o campo de batalha na velocidade do pensamento. Ele não precisa mais focar em um único protegido; sua alma expande-se para abraçar inúmeros aliados ao mesmo tempo, sincronizando os batimentos cardíacos do grupo e elevando seus espíritos a um estado de êxtase divino. E ao ditar o Destino de Psiquê, a presença do semideus distorce a própria sorte e o vigor no campo de batalha, amplificando o desespero nos inimigos ou a glória absoluta nos aliados com um mero pensamento. Como um ser que transcendeu a carne, desde que o semideus preserve sua natureza pacífica e rejeite o ódio de um ataque direto, sua mente e suas magias operam em um tempo próprio, tecendo milagres, muito antes que o inimigo sequer consiga erguer a espada.`,
      r1Effect: `Concede passivamente 5% ATK/HP/DEF (caso possua Alma Perpétua, recebe 10% a mais). Alma Acelerada: Custo: 50 de Mana. Duração: 3 Turnos. Ao usar Vínculo da Alma, pode se ligar a 1 aliado adicional ao que a habilidade permite (máximo: 5 Stacks por aliado). Cooldown: 4 Turnos. Vínculo de Paz: Caso o portador não utilize nenhuma ação ofensiva no turno, tem o Cooldown de todas as suas habilidades reduzido em 1.`,
      refinements: {
        R1: "Efeito base integral ativo.",
        R2: "10% ATK/DEF/HP, 1 aliado adicional, 5 Stacks, +0,1 no multiplicador.",
        R3: "10% ATK/DEF/HP, 2 aliados adicionais, 5 Stacks.",
        R4: "15% ATK/DEF/HP, 2 aliados adicionais, 6 Stacks.",
        R5: "20% ATK/DEF/HP, 3 aliados adicionais, 7 Stacks. Caso utilize Destino de Psiquê, a mudança no multiplicador é de +0,1."
      }
    },
    "sono-estigio": {
      id: "sono-estigio",
      image: "assets/prizes/p11_por_favor_me_liberte_do_sono_estigio.png",
      code: "P-11",
      name: "Por Favor, Me Liberte do Sono Estígio…",
      bannerId: "amor-esta-no-ar",
      nature: "Bênção Exclusiva",
      classe: "Desespero",
      summary: "Troque atributos essenciais com parceiros, prolongue debuffs e aumente a letalidade de dano contínuo (DOT).",
      interpretive: `Muito se exalta a ascensão gloriosa de Psiquê, mas poucos ousam lembrar de sua queda vertiginosa. O desafio final imposto por Afrodite não era uma provação, era uma sentença de morte. Ao abrir a caixa de Perséfone, a princesa mortal não encontrou beleza, mas o vácuo absoluto do sono estígio, o desespero primordial do Submundo. Naquele instante de silêncio absoluto em que a vida se esvaiu, sua alma conheceu o peso da aniquilação. Esta bênção não nasce da compaixão da deusa, mas do trauma enraizado nesse quase aniquilamento. É a manifestação brutal de um espírito que, perante a inevitabilidade da morte, aprendeu a distorcer e atrelar a sua própria essência à de outros para não ser engolido pelo abismo. Ao manifestar esse poder, a alma do semideus passa a vibrar em uma frequência febril e desesperada, forçando uma ligação parasitária e simbiótica com a essência de um aliado. Onde o corpo mortal falha, a alma ressoa e usurpa. Através dessa troca absoluta, o portador estilhaça as barreiras do ser: ele arranca a inércia, a resiliência ou a força vital de si mesmo e a transplanta violentamente para o parceiro, puxando para si a virtude alheia. É um escambo perfeito e aterrorizante, onde a lentidão de um é trocada pela velocidade do outro em uma fração de segundo, reequilibrando as chances de sobrevivência da forma mais crua possível. Marcada pelos ecos letárgicos do Tártaro, a simples presença do portador prolonga a ruína. A Alma Furiosa garante que qualquer aflição, maldição ou debuff lançado contra seus inimigos recuse-se a dissipar, agarrando-se à essência deles com a mesma frieza do sono de Perséfone. E, quando invoca o Destino de Psiquê, a gravidade cósmica dessa comunhão sombria puxa as cordas da causalidade ao seu limite absoluto, cavando um fosso de desespero ainda mais profundo para os amaldiçoados e elevando drasticamente a magnitude da exaltação para os salvos.`,
      r1Effect: `Concede passivamente 5% SPD e 20% Dano Crítico (caso possua Alma Perpétua, recebe 10% a mais, totalizando 15%). Troca de Alma: Custo: 200 de Mana e 5 Stacks de alma. Duração: 2 Turnos. Concede 50% de 1 atributo em troca de receber 50% do atributo de um aliado. Cooldown: 5 Turnos. Alma Furiosa: Debuffs aplicados têm a duração aumentada em 1 turno. Além disso, ao ativar Domínio da Alma: Borboletas da Alma, aliados que utilizam DOT recebem um incremento de 1% na base da mesma.`,
      refinements: {
        R1: "Efeito base integral ativo.",
        R2: "10% SPD, 30% Dano Crítico, 60% na troca dos atributos, 2% incremento de DOT.",
        R3: "10% SPD, 40% Dano Crítico, 70% na troca dos atributos, 3% incremento de DOT.",
        R4: "15% SPD, 50% Dano Crítico, 80% na troca dos atributos, 4% incremento de DOT.",
        R5: "20% SPD, 70% Dano Crítico, 100% na troca dos atributos, 5% incremento de DOT."
      }
    },
    "corrente-extase": {
      id: "corrente-extase",
      image: "assets/prizes/p12_corrente_do_extase_carmesim.png",
      code: "P-12",
      name: "Corrente do Êxtase Carmesim",
      bannerId: "amor-esta-no-ar",
      nature: "Arma e Equipamento",
      summary: "Correntes de ganchos que acumulam Obsessão em ataques consecutivos e liberam golpes críticos massivos.",
      interpretive: `Diferente de espadas ou lanças feitas para guerras honradas, esta arma nasceu da própria natureza possessiva do Desejo. Sua forma assume longas correntes metálicas rubro-negras conectadas a lâminas curvas semelhantes a ganchos ritualísticos, constantemente úmidas com um brilho viscoso que lembra sangue fresco misturado a ouro líquido. Quando movimentadas, produzem um som quase musical, semelhante ao eco distante de vozes suspirando em uníssono. Não foram feitas para cortes limpos, mas para envolver, prender e arrastar inimigos para perto do portador, como amantes incapazes de fugir daquilo que os destrói. Cada golpe parece arrancar não apenas carne, mas também fragmentos emocionais da vítima, alimentando a agressividade de quem as empunha. Dizem que aqueles mortos por essa arma permanecem presos ao Reino do Prazer Perpétuo por algum tempo, revivendo eternamente tudo aquilo que desejaram e nunca puderam possuir. Em batalha, ela transforma o usuário em uma figura quase coreográfica, cruel e bela ao mesmo tempo, dançando entre corpos como a manifestação viva da obsessão.`,
      r1Effect: `Concede +5% ATK. Sempre que atingir o mesmo alvo consecutivamente, ganha 1 stack de "Obsessão" [máximo: 5]. Cada stack concede +10 ATK adicional contra aquele alvo específico. Ao atingir o máximo de stacks, o próximo golpe causa +10% DANO CRIT.`,
      refinements: {
        R1: "Efeito base integral ativo.",
        R2: "+6% ATK, +20% DANO CRIT ao atingir máximo de stacks.",
        R3: "+7% ATK, +30% DANO CRIT ao atingir máximo de stacks.",
        R4: "+8% ATK, +40% DANO CRIT ao atingir máximo de stacks.",
        R5: "+10% ATK, +50% DANO CRIT ao atingir máximo de stacks."
      }
    },
    "requiem-putto": {
      id: "requiem-putto",
      image: "assets/prizes/p13_requiem_de_putto.png",
      code: "P-13",
      name: "Réquiem de Putto",
      bannerId: "amor-esta-no-ar",
      nature: "Arma e Equipamento",
      summary: "Arco etéreo em ouro rubro cujos disparos quebram a resistência a debuffs emocionais.",
      interpretive: `Não foi criado para guerras comuns, tampouco para caçadas mortais. Diz-se que este arco nasceu do mesmo instante em que o primeiro ser desejou algo que jamais poderia possuir. Diferente das armas forjadas por Hefesto, sua estrutura não parece totalmente física; ela oscila entre matéria divina e manifestação emocional, como se existisse apenas enquanto alguém ainda fosse capaz de desejar profundamente alguma coisa. Seu corpo possui aparência elegante e quase ritualística: curvas alongadas em ouro rubro, detalhes negros semelhantes a veias cristalizadas e filamentos luminosos que lembram fios cardíacos pulsando lentamente. Quando repousa, parece apenas belo. Quando empunhado, torna-se inquietante. A corda do arco não é feita de fibra, couro ou metal, mas de um fio etéreo invisível que vibra conforme emoções próximas se intensificam. Quanto mais intenso o desejo ao redor, mais pesada e densa sua presença se torna. O usuário não precisa carregar aljava alguma; as flechas são criadas pela própria arma a partir da mana, emoções e intenções do portador. Algumas surgem como projéteis dourados e elegantes, semelhantes a luz líquida solidificada. Outras nascem escuras, envoltas por fumaça vermelha e negra, como manifestações de obsessão, carência ou paixão distorcida. Cada disparo parece menos uma flecha física e mais uma sentença emocional atravessando a realidade.`,
      r1Effect: `Concede +80 ATK. Caso acerte o mesmo inimigo 3 vezes, ele perde 1 sucesso em testes para resistir a debuffs emocionais.`,
      refinements: {
        R1: "Efeito base integral ativo.",
        R2: "+90 ATK e +6 SPD.",
        R3: "+100 ATK e +9 SPD.",
        R4: "+110 ATK e +12 SPD.",
        R5: "+120 ATK e +15 SPD."
      }
    },
    "joia-da-alma": {
      id: "joia-da-alma",
      image: "assets/prizes/p14_joia_da_alma.png",
      imageWidth: 727,
      imageHeight: 752,
      code: "P-14",
      name: "Jóia da Alma",
      bannerId: "amor-esta-no-ar",
      nature: "Arma e Equipamento",
      summary: "Gema translúcida que renuncia a ataques diretos em troca de redução de consumo e bônus de dano crítico.",
      interpretive: `A corrente deste colar é tecida com fios delicados de prata lunar, transmitindo profunda quietude. No centro repousa a Joia da Alma, uma gema translúcida cristalizada a partir da própria essência da deusa Psiquê, que pulsa suavemente em sincronia com as batidas do coração dos aliados. Este artefato não foi forjado para guerreiros, mas para os guardiões que sustentam o campo de batalha. Ao usá-lo, a Joia impõe um silencioso Voto de Paz: o espírito do portador é banhado em tamanha serenidade que qualquer capacidade de ferir ou atacar se dissolve por completo. Em troca dessa absoluta renúncia à violência, a mente do usuário se alinha ao fluxo mágico do mundo, permitindo canalizar feitiços e habilidades de proteção com um esforço espiritual mínimo. O portador abre mão da espada para se tornar o pilar inesgotável e pacífico onde seus companheiros se apoiam.`,
      r1Effect: `Concede +20 ATK ou +20 DEF ou +60 HP a depender do tipo de alma. Além disso, concede 10% Dano Crítico e ativar habilidades custa -10 de mana. Passiva: Voto de Paz (o semideus não pode realizar ações ofensivas). Ocupa Slot de Arma.`,
      refinements: {
        R1: "Efeito base integral ativo.",
        R2: "+20 ATK / +20 DEF / +60 HP; 20% Dano Crítico; -20 de mana.",
        R3: "+30 ATK / +30 DEF / +90 HP; 20% Dano Crítico; -30 de mana.",
        R4: "+40 ATK / +40 DEF / +120 HP; 30% Dano Crítico; -30 de mana.",
        R5: "+50 ATK / +50 DEF / +150 HP; 50% Dano Crítico; -50 de mana."
      }
    },
    "desejo-da-alma": {
      id: "desejo-da-alma",
      image: "assets/prizes/p15_desejo_da_alma.png",
      imageWidth: 768,
      imageHeight: 816,
      code: "P-15",
      name: "Desejo da Alma",
      bannerId: "amor-esta-no-ar",
      nature: "Arma e Equipamento",
      summary: "Aliança divina abençoada por Eros e Psiquê que amplifica os atributos do casal em campo.",
      interpretive: `Uma aliança divina moldada em ouro etéreo. Empolgados pelo Dia dos Namorados, os deuses Eros e Psiquê observaram do alto do Olimpo os mortais de Égide. Encantados por aqueles cujos destinos ansiavam por se entrelaçar de uma vez por todas, forjaram este anel mágico como um presente celestial. O interior da joia traz magicamente gravado o nome do casal, seguido da inscrição: "Abençoados por Eros e Psiquê". Mais do que um simples símbolo de união, a aliança carrega a própria centelha da paixão divina. Sempre que o casal se encontra no mesmo campo de batalha, a magia do anel desperta, fazendo-os sentir seu amor transbordar e aquecer a alma. Suas auras passam a ressoar em perfeita harmonia, conectando-os de forma profunda, como verdadeiras almas gêmeas lutando em sincronia.`,
      r1Effect: `Concede como atributo principal 20 ATK e como três subatributos somados 30 ATK. Alma Gêmea: Caso esteja no mesmo campo de batalha que a alma gêmea com o anel, os 20 ATK principais se tornam 5% ATK/DEF/HP (a depender do escalonamento). O mesmo vale para os subatributos, mantendo-se 30 ATK/DEF/HP. Serve como Liga coringa, usado no lugar de algum slot.`,
      refinements: {
        R1: "Efeito base integral ativo.",
        R2: "20 ATK (Se casal: 10% ATK/DEF/HP); Subatributos: 30 ATK.",
        R3: "20 ATK (Se casal: 10% ATK/DEF/HP); Subatributos: 40 ATK.",
        R4: "20 ATK (Se casal: 15% ATK/DEF/HP); Subatributos: 40 ATK.",
        R5: "20 ATK (Se casal: 20% ATK/DEF/HP); Subatributos: 50 ATK."
      }
    },
    "death-scythe": {
      id: "death-scythe",
      image: "assets/prizes/p16_amor_infernal_death_scythe.png",
      code: "P-16",
      name: "Amor Infernal — Death Scythe",
      bannerId: "amor-esta-no-ar",
      nature: "Arma e Equipamento",
      classe: "Sonho",
      summary: "Converte uma invocação vinculada em arma viva e amplia o teto de bônus de dano pela Ressonância da Alma.",
      interpretive: `Existe uma teoria antiga de que toda alma carrega dentro de si uma forma de combate, uma natureza belicosa que só se revela quando encontra alguém capaz de escutá-la em vez de apenas dominá-la. Alguns espíritos nascem para ser lâmina, outros para ser martelo, foice, rifle ou qualquer instrumento capaz de partir não apenas carne e osso, mas vontade, maldição, medo e destino. Durante eras, essa verdade foi tratada como tabu, porque transformar uma criatura viva em arma nunca foi uma questão de força bruta, mas de intimidade absoluta: é preciso tocar a essência de um ser, arrancar dela sua verdadeira forma e fazer com que ela aceite repousar na mão de outro sem perder o próprio nome. Os poucos que despertam essa bênção tornam-se capazes de realizar exatamente isso, convertendo um familiar sob seu vínculo em uma arma viva, consciente e faminta por batalha, cuja aparência é definida pela natureza da alma transformada. Um lobo pode tornar-se uma espada feroz de corte predatório, um corvo pode virar lâminas gêmeas, uma serpente pode se converter em um chicote segmentado, enquanto criaturas mais refinadas ou arcanas podem surgir como armas belíssimas, quase elegantes demais para a brutalidade que carregam. Quando a transformação acontece, o corpo físico da criatura é recolhido para dentro da arma, mas sua consciência permanece desperta, flutuando na mente de quem a empunha como uma presença constante, oferecendo instintos, alertas, conselhos, insultos ou prazer genuíno pela violência do confronto. Isso faz com que a arma nunca seja um objeto inerte: ela pensa, reage, sente o ritmo da luta e, quando existe vínculo real, antecipa junto do portador o melhor momento para atacar, defender ou rasgar uma abertura impossível. O verdadeiro fascínio dessa bênção, porém, está no fato de que ela não cria uma arma qualquer, e sim a forma mais sincera de um ser. Empunhar uma Death Scythe é literalmente segurar a alma de alguém pela empunhadura. É confiar tanto em uma criatura que ela aceita se tornar extensão do seu braço, e é desejar tanto a vitória que você aceita lutar lado a lado com uma vontade viva pulsando dentro do aço, do osso, da sombra, da música ou do cristal. Alguns dizem que, quando o vínculo é perfeito, o golpe não parece desferido por duas existências distintas, mas por uma única alma repartida entre quem ataca e quem corta.`,
      r1Effect: `Concede +70 ATK e +1 surto de ação passivamente. Forma de Arma: Custo: 200 de mana. Duração: 6 turnos. Alvo: 1 invocação, pet, familiar ou criatura sob vínculo direto do usuário (caso seja filho de Psiquê, ele mesmo poderá se tornar a arma). O alvo torna-se arma viva dividindo ações e adicionando 10% de dois atributos da escolha do semideus. Cooldown: 4 turnos. Ressonância da Alma: Custo: 500 mana ou 100 Stacks de Alma. Integra todo o atributo bônus de dano do alvo transformado à arma, aumentando temporariamente o limite máximo de 30 para 35 bônus de dano.`,
      refinements: {
        R1: "Efeito base integral ativo.",
        R2: "80 ATK e +1 surto de ação; 15% de dois atributos; Limite de 40 bônus de dano.",
        R3: "90 ATK e +1 surto de ação; 20% de dois atributos; Limite de 45 bônus de dano.",
        R4: "100 ATK e +1 surto de ação; 25% de dois atributos; Limite de 50 bônus de dano.",
        R5: "120 ATK e +2 surtos de ação; 30% de três atributos; Limite de 60 bônus de dano."
      }
    },

    // BANNERS: A SOMBRA DO ABANDONADO (P-17 a P-20)
    "son-of-forsaken": {
      id: "son-of-forsaken",
      image: "assets/prizes/p17_son_of_forsaken.png",
      imageWidth: 816,
      imageHeight: 816,
      code: "P-17",
      name: "Son of Forsaken",
      bannerId: "sombra-do-abandonado",
      nature: "Bênção Exclusiva",
      classe: "Delírio / Sonho",
      summary: "Converta cura excedente em dano crítico, recupere mana em mortes e controle os Fios do Poder Verdadeiro.",
      interpretive: `Muito antes de o conceito da Maré Branca engolir a Última Península, existia uma ligação íntima, profunda e perigosa entre Oberon/Tenebrus e a entidade primordial que o universo sempre evitou nomear: Shayol Ghul, a Anti-Vida. O universo é descrito como uma Grande Tapeçaria tecida pela Roda do Tempo, onde as vidas humanas são os fios. O Criador fez a Roda e a Tapeçaria, mas, no momento da criação, Ele também aprisionou o Cega-Corações do lado de fora da existência. Ele não pertence à realidade. Ele não está sujeito às leis da física, do tempo, da vida ou da morte. É o vácuo existencial que cerca o universo, empurrando as bordas da criação, sempre procurando uma fissura - a Fenda - para se infiltrar. Sua simples aproximação faz o clima enlouquecer, a comida apodrecer nas despensas e os vermes devorarem as colheitas. Ele é a antítese de tudo o que cresce. O Tenebroso não quer governar os vivos. Ele não quer escravizar a humanidade para ser adorado. Seu objetivo final é quebrar a Roda do Tempo. Se a Roda for quebrada, o tempo deixa de ser cíclico. O Padrão é desfeito. Ele deseja refazer o universo à sua própria e distorcida imagem - uma realidade onde o tempo morre, onde a esperança não existe como conceito e onde o livre-arbítrio é apagado. Um filósofo niilista, cuja voz quer convencer seres inteligentes de que a destruição de tudo é um ato de misericórdia ou de justiça própria. Ganhar esse poder significa abrir-se para esse vazio, trocando poder para ser uma porta do inimigo supremo. Os escolhidos recebem algo chamado como Poder Verdadeiro, uma energia estagnante e entrópica selada fora da Roda do Tempo, que anseia desfazer cada fio da existência até que reste apenas a submissão e o vazio absoluto. Quando o semideus desperta esta bênção, ele não canaliza a Abundância que reconstrói a carne, mas a ganância cósmica que devora o excesso para fortalecer a si próprio. O impacto de canalizar tal abominação é físico e visível: pequenas manchas negras, conhecidas como saa, começam a cruzar as íris e o branco dos olhos do portador em movimentos febris, marcando-o com o vício e o custo dessa divindade esquecida. O espaço ao redor do usuário perde temperatura, e suas sombras deixam de obedecer à iluminação natural, tornando-se poças espessas que engolem a cor do ambiente. A manifestação tátil desta bênção não é uma aura filosófica ou mental, mas a conjuração literal e física de Fios do Poder Verdadeiro. O semideus adquire a capacidade de materializar trevas condensadas diretamente do ar. Essas gavinhas sólidas de pura anti-vida assemelham-se a vidro vulcânico negro, brilhando com um fulgor doentio. O jogador pode usá-las ativamente em qualquer circunstância: podem ser tecidas como chicotes maciços que não apenas cortam armaduras, mas deletam as moléculas da matéria que tocam; podem formar lanças para empalar adversários à distância; ou até mesmo servir como agulhas profanas usadas para costurar à força membros decepados de invocações. Uma barricada defensiva não resiste ao impacto desses fios, pois eles anulam a integridade daquilo com que interagem, transformando a escuridão em uma extensão brutal e versátil do arsenal do conjurador.`,
      r1Effect: `Concede +15% ATK passivamente. Todos os atributos excedentes de Eficiência de Cura e Transferência de Atributos que ultrapassarem o teto máximo de 150% imposto pela passiva de classe são automaticamente convertidos em DANO CRIT na proporção de 1:2 (10% excedente = 20% Dano Crítico). Sempre que qualquer criatura for morta ou banida em raio de 30 metros, recupera 20 de Mana instantaneamente. Ativo: Custo: 100 de mana. Duração: 4 turnos. Domínio sobre os Fios do Poder Verdadeiro para ataques e utilidades interpretativas de alto dano material, concedendo +30 ATK em suas ações. Cooldown: 2 turnos.`,
      refinements: {
        R1: "Efeito base integral ativo.",
        R2: "+20% ATK passivo. Recupera 25 de Mana por morte.",
        R3: "+25% ATK passivo. Recupera 30 de Mana por morte.",
        R4: "+30% ATK passivo. Recupera 40 de Mana por morte.",
        R5: "+40% ATK passivo. Recupera 50 de Mana por morte. Concede acesso ao poder único do RPG: 'eclipses potestatis'."
      }
    },
    "coroa-noite-absoluta": {
      id: "coroa-noite-absoluta",
      image: "assets/prizes/p18_a_coroa_da_noite_absoluta.png",
      code: "P-18",
      name: "A Coroa da Noite Absoluta",
      bannerId: "sombra-do-abandonado",
      nature: "Bênção Exclusiva",
      classe: "Delírio",
      summary: "Dobre a quantidade de criaturas invocadas por habilidade e reduza o custo de mana de conjurações.",
      interpretive: `É uma manifestação suprema dessa autoridade ancestral sobre a umbra. Ao despertar esta bênção, uma auréola de escuridão cravejada com um brilho pálido e estelar forma-se sobre a cabeça do usuário, enquanto as sombras do ambiente desprendem-se do chão para envolvê-lo como um manto de seda finíssima, ou mesmo como vastas e imponentes asas de pura noite. O poder que esta bênção concede transforma a relação do usuário com a escuridão em uma simbiose predatória e tátil. As sombras passam a sussurrar diretamente em sua mente, agindo como uma rede sensorial onipresente que revela segredos do campo de batalha, movimentos ocultos e a pulsação do medo inimigo. Em combate, o semideus age com a precisão de um maestro impiedoso, muitas vezes sem sequer olhar para os próprios adversários. As sombras que se conectam a ele são tão antigas, que possuem vontade própria e são capazes de ir contra a própria vontade dele se isso significar salvá-lo, como atacar um aliado ou colocá-lo atrás de alguém que ele ama para que não morra. Elas querem garantir sua segurança não importa como. Em vez de realizar rituais desgastantes ou derramar sangue para criar vida, as feras são conjuradas a partir de poças de tinta que escorrem de sua própria pele ou de suas vestes. A facilidade com que o herdeiro comanda a umbra quebra as barreiras da invocação convencional: onde uma única fera deveria surgir, a sombra se estilhaça e se multiplica instantaneamente com a fluidez do mercúrio negro, afogando o inimigo em um mar de garras e dentes.`,
      r1Effect: `Concede +130 ATK passivamente. Qualquer magia, técnica ou poder ativo do semideus que possua a função de conjurar ou invocar criaturas tem a sua quantidade base de alvos automaticamente dobrada em um único turno (acelerando geração de Registros de Permanência sem alterar o limite total de controle). Além disso, reduz permanentemente em 30% o custo de Mana de qualquer habilidade de invocação/conjuração.`,
      refinements: {
        R1: "Efeito base integral ativo.",
        R2: "+150 ATK passivo. Redução de 35% no custo de Mana de qualquer invocação.",
        R3: "+160 ATK passivo. Redução de 40% no custo de Mana de qualquer invocação.",
        R4: "+200 ATK passivo. Passa a invocar o dobro + 1 criatura. Redução de 45% no custo de Mana.",
        R5: "+250 ATK passivo. Passa a invocar o triplo de criaturas. Redução de 50% no custo de Mana de qualquer invocação."
      }
    },
    "diario-abandonado": {
      id: "diario-abandonado",
      image: "assets/prizes/p19_diario_abandonado.png",
      imageWidth: 1024,
      imageHeight: 1024,
      code: "P-19",
      name: "Diário Abandonado",
      bannerId: "sombra-do-abandonado",
      nature: "Arma e Equipamento",
      summary: "Livro de cinzas que converte surtos de ação em dano verdadeiro para invocações e reduz cooldowns.",
      interpretive: `Um livro que deveria registrar a vida perdida daqueles que se perderam no vazio de Shayol Ghul, mas suas páginas foram censuradas pelo destino. Com páginas pesadas, como cinzas compactadas, as letras fluem, mudam de idioma e se reescrevem continuamente, utilizando uma tinta que lembra o fluido viscoso da Maré Branca. Ao ser empunhado, faz com que seu portador veja inércia natural do tempo distorcida, a favor do semideus. Em vez de entoar encantamentos demorados, o usuário acelera seus reflexos ontológicos a um ponto onde a invocação de abominações acontece em um piscar de olhos, convertendo a agressividade bruta das trevas em uma cadência frenética de comandos. A destruição se propaga pelo cenário antes mesmo que os inimigos possam erguer seus escudos, e a própria velocidade do usuário torna-se uma arma, convertendo-se em força entrópica pura que dilacera defesas mágicas e físicas como se fossem papel molhado.`,
      r1Effect: `Concede passivamente +5% de SPD. Para cada surto de ação que o usuário possuir, ele e TODAS as suas invocações ganham um bônus de DANO VERDADEIRO em seus ataques equivalente a 1% do ATK TOTAL do semideus. Além disso, reduz automaticamente o Cooldown da primeira habilidade de invocação utilizada no combate em 2 turnos.`,
      refinements: {
        R1: "Efeito base integral ativo.",
        R2: "+7% SPD passivo. Bônus de Dano Verdadeiro equivale a 2% do ATK.",
        R3: "+9% SPD passivo. Bônus de Dano Verdadeiro equivale a 3% do ATK.",
        R4: "+12% SPD passivo. Bônus de Dano Verdadeiro equivale a 4% do ATK.",
        R5: "+15% SPD passivo. Bônus de Dano Verdadeiro equivale a 5% do ATK. Reduz o Cooldown de habilidades de invocação em 1 turno permanentemente."
      }
    },
    "lanterna-mashadar": {
      id: "lanterna-mashadar",
      image: "assets/prizes/p20_lanterna_mashadar_lamina_shadar_logoth.png",
      code: "P-20",
      name: "Lanterna de Mashadar e a Lâmina de Shadar Logoth",
      bannerId: "sombra-do-abandonado",
      nature: "Arma e Equipamento",
      summary: "Conceda Ação de Ímpeto imediata às invocações e marque inimigos com a Maldição de Shadar Logoth.",
      interpretive: `Houve um tempo, muito antes da ruína do mundo, em que uma grande aliança de homens ergueu uma cidade magnânima focada exclusivamente em exterminar as trevas do Tenebroso. Contudo, movidos por uma paranoia tão implacável e um ódio tão absoluto, os governantes envenenaram a própria essência de sua terra, gerando um mal inteiramente novo, autossuficiente e alheio a qualquer deus. A cidade de Shadar Logoth morreu, devorada por sua própria criação: Mashadar, uma névoa senciente e cinzenta, desprovida de mente ou propósito, que caçava indiscriminadamente a alma e a vida daqueles que tocava. Desse cemitério histórico nascido do extremismo, o semideus extrai dois artefatos profanos conjugados, empunhando-os de forma simultânea e mortal. Na mão esquerda, uma pesada lanterna de ferro forjado que não lança luz, mas vomita e direciona continuamente os filamentos letais da névoa cinzenta de Mashadar. Na mão direita, repousa uma adaga antiga, perfeitamente equilibrada e letal, cujo pomo termina em um rubi lapidado do tamanho de um olho, que emite um brilho pulsante e hostil. Este conjunto não foi feito apenas para arrancar sangue, mas para reger o abate e garantir a podridão irrecuperável do oponente. A lanterna guia o rancor vazio da névoa para instigar uma agressividade violenta nas próprias invocações do semideus, enquanto um único arranhão provocado pela adaga de rubi é o suficiente para infectar o adversário com o ódio ancestral de Shadar Logoth, desativando suas defesas morais e mágicas.`,
      r1Effect: `Concede passivamente +5% ATK. Sempre que o semideus conjurar criaturas para o campo, a névoa de Mashadar concede imediatamente uma 'Ação de Ímpeto' (realizam um ataque básico instantâneo no momento em que entram no campo, sem consumir ação do portador). Sempre que o usuário atingir um alvo com a Adaga, o inimigo sofre a 'Maldição de Shadar Logoth' por 2 turnos: ataques das invocações aliadas causam Dano Verdadeiro adicional equivalente a 5% do ATK base do semideus.`,
      refinements: {
        R1: "Efeito base integral ativo.",
        R2: "+10% ATK. Maldição causa Dano Verdadeiro equivalente a 6% do ATK base.",
        R3: "+15% ATK. Maldição causa Dano Verdadeiro equivalente a 7% do ATK base.",
        R4: "+20 ATK e +15% ATK. Maldição causa Dano Verdadeiro equivalente a 8% do ATK base.",
        R5: "+40 ATK e +20% ATK. Maldição causa Dano Verdadeiro equivalente a 10% do ATK base, e alvos marcados pela adaga tornam-se imunes a receber cura de qualquer fonte que não seja ctônica."
      }
    },

    // VESTÍGIOS DA DIVERGÊNCIA (P-21 a P-29)
    "deathwalkers-ward": {
      id: "deathwalkers-ward",
      image: "assets/prizes/p21_deathwalkers_ward.png",
      imageWidth: 987,
      imageHeight: 1103,
      code: "P-21",
      name: "Deathwalker’s Ward",
      bannerId: "vestigios-da-divergencia",
      nature: "Armadura e Vestígio",
      summary: "Armadura de couro da Matrona dos Corvos com asas, proteção contra morte e tempestade de corvos.",
      interpretive: `É uma armadura de couro preto cravejado, coberta por intrincados arabescos, gravuras rúnicas e entalhes em quase cada centímetro quadrado. A borda de seu manto é enfeitada com as penas negras da Matrona dos Corvos. As runas estão em uma língua esquecida, morta desde antes da Divergência. Elas contam a história da criação da Rainha dos Corvos - uma deusa antiga dos mortos na visão das bruxas do oculto - sua ascensão de mortal a imortal. Elas relatam a história de sua penitência por ascender e assumir o trono de outra entidade que foi suplantada, tecida com um encantamento muito forte. Foi originalmente utilizada pelo vampiro Purvan Suul, o grande campeão da morte, mas que por ironia foi derrotado durante as guerras da Gália, e desde então esteve escondida apenas para aqueles que se mostrassem dignos. O portador do Vestígio cria um vínculo com a deusa antiga, respondendo ao seu chamado para conduzir o mundo pelo destino que ela considera certo - combatendo o deus cornífero e seus servos. O seu portador ganha a incrível velocidade do som, e força implacável que se equipara à de um gigante adulto, podendo conjurar uma tempestade de corvos a partir do tecido de maneira que eles lhe garantem teleportar-se para fugir de ataques de forma garantida, e ainda mitigar a vida do inimigo. Uma única vez de tempos em tempos, pode fugir da morte e as penas nas costas podem formar asas negras úteis para voar livremente se assim desejar.`,
      r1Effect: `+150 HP e +20 DEF. Consome 150 de mana para conjurar os corvos: durante 3 turnos causam -5 HP aos inimigos e permitem ao portador defender-se de qualquer ataque material uma única vez dentro desse período (cooldown de 1 turno após o término). Para utilizar as asas, consome 15 de mana. Poderá escapar da morte uma única vez por evento.`,
      refinements: {
        R1: "Efeito base integral ativo.",
        R2: "+180 HP, +50 DEF, -5 HP aos inimigos, defender de 1x ataque de cunho mental.",
        R3: "+210 HP, +60 DEF, -10 HP aos inimigos, defender de 1x ataque de cunho mental/emocional.",
        R4: "+1 dado, +240 HP, +70 DEF, -15 HP aos inimigos, defender de 1x ataque de cunho mental/emocional.",
        R5: "+2 dados, +270 HP, +80 DEF, -20 HP aos inimigos, defender de 1x ataque absoluto."
      }
    },
    "mythcarver": {
      id: "mythcarver",
      image: "assets/prizes/p22_mythcarver.png",
      imageWidth: 880,
      imageHeight: 1024,
      code: "P-22",
      name: "Mythcarver",
      bannerId: "vestigios-da-divergencia",
      nature: "Arma e Vestígio",
      summary: "Espada curta do vazio e som sólido que revela segredos ao narrador e amplia a taxa crítica.",
      interpretive: `É uma espada curta forjada em aço do vazio, um metal negro e polido como obsidiana líquida, que parece absorver a luz ao seu redor. Seu fio não reflete imagens, apenas distorce sombras, como se a própria realidade recusasse mostrar-se inteira diante dela. Ao longo da lâmina, espirais de runas e hieróglifos foram gravados em uma língua perdida desde antes da Divergência. Quando empunhada, ela emite um zumbido grave e constante, como um cântico distante que ecoa dentro do crânio do portador. As inscrições narram a história de Myrcella, a Rainha dos Mil Ecos, uma soberana apagada dos registros oficiais. Segundo os textos proibidos, ela não era inteiramente humana: diz-se que nasceu da união entre uma esfinge primordial e um rei mortal, herdando o dom de ouvir a verdade escondida nas coisas. Myrcella governava não por exércitos, mas por revelações, desmascarava deuses, reis e profetas, arrancando segredos que jamais deveriam ser ditos. Quando começou a expor mentiras divinas, seu nome foi riscado das crônicas, seus templos foram queimados, e sua existência declarada heresia. Mythcarver foi criada para ser sua extensão: uma pena de guerra capaz de reescrever lendas com sangue. A lâmina foi forjada com o metal mais raro do Norte, banhado em rituais sonoros das antigas canções rúnicas do deserto, cânticos tão antigos que, segundo os ocultistas, eram entoados antes mesmo de os deuses caminharem entre os mortais. Por isso, Mythcarver não corta apenas carne: ela ressoa com a essência das histórias, rasgando corpos e destinos ao mesmo tempo. Em combate, o vestígio orna especialmente com usuários que usam da música como sua principal arma. Cada golpe reverbera como um trovão abafado, criando ondas de força invisíveis que atravessam armaduras, mas quando o alvo usa sua voz, a lâmina ressoa estendendo sua lâmina em proporções absurdas com as notas vocais utilizadas, prolongam o alcance da lâmina como se fosse feita de som sólido, e fazem o inimigo sentir suas próprias verdades serem arrancadas do corpo junto com o sangue.`,
      r1Effect: `Concede +50 ATK e -20 em redução de custo de mana. Causar dano em um inimigo pela primeira vez permite ouvir um "eco da verdade" e descobrir baseado nisso informações úteis a nível narrativo (dicas do mestre). Corte Sonoro: Custo: 80 de mana. Duração: 2 turnos. Concede +20% TAXA CRIT e permite causar dano à distância (considerado corpo a corpo ou curto alcance). Visão das Verdades Sepultadas: Custo: 200 de mana. O portador recebe uma visão clara sobre a localização ou natureza de um mito, relíquia, criatura ou segredo oculto (com presságio narrativo). Cooldown: 1x por evento.`,
      refinements: {
        R1: "Efeito base integral ativo.",
        R2: "+70 ATK, -30 redução de consumo, +30% TAXA CRIT.",
        R3: "+90 ATK, -40 redução de consumo, +40% TAXA CRIT.",
        R4: "+1 dado, +120 ATK, -50 redução de consumo, +50% TAXA CRIT.",
        R5: "+2 dados, +150 ATK, -60 redução de consumo, +60% TAXA CRIT."
      }
    },
    "titanstone-knuckles": {
      id: "titanstone-knuckles",
      image: "assets/prizes/p23_titanstone_knuckles.png",
      imageWidth: 892,
      imageHeight: 1024,
      code: "P-23",
      name: "Titanstone Knuckles",
      bannerId: "vestigios-da-divergencia",
      nature: "Arma e Vestígio",
      summary: "Manoplas do Titã da Terra e de Kord com imunidade a empurrão, HP por MD e dano verdadeiro refletido.",
      interpretive: `São um par de manoplas colossais, forjadas a partir do coração fossilizado do Titã da Terra que tombou na Fundação durante a catástrofe conhecida como A Divergência. Não são esculpidas, parecem arrancadas da própria carcaça do mundo, placas de rocha celestial comprimidas por eras de pressão divina, tão densas que a luz se curva ao tocá-las. Sua superfície é cinzenta e profunda, como montanhas polidas pela eternidade, cruzada por runas nórdicas douradas que pulsam como veias incandescentes sob pedra fria. Segundo os registros heréticos preservados nos mosteiros do Norte, foi Kord, o Stormlord, antigo deus da guerra, das tempestades e da força indomável, quem desceu à cratera aberta pelo impacto do titã. Lá, no núcleo ainda quente da criatura primordial, ele forjou estas manoplas com o próprio martelo da tormenta, misturando relâmpagos ao sangue pétreo do colosso morto. Cada golpe de Kord ecoou como um trovão sobre o mundo em ruínas, selando nas manoplas o princípio da batalha eterna: destruir para fortalecer, cair para se reerguer. As Titanstone Knuckles não foram feitas para mortais. Foram entregues aos gigantes da primeira era como símbolo de sua aliança com o Stormlord, para que jamais esquecessem que a guerra é parte do ciclo da vida. Com a queda dos impérios colossais, as manoplas foram soterradas, adoradas como relíquias e temidas como presságios. Diz-se que onde elas despertam, a terra treme e o céu responde. Quando o portador une os punhos e faz as manoplas colidirem, um estrondo ressoa como um trovão subterrâneo. A rocha viva se expande, as runas se incendeiam, e o corpo do usuário cresce em massa e presença, como se carregasse o peso de um titã em cada osso. A pele se torna dura como basalto, os músculos vibram com energia elétrica, e uma aura de tempestade se espalha ao redor, faiscando no ar e nos olhos. O Stormlord não concede apenas força, ele exige equilíbrio entre fúria e controle. As runas se ajustam à natureza do combate: contra muralhas, tornam os golpes devastadores; contra criaturas ágeis ou arcanas, descarregam relâmpagos que quebram defesas e queimam a essência.`,
      r1Effect: `Concede +20% DEF. Torna-se Imune a efeitos de empurrão, queda ou deslocamento forçado. Corpo do Titã: Custo: 100 de mana. Duração: 3 turnos. Concede +30 HP por MD existente. Fúria de Kord (Forma 1 - Quebra Mundos): Custo: 500 de mana. Registra dano bruto recebido e devolve 30% para um único alvo como Dano Verdadeiro (mitigável apenas por MD). Fúria de Kord (Forma 2 - Trovão Ancestral): Custo: 100 de mana. Duração: 2 turnos. Aura eletrificada: caso sua defesa supere o inimigo por 7 sucessos de diferença, ele sofre Atordoamento (perde 1 ação por 2 turnos).`,
      refinements: {
        R1: "Efeito base integral ativo.",
        R2: "+25% DEF; +30 HP por MD; 35% dano verdadeiro; 7 sucessos.",
        R3: "+30% DEF; +40 HP por MD; 40% dano verdadeiro; 6 sucessos.",
        R4: "+35% DEF; +40 HP por MD; 45% dano verdadeiro; 5 sucessos.",
        R5: "+40% DEF; +60 HP por MD; 50% dano verdadeiro; 4 sucessos."
      }
    },
    "whisper": {
      id: "whisper",
      image: "assets/prizes/p24_whisper.png",
      imageWidth: 339,
      imageHeight: 391,
      code: "P-24",
      name: "Whisper",
      bannerId: "vestigios-da-divergencia",
      nature: "Arma e Vestígio",
      summary: "Adaga espectral do Vazio Exterior que rouba dano crítico e permite teleporte instantâneo com surto de ação.",
      interpretive: `É uma adaga de lâmina curva, forjada em um metal mercurial que jamais mantém a mesma forma sob a luz. Sua superfície reflete imagens distorcidas, como se o mundo ao redor estivesse sendo observado através de um espelho quebrado. Em certos ângulos, a lâmina parece desaparecer por completo, restando apenas um contorno frio e instável, como se não estivesse inteiramente ancorada nesta realidade. Ao tocá-la, o portador sente um arrepio profundo, não na pele, mas na memória, como se algo tivesse sido esquecido antes mesmo de ser lembrado. Segundo os tomos proibidos do Mar de Ozmit, Whisper foi forjada no instante entre a vida e o esquecimento, utilizando metal extraído do Vazio Exterior, uma região onde nem os deuses ousam caminhar. Ela não foi criada por mãos mortais, nem por uma divindade conhecida. Diz-se que foi moldada por algo que observa a criação de fora do tempo, uma entidade que se alimenta de nomes, histórias e finais. A lâmina foi encontrada nos destroços do navio The Shrew, afundado em águas amaldiçoadas durante a Primeira Era. Todos os tripulantes desapareceram sem deixar vestígios, exceto por um diário em branco e a adaga cravada no mastro, como se tivesse sido deixada ali de propósito. Desde então, Whisper passa de assassino em assassino, apagando não apenas corpos, mas linhagens inteiras da memória do mundo. Quando empunhada, ela não emite som algum. Nem o ar se move ao redor do golpe. O impacto acontece primeiro na essência do alvo, o corpo apenas acompanha depois. Feridos por Whisper relatam a sensação de que suas próprias lembranças estão sendo arrancadas, como páginas queimadas de um livro que ninguém mais poderá ler. Alguns sobreviventes afirmam que seus nomes deixaram de existir nos lábios das pessoas próximas. Seu maior trunfo é sua conexão com o seu portador, ao qual garante que ele possa se teleportar para onde tiver sido lançada em velocidade assustadora.`,
      r1Effect: `Concede +180 HP. Esquecimento Calculado: Custo: 100 de mana. Duração: 2 turnos. Inimigos realizam teste de vontade/resistência [1d20, necessário: 10]; se falharem, sofrem -10% DANO CRIT transferido para o dono do vestígio pelo resto do combate. O Sussurro: Custo: 50 de mana (não consome ação ativa). Concede +1 surto de ação se for usado após um ataque. Cooldown: 1x por turno.`,
      refinements: {
        R1: "Efeito base integral ativo.",
        R2: "+210 HP; -10% DANO CRIT; +1 surto de ação.",
        R3: "+240 HP; -10% DANO CRIT; +1 surto de ação.",
        R4: "+270 HP; -10% DANO CRIT; +1 surto de ação.",
        R5: "+1 dado, +300 HP; -20% DANO CRIT; +2 surtos de ação."
      }
    },
    "cabals-ruin": {
      id: "cabals-ruin",
      image: "assets/prizes/p25_cabals_ruin.png",
      imageWidth: 872,
      imageHeight: 1024,
      code: "P-25",
      name: "Cabal’s Ruin",
      bannerId: "vestigios-da-divergencia",
      nature: "Manto e Vestígio",
      summary: "Manto de basilisco que absorve magias de ataque para um reservatório secundário de mana e retribuição.",
      interpretive: `Apresenta-se como um manto de couro de basilisco tingido em um azul-noturno profundo, quase negro, cujas bordas são adornadas com fios de ouro puro que formam padrões geométricos de uma precisão matemática. Ao toque, o material é frio, mas vibra constantemente com uma energia estática latente que faz os pelos do portador se arrepiarem. No interior do capuz e ao longo do forro, pequenas runas de ametista estão incrustadas, elas brilham intensamente em um tom violeta sempre que magia é conjurada nas proximidades, como se o manto estivesse "farejando" o arcano. Este vestígio carrega o peso de séculos de caça aos magos. Suas runas narram a queda do infame "Den of Druja", um conclave de feiticeiros que tentou dobrar as leis da realidade durante a Calamidade que antecedeu a Divergência. Dizem as lendas que o manto foi forjado no coração de uma tempestade eterna por artesãos que buscavam equilíbrio contra o poder desenfreado dos deuses. Ele foi usado por assassinos silenciosos e justiceiros arcanos, passando pelas mãos da cruel Dra. Anna Ripley antes de encontrar um portador que pudesse redimir seu propósito. Agora um objeto que pertence a Ordem da Espada Cruciforme. O manto não é apenas uma proteção, é uma promessa de que nenhum feitiço ficará sem resposta e nenhum tirano arcano está seguro. O portador da Cabal’s Ruin torna-se um buraco negro para a energia mágica. Ao ser alvo de um feitiço, o usuário pode ordenar que o manto "devore" a trama da realidade, absorvendo a essência do ataque e armazenando-a como carga estática. Essa energia acumulada pode ser liberada em um golpe de retribuição devastador, infundindo ataques físicos com o poder de mil relâmpagos que estraçalham a carne e a alma do inimigo. Em seu ápice, o manto concede ao usuário a Percepção das Linhas Ley, permitindo-lhe antecipar o fluxo do destino e reagir com uma velocidade sobrenatural antes mesmo que o inimigo complete suas palavras de poder. O portador pode se dissolver em uma névoa de eletricidade azul para transpor o espaço num piscar de olhos, tornando-se intocável. Quando o capuz é erguido, o manto gera um campo de negação que torna o usuário invisível aos olhos de deuses e adivinhos, permitindo que ele se mova como uma sombra implacável através do campo de batalha, drenando a vida daqueles que ousam desafiar o equilíbrio natural.`,
      r1Effect: `Concede +10% SPD e +10% ATK (ou DEF, ou HP). Véu de Anulação: Custo: 200 de mana. Duração: 2 turnos. Absorve magias combativas de longa distância caso sua defesa vença, estocando integralmente a mana do ataque em um reservatório secundário. Com 600 de mana reservada: +20% DANO CRIT; com 800 de mana: +1 dado; com mais de 1.200 de mana: +0,1 no multiplicador de dano da fórmula. O buff dura 3 turnos e consome a mana ao final. Caso possua poderes sagrados, ganha -1 de dificuldade.`,
      refinements: {
        R1: "Efeito base integral ativo.",
        R2: "+15% SPD e +10% ATK/DEF/HP; +30% DANO CRIT; +0,1 multiplicador.",
        R3: "+15% SPD e +15% ATK/DEF/HP; +40% DANO CRIT; +0,1 multiplicador.",
        R4: "+20% SPD e +15% ATK/DEF/HP; +50% DANO CRIT; +0,1 multiplicador.",
        R5: "+20% SPD e +20% ATK/DEF/HP; +60% DANO CRIT; +0,2 multiplicador."
      }
    },
    "plate-dawnmartyr": {
      id: "plate-dawnmartyr",
      image: "assets/prizes/p26_the_plate_of_the_dawnmartyr.png",
      code: "P-26",
      name: "The Plate of the Dawnmartyr",
      bannerId: "vestigios-da-divergencia",
      nature: "Armadura e Vestígio",
      summary: "Armadura do Mártir da Aurora com reflexo de cura, queima solar e o sacrifício supremo de revogação divina.",
      interpretive: `Esta armadura de placas completa é forjada em um metal dourado resplandecente, polido a tal ponto que reflete a luz mesmo na mais absoluta escuridão. O peitoral ostenta um sol radiante esculpido em relevo, com um rubi central que pulsa como um coração batendo no ritmo da própria terra. As juntas são protegidas por malha de ouro fino, e as ombreiras lembram as asas abertas de uma fênix. Ao ser vestida, a armadura não pesa como o metal comum; ela envolve o portador com um calor reconfortante, como o abraço do sol em uma manhã de primavera, e o cheiro de incenso e ozônio parece emanar de seus vãos. Diz-se que esta armadura foi forjada nas fornalhas celestiais do Plano Brilhante para o primeiro grande campeão de Pelor, o Dawnmartyr (Mártir da Aurora), que sacrificou sua vida para selar uma fenda abissal durante a Calamidade. As inscrições rúnicas, gravadas em um dialeto celestial antigo, contam a jornada do sacrifício: o momento em que a luz se torna escudo e o sangue se torna esperança. Após a queda do campeão original na Cidade de Vasselheim, a armadura foi guardada como uma relíquia sagrada, aguardando um herói cuja vontade fosse tão inquebrável quanto o diamante e cujo coração queimasse com o desejo de proteger os inocentes. O portador da The Plate of the Dawnmartyr torna-se um farol vivo de retribuição divina. Qualquer criatura tola o suficiente para atingir o usuário em combate é imediatamente castigada por uma labareda de chamas solares que irrompe das placas, queimando a carne com o fogo da justiça. A armadura concede uma resistência inata ao calor do inferno e ao gélido abraço da morte, tornando o usuário virtualmente imparável em ambientes extremos. Em seu estado de glória plena, a armadura permite que o portador conjure a própria Ira do Sol, emitindo um clarão cegante que bane as sombras e cura as feridas daqueles que lutam ao seu lado. Contudo seu maior trunfo não mora na sua capacidade de manter seus aliados vivos, mas sim de emular precisamente o propósito deste vestígio que marcou permanentemente s Calamidade, em seu ato final, ao ponto de ser refiro como a grande divergência. Caso seu usuário escolha abrir mão de tudo, suas convicções, bênçãos, poderes, armas, artefatos, resistências e potências, única e exclusivamente, sem estar disposto a escolher confiar em deuses, mas sim escolher confiar a si mesmo, o efeito "Mártir" será revelado. Diante de um perigo aterrador, de um ataque que não pode ser defendido ou que possivelmente vai exterminar o seu grupo, o rubi central torna-se um sumidouro de energia, onde garante a possibilidade de absorver todo o poder lançado contra si, o armazenando dentro do coração desta regalia mítica, e convertendo em poder puro, não sagrado, caótico, maligno ou físico. É a energia do próprio destino transcrita em uma força capaz de violar até mesmo o mais poderoso dos imortais, não garantindo a vitória, mas uma resposta poderosa de alguém que está disposto a dar sua vida pelo futuro.`,
      r1Effect: `Concede +10% de Eficiência de Cura OU Eficiência de Escudo. Farol da Dor: Reflete 5% do dano recebido pelo usuário como cura em aliados. Ira do Sol: Custo: 200 de mana. Duração: 3 turnos. Consome 100% de seu HP, ATK ou DEF TOTAL e 20% MD TOTAL pelo resto do evento para converter em +0,2 no multiplicador de dano (Cooldown: 1x por evento). Juramento Quebrado do Mártir: Custo: 600 de mana. Consome integralmente um ataque assassino e devolve na forma de raio de fogo devastador com 110% do dano original do golpe inimigo (abandona poderes divinos pelo evento; risco de retaliação divina; Cooldown: 1x por evento).`,
      refinements: {
        R1: "Efeito base integral ativo.",
        R2: "+15% eficiência cura/escudo; consome 90% atributos; 120% do dano original devolvido.",
        R3: "+20% eficiência cura/escudo; consome 80% atributos; 130% do dano original devolvido.",
        R4: "+25% eficiência cura/escudo; consome 70% atributos; 140% do dano original devolvido.",
        R5: "+30% eficiência cura/escudo; consome 50% atributos; 150% do dano original devolvido."
      }
    },
    "the-list": {
      id: "the-list",
      image: "assets/prizes/p27_the_list.png",
      imageWidth: 768,
      imageHeight: 1431,
      code: "P-27",
      name: "The List",
      bannerId: "vestigios-da-divergencia",
      nature: "Arma e Vestígio",
      summary: "Pepperbox de Percy e Orthax que marca um nome da lista, acumula dano em 6 tiros e executa.",
      interpretive: `É uma pistola pepperbox de seis câmaras, construída em aço escurecido, prata velha e madeira nobre manchada por fuligem, sangue seco e marcas de unhas tão profundas que parecem ter sido feitas por alguém tentando arrancar a própria culpa da arma. Diferente das armas comuns, ela não parece ter sido apenas fabricada, mas lembrada. Cada peça se encaixa com uma precisão impossível para a tecnologia mortal de sua época, como se o portador original tivesse recebido o desenho completo dentro da própria mente, não em forma de inspiração, mas como uma sentença sussurrada por algo antigo demais para ser chamado apenas de demônio. Na superfície do tambor, seis espaços vazios surgem como cicatrizes metálicas, destinados a nomes que a arma reconhece como dívidas de sangue. Segundo os registros de Whitestone, The List foi a primeira arma de fogo criada por Percival de Rolo sob influência de Orthax, o demônio da fumaça, da pólvora e da vingança; mas ocultistas da Ordem da Espada Cruciforme defendem uma versão ainda mais sombria: a pólvora não nasceu naquela oficina, apenas encontrou ali seu primeiro profeta moderno. Durante a Calamidade, antes da Divergência separar os deuses do mundo mortal, existiram engenhos de execução criados para matar campeões divinos sem precisar tocar suas almas com magia. Eram armas incompletas, instáveis, rejeitadas até mesmo pelos arcanistas mais desesperados, pois cada disparo exigia não apenas fogo e metal, mas intenção assassina. Orthax teria encontrado um fragmento desse conhecimento perdido e o oferecido a Percy como sonho, transformando dor em mecanismo, luto em gatilho e vingança em uma nova linguagem de guerra. Por isso, ao mirar em um alvo contra quem o portador carrega ódio verdadeiro, culpa, promessa ou sede de reparação, a arma começa a respirar fumaça negra, e o nome da vítima pode surgir gravado no metal como se sempre tivesse pertencido ali. Cada tiro alimenta Orthax, ainda que seu espírito não esteja plenamente desperto, e cada inimigo abatido pela pistola deixa para trás um eco de alma preso entre a fumaça e o estampido. Em combate, este vestígio é feito para jogadores que desejam a fantasia do carrasco amaldiçoado, um atirador elegante, cruel e preciso, capaz de escolher um alvo e transformá-lo em obsessão. O poder da The List é imenso, mas nunca gratuito. Quanto mais o portador a utiliza por vingança, mais a arma aprende seus rancores, até o ponto em que talvez seja impossível saber se ele está puxando o gatilho por vontade própria ou apenas terminando uma frase que Orthax começou.`,
      r1Effect: `Concede +150 HP e +40 PA. Ao causar dano pela primeira vez, marca o inimigo com 'Nome da Lista' (+10% dano elementar de corrupção). Disparo de Pólvora Profanada: Custo: 200 de mana. Causa dano agravado e aplica 'Fumaça da Culpa' por 2 turnos (-5% MD ao alvo e anula camuflagens). Seis Razões Para Morrer: Custo: 500 de mana. Após acertar o marcado 6 vezes, desfere um tiro absoluto com 10% do dano registrado de cada disparo anterior. Se abater, recupera 100 de mana e aplica 'Sussurro de Orthax'. Cooldown: 1x por evento.`,
      refinements: {
        R1: "Efeito base integral ativo.",
        R2: "+180 HP e +50 PA; -5% MD; 15% de dano registrado; 1x por evento.",
        R3: "+210 HP e +60 PA; -10% MD; 20% de dano registrado; 1x por evento.",
        R4: "+1 dado, +240 HP e +70 PA; -15% MD; 20% de dano registrado; 1x por evento.",
        R5: "+2 dados, +300 HP e +80 PA; -20% MD; 25% de dano registrado; Cooldown: 8 turnos."
      }
    },
    "fenthras": {
      id: "fenthras",
      image: "assets/prizes/p28_fenthras_o_arco_da_traicao_selvagem.png",
      code: "P-28",
      name: "Fenthras, o Arco da Traição Selvagem",
      bannerId: "vestigios-da-divergencia",
      nature: "Arma e Vestígio",
      summary: "Arco longo feérico de madeira viva e de Saundor com flechas elementares, drenagem de HP e Caçada da Presa.",
      interpretive: `Conhecido entre os ocultistas como a Ira do Guardião Feérico, Fenthras é um arco longo feito de madeira viva, negra e retorcida, como se tivesse sido arrancado de uma árvore que cresceu bebendo luz lunar, sangue antigo e ressentimento. Seus galhos não foram talhados, mas convencidos a assumir a forma de arma; por isso, suas curvas ainda parecem respirar sob os dedos do portador, movendo-se em espasmos sutis quando há perigo por perto. Vinhas escuras se entrelaçam ao longo de toda a estrutura, ora apertando a madeira como serpentes, ora afrouxando como raízes buscando solo. Runas élficas brilham em tons verdes e dourados por baixo da casca, pulsando como veias de seiva arcana, enquanto uma gema esmeralda cravada no centro do arco funciona como seu coração, absorvendo emoções intensas e devolvendo-as em forma de precisão assassina. Diz-se que Fenthras nasceu durante a Calamidade, quando titãs, arquifadas, deuses e monstros disputavam o direito de moldar o mundo restante. Alguns registros afirmam que ele foi criado para proteger florestas antigas de qualquer exército, mortal ou divino; outros juram que a arma foi feita para matar aquilo que a natureza não conseguia mais perdoar. Em algum momento, o arco se perdeu na Feywild, onde foi encontrado por Saundor, um arquifada outrora vibrante, consumido pela mágoa de uma traição amorosa e pela obsessão de possuir aquilo que lhe escapava. A dor de Saundor não destruiu Fenthras, mas o marcou. Desde então, o arco carrega duas vontades opostas: a proteção selvagem de uma floresta que deseja sobreviver e a possessividade amarga de um coração que não aceita ser abandonado. Ao ser empunhado, Fenthras não exige flechas comuns. Ele cria seus próprios projéteis a partir da energia do portador, moldando-os em elementos vivos. Cada disparo parece nascer do arco como uma sentença natural, perseguindo o alvo com a paciência cruel das raízes. Fenthras não transforma seu portador em uma muralha, nem em um herói radiante. Ele o transforma em predador. E todo predador precisa decidir se está caçando para proteger algo ou apenas para nunca mais se sentir impotente.`,
      r1Effect: `Concede +70 ATK (ou DEF), +10% TAXA CRIT e +30 PA. Flechas geradas assumem elementos à escolha a cada turno. Flecha da Desolação: Custo: 100 de mana. Aumenta em +0,1 a reação elementar. Cooldown: 3 turnos. Chamado de Saundor: Custo: 200 de mana. Drena 5% do HP máximo do alvo convertendo metade em cura para o portador (aplica Sussurros de Saundor). Caçada do Guardião Feérico: Custo: 300 de mana. Duração: 3 turnos. Marca Presa Selvagem: ataques a distância ganham +10% CAT e ignoram camuflagens naturais. Cooldown: 1x por evento.`,
      refinements: {
        R1: "Efeito base integral ativo.",
        R2: "+90 ATK (ou DEF), +20% TAXA CRIT, +40 PA; +0,2 na reação; +5% HP regen; +10% CAT.",
        R3: "+100 ATK (ou DEF), +30% TAXA CRIT, +50 PA; +0,3 na reação; +5% HP regen; +15% CAT.",
        R4: "+1 dado, +110 ATK (ou DEF), +40% TAXA CRIT, +60 PA; +0,4 na reação; +5% HP regen; +15% CAT.",
        R5: "+2 dados, +120 ATK (ou DEF), +50% TAXA CRIT, +70 PA; +0,5 na reação; +10% HP regen; +20% CAT."
      }
    },
    "spire-of-conflux": {
      id: "spire-of-conflux",
      image: "assets/prizes/p29_spire_of_conflux.png",
      imageWidth: 768,
      imageHeight: 1536,
      code: "P-29",
      name: "Spire of Conflux",
      bannerId: "vestigios-da-divergencia",
      nature: "Cajado e Vestígio",
      summary: "Cajado primordial da Wildmother que armazena magias como Sementes Arcanas e as libera sem custo de ação.",
      interpretive: `É um cajado antigo de madeira clara, curvado como o tronco de uma árvore jovem que decidiu crescer em direção ao impossível. Sua superfície não possui emendas, cortes ou marcas de ferramenta; tudo nele parece ter brotado naturalmente, como se a própria madeira tivesse escolhido a forma de um condutor arcano. Ao redor do topo, galhos finos se abrem em espiral, sustentando uma joia suspensa que não toca o cajado, mas orbita lentamente dentro de um círculo de folhas cristalizadas. A pedra muda de cor conforme a magia ao redor: verde quando há vida, azul quando há cura, dourada quando há proteção, rubra quando há destruição e branca quando alguma força antiga tenta atravessar os limites do mundo. Ao toque, a Spire of Conflux não pulsa como uma arma, mas como um organismo em repouso. Ela respira junto do portador, aprende o ritmo de sua mana e, pouco a pouco, começa a antecipar as magias que ele deseja conjurar antes mesmo que seus lábios ou mãos completem o gesto. Diz-se que este vestígio nasceu do sopro da Wildmother sobre uma árvore jovem, ainda nos tempos em que o mundo precisava ser lembrado de que a magia não pertencia apenas aos deuses, aos arcanistas ou aos monstros da Calamidade, mas também à terra, ao vento, às raízes e ao instinto de sobrevivência de todas as coisas vivas. Diferente de outros cajados de guerra, a Spire não foi criada para lançar feitiços no lugar do usuário. Ela foi criada para abrigá-los. Sua joia central funciona como um coração de confluência, capaz de receber fórmulas mágicas, poderes ativos e rituais do próprio portador, comprimindo-os em pequenas sementes arcanas que giram ao seu redor até serem chamadas. Em combate, isso torna a Spire uma das relíquias mais cobiçadas por conjuradores complexos, quando desperta, o cajado deixa de ser apenas uma ferramenta e passa a agir como uma segunda mente mágica. Ele sustenta efeitos, guarda conjurações, libera poderes no impacto de golpes simples e permite que o portador transforme preparação em instinto. Ainda assim, a Spire não aceita abuso. Ela só abriga magias que pertencem verdadeiramente ao usuário, recusando efeitos roubados, bênçãos externas, vestígios, pactos instáveis ou poderes que exijam sacrifício absoluto. A Wildmother não criou uma arma para trapacear com a natureza da magia, mas para provar que aquilo que foi cultivado com paciência pode florescer no momento exato da guerra.`,
      r1Effect: `Concede 5% de sua mana como DANO CRIT e +10 PA. Regeneração de +20 de mana por turno. Coração da Confluência (sem consumo de ação ativa): No início do turno, pode abrigar até 100 de mana em magias próprias como Sementes Arcanas (dobra duração; libera sem gastar mana novamente). Conjuração Instintiva: Custo: 200 de mana. Duração: 3 turnos. Converte uma Semente Arcana em efeito passivo. Sopro da Wildmother: Custo: 500 de mana. Libera todas as sementes para usar uma individualidade sem custo de ação com +1 turno de duração. Cooldown: 1x por evento.`,
      refinements: {
        R1: "Efeito base integral ativo.",
        R2: "6% mana como DANO CRIT; +30 PA; +30 mana por turno; Coração da Confluência: até 150 mana; +1 turno.",
        R3: "7% mana como DANO CRIT; +60 PA; +40 mana por turno; Coração da Confluência: até 180 mana; +2 turnos.",
        R4: "8% mana como DANO CRIT; +80 PA; +50 mana por turno; Coração da Confluência: até 210 mana; +2 turnos.",
        R5: "10% mana como DANO CRIT; +100 PA; +50 mana por turno; Coração da Confluência: até 250 mana; +3 turnos."
      }
    }
  },

  // ── 6. ARQUIVO HISTÓRICO DE BANNERS ENCERRADOS (6 COLEÇÕES INTEGRAIS) ──
  historicalBanners: [
    {
      id: "h-01",
      code: "H-01",
      title: "Três Grandes (Zeus, Poseidon e Hades)",
      badge: "ARQUIVADO",
      summary: "Coleção mitológica que consagrou as bênçãos 'Queime alvorada', 'Baal', 'Estripador da Maré Vermelha', 'Galeão da Névoa', 'Netherwing' e 'Belial', além do Corte Olimpiano e Espada da Corte Sombria.",
      originUrl: "https://docs.google.com/document/d/1cP8vVF9EGLp9gvYJu_1qby2DJJ5gubLGbXEmHAyg5nc/edit?tab=t.0",
      contentFull: `Coleção dedicada aos patriarcas do Olimpo e do Submundo. Reuniu as regalias primordiais de trovão, abismo marinho e cinzas infernais, além de minérios raros como Petricita, Ferro Aqueronte e Ferro Estígio.`
    },
    {
      id: "h-02",
      code: "H-02",
      title: "Samhain — O Além e as Bruxas",
      badge: "ARQUIVADO",
      summary: "Coleção de terror gótico e bruxaria com 'O Desespero do Reflexo Cinza', 'Correntes de Caronte', 'Jardins dos Abandonados', 'O Sorriso Dourado do Acaso', 'Witches\\' Road' e 'Malleus Maleficarum'.",
      originUrl: "https://docs.google.com/document/d/1WBPOsV0DkxY3npcoDJ0NsfckXADoZOveuHJmwftWK4c/edit?tab=t.0",
      contentFull: `Consagrou as artes ocultas de Hécate, Melinoe e Tique durante o festival de Samhain, trazendo o Athame Lunar, a Falcione do Jardim Pálido e as maldições históricas de Medeia, Circe e Morgana.`
    },
    {
      id: "h-03",
      code: "H-03",
      title: "Sangue de Lilith — O Pecado Original",
      badge: "ARQUIVADO",
      summary: "Coleção de vampirismo e heresia com 'A Heresia Original', 'Sétimo', 'O Lamento do Juke Joint', 'Anel da Lua Diurna' e a 'Espada Insaciável'.",
      originUrl: "https://docs.google.com/document/d/1K9Moe9OEAmdvXhN6cQVcZAVrzp7rwCAGakIr-Ru6daI/edit?tab=t.0",
      contentFull: `Apresentou a quebra de regras e o poder roubado dos vampiros ancestrais e dos bluesmen do Delta do Mississippi, com foco em roubo de vida, sacrifício e o minério Ferro de Sangue.`
    },
    {
      id: "h-04",
      code: "H-04",
      title: "Chamas da Rebelião — Tyrrendor & Empyrean",
      badge: "ARQUIVADO",
      summary: "Coleção de cavaleiros de dragão com 'Marca da Rebelião', 'Armamento de Aretia', 'Codex de Warrick', 'O Escolhido do Empyreano' e a matilha de pets de suporte dos cadetes de Basgiath.",
      originUrl: "https://docs.google.com/document/d/1xy1DnERq8bDt_je6b0awxqkVWXJ4ccngwN-FDcG-e9Y/preview",
      contentFull: `Introduziu o segundo sinete, runas tyrricas e os seis deuses navarrianos (Amari, Dunne, Malek, Zihnal, Hedeon e Loial), além dos pets espectrais Lobinho, Doguinho, Pandinha, Tigrinho e outros.`
    },
    {
      id: "h-05",
      code: "H-05",
      title: "O Nó Solar — Apollo & Destino",
      badge: "ARQUIVADO",
      summary: "Coleção da causalidade cósmica com 'Nó Solar da Inevitabilidade', 'Restauração do Fio Íntegro', 'Couraça do Primeiro Abismo', 'Coroa da Permanência', 'Pilar do Destino' e 'Convergência Solar'.",
      originUrl: "https://docs.google.com/document/d/10Ezm81G7EFi80cdhj7eY5rZLL8dazOU3ELchrDylj0s/preview",
      contentFull: `Explorou a manipulação dos fios dourados do Destino de Apollo/Phoebus, as escamas de Python, o louro de Dafne e os ensinamentos de cura proibida de Asclépio.`
    },
    {
      id: "h-06",
      code: "H-06",
      title: "O Sono sem Sonhos — Somnus & Delírio",
      badge: "ARQUIVADO",
      summary: "Coleção do reino onírico com 'Olhos Sempre Fechados', 'Descanso Hipnótico', 'A Morte de Deleite', 'Caos Irrestrito', 'O Caleidoscópio de Vidro Quebrado' e os decretos do Jardim Branco.",
      originUrl: "https://docs.google.com/document/d/1YtoHTVx33MsN5RmgpRRGu8Ta1UTehNT6CHwQDr59y8w/edit?tab=t.0",
      contentFull: `Mergulhou nas areias oníricas de Somnus, na heterocromia de Delírio e na poda silenciosa de Deméter/Erinys com as espadas gêmeas Sentença da Raiz e Lâmina da Revogação.`
    }
  ],

  // ── 7. REGRAS DE ROLAGEM, GARANTIAS & REFINAMENTO ──
  bannerRules: {
    discordRollNotice: "As rolagens oficiais de orações acontecem exclusivamente no Discord, no canal identificado pelo código da sua ficha (ex: #001), com acompanhamento obrigatório de um ADM ou moderador.",
    guarantees: {
      temporarios: `Os banners temporários compartilham seus contadores. Se você realizar 40 orações sem obter um prêmio exclusivo, a 41ª concede um dos exclusivos disponíveis no banner escolhido. Antes da rolagem, indique o exclusivo que deseja. Se receber três exclusivos que não correspondam ao pretendido, o quarto exclusivo é garantido como o escolhido.`,
      permanente: `Vestígios da Divergência possui contador separado. Se você realizar 90 orações sem obter um exclusivo, a 91ª concede um dos exclusivos disponíveis. O permanente não possui a garantia de receber o prêmio pretendido após três exclusivos diferentes; sua tabela inclui um resultado (30) que permite escolher o prêmio.`,
      continuity: `O encerramento ou a troca dos banners não apaga os contadores acumulados. A contagem dos temporários é compartilhada entre os ciclos; a do permanente é separada.`
    },
    refinamento: {
      title: "Do R1 ao R5 — Regras de Forja e Refinamento",
      cost: "50 Golds por nível de refinamento",
      practitioners: "Forjador (para armas e itens) ou Manipulador Genético (para pets e familiares)",
      text: `Prêmios exclusivos podem ser refinados até R5. Cada refinamento exige abrir mão de um prêmio exclusivo idêntico ao que será refinado e solicitar a atualização da ficha. O nível é identificado junto ao nome: R2, R3, R4 e R5.
O procedimento acontece dentro do jogo com um Forjador, para itens, ou um Manipulador Genético, para pets. O custo fixo é de 50 Golds por refinamento. Prêmios que já sofreram alteração não podem ser refinados; os refinados recebem a sinalização de seis estrelas e não podem ser alterados por outras vias.`
    },
    eventStore: [
      { receive: "1 Oração Divina", cost: "100 Contas Celestiais", note: "Solicite a conversão à moderação no canal de sua ficha." },
      { receive: "100 Contas Celestiais", cost: "100 kg de metal mágico adquirido em banner", note: "Metais mágicos obtidos em rolagens podem ser fundidos e convertidos." },
      { receive: "100 Golds", cost: "100 Contas Celestiais", note: "Troca direta de câmbio para recursos comerciais da Égide." }
    ],
    faq: [
      {
        q: "Minhas Contas Celestiais e orações perdem a validade quando um banner termina?",
        a: "Não. Você poderá utilizá-las quando o próximo banner for lançado. Os recursos acumulados pertencem permanentemente à sua ficha."
      },
      {
        q: "Posso trocar um resultado de oração por outro?",
        a: "A loja não devolve orações já utilizadas. Negociações com outros jogadores podem acontecer dentro do RPG, conforme as regras aplicáveis."
      },
      {
        q: "Como incluo um prêmio na minha história?",
        a: "Você pode interpretar que encontrou o prêmio entre os restos do monstro derrotado ou que o recebeu após uma oração/bênção, conforme o contexto do banner e a validação da moderação."
      },
      {
        q: "Posso realizar orações por ficha geral?",
        a: "Sim, por ficha geral, no canal exclusivo da ficha no Discord."
      },
      {
        q: "Posso rolar pelo site?",
        a: "Nesta versão, as rolagens oficiais acontecem no Discord, com ADM ou moderador acompanhando para garantir a segurança da economia."
      },
      {
        q: "O que acontece com os contadores quando os temporários mudam?",
        a: "Eles são preservados integralmente. Os temporários compartilham sua contagem; o permanente tem contagem separada."
      }
    ]
  },

  // ── 8. NOVATO PREMIUM — DO ZERO AO HERÓI (ATO I & REGRAS CANÔNICAS) ──
  novatoPremium: {
    heroNotice: "Este programa não acelera o ganho de XP. Ao participar, você abre mão da evolução facilitada para seguir regras específicas de progressão gradual, missões de ambientação e recompensas próprias.",
    programPhilosophy: `Aqui encontraremos missões que não necessariamente darão muito XP, com foco maior especificamente em ganhar outras premiações que serão úteis para que o personagem, como armas exclusivas, bênçãos(Sempre R1), armas e etc. Mas o foco maior nessa experiência de missões está em fazer com que esse personagem viva a experiência de se ambientar a Égide de Avalon.

Aqui o personagem abrirá mão de uma evolução facilitada, já estando pré alinhado que esse terá um desenvolvimento mais slow-burn. Porém, em contrapartida ao abrir mão do up level acelerado e realizando todos os requisitos dos três atos o personagem terá vantagens em nível de poder se comparado aos personagens que não o farão.

O caminho do Novato Premium será dividido em três atos. Cada um com uma intenção e uma ideia muito bem definida para o que narrativamente os personagens irão passar. Ao fim do Ato 3, a intenção é que os personagens cheguem ao nível 10 e possam ser considerados agentes novatos destaques na Égide, vistos como com grande potencial. Porém é importante deixar claro que isso não resume o fim do arco do seu personagem. Chegar ao nível 10 no Midnight City nada mais é do que o início da sua história. Ao fim do caminho Novato Premium, é hora de você ir correr atrás do resto do arco de poder.

Por se tratar de um sistema novo, personagens que já estão no LVL 10, poderão o realizar, mas terão que ser considerados o nível correspondente a cada ato e esses turnos terão de ser feitos de forma atemporal no passado.

OS TRÊS ATOS:
No novato Premium®, o personagem passará por uma série de desafios, que provavelmente serão únicos para cada personagem, dado ao grande número de possíveis missões disponíveis para sua escolha. Cada um dos três atos tem uma intenção para que cada personagem se integra ao universo do Midnight City esteja pronto para ser um agente valoroso. Ao finalizar o Ato 3, o personagem não necessariamente será uma máquina de destruição e Caos, mas será um agente que entende as principais dinâmicas da Égide de Avalon e sabe onde está se metendo regularmente e o que esse mundo significa.

Uma breve introdução de cada um dos Atos, as missões estão nas respectivas guias de cada ato.`,
    acts: [
      {
        actNumber: 1,
        title: "Ato I — O Chamado do Herói",
        milestone: "Ao acabar você vai virar LVL 3!!!",
        status: "available",
        statusLabel: "Consultar missões",
        summary: "Ele se passa durante o primeiro mês do personagem desde sua entrada na Égide de Avalon! Aqui vamos desde a sua entrada, que pode ou não ser um resgate ou uma convocação pacífica pela Égide de Avalon. Neste Ato, você precisa escolher dentre um dos possíveis começos e depois precisará realizar suas primeiras missões, que vão até a escolha do seu Ofício e receber seu distintivo de agente e ter o seu chefe. O que marca o fim do seu ato é uma provação específica feita pela Égide. [Ao acabar você vai virar LVL 3!!!]"
      },
      {
        actNumber: 2,
        title: "Ato II — Descobrindo o Novo Mundo",
        milestone: "Ao acabar vai virar nível 5!!!",
        status: "coming_soon",
        statusLabel: "Em breve",
        summary: "Aqui você é um recruta como Agente da Égide. Você já sabe qual ofício você deve entrar, mas você ainda não conhece tão a fundo o mundo. Neste ato, você irá realizar pequenas tarefas para a organização, mas ainda sem de fato ter um ofício, trate como um período de experiência. Porém, não é apenas no trabalho de campo que o mundo é feito. Neste ato você irá pesquisar sobre os poderes, sobre os monstros, sobre quem são os cultistas e mais do que isso. Aqui o seu personagem irá interagir de forma mais regular com os veteranos da Égide, para que em ON o seu personagem saiba o que aconteceu nas temporadas passadas. Então você ouvirá muitas histórias sobre como esse mundo foi construído. Além de ter alguns treinamentos individualizados de combate, mas não necessariamente com instrutores. [Ao acabar vai virar nível 5!!!]",
        emptyDetail: "As missões e regras específicas do Ato II serão disponibilizadas em breve pela moderação da Égide."
      },
      {
        actNumber: 3,
        title: "Ato III — Início da Aventura",
        milestone: "Ao acabar você estará no nível 8. Mas se fizer a narração final vai chegar ao LVL 10.",
        status: "coming_soon",
        statusLabel: "Em breve",
        summary: "Você já sabe onde se meteu agora! E se já sabe… Agora é hora de botar a mão na massa! Esse ato você vai começar a lutar e se meter em roubadas, uma atrás da outra. Aqui finalmente você vai voltar a receber XP. Porém, o desafio vai aumentar a cada pequena missão, teremos missões pensadas para cada grupos de Ofícios, então espere o momento que você terá de se infiltrar em lugares perigosos, matar monstros até não aguentar mais e tudo isso usando seus poderes. Em alguns casos você terá de interagir com os Veteranos, indo em missões com eles que serão liderados por eles. E ao fim do Ato III junte um time de novatos, porque vocês serão testados pela Égide, para descobrir se vocês realmente são dignos. [Ao acabar você estará no nível 8. Mas se fizer a narração final vai chegar ao LVL 10.]",
        emptyDetail: "As missões e regras específicas do Ato III serão disponibilizadas em breve pela moderação da Égide."
      }
    ],
    act1Missions: [
      // ── INGRESSO (N-01: O Chamado do Herói - 4 Caminhos) ──
      {
        id: "n-01",
        code: "N-01",
        category: "Ingresso",
        title: "O Chamado do Herói",
        intro: "Essa missão tem quatro possíveis caminhos (só pode fazer um), porém, vocês podem adaptar pequenas coisas para ajustar a história do seu personagem! Todas elas no fim das contas tem como objetivo te trazer a primeira vez para a Égide de Avalon. Caso a história do seu personagem conte como que você é um agente que já está na Égide a um tempo você pode fazer esse turno atemporal, dias, meses ou anos atrás! Apenas deixa isso registrado!",
        requirement: "Pelo menos 2 turnos. Em algumas será necessário um veterano, nem que seja como NPC.",
        rewardsStandard: "300 Gold, 200 Contas Celestiais e 100 Fragmentos de Aura.",
        rewardsGroup: "Se feita em grupo de pelo menos 3 pessoas (Veteranos contam): 500 Golds, 500 Contas Celestiais e 200 Fragmentos de Aura.",
        veteranRewards: "Veteranos: Por ajudar a salvar as crianças, ganham o prêmio da Scylla (1.200 XP, 1.000 Contas Celestiais e 25 Orações) e não conta no limite semanal.",
        paths: [
          {
            id: "opt-1",
            code: "OPÇÃO 1",
            name: "Convocação Direta pela Égide",
            summary: "Um veterano faz a visita formal informando que você é filho de um Deus ou mago requisitado e o convida para ingressar.",
            desc: "É comum que a Égide de Avalon receba dos avatares dos Deuses avisos que alguns de seus filhos estejam próximos de despertar os próprios poderes ou mesmo que algum agente tenha reconhecido que uma pessoa é um semideus e informe isso nos relatórios para a Égide. Quem optar por esse caminho, receberá a visita de um veterano que fará uma breve introdução que um de seus pais foi possivelmente um Avatar de um Deus por um momento ou regularmente e te informe que os semideuses tem uma instituição, a Égide de Avalon. Ele vai te explicar de quem você é filho ou falar sobre o que você ser um mago da torre do relógio pode ajudar a Égide de Avalon e requisitar que você ingresse a Égide, deixando claro que não é apenas para segurança do mundo, mas para a sua, afinal monstros podem te atacar. Você pode resistir à convocação ou não, mas para esse caminho ser concluído, você terá de aceitar o convite para ingressar a Égide.",
            requirements: "Pelo menos 2 turnos. Precisa de um veterano pelo menos de NPC, fale com algum amigo no chat!",
            location: "Qualquer um que você quiser! Precisa de um veterano pelo menos de NPC, fale com algum amigo no chat!"
          },
          {
            id: "opt-2",
            code: "OPÇÃO 2",
            name: "Alistamento Voluntário para a Égide",
            summary: "Você já sabe que é semideus ou foi recomendado pela Torre do Relógio e vai à Sede pedir ingresso.",
            desc: "Esse é o caminho para quem sabe que é semideus! Nesse cenário, por você já saber que é semideus, de alguma forma seu personagem tem conhecimento sobre a Égide, pode ser uma mensagem dada pelo seu parente divino, uma recomendação da Torre do relógio ou para os mestiços, seu pai semideus sabe sobre a Égide e pede para que você siga os passos dele. Aqui você irá à Sede da Égide com alguém te recomendando ou seu Parente Divino irá informar a corporação que você irá lá. O roteiro desse turno passa por você se apresentar, falando de quem você é filho e explicar qual a sua intenção em se tornar Agente da Égide de Avalon, algum veterano ou NPC vai te entrevistar e mesmo que ele resista um pouco inicialmente ele vai te aceitar como agente, mas não tenta mentir muito, ele vai saber se você mentir, todas as vezes.",
            requirements: "Pelo menos 2 turnos. Entrevista com veterano ou NPC.",
            location: "Qualquer um da Égide, Sede, dormitórios, ETC. Mas em ON vai se passar na sala de reunião."
          },
          {
            id: "opt-3",
            code: "OPÇÃO 3",
            name: "Ataque de Monstros",
            summary: "Você é atacado por uma horda de monstros comuns e um agente veterano real intervém para resgatá-lo.",
            desc: "Um clássico olimpiano!!! Parabéns, você demorou demais para descobrir a Égide e os Agentes não sabiam que você era um semideus, mas olha só, os monstros descobriram! Você será atacado por uma horda de qualquer monstro da Classe COMUM do link. Você vai lutar com eles? Na verdade, só fugir interpretativamente ou tentar lutar sem rolar dado (se não vocês morrem). Mas por sua sorte a área onde você foi atacado estava sendo vigiada por agentes da Égide (Aqui não pode ser NPC) e vai ser seu salvador. Como é um agente treinado, vai notar que você é um semideus. Ele não vai saber de quem você é filho, mas ele vai te arrastar, você querendo ou não para ir na Égide e vão te alistar. (Considera que vai ter a conversa da OPÇÃO 2, mas não precisa jogar ela se não quiser).",
            requirements: "Pelo menos 1 Veterano com o grupo (AQUI NÃO PODE SER NPC!). Podendo levar até 3 veteranos.",
            location: "Literalmente qualquer lugar!"
          },
          {
            id: "opt-4",
            code: "OPÇÃO 4",
            name: "Você Está Devendo uma pra Égide!",
            summary: "Seu personagem fez alguma besteira mortal e a Égide oferece tirá-lo da roubada em troca de trabalho condicional.",
            desc: "De todas as opções de começo, essa é a mais aberta de todas. Seu personagem fez alguma besteira na vida de mortal, ir preso talvez? Seus pais te expulsaram por conta de uma utilização de poderes acidental? Talvez você tenha sido órfão? A criatividade aqui é o guia! O importante é que por conta desse problema que você arrumou em sua vida de mortal, a Égide sabendo que você é um semideus, Mago, vampiro ou etc te oferece um acordo simples. Eles te tiram da roubada, mas você vai ter de trabalhar como um agente da Égide, quer você queira ou não. A outra opção é continuar no problema. Você aceita este acordo de trabalho em condicional?\n\nOBS: Como esse é muito aberto, por favor antes fale sua ideia para a moderação para ver se é válido ou foge muito da Lore do RPG e da Égide.\n\nOBS 2: Favor se lembre que a Égide é uma associação do bem, se você for malvado malvado eles não vão te soltar.",
            requirements: "Pelo menos 2 turnos. Validar a proposta previamente com a moderação.",
            location: "Literalmente qualquer lugar! Pode ser uma memória do acordo também!"
          }
        ]
      },

      // ── ESTUDOS TEÓRICOS (N-02 a N-07: Hephaestus Tech) ──
      {
        id: "n-02",
        code: "N-02",
        studyNumber: "Estudo I",
        category: "Estudos",
        title: "O Que Meu Pai Faz?",
        notebookNotice: "Notebook Hephaestus Tech • Mitologia Básica e Árvore de Poderes",
        desc: "Após você aceitar o convite de ser um agente da Égide, te deram uma notícia triste. Você precisa estudar e fazer uma prova escrita. O que vai cair na prova? Você acredita que é mitologia. Seu personagem irá receber um notebook mágico da Égide com a logo da Hephaestus Tech, uma marca de computadores da Égide.\n\nNesse computador você vai encontrar informações sobre a mitologia básica do mundo dos mortais, sobre o que cada Deus representa, algumas boas histórias e etc. O foco nessa missão é simples, descobrir do que seu pai é Deus. Além disso, você terá acesso a uma página virtual que vai explicar para você o que tem na lista de poder que você escolher (Consulte a introdução oficial na lista de poderes da sua divindade.) É basicamente um pequeno estudo de onde você vai poder chegar como filho de um Deus.",
        requirements: "Pelo menos 1 turno do seu personagem.",
        rewards: "50 Fragmentos de Aura e 200 Golds.",
        examBonus: "+1 sucesso na missão “A prova Escrita”",
        location: "Literalmente qualquer lugar, mas não usa o computador com mortal lendo, você tá carregando informação sigilosa!"
      },
      {
        id: "n-03",
        code: "N-03",
        studyNumber: "Estudo II",
        category: "Estudos",
        title: "O Que É a Égide de Avalon?",
        notebookNotice: "Notebook Hephaestus Tech • Criação, Propósito e Conselho de Mármore",
        desc: "Após você aceitar o convite de ser um agente da Égide, te deram uma notícia triste. Você precisa estudar e fazer uma prova escrita. O que vai cair na prova? Você acredita que é mitologia. Seu personagem irá receber um notebook mágico da Égide com a logo da Hephaestus Tech, uma marca de computadores da Égide.\n\nNesse computador você vai encontrar informações sobre a criação da Égide, qual seu propósito e o que é conselho de mármore e qual são as divisões dos ofícios do RPG. (Resumindo bem tudo que tem na página de Ambientação do Site, vocês já leram, só fazer o personagem aprender!)",
        requirements: "Pelo menos 1 turno do seu personagem.",
        rewards: "50 Fragmentos de Aura e 200 Golds.",
        examBonus: "+1 sucesso na missão “A prova Escrita”",
        location: "Literalmente qualquer lugar, mas não usa o computador com mortal lendo, você tá carregando informação sigilosa!"
      },
      {
        id: "n-04",
        code: "N-04",
        studyNumber: "Estudo III",
        category: "Estudos",
        title: "Por Que Prender Cultistas?",
        notebookNotice: "Notebook Hephaestus Tech • Dossiê de Ameaças Ocultas",
        desc: "Após você aceitar o convite de ser um agente da Égide, te deram uma notícia triste. Você precisa estudar e fazer uma prova escrita. O que vai cair na prova? Você acredita que é mitologia. Seu personagem irá receber um notebook mágico da Égide com a logo da Hephaestus Tech, uma marca de computadores da Égide.\n\nNesse computador você vai encontrar informações sobre quem são os cultistas, se eles são perigosos e etc. Isso tecnicamente não tem na ambientação, mas se acalme os seus problemas acabaram, porque eu acabei de fazer um pequeno resumo do que eles fazem, porque são malvados dentro da Lore! Só ler esse resuminho e interpretar descobrindo essas informações!!!",
        loreBreak: {
          title: "Pausa para a Lore: O que são os Cultistas?",
          content: "Dentro do RPG, algumas missões aparecem com regularidade as palavras cultistas! O que são eles? Interprete que eles são vilões comuns que a Égide enfrenta. São diversos grupos, existem alguns grupos que estão correlacionados com Deuses Gregos, como mortais que ao cultuarem por exemplo Hécate, Circe, Delírio ou os próprios três Grandes (Zeus, Hades, Poseidon), querem fazer valer seus planos para que o mundo funcione! Eles também podem ser capangas de alguns monstros humanoides. Podemos inventar algumas ordens que por exemplo são correlacionadas com a Medusa por algum motivo ou algo do gênero. No limite, interprete que são na maior parte da vezes humanos sem sangue divino com más intenções. Ocasionalmente algum semideus se mete com eles e os podem os tornar mais perigosos. Mas no geral são humanos que estão revoltados com algum Deus, do Panteão Grego ou outros."
        },
        requirements: "Pelo menos 1 turno do seu personagem.",
        rewards: "50 Fragmentos de Aura e 200 Golds.",
        examBonus: "+1 sucesso na missão “A prova Escrita”",
        location: "Literalmente qualquer lugar, mas não usa o computador com mortal lendo, você tá carregando informação sigilosa!"
      },
      {
        id: "n-05",
        code: "N-05",
        studyNumber: "Estudo IV",
        category: "Estudos",
        title: "O Que São os 7 Perpétuos?",
        notebookNotice: "E-mail Sigiloso do Veterano • Cosmologia Superior e Passivas Únicas",
        desc: "Nessa tarefa, você receberá um e-mail do Veterano responsável por te convocar a Égide, te enviando um relatório que na verdade não era para você ler ainda, mas ele diz que foi com a sua cara então vai te ajudar a passar na prova mais fácil. O relatório tem uma série de informações sobre o que são os Perpétuos e quem é cada um. Adivinha só? Vai cair na prova! (Não está no site, então mais uma vez…)",
        loreBreak: {
          title: "Pausa para a Lore: Cosmologia Superior e os Sete Perpétuos",
          content: "Dentro do RPG, o Criador por meio do Arquiteto criou o mundo comum. Essa mesma história pode ser contada em diversos panteões, como por exemplo aqui na Grega o arquiteto do universo foi o Caos. Porém, em todos os panteões e toda a criação tem uma unidade superior na qual é apresentada pelos Sete Perpétuos (Sim, parecido com Sandman!!!) Todos os Deuses tem relação com pelo menos dois desses Perpétuos, o que reflete as classes das listas de poder. Porém, essas sete entidades também tomam conta do corpo de alguns Deuses, fazendo com que eles sejam mais do que os Deuses normais, seguem os sete Perpétuos e quem são eles no Panteão Greco-Romano:\n\n• Destruição (Deméter / Ceres)\n• Destino (Apolo / Phoebus)\n• Morte (Tânatos / Letus)\n• Desejo (Eros / Cupido)\n• Delírio (Delírio / Paraphonia)\n• Desespero (Melinoe / Phantessa)\n• Sonho (Morfeu / Sommia)\n\nBônus: Se você for filho de um Deles, você vai ganhar alguns poderes que são as passivas únicas, pode colocar em ON você lendo o que interpretativamente ela faz."
        },
        requirements: "Pelo menos 1 turno do seu personagem.",
        rewards: "50 Fragmentos de Aura e 200 Golds.",
        examBonus: "+1 sucesso na missão “A prova Escrita”",
        location: "Literalmente qualquer lugar, mas não usa o computador com mortal lendo, você tá carregando informação sigilosa!"
      },
      {
        id: "n-06",
        code: "N-06",
        studyNumber: "Estudo V",
        category: "Estudos",
        title: "O Que É a Torre do Relógio?",
        notebookNotice: "Notebook Hephaestus Tech • Tradições Arcanas e Escolas de Magia",
        desc: "Após você aceitar o convite de ser um agente da Égide, te deram uma notícia triste. Você precisa estudar e fazer uma prova escrita. O que vai cair na prova? Você acredita que é mundo místico dos semideuses? Seu personagem irá receber um notebook mágico da Égide com a logo da Hephaestus Tech, uma marca de computadores da Égide.\n\nNesse computador você vai encontrar informações sobre o que é a Torre do Relógio, qual seu propósito, quais são as escolas de magia que nela constam, e a relação com a Égide e com a Santa Igreja.",
        requirements: "Pelo menos 1 turno do seu personagem.",
        rewards: "50 Fragmentos de Aura e 200 Golds.",
        examBonus: "+1 sucesso na missão “A prova Escrita”",
        location: "Literalmente qualquer lugar, mas não usa o computador com mortal lendo, você tá carregando informação sigilosa!"
      },
      {
        id: "n-07",
        code: "N-07",
        studyNumber: "Estudo VI",
        category: "Estudos",
        title: "O Que É a Santa Igreja?",
        notebookNotice: "Notebook Hephaestus Tech • Fé, Inquisição e Equilíbrio Sobrenatural",
        desc: "Após você aceitar o convite de ser um agente da Égide, te deram uma notícia triste. Você precisa estudar e fazer uma prova escrita. O que vai cair na prova? Você acredita que é mundo místico dos semideuses? Seu personagem irá receber um notebook mágico da Égide com a logo da Hephaestus Tech, uma marca de computadores da Égide.\n\nNesse computador você vai encontrar informações sobre o que é a Santa Igreja, qual seu propósito, quais são as escolas de magia que nela constam, e a relação com a Égide e com a Santa Igreja.",
        requirements: "Pelo menos 1 turno do seu personagem.",
        rewards: "50 Fragmentos de Aura e 200 Golds.",
        examBonus: "+1 sucesso na missão “A prova Escrita”",
        location: "Literalmente qualquer lugar, mas não usa o computador com mortal lendo, você tá carregando informação sigilosa!"
      },

      // ── TREINAMENTOS PRÁTICOS (N-08 e N-09: Combate Hephaestus Tech) ──
      {
        id: "n-08",
        code: "N-08",
        trainingNumber: "Treino I",
        category: "Treinamentos",
        title: "Bate, É Só Bater!",
        subtitle: "Androide P.E.D.R.O. (Plataforma eletrônica De Refino Ofensivo)",
        desc: "Sabe aquele Notebook que a Égide te deu? Então… Em meio ao seus dias de intenso estudo, um dia o notebook vai parar de funcionar, dando uma tela azul. Enquanto você tenta reiniciar o sistema, o notebook começa a andar sozinho e se aproxima de sua televisão e outros aparelhos eletrônicos e ele vai se transformar após absorver os apetrechos, se transformando em um android de forma humanoide, que se chama P.E.D.R.O. que é um acrônimo para Plataforma eletrônica De Refino Ofensivo. Que nada mais é do que um robô para ensinar a combater. Ele não vai bater em você em momento algum, mas dirá que só voltará a forma de computador quando você acertar um golpe nele. Bem… Bate, é só bater!",
        mechanics: {
          actionsAllowed: "Vocês tem direito a 4 ações ofensivas por turno.",
          androidRoll: "O androide rola 10d10t6.",
          condition: "Pelo menos 1 acerto nele. Caso falhe em três turnos o androide vai rir de você e voltar a ser um Notebook. (Pode tentar fazer as 12 ações num turno só, mas vai ter de ser maior!!!)"
        },
        rewardsSuccess: "70 Fragmentos de Aura e 10 orações celestiais",
        rewardsFail: "50 Fragmentos de Aura e 200 contas celestiais.",
        location: "Literalmente qualquer lugar."
      },
      {
        id: "n-09",
        code: "N-09",
        trainingNumber: "Treino II",
        category: "Treinamentos",
        title: "Defesa Pessoal 101",
        subtitle: "Óculos de Realidade Virtual Hephaestus Tech",
        desc: "O P.E.D.R.O. desviou de tudo e te zuou? A Hephaestus Tech pede perdão, ele se saiu um pouco de controle! Mas não fique chateado, aspirante! Nós também preparamos um ambiente virtual de treinamento para que você possa iniciar o treinamento de combate físico! O Notebook irá oferecer para você um óculos de realidade virtual que assim que o seu personagem o coloque em seu rosto você acordará em um ambiente que lhe é agradável para que você participe de um treinamento. Nesse ambiente, seu inimigo será uma pessoa que você não gosta de forma alguma, para estimular que você o agrida com mais gosto!",
        mechanics: {
          actionsAllowed: "Vocês tem direito a 4 ações ofensivas por turno.",
          androidRoll: "O androide rola 10d10t7.",
          condition: "Tem que acertar pelo menos duas vezes!!!",
          bonus: "Bônus! A cada rodada você reduz uma dificuldade de suas rolagens."
        },
        rewardsSuccess: "70 Fragmentos de Aura e 10 orações celestiais",
        rewardsFail: "50 Fragmentos de Aura e 200 contas celestiais.",
        location: "Literalmente qualquer lugar."
      },

      // ── CONCLUSÃO DO ATO I (N-10 e N-11) ──
      {
        id: "n-10",
        code: "N-10",
        conclusionNumber: "Conclusão I",
        category: "Conclusão",
        title: "A Entrevista Final",
        subtitle: "Escolha de Ofício e Avaliação Vocacional",
        desc: "Após os primeiros dias você acabou conhecendo um pouco mais sobre a Égide, seu parente divino e como funcionam todos os ofícios da corporação. As opções para qual ofício seu personagem irá realizar estão sob a mesa, após você preencher um formulário, dois agentes um de cada ofício que você está em dúvida vão tentar te entrevistar para saber o que você tem a oferecer ao departamento. Além disso, os dois vão tentar vender qual ofício você deve escolher por conta de seus poderes. Apenas jogue isso com calma, se você tentar ocultar uma informação deles vocês deverão fazer um teste de carisma. [1d20, necessário: 15 sucessos]. Caso apenas queira entrar deve convencer o responsável que você está pronto para entrar.",
        requirements: "Pelo menos 2 turnos. Em algumas será necessário um veterano, nem que seja como NPC.",
        diceRules: "Para ocultar informações da Égide: 1d20, necessário 15. Para convencer que é bom para a Égide: 1d20, necessário 6 sucessos, duas vezes.",
        rewards: "200 Contas Celestiais e 200 Fragmentos de Aura.",
        location: "Qualquer um da Égide."
      },
      {
        id: "n-11",
        code: "N-11",
        conclusionNumber: "Conclusão II",
        category: "Conclusão",
        title: "A Prova Escrita",
        subtitle: "Missão Final de Ato (Exame Escrito Obrigatório)",
        desc: "Após a entrevista e os estudos, o seu personagem, assim como outros diversos NPCs que estão entrando, vão realizar uma prova escrita no qual as questões são todas sobre a Égide, os Perpétuos, Os Deuses, os Agentes do conselho de Mármore entre outras coisas. É necessário que o seu personagem consiga acertar pelo menos 70 de 100 pontos na prova. Cada uma das rolagens conta um bloco de questões… Mas ninguém disse que você não pode fazer igual no Exame Chunin e roubar, sabe? Você tem poderes…",
        requirements: "Ao menos 500 Fragmentos de alma/aura e pelo menos 2 tarefas realizadas.",
        diceRules: "Deve-se rolar 1d20 para cada dez questões (são 3 rolagens), precisando tirar ao menos 8 em duas das vezes.\n\nBônus: Para cada missão de estudo feita, você tem +1 sucesso em todos os testes.\n\nOBS: Vocês podem usar os poderes para roubar… Role 1d20, precisa de pelo menos 10, para conseguir +2 sucessos em todas as questões.\n\nOBS 2: Os poderes precisam fazer sentido para roubar. Poderes passivos não precisam de rolagem e dão os que eles dão.",
        rewards: "1.100 XP (Vai para o LVL 3) | 20 Orações Celestiais | 1.000 Gold.",
        location: "Qualquer um da Égide."
      }
    ],
    completionChecklist: [
      "Pelo menos 500 Fragmentos de Aura acumulados.",
      "Ter realizado ao menos três missões diferentes (estudos e treinos contam).",
      "Realizar as missões “Chamado do Herói” e “A Entrevista Final”.",
      "Ter sido aprovado na missão final “A Prova Escrita”."
    ],
    rules: [
      {
        number: 1,
        title: "Caráter Opcional e Loja Exclusiva",
        summary: "Nenhum personagem é obrigado a realizar o Novato Premium®.",
        desc: "Nenhum personagem é obrigado a realizar o Novato Premium®, caso opte pelo up-level tradicional, em contrapartida o OFF não pode transferir as compras da Loja do Novato Premium para quem não fez. Prêmios obtidos pela premiação de narrador podem ser transferidos para qualquer personagem."
      },
      {
        number: 2,
        title: "Conversão de XP Externo para Gold",
        summary: "Todo XP de fontes externas é dividido por 10 e vira Gold.",
        desc: "Ao iniciar o Novato Premium®, novos personagens ficam impossibilitados de receber XP de qualquer forma, exceto nas missões dos atos. Toda XP que ele ganharia de outras formas é dividida por 10 e vira Gold. (Exemplo, caso ganhe 1.200 na Scylla, passa a ganhar 120 Gold.)"
      },
      {
        number: 3,
        title: "Divisão por Etnia do Panteão",
        summary: "Personagens com duas Etnias escolhem apenas uma.",
        desc: "O Novato Premium® é dividido por Etnia do seu panteão. Caso seu personagem tenha duas Etnias ele poderá fazer o Novato Premium apenas de uma delas."
      },
      {
        number: 4,
        title: "Etnias Abarcadas",
        summary: "Greco-Romanos, Magos da Torre do Relógio, Vampiros e Lobisomens.",
        desc: "Esse novato Premium embarca as seguintes Etnias: Greco-Romanos, Magos da Torre do Relógio, Vampiros e Lobisomens."
      },
      {
        number: 5,
        title: "Liberdade de Escolha nas Missões",
        summary: "Não é necessário realizar todas as missões de cada ato.",
        desc: "Cada ato conta com inúmeras missões, o personagem não precisa realizar todas. Existirão missões as quais serão necessários alguma filiação ou afiliação no time para que possam ser realizadas; existirão missões com necessidade de ofício específico; algumas contarão com prêmios extras em time, e algumas apenas podem ser realizadas em time."
      },
      {
        number: 6,
        title: "Bloqueio de Missões Anteriores",
        summary: "Ao passar de ato, não é possível refazer o ato anterior.",
        desc: "Ao realizar a missão que faz a passagem de um ato para o próximo, o personagem não poderá realizar as missões do ato anterior."
      },
      {
        number: 7,
        title: "Relatórios de Ato e Penalidades",
        summary: "Até 300 palavras individual ou 500 palavras em grupo.",
        desc: "Ao fim de cada ato, o OFF deverá escrever um relatório, por personagem, de até 300 palavras para os narradores responsáveis. O relatório pode ser feito do grupo caso tenha feito em mais de um personagem, mas o limite passa a no máximo 500 palavras. Relatórios com número de palavras acima do limite irão acarretar em perda de fragmentos de aura (-2 fragmentos de aura por cada palavra que passar. Relatório em grupo, desconta do grupo todo!)."
      },
      {
        number: 8,
        title: "Premiações, Fragmentos de Aura e Loja",
        summary: "Teto de 10.000 Fragmentos de Aura; loja aberta com 3 OFFs no Ato III.",
        desc: "Cada missão de ato dará Golds e Contas Celestiais, ocasionalmente orações, além de fragmentos de Aura. A cada missão de passagem de Ato, o personagem ganhará XP, orações e algum prêmio exclusivo, além de fragmento de Aura. A cada ato os prêmios aumentam. O máximo de fragmentos de aura que um personagem pode acumular são 10 mil Fragmentos. Ao finalizar o ato 3, os personagens podem gastar seus fragmentos de Aura em premiações na loja (intransferíveis entre OFFs e personagens). A LOJA NÃO É DIVULGADA ATÉ PELO MENOS 3 OFFS CHEGAREM NO FIM DO ATO 3!!!"
      },
      {
        number: 9,
        title: "Narrações Oficiais",
        summary: "Conduzidas apenas por narradores oficiais do RPG.",
        desc: "Narrações: Ocasionalmente podem existir, darão prêmios mais altos e darão fragmentos de Aura que podem passar os 10 mil. Mas não darão prêmios adicionais como no sistema de regras prevê, porque já é um evento que traz muitos prêmios. Elas só poderão ser narradas por narradores oficiais do RPG. Pergunte ao Patrão os requisitos para se tornar narrador."
      },
      {
        number: 10,
        title: "Desistência do Programa",
        summary: "Pode gastar a Aura na loja aberta, mas não recupera o XP perdido.",
        desc: "Caso o personagem opte por desistir do Novato Premium®, ele poderá gastar os fragmentos de Aura que acumulou, desde que a loja esteja aberta. Porém não pode recuperar o XP que deixou de ganhar."
      }
    ],
    faq: [
      {
        q: "Preciso participar do Novato Premium?",
        a: "Não. O programa é 100% opcional, e a evolução tradicional continua plenamente disponível."
      },
      {
        q: "Vou subir de nível mais rápido no Novato Premium?",
        a: "Não. O foco do programa é uma experiência de desenvolvimento gradual (slow-burn), com forte ambientação à Égide de Avalon e recompensas exclusivas."
      },
      {
        q: "Preciso fazer todas as missões do Ato I?",
        a: "Não. Você precisa cumprir os requisitos de passagem: pelo menos 500 Fragmentos de Aura, 3 missões diferentes (estudos e treinos contam), Chamado do Herói, Entrevista Final e Prova Escrita."
      },
      {
        q: "Já estou no nível 10. Posso participar?",
        a: "Sim! Personagens que já estão no LVL 10 poderão realizar o programa, mas terão de ser considerados no nível correspondente a cada ato e esses turnos terão de ser feitos de forma atemporal no passado."
      },
      {
        q: "Quando a Loja do Novato Premium será divulgada?",
        a: "A loja não é divulgada até que pelo menos 3 OFFs cheguem ao fim do Ato 3. A moderação pode ocasionalmente soltar spoilers dos prêmios, mas sem divulgar os custos antecipadamente."
      }
    ]
  }
};



// Aliases para máxima compatibilidade
OPERATIONS_DATABASE.currentBanners = OPERATIONS_DATABASE.banners;
OPERATIONS_DATABASE.novatoAtoI = {
  missions: (OPERATIONS_DATABASE.novatoPremium && OPERATIONS_DATABASE.novatoPremium.act1Missions) ? OPERATIONS_DATABASE.novatoPremium.act1Missions : []
};

// Vinculação global segura no navegador
if (typeof window !== 'undefined') {
  window.OPERATIONS_DATABASE = OPERATIONS_DATABASE;
}
