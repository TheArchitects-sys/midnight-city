/**
 * MIDNIGHT CITY — ARQUIVOS CONFIDENCIAIS DA ÉGIDE (SISTEMA & DIRETRIZES)
 * Padrão Talamasca / Microfilme Âmbar dos Anos 80/90
 * Autoridade Editorial: Manual do Novato & Compêndio Canônico de Regras & Sistemas
 */

const TERMINAL_DATABASE = {
  version: "3.2.0-TALAMASCA",
  classification: "RESTRICTED // APENAS AGENTES AUTORIZADOS",
  jurisdiction: "A ÉGIDE DE AVALON • ARQUIVOS DE INVESTIGAÇÃO & INICIAÇÃO",
  lastRevision: "06/10/2026",

  // ── MODO RECRUTA: O GUIA PASSO A PASSO PARA NOVATOS (6 ETAPAS) ──
  novatoGuide: [
    {
      step: 1,
      tag: "ETAPA 01",
      shortLabel: "Função na equipe",
      title: "Entenda seu Papel na Ordem",
      badge: "FUNDAMENTAL",
      docId: "papeis-taticos",
      visualType: "tactical-squad",
      contextKey: "etapa-1",
      objective: "Compreenda a vocação tática do seu personagem (DPS, Tanker ou Suporte) para atuar de forma coordenada na equipe.",
      lead: "Em Midnight City, ninguém resolve nada sozinho. Seu personagem precisa ter uma função clara para a equipe funcionar.",
      bodyHtml: `
        <p>Ao ingressar na Égide de Avalon, seu personagem fará parte de esquadrões de campo. A primeira escolha crucial é entender sua vocação tática:</p>
        <div class="talamasca-grid-roles">
          <div class="role-box dps">
            <div class="role-header">
              <span class="role-icon-symbol">❖</span>
              <h4>DPS (Causadores de Dano)</h4>
            </div>
            <p>Os causadores de impacto. Especialistas em bater rápido e forte para eliminar monstros antes que eles reajam. Dois petelecos bem dados podem derrubá-los, mas se conseguirem bater, limpam a área.</p>
            <div class="role-examples"><em>Exemplos comuns:</em> Zeus, Hades, Poseidon, Ares, Hermes, Tânatos, Melinoe, Despina.</div>
          </div>
          <div class="role-box tank">
            <div class="role-header">
              <span class="role-icon-symbol">✦</span>
              <h4>TANKER (Linha de Frente & Proteção)</h4>
            </div>
            <p>O escudo vivo que impede que o DPS e o Suporte morram. Builds focadas em resistir a golpes brutais com HP alto, Armadura e Redução de Dano (RD). <em>"Meu peito é meu para-brisa."</em></p>
            <div class="role-examples"><em>Exemplos comuns:</em> Poseidon, Atena, Apolo, Hefesto, Hermes, Hécate, Magos Astrológicos.</div>
          </div>
          <div class="role-box support">
            <div class="role-header">
              <span class="role-icon-symbol">✦</span>
              <h4>SUPORTE (Cura, Buffs & Controle)</h4>
            </div>
            <p>O pilar estratégico do time. Curam ferimentos, multiplicam o ataque dos causadores de dano e desestabilizam inimigos reduzindo seus dados ou defesas.</p>
            <div class="role-examples"><em>Exemplos comuns:</em> Hera, Afrodite, Dionísio, Perséfone, Hipnos, Morfeu, Circe, Tique.</div>
          </div>
        </div>
        <div class="stencil-quote">
          <strong>A Regra de Ouro do Tio H:</strong> 
          <em>“O pato nada, anda e voa, mas faz os três mal. Não faça seu personagem ser um pato!”</em> Especialista é quem sobrevive.
        </div>
      `
    },
    {
      step: 2,
      tag: "ETAPA 02",
      shortLabel: "História do personagem",
      title: "Crie a História do seu Personagem",
      badge: "LORE & ROLEPLAY",
      docId: "primeira-inscricao-jogo",
      visualType: "origin-dossier",
      visualAsset: "assets/londres_panorama_mj.png",
      visualAlt: "Panorama de Londres Sob o Véu",
      contextKey: "etapa-2",
      objective: "Construa uma narrativa inicial como novato recém-chegado à Égide sem medo de errar a ambientação mística.",
      lead: "Você não precisa saber tudo sobre o mundo místico de antemão: seu personagem pode ser um novato absoluto.",
      bodyHtml: `
        <p>A melhor forma de começar sem medo de errar a ambientação é construir um personagem que acabou de ser descoberto pela Égide de Avalon:</p>
        <ul>
          <li><strong>O Resgatado:</strong> Seu personagem vivia uma vida normal em Londres quando foi atacado por criaturas sombrias e resgatado por agentes da Ordem.</li>
          <li><strong>O Desperto Recente:</strong> Ele acabou de manifestar seus poderes e foi conduzido à Cidadela de Avalon para aprender a controlar suas dádivas.</li>
          <li><strong>Primeiro Dia no Departamento:</strong> Combine no canal de <em>#interações-ingame</em> uma cena onde um agente mais velho explica a você como funcionam as demandas de seu ofício.</li>
        </ul>
        <div class="talamasca-callout">
          <strong>Dica dos Moderadores:</strong> Se você estiver com dúvidas sobre o passado ou a linhagem divina do seu personagem, pergunte no privado aos Mestres. Eles adoram ajudar a amarrar tramas de novatos!
        </div>
      `
    },
    {
      step: 3,
      tag: "ETAPA 03",
      shortLabel: "Primeira ficha",
      title: "Como Solicitar sua Primeira Ficha",
      badge: "MECÂNICA INICIAL",
      docId: "pedido-ficha-oficial",
      visualType: "official-requisition",
      contextKey: "etapa-3",
      objective: "Reúna os dados obrigatórios e requisite sua planilha oficial de atributos no tópico designado da Central.",
      lead: "Após fazer seu primeiro jogo na comunidade, é hora de oficializar seus atributos com a administração.",
      bodyHtml: `
        <p>A ficha geral de atributos é criada por um dos ADMs da Égide no tópico oficial da Central. Você só precisa fornecer os seguintes dados:</p>
        <div class="talamasca-code-terminal">
Nº DA FICHA GERAL: [Escolha um número livre na lista de fichas]
E-MAIL: [Seu e-mail para acesso às planilhas no Google Drive]
NOME DA FICHA GERAL: [Seu nome de jogador em off]
NOME DO PERSONAGEM: [Nome do personagem aceito na aprovação]
FILIAÇÃO: [Divindade paterna/materna ou Linhagem arcana]
OFÍCIO: [Seu emprego na Égide: Custódio, Vigilante, Arcanista, etc.]
IDADE & SHAPE: [Idade do personagem e duas fotos do faceclaim]
INDIVIDUALIDADES: [Escolha 3 poderes por nível disponível na lista]
DISTRIBUIÇÃO: [Onde você vai alocar seus pontos de atributos]
        </div>
        <div class="talamasca-tip-box">
          <strong>Distribuição Recomendada para Novatos:</strong>
          Coloque sempre <strong>30 HP</strong> e <strong>10 ATK</strong> (se for DPS) ou <strong>10 DEF</strong> (se for Tanker). Essa configuração garante sobrevivência nas primeiras semanas sem dispersar recursos.
        </div>
        <div class="stencil-quote warning-note">
          <strong>Atenção:</strong> É impresindível que você leia a sua lista de poderes para entender qual é o atributo principal ao qual ela escalona. Por exemplo, se bate com ATK, DEF ou HP. Se Tanka, ou se buffa baseado em seu ATK, HP, DEF e etc. Isso será fundamental para uma boa distribuição de atributos.
        </div>
        <div class="station-doc-reference">
          <p>Para a tabela integral de conversão por nível e detalhes dos atributos críticos, consulte o registro canônico:</p>
          <a href="?mode=arquivo&doc=conversao-atributos-build" class="station-direct-link">
            <span>Consultar Tabela Completa de Atributos & Conversão</span>
            <span>→</span>
          </a>
        </div>
      `
    },
    {
      step: 4,
      tag: "ETAPA 04",
      shortLabel: "Primeiras atividades",
      title: "O Primeiro Dia em Campo (Sem Risco de Morte)",
      badge: "SOBREVIVÊNCIA",
      docId: "guia-farm-estagios",
      visualType: "activity-trail",
      contextKey: "etapa-4",
      objective: "Evolua com segurança até o nível 5 através de turnos livres de roleplay e missões interpretativas sem combate letal.",
      lead: "Como ganhar XP rápido sem arriscar seu pescoço nas mãos dos monstros da metrópole.",
      bodyHtml: `
        <div class="talamasca-danger-warning">
          <strong>REGRA CAPITAL:</strong> NÃO INVENTE DE LUTAR SOLO ANTES DO NÍVEL 5! Se seu personagem morrer em um combate de farm, a morte é permanente.
        </div>
        <p>Fontes seguras de crescimento para agentes do Nível 1 ao Nível 4 (<em>isto é apenas um exemplo de progressão recomendada</em>):</p>
        <ol class="talamasca-ordered-list">
          <li><strong>Turnos Livres de Roleplay:</strong> Escreva cenas com amigos no servidor. A cada <strong>40 palavras escritas, você ganha 10 XP</strong>. Dá para atingir o Nível 3 apenas desenvolvendo boas histórias.</li>
          <li><strong>Carona em Sereias/Scyllas:</strong> Junte-se a um veterano experiente uma vez por semana. Ele derrota os monstros e você ganha <strong>1.200 XP, 1.000 Contas Celestiais e 25 Orações</strong>.</li>
          <li><strong>Missões Sazonais Verdes:</strong> Roteiros interpretativos em grupo, sem combates letais, que pagam ótimas quantias de XP e Contas.</li>
        </ol>
        <div class="talamasca-tip-box">
          <strong>Nota sobre Premiações:</strong> As melhores premiações do RPG não se encontram em endgames repetitivos, mas sim nas <strong>Missões e Campanhas Narrativas</strong>, pois são as verdadeiras fontes de itens personalizados onde você deixa seu personagem único e com a sua cara!
        </div>
      `
    },
    {
      step: 5,
      tag: "ETAPA 05",
      shortLabel: "Dados e combate",
      title: "Como Rolar Dados no Discord",
      badge: "RESOLUÇÃO DE AÇÕES",
      docId: "rolagem-e-tentativa",
      visualType: "dice-console",
      contextKey: "etapa-5",
      objective: "Aprenda a fórmula de tentativa no Discord (/roll 10d10 t5), contagem de sucessos e disputa com a defesa adversária.",
      lead: "Em Midnight City, toda ação de combate é uma tentativa resolvida por disputa de sucessos.",
      bodyHtml: `
        <p>Você nunca narra que seu personagem acertou o monstro. Você narra que ele <strong>tenta golpear</strong> — e deixa os dados decidirem o destino:</p>
        <div class="talamasca-steps-mini">
          <div class="step-mini">1. Entre no canal do Discord com o número da sua ficha.</div>
          <div class="step-mini">2. Identifique o personagem e a ação: <em>"Shen — Ataque com Lança"</em>.</div>
          <div class="step-mini">3. Digite o comando: <code>/roll 10d10 t5</code> (exemplo de 10 dados com dificuldade 5).</div>
          <div class="step-mini">4. Cada dado com valor igual ou superior à dificuldade conta como 1 sucesso.</div>
          <div class="step-mini">5. O atacante precisa de mais sucessos que o defensor para acertar. Em caso de empate, o golpe falha.</div>
        </div>

        <!-- Simulador Didático de Rolagem de Tentativa -->
        <div id="novato-dice-simulator-mount" class="novato-dice-simulator-mount"></div>
      `
    },
    {
      step: 6,
      tag: "ETAPA 06",
      shortLabel: "Moedas e recompensas",
      title: "Moedas & O Sistema de Banners",
      badge: "ECONOMIA & GACHA",
      docId: "moedas-e-economia",
      visualType: "currency-vault",
      contextKey: "etapa-6",
      objective: "Conheça o fluxo de Golds, Contas Celestiais e Orações para planejar seus tiros em Banners Sazonais.",
      lead: "Golds, Contas e Orações: como funciona o sistema de aquisição de equipamentos de elite.",
      bodyHtml: `
        <p>A economia é dividida em três pilares fundamentais:</p>
        <ul>
          <li><strong>Golds:</strong> Compram suprimentos na loja, pagam as taxas de criação aos artesãos e adquirem artefatos comuns.</li>
          <li><strong>Contas Celestiais:</strong> Moeda intermediária. Você pode trocar <strong>100 Contas por 1 Oração Celestial</strong>.</li>
          <li><strong>Orações Celestiais:</strong> O recurso mais precioso. Servem para atirar nos Banners Sazonais. A cada Oração gasta, você rola <strong>1d20</strong>. Se tirar <strong>20 natural</strong>, conquista a bênção ou arma exclusiva do banner!</li>
        </ul>
        <div class="talamasca-tip-box">
          <strong>Aproveite as Ofertas:</strong> Invista seus recursos quando houver banners com armas, bênçãos ou artefatos que interessem ao desenvolvimento do seu agente.
        </div>
      `
    }
  ],

  // ── DICAS CONTEXTUAIS DA PRESENÇA (REVISADAS E CANÔNICAS) ──
  presenceTips: [
    {
      quote: "Conte os sucessos primeiro.",
      note: "Em Midnight City, toda ação de combate é uma tentativa. Role os dados com a dificuldade definida e compare a soma de sucessos com a defesa do adversário.",
      docId: "rolagem-e-tentativa"
    },
    {
      quote: "Não faça seu personagem ser um pato!",
      note: "Especializar seu agente em uma função principal (DPS, Tanker ou Suporte) é o que garante a sobrevivência da equipe nas missões da Égide.",
      docId: "papeis-taticos"
    },
    {
      quote: "Perdeu algum campo da ficha?",
      note: "O formulário da Central exige número da ficha, e-mail, filiação, ofício, shape e poderes. A lista completa de campos está no diretório de Primeiros Passos.",
      docId: "pedido-ficha-oficial"
    },
    {
      quote: "Turnos livres rendem XP seguro.",
      note: "No nível 1, escrever cenas com amigos rende 10 XP a cada 40 palavras. É o método ideal para subir de nível sem perigo de morte prematura.",
      docId: "primeira-inscricao-jogo"
    },
    {
      quote: "Taxa Crítica e Dano Crítico são separados.",
      note: "A Taxa Crítica define se o golpe foi excepcional; o Dano Crítico determina o multiplicador aplicado após a confirmação do acerto.",
      docId: "critico-e-rd"
    },
    {
      quote: "As melhores premiações estão em missões e campanhas.",
      note: "Os itens personalizados mais fortes do RPG vêm de tramas e narrativas, onde você pode moldar o equipamento à personalidade do seu agente.",
      docId: "guia-farm-estagios"
    }
  ],

  get janitorSecrets() {
    return this.presenceTips;
  },

  // ── OS 9 DIRETÓRIOS CANÔNICOS (REGRA DE CONVIVÊNCIA É O PRIMEIRO TÓPICO!) ──
  categories: [
    {
      id: "convivencia-interpretacao",
      code: "SEÇÃO 01",
      name: "Convivência & Conduta",
      desc: "O código de conduta da Égide, regra da tentativa, respeito aos tópicos e diretrizes gerais.",
      svgIcon: "scales",
      sources: ["Regras & Sistemas (Site Antigo - Convivência)", "Manual do Novato p. 2"]
    },
    {
      id: "primeiros-passos",
      code: "SEÇÃO 02",
      name: "Começar e criar ficha",
      desc: "Papéis táticos de equipe, primeiras cenas, criação e pedido de ficha de novato.",
      svgIcon: "compass",
      sources: ["Manual do Novato pp. 2–9"]
    },
    {
      id: "personagem-progressao",
      code: "SEÇÃO 03",
      name: "Atributos & Bonificações",
      desc: "Nomenclaturas de combate, escudos, mana, bônus interpretativos, escalas de XP e conversão.",
      svgIcon: "chart",
      sources: ["Regras & Sistemas (Site Antigo - Atributos)", "Tabela Canônica de Evolução"]
    },
    {
      id: "combate-dados",
      code: "SEÇÃO 04",
      name: "Dados e combate",
      desc: "Rolagens de d10 no Discord, cálculo de dano clássico e composto, crítico, RD e SPD.",
      svgIcon: "daggers",
      sources: ["Regras & Sistemas (Site Antigo)", "Manual do Novato p. 7"]
    },
    {
      id: "economia-recompensas",
      code: "SEÇÃO 05",
      name: "Moedas e recompensas",
      desc: "Golds, Contas Celestiais, Orações, Banners e mecânicas do gacha sazonal.",
      svgIcon: "coins",
      sources: ["Manual do Novato pp. 13–16"]
    },
    {
      id: "atividades-rotina",
      code: "SEÇÃO 06",
      name: "Atividades e rotina",
      desc: "Guia de farm por estágio (exemplos), missões narrativas e políticas semanais.",
      svgIcon: "hourglass",
      sources: ["Manual do Novato pp. 18–21", "Tabela de Eventos"]
    },
    {
      id: "criacao-refinamento",
      code: "SEÇÃO 07",
      name: "Criação e manufatura",
      desc: "Forja, Encantamento, Boticário, Manipulação Genética (tabela completa) e regras de refino.",
      svgIcon: "anvil",
      sources: ["Regras & Sistemas (Site Antigo - Criação)"]
    },
    {
      id: "eventos-premios-mesticos",
      code: "SEÇÃO 08",
      name: "Eventos, Prêmios & Mestiços",
      desc: "Sistema de eventos, graus de premiações (IV a VI), herança de mestiços e regras genéticas.",
      svgIcon: "helix",
      sources: ["Regras & Sistemas (Eventos & Premiações)", "Doutrina Canônica de Mestiços"]
    },
    {
      id: "tabelas-termos",
      code: "SEÇÃO 09",
      name: "Custos, Limites & Glossário",
      desc: "Custos e limites para montar premiações no RPG, regras de refino e glossário de termos.",
      svgIcon: "index",
      sources: ["Compilação Integral das Fontes Oficiais"]
    }
  ],

  // ── ACERVO DOCUMENTAL COMPLETO (ORDEM SISTEMÁTICA E LINEAR) ──
  documents: [
    // ══════════════════════════════════════════════════════════
    // SEÇÃO 01: CONVIVÊNCIA & CONDUTA (PRIMEIRO TÓPICO DO SISTEMA!)
    // ══════════════════════════════════════════════════════════
    {
      id: "codigo-conduta-egide",
      categoryId: "convivencia-interpretacao",
      title: "Código de Convivência: As Regras Fundamentais",
      subtitle: "Normas de convivência, turnos de 600px, respeito aos jogos e regra da tentativa",
      aliases: ["regras", "conduta", "convivencia", "mandamentos", "600px", "respeito", "alerta 18", "regras de convivencia"],
      summary: "As 10 regras fundamentais de respeito, formatação de postagens e convivência em comunidade dentro do RPG.",
      source: "Regras & Sistemas (Site Antigo) — Convivência",
      contentHtml: `
        <div class="talamasca-callout warning">
          <strong>BEM-VINDO AO MIDNIGHT CITY:</strong>
          Antes de qualquer ficha, combate ou rolagem de dados, a convivência e o respeito mútuo são a pedra fundamental do nosso RPG. Leia atentamente as diretrizes abaixo:
        </div>

        <ol class="talamasca-ordered-list">
          <li><strong>Não invente o que você não tem:</strong> É terminantemente proibido presumir ou inventar a posse de itens, armas ou artefatos que não estejam devidamente aprovados e registrados na sua ficha de personagem. Armas e objetos são adquiridos através de compras, eventos ou tarefas rotineiras.</li>
          <li><strong>Sempre deixe no seu turno o valor dos seus atributos:</strong> É exaustivo abrir ficha por ficha em combates. Para facilitar o cálculo dos colegas e do narrador, informe sempre ATK, DEF e HP atuais no início ou término do turno.</li>
          <li><strong>Respeite o sistema de combate:</strong> Temos pontos de vida, mana e variantes de dados. Siga rigorosamente o sistema e utilize apenas os efeitos que suas magias, poderes ou objetos fornecem.</li>
          <li><strong>Tenha bom senso quanto a jogos alheios:</strong> Respeite tópicos ocupados por eventos ou cenas particulares entre jogadores (regra das 72 horas). Todo tópico possui réplicas para evitar transtornos.</li>
          <li><strong>Você não faz, você tenta:</strong> Como utilizamos sistema de dados, investidas físicas, mentais ou mágicas são sempre uma <em>"tentativa"</em>. Escreva sempre que vai <em>tentar bater, tentar defender, tentar persuadir</em>, etc. A resolução cabe aos dados.</li>
          <li><strong>Não existe PATENTE exclusiva:</strong> Em eventos pode-se solicitar qualquer tipo de recompensa, mas isso não impede que outros conquistem objetivos similares em eventos futuros. Tenha bom senso para não realizar plágios descarados.</li>
          <li><strong>Turnos com extensão mínima de 600px:</strong> Para preservar o padrão estético e a riqueza narrativa da comunidade.</li>
          <li><strong>Seja educado:</strong> Não toleramos brigas, ofensas ou desrespeito de qualquer natureza em espaços de convivência. Rivalidades pertencem exclusivamente à ficção e à trama dos personagens.</li>
          <li><strong>Cuidado com o Conteúdo Adulto (+18):</strong> Este é um RPG adulto, mas é obrigatório sinalizar no <strong>INÍCIO</strong> do turno qualquer conteúdo erótico ou violento com um aviso de <code>ALERTA +18</code>, evitando leituras indesejadas por terceiros.</li>
          <li><strong>Procure usar os títulos de cada personagem:</strong> Sempre que possível, refira-se a personagens consagrados pelos seus títulos. Eles representam esforço, reputação e conquistas históricas dentro da trama.</li>
        </ol>
      `
    },

    // ══════════════════════════════════════════════════════════
    // SEÇÃO 02: INICIAÇÃO & CRIAÇÃO DE FICHA
    // ══════════════════════════════════════════════════════════
    {
      id: "papeis-taticos",
      categoryId: "primeiros-passos",
      title: "Funções de Equipe: DPS, Tanker e Suporte",
      subtitle: "Como o RPG é estruturado para trabalho coletivo",
      aliases: ["classes", "papeis", "dps", "tanker", "suporte", "pato", "filiações", "macro classes"],
      summary: "Midnight City é propositalmente montado para ninguém resolver nada sozinho. Cada personagem desempenha uma ou duas das três funções primárias.",
      source: "Manual do Novato, p. 4",
      contentHtml: `
        <div class="talamasca-callout warning">
          <strong>DIRETRIZ FUNDAMENTAL DE COMBATE:</strong> O RPG é montado de forma proposital para que ninguém consiga resolver nada sozinho! Cada personagem irá sempre trabalhar dentro de um time.
        </div>

        <h3>As Três Funções Primárias</h3>
        <ul>
          <li><strong>DPS (Causadores de Dano):</strong> Geralmente frágeis contra ataques pesados, mas capazes de infligir danos devastadores. <em>"Bate primeiro e pergunta depois."</em></li>
          <li><strong>Tanker (Defensores de Linha de Frente):</strong> A barreira que impede que o DPS e o Suporte morram. Possuem atributos altos de HP, DEF e Redução de Dano (RD) para absorver impactos críticos. <em>"Meu peito é meu para-brisa."</em></li>
          <li><strong>Suporte (Amplificadores e Controladores):</strong> Curam tankers, concedem buffs de ataque ao DPS e aplicam debuffs, escudos ou alterações de dados nos inimigos. Sem eles, o time sucumbe.</li>
        </ul>

        <div class="stencil-quote">
          <strong>A Regra de Ouro do Tio H:</strong> 
          <p><em>“O pato nada, anda e voa, mas faz os três mal. Não faça seu personagem ser um pato!”</em> Foque a build do seu personagem para desempenhar com excelência sua função primária.</p>
        </div>

        <div class="talamasca-callout">
          <strong>ATENÇÃO (LISTAS RECOMENDADAS SÃO EXEMPLOS):</strong>
          As listas e filiações citadas na tabela abaixo são <strong>apenas exemplos ilustrativos de tendências comuns</strong> e <strong>não apenas aquelas citadas</strong>! Qualquer personagem de qualquer divindade pode atuar em papéis diversos de acordo com a sua distribuição de atributos e a escolha das suas individualidades.
        </div>

        <h3>Classificação das Linhagens por Função Tática (Exemplos Ilustrativos)</h3>
        <p>Abaixo a distribuição descrita no Manual do Novato para orientar a escolha do seu personagem:</p>
        <div class="table-microfilm-wrap">
          <table class="talamasca-table">
            <thead>
              <tr>
                <th>Função Tática</th>
                <th>Filiações & Escolas Místicas Sugeridas (Exemplos Ilustrativos)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>DPS</strong></td>
                <td><em>Exemplos:</em> Zeus, Hades, Poseidon, Hera, Deméter, Afrodite, Ares, Hermes, Melinoe, Oberon, Tânatos, Delírio, Despina; Magos Conjuradores.</td>
              </tr>
              <tr>
                <td><strong>TANKER</strong></td>
                <td><em>Exemplos:</em> Poseidon, Apolo, Atena, Hefesto, Hermes, Hécate, Delírio, Despina; Magos Astrológicos.</td>
              </tr>
              <tr>
                <td><strong>SUPORTE</strong></td>
                <td><em>Exemplos:</em> Zeus, Hades, Hera, Afrodite, Apolo, Ares, Dionísio, Perséfone, Hécate, Melinoe, Tânatos, Hipnos, Morfeu, Delírio, Circe, Despina, Eros, Psiquê, Tique; Magos de Evocação Espiritual, Biologia Espiritual.</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p class="talamasca-source-note">Nota: Uma filiação pode abranger mais de uma função dependendo dos poderes escolhidos. O ofício civil ou militar exercido na Égide não restringe sua função de combate.</p>
      `
    },
    {
      id: "primeira-inscricao-jogo",
      categoryId: "primeiros-passos",
      title: "Inscrição Inicial & Primeira Experiência de Jogo",
      subtitle: "Como iniciar sua jornada na Égide sem risco de morte precoce",
      aliases: ["inscricao", "primeiro jogo", "farm inicial", "xp novato", "cenas"],
      summary: "Orientações sobre criação do personagem novato, turnos livres de 10 XP a cada 40 palavras e atividades seguras até o nível 5.",
      source: "Manual do Novato, pp. 5, 7",
      contentHtml: `
        <h3>Dicas de Lore para o Primeiro Personagem</h3>
        <p>Para facilitar a sua adaptação, faça um personagem que acabou de chegar à <strong>Égide de Avalon</strong> e não conhece a fundo o mundo místico. Ele aprenderá a ambientação junto com você!</p>
        <p>Você pode começar narrando o primeiro dia de trabalho no departamento ou uma cena de resgate em que agentes da Égide salvaram seu personagem de um ataque de monstros.</p>

        <h3>Fontes Iniciais de XP & Economia de Novato</h3>
        <ul>
          <li><strong>Turnos Livres:</strong> Rendem <strong>10 XP a cada 40 palavras</strong> escritas. Excelente para quem gosta de desenvolver roleplay detalhado e subir os primeiros níveis sem perigo. Não rende gold.</li>
          <li><strong>Missões Fixas:</strong> Pagam pouco XP e Gold, mas servem para ambientação. Evite combates antes do nível 5.</li>
          <li><strong>Missões Sazonais (Variante Verde):</strong> Roteiros interpretativos em grupo, sem risco de morte, que permitem somar facilmente até 3.000 XP.</li>
        </ul>

        <div class="talamasca-callout danger">
          <strong>AVISO DE SOBREVIVÊNCIA:</strong> Não invente de lutar sozinho antes de atingir o Nível 5! Em caso de morte em combate de farm, a morte é permanente. Se quiser participar de batalhas, peça reforço a veteranos.
        </div>

        <h3>Sugestões de Primeiras Cenas</h3>
        <ol>
          <li><strong>Turno Livre no Departamento:</strong> Combine uma interação com um colega do mesmo ofício em que o agente experiente explica as tarefas da ordem.</li>
          <li><strong>Reconhecimento no Metrô:</strong> Uma missão de reconhecimento na estação abandonada que se complica e necessita de resgate veterano.</li>
          <li><strong>Reunião da Égide:</strong> Personagens se conhecendo nas dependências da base de Avalon.</li>
        </ol>
      `
    },
    {
      id: "pedido-ficha-oficial",
      categoryId: "primeiros-passos",
      title: "Protocolo do Pedido de Ficha Geral",
      subtitle: "Instruções formais para abertura de ficha de atributos na Central",
      aliases: ["ficha", "pedido de ficha", "atributos iniciais", "silver", "shape", "dados da ficha"],
      summary: "Formulário oficial para solicitar a primeira ficha após a primeira interação de jogo aceita.",
      source: "Manual do Novato, pp. 5, 9",
      contentHtml: `
        <div class="talamasca-callout">
          <strong>QUANDO PEDIR:</strong> Faça o primeiro jogo na comunidade e em seguida solicite a abertura da sua ficha no tópico designado da Central. A primeira ficha é gerada por um administrador.
        </div>

        <h3>Campos Obrigatórios do Pedido</h3>
        <div class="talamasca-code-terminal">
Nº da Ficha Geral: [Número livre da lista de fichas gerais]
E-mail: [Seu e-mail para acesso às fichas no dia a dia]
Nome da Ficha Geral: [Identificação do jogador por trás dos personagens]
Nome do Personagem: [Nome do personagem aceito na aprovação]
Filiação: [Parente direto celestial/divino]
Afiliação: [Celestial ou ordem que segue]
Ofício: [Emprego do mundo místico em que atua]
Idade: [Idade do personagem]
Shape: [Duas fotos do shape cortadas em formato padrão]
Individualidades Escolhidas: [Até 3 poderes por nível existente na lista]
Distribuição de Atributos: [Onde você alocará seus pontos disponíveis]
        </div>

        <div class="talamasca-tip-box">
          <strong>Recomendação Oficial para a 1ª Ficha:</strong>
          Coloque sempre <strong>30 HP</strong> e <strong>10 ATK</strong> (se DPS) ou <strong>10 DEF</strong> (se Tanker). Mantenha a coerência com a função primária do seu personagem.
        </div>

        <div class="stencil-quote warning-note">
          <strong>Atenção:</strong> É impresindível que você leia a sua lista de poderes para entender qual é o atributo principal ao qual ela escalona. Por exemplo, se bate com ATK, DEF ou HP. Se Tanka, ou se buffa baseado em seu ATK, HP, DEF e etc. Isso será fundamental para uma boa distribuição de atributos.
        </div>

        <p class="talamasca-source-note">Cada jogador inicia com direito a <strong>4 slots de personagem</strong> e recebe <strong>10 Orações Celestiais</strong> ao entrar no RPG + 10 a cada ficha inscrita.</p>
      `
    },

    // ══════════════════════════════════════════════════════════
    // SEÇÃO 03: ATRIBUTOS, BONIFICAÇÕES & PROGRESSÃO
    // ══════════════════════════════════════════════════════════
    {
      id: "atributos-e-bonificacoes",
      categoryId: "personagem-progressao",
      title: "Atributos & Bonificações: Elementos que Mudam sua Rolagem",
      subtitle: "Nomenclaturas oficiais: escudos, mana, defesa, regeneração e modificadores",
      aliases: ["atributos e bonificacoes", "bonificacoes", "escudos", "regeneracao", "nomenclaturas", "rolagens modificadas"],
      summary: "Explicação minuciosa das nomenclaturas do RPG: criação de escudos, reserva e regeneração de mana, mitigação de defesa e bônus em rolagens.",
      source: "Regras & Sistemas (Site Antigo) — Atributos & Bonificações",
      contentHtml: `
        <p>As bonificações e atributos são elementos vitais que alteram ativamente a rolagem, o resultado ou as consequências de suas ações. Em nosso RPG, cada poder, magia, item, bênção ou arma poderá aplicar essas bonificações, aprimorando capacidades ou impondo penalidades aos inimigos.</p>

        <h3>Nomenclaturas Fundamentais de Combate</h3>
        <div class="table-microfilm-wrap">
          <table class="talamasca-table">
            <thead>
              <tr>
                <th>Nomenclatura</th>
                <th>Definição Canônica</th>
                <th>Como Funciona na Prática</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>Escudo (Shield)</strong></td>
                <td>Barreira de absorção temporária de impacto físico ou mágico.</td>
                <td>O escudo recebe dano antes do HP do personagem sofrer redução. Enquanto o escudo estiver ativo, o dano recebido é abatido do valor do escudo até que ele quebre ou expire.</td>
              </tr>
              <tr>
                <td><strong>Mana (Energia Espiritual)</strong></td>
                <td>Reserva de energia mística para ativação de poderes divinos e magias.</td>
                <td>Toda técnica ativa consome uma quantidade específica de Mana. Quando a Mana zera, o personagem não consegue ativar poderes e entra em fadiga.</td>
              </tr>
              <tr>
                <td><strong>Defesa (DEF)</strong></td>
                <td>Resistência estrutural física e mágica do corpo.</td>
                <td>Atenua o dano recebido no combate clássico (ATK − DEF) e serve de base para poderes defensivos e cálculo de Redução de Dano (RD).</td>
              </tr>
              <tr>
                <td><strong>Regeneração de Mana</strong></td>
                <td>Recuperação periódica de pontos de energia por turno ou ação.</td>
                <td>Permite restaurar pontos de Mana gastos durante uma batalha prolongada através de itens, auras de suporte ou poderes passivos.</td>
              </tr>
              <tr>
                <td><strong>Regeneração de HP (Cura)</strong></td>
                <td>Restauração de vitalidade ao longo do combate.</td>
                <td>Habilidades de cura restauram HP perdido. Em Midnight City, a cura não ultrapassa o HP máximo original do personagem salvo por escudos adicionais.</td>
              </tr>
              <tr>
                <td><strong>Bônus de Dados (+Dados)</strong></td>
                <td>Acréscimo direto de dados d10 na rolagem de tentativa.</td>
                <td>Aumenta a probabilidade de acumular sucessos na disputa contra o alvo.</td>
              </tr>
              <tr>
                <td><strong>Redução de Dificuldade (-Dificuldade)</strong></td>
                <td>Diminui o alvo numérico (t) da rolagem no Discord.</td>
                <td>Permite que valores menores no d10 sejam computados como sucesso (ex: dif 5 para dif 4 torna os dados 4, 5, 6, 7, 8, 9 e 10 como sucessos).</td>
              </tr>
              <tr>
                <td><strong>Bônus de Dano Fixo</strong></td>
                <td>Valor numérico fixo adicionado ao final do dano real.</td>
                <td>Não depende de crítico: se o golpe acerta a disputa de dados, soma integralmente ao impacto.</td>
              </tr>
            </tbody>
          </table>
        </div>
      `
    },
    {
      id: "bonificacao-interpretativa",
      categoryId: "personagem-progressao",
      title: "Bonificação Interpretativa: Os Níveis de Controle",
      subtitle: "Justificativa e gradação de poderes: Brando, Moderado, Forte e Perfeito",
      aliases: ["bonificacao interpretativa", "brando", "moderado", "forte", "perfeito", "niveis interpretativos", "graus de poder"],
      summary: "Como o sistema justifica e equilibra o nível de controle narrativo que cada prêmio ou técnica concede ao jogador.",
      source: "Regras & Sistemas (Site Antigo) — Bonificação Interpretativa",
      contentHtml: `
        <p>Todo prêmio, artefato ou criação no RPG permite agregar poderes interpretativos. Eles definem com clareza o nível de controle que o item permite que o jogador tenha sobre a natureza da habilidade, tornando as cenas justas, verossímeis e sem apelações.</p>

        <div class="table-microfilm-wrap">
          <table class="talamasca-table">
            <thead>
              <tr>
                <th>Nível Interpretativo</th>
                <th>Sigla</th>
                <th>Escopo de Controle Permitido</th>
                <th>Exemplos Típicos em Jogo</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>Brando</strong></td>
                <td><strong>B</strong></td>
                <td>Pequenas manipulações sensoriais, efeitos estéticos, utilidades cotidianas ou resistências a fatores amenos.</td>
                <td>Acender faíscas, faro aguçado, visão no escuro, resistência a frio leve, alterar cor de objetos, iluminação suave.</td>
              </tr>
              <tr>
                <td><strong>Moderado</strong></td>
                <td><strong>M</strong></td>
                <td>Manipulações táticas concretas com impacto perceptível no ambiente ou em combates de média intensidade.</td>
                <td>Rajadas de vento capazes de derrubar oponentes, lâminas flamejantes, saltos sobre-humanos, encantos de ilusão parcial, venenos atordoantes.</td>
              </tr>
              <tr>
                <td><strong>Forte</strong></td>
                <td><strong>F</strong></td>
                <td>Poder devastador capaz de alterar o rumo de batalhas, grande alcance ou controle avançado de elementos.</td>
                <td>Tempestades localizadas, lanças de plasma/raio, carapaças blindadas quase impenetráveis, transmutação material temporária, telecinese pesada.</td>
              </tr>
              <tr class="talamasca-highlight-row">
                <td><strong>Perfeito</strong></td>
                <td><strong>P</strong></td>
                <td>O ápice da natureza do poder; trunfos absolutos de calibre mitológico ou alterações conceituais profundas.</td>
                <td>Rupturas dimensionais, manipulação de espaço-tempo local, ressurreição pontual de aliados, maldições milenares, poderes diretos de deuses maiores.</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div class="stencil-quote">
          <strong>Notação Oficial nos Prêmios:</strong>
          Ao final da descrição de um item, você encontrará os colchetes com os níveis interpretativos. Exemplo: <code>✩✩✩✩✩ [1P | 2F]</code> significa 1 Poder Perfeito e 2 Poderes Fortes agregados à peça.
        </div>
      `
    },
    {
      id: "evolucao-xp-niveis",
      categoryId: "personagem-progressao",
      title: "Escala de XP & Ascensão de Níveis (N1 a N10)",
      subtitle: "Marcos numéricos de XP e conversão pós-teto",
      aliases: ["xp", "niveis", "ascensao", "tabela de xp", "teto", "10000 xp"],
      summary: "Progressão de 0 a 10.000 XP. Ao atingir o nível 10, todo XP excedente é convertido em Gold na razão 10 para 1.",
      source: "Manual do Novato, p. 13-14",
      contentHtml: `
        <p>A ascensão de nível é o marco que destrava pontos adicionais de atributos e o teto de novos poderes. São 10 níveis oficiais:</p>

        <div class="table-microfilm-wrap">
          <table class="talamasca-table">
            <thead>
              <tr>
                <th>Nível</th>
                <th>XP Necessário para Ascender</th>
                <th>Pontos de Atributo Ganhos</th>
              </tr>
            </thead>
            <tbody>
              <tr><td>Nível 01</td><td>0 xp</td><td>1 ponto de atributo</td></tr>
              <tr><td>Nível 02</td><td>600 xp</td><td>1 ponto de atributo</td></tr>
              <tr><td>Nível 03</td><td>1.100 xp</td><td>2 pontos de atributo</td></tr>
              <tr><td>Nível 04</td><td>2.000 xp</td><td>2 pontos de atributo</td></tr>
              <tr><td>Nível 05</td><td>3.000 xp</td><td>2 pontos de atributo</td></tr>
              <tr><td>Nível 06</td><td>4.100 xp</td><td>2 pontos de atributo</td></tr>
              <tr><td>Nível 07</td><td>5.300 xp</td><td>2 pontos de atributo</td></tr>
              <tr><td>Nível 08</td><td>6.600 xp</td><td>2 pontos de atributo</td></tr>
              <tr><td>Nível 09</td><td>8.000 xp</td><td>2 pontos de atributo</td></tr>
              <tr class="talamasca-highlight-row"><td>Nível 10</td><td>10.000 xp</td><td><strong>4 pontos de atributo</strong></td></tr>
            </tbody>
          </table>
        </div>

        <div class="talamasca-callout">
          <strong>CONVERSÃO PÓS-NÍVEL 10:</strong>
          Ao alcançar 10.000 XP, o personagem atinge o teto de nível. A partir deste ponto, todo XP obtido em missões e farms é <strong>automaticamente convertido em Gold</strong> na proporção de <strong>10 XP = 1 Gold</strong> (exemplo: 1.000 XP vira 100 Golds).
        </div>
      `
    },
    {
      id: "atributos-base-canonica",
      categoryId: "personagem-progressao",
      title: "Tabela Canônica de Atributos Base por Nível",
      subtitle: "Valores estatísticos absolutos antes dos pontos distribuídos pelo jogador",
      aliases: ["atributos base", "tabela 3", "hp base", "atk base", "def base", "mana base", "tres grandes", "perpetuos"],
      summary: "Estatísticas fixas de HP, ATK, DEF, Mana, SPD e rolagens padrão por nível, com regras dos Três Grandes e Perpétuos.",
      source: "Compêndio de Regras (Site Antigo) & Manual do Novato",
      contentHtml: `
        <p>Valores inatos de cada personagem em cada nível, antes de computar os pontos adicionais de distribuição:</p>

        <div class="table-microfilm-wrap">
          <table class="talamasca-table">
            <thead>
              <tr>
                <th>Nível</th>
                <th>Rolagem Padrão</th>
                <th>HP</th>
                <th>ATK</th>
                <th>DEF</th>
                <th>Taxa Crit.</th>
                <th>Dano Crit.</th>
                <th>SPD</th>
                <th>MANA</th>
              </tr>
            </thead>
            <tbody>
              <tr><td>01</td><td>10 dados dif. 8</td><td>60</td><td>15</td><td>15</td><td>0%</td><td>50%</td><td>100</td><td>200</td></tr>
              <tr><td>02</td><td>10 dados dif. 7</td><td>110</td><td>20</td><td>20</td><td>0%</td><td>50%</td><td>100</td><td>250</td></tr>
              <tr><td>03</td><td>10 dados dif. 7</td><td>160</td><td>25</td><td>25</td><td>0%</td><td>50%</td><td>100</td><td>300</td></tr>
              <tr><td>04</td><td>10 dados dif. 6</td><td>200</td><td>35</td><td>35</td><td>0%</td><td>50%</td><td>100</td><td>350</td></tr>
              <tr><td>05</td><td>10 dados dif. 6</td><td>240</td><td>45</td><td>45</td><td>0%</td><td>50%</td><td>100</td><td>400</td></tr>
              <tr><td>06</td><td>10 dados dif. 5</td><td>280</td><td>60</td><td>60</td><td>0%</td><td>50%</td><td>100</td><td>450</td></tr>
              <tr><td>07</td><td>10 dados dif. 5</td><td>320</td><td>70</td><td>70</td><td>10%</td><td>60%</td><td>100</td><td>500</td></tr>
              <tr><td>08</td><td>10 dados dif. 4</td><td>380</td><td>80</td><td>80</td><td>10%</td><td>60%</td><td>110</td><td>550</td></tr>
              <tr><td>09</td><td>11 dados dif. 4</td><td>420</td><td>100</td><td>100</td><td>10%</td><td>60%</td><td>120</td><td>600</td></tr>
              <tr class="talamasca-highlight-row"><td>10</td><td>12 dados dif. 3</td><td>500</td><td>130</td><td>130</td><td>10%</td><td>70%</td><td>130</td><td>800</td></tr>
            </tbody>
          </table>
        </div>

        <h3>Doutrina de Linhagem Especial</h3>
        <ul>
          <li><strong>Filhos dos Três Grandes (Zeus, Poseidon, Hades):</strong> Recebem <strong>+30 HP</strong> e <strong>+10% de Taxa Crítica</strong> sobre os valores normais. Não altera o ganho por nível.</li>
          <li><strong>Filhos de Deuses Perpétuos:</strong> Recebem o bônus dos grandes mais <strong>+200 de Mana</strong> e <strong>+10 SPD</strong>.</li>
        </ul>
      `
    },
    {
      id: "conversao-atributos-build",
      categoryId: "personagem-progressao",
      title: "Custo & Conversão de Pontos de Atributo",
      subtitle: "Tabela oficial de conversão de pontos ganhos ao subir de nível",
      aliases: ["conversao", "distribuicao", "pontos de atributo", "hp atk def conversao", "regras de build"],
      summary: "Cada 1 ponto de atributo ganho por nível converte em valores específicos: 10 ATK, 10 DEF, 30 HP, 10% Crítico ou 3 SPD.",
      source: "Regras & Sistemas (Site Antigo) & Manual p. 4",
      contentHtml: `
        <div class="table-microfilm-wrap">
          <table class="talamasca-table">
            <thead>
              <tr>
                <th>Atributo Escolhido</th>
                <th>Custo em Pontos</th>
                <th>Valor de Conversão Efetivo</th>
              </tr>
            </thead>
            <tbody>
              <tr><td><strong>ATK</strong> (Ataque)</td><td>1 ponto</td><td>+10 ATK</td></tr>
              <tr><td><strong>DEF</strong> (Defesa)</td><td>1 ponto</td><td>+10 DEF</td></tr>
              <tr><td><strong>HP</strong> (Pontos de Vida)</td><td>1 ponto</td><td>+30 HP</td></tr>
              <tr><td><strong>Taxa Crítica</strong></td><td>1 ponto</td><td>+10% Taxa Crit.</td></tr>
              <tr><td><strong>Dano Crítico</strong></td><td>1 ponto</td><td>+10% Dano Crit.</td></tr>
              <tr><td><strong>SPD</strong> (Velocidade)</td><td>1 ponto</td><td>+3 SPD</td></tr>
            </tbody>
          </table>
        </div>

        <div class="talamasca-callout">
          <strong>REGRA DE SELEÇÃO DE PODERES:</strong> Todo personagem tem direito a <strong>3 individualidades por nível</strong> em sua lista divina ou mágica. Se uma habilidade tiver progressão (ex: Nível I, II e Final), é obrigatório adquirir o nível anterior antes do mais avançado.
        </div>
      `
    },

    // ══════════════════════════════════════════════════════════
    // SEÇÃO 04: BALÍSTICA OCULTA & COMBATE
    // ══════════════════════════════════════════════════════════
    {
      id: "rolagem-e-tentativa",
      categoryId: "combate-dados",
      title: "Resolução de Ações & Comando /roll no Discord",
      subtitle: "A mecânica de tentativa e contagem de sucessos",
      aliases: ["rolagem", "roll", "discord", "tentativa", "dificuldade", "sucessos"],
      summary: "Todo combate físico ou mágico é resolvido por disputa de sucessos no bot do Discord via /roll com contagem de sucessos.",
      source: "Regras & Sistemas (Site Antigo) - Acordeão III",
      contentHtml: `
        <h3>A Filosofia da Tentativa</h3>
        <p>Em Midnight City, nada é garantido antecipadamente. Ao narrar um ataque ou esquiva, nunca afirme o acerto absoluto: escreva sempre <strong>"meu personagem tenta atacar"</strong> ou <strong>"tenta se esquivar"</strong>. Os dados determinam a eficácia da ação.</p>

        <h3>Como rolar no Discord</h3>
        <ol>
          <li>Acesse o canal exclusivo de rolagem com o número da sua ficha na aba do servidor.</li>
          <li>Identifique o personagem e a ação (exemplo: <code>Shen — Ataque com Lança</code>).</li>
          <li>Digite o comando no formato: <code>/roll [quantidade]d10 t[dificuldade]</code> (exemplo: <code>/roll 10d10 t5</code> para 10 dados com alvo 5).</li>
          <li>O bot reporta a quantidade de sucessos obtidos. O atacante precisa de <strong>mais sucessos que o defensor</strong> para acertar a ação. Em caso de empate, a tentativa falha.</li>
        </ol>
      `
    },
    {
      id: "formulas-dano-combate",
      categoryId: "combate-dados",
      title: "Fórmulas de Dano: Clássico e Composto",
      subtitle: "Resolução matemática exata de dano físico e mágico",
      aliases: ["dano", "formula", "classico", "composto", "dano real", "rd", "formula de dano"],
      summary: "Combate Clássico (ATK - DEF) vs Combate com Poderes baseado na escala de atributos (ATK 100%, DEF 60%, HP 40%).",
      source: "Regras & Sistemas (Site Antigo) - Sistema de Combate",
      contentHtml: `
        <h3>1. Combate Clássico (Sem Poderes Ativos)</h3>
        <p>Ataques mundanos com punhos ou armas comuns sem gasto de energia:</p>
        <div class="talamasca-code-terminal">
Dano Sofrido = ATK do Atacante − DEF do Defensor
(Se o resultado for zero ou negativo, nenhum dano é causado).
        </div>

        <h3>2. Combate com Poderes (Dano Composto)</h3>
        <p>Quando uma habilidade ativa ou poder divino é desferido. Crítico e Bônus de Dano entram exclusivamente neste modo:</p>
        <ul>
          <li><strong>Base ATK (100% de escala):</strong><br>
            <code>Dano Real = (Nível + [ATK × 1.0]) × Crítico + Bônus de Dano</code>
          </li>
          <li><strong>Base DEF (60% de escala):</strong><br>
            <code>Dano Real = (Nível + [DEF × 0.6]) × Crítico + Bônus de Dano</code>
          </li>
          <li><strong>Base HP (40% de escala):</strong><br>
            <code>Dano Real = (Nível + [HP × 0.4]) × Crítico + Bônus de Dano</code>
          </li>
        </ul>

        <div class="talamasca-tip-box">
          <strong>O que é o Bônus de Dano?</strong>
          É um valor fixo concedido por armas ou bênçãos somado ao final do cálculo. <strong>Não depende de rolagem ou taxa crítica para ativar</strong>: se o golpe acerta, o bônus soma integralmente.
        </div>
      `
    },
    {
      id: "critico-e-rd",
      categoryId: "combate-dados",
      title: "Mecânicas de Crítico & Redução de Dano (RD)",
      subtitle: "Como funcionam o multiplicador crítico e os marcos de 250 a 850 DEF",
      aliases: ["critico", "rd", "reducao de dano", "taxa critica", "dano critico", "defesa"],
      summary: "Crítico parte de 0 dados dif 10. RD mitiga porcentagem fixa de dano antes da subtração de DEF, até o teto de 70%.",
      source: "Regras & Sistemas (Site Antigo) - Acordeão III",
      contentHtml: `
        <h3>Mecânica do Crítico (Exclusivo para Poderes)</h3>
        <p>A rolagem de crítico é um teste à parte que parte de <strong>0 dados com dificuldade 10</strong>:</p>
        <ul>
          <li><strong>Taxa Crítica:</strong> Cada 10% reduz em <strong>−1 a dificuldade</strong> da rolagem de crítico (mínimo de dif. 1).</li>
          <li><strong>Dano Crítico:</strong> Cada 10% adiciona <strong>+1 dado</strong> à rolagem de crítico.</li>
          <li><strong>Multiplicador Final:</strong> <code>(Sucessos de Crítico ÷ 10) + 1.0</code><br>
            (0 sucessos = ×1.0 • 5 sucessos = ×1.5 • 10 sucessos = ×2.0).
          </li>
        </ul>

        <h3>Redução de Dano (RD) por Marcos de DEF</h3>
        <p>A Redução de Dano é uma mitigação percentual que age <strong>antes</strong> da DEF do personagem sofrer o dano:</p>
        <div class="talamasca-code-terminal">
Ordem Canônica de Resolução:
Dano Recebido ➔ Aplica % de RD ➔ Subtrai DEF ➔ Perda de HP
        </div>

        <div class="table-microfilm-wrap">
          <table class="talamasca-table">
            <thead>
              <tr>
                <th>Marco de DEF</th>
                <th>Bônus de HP Concedido</th>
                <th>Redução de Dano (RD)</th>
              </tr>
            </thead>
            <tbody>
              <tr><td>250 DEF</td><td>+60 HP</td><td>10% RD</td></tr>
              <tr><td>350 DEF</td><td>+120 HP</td><td>20% RD</td></tr>
              <tr><td>450 DEF</td><td>+180 HP</td><td>30% RD</td></tr>
              <tr><td>550 DEF</td><td>+240 HP</td><td>40% RD</td></tr>
              <tr><td>650 DEF</td><td>+300 HP</td><td>50% RD</td></tr>
              <tr><td>750 DEF</td><td>+360 HP</td><td>60% RD</td></tr>
              <tr class="talamasca-highlight-row"><td>850 DEF</td><td>+420 HP</td><td><strong>70% RD (Limite Máximo do Jogo)</strong></td></tr>
            </tbody>
          </table>
        </div>
        <p class="talamasca-source-note">Atenção: Os marcos não são acumulativos. Ter 850 DEF confere 70% de RD no total, não a soma de todos os degraus anteriores.</p>
      `
    },
    {
      id: "spd-e-mana",
      categoryId: "combate-dados",
      title: "Velocidade (SPD) & Gerenciamento de Mana",
      subtitle: "Iniciativa de turnos, surtos de ação e registro obrigatório de energia",
      aliases: ["spd", "velocidade", "acoes", "surto", "mana", "consumo"],
      summary: "Todos têm 2 ações por turno. Marcos de 200 e 300 SPD concedem surtos de ação extra. Registro de Mana obrigatório a cada turno.",
      source: "Regras & Sistemas (Site Antigo) - SPD & Mana",
      contentHtml: `
        <h3>Marcos de Velocidade (SPD)</h3>
        <p>A iniciativa das ações em eventos e batalhas segue o valor de SPD:</p>
        <ul>
          <li><strong>100 SPD:</strong> Valor base de todos os personagens (concede <strong>2 ações normais por turno</strong>).</li>
          <li><strong>200 SPD:</strong> Concede <strong>+1 surto de ação extra</strong> por turno (3 ações no total).</li>
          <li><strong>300 SPD:</strong> Concede <strong>+2 surtos de ação extra</strong> por turno (4 ações no total).</li>
          <li><strong>Acima de 300 SPD:</strong> A cada +10 pontos de SPD além de 300, o personagem ganha <strong>+5 de ATK passivo</strong> permanente.</li>
        </ul>

        <h3>Gerenciamento e Registro de Mana</h3>
        <p>Todo poder ativo possui um custo de Mana específico. É obrigatório manter o registro no final ou início do seu post de turno:</p>
        <div class="talamasca-code-terminal">
Exemplo correto de turno:
STATUS: Mana: 100/100
[Ação narrada usando Raio Divino (-20 Mana)]
STATUS FINAL: Mana: 80/100 | Poderes Usados: Raio Divino (-20)
        </div>
        <p>Quando a Mana do personagem zera, ele é incapaz de acionar poderes mágicos ou divinos até descansar ou receber recargas.</p>
      `
    },

    // ══════════════════════════════════════════════════════════
    // SEÇÃO 05: ERÁRIO CELESTIAL & BANNERS
    // ══════════════════════════════════════════════════════════
    {
      id: "moedas-e-economia",
      categoryId: "economia-recompensas",
      title: "Economia do RPG: Golds, Contas & Orações",
      subtitle: "Guia completo sobre as três moedas de Midnight City e sua utilidade",
      aliases: ["golds", "contas", "oracoes", "moedas", "economia", "banco", "oracao celestial"],
      summary: "Golds para loja e refinos; Contas Celestiais como moeda de câmbio; Orações Celestiais para rolar no Banner Sazonal.",
      source: "Manual do Novato, pp. 13–14",
      contentHtml: `
        <h3>As Três Moedas da Égide</h3>
        <ul>
          <li><strong>Golds:</strong> A moeda comum e mais abundante. Utilizada para comprar itens na lojinha, pagar a taxa obrigatória de refinamento/criação de 50 Golds aos artesãos e comprar artefatos comuns. Pode ser convertida em Contas Celestiais.</li>
          <li><strong>Contas Celestiais:</strong> Moeda de câmbio intermediária. Permite trocar 100 Contas por 100 Golds ou <strong>100 Contas por 1 Oração Celestial</strong>. Em eventos promocionais raros, a taxa de troca pode cair para 50 Contas por 1 Oração.</li>
          <li><strong>Orações Celestiais:</strong> A moeda mais valiosa e cobiçada do RPG. Serve exclusivamente para atirar no <strong>Banner Sazonal Ativo</strong> e obter armas exclusivas, artefatos raros e bênçãos de classe.</li>
        </ul>
      `
    },
    {
      id: "banner-e-prioridades",
      categoryId: "economia-recompensas",
      title: "Banners Sazonais & Invocação Mítica",
      subtitle: "Probabilidades do gacha no d20 e mecânicas de aquisição",
      aliases: ["banner", "gacha", "d20", "tiros", "invocacao", "bencao assinatura"],
      summary: "Cada Oração Celestial gasta rola 1d20. Tirar 20 garante o prêmio da rodada (arma, artefato ou bênção exclusiva).",
      source: "Manual do Novato, pp. 13, 16",
      contentHtml: `
        <h3>Como funciona o Banner Sazonal</h3>
        <p>Os banners sazonais funcionam como um sorteio estilo gacha conduzido diretamente no servidor com a moderação:</p>
        <ul>
          <li>A cada <strong>1 Oração Celestial gasta</strong>, o jogador rola <strong>1d20</strong>.</li>
          <li>Toda vez que obtiver o resultado <strong>20 natural</strong>, conquista um prêmio especial (Bênção, Arma ou Artefato em destaque na rotação).</li>
          <li>Os banners costumam ficar ativos de <strong>15 a 30 dias</strong> no servidor, trazendo sempre rotações de itens míticos e temáticos para fortalecer diferentes arquétipos.</li>
        </ul>

        <div class="talamasca-tip-box">
          <strong>Aproveite as Rotações:</strong> Participe dos banners que oferecem equipamentos e bênçãos compatíveis com o conceito e o crescimento do seu personagem. Ficar apenas esperando passivamente atrasa a evolução da sua build.
        </div>
      `
    },

    // ══════════════════════════════════════════════════════════
    // SEÇÃO 06: OPERAÇÕES DE CAMPO & ROTINA
    // ══════════════════════════════════════════════════════════
    {
      id: "guia-farm-estagios",
      categoryId: "atividades-rotina",
      title: "Guia de Farm por Estágio de Personagem",
      subtitle: "Roteiro exemplificativo de atividades recomendadas do Nível 1 ao Nível 10",
      aliases: ["farm", "sereias", "scyllas", "abismo", "rotina", "estagios", "missoes narrativas"],
      summary: "Roteiro ilustrativo de progressão: carona em Sereias no N1 a N4; suporte em N5 a N9; autonomia e grandes campanhas no N10.",
      source: "Manual do Novato, pp. 18–19",
      contentHtml: `
        <div class="talamasca-callout">
          <strong>AVISO IMPORTANTE (ROTEIRO EXEMPLIFICATIVO):</strong>
          Este guia de farm é <strong>apenas um exemplo</strong> do que o personagem pode fazer ao longo de sua jornada, e não uma grade mandatória ou limitante.
        </div>

        <div class="talamasca-callout warning">
          <strong>AS VERDADEIRAS MELHORES PREMIAÇÕES:</strong>
          As melhores premiações do RPG <strong>NÃO estão em endgames puramente mecânicos</strong>, mas sim em <strong>Missões e Campanhas Narrativas</strong>! É nas missões oficiais da história onde narradores concedem <strong>itens personalizados exclusivos</strong> (armas ancestrais, bênçãos singulares e artefatos customizados), permitindo que cada jogador personalize cada vez mais seu personagem e deixe ele com a sua cara!
        </div>

        <h3>1. Estágio: Nível 1 ao Nível 4 (Foco em atingir 3.000 XP com Segurança)</h3>
        <ul>
          <li><strong>Sereias/Scyllas com Veterano (Carona):</strong> 1x por semana. Um único turno rende <strong>1.200 XP, 1.000 Contas Celestiais e 25 Orações</strong>. Peça ajuda a agentes experientes no canal de interações!</li>
          <li><strong>Variantes Vermelhas Interpretativas:</strong> Roteiros como Anarquia e Promessa do Grifo com rolagem interpretativa de 1d20. Rende até <strong>1.700 XP</strong> semanais sem risco físico.</li>
          <li><strong>Abismo Espiral (Novato):</strong> Primeira realização rende cerca de <strong>60 Orações</strong> e alto XP em sessão narrada.</li>
          <li><strong>Missões Sazonais Verdes:</strong> Quatro turnos interpretativos fecham os 3.000 XP com tranquilidade.</li>
        </ul>

        <h3>2. Estágio: Nível 5 ao Nível 9 (Transição para Combate)</h3>
        <ul>
          <li><strong>Sereias/Scyllas como Suporte:</strong> Agora você já contribui com buffs e proteção, tornando o combate dinâmico.</li>
          <li><strong>Eventos de Campanha (Empyrean, Fate):</strong> Primeiros atos são focados em interpretação e entregam recompensas de alto calibre.</li>
          <li><strong>Missões Fixas das Keres:</strong> Desafio seguro para farmar artefatos base com ataques em área.</li>
        </ul>

        <h3>3. Estágio: Nível 10 Forte (O Horizonte do Agente)</h3>
        <ul>
          <li><strong>Missões e Campanhas Principais:</strong> Onde se encontram as melhores premiações e itens personalizados do jogo!</li>
          <li><strong>Berçário Espiral (A Porca):</strong> Alto desafio tático para 4 jogadores em call ou turnos coordenados.</li>
          <li><strong>Mentoria de Novos Agentes:</strong> Auxiliar novatos da sua guilda e agilizar o desenvolvimento de laços comunitários.</li>
        </ul>
      `
    },
    {
      id: "regras-semanais-rotina",
      categoryId: "atividades-rotina",
      title: "Políticas de Boa Vizinhança & Limites Semanais",
      subtitle: "Regras de convivência em tópicos, atualização de fichas e prazos",
      aliases: ["rotina", "reset", "limite semanal", "baú", "atualizacao de ficha", "topicos"],
      summary: "Resets ocorrem de domingo para segunda. Atualização de ficha e baús deve ser feita logo após o término do farm.",
      source: "Manual do Novato, p. 21",
      contentHtml: `
        <h3>Diretrizes Gerais de Farm do Malandro</h3>
        <ul>
          <li><strong>Flexibilidade de Tópicos:</strong> Se o tópico principal (ex: SOHO) estiver ocupado, a cena de caça pode ser realizada em qualquer outro tópico com nome semelhante ou ambiente coerente (exemplo: água para Scyllas).</li>
          <li><strong>Atualização Imediata de Fichas:</strong> Atualize seus ganhos no tópico de fichas logo após concluir a missão. Não acumule pendências para não perder registros de itens.</li>
          <li><strong>Reset Semanal:</strong> Todos os limites de farm semanal resetam na virada de domingo para segunda-feira.</li>
          <li><strong>Junção de Linhas:</strong> Se uma missão exigir 3 turnos de 10 linhas, você pode publicar um turno único e coeso de 30 linhas com o mesmo valor de validação.</li>
        </ul>
      `
    },

    // ══════════════════════════════════════════════════════════
    // SEÇÃO 07: OFICINAS ARCANAS & MANUFATURA
    // ══════════════════════════════════════════════════════════
    {
      id: "sistema-criacao-artesaos",
      categoryId: "criacao-refinamento",
      title: "Sistema de Criação: Forja, Encantamento, Boticário & Genética",
      subtitle: "Regras completas de fabricação artesanal para agentes especializados",
      aliases: ["forja", "encantamento", "boticario", "genetica", "refino", "criacao", "artesaos", "shabits", "50 golds", "manipuladores geneticos"],
      summary: "Diretrizes de criação para Forjadores, Encantadores, Boticários e Manipuladores Genéticos (com tabela de incrementos). Taxa de 50 Golds.",
      source: "Regras & Sistemas (Site Antigo) — Sistema de Criação",
      contentHtml: `
        <div class="talamasca-callout danger">
          <strong>TAXA OBRIGATÓRIA DE 50 GOLDS:</strong>
          Qualquer serviço de refino ou fabricação deve cobrar <strong>50 Golds por trabalho realizado</strong>, independente do nível do artesão. A prestação de serviços gratuitos é proibida e sujeita a sanções no RPG.
        </div>

        <h3>1. Forjadores (Hefesto, Atena, Saus)</h3>
        <p>Criam armas mecânicas, armaduras pesadas, autômatos e <strong>Shabits</strong> (bonecos de argila egípcios com ativação vocal):</p>
        <ul>
          <li><strong>Iniciante (N3-4):</strong> 1 Brando interpretativo • 1 atributo de bônus.</li>
          <li><strong>Intermediário (N5-6):</strong> 2 Brandos • 2 atributos • Autômato nível 4.</li>
          <li><strong>Mestre (N7-9):</strong> 1 Moderado + 1 Brando • 3 atributos • Autômato nível 8.</li>
          <li><strong>Supremo (N10+):</strong> 1 Forte • 4 atributos • Autômato nível 10.</li>
        </ul>

        <h3>2. Encantadores (Hécate, Circe, Utgardlok, Loki, Gullveig, Saus)</h3>
        <p>Imbuem magia do próprio grimório em objetos e podem refinar bênçãos do Banner Sazonal:</p>
        <ul>
          <li><strong>Iniciante (N3-4):</strong> 1 Brando • 1 atributo.</li>
          <li><strong>Intermediário (N5-6):</strong> 1 Moderado • 2 atributos.</li>
          <li><strong>Mestre (N7-9):</strong> 2 Moderados + 1 Brando • 3 atributos.</li>
          <li><strong>Supremo (N10+):</strong> 1 Forte + 1 Moderado • 4 atributos.</li>
        </ul>

        <h3>3. Boticários (Deméter, Perséfone, Asclépio, Circe, Sunus)</h3>
        <p>Elaboram poções, tônicos e venenos. <strong>Todas as poções são de USO ÚNICO</strong> e devem ser excluídas da ficha após o consumo:</p>
        <ul>
          <li><strong>Iniciante (N3-4):</strong> Cicatrização simples • 1 Brando • 2 atributos.</li>
          <li><strong>Intermediário (N5-6):</strong> Remédios e venenos • 1 Moderado • 3 atributos.</li>
          <li><strong>Mestre (N7-9):</strong> Melhorias físicas e óleos de armas • 1 Forte • 4 atributos.</li>
          <li><strong>Supremo (N10+):</strong> Soluções biológicas avançadas • 1 Perfeito • 5 atributos.</li>
        </ul>

        <h3>4. Manipuladores Genéticos (Asclépio, Sunu)</h3>
        <p>Promovem mutações biológicas em pets e criaturas de companhia para conceder rolagem de dados OU atributos de combate, além de poderes interpretativos. Podem refinar pets de banner cobrando a taxa obrigatória de 50 Golds.</p>

        <div class="table-microfilm-wrap">
          <table class="talamasca-table">
            <thead>
              <tr>
                <th>Grau do Manipulador</th>
                <th>Nível Mínimo</th>
                <th>O que é Permitido Incrementar (Rolagem OU Atributos)</th>
                <th>Poder Interpretativo Permitido</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>Iniciante</strong></td>
                <td>Nível 3–4</td>
                <td>Rolagem de dados simples (10 dados dif. 8) <em>OU</em> <strong>+1 Atributo</strong></td>
                <td>1 Brando (ex: faro apurado, visão noturna, escamas leves)</td>
              </tr>
              <tr>
                <td><strong>Intermediário</strong></td>
                <td>Nível 5–6</td>
                <td>Rolagem de dados intermediária (10 dados dif. 7) <em>OU</em> <strong>+2 Atributos</strong></td>
                <td>1 Moderado (ex: garras reforçadas, asas para planar, veneno brando)</td>
              </tr>
              <tr>
                <td><strong>Mestre</strong></td>
                <td>Nível 7–9</td>
                <td>Rolagem de dados de combate (10 dados dif. 6) <em>OU</em> <strong>+3 Atributos</strong></td>
                <td>1 Forte (ex: sopro elemental, carapaça de blindagem, regeneração)</td>
              </tr>
              <tr class="talamasca-highlight-row">
                <td><strong>Supremo</strong></td>
                <td>Nível 10+</td>
                <td>Rolagem de dados avançada (10 dados dif. 5) <em>OU</em> <strong>+4 Atributos</strong></td>
                <td>1 Perfeito (ex: mutação quimérica completa, fusão de linhagem pura)</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div class="talamasca-callout warning">
          <strong>REGRA CAPITAL DO MANIPULADOR:</strong> A mutação deve escolher obrigatoriamente entre conceder <strong>rolagem com poderes</strong> OU atribuir <strong>bonificação e poderes</strong> — jamais as duas coisas simultaneamente! É necessário obter amostras genéticas da criatura-alvo.
        </div>
      `
    },

    // ══════════════════════════════════════════════════════════
    // SEÇÃO 08: EVENTOS, PREMIAÇÕES & MESTIÇOS
    // ══════════════════════════════════════════════════════════
    {
      id: "sistema-eventos-e-premiacoes",
      categoryId: "eventos-premios-mesticos",
      title: "Sistema de Eventos & Tipos de Premiação",
      subtitle: "Diretrizes para elaboração, periculosidade (Verde, Amarelo, Vermelho) e tipos de prêmios",
      aliases: ["eventos", "tipos de premiacao", "verde amarelo vermelho", "armas", "artefatos", "pets", "bencaos", "narradores"],
      summary: "Regras que regem como mestres e jogadores elaboram eventos no RPG, níveis de periculosidade e categorias oficiais de prêmios.",
      source: "Regras & Sistemas (Site Antigo) — Sistema de Eventos",
      contentHtml: `
        <p>Os eventos podem ser desenvolvidos pela Administração, Deuses e Instrutores. Eles podem fazer narrações a qualquer momento desde que não existam mais de <strong>2 narrações acontecendo ao mesmo tempo</strong>, tornando esse o número limite simultâneo.</p>
        <p>Outros eventos como <strong>Desafios, Mini-missões e Missões</strong> devem ser solicitados na Central para serem desenvolvidos, tendo em vista que possuem fila de agendamento.</p>

        <h3>Níveis de Perigo & Variação de Risco</h3>
        <p>O narrador deve sempre sinalizar a periculosidade do evento através do código de cores:</p>
        <ul>
          <li><strong>Verde (Pouco Perigo):</strong> Roteiros focados em investigação e interpretação, sem risco iminente de morte.</li>
          <li><strong>Amarelo (Perigo Considerável):</strong> Encontros com criaturas hostis e armadilhas que exigem coordenação e estratégia.</li>
          <li><strong>Vermelho (Altamente Perigoso):</strong> Confrontos severos com risco real de ferimentos graves ou baixa de personagens.</li>
        </ul>
        <div class="talamasca-tip-box">
          <strong>Escalação de Risco:</strong> Eventos que se tornam mais perigosos no decorrer da trama aumentam proporcionalmente a premiação final dos participantes!
        </div>

        <h3>Os 5 Tipos Oficiais de Premiação</h3>
        <div class="table-microfilm-wrap">
          <table class="talamasca-table">
            <thead>
              <tr>
                <th>Tipo de Prêmio</th>
                <th>Definição Canônica</th>
                <th>Particularidades & Regras</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>Artefatos</strong></td>
                <td>Itens, amuletos ou objetos místicos utilitários.</td>
                <td>Não são armas de combate direto, mas oferecem utilidade e poder interpretativo versátil ao usuário.</td>
              </tr>
              <tr>
                <td><strong>Armas</strong></td>
                <td>Objetos físicos ou arcanos destinados ao combate direto.</td>
                <td>Espadas, armaduras, lanças, arcos, manoplas. Personagens com poder de ambidestria podem portar até 2 armas em mãos distintas.</td>
              </tr>
              <tr>
                <td><strong>Pet Suporte</strong></td>
                <td>Criatura mágica ou espírito de auxílio.</td>
                <td>Não possui atributos de ataque. Concede buffs aos aliados ou debuffs aos oponentes. Consome a cota de controle de criaturas (máximo de 3 entre pets, clones e invocações).</td>
              </tr>
              <tr>
                <td><strong>Pet de Combate</strong></td>
                <td>Criatura fantástica especializada em batalha.</td>
                <td>Possui ficha própria e combate diretamente no lugar do jogador, sendo a base tática de classes como Delírio.</td>
              </tr>
              <tr>
                <td><strong>Bênçãos</strong></td>
                <td>Dádivas sagradas concedidas diretamente pelo narrador.</td>
                <td>Poderes singulares que expandem o repertório da ficha ou amplificam drasticamente habilidades que o personagem já possui.</td>
              </tr>
            </tbody>
          </table>
        </div>
      `
    },
    {
      id: "classificacao-premiacoes",
      categoryId: "eventos-premios-mesticos",
      title: "Classificação das Premiações: Graus IV, V e VI",
      subtitle: "Escala em estrelas, atributos determinantes e regras de refino",
      aliases: ["estrelas", "premios", "4 estrelas", "5 estrelas", "6 estrelas", "grau iv", "grau v", "grau vi", "atributos especiais"],
      summary: "Diretrizes sobre artefatos de 4 Estrelas, 5 Estrelas e 6 Estrelas (únicos e imutáveis), com atributos e interpretativos.",
      source: "Regras & Sistemas (Site Antigo) — Classificação das Premiações",
      contentHtml: `
        <p>Para tornar a evolução transparente, todo prêmio é acompanhado de uma classificação em estrelas que determina seu potencial e se ele pode ser aprimorado em eventos futuros:</p>

        <h3>✩✩✩✩ (4 Estrelas) — Potencial Muito Forte</h3>
        <p>Agregam grandes mudanças e elevam o nível do agente com alta quantidade de bônus:</p>
        <ul>
          <li><strong>Bênçãos:</strong> 6 atributos determinantes (com 1 Forte e 1 Mediano interpretativo).</li>
          <li><strong>Armas:</strong> 4 atributos determinantes (com 2 Medianos interpretativos).</li>
          <li><strong>Pet Suporte:</strong> Sem atributos de ataque; DEF e HP equivalentes a 25% de um personagem N5; buff/debuff de 4 atributos com 1 Forte interpretativo.</li>
          <li><strong>Pet de Combate:</strong> Atributos base de um personagem N5 (com pontos de ascensão); 4 atributos e até 2 Medianos interpretativos.</li>
        </ul>

        <h3>✩✩✩✩✩ (5 Estrelas) — Potencial no Mínimo Perfeito</h3>
        <p>O ápice da natureza do poder, com trunfos singulares e bônus excepcionais:</p>
        <ul>
          <li><strong>Bênçãos (Verde/Amarelo):</strong> 10 atributos + 2 atributos especiais, com 2 Fortes interpretativos.</li>
          <li><strong>Bênçãos (Vermelho):</strong> 12 atributos + 3 atributos especiais, com 2 Perfeitos interpretativos. <em>(Em campanha principal: +2 atributos, +1 a +3 especiais e +1 perfeito extra).</em></li>
          <li><strong>Armas (Verde/Amarelo):</strong> 8 atributos determinantes, com 2 Fortes interpretativos.</li>
          <li><strong>Armas (Vermelho):</strong> 10 atributos + 2 atributos especiais, com 1 Perfeito e 1 Forte interpretativo.</li>
          <li><strong>Pet Suporte:</strong> DEF e HP (25% do N5); Verde/Amarelo: 6 atributos com 2 Fortes; Vermelho: 8 atributos + 1 especial, com 1 Perfeito e 1 Forte.</li>
          <li><strong>Pet de Combate:</strong> Base de Nível 7; Verde/Amarelo: 6 atributos com 2 Fortes; Vermelho: 6 atributos + 1 especial, com 1 Perfeito e 1 Forte.</li>
        </ul>

        <h3>✩✩✩✩✩✩ (6 Estrelas) — Peças Raras e Únicas</h3>
        <p>Prêmios raríssimos obtidos apenas em grandes eventos especiais. Possuem poder singular que foge aos padrões sob condições e limites cabíveis.</p>
        <div class="talamasca-danger-warning">
          <strong>REGRA DE OURO DAS 6 ESTRELAS:</strong> São prêmios que <strong>NÃO podem ser upados, refinados ou melhorados</strong> de maneira nenhuma por artesãos!
        </div>

        <div class="talamasca-callout">
          <strong>Regras de Aprimoramento de Prêmios Já Existentes:</strong>
          <ul>
            <li>Caso um prêmio já obtido seja buffado em evento, ele receberá a <strong>metade dos atributos</strong> da premiação (ex: se o evento concede 12 atributos, o buff do seu item antigo será de até 6 atributos). Isso não reduz os valores interpretativos concedidos.</li>
            <li>Caso um item de 4 ou 5 estrelas atinja acúmulo excessivo de atributos, ele poderá ser consagrado como <strong>6 estrelas</strong>, não podendo mais receber atributos adicionais, mas ainda aceitando ajustes interpretativos.</li>
          </ul>
        </div>
      `
    },
    {
      id: "doutrina-mesticos",
      categoryId: "eventos-premios-mesticos",
      title: "Doutrina Canônica de Mestiços & Herança",
      subtitle: "União entre etnias, gestação, maturação e acesso integral ao grimório",
      aliases: ["mesticos", "filhos", "gestacao", "envelhecimento", "circe", "homoafetivo", "grimorio", "heranca genetica"],
      summary: "Regras canônicas completas para união entre etnias, casais homoafetivos, gestação, feitiço da casa de bonecas e acesso a todo o grimório.",
      source: "Compêndio Canônico — Mestiços (https://sites.google.com/view/neotheon/mestiços)",
      contentHtml: `
        <p>É comum que os personagens se relacionem e formem casais entre si. Apesar de que são poucos que chegam à fase adulta, alguns inclusive geram herdeiros. Estes possuem ligação com as divindades das quais descendem proporcionalmente, sendo que em maior parte suas habilidades podem ser herdadas dos seus pais.</p>
        <p>Para o nascimento de um Mestiço, é preciso que o casal poste dentro do acampamento se envolvendo, não sendo necessárias turnagens de sexo. A/O gestante deve postar dentro do RPG durante o período de gravidez e é necessário que seja feito post da mesma na hora do parto. Caso contrário, não será possível a validação do personagem.</p>

        <h3>Gestação</h3>
        <p>Cada três meses online equivale a um mês off. O tempo de gestação dos mestiços é de dez meses on, que equivale a <strong>3 meses e uma semana OFF</strong>, contados a partir da relação dos dois personagens. Quando a prole nascer, ela irá crescer e somente quando possuir cinco anos se tornará um personagem jogável.</p>

        <h3>Envelhecimento e Maturação Acelerada</h3>
        <p>Para jogadores mais ansiosos, existem formas de realizar a gestação e o envelhecimento das crianças de maneira mais rápida e produtiva:</p>
        <ul>
          <li><strong>Feitiço da Casa de Bonecas (Circe):</strong> Em Londres, em uma de suas lojas pagãs, com o objetivo de executar o <em>feitiço da casa de bonecas</em>. Um feitiço muito poderoso que transporta o casal e seus filhos para dentro de uma dimensão alternativa alimentada por magia. Nele são reproduzidos os dias que viveriam no mundo real em um único dia, permitindo criar e educar os filhos até atingirem a maioridade sem envelhecer os pais, a custo de uma bênção ou item precioso.</li>
          <li><strong>Templo de Deusa do Matrimônio/Maternidade:</strong> A divindade pode beneficiá-los com a transição do tempo em um limbo sagrado onde a saúde, felicidade e segurança da família sejam preservadas sem envelhecer os progenitores.</li>
        </ul>

        <h3>Todos os Casais Podem Ter Filhos</h3>
        <p>Todos os casais podem possuir filhos, inclusive os homoafetivos. Na colina dos templos, deuses do matrimônio, da fertilidade e do amor costumam acolher preces e conceder essa bênção mágica através de frutos, luzes ou dádivas místicas. De modo similar a Atena ou Apolo, que concebem por vias divinas, um dos integrantes do casal passa a carregar o herdeiro com material genético de ambos, sustentado pelos poderes dos deuses.</p>

        <h3>União Entre Etnias & Linhagens</h3>
        <ul>
          <li><strong>Deus e Deus:</strong> Gera um semideus mestiço. Escolhe 2 individualidades de cada pai por nível. Energia de semideus. <em>(Não se aplica a deuses egípcios).</em></li>
          <li><strong>Deus e Semideus:</strong> Escolhe 1 individualidade por nível do avô/avó e 3 individualidades do pai ou mãe divino. Energia de semideus.</li>
          <li><strong>Deus e Semideus Bruxo/Feiticeiro:</strong> Escolhe 1 individualidade por nível do avô/avó, 3 individualidades do pai/mãe divino e <strong>vai ter acesso a todo o grimório!</strong></li>
          <li><strong>Deus e Mestiço:</strong> Possui ligação apenas com a divindade e age como um semideus normal, não herdando habilidades do bisavô.</li>
          <li><strong>Deus e Mago:</strong> O mestiço fruto desta união será um mago semideus. Terá 3 individualidades por nível do parente divino e 2 magias do shesh egípcio comum. Pode acessar 2 individualidades de caminho divino.</li>
          <li><strong>Semideus e Semideus:</strong> O fruto mais comum. Tem direito a 2 individualidades de um dos avós e 1 do outro, podendo intercalar nos níveis.</li>
          <li><strong>Semideus e Semideus Bruxo/Feiticeiro:</strong> Tem direito a 2 individualidades do avô sem vínculo com magia e <strong>vai ter acesso a todo o grimório!</strong></li>
          <li><strong>Semideus e Mestiço:</strong> Tem direito a 1 individualidade de um dos bisavós e 2 individualidades do avô (no nível 7 terá 2 individualidades).</li>
          <li><strong>Semideus (B/F) e Mago:</strong> Mago semideus com 1 individualidade divina, magias do shesh egípcio e <strong>vai ter acesso a todo o grimório!</strong></li>
          <li><strong>Semideus Bruxo/Feiticeiro e Mestiço:</strong> Terá direito a 1 individualidade de um dos bisavós, 1 individualidade do avô e <strong>vai ter acesso a todo o grimório!</strong></li>
          <li><strong>Semideus Bruxo/Feiticeiro e Semideus Bruxo/Feiticeiro:</strong> Terá direito a 1 individualidade de cada avô e <strong>vai ter acesso a todo o grimório!</strong></li>
          <li><strong>Mestiço e Mestiço:</strong> Filhos escolhem 1 individualidade de dois ancestrais divinos (e até o nível 7, apenas 1 individualidade independente).</li>
          <li><strong>Mestiço e Mago:</strong> Considerados magos, com energia de semideus.</li>
          <li><strong>Mago e Mago:</strong> Mago comum que segue o caminho de uma divindade de escolha.</li>
        </ul>

        <h3>Herança Genética</h3>
        <p>Quando um personagem recebe uma bênção/maldição peculiar, esta inevitavelmente irá alterar seu código genético. Há uma chance remota dessas peculiaridades acabarem passando de progenitor para filho. Poderão ser escolhidas uma bênção interpretativa sem valor combativo.</p>
      `
    },

    // ══════════════════════════════════════════════════════════
    // SEÇÃO 09: CUSTOS, LIMITES & GLOSSÁRIO
    // ══════════════════════════════════════════════════════════
    {
      id: "custos-e-limites",
      categoryId: "tabelas-termos",
      title: "Custos & Limites de Premiações no Sistema",
      subtitle: "Tabela oficial de valores determinantes para elaboração de prêmios",
      aliases: ["custos", "limites", "montar premiacao", "regras de evento", "regras de mestre", "tabela de custos"],
      summary: "Como o jogador e narrador devem calcular e dosar cada modalidade de bônus ao montar premiações de acordo com as regras.",
      source: "Regras & Sistemas (Site Antigo) — Custos & Limites",
      contentHtml: `
        <p>Abaixo segue a tabela oficial com o valor e peso de cada modalidade de bônus determinante existente no RPG, para que mestres e jogadores tenham ciência de como montar suas premiações respeitando o equilíbrio e os limites do sistema:</p>

        <div class="table-microfilm-wrap">
          <table class="talamasca-table">
            <thead>
              <tr>
                <th>Modalidade do Bônus</th>
                <th>Custo em Pontos de Atributo</th>
                <th>Limite Máximo Recomendado</th>
                <th>Regras & Aplicação</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>Ataque (ATK)</strong></td>
                <td>1 Atributo = +10 ATK</td>
                <td>Conforme o grau da arma</td>
                <td>Soma ao dano clássico e ao multiplicador de habilidades com escala de ataque.</td>
              </tr>
              <tr>
                <td><strong>Defesa (DEF)</strong></td>
                <td>1 Atributo = +10 DEF</td>
                <td>Conforme o grau do item</td>
                <td>Mitiga dano e contribui para o alcance dos marcos percentuais de Redução de Dano.</td>
              </tr>
              <tr>
                <td><strong>Pontos de Vida (HP)</strong></td>
                <td>1 Atributo = +30 HP</td>
                <td>Conforme o grau do item</td>
                <td>Aumenta a reserva vital total do personagem.</td>
              </tr>
              <tr>
                <td><strong>Taxa Crítica</strong></td>
                <td>1 Atributo = +10% Taxa Crit.</td>
                <td>Máximo de 100% (Dif. 1)</td>
                <td>Cada 10% reduz em −1 a dificuldade da rolagem de crítico de poderes.</td>
              </tr>
              <tr>
                <td><strong>Dano Crítico</strong></td>
                <td>1 Atributo = +10% Dano Crit.</td>
                <td>Sem teto numérico</td>
                <td>Cada 10% soma +1 dado na rolagem de crítico de poderes ativos.</td>
              </tr>
              <tr>
                <td><strong>Velocidade (SPD)</strong></td>
                <td>1 Atributo = +3 SPD</td>
                <td>Até marcos de 200/300</td>
                <td>Antecipa iniciativa e garante surtos de ação adicionais em 200 e 300 pontos.</td>
              </tr>
              <tr>
                <td><strong>Bônus de Dano Fixo</strong></td>
                <td>1 Atributo = +15 Dano Fixo</td>
                <td>Definido pelo Grau</td>
                <td>Soma após o cálculo composto, sem depender de ativação de crítico.</td>
              </tr>
              <tr>
                <td><strong>Escudo Fixo</strong></td>
                <td>1 Atributo = +40 Escudo</td>
                <td>Duração por turnos</td>
                <td>Barreira de absorção direta que protege a integridade do HP.</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div class="talamasca-tip-box">
          <strong>Como Montar seu Prêmio:</strong>
          Verifique o Grau da Premiação conquistada (4 Estrelas concede 6 atributos para bênçãos ou 4 para armas; 5 Estrelas concede 10 a 12 atributos). Distribua os pontos disponíveis respeitando a proporção da tabela acima e os poderes interpretativos cabíveis.
        </div>
      `
    },
    {
      id: "glossario-mecanico",
      categoryId: "tabelas-termos",
      title: "Glossário Mecânico & Termos da Égide",
      subtitle: "Índice de siglas e terminologias de jogo para consulta ágil",
      aliases: ["glossario", "termos", "siglas", "atk", "def", "hp", "spd", "rd", "dot", "shabit"],
      summary: "Definições diretas de ATK, DEF, HP, SPD, RD, DoT, Bônus de Dano, Resfriado e Shabits.",
      source: "Compilação Geral de Regras",
      contentHtml: `
        <div class="table-microfilm-wrap">
          <table class="talamasca-table">
            <thead>
              <tr>
                <th>Termo / Sigla</th>
                <th>Definição Canônica</th>
              </tr>
            </thead>
            <tbody>
              <tr><td><strong>HP</strong></td><td>Pontos de Vida. Quando zerados, o personagem entra em estado de incapacitação ou morte clínica.</td></tr>
              <tr><td><strong>ATK</strong></td><td>Ataque. Representa a força e o potencial de dano físico ou mágico de uma ação.</td></tr>
              <tr><td><strong>DEF</strong></td><td>Defesa. Resistência a impactos e mitigação direta de dano no cálculo clássico.</td></tr>
              <tr><td><strong>SPD</strong></td><td>Velocidade. Determina a ordem das jogadas e confere ações adicionais em 200 e 300 pontos.</td></tr>
              <tr><td><strong>RD</strong></td><td>Redução de Dano. Porcentagem de atenuação sofrida antes da aplicação da DEF (marcos de 250 a 850 DEF, teto de 70%).</td></tr>
              <tr><td><strong>DoT</strong></td><td>Damage over Time (Dano contínuo por Turno).</td></tr>
              <tr><td><strong>Bônus de Dano</strong></td><td>Valor numérico fixo que se soma ao dano composto sem necessitar de taxa crítica.</td></tr>
              <tr><td><strong>Escudo (Shield)</strong></td><td>Proteção temporária que absorve dano antes que o HP seja afetado.</td></tr>
              <tr><td><strong>Shabit</strong></td><td>Autômato egípcio de argila ativado por comando vocal para suporte ou combate.</td></tr>
            </tbody>
          </table>
        </div>
      `
    }
  ],

  // ── ACERVO DA PRESENÇA (FAQS PRÉ-REVISADAS • SEM IA) ──
  presenceFaqs: [
    {
      id: "faq-primeira-ficha",
      question: "Como crio e peço minha primeira ficha?",
      category: "Iniciação",
      docId: "pedido-ficha-oficial",
      answer: "Após realizar seu primeiro jogo na comunidade, solicite sua ficha no tópico da Central. Preencha os campos com número livre da lista, e-mail, nome do personagem, filiação, ofício, fotos do shape e escolha de 3 individualidades por nível. A recomendação padrão de atributos para iniciantes é 30 HP e 10 ATK (para DPS) ou 10 DEF (para Tanker). Lembre-se: é imprescindível ler a lista de poderes para saber qual atributo escalona sua habilidade!"
    },
    {
      id: "faq-distribuicao-atributos",
      question: "Como funciona a distribuição de atributos ao subir de nível?",
      category: "Progressão",
      docId: "conversao-atributos-build",
      answer: "Ao ascender de nível você recebe pontos de atributo. Cada 1 ponto investido se converte em: +10 ATK, +10 DEF, +30 HP, +10% de Taxa Crítica, +10% de Dano Crítico ou +3 SPD. Cada personagem escolhe até 3 individualidades por nível da sua lista divina ou mágica, respeitando a progressão de Níveis I, II e Final."
    },
    {
      id: "faq-progressao-xp",
      question: "Quanto XP é necessário do Nível 1 ao Nível 10?",
      category: "Progressão",
      docId: "evolucao-xp-niveis",
      answer: "A progressão inicia no Nível 1 com 0 XP e culmina no Nível 10 com 10.000 XP (passando por N2=600, N3=1.100, N4=2.000, N5=3.000, N6=4.100, N7=5.300, N8=6.600 e N9=8.000). Ao atingir 10.000 XP, o personagem atinge o teto e todo XP subsequente converte-se em Gold na proporção de 10 XP para 1 Gold."
    },
    {
      id: "faq-formulas-dano",
      question: "Quais são as fórmulas de dano (Clássico e com Poderes)?",
      category: "Combate",
      docId: "formulas-dano-combate",
      answer: "No Combate Clássico sem magia: Dano = ATK - DEF. No Combate com Poderes Ativos (Dano Composto), o cálculo baseia-se na escala do poder: (Nível + [ATK x 1.0]) x Crítico + Bônus de Dano; ou com base DEF: (Nível + [DEF x 0.6]) x Crítico + Bônus; ou com base HP: (Nível + [HP x 0.4]) x Crítico + Bônus. A Redução de Dano (RD) mitiga porcentagem antes da DEF."
    },
    {
      id: "faq-oracoes-banners",
      question: "Como funcionam as moedas e os Banners Sazonais?",
      category: "Erário Celestial",
      docId: "banner-e-prioridades",
      answer: "Midnight City possui Golds (itens da loja e refinos de 50G), Contas Celestiais (100 contas = 1 oração) e Orações Celestiais. A Oração serve para atirar no Banner Sazonal rolando 1d20: tirar 20 natural garante um prêmio especial (arma, bênção ou artefato)."
    },
    {
      id: "faq-primeiro-jogo-novato",
      question: "O que um novato deve fazer no primeiro dia de jogo?",
      category: "Iniciação",
      docId: "primeira-inscricao-jogo",
      answer: "Crie uma cena de novato recém-chegado à Égide ou salvo por agentes veteranos. Ganhe XP seguro com turnos livres (10 XP a cada 40 palavras) ou missões verdes de evento. Não entre em combates reais antes do Nível 5 para evitar morte permanente. Ao atingir o Nível 1 com jogo aceito, solicite sua primeira ficha na Central."
    }
  ]
};

if (typeof window !== 'undefined') {
  window.TERMINAL_DATABASE = TERMINAL_DATABASE;
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { TERMINAL_DATABASE };
}
