/**
 * Midnight City — ARQUIVOS CONFIDENCIAIS DA ÉGIDE (SISTEMA & DIRETRIZES)
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
      docId: "classes-e-principios-celestiais",
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
      docId: "missoes-fixas",
      visualType: "origin-dossier",
      visualAsset: "assets/londres_panorama_mj.webp",
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
      title: "Crie sua primeira ficha no Hub",
      badge: "MECÂNICA INICIAL",
      docId: "fichas-de-jogadores",
      visualType: "official-requisition",
      contextKey: "etapa-3",
      objective: "Crie a ficha do seu personagem no Hub Midnight City e distribua os seus primeiros pontos de atributo.",
      lead: "A ficha agora nasce e vive no Hub: nada de planilha ou pedido em tópico.",
      bodyHtml: `
        <p>Depois do seu primeiro jogo na comunidade, crie a ficha do personagem no <a href="https://midnight-city.cloud/dashboard" target="_blank" rel="noopener noreferrer"><strong>Hub Midnight City</strong></a>. Tenha em mãos:</p>
        <div class="talamasca-code-terminal">NOME DO PERSONAGEM: [Nome aceito na aprovação]
FILIAÇÃO: [Divindade paterna/materna ou linhagem arcana]
OFÍCIO: [Seu emprego na Égide: Custódio, Vigilante, Arcanista, etc.]
IDADE & SHAPE: [Idade e photoplayer; o Hub avisa se o rosto já estiver em uso]
INDIVIDUALIDADES: [3 poderes por nível disponível na lista]
DISTRIBUIÇÃO: [Onde você vai alocar seus pontos de atributo]</div>
        <div class="talamasca-tip-box">
          <strong>Distribuição recomendada para novatos:</strong>
          coloque <strong>30 HP</strong> e <strong>10 ATK</strong> (se for DPS) ou <strong>10 DEF</strong> (se for Tanker). Assim você sobrevive às primeiras semanas sem dispersar recursos.
        </div>
        <div class="stencil-quote warning-note">
          <strong>Atenção:</strong> é imprescindível ler a sua lista de poderes para entender com qual atributo ela escala: se bate com ATK, DEF ou HP, se tanka, ou se buffa com base no seu ATK, HP, DEF, etc. Isso é fundamental para uma boa distribuição de atributos.
        </div>
        <div class="station-doc-reference">
          <p>Tabela completa de conversão e atributos base por nível:</p>
          <a href="?mode=arquivo&doc=conversao-de-atributos" class="station-direct-link">
            <span>Consultar conversão de atributos</span>
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
      docId: "sistema-de-eventos",
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
      docId: "rolagem-de-dados",
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
      title: "Moedas, orações e banners",
      badge: "ECONOMIA & BANNERS",
      docId: "fichas-de-jogadores",
      visualType: "currency-vault",
      contextKey: "etapa-6",
      objective: "Entenda Gold, Conta Celestial e Oração Celestial, e onde usá-las no Hub.",
      lead: "Toda a economia do RPG fica no Hub: saldo, conversões, loja e orações.",
      bodyHtml: `
        <p>A economia tem três moedas, todas controladas no Hub:</p>
        <ul>
          <li><strong>Gold:</strong> compra itens na loja e financia a Forja de artefatos.</li>
          <li><strong>Conta Celestial:</strong> moeda intermediária. <strong>100 Contas Celestiais viram 1 Oração</strong>, direto no Hub.</li>
          <li><strong>Oração Celestial:</strong> o recurso mais precioso. É com ela que você ora nos banners, em x1 ou x10, com o pity salvo na sua conta.</li>
        </ul>
        <div class="talamasca-tip-box">
          <strong>Pity garantido:</strong> nos banners temporários, a 41ª oração sem exclusivo garante um; no permanente, a 91ª. E se vierem 3 exclusivos que não são o seu pretendido, o 4º é ele.
        </div>
        <div class="station-doc-reference">
          <a href="banners.html" class="station-direct-link"><span>Ver banners e prêmios</span><span>→</span></a>
        </div>
      `
    }
  ],

  // ── DICAS CONTEXTUAIS DA PRESENÇA (REVISADAS E CANÔNICAS) ──
  presenceTips: [
    {
      quote: "Conte os sucessos primeiro.",
      note: "Em Midnight City, toda ação de combate é uma tentativa. Role os dados com a dificuldade definida e compare a soma de sucessos com a defesa do adversário.",
      docId: "rolagem-de-dados"
    },
    {
      quote: "Não faça seu personagem ser um pato!",
      note: "Especializar seu agente em uma função principal (DPS, Tanker ou Suporte) é o que garante a sobrevivência da equipe nas missões da Égide.",
      docId: "classes-e-principios-celestiais"
    },
    {
      quote: "Perdeu algum campo da ficha?",
      note: "A ficha agora é criada e atualizada no Hub. Tenha em mãos filiação, ofício, shape, individualidades e a distribuição dos seus pontos.",
      docId: "fichas-de-jogadores"
    },
    {
      quote: "Turnos livres rendem XP seguro.",
      note: "No nível 1, escrever cenas com amigos rende 10 XP a cada 40 palavras. É o método ideal para subir de nível sem perigo de morte prematura.",
      docId: "missoes-fixas"
    },
    {
      quote: "Taxa Crítica e Dano Crítico são separados.",
      note: "Cada 10% de taxa crítica tira 1 de dificuldade da rolagem de crítico; cada 10% de dano crítico soma 1 dado. Limites: 600% e 1200%.",
      docId: "calculo-de-dano"
    },
    {
      quote: "As melhores premiações estão em missões e campanhas.",
      note: "Os itens personalizados mais fortes do RPG vêm de tramas e narrativas, onde você pode moldar o equipamento à personalidade do seu agente.",
      docId: "sistema-de-eventos"
    }
  ],

  get janitorSecrets() {
    return this.presenceTips;
  },

  // ── DIRETÓRIOS DO ACERVO (TRANSCRIÇÃO INTEGRAL DE "REGRAS & SISTEMAS 2026") ──
  categories: [
    {
      id: "convivencia-interpretacao",
      code: "SEÇÃO 01",
      name: "Convivência",
      desc: "As dez regras de convivência que valem para todo jogador, em qualquer espaço do RPG.",
      svgIcon: "scales",
      sources: ["Regras & Sistemas 2026 — Regras de Convivência"]
    },
    {
      id: "evolucao",
      code: "SEÇÃO 02",
      name: "Evolução e atributos",
      desc: "Níveis, XP para ascender, pontos de atributo, conversão e a tabela base de cada nível.",
      svgIcon: "chart",
      sources: ["Regras & Sistemas 2026 — Sistema de Evolução"]
    },
    {
      id: "combate",
      code: "SEÇÃO 03",
      name: "Combate e dados",
      desc: "Rolagem de dados no Discord, cálculo de dano, crítico, velocidade, defesa em tanks e mana.",
      svgIcon: "daggers",
      sources: ["Regras & Sistemas 2026 — Sistema de Combate"]
    },
    {
      id: "bonificacoes",
      code: "SEÇÃO 04",
      name: "Atributos e bonificações",
      desc: "Todos os tipos de bônus (buffs, defensivos, debuffs e utilitários) e a bonificação interpretativa.",
      svgIcon: "compass",
      sources: ["Regras & Sistemas 2026 — Atributos & Bonificações"]
    },
    {
      id: "eventos-premiacoes",
      code: "SEÇÃO 05",
      name: "Eventos e premiações",
      desc: "Tipos de evento, recompensas por variante, tipos e classificação de prêmios, custos e limites.",
      svgIcon: "coins",
      sources: ["Regras & Sistemas 2026 — Sistema de Eventos"]
    },
    {
      id: "criacao",
      code: "SEÇÃO 06",
      name: "Criação",
      desc: "Forja, encantamento, boticário, alquimia, manipulação genética e os limites de cada fabricante.",
      svgIcon: "anvil",
      sources: ["Regras & Sistemas 2026 — Sistema de Criação"]
    },
    {
      id: "filiacoes-classes",
      code: "SEÇÃO 07",
      name: "Filiações e classes",
      desc: "Semideuses, bruxos, grupos divinos, as classes perpétuas e as dúvidas frequentes sobre poderes.",
      svgIcon: "helix",
      sources: ["Regras & Sistemas 2026 — Filiações e Afiliações"]
    },
    {
      id: "missoes-fixas",
      code: "SEÇÃO 08",
      name: "Missões fixas",
      desc: "As atividades permanentes de Londres, com frequência, entrega e recompensa de cada uma.",
      svgIcon: "hourglass",
      sources: ["Regras & Sistemas 2026 — Missões Fixas"]
    },
    {
      id: "fichas-registros",
      code: "SEÇÃO 09",
      name: "Fichas, deuses e registros",
      desc: "Fichas no Hub, vagas de deuses, hospedeiros, ocupações provisórias e photoplayers.",
      svgIcon: "index",
      sources: ["Regras & Sistemas 2026 — Tipos de Fichas & Registros"]
    },
    {
      id: "mesticos",
      code: "SEÇÃO 10",
      name: "Mestiços",
      desc: "Gestação, envelhecimento, filhos de todos os casais, uniões entre etnias e herança genética.",
      svgIcon: "helix",
      sources: ["Regras & Sistemas 2026 — Sistemas e Regras sobre Mestiços"]
    }
  ],

  // ── ACERVO DOCUMENTAL ──
  documents: [
    // ══════════════════════════════════════════════════════════
    // SEÇÃO 01 · CONVIVÊNCIA
    // ══════════════════════════════════════════════════════════
    {
      id: "regras-de-convivencia",
      categoryId: "convivencia-interpretacao",
      title: "Regras de convivência",
      subtitle: "As dez regras que todo jogador precisa conhecer antes do primeiro turno",
      aliases: ["regras", "conduta", "convivencia", "convivência", "600px", "72h", "72 horas", "alerta +18", "sexo", "patente", "tentativa", "títulos", "educado"],
      summary: "Não inventar posses, informar atributos no turno, respeitar o combate e os jogos alheios, a regra da tentativa, turnos de 600px, educação, alerta +18 e uso de títulos.",
      source: "Regras & Sistemas 2026 — Regras de Convivência",
      contentHtml: `
        <ol class="talamasca-ordered-list">
          <li><strong>Não invente o que você não tem:</strong> é proibido que o jogador invente a posse de itens, seja ele qual for. Armas e objetos são adquiridos por meio de compras, eventos ou tarefas rotineiras.</li>
          <li><strong>Sempre deixe no seu turno o valor dos seus atributos:</strong> é chato demais ter que ficar abrindo ficha por ficha para saber quanto de ataque, defesa e HP você tem. Então, para facilitar o cálculo do amiguinho ou do mestre de mesa durante uma narrativa de combate, deixe esses valores no seu turno.</li>
          <li><strong>Respeite o sistema de combate:</strong> aqui temos pontos de vida, de mana e outras variantes que podem ajudar ou prejudicar suas rolagens de dados. Então não invente nada: siga o sistema de combate e use apenas o que suas magias, poderes ou objetos fornecem!</li>
          <li><strong>Tenha bom senso quanto a jogos alheios:</strong> respeite tópicos que estejam sendo usados para eventos ou jogos particulares entre jogadores (regra de 72h). Todo tópico tem uma cópia para evitar esse tipo de transtorno.</li>
          <li><strong>Você não faz, você tenta:</strong> como usamos sistema de dados, em combates físicos, mentais ou derivados sempre será uma "tentativa". Então é importante ter em mente, ao digitar, que você vai <em>tentar</em> bater em alguém, <em>tentar</em> defender, <em>tentar</em> persuadir, etc.</li>
          <li><strong>Não existe PATENTE:</strong> em eventos pode-se pedir todo tipo de coisa, até mesmo a roupa do Homem-Aranha, mas isso não impede que outras pessoas possam obter o mesmo objetivo em eventos futuros. Só pedimos bom senso em relação à descrição, para não ser um plágio descarado.</li>
          <li><strong>Os turnos devem ter no mínimo 600px</strong>, para preservar o padrão.</li>
          <li><strong>Seja educado:</strong> não toleramos brigas e falta de respeito de qualquer natureza em espaços de convivência. Elas só são aceitas dentro do jogo, no desenvolvimento de tramas pessoais ou do RPG.</li>
          <li><strong>Cuidado com o SEXO.txt:</strong> este é um RPG adulto e, naturalmente, não vamos impedir que determinados tipos de conteúdo sejam desenvolvidos. Mas é importante sinalizar no <strong>INÍCIO</strong> do turno que o seu post possui conteúdo erótico, para que outros jogadores não leiam intimidades indesejadas. Sugerimos: <code>ALERTA +18</code> ou algo parecido.</li>
          <li><strong>Procure usar os títulos de cada personagem:</strong> isso não é uma regra, mas uma instrução. Procure se referir a personagens que possuem título por ele, e não pelo nome. Isso é importante porque o título de cada personagem foi conquistado com muito esforço dentro do jogo; então prefira sempre se reportar usando ele.</li>
        </ol>
      `
    },

    // ══════════════════════════════════════════════════════════
    // SEÇÃO 02 · EVOLUÇÃO E ATRIBUTOS
    // ══════════════════════════════════════════════════════════
    {
      id: "sistema-de-evolucao",
      categoryId: "evolucao",
      title: "Sistema de evolução",
      subtitle: "Os 10 níveis, o XP necessário para ascender e os pontos de atributo de cada nível",
      aliases: ["xp", "nivel", "nível", "niveis", "níveis", "evolução", "evolucao", "ascender", "upar", "pontos de atributo", "experiência"],
      summary: "Os personagens têm 10 níveis. Cada nível exige um total de XP e concede pontos de atributo para distribuir na ficha.",
      source: "Regras & Sistemas 2026 — Sistema de Evolução",
      contentHtml: `
        <p>No nosso RPG, os personagens têm nivelamento de <strong>10 níveis</strong>, que possibilitam adquirir magias, habilidades, pontos de vida e mana à medida que se desenvolvem no jogo e na academia do Cairo. Esses pontos de experiência podem ser obtidos nas atividades acadêmicas ou, principalmente, participando de oficinas e narrações.</p>

        <h3>XP necessário e pontos por nível</h3>
        <div class="table-microfilm-wrap">
          <table class="talamasca-table">
            <thead><tr><th>Nível</th><th>Pontos necessários para ascender</th><th>Pontos de atributo</th></tr></thead>
            <tbody>
              <tr><td>01</td><td>0 XP</td><td>1 ponto de atributo</td></tr>
              <tr><td>02</td><td>600 XP</td><td>1 ponto de atributo</td></tr>
              <tr><td>03</td><td>1.100 XP</td><td>2 pontos de atributo</td></tr>
              <tr><td>04</td><td>2.000 XP</td><td>2 pontos de atributo</td></tr>
              <tr><td>05</td><td>3.000 XP</td><td>2 pontos de atributo</td></tr>
              <tr><td>06</td><td>4.100 XP</td><td>2 pontos de atributo</td></tr>
              <tr><td>07</td><td>5.300 XP</td><td>2 pontos de atributo</td></tr>
              <tr><td>08</td><td>6.600 XP</td><td>2 pontos de atributo</td></tr>
              <tr><td>09</td><td>8.000 XP</td><td>2 pontos de atributo</td></tr>
              <tr><td>10</td><td>10.000 XP</td><td>4 pontos de atributo</td></tr>
            </tbody>
          </table>
        </div>
        <p>A ascensão de cada personagem acontece assim que ele atinge a quantidade de pontos de experiência necessária para o nível seguinte. A partir disso, ele terá uma determinada quantidade de pontos de atributo para usar na sua ficha de personagem.</p>
      `
    },
    {
      id: "conversao-de-atributos",
      categoryId: "evolucao",
      title: "Conversão de pontos de atributo",
      subtitle: "Quanto cada ponto de atributo vale em ATK, DEF, HP, taxa crítica, dano crítico e SPD",
      aliases: ["conversão", "conversao", "atributo", "atk", "def", "hp", "taxa crit", "dano crit", "spd", "distribuir pontos", "build"],
      summary: "1 ponto = 10 ATK, 10 DEF, 30 HP, 10% de taxa crítica, 10% de dano crítico ou 3 SPD. A distribuição é registrada na ficha do Hub.",
      source: "Regras & Sistemas 2026 — Sistema de Evolução",
      contentHtml: `
        <div class="table-microfilm-wrap">
          <table class="talamasca-table">
            <thead><tr><th>Atributo</th><th>Custo</th><th>Valor de conversão</th></tr></thead>
            <tbody>
              <tr><td>ATK</td><td>1 ponto de atributo</td><td>10 ATK</td></tr>
              <tr><td>DEF</td><td>1 ponto de atributo</td><td>10 DEF</td></tr>
              <tr><td>HP</td><td>1 ponto de atributo</td><td>30 HP</td></tr>
              <tr><td>TAXA CRIT.</td><td>1 ponto de atributo</td><td>10% TAXA CRIT.</td></tr>
              <tr><td>DANO CRIT.</td><td>1 ponto de atributo</td><td>10% DANO CRIT.</td></tr>
              <tr><td>SPD</td><td>1 ponto de atributo</td><td>3 SPD</td></tr>
            </tbody>
          </table>
        </div>
        <p>Cada atributo tem um valor diferente e resulta num valor de conversão diferente; por isso é importante estar atento a essa tabela para não errar nas suas conversões.</p>
        <p>Os pontos que você escolher devem ser registrados <strong>na ficha do personagem no Hub</strong> à medida que ele subir de nível.</p>
        <div class="talamasca-tip-box">
          <strong>Dica do Mestre:</strong> fique atento às observações em negrito dos seus poderes. Pode ser que a sua lista tenha alguns que escalam com atributos específicos, e investir neles pode ser mais vantajoso.
        </div>
      `
    },
    {
      id: "tabela-base-por-nivel",
      categoryId: "evolucao",
      title: "Atributos base por nível",
      subtitle: "Rolagem padrão, HP, ATK, DEF, taxa crítica, dano crítico, SPD e mana de cada nível",
      aliases: ["tabela base", "rolagem padrão", "rolagem padrao", "hp base", "mana base", "três grandes", "tres grandes", "perpétuos", "perpetuos", "legenda", "dados na dificuldade"],
      summary: "Valores base de cada nível antes dos pontos distribuídos, com os bônus dos filhos dos três grandes e dos perpétuos e a legenda de cada atributo.",
      source: "Regras & Sistemas 2026 — Sistema de Evolução",
      contentHtml: `
        <div class="table-microfilm-wrap">
          <table class="talamasca-table">
            <thead><tr><th>Nível</th><th>Rolagem padrão</th><th>HP</th><th>ATK</th><th>DEF</th><th>Taxa crit.</th><th>Dano crit.</th><th>SPD</th><th>Mana</th></tr></thead>
            <tbody>
              <tr><td>01</td><td>10 dados na dificuldade 8</td><td>60</td><td>15</td><td>15</td><td>0%</td><td>50%</td><td>100</td><td>200</td></tr>
              <tr><td>02</td><td>10 dados na dificuldade 7</td><td>110</td><td>20</td><td>20</td><td>0%</td><td>50%</td><td>100</td><td>250</td></tr>
              <tr><td>03</td><td>10 dados na dificuldade 7</td><td>160</td><td>25</td><td>25</td><td>0%</td><td>50%</td><td>100</td><td>300</td></tr>
              <tr><td>04</td><td>10 dados na dificuldade 6</td><td>200</td><td>35</td><td>35</td><td>0%</td><td>50%</td><td>100</td><td>350</td></tr>
              <tr><td>05</td><td>10 dados na dificuldade 6</td><td>240</td><td>45</td><td>45</td><td>0%</td><td>50%</td><td>100</td><td>400</td></tr>
              <tr><td>06</td><td>10 dados na dificuldade 5</td><td>280</td><td>60</td><td>60</td><td>0%</td><td>50%</td><td>100</td><td>450</td></tr>
              <tr><td>07</td><td>10 dados na dificuldade 5</td><td>320</td><td>70</td><td>70</td><td>10%</td><td>60%</td><td>100</td><td>500</td></tr>
              <tr><td>08</td><td>10 dados na dificuldade 4</td><td>380</td><td>80</td><td>80</td><td>10%</td><td>60%</td><td>110</td><td>550</td></tr>
              <tr><td>09</td><td>11 dados na dificuldade 4</td><td>420</td><td>100</td><td>100</td><td>10%</td><td>60%</td><td>120</td><td>600</td></tr>
              <tr><td>10</td><td>12 dados na dificuldade 3</td><td>500</td><td>130</td><td>130</td><td>10%</td><td>70%</td><td>130</td><td>800</td></tr>
            </tbody>
          </table>
        </div>

        <div class="talamasca-callout">
          <strong>OBS¹:</strong> filhos dos três grandes (Zeus/Júpiter, Hades/Plutão e Poseidon/Netuno) têm +30 HP e 10% de taxa crítica a mais que o normal.<br>
          <strong>Atenção¹:</strong> isso não altera a quantidade que aumenta por nível. Se no nível 02 um semideus normal teria 60 HP, o filho dos grandes terá 110.<br>
          <strong>OBS²:</strong> os filhos dos deuses que se revelarem Perpétuos terão direito ao bônus dos filhos dos grandes, além de 200 de mana a mais que o normal e +10 SPD.
        </div>

        <h3>Legenda</h3>
        <ul>
          <li><strong>Rolagem padrão:</strong> é o valor da sua rolagem pura, de onde será definido se a ação que você tem em mente foi realizada com sucesso ou não.</li>
          <li><strong>HP:</strong> são os seus pontos de vida dentro do jogo.</li>
          <li><strong>ATK:</strong> são os pontos com que o seu personagem consegue causar dano. Eles se sustentam na sua força, destreza e vigor físico, mental ou mágico.</li>
          <li><strong>DEF:</strong> são os seus pontos de resistência física, mental e mágica do seu corpo.</li>
          <li><strong>TAXA CRIT.:</strong> são os pontos capazes de reduzir a dificuldade da rolagem para crítico de uma ação.</li>
          <li><strong>DANO CRIT.:</strong> são os pontos capazes de aumentar os dados da rolagem para crítico de uma ação.</li>
          <li><strong>SPD:</strong> são os pontos de velocidade que permitem ao personagem se movimentar mais rápido ou ainda ganhar surtos de ação ou dano adicional, a depender da quantidade.</li>
          <li><strong>MANA:</strong> são os pontos de energia mental/espiritual. Eles são usados para causar manifestações dos poderes divinos do personagem.</li>
        </ul>

        <h3>Os três grandes e os Perpétuos</h3>
        <p><strong>Os três grandes são:</strong> Zeus/Júpiter; Poseidon/Netuno; Hades/Plutão.</p>
        <p><strong>Os deuses manifestos como Perpétuos são</strong> [entidades do criador; são os deuses, mas não se limitam a eles]: Destruição — Deméter/Ceres; Destino — Apolo/Phoebus; Morte — Tânatos/Letus; Sonho — Morfeu/Somnia; Delírio — Paraphronia/Delirium; Desejo — Eros/Cúpido; e Desespero — Melinoe/Phantessa.</p>
      `
    },

    // ══════════════════════════════════════════════════════════
    // SEÇÃO 03 · COMBATE E DADOS
    // ══════════════════════════════════════════════════════════
    {
      id: "sistema-de-combate",
      categoryId: "combate",
      title: "Sistema de combate",
      subtitle: "O que é o sistema de combate e quando ele vale",
      aliases: ["combate", "duelo", "competição", "interpretação", "dados ou interpretativo"],
      summary: "Conjunto de regras que rege combates e bônus de dados, de duelos a competições. Combates podem ser por dados ou apenas interpretação.",
      source: "Regras & Sistemas 2026 — Sistema de Combate",
      contentHtml: `
        <p>O Sistema de Combate é um conjunto de regras que rege os combates e os bônus de dados no RPG, desde duelos até competições. É crucial seguir rigorosamente essas normas para evitar problemas e punições. Na Academia, são permitidos combates que envolvem dados e também o sistema apenas de interpretação, conforme a decisão dos organizadores ou dos participantes.</p>
        <p>Depois de ver qual será sua rolagem padrão por nível, seus pontos de vida e sua mana no sistema de evolução, agora vamos explicar como funcionam os ferimentos quando você não consegue se defender, o consumo de mana e, principalmente, como rolar os dados.</p>
        <div class="station-doc-reference">
          <a href="?mode=arquivo&doc=rolagem-de-dados" class="station-direct-link"><span>Como rolar os dados</span><span>→</span></a>
          <a href="?mode=arquivo&doc=calculo-de-dano" class="station-direct-link"><span>Como calcular o dano</span><span>→</span></a>
        </div>
      `
    },
    {
      id: "rolagem-de-dados",
      categoryId: "combate",
      title: "Rolagem de dados",
      subtitle: "Como rolar dados no Discord com o comando /roll, passo a passo",
      aliases: ["roll", "/roll", "dados", "rolagem", "d10", "10d10", "t5", "dificuldade", "sucessos", "discord", "rolador", "dice maiden"],
      summary: "As rolagens de combate e de testes continuam no Discord: na sua sala de rolagem, identifique personagem e motivo e use /roll XdY tZ.",
      source: "Regras & Sistemas 2026 — Rolagem de Dados",
      contentHtml: `
        <p>Assim como nos RPGs de mesa, o RPG online usa a rolagem de dados para determinar circunstâncias ao longo das aventuras de cada jogador. Esse procedimento é recomendado para que exista justiça nas batalhas. Os jogadores sempre deverão rolar dados para as ações em que decidirem usá-los durante a sua estadia no RPG, se optarem pelo combate via dados.</p>
        <div class="talamasca-callout">
          <strong>Onde rolar:</strong> as rolagens de combate e de testes continuam sendo feitas no <strong>servidor do Discord</strong>. (As orações dos banners são feitas no Hub.)
        </div>
        <p>Esse procedimento é feito pelo nosso servidor do Discord, onde todo jogador recebe uma sala na aba <strong>"rolador"</strong>. Nessa sala, ele poderá usar o código de rolagens para pedir que o bot existente simule e entregue os resultados.</p>

        <h3>Passo 1: encontre a sua sala de rolagens</h3>
        <p>Cada jogador terá, no servidor do Discord, um canal de texto com o número da sua ficha (por exemplo, <code>#001</code>, <code>#002</code>, <code>#003</code>). Esse número é o da sua ficha de jogador <strong>no Hub</strong>.</p>

        <h3>Passo 2: identifique o personagem e o motivo</h3>
        <p>Depois de encontrar a sua sala (que corresponde ao número da sua ficha de jogador), identifique o nome do personagem que está em uso e o motivo da rolagem.</p>
        <p><em>Exemplo: tenho um personagem chamado Shen e quero que ele ataque alguém.</em></p>
        <div class="talamasca-code-terminal">Shen
Ataque</div>

        <h3>Passo 3: chame o bot com /roll</h3>
        <p>Use o código necessário para que o bot do servidor entenda que queremos que ele simule uma rolagem de dados. Para isso, digite: <code>/roll</code></p>
        <p>Ao fazer isso, o servidor vai sugerir um quadro negro; dentro dele, poderemos informar ao bot quantos dados queremos usar e qual a dificuldade.</p>

        <h3>Passo 4: informe a rolagem do personagem</h3>
        <p>Informe dentro desse quadro negro a rolagem do personagem. Vamos supor que, neste mesmo exemplo, o personagem Shen usa a rolagem de 10 dados com 5 de dificuldade. Para o bot entender, escreva desta forma: <code>10d10 t5</code></p>
        <ul>
          <li>O número antes do primeiro "d" (<strong>10</strong>d10 t5) é o número de dados que estou usando;</li>
          <li>O número depois do "t" (10d10 t<strong>5</strong>) é a dificuldade que estamos usando.</li>
        </ul>

        <h3>Passo 5: leia o resultado</h3>
        <p>Por último, o bot vai simular a rolagem dos dados e informar os resultados, que vão corresponder ao <strong>sucesso daquela ação</strong>. Se o número de sucessos do personagem for maior que o do seu rival, a ação dele deu certo.</p>
        <p>Seguindo esse exemplo, o ataque de Shen corresponde a 6 sucessos:</p>
        <div class="talamasca-code-terminal">Request: [10d10 t5] Roll: [10, 8, 8, 8, 8, 7, 4, 2, 2, 1] Result: 6</div>
      `
    },
    {
      id: "calculo-de-dano",
      categoryId: "combate",
      title: "Elementos de batalha: como calcular dano",
      subtitle: "Combate clássico, combate composto com poderes ativos e o cálculo do crítico",
      aliases: ["dano", "fórmula", "formula", "atk - def", "dano sofrido", "dano real", "composto", "clássico", "classico", "crítico", "critico", "base atk", "base def", "base hp", "bônus de dano"],
      summary: "Clássico: ATK − DEF = dano sofrido. Composto: (NÍVEL + [ATK × 1], [DEF × 0,6] ou [HP × 0,4]) × CRÍTICO + BÔNUS DE DANO = DANO REAL.",
      source: "Regras & Sistemas 2026 — Elementos de Batalha",
      contentHtml: `
        <p>Antes de qualquer coisa, saiba que para causar dano você primeiro precisa ganhar a disputa na rolagem de dados da ação. Se os sucessos da sua ação ofensiva forem maiores que os sucessos da ação defensiva do inimigo, a sua ação acertou o alvo.</p>
        <p>É recomendável que, sempre que você atacar, mencione no seu turno os seus status, como ATK, DEF, etc. Se estiver usando um poder, cite na ação quantos pontos de dano final você conseguiu gerar; eles serão levados em consideração se a sua ação ofensiva vencer a disputa inicial de dados.</p>
        <p>Então, vamos às fórmulas para calcular o dano final da sua ação ofensiva. Saiba que, quanto mais status o seu personagem tiver, ou dependendo do poder que estiver usando, o cálculo de dano pode ser diferente.</p>

        <h3>Combate clássico (sem poderes ativos)</h3>
        <p>Quando pensamos numa situação de combate clássico, em que você tenta bater em alguém na mão (usando um soco, uma arma ou o hit básico do seu maguinho), o cálculo é simples.</p>
        <p>Imagine que o seu oponente te atacou com um soco e você tentou se esquivar, mas os sucessos dele nos dados foram maiores que os seus para se defender. Então você terá que calcular quanto de vida perdeu:</p>
        <div class="talamasca-code-terminal">ATK − DEF = DANO SOFRIDO</div>
        <p>O ataque é do oponente, a defesa é a sua e… sim, burra, o dano sofrido é a quantidade de HP que você vai perder.</p>

        <h3>Combate composto (uso de poderes ativos)</h3>
        <p>Pode ser que, em combate, você ou o seu oponente decidam usar algum poder ou técnica dos artefatos ou cone para melhorar a ação em questão. Nesse caso, cada poder ofensivo determina qual status principal vai usar para causar dano (podendo variar entre ATK, DEF e HP).</p>
        <p>Quando um poder não especificar o status principal a ser considerado no cálculo do seu dano, ele <strong>sempre</strong> terá como base o valor de ataque (ATK) do personagem.</p>
        <p>Pensando no nivelamento de combate, aqui embaixo estão as fórmulas para calcular o dano dos poderes de acordo com o tipo de status:</p>
        <ul>
          <li><strong>Base ATK:</strong> <code>(NÍVEL + [ATK × 1]) × CRÍTICO + BÔNUS DE DANO = DANO REAL</code></li>
          <li><strong>Base DEF:</strong> <code>(NÍVEL + [DEF × 0,6]) × CRÍTICO + BÔNUS DE DANO = DANO REAL</code></li>
          <li><strong>Base HP:</strong> <code>(NÍVEL + [HP × 0,4]) × CRÍTICO + BÔNUS DE DANO = DANO REAL</code></li>
        </ul>

        <h3>Exemplo usando ATK</h3>
        <p>Imagine que um personagem ganha a disputa de dados e o ataque acerta o alvo. Ele está no <strong>nível 7</strong>, tem <strong>100 de ATK</strong> e, ao rolar dados <strong>para crítico</strong>, obtém <strong>3 sucessos</strong>. Ele não está sob efeito de nenhum poder que melhore o dano final.</p>
        <p>A fórmula dessa ação será: (NÍVEL + [ATK × 1]) × CRÍTICO + BÔNUS DE DANO = DANO REAL</p>
        <div class="talamasca-code-terminal">(7 + [100 × 1]) × 3 + 0 = ???
(7 + 100) × 3 = ???
107 × 3 = 321</div>
        <p>Seguindo ainda esse exemplo, a diferença entre esse valor e os pontos de DEF do oponente será a quantidade de HP que ele vai perder.</p>

        <h3>Calculando o crítico</h3>
        <p>Sempre que uma ação ofensiva for usada com um poder, e essa ação tiver vencido a disputa contra a rolagem de esquiva ou defesa do oponente, o jogador atacante poderá rodar um dado para calcular o efeito crítico daquela ação. Essa rolagem é fixa e terá como base o valor de: <strong>0 dados com 10 de dificuldade</strong>.</p>
        <ul>
          <li>Para cada 10% de pontos de <em>taxa crítica</em>, será possível diminuir em <strong>−1 a dificuldade</strong> dessa rolagem (máximo de 100% e, portanto, dificuldade 1). O limite geral de taxa crítica passou a ser 600%, mas a dificuldade desta rolagem nunca fica abaixo de 1: o que passar de 100% vale para os efeitos de poderes, bênçãos e itens que usem a taxa crítica.</li>
          <li>Para cada 10% de pontos de <em>dano crítico</em>, será possível somar <strong>+1 dado</strong> nessa rolagem (não tem limite).</li>
        </ul>
        <p>Os <strong>sucessos dessa ação</strong> vão compor a fórmula de dano final da ação ofensiva, usando as fórmulas corretas de acordo com o tipo de status principal que o seu poder usa como base. Isso sempre vai estar especificado no final do seu poder, na parte em negrito; caso não esteja especificado, use a fórmula de ATK.</p>
      `
    },
    {
      id: "velocidade-spd",
      categoryId: "combate",
      title: "O uso da velocidade (SPD)",
      subtitle: "Ordem de ação no turno, duas ações por turno e surtos de ação",
      aliases: ["spd", "velocidade", "iniciativa", "ordem", "surto de ação", "surtos", "ações por turno", "200 spd", "300 spd"],
      summary: "O SPD define quem age primeiro. Todos têm duas ações por turno; 200 SPD dá +1 ação, 300 SPD dá +2 e, a partir de 200, cada +10 SPD dá +5 ATK passivo.",
      source: "Regras & Sistemas 2026 — O Uso da Velocidade",
      contentHtml: `
        <p>Durante campanhas e eventos, <strong>a ordem de postagem/ação dos personagens em cada rodada</strong> será definida com base no atributo <strong>Velocidade (SPD)</strong>: quanto maior o SPD do personagem, <strong>mais cedo ele age no turno</strong>.</p>
        <p>Cada personagem, por padrão, pode realizar <strong>duas ações por turno</strong> (ataques, uso de poderes ativos, etc.).</p>
        <p>Contudo, personagens com altos níveis de SPD passam a gerar naturalmente <strong><em>surtos de ação</em></strong>, que permitem executar <strong>ações adicionais</strong> no mesmo turno.</p>
        <ul>
          <li><strong>100 SPD:</strong> valor base de todos os personagens (sem bônus).</li>
          <li><strong>200 SPD:</strong> ganha +1 surto de ação (ou seja, +1 ação extra por turno).</li>
          <li><strong>300 SPD:</strong> ganha +2 surtos de ação (totalizando +2 ações extras por turno).</li>
          <li><strong>A partir de 200 SPD:</strong> para cada +10 SPD acima de 200, ganha-se +5 ATK passivo.</li>
        </ul>
        <div class="talamasca-callout"><strong>OBS:</strong> essas regras podem agir de forma diferente dependendo do semideus e dos seus poderes.</div>
      `
    },
    {
      id: "defesa-em-tanks",
      categoryId: "combate",
      title: "O uso da defesa em tanks (DEF)",
      subtitle: "Redução de dano (RD) e HP extra por marcos de DEF",
      aliases: ["def", "defesa", "tank", "tanker", "rd", "redução de dano", "reducao de dano", "250 def", "70% rd", "marcos de def"],
      summary: "A partir de 250 DEF, e a cada 100 DEF, o personagem ganha HP e Redução de Dano (RD) percentual, até 70% de RD.",
      source: "Regras & Sistemas 2026 — O Uso da Defesa em Tanks",
      contentHtml: `
        <p>Para viabilizar o uso de <strong>DEF</strong> no RPG, de maneira que possa de fato contribuir para o exercício adequado da classe de Tank (especialmente de quem queira trilhar esse caminho), a aquisição massiva de defesa (DEF) vai fornecer um atributo único chamado <strong>Redução de Dano (RD)</strong>. Ela não será concedida em valores fixos, e sim percentuais. Além disso, para garantir que o personagem também tenha vida para resistir a um número maior de ataques e não faça desta uma build suicida, ele também ganha HP.</p>
        <p>Abaixo estão os marcos de DEF em que você ganha esses atributos e seus respectivos valores. Eles <strong>não são acumulativos</strong>: o valor indicado é o total. Em resumo, o primeiro marco começa em 250 DEF e, a cada 100 DEF adquiridos, mais desse atributo é concedido naturalmente.</p>
        <p>Em eventos, os mestres de mesa devem indicar se os inimigos possuem RD adquirida no valor da sua DEF. Um mestre poderá, por exemplo, dizer que um inimigo não tem RD ou tem acima do permitido.</p>
        <ul>
          <li><strong>250 DEF:</strong> ganha-se +60 HP e +10% RD</li>
          <li><strong>350 DEF:</strong> ganha-se +120 HP e +20% RD</li>
          <li><strong>450 DEF:</strong> ganha-se +180 HP e +30% RD</li>
          <li><strong>550 DEF:</strong> ganha-se +240 HP e +40% RD</li>
          <li><strong>650 DEF:</strong> ganha-se +300 HP e +50% RD</li>
          <li><strong>750 DEF:</strong> ganha-se +360 HP e +60% RD</li>
          <li><strong>850 DEF:</strong> ganha-se +420 HP e +70% RD</li>
        </ul>
        <div class="talamasca-callout"><strong>OBS:</strong> não é possível ter mais de 70% de RD no RPG, salvo exceções (regalias que o garantam).</div>
      `
    },
    {
      id: "consumo-de-mana",
      categoryId: "combate",
      title: "Consumo de mana",
      subtitle: "Como descontar a mana de cada poder usado, com exemplo",
      aliases: ["mana", "consumo", "energia", "cansaço", "off"],
      summary: "Todo poder ativo tem um gasto de mana que deve ser descontado do total a cada uso, em combates por dados ou interpretativos.",
      source: "Regras & Sistemas 2026 — Consumo de Mana",
      contentHtml: `
        <p>Por lógica, um mago, independentemente do seu tipo de habilidade, poder ou magia, tem limites, e esse limite é relativo ao número de vezes em que ele usa uma magia ou um determinado poder. Os pontos de mana servem para que o jogador em questão possa calcular essas situações: as vezes em que poderá usar uma determinada magia, quando estará cansado, próximo de desmaiar, etc.</p>
        <p>Todo poder ativo possui um gasto X de mana e, todas as vezes em que for usado, o mago deverá descontar a energia que ele requer do seu total. Esse cálculo é <strong>obrigatório</strong>, tanto em combates via dados quanto interpretativos.</p>
        <h3>Exemplo</h3>
        <p>Deku está lutando com Todoroki. Ainda não usou nenhum poder nem desferiu muitos ataques, de tal forma que ainda está sem qualquer sinal de cansaço.</p>
        <div class="talamasca-code-terminal">OFF TODOROKI: Mana: 100/100</div>
        <p>Todoroki usa a manipulação de gelo contra Deku.</p>
        <div class="talamasca-code-terminal">OFF TODOROKI: Mana: 80/100 | Poder usado: Criocinese (−20)</div>
      `
    },

    // ══════════════════════════════════════════════════════════
    // SEÇÃO 04 · ATRIBUTOS E BONIFICAÇÕES
    // ══════════════════════════════════════════════════════════
    {
      id: "atributos-e-bonificacoes",
      categoryId: "bonificacoes",
      title: "Atributos e bonificações: elementos que mudam sua rolagem",
      subtitle: "Buffs, defensivos, debuffs e utilitários: o que cada bônus faz e exemplos",
      aliases: ["bonificação", "bonificacao", "buff", "debuff", "escudo", "defesa absoluta", "mana total", "regeneração", "sucesso adicional", "dano real", "surto de sorte", "bônus de condição", "energia infinita", "respaldo", "cooldown", "utilitários"],
      summary: "Tabela completa dos tipos de bônus que poderes, magias, itens e armas podem aplicar, com o que cada um faz e exemplos de valores.",
      source: "Regras & Sistemas 2026 — Atributos & Bonificações",
      contentHtml: `
        <p>As bonificações e os atributos são elementos que podem mudar a rolagem, o resultado ou as consequências das suas jogadas. No nosso RPG, cada poder, magia, item ou arma poderá aplicar essas bonificações, aprimorando ou prejudicando esses valores ativamente no jogo. Por exemplo: rolar com mais dados, com menos dificuldade, causar mais dano, etc. Tudo depende do que você tem à sua disposição.</p>

        <h3>Buff (facilitadores)</h3>
        <div class="table-microfilm-wrap">
          <table class="talamasca-table">
            <thead><tr><th>Tipo de bônus</th><th>O que ele geralmente faz interpretativamente</th><th>Exemplos</th></tr></thead>
            <tbody>
              <tr><td><strong>ATK adicional</strong></td><td>Aumenta o potencial de uma determinada ação.<br><em>Exemplo:</em> aumento da força física.</td><td>+10 de ATK</td></tr>
              <tr><td><strong>HP adicional</strong></td><td>Adiciona pontos de vida (HP) aos do número padrão de um jogador.<br><em>Exemplo:</em> fortificação biológica, gigantismo.</td><td>Considerando 100 de HP como padrão: +30 HP total (100/100 → 130/130)</td></tr>
              <tr><td><strong>DEF adicional</strong></td><td>Quando você tem o seu estado físico alterado a ponto de ser mais capaz de suportar danos, independentemente do seu teor.<br><em>Exemplo:</em> armadura, escudo e manto elementar.</td><td>+10 de DEF</td></tr>
              <tr><td><strong>TAXA CRIT. adicional</strong></td><td>Aumenta a chance de um surto de explosão física/mágica para uma determinada habilidade, podendo atingir uma área maior ou sendo ainda mais letal que naturalmente.<br><em>Exemplo:</em> aumento da sorte, perícias, proficiência.</td><td>+10% de TAXA CRIT.</td></tr>
              <tr><td><strong>DANO CRIT. adicional</strong></td><td>Aumenta o dano de um surto de explosão física/mágica para uma determinada habilidade, podendo atingir uma área maior ou sendo ainda mais letal que naturalmente.<br><em>Exemplo:</em> aumento da sorte, perícias, proficiência.</td><td>+10% de DANO CRIT.</td></tr>
              <tr><td><strong>Dano real adicional</strong></td><td>É quando um poder, artefato ou cone consegue gerar mudança do dano final causado. De todos, é o mais raro de existir (<strong>entra no final da fórmula de dano composto</strong>).<br><em>Exemplo:</em> explosão, amplificação, acerto garantido, etc.</td><td>+1 Bônus de Dano</td></tr>
              <tr><td><strong>Sucesso adicional</strong></td><td>Quando algo afeta a essência da sua ação, ou ainda as leis celestiais e a física do ambiente ou de uma determinada ação.<br><em>Exemplo:</em> magia do caos, manipulação da probabilidade, controle do tempo.</td><td>+1 Sucesso nas ações (não vale para crítico)<br>ou<br>+1 no resultado final da rolagem de 1 dado</td></tr>
            </tbody>
          </table>
        </div>

        <h3>Defensivos</h3>
        <div class="table-microfilm-wrap">
          <table class="talamasca-table">
            <thead><tr><th>Tipo de bônus</th><th>O que ele geralmente faz interpretativamente</th><th>Exemplos</th></tr></thead>
            <tbody>
              <tr><td><strong>Escudo</strong></td><td>Permite gerar uma aura sobre um alvo capaz de mitigar uma determinada quantidade de dano, sempre escalando com a DEF do conjurador.<br><em>Exemplo:</em> aura, manto.</td><td>Geração de escudo de 10% ATK (tem: 500 ATK). Ele transforma o status original previsto em HP fixo, baseado no tipo de dano da classe.<br>Escudo 50 HP<br><strong>OBS:</strong> não se aplica a fórmulas de dano e outros cálculos.</td></tr>
              <tr><td><strong>Defesa absoluta</strong></td><td>Dispensa explicações.</td><td>Garante uma defesa perfeita.</td></tr>
              <tr><td><strong>Mana TOTAL</strong></td><td>Pretende o valor total de energia que o personagem possui.<br><em>Exemplo:</em> aprimoramento mágico, apogeu arcano.</td><td>Considerando 100 de mana como padrão:<br>+10 mana total (100/100 → 110/110)<br>x2 de mana total (100/100 → 200/200)</td></tr>
              <tr><td><strong>Redução do consumo de mana</strong></td><td>Energia externa e própria que pretende reduzir ou abater parte do consumo de energia das ações do usuário.<br><em>Exemplo:</em> joia de energia, aprimoramento mágico.</td><td>−10 do consumo de mana: se o poder iria consumir 30, agora vai consumir 20. Se ia consumir 10, agora não vai consumir energia.<br>−½ do consumo de mana: se iria consumir 30, agora vai consumir 15. Se ia consumir 10, agora vai consumir 5.</td></tr>
              <tr><td><strong>Regeneração de mana</strong></td><td>Regenera a energia perdida após ações que a tenham consumido.<br><em>Exemplo:</em> absorção de energia elementar.</td><td>Considerando 100 de mana como padrão e que já havia perdido 50: +10 (50/100 → 60/100)</td></tr>
              <tr><td><strong>Regeneração de HP</strong></td><td>Regenera tecidos, ferimentos ou fraturas provocados em combate.<br><em>Exemplo:</em> cura.</td><td>Considerando 500 de HP como padrão e que já havia perdido 50 de HP: +10 HP (450/500 → 460/500)</td></tr>
            </tbody>
          </table>
        </div>

        <h3>Debuff (penalizadores)</h3>
        <div class="table-microfilm-wrap">
          <table class="talamasca-table">
            <thead><tr><th>Tipo de bônus</th><th>O que ele geralmente faz interpretativamente</th><th>Exemplos</th></tr></thead>
            <tbody>
              <tr><td><strong>Redução de sucessos</strong></td><td>Diminui o potencial de uma determinada ação do oponente.<br><em>Exemplo:</em> sono, manipulação do tempo.</td><td>−1 Sucesso: se iria defender com 5 sucessos, serão 4.</td></tr>
              <tr><td><strong>Alteração de dificuldade</strong></td><td>Torna uma determinada ação mais difícil.<br><em>Exemplo:</em> manipulação da gravidade, neblina.</td><td>+1 de dificuldade</td></tr>
              <tr><td><strong>Redução de dados</strong></td><td>Reduz as chances de uma determinada ação ser efetuada com sucesso.<br><em>Exemplo:</em> aumento da velocidade.</td><td>−1 dado: se iria rolar com 10, vai rolar com 9.</td></tr>
              <tr><td><strong>Redução ATK</strong></td><td>Reduz o potencial de uma determinada ação cuja classe use ATK para causar dano.<br><em>Exemplo:</em> redução de força física.</td><td>−10 de ATK</td></tr>
              <tr><td><strong>Redução HP TOTAL</strong></td><td>Reduz o potencial de uma determinada ação cuja classe use HP para causar dano.<br><em>Exemplo:</em> redução de tamanho fisiológico.</td><td>Considerando 100 de HP como padrão: −30 HP total (100/100 → 70/70)</td></tr>
              <tr><td><strong>Redução DEF</strong></td><td>Reduz o potencial de uma determinada ação cuja classe use DEF para causar dano.<br><em>Exemplo:</em> redução de resistência.</td><td>−10 de DEF</td></tr>
              <tr><td><strong>Redução TAXA CRIT.</strong></td><td>Reduz a chance presumível de um surto de explosão física/mágica para uma determinada habilidade, podendo atingir uma área maior ou sendo ainda mais letal que naturalmente.<br><em>Exemplo:</em> redução de sorte.</td><td>−10% de TAXA CRIT.</td></tr>
              <tr><td><strong>Redução DANO CRIT.</strong></td><td>Reduz o dano presumível de um surto de explosão física/mágica para uma determinada habilidade, podendo atingir uma área maior ou sendo ainda mais letal que naturalmente.<br><em>Exemplo:</em> redução de sorte.</td><td>−10% de DANO CRIT.</td></tr>
              <tr><td><strong>Redução de dano real</strong></td><td>É quando um poder, artefato ou cone consegue reduzir a mudança do dano final causado. De todos, é o mais raro de existir (<strong>entra no final da fórmula de dano composto</strong>).<br><em>Exemplo:</em> manipulação do destino.</td><td>−1 Bônus de Dano</td></tr>
            </tbody>
          </table>
        </div>

        <h3>Utilitários</h3>
        <div class="table-microfilm-wrap">
          <table class="talamasca-table">
            <thead><tr><th>Tipo de bônus</th><th>O que ele geralmente faz interpretativamente</th><th>Exemplos</th></tr></thead>
            <tbody>
              <tr><td><strong>Surto de sorte</strong></td><td>É quando você é escolhido pelo destino, pelas linhas que regem o mundo e a história do universo. Você pode rodar duas vezes, para todas ou para um determinado tipo de ação, e escolher o resultado que for mais conveniente.<br><em>Exemplo:</em> magia do caos, manipulação da probabilidade, controle do tempo.</td><td>+1 Sucesso nas ações (não vale para crítico)<br>ou<br>+1 Sucesso no resultado final da rolagem de testes</td></tr>
              <tr><td><strong>Bônus de condição</strong></td><td>Concede outro bônus determinado com base num valor que escalou. Como ganhar X dados a cada X de HP perdido, ou ainda causar X de dano mágico adicional a cada X de energia perdida.<br><em>Exemplo:</em> vampirismo.</td><td>+X bônus a cada 3× perdidos/causados/ganhos<br>+X bônus a cada 5× perdidos/causados/ganhos</td></tr>
              <tr><td><strong>Energia infinita</strong></td><td>O bônus deve se aplicar a uma condição específica, como não consumir energia sob a lua, em locais com luz solar, etc.<br><em>Exemplo:</em> reconhecimento de um deus, ou do trono do Cairo.</td><td>—</td></tr>
              <tr><td><strong>+1 individualidade por nível</strong></td><td>Algo raro, geralmente concedido em eventos de nível de missão.<br><em>Exemplo:</em> reconhecimento de um deus.</td><td>+1 individualidade por nível para as listas à sua disposição</td></tr>
              <tr><td><strong>+1 lista divina</strong></td><td>Algo raro, geralmente concedido em eventos de nível de missão, em que se pode seguir outra lista de deus com 3 individualidades à sua escolha.<br><em>Exemplo:</em> reconhecimento de um deus e/ou apadrinhamento.</td><td>+3 individualidades por nível da lista de escolha</td></tr>
              <tr><td><strong>Reduzir respaldos</strong></td><td>Geralmente quando você está numa condição tão íntima com o seu parente divino a ponto de os respaldos dos poderes que vêm dele poderem ser quebrados pela metade, voltando antes do necessário.<br><em>Exemplo:</em> reconhecimento divino.</td><td>Reduz pela metade o tempo de espera para usar o mesmo poder novamente (sempre arredondar para baixo/menos)</td></tr>
            </tbody>
          </table>
        </div>
      `
    },
    {
      id: "bonificacao-interpretativa",
      categoryId: "bonificacoes",
      title: "Bonificação interpretativa",
      subtitle: "Os níveis de controle Brando, Moderado, Forte e Perfeito, e como convertê-los",
      aliases: ["brando", "moderado", "forte", "perfeito", "interpretativo", "nível do poder", "conversão interpretativa", "pirocinese"],
      summary: "Todo prêmio pode agregar poderes interpretativos em quatro níveis de controle. Níveis maiores podem ser convertidos em combinações de níveis menores.",
      source: "Regras & Sistemas 2026 — Bonificação Interpretativa",
      contentHtml: `
        <p>Como já percebido, todo prêmio permite agregar poderes interpretativos. Eles definem o nível de controle que o prêmio vai permitir que o jogador tenha sobre a natureza do poder escolhido, de modo que fique mais fácil entender como seria aplicado:</p>
        <div class="table-microfilm-wrap">
          <table class="talamasca-table">
            <thead><tr><th>Nível do poder</th><th>Descrição do seu controle sobre ele</th><th>Conversão</th></tr></thead>
            <tbody>
              <tr>
                <td><strong>Brando</strong></td>
                <td>Controle quase inconsciente. Consegue controlar pequenas quantidades da natureza da sua individualidade.<br><em><strong>Por exemplo, na hipótese de pirocinese:</strong> aquecer a mão, atirar bolas de fogo.</em></td>
                <td>Não pode ser convertido.</td>
              </tr>
              <tr>
                <td><strong>Moderado</strong></td>
                <td>Consegue controlar quantidades consideráveis da natureza da sua individualidade.<br><em><strong>Por exemplo, na hipótese de pirocinese:</strong> envolver-se em chamas, produzir rajadas ou colunas de fogo.</em></td>
                <td>Pode ser convertido para 2 Brandos.</td>
              </tr>
              <tr>
                <td><strong>Forte</strong></td>
                <td>Consegue controlar boa parte da própria natureza da sua individualidade e seus derivados.<br><em><strong>Por exemplo, na hipótese de pirocinese:</strong> iniciar incêndios, cuspir grandes rajadas de fogo, se imunizar dele.</em></td>
                <td><ul><li>Pode ser convertido para 2 Moderados.</li><li>Pode ser convertido para 1 Moderado e 2 Brandos.</li><li>Pode ser convertido para 4 Brandos.</li></ul></td>
              </tr>
              <tr>
                <td><strong>Perfeito</strong></td>
                <td>Perfeito: encarna a verdadeira essência da sua individualidade, com uma série de trunfos.<br><em><strong>Por exemplo, na hipótese de pirocinese:</strong> criar formas vivas de fogo, ou ainda incluir características únicas, como só apagar quando for desejo do jogador.</em></td>
                <td><ul><li>Pode ser convertido para 2 Fortes.</li><li>Pode ser convertido para 1 Forte e 2 Moderados.</li><li>Pode ser convertido para 1 Forte, 1 Moderado e 2 Brandos.</li><li>Pode ser convertido para 4 Moderados.</li><li>Pode ser convertido para 3 Moderados e 2 Brandos.</li><li>Pode ser convertido para 2 Moderados e 4 Brandos.</li><li>Pode ser convertido para 1 Moderado e 6 Brandos.</li><li>Pode ser convertido para 8 Brandos.</li></ul></td>
              </tr>
            </tbody>
          </table>
        </div>
      `
    },

    // ══════════════════════════════════════════════════════════
    // SEÇÃO 05 · EVENTOS E PREMIAÇÕES
    // ══════════════════════════════════════════════════════════
    {
      id: "sistema-de-eventos",
      categoryId: "eventos-premiacoes",
      title: "Sistema de eventos",
      subtitle: "Narração, desafio, mini-missão e missão: variantes de perigo e recompensas",
      aliases: ["eventos", "narração", "narracao", "desafio", "mini-missão", "mini missao", "missão", "campanha", "verde", "amarelo", "vermelho", "artefato roletável", "central", "recompensa de evento"],
      summary: "Eventos são classificados por tipo e por cor de perigo (verde, amarelo, vermelho). Cada combinação tem XP, Gold e prêmios definidos.",
      source: "Regras & Sistemas 2026 — Sistema de Eventos",
      contentHtml: `
        <p>Os eventos, como já explicado, podem ser desenvolvidos pela ADM, por Deuses e por instrutores. Eles podem fazer narrações a qualquer momento, desde que não existam mais de duas acontecendo ao mesmo tempo, sendo esse o número limite. Outros eventos, como Desafios, Mini-missões e Missões, devem ser solicitados <strong>no Hub</strong> para serem desenvolvidos, já que eles têm uma fila para serem executados.</p>
        <p>Alguns fatores, como tempo e periculosidade, são fundamentais na variação deles. Por isso, devem sinalizar sempre qual é o <strong>nível de perigo do evento</strong>, por meio das cores: <strong>verde</strong> (pouco), <strong>amarelo</strong> (considerável) e <strong>vermelho</strong> (perigoso). Além disso, eventos sinalizados com uma cor podem, sim, se tornar mais perigosos ao longo do seu desenvolvimento, e isso afeta diretamente a premiação dos participantes, a fim de tornar tudo mais flexível e justo.</p>

        <h3>Narração</h3>
        <p>São eventos de um acontecimento curto, administrado por um narrador. Geralmente acontecem num único dia e ocupam pouco tempo, a fim de desenvolver algo simples e mais objetivo.</p>
        <ul>
          <li><strong>Variante verde:</strong> quando não oferece risco e é menos elaborada, com o objetivo de ser simples.</li>
          <li><strong>Variante amarela:</strong> quando é mais elaborada, longa e oferece risco moderado aos participantes.</li>
          <li><strong>Variante vermelha:</strong> quando oferece risco de morte ou de sequelas severas, é muito elaborada e bem desenvolvida.</li>
        </ul>
        <div class="talamasca-tip-box">
          <strong>Recompensa:</strong><br>
          Pontos de experiência (XP): 400 · 500 · 600 XP.<br>
          Gold: 100 · 200 · 300.<br>
          <strong>Verde e amarela (1 prêmio):</strong> espólios, apenas simbólicos.<br>
          <strong>Vermelha (1 prêmio):</strong> 1x artefato roletável.
        </div>

        <h3>Desafio</h3>
        <p>São eventos que se assemelham a uma tarefa a ser cumprida. O narrador pode narrar num determinado local, comunicando o desafio e permitindo que os participantes o executem ali mesmo ou até entreguem por meio de DOCS. Esses desafios podem ser algo mais sucinto ou algo mais elaborado, como sobreviver a uma prova de resistência por dias, ou até participar de um torneio.</p>
        <ul>
          <li><strong>Variante verde:</strong> quando não oferece risco, produzido num único turno ou em DOCS à parte.</li>
          <li><strong>Variante amarela:</strong> quando é mais elaborada, longa e oferece risco moderado aos participantes, exercida em um ou mais turnos ou DOCS.</li>
          <li><strong>Variante vermelha:</strong> quando oferece risco de morte ou de sequelas severas, é muito elaborada e bem desenvolvida, demandando comprometimento e tempo, como torneios ou competições.</li>
        </ul>
        <div class="talamasca-tip-box">
          <strong>Recompensa:</strong><br>
          Pontos de experiência (XP): 600 · 700 · 800 XP.<br>
          Gold: 150 se amarelo, 300 se vermelho.<br>
          <strong>Verde e amarela (1x prêmio):</strong> 2x artefatos roletáveis.<br>
          <strong>Vermelha (2x prêmios):</strong> 2x artefatos roletáveis · 1x arma ✩✩✩✩ · 1x pet suporte ✩✩✩✩ · 1x bênção ✩✩✩✩.
        </div>

        <h3>Mini-missão</h3>
        <p>São eventos que demandam exclusividade dos jogadores, oferecem algum tipo de risco e pertencem a alguma trama particular do narrador. Têm prazo mínimo de 1 semana e máximo de 2 semanas.</p>
        <ul>
          <li><strong>Variante verde:</strong> quando oferece risco moderado, executada com prazo curto e pouca participação.</li>
          <li><strong>Variante amarela:</strong> quando oferece risco de morte ou de sequelas severas, ocupa um prazo longo e tem boa participação dos jogadores.</li>
          <li><strong>Variante vermelha:</strong> quando oferece risco de morte ou de sequelas severas, ocupa um prazo longo e tem grande participação.</li>
        </ul>
        <div class="talamasca-tip-box">
          <strong>Recompensa:</strong><br>
          Pontos de experiência (XP): 700 · 800 · 900 XP.<br>
          Gold: 200 · 300 · 400.<br>
          <strong>Verde e amarela (2x prêmios):</strong> 2x artefatos roletáveis · 1x arma ✩✩✩✩ · 1x pet suporte ✩✩✩✩.<br>
          <strong>Vermelha (2x prêmios):</strong> 4x artefatos roletáveis · 1x artefato customizado ✩✩✩✩ · 1x arma ✩✩✩✩✩ · 1x pet suporte ✩✩✩✩✩ · 1x bênção ✩✩✩✩✩.
        </div>

        <h3>Missão (campanha)</h3>
        <p>São eventos que demandam exclusividade dos jogadores, oferecem obrigatoriamente risco de morte e sequelas e pertencem a alguma trama particular do narrador. Só podem ser feitos por Deuses e pela própria ADM. Ocupam prazo mínimo de 2 semanas e podem se estender até 1 mês.</p>
        <ul>
          <li><strong>Variante verde:</strong> quando executada com prazo curto e pouca participação.</li>
          <li><strong>Variante amarela:</strong> quando ocupa um prazo longo e tem boa participação dos jogadores.</li>
          <li><strong>Variante vermelha:</strong> quando ocupa um prazo longo e tem grande participação.</li>
        </ul>
        <div class="talamasca-tip-box">
          <strong>Recompensa:</strong><br>
          Pontos de experiência (XP): 1.000 · 1.500 · 2.000 XP.<br>
          Gold: 400 · 600 · 800.<br>
          <strong>Verde (2x prêmios):</strong> 4x artefatos roletáveis · 1x artefato customizado ✩✩✩✩✩ · 1x arma ✩✩✩✩✩ · 1x pet suporte ✩✩✩✩✩ · 1x bênção ✩✩✩✩✩.<br>
          <strong>Amarela (3x prêmios):</strong> 5x artefatos roletáveis · 1x artefato customizado ✩✩✩✩✩ · 1x arma ✩✩✩✩✩ · 1x pet suporte ✩✩✩✩✩ · 1x bênção ✩✩✩✩✩.<br>
          <strong>Vermelha (4x prêmios):</strong> 6x artefatos roletáveis · 1x artefato customizado ✩✩✩✩✩ · 1x arma ✩✩✩✩✩ · 1x pet suporte ✩✩✩✩✩ · 1x bênção ✩✩✩✩✩.
        </div>
        <p class="talamasca-source-note">Nos valores de XP e Gold, a ordem é sempre verde · amarela · vermelha.</p>
        <div class="talamasca-callout">
          <strong>Recebendo os prêmios:</strong> as recompensas de eventos são pedidas <strong>no Hub</strong>, em Solicitações. A equipe analisa e aprova, e o XP, o Gold e os itens caem direto na ficha e no Baú.
        </div>
      `
    },
    {
      id: "tipos-de-premiacao",
      categoryId: "eventos-premiacoes",
      title: "Tipos de premiação",
      subtitle: "Artefatos, armas, pet suporte, pet de combate e bênçãos",
      aliases: ["artefato", "arma", "pet suporte", "pet de combate", "bênção", "bencao", "ambidestro", "limite de criaturas", "invocações"],
      summary: "O que é cada tipo de prêmio que o organizador de um evento pode dar aos participantes.",
      source: "Regras & Sistemas 2026 — Tipos de Premiação",
      contentHtml: `
        <p>Todo evento dentro do RPG permite que o organizador premie os participantes, dando acesso a uma série de variantes valiosas. São elas:</p>
        <ul>
          <li><strong>Artefatos:</strong> são itens, objetos ou amuletos que não chegam a ser uma arma, mas oferecem poder interpretativo ao usuário.</li>
          <li><strong>Armas:</strong> são objetos físicos ou não físicos destinados a auxiliar o personagem em combate. Podem ser armaduras dedicadas, espadas, lanças, grimórios, cetros, arco e flechas, e muito mais. [Listas que citem poderes de ambidestria permitem usar 2 armas ao mesmo tempo, desde que possam ser usadas em mãos diferentes.]</li>
          <li><strong>Pet suporte:</strong> geralmente é um animal, espírito ou criatura fantástica de companhia que serve exclusivamente para buffar o aliado e/ou os aliados, assim como debuffar oponentes, para aumentar a jogabilidade da equipe. [Consomem o limite de criaturas em controle; o limite é de até 3, entre pets, clones e invocações.]</li>
          <li><strong>Pet de combate:</strong> é um animal, espírito ou criatura fantástica de companhia que serve para a batalha, geralmente usado pela classe Delírio como o centro da sua jogabilidade, buffando-o para atacar em seu lugar.</li>
          <li><strong>Bênçãos:</strong> são poderes ou magias concedidos pelo próprio narrador de maneira única e singular ao jogador, de modo que ele possa acessar um poder distinto de qualquer lista ou amplificar aqueles que já possui.</li>
        </ul>
      `
    },
    {
      id: "classificacao-das-premiacoes",
      categoryId: "eventos-premiacoes",
      title: "Classificação das premiações",
      subtitle: "Prêmios de 4, 5 e 6 estrelas: atributos, níveis interpretativos e como anotá-los",
      aliases: ["estrelas", "4 estrelas", "5 estrelas", "6 estrelas", "classificação", "classificacao", "raro", "buffar prêmio", "wallenstein", "colchetes", "1P", "2M"],
      summary: "A classificação em estrelas define o potencial de cada prêmio e se ele ainda pode ser melhorado. Inclui as regras de buff e o exemplo do Legado Wallenstein.",
      source: "Regras & Sistemas 2026 — Classificação das Premiações",
      contentHtml: `
        <p>Para tornar tudo mais transparente e intuitivo, todo prêmio vem acompanhado de uma classificação no final da sua descrição. É ela que determina o nível do seu potencial e também se ele ainda pode ser melhorado. Como citado no sistema de criação, e mais adiante neste mesmo sistema, os prêmios podem ser melhorados infinitamente por meio de eventos, a não ser que pertençam a uma classificação rara. Seguem abaixo as classificações:</p>

        <h3>✩✩✩✩ (4 estrelas)</h3>
        <p>São prêmios com potencial interpretativo muito forte. Eles agregam grandes mudanças ou elevam o nível do personagem a um mais promissor que o seu. A quantidade de bônus é alta.</p>
        <ul>
          <li><strong>Bênçãos terão:</strong> 6 atributos, com 1 Forte e 1 Moderado.</li>
          <li><strong>Armas terão:</strong> 4 atributos, com 2 Moderados.</li>
          <li><strong>Pet suporte:</strong> não terão atributos de combate; terão DEF e HP [25% do total de um personagem nível 5]; poderão dar buff ou debuff com 4 atributos, e com 1 Forte.</li>
          <li><strong>Pet de combate:</strong> terão os atributos base de um personagem de nível 5 [com seus atributos de ascensão para distribuir]; deverão ter 4 atributos além dos mencionados em poderes [ou absorvidos como atributos base, caso escolha que esses interpretativos sejam exclusivamente passivos], e com até 2 Moderados em nível interpretativo.</li>
        </ul>

        <h3>✩✩✩✩✩ (5 estrelas)</h3>
        <p>São prêmios com potencial interpretativo no mínimo perfeito. Eles trazem o ápice da natureza do poder escolhido, ou então trunfos peculiares que agregam atribuições a quem os usa. A sua bonificação é a mais alta, no mínimo de 6, sem um limite definido. Por essa razão, são muito valiosos.</p>
        <ul>
          <li><strong>Bênçãos terão:</strong>
            <ul>
              <li>Verde/amarelo: 10 atributos + 2 atributos especiais, com 2 Fortes interpretativos.</li>
              <li>Vermelho: 12 atributos + 3 atributos especiais, com 2 Perfeitos interpretativos.</li>
              <li>OBS: se forem de campanha principal, terão +2 atributos, +1 a +3 atributos especiais e +1 Perfeito interpretativo.</li>
            </ul>
          </li>
          <li><strong>Armas terão:</strong> 8 atributos, e 2 Moderados.
            <ul>
              <li>Verde/amarelo: 8 atributos, com 2 Fortes interpretativos.</li>
              <li>Vermelho: 10 atributos + 2 atributos especiais, com 1 Perfeito e 1 Forte interpretativos.</li>
              <li>OBS: se forem de campanha principal, terão +2 atributos, +1 a +2 atributos especiais, com +1 Perfeito interpretativo.</li>
            </ul>
          </li>
          <li><strong>Pet suporte:</strong> não terão atributos de combate; terão DEF e HP [25% do total de um personagem nível 5].
            <ul>
              <li>Verde/amarelo: 6 atributos, com 2 Fortes interpretativos.</li>
              <li>Vermelho: 8 atributos + 1 atributo especial, com 1 Perfeito e 1 Forte interpretativos.</li>
              <li>OBS: se forem de campanha principal, terão +2 atributos, +1 atributo especial, com +1 Forte interpretativo.</li>
            </ul>
          </li>
          <li><strong>Pet de combate:</strong> terão os atributos base de um personagem de nível 7 [com seus atributos de ascensão para distribuir].
            <ul>
              <li>Verde/amarelo: 6 atributos [podem ser somados aos atributos base se forem poderes passivos interpretativos], com 2 Fortes interpretativos.</li>
              <li>Vermelho: 6 atributos [podem ser somados aos atributos base se forem poderes passivos interpretativos] + 1 atributo especial, com 1 Perfeito e 1 Forte interpretativos.</li>
              <li>OBS: se forem de campanha principal, terão +2 atributos, +1 atributo especial e +1 Forte interpretativo.</li>
            </ul>
          </li>
        </ul>

        <h3>✩✩✩✩✩✩ (6 estrelas)</h3>
        <p>São os prêmios raros e únicos. Só podem ser conseguidos em eventos especiais e, por essa razão, têm um interpretativo muito singular e atípico, com bônus ainda mais atípicos. Eles podem fugir dos limites ou padrões, desde que tenham grandes limites e condições cabíveis. Por isso, não podem ser melhorados.</p>
        <ul><li>Basicamente, são prêmios que não podem ser upados nem refinados de maneira nenhuma!</li></ul>

        <div class="talamasca-callout danger">
          <strong>OBS¹:</strong> caso um prêmio já obtido que não seja de banner seja buffado, ele terá metade dos atributos do prêmio a ser usado (exemplo: se o prêmio dava 12 atributos, o buff do item que você já possui poderá ser de até 6 atributos). <strong>Isso não se aplica aos valores interpretativos do prêmio:</strong> se tinha 2 Fortes, continua tendo 2 Fortes.<br><br>
          <strong>OBS²:</strong> caso o prêmio de 4 ou 5 estrelas esteja com muitos atributos, ele poderá se tornar de 6 estrelas, não podendo mais receber atributos, mas ainda podendo receber buffs interpretativos.
        </div>

        <h3>Como anotar o nível interpretativo</h3>
        <p>Como todo prêmio tem, entre parênteses ou no mínimo em negrito, os atributos determinantes, o nível de poder interpretativo (para não ficar só baseado em inferências) é colocado no final da descrição, depois dos bônus determinantes e da classificação, entre colchetes "[ ]": a primeira letra do nível interpretativo e o número correspondente à quantidade dele que existe no prêmio.</p>

        <h3>Exemplo</h3>
        <p><strong>Legado Wallenstein:</strong> desde a antiguidade, o clã Wallenstein foi uma casa muito dedicada à coroa do Egito, mesmo nos tempos antigos, quando deuses caminhavam entre os homens, e depois que deixaram de caminhar. Por isso sempre foram conhecidos como uma força muito poderosa e próxima da nobreza, que poderia e deveria pôr fim a qualquer um que colocasse em risco os acordos sociais da aristocracia egípcia, a não ser que a própria estivesse contra o fluxo e o avanço da sociedade mágica. Por isso seus descendentes sempre foram muito poderosos, ligados intimamente a deuses que exerciam esse mesmo perfil em situações equivalentes. São abençoados naturalmente por esses mesmos deuses e, por isso, quase sempre acabam seguindo-os. Por isso todo herdeiro dessa dádiva tem cabelos ruivos e uma marca de nascença na coxa direita no formato de um leão. É a garantia física de um prodígio, mas também uma maldição, pois determina o seu futuro, determina o seu caminho. ✩✩✩✩✩ [1P | total: 4P2M]</p>
        <ul>
          <li><strong>Supremacia Mágica:</strong> um descendente do legado dos Wallenstein tem um poder acima do comum; mesmo as magias e individualidades mais simples sempre afloram nele com um potencial incomum. Elas duram mais que o esperado, seu potencial e raio de ação são praticamente dobrados, e seu grau destrutivo é digno de alguém a ser eleito faraó ou perto disso. Por isso a menor das regalias nas mãos de um mago do seu clã é, no mínimo, perigosa. (<strong>Dobra o valor interpretativo e de bonificações de todas as individualidades e magias da maga</strong>) ✩✩✩✩✩ [3P]</li>
          <li><strong>Príncipes da Guerra:</strong> o leão é a garantia da sua descendência e da ligação direta com os irmãos da guerra Sekhmet e Anhur. Por isso todo herdeiro do dom Wallenstein tem uma perícia nata para todo tipo de arte da guerrilha, sejam estilos de luta, armas ou itens. Isso garante a eles uma versatilidade no campo de batalha que os torna dignos de serem considerados guerreiros exímios, caráter único do seu nome e também razão pela qual são temidos. (<strong>Concede +1 Sucesso em suas ações derivadas de artes da guerrilha</strong>) ✩✩✩✩ [2M]</li>
        </ul>
      `
    },
    {
      id: "custos-e-limites",
      categoryId: "eventos-premiacoes",
      title: "Custos e limites",
      subtitle: "Quanto custa cada bônus determinante em atributos e qual o teto de cada um",
      aliases: ["custos", "limites", "teto", "limite taxa crit", "600%", "1200%", "limite dano crit", "atributo especial", "rd 70%", "dot", "roubo de vida", "multiplicador de dano", "inventário", "slot de benção", "cooldown"],
      summary: "Tabela oficial com o custo e o limite de cada bônus. Limite de taxa crítica: 600%. Limite de dano crítico: 1200%.",
      source: "Regras & Sistemas 2026 — Custos & Limites",
      contentHtml: `
        <p>Abaixo segue uma tabela com o valor de cada modalidade de bônus determinante que existe no RPG, para que você saiba quanto eles podem custar e como e quando pode ter acesso a eles. É importante estar atento aos limites que um jogador deve respeitar em cada bônus.</p>
        <div class="talamasca-callout">
          <strong>Atualização:</strong> o limite de <strong>taxa crítica</strong> passou a ser <strong>600%</strong>, e o de <strong>dano crítico</strong>, <strong>1200%</strong>.
        </div>
        <div class="table-microfilm-wrap">
          <table class="talamasca-table">
            <thead><tr><th>Atributo</th><th>Modalidade</th><th>Custo e limite</th></tr></thead>
            <tbody>
              <tr><td rowspan="2"><strong>Atributo base</strong> (ATK, DEF e HP)</td><td>+10 ATK; +10 DEF; +30 HP</td><td>1 atributo</td></tr>
              <tr><td>+10% ATK; +10% DEF; +10% HP</td><td>3 atributos ou 1 atributo especial</td></tr>
              <tr><td><strong>Redução de atributos base</strong></td><td>−10 ATK; −10 DEF; −30 HP</td><td>1 atributo<br><em>Limite: é possível deixar o alvo com até a metade do atributo original.</em></td></tr>
              <tr><td><strong>Bônus de dano</strong></td><td>+1 de bônus de dano</td><td>1 atributo especial<br><em>Limite: +30 de bônus de dano.</em></td></tr>
              <tr><td rowspan="2"><strong>Velocidade (SPD)</strong></td><td>+3 SPD<br><small>OBS: quando em missões vermelhas ou da trama, será dobrado.</small></td><td>1 atributo</td></tr>
              <tr><td>+10% SPD</td><td>3 atributos ou 1 atributo especial</td></tr>
              <tr><td rowspan="2"><strong>Mana TOTAL</strong></td><td>+20 de mana TOTAL</td><td>1 atributo<br><em>Limite: +200 de mana TOTAL.</em></td></tr>
              <tr><td>x2 de mana TOTAL</td><td>12 atributos ou 4 atributos especiais<br><em>Limite: x2 de mana TOTAL.</em></td></tr>
              <tr><td rowspan="2"><strong>Redução do consumo de mana</strong></td><td>−10 de consumo de mana</td><td>2 atributos<br><em>Limite: −80 de consumo de mana.</em></td></tr>
              <tr><td>−½ de consumo de mana</td><td>12 atributos ou 4 atributos especiais<br><em>Limite: −½ de consumo de mana.</em></td></tr>
              <tr><td><strong>Regeneração de mana ativa</strong></td><td>10% do ATK ou DEF; 5% do HP<br><small>OBS: será tratada como um poder novo, não podendo ser combinada com outro.</small></td><td>2 atributos<br><em>Limite: 50% se ATK ou DEF; 30% se HP.</em></td></tr>
              <tr><td><strong>Regeneração de mana passiva</strong></td><td>+10 de mana</td><td>1 atributo<br><em>Limite: +50 de mana.</em></td></tr>
              <tr><td><strong>Taxa crítica</strong> (TAXA CRIT)</td><td>+10% TAXA CRIT</td><td>1 atributo<br><em>Limite: 600% TAXA CRIT.</em></td></tr>
              <tr><td><strong>Dano crítico</strong> (DANO CRIT)</td><td>+10% DANO CRIT</td><td>1 atributo<br><em>Limite: 1200% DANO CRIT.</em></td></tr>
              <tr><td><strong>Ataque absoluto</strong></td><td>Ataca 1x sem chance de defesa<br><small>OBS: apenas defesa absoluta defende.</small></td><td>6 atributos ou 2 especiais<br><em>Limite: 2 defesas absolutas.</em></td></tr>
              <tr><td><strong>Regeneração de HP passiva</strong></td><td>+10 HP por turno</td><td>1 atributo<br><em>Limite: +100 HP por turno.</em></td></tr>
              <tr><td><strong>Regeneração de HP ativa</strong></td><td>10% de ATK ou DEF como cura de HP; 5% de HP como cura de HP<br><small>OBS: será tratada como um poder novo, não podendo ser combinada com outro.</small></td><td>1 atributo<br><em>Limite: 100% se ATK ou DEF; 60% se HP.</em></td></tr>
              <tr><td><strong>Eficiência de cura</strong></td><td>5% de eficiência de cura<br><small>OBS: aplica-se a poderes de cura já existentes.</small></td><td>2 atributos<br><em>Limite: +100% de eficiência de cura.</em></td></tr>
              <tr><td><strong>Geração de escudo</strong></td><td>10% de ATK ou DEF como escudo; 5% de HP como escudo<br><small>OBS: será tratada como um poder novo, não podendo ser combinada com outro.</small></td><td>1 atributo<br><em>Limite: 100% se ATK ou DEF; 60% se HP.</em></td></tr>
              <tr><td><strong>Eficiência de escudo</strong></td><td>5% de eficiência de escudo<br><small>OBS: aplica-se a poderes de escudo já existentes.</small></td><td>2 atributos<br><em>Limite: +100% de eficiência de escudo.</em></td></tr>
              <tr><td><strong>Defesa absoluta</strong></td><td>Defende 1x qualquer ataque</td><td>6 atributos ou 2 especiais<br><em>Limite: 2 defesas absolutas.</em></td></tr>
              <tr><td><strong>Redução de dano</strong> (RD)</td><td>5% RD</td><td>3 atributos ou 1 atributo especial<br><em>Limite: 70% RD.</em></td></tr>
              <tr><td><strong>Redução de dano verdadeiro</strong></td><td>−1 bônus de dano</td><td>1 atributo especial<br><em>Limite: −20 bônus de dano.</em></td></tr>
              <tr><td><strong>Multiplicador de DOT</strong></td><td>2% DOT, baseado em ATK ou DEF; 1% DOT, baseado em HP</td><td>1 atributo<br><em>Limite: 20% se ATK ou DEF; 10% se HP.</em></td></tr>
              <tr><td><strong>Eficiência de DOT</strong></td><td>+1% DOT</td><td>1 atributo especial<br><em>Limite: 20% se ATK ou DEF; 10% se HP.</em></td></tr>
              <tr><td><strong>Dano total de DOT</strong></td><td>+5% de dano final em DOT</td><td>1 atributo especial<br><em>Limite: 75% final em DOT.</em></td></tr>
              <tr><td><strong>Sucesso em teste específico</strong></td><td>+1 sucesso ou −1 sucesso em teste de X [carisma, vontade, etc.]</td><td>3 atributos ou 1 atributo especial<br><em>Limite: +5 ou −5 sucessos.</em></td></tr>
              <tr><td><strong>Sucesso em quaisquer testes</strong></td><td>+1 sucesso ou −1 sucesso em testes</td><td>2 atributos especiais<br><em>Limite: +5 ou −5 sucessos.</em></td></tr>
              <tr><td><strong>Sucessos em combate</strong></td><td>+1 sucesso ou −1 sucesso</td><td>2 atributos especiais<br><em>Limite: +10 ou −6 sucessos.</em></td></tr>
              <tr><td><strong>Dados</strong></td><td>+1 dado ou −1 dado</td><td>1 atributo especial<br><em>Limite: +13 [25 dados] ou −10 dados [10 dados].</em></td></tr>
              <tr><td><strong>Alteração de dificuldade</strong></td><td>+1 de dificuldade ou −1 de dificuldade</td><td>1 atributo especial<br><em>Limite: −6 [2 de dificuldade] ou +5 [8 de dificuldade].</em></td></tr>
              <tr><td rowspan="2"><strong>Reduzir cooldown</strong></td><td>−1 turno de cooldown</td><td>3 atributos ou 1 atributo especial<br><em>Limite: −4 de cooldown.</em></td></tr>
              <tr><td>Quebra o cooldown pela metade (−½)</td><td>12 atributos ou 4 atributos especiais<br><em>Limite: −½ de cooldown.</em></td></tr>
              <tr><td><strong>Energia infinita</strong></td><td>—<br><small>OBS: será tratada como um poder novo, não podendo ser combinada com outro.</small></td><td>6 atributos especiais</td></tr>
              <tr><td><strong>Roubo de vida</strong></td><td>5% do dano causado como HP<br><small>OBS: será tratado como um poder novo, não podendo ser combinado com outro.</small></td><td>3 atributos ou 1 atributo especial<br><em>Limite: 50% do dano causado.</em></td></tr>
              <tr><td><strong>Roubo de mana</strong></td><td>5% do dano causado como mana<br><small>OBS: será tratado como um poder novo, não podendo ser combinado com outro.</small></td><td>3 atributos ou 1 atributo especial<br><em>Limite: 50% do dano causado.</em></td></tr>
              <tr><td><strong>Transferência de atributos</strong> [pet e invocação]</td><td>10% dos atributos totais</td><td>3 atributos ou 1 atributo especial<br><em>Limite: 100% dos atributos.</em></td></tr>
              <tr><td><strong>Aumento de individualidades</strong></td><td>+1 individualidade por nível</td><td>4 atributos especiais<br><em>Limite: +3 individualidades por nível.</em></td></tr>
              <tr><td><strong>Dobro de poderes</strong></td><td>Dobrar o poder interpretativo e o bônus da sua lista de individualidades/magias</td><td>4 atributos especiais<br><em>Limite: x2 power.</em></td></tr>
              <tr><td><strong>Aumentar o inventário</strong></td><td>+1 slot de bênção<br><small>OBS: bênção, arma ou pet.</small></td><td>3 Perfeitos<br><em>Limite: até +2 slots.</em></td></tr>
              <tr><td rowspan="2"><strong>Bônus de condição</strong></td><td>+1 atributo básico a cada 3x perdidos/causados/ganhos<br>+1 atributo básico a cada 5x perdidos/causados/ganhos</td><td>6 atributos<br>12 atributos</td></tr>
              <tr><td>+1 atributo especial a cada 3x perdidos/causados/ganhos<br>+1 atributo especial a cada 5x perdidos/causados/ganhos</td><td>6 atributos + 2 especiais<br>12 atributos + 4 especiais</td></tr>
              <tr><td><strong>Multiplicador de dano</strong></td><td>+0,1 de ATK/DEF/HP<br><small>OBS: será tratado como um poder novo, não podendo ser combinado com outro. Na primeira vez que for adicionado a uma bênção, consome 1 Perfeito; não é preciso um novo para aumentar o atributo.</small></td><td>+2 especiais<br><em>Limite: até +1,5.</em><br><em>Travado: apenas por meio da campanha principal.</em></td></tr>
            </tbody>
          </table>
        </div>
      `
    },

    // ══════════════════════════════════════════════════════════
    // SEÇÃO 06 · CRIAÇÃO
    // ══════════════════════════════════════════════════════════
    {
      id: "forja-e-fabricacoes",
      categoryId: "criacao",
      title: "Sistema de criação: forja e fabricações",
      subtitle: "Níveis de forjador, autômatos, shabtis, materiais e cobrança de refino",
      aliases: ["criação", "criacao", "forja", "forjador", "fabricação", "autômato", "automato", "shabti", "shabit", "escultor", "materiais", "kg", "refino", "refinamento", "hefesto", "atena"],
      summary: "Forjadores (filhos de Hefesto/Vulcano, Atena e os Saus) criam armas, itens, autômatos e shabtis conforme o seu nível. O refino agora é feito no Hub.",
      source: "Regras & Sistemas 2026 — Sistema de Criação",
      contentHtml: `
        <p>O sistema de criação é destinado àqueles que têm algum poder relacionado à fabricação e otimização de armas, artefatos, poções, remédios e pets. Cada tipo de criação/otimização está separado por classe, então leia atentamente para entender em qual você se encaixa e como deverá proceder.</p>

        <h3>Forja e fabricações</h3>
        <p>Os forjadores são personagens capacitados com o poder de criar instrumentos mecânicos capazes de assumir grandes papéis na evolução de personagens em seus respectivos objetivos. São capazes de criar armas, itens, autômatos e shabtis. São eles os filhos de <em>Hefesto/Vulcano, Atena e os Saus</em>, e devem seguir as orientações a seguir:</p>
        <div class="table-microfilm-wrap">
          <table class="talamasca-table">
            <thead><tr><th>Nível</th><th>Poderes interpretativos</th><th>Atributos</th><th>Autômatos/Shabtis</th></tr></thead>
            <tbody>
              <tr><td>Forjador Iniciante [3 e 4]</td><td>1 Brando</td><td>1 atributo</td><td>Sem capacidade combativa</td></tr>
              <tr><td>Forjador Intermediário [5 e 6]</td><td>2 Brandos</td><td>2 atributos</td><td>Status de um semideus n.4</td></tr>
              <tr><td>Forjador Mestre [7]</td><td>1 Moderado + 1 Brando</td><td>3 atributos</td><td>Status de um semideus n.8</td></tr>
              <tr><td>Forjador Supremo [10+]</td><td>1 Forte</td><td>4 atributos</td><td>Status de um semideus n.10</td></tr>
            </tbody>
          </table>
        </div>
        <ul>
          <li><strong>Poderes interpretativos:</strong> são os lança-chamas, entre outras capacidades mecanicamente possíveis de serem atribuídas por meio de forjas.</li>
          <li><strong>Bonificações:</strong> são alteradores na rolagem de dados ao usar as criações, explicados no sistema de premiações.</li>
          <li><strong>Autômatos:</strong> são robôs com inteligência artificial atribuída pelos poderes do forjador.</li>
          <li><strong>Shabtis:</strong> são bonecos de argila vivos feitos pelos egípcios.</li>
          <li><strong>10+:</strong> estar no nível 10 e ganhar reconhecimento do pai/mãe e da ADM na forma de uma bênção de ascensão.</li>
        </ul>
        <p>A quantidade de material a ser usada varia de acordo com o objetivo da criação, e ela é indicada na avaliação das criações. Os critérios de avaliação do controle são: no caso de armas de pequeno porte, como adagas, facas, manoplas, capacetes, etc. [requerem 3 kg]; armas de médio porte, como espadas, lanças, peitoral, escudo, etc. [requerem 7 kg]; armas de grande porte, como armaduras, canhão, etc. [requerem de 15 a 30 kg]. Lembrando que, a depender da complexidade da criação, esses valores podem ser aumentados ou reduzidos, servindo apenas de parâmetro para os jogadores.</p>
        <p>Escultores fazem shabtis. Eles são moldados com argila e depois viram esculturas de bolso da forma final desejada pelo criador. Sempre que ele tem a intenção de usá-la, ele a ativa por um comando de voz definido no processo de criação. Depois de ser usada, ela volta à sua forma retrátil de bolso novamente; mas, assim como um autômato, precisa ser reparada e, às vezes, fica inviabilizada a depender do dano. Os critérios de avaliação variam entre comuns [1 kg], de combate de pequeno porte [2 kg], de combate de médio porte [3 kg], de grande porte [4 kg, <em>vetado a supremos</em>] e clone perfeito [5 kg, <em>vetado a supremos</em>].</p>
        <div class="talamasca-tip-box">
          <strong>Refino no Hub:</strong> o refino agora é feito direto no Hub e substitui a cobrança de 50 Golds por trabalho dos criadores. Cada nível consome uma cópia R1 livre do mesmo item, chegando normalmente até R5 (ou R6 em casos especiais).
        </div>
      `
    },
    {
      id: "encantamento-de-objetos",
      categoryId: "criacao",
      title: "Encantamento de objetos",
      subtitle: "Níveis de encantador, origem dos encantamentos e refino de bênçãos de banner",
      aliases: ["encantamento", "encantador", "hécate", "hecate", "circe", "loki", "gullveig", "grimório", "grimorio", "othila", "shesh"],
      summary: "Encantadores (filhos de Hécate/Trívia, Circe, Utgardlok, Loki, Gullveig e os Saus) acrescentam magias a objetos conforme o nível e podem refinar bênçãos do banner sazonal.",
      source: "Regras & Sistemas 2026 — Encantamento de Objetos",
      contentHtml: `
        <p>Os encantamentos são a perícia de criação que permite aos criadores acrescentar magias a determinados objetos e, assim, fortificá-los. São semideuses e magos relacionados ao dom de encantamento: semideuses filhos de <em>Hécate/Trívia, Circe, Utgardlok, Loki, Gullveig e os Saus</em>. Devem seguir as orientações a seguir:</p>
        <div class="table-microfilm-wrap">
          <table class="talamasca-table">
            <thead><tr><th>Nível</th><th>Descrição</th><th>Poderes interpretativos</th><th>Atributo</th></tr></thead>
            <tbody>
              <tr><td>Encantador Iniciante</td><td>Neste nível de encantamento, eles se mostram apenas capazes de adicionar formas retráteis e a capacidade de melhorar um pouco as habilidades que um item já possui.</td><td>1 Brando</td><td>1 atributo</td></tr>
              <tr><td>Encantador Intermediário</td><td>Agora adquirem a capacidade de atribuir habilidades novas a um artefato [restrito ao seu grimório de magias].</td><td>1 Moderado</td><td>2 atributos</td></tr>
              <tr><td>Encantador Mestre</td><td>Agora adquirem a capacidade de imbuir ainda mais habilidades novas a um artefato ou arma [restrito ao seu grimório de magias].</td><td>2 Moderados + 1 Brando</td><td>3 atributos</td></tr>
              <tr><td>Encantador Supremo</td><td>No seu máximo, são capazes de melhorar qualquer tipo de objeto e, a depender da sua bênção, poderão ter formas alternativas de fonte para os seus buffs [poderão buscar poderes de outros lugares a depender da bênção, como sangue de semideuses, materiais, etc.].</td><td>1 Forte + 1 Moderado</td><td>4 atributos</td></tr>
            </tbody>
          </table>
        </div>
        <ul>
          <li><strong>Poderes interpretativos:</strong> são a interpretação dos atributos aplicados. Por exemplo: resistência, cinesias, telepatias, clarividência limitada, etc.</li>
          <li><strong>Origem:</strong> seus encantamentos são baseados nas magias que eles têm em seus grimórios/othila/shesh. Sujeito a nerf de acordo com o nível interpretativo do encantador [não é copia e cola; são a base, o tema de onde vão costurar o que querem dar ao item].</li>
        </ul>
        <div class="talamasca-tip-box">
          <strong>Refino no Hub:</strong> o refino das <strong>Bênçãos do Banner Sazonal</strong>, que antes era feito por encantadores ao custo de 50 Golds, agora é feito direto no Hub. Cada nível consome uma cópia R1 livre da mesma bênção.
        </div>
      `
    },
    {
      id: "boticario-e-alquimicos",
      categoryId: "criacao",
      title: "Boticário e alquímicos",
      subtitle: "Venenos, poções e remédios de uso único, e o que muda na alquimia",
      aliases: ["boticário", "boticario", "alquimia", "alquimista", "poção", "pocao", "veneno", "remédio", "uso único", "deméter", "perséfone", "asclépio"],
      summary: "Boticários (filhos de Deméter/Ceres, Perséfone/Proserpina, Asclépio/Esculápio, Circe, Hécate/Trívia, Loki, Gullveig e os Sunus) criam venenos, poções e remédios de uso único.",
      source: "Regras & Sistemas 2026 — Boticário & Alquímicos",
      contentHtml: `
        <p>Os boticários são aqueles que demonstram habilidades para a criação de venenos, poções e remédios. São semideuses relacionados a esse dom de criação os filhos de <em>Deméter/Ceres, Perséfone/Proserpina, Asclépio/Esculápio, Circe, Hécate/Trívia, Loki, Gullveig e os Sunus</em>. Devem seguir as orientações a seguir:</p>
        <div class="table-microfilm-wrap">
          <table class="talamasca-table">
            <thead><tr><th>Nível</th><th>Descrição</th><th>Poderes interpretativos</th><th>Atributos</th></tr></thead>
            <tbody>
              <tr><td>Boticário Iniciante</td><td>São capazes de fazer pequenas soluções e alguns remédios que podem ajudar na cicatrização mais rápida de ferimentos. [USO ÚNICO]</td><td>1 Brando</td><td>2 atributos</td></tr>
              <tr><td>Boticário Intermediário</td><td>Suas criações começam a demonstrar um maior potencial; agora são capazes de criar tanto remédios quanto venenos, se tiverem os materiais corretos. [USO ÚNICO]</td><td>1 Moderado</td><td>3 atributos</td></tr>
              <tr><td>Boticário Mestre</td><td>Sua capacidade aumenta, sendo agora capaz de criar algumas soluções que têm como função a melhoria das condições físicas de quem as ingere [USO ÚNICO], ou então atribuir essas soluções a instrumentos e armas.</td><td>1 Forte</td><td>4 atributos</td></tr>
              <tr><td>Boticário Supremo</td><td>No ápice do seu poder, suas soluções podem atribuir poderes de outros semideuses e magos, desde que haja manipulação de material genético suficiente de outro personagem. [USO ÚNICO]</td><td>1 Perfeito</td><td>5 atributos</td></tr>
            </tbody>
          </table>
        </div>
        <ul>
          <li><strong>Uso único:</strong> significa que as criações de um boticário, assim que são usadas, devem ser excluídas da ficha do personagem, pois só podem ser usadas uma vez.</li>
          <li><strong>Poderes interpretativos:</strong> são venenos e curas, entre outras capacidades químicas possíveis de serem atribuídas por meio de soluções.</li>
          <li><strong>Alquimia:</strong> quando for derivada de alquimia, e não dos meios convencionais [boticário], as produções podem conter as magias que eles têm em seus grimórios/othila/shesh. Sujeito a nerf de acordo com o nível interpretativo do alquimista.</li>
        </ul>
      `
    },
    {
      id: "manipulacao-genetica",
      categoryId: "criacao",
      title: "Manipulação genética",
      subtitle: "Mutações em pets, níveis de manipulador e refino de pets do banner",
      aliases: ["manipulação genética", "manipulacao genetica", "manipulador", "mutação", "mutacao", "pet", "asclépio", "sunu", "dragão"],
      summary: "Manipuladores (filhos de Asclépio/Esculápio e os Sunu) melhoram pets com rolagem padrão ou bonificações e poderes interpretativos, nunca as duas coisas.",
      source: "Regras & Sistemas 2026 — Manipulação Genética",
      contentHtml: `
        <p>São mutações específicas que um número muito restrito de personagens é capaz de exercer, a fim de melhorar pets, seja para atribuir rolagem padrão caso eles não a tenham, seja para dar bonificações e poderes interpretativos. São personagens capazes desse tipo de feito: semideuses filhos de <em>Asclépio/Esculápio e os Sunu</em>. Devem seguir as orientações a seguir:</p>
        <div class="table-microfilm-wrap">
          <table class="talamasca-table">
            <thead><tr><th>Nível</th><th>Poderes interpretativos</th><th>Atributos</th><th>Atributo raro</th></tr></thead>
            <tbody>
              <tr><td>Manipulador Iniciante</td><td>1 Brando</td><td>1 atributo</td><td>+1 dado</td></tr>
              <tr><td>Manipulador Intermediário</td><td>1 Moderado</td><td>2 atributos</td><td>+1 dado</td></tr>
              <tr><td>Manipulador Mestre</td><td>1 Forte</td><td>3 atributos</td><td>+1 dado e −1 dificuldade</td></tr>
              <tr><td>Manipulador Supremo</td><td>1 Perfeito</td><td>4 atributos</td><td>+2 dados e −1 dificuldade</td></tr>
            </tbody>
          </table>
        </div>
        <ul>
          <li><strong>Limite:</strong> a mutação de um manipulador deve escolher entre dar rolagem com poderes ou atribuir bonificação e poderes; jamais as duas.</li>
          <li><strong>Poderes interpretativos:</strong> são os lança-chamas de um dragão, entre outras capacidades biologicamente possíveis por meio de mutações.</li>
          <li><strong>Origem:</strong> são necessárias amostras genéticas de criaturas que tenham o poder a ser concebido. Sujeito a nerf de acordo com o nível interpretativo do manipulador.</li>
        </ul>
        <div class="talamasca-tip-box">
          <strong>Refino no Hub:</strong> o refino de <strong>Pets de combate e Pets suporte do Banner Sazonal</strong>, que antes era feito por manipuladores genéticos ao custo de 50 Golds, agora é feito direto no Hub. Cada nível consome uma cópia R1 livre do mesmo pet.
        </div>
      `
    },
    {
      id: "limites-dos-fabricantes",
      categoryId: "criacao",
      title: "Limites dos fabricantes e suas otimizações",
      subtitle: "Quem pode upar o quê e até quantos atributos cada criação pode ter",
      aliases: ["limites", "fabricantes", "otimização", "upar", "quem pode upar", "melhoria da mesma natureza"],
      summary: "Tabela de quem pode melhorar cada criação e o limite de atributos por criador e nível. Prêmios de eventos podem melhorar objetos sem limite.",
      source: "Regras & Sistemas 2026 — Limites dos Fabricantes",
      contentHtml: `
        <p>Toda criação tem um teto. A tabela abaixo mostra, para cada tipo de criador e cada nível, quem pode melhorar (upar) uma criação já feita e quantos atributos ela pode ter no máximo:</p>
        <div class="table-microfilm-wrap">
          <table class="talamasca-table">
            <thead><tr><th>Criador</th><th>Nível</th><th>Quem pode upar</th><th>Limite</th></tr></thead>
            <tbody>
              <tr><td rowspan="4"><strong>Forjador</strong></td><td>Iniciante</td><td>Forjadores de nível maior e encantadores.</td><td>Possuir até 4 atributos</td></tr>
              <tr><td>Intermediário</td><td>Forjadores de nível maior e outros criadores.</td><td>Possuir até 6 atributos</td></tr>
              <tr><td>Mestre</td><td>Forjadores de nível supremo e outros criadores.</td><td>Possuir até 7 atributos</td></tr>
              <tr><td>Supremo</td><td>Outros criadores supremos.</td><td>Possuir até 9 atributos</td></tr>
              <tr><td rowspan="4"><strong>Encantador</strong></td><td>Iniciante</td><td>Encantadores Mestres ou Supremos.</td><td>Possuir até 4 atributos</td></tr>
              <tr><td>Intermediário</td><td>Encantadores Supremos.</td><td>Possuir até 6 atributos</td></tr>
              <tr><td>Mestre</td><td>Encantadores Supremos.</td><td>Possuir até 7 atributos</td></tr>
              <tr><td>Supremo</td><td>Ninguém.</td><td>Possuir até 9 atributos</td></tr>
              <tr><td rowspan="4"><strong>Boticário</strong></td><td>Iniciante</td><td>Boticários Mestres ou Supremos.</td><td>Possuir até 4 atributos</td></tr>
              <tr><td>Intermediário</td><td>Boticários Supremos.</td><td>Possuir até 4 atributos</td></tr>
              <tr><td>Mestre</td><td>Boticários Supremos.</td><td>Possuir até 5 atributos</td></tr>
              <tr><td>Supremo</td><td>Ninguém.</td><td>Possuir até 5 atributos</td></tr>
              <tr><td rowspan="4"><strong>Manipulador</strong></td><td>Iniciante</td><td>Manipuladores de nível maior.</td><td rowspan="4">Só podem ser upados uma única vez caso já tenham rolagem, ou tenham vindo a obtê-la por mutação.</td></tr>
              <tr><td>Intermediário</td><td>Manipuladores de nível maior.</td></tr>
              <tr><td>Mestre</td><td>Manipuladores Supremos.</td></tr>
              <tr><td>Supremo</td><td>Manipuladores Supremos.</td></tr>
            </tbody>
          </table>
        </div>
        <ul>
          <li><strong>Quem pode upar:</strong> essa coluna indica quem pode melhorar o item que já tenha sido upado ou feito pelo criador em questão.</li>
          <li><strong>Melhoria da mesma natureza:</strong> qualquer objeto que já tenha sido criado ou melhorado por um tipo de criação só pode ser melhorado pela mesma apenas uma vez. <em>Por exemplo: uma arma criada por um forjador pode ser upada apenas mais 1 vez por meio de forja.</em></li>
          <li><strong>Eventos:</strong> premiações em eventos podem ser usadas para melhorar objetos e pets, e estas não têm limites: podem ser melhorados quantas vezes forem do agrado do jogador.</li>
        </ul>
      `
    },

    // ══════════════════════════════════════════════════════════
    // SEÇÃO 07 · FILIAÇÕES E CLASSES
    // ══════════════════════════════════════════════════════════
    {
      id: "filiacoes-e-afiliacoes",
      categoryId: "filiacoes-classes",
      title: "Filiações e afiliações",
      subtitle: "Semideuses, semideuses bruxos e grupos divinos",
      aliases: ["filiação", "filiacao", "afiliação", "afiliacao", "semideus", "semideuses", "bruxo", "grupo divino", "individualidades", "3 individualidades", "ritual de iniciação"],
      summary: "Filiação: descendentes de deuses. Afiliação: seguidores por ritual. Semideuses têm 3 individualidades por nível; grupos divinos dão +1 por nível, com pelo menos 1 da afiliação.",
      source: "Regras & Sistemas 2026 — Filiações e Afiliações",
      contentHtml: `
        <p><strong>Filiação</strong> é a categoria mais comum: são personagens descendentes de deuses, herdeiros diretos de entidades divinas, que acessam os poderes herdados à medida que sobem de nível e se tornam mais fortes. As <strong>Afiliações</strong> são uma categoria de personagens que não têm vínculo consanguíneo, mas genético, mediante um ritual de iniciação; ou seja, o personagem aceita ser seguidor de uma determinada divindade e, a partir daí, recebe voluntariamente as individualidades dela, que alteram o seu código genético e o tornam ligado à entidade divina.</p>

        <h3>Semideuses</h3>
        <p>Todo semideus, filho de um deus e de um humano, tem direito a acesso às individualidades apresentadas na lista do deus do qual é inscrito e aceito. As listas são divididas em 7 níveis diferentes, com poderes de todos os níveis de pontuação interpretativa e uma quantidade considerável de bônus, com vantagens de destaque para os grandes de cada etnia. Seus descendentes podem ter acesso a exatamente <strong>3 individualidades</strong> por nível.</p>

        <h3>Semideuses bruxos</h3>
        <p>Todo semideus filho de um deus relacionado à magia e de um humano tem direito a acesso às individualidades apresentadas na lista do deus do qual é inscrito e aceito, além de uma ou mais listas complementares relacionadas ao uso da magia dentro do aspecto da sua filiação.</p>

        <h3>Grupos divinos ou afiliações divinas</h3>
        <p>No RPG, alguns deuses organizam grupos com propósitos específicos e regras rígidas. Eles são regidos por entidades divinas específicas e, por meio de um pacto, concedem aos seus seguidores dons únicos, por vezes à custa do próprio poder. Todo personagem que passar a pertencer a grupos divinos que tenham lista de poderes ganha <strong>+1 individualidade por nível</strong>, mas é obrigado a ter <strong>no mínimo 1 individualidade</strong> da lista de poderes [quando houver] dessa afiliação na sua lista, por nível.</p>
      `
    },
    {
      id: "classes-e-principios-celestiais",
      categoryId: "filiacoes-classes",
      title: "As classes e os princípios celestiais",
      subtitle: "Os Perpétuos e o foco de cada uma das sete classes",
      aliases: ["classes", "classe", "perpétuos", "perpetuos", "destruição", "destino", "morte", "sonho", "desespero", "desejo", "delírio", "princípios celestiais", "até 2 perpétuos", "dps", "tank", "suporte"],
      summary: "Toda lista é compatível com até 2 Perpétuos (classes), que determinam as bênçãos que o personagem pode usar. Cada classe tem um foco de build.",
      source: "Regras & Sistemas 2026 — As Classes & Os Princípios Celestiais",
      contentHtml: `
        <p>No RPG, todo semideus, além de ser regido pelos celestiais (que são o nome das raças dos deuses), também é regido pelas forças cósmicas que estão acima deles. Essas forças são regras impostas na realidade, como equações que controlam algo mais poderoso que o próprio destino, o tempo ou o espaço. Os deuses os chamam de princípios celestiais, mas os mortais os chamam de <strong><em>Os Perpétuos</em></strong>.</p>
        <p>São forças da criação que existem alheias a ela e dentro dela, como algo indissociado, destinado a contemplar o nascimento e a morte de todas as coisas no seu próprio tempo e da sua própria maneira. São singulares, estranhos e, no mínimo, intrigantes, mas extremamente raros. Pouco se sabe dentro do jogo, mas, para nós, jogadores off-line, teremos que respeitar uma regra muito clara e específica: toda e qualquer lista terá compatibilidade com <em>até 2 Perpétuos</em>, que aqui vamos chamar de classes. Isso vai determinar quais tipos de bênção esse personagem poderá usar e, sendo esse o principal recurso da sua build, poderá determinar totalmente a construção desse personagem dentro do jogo.</p>
        <p>As classes carregam o nome dos Perpétuos, sendo elas:</p>
        <ul>
          <li><strong>Destruição:</strong> cujo foco é escalar com ATK e crítico;</li>
          <li><strong>Destino:</strong> cujo foco é escalar com DEF e crítico;</li>
          <li><strong>Morte:</strong> cujo foco é escalar com HP e crítico;</li>
          <li><strong>Sonho:</strong> cujo foco é conceder buffs poderosos;</li>
          <li><strong>Desespero:</strong> cujo foco é conceder debuffs poderosos e DOT (<em>damage over time</em>);</li>
          <li><strong>Desejo:</strong> cujo foco é conceder curas poderosas e buffs/debuffs menores;</li>
          <li><strong>Delírio:</strong> cujo foco é amplificar a jogabilidade do uso de invocações/pets de combate.</li>
        </ul>
      `
    },
    {
      id: "duvidas-frequentes",
      categoryId: "filiacoes-classes",
      title: "Dúvidas frequentes",
      subtitle: "Ordem das individualidades, poderes de continuidade e bênçãos de outras classes",
      aliases: ["dúvidas", "duvidas", "faq", "perguntas", "continuidade", "umbracinese", "poder II", "nível anterior", "bênção de outra classe"],
      summary: "As individualidades são escolhidas na ordem do nível; poderes de continuidade exigem as etapas anteriores; não se usa bênção de classe fora da sua lista.",
      source: "Regras & Sistemas 2026 — Dúvidas Frequentes",
      contentHtml: `
        <h3>Posso escolher qualquer individualidade em qualquer ordem?</h3>
        <p>Não. Deve-se escolher somente a quantidade determinada acima, e na ordem de nível correspondente.</p>

        <h3>Se alguma das individualidades do nível que alcancei não me agradar, posso escolher uma de um nível anterior?</h3>
        <p>Não. Você pode escolher apenas individualidades do nível que alcançou.</p>

        <h3>Como funcionam os poderes/magias de continuidade?</h3>
        <p>É simples: poderes ou magias de continuidade são como um poder que inicialmente é simples, mas que, com o passar do tempo e o seu amadurecimento, se torna mais forte. Por isso são divididos em etapas. Para ter um controle aprimorado dele, é preciso tê-lo escolhido inicialmente.</p>
        <p><strong>Exemplo:</strong> um filho de Hades decide que vai manipular as sombras, por isso escolhe "Umbracinese I", porque se interessou muito pela "Umbracinese Final" da lista. Isso só será possível se antes ele escolher "Umbracinese II".</p>
        <p>Basicamente, um poder "II" jamais poderá ser escolhido se o "I" não tiver sido escolhido antes. O mesmo vale para o "Final" ou "III", caso venham a existir.</p>

        <h3>Posso usar bênçãos e artefatos de uma classe que não é a minha?</h3>
        <p>Não: você não pode usar bênçãos e artefatos de uma classe que não pertença à sua lista. Se ela estiver restrita, por exemplo, a Desespero e Morte, você não poderá usar Destino, Destruição, etc.</p>
      `
    },

    // ══════════════════════════════════════════════════════════
    // SEÇÃO 08 · MISSÕES FIXAS
    // ══════════════════════════════════════════════════════════
    {
      id: "missoes-fixas",
      categoryId: "missoes-fixas",
      title: "Missões fixas",
      subtitle: "As 11 atividades permanentes de Londres: frequência, local, indicação, entrega e recompensa",
      aliases: ["missões fixas", "missoes fixas", "patrulha", "tâmisa", "whitechapel", "highgate", "esgotos", "soho", "metrô", "diplomacia", "museu britânico", "keres", "hyde park", "turnos aleatórios", "3x por semana", "8 linhas", "40 palavras"],
      summary: "Atividades que não mudam com as atualizações do RPG e rendem XP e Gold. A entrega é registrada no Hub com o link dos turnos.",
      source: "Regras & Sistemas 2026 — Missões Fixas",
      contentHtml: `
        <p>São o conjunto de atividades coletivas ou individuais que podem gerar XP e Gold dentro do RPG. Pode-se dizer que são uma forma de pontuar outros atos que não são mensuráveis nos outros espaços de pontuação (como nas atividades da própria Égide ou nas missões sazonais). Essas atividades não mudam com as atualizações do RPG e são uma ótima pedida para quem prefere desenvolver mais conversas e relacionamentos do que combates e estudos.</p>
        <div class="talamasca-callout">
          <strong>Registro:</strong> ao concluir a entrega, registre a atividade <strong>no Hub</strong>, com o link dos seus turnos, para receber a recompensa na ficha.
        </div>

        <h3>1. Patrulha da Névoa no Tâmisa</h3>
        <p><em>(até 3x por semana)</em></p>
        <p>As margens do Tâmisa são vigiadas há séculos, mas a névoa não guarda apenas ladrões comuns. Patrulhar essa região é percorrer pontes de onde suicidas se jogam e onde o Véu precisa ser constantemente reforçado. A atividade exige silêncio, disciplina e atenção a sinais sutis: um reflexo que não deveria estar ali, um corpo que desaparece antes de tocar a água, uma sombra que caminha sobre a corrente. Algumas patrulhas terminam sem nada além do frio da noite; outras, com cultistas sendo contidos discretamente.</p>
        <ul>
          <li><strong>Local:</strong> Docks de Londres e margens do Tâmisa.</li>
          <li><strong>Indicação:</strong> Custódios (linha de frente), Tecelões do Véu (reforço do disfarce), Inquisidores (caso haja suspeitos).</li>
          <li><strong>Entrega:</strong> a cada 3 turnos (mínimo de 8 linhas cada).</li>
          <li><strong>Recompensa:</strong> 200 XP + 60 Golds.</li>
        </ul>

        <h3>2. Ronda em Whitechapel</h3>
        <p><em>(até 3x por semana)</em></p>
        <p>Os becos estreitos de Whitechapel são terreno fértil para crimes, mas também para rumores de coisas mais antigas. Gangues mortais disputam território com cultos menores, e algumas vezes relatos de criaturas noturnas se misturam à violência cotidiana. Um Vigilante pode se infiltrar, um Custódio impor disciplina, um Mediador negociar com líderes locais. A tarefa é simples na superfície: manter o equilíbrio da região. Mas o verdadeiro trabalho é impedir que o caos mortal se torne brecha para o divino se manifestar em plena rua.</p>
        <ul>
          <li><strong>Local:</strong> Whitechapel, leste de Londres.</li>
          <li><strong>Indicação:</strong> Vigilantes (infiltração em gangues), Custódios (manutenção da ordem), Mediadores (negociação política local).</li>
          <li><strong>Entrega:</strong> a cada 3 turnos (mínimo de 8 linhas cada).</li>
          <li><strong>Recompensa:</strong> 200 XP + 60 Golds.</li>
        </ul>

        <h3>3. Acalmar os Espíritos do Cemitério de Highgate</h3>
        <p><em>(até 3x por semana)</em></p>
        <p>Entre esculturas góticas e mausoléus cobertos de hera, o silêncio é interrompido por murmúrios que não pertencem a este tempo. O cemitério de Highgate é um lugar onde o Véu enfraquece com facilidade, e espíritos inquietos exigem intervenção. Tecelões do Véu, Arcanistas e Sanctificadores são os principais convocados, conduzindo rituais ou impondo barreiras sutis para que os mortos não transbordem sobre os vivos. A missão não é de combate, mas de contenção — e exige sensibilidade para não despertar aquilo que prefere dormir.</p>
        <ul>
          <li><strong>Local:</strong> Highgate Cemetery.</li>
          <li><strong>Indicação:</strong> Sanctificadores (cura espiritual), Arcanistas (rituais de contenção), Tecelões do Véu (encobrimento sobrenatural).</li>
          <li><strong>Entrega:</strong> a cada 3 turnos (mínimo de 8 linhas cada).</li>
          <li><strong>Recompensa:</strong> 200 XP.</li>
        </ul>

        <h3>4. Varredura nos Esgotos Antigos</h3>
        <p><em>(até 3x por semana)</em></p>
        <p>Sob as ruas iluminadas por néon, os corredores úmidos e abafados guardam tanto água estagnada quanto segredos antigos. A missão é caminhar entre túneis romanos, limpando marcas de rituais, rastreando sinais de infiltração de cultistas e certificando-se de que nada tenha sido invocado indevidamente. É comum encontrar apenas grafite, mas às vezes o cheiro de enxofre denuncia algo além do humano. Patrulhas mais desafiadoras já registraram a presença de criaturas anfíbias menores ligadas ao mar, que preferem as profundezas.</p>
        <ul>
          <li><strong>Local:</strong> rede de esgotos romanos e vitorianos.</li>
          <li><strong>Indicação:</strong> Custódios (segurança em corredores), Artífices de Ébano (selos e armadilhas), Vigilantes (rastreio de cultistas).</li>
          <li><strong>Entrega:</strong> a cada 3 turnos (mínimo de 8 linhas cada).</li>
          <li><strong>Recompensa:</strong> 200 XP + 60 Golds.</li>
        </ul>

        <h3>5. Rastreio de Cultos no Soho</h3>
        <p><em>(até 3x por semana)</em></p>
        <p>O bairro do Soho pulsa com casas noturnas, bares e teatros, mas por trás do brilho artificial existem portas que não aparecem em mapas. Cultos menores costumam se infiltrar nesses espaços, aproveitando a música e o fluxo de pessoas para mascarar seus rituais. O trabalho consiste em infiltrar-se, observar sem ser visto, seguir os passos errados até o porão certo — e só então agir. Nem sempre é necessário combater; muitas vezes basta recolher provas, identificar líderes e reportar aos Inquisidores. Mas há noites em que uma invocação se perde, e a fumaça no teto não é mais humana.</p>
        <ul>
          <li><strong>Local:</strong> Soho, West End.</li>
          <li><strong>Indicação:</strong> Vigilantes (espionagem), Inquisidores (investigação), Mediadores (manipular líderes locais).</li>
          <li><strong>Entrega:</strong> a cada 3 turnos (mínimo de 8 linhas cada).</li>
          <li><strong>Recompensa:</strong> 200 XP.</li>
        </ul>

        <h3>6. Caçada na Linha do Metrô Abandonada</h3>
        <p><em>(até 3x por semana)</em></p>
        <p>Alguns trechos do metrô londrino foram lacrados após acidentes inexplicáveis, mas o Conselho sabe bem a verdade: criaturas atraídas pelos labirintos de ferro vagam por ali. O trabalho é de risco elevado, destinado a Custódios e Artífices, que devem explorar túneis apagados, instalar selos de contenção e eliminar o que restar. Monstros menores costumam habitar esses corredores, mas, em raros casos, relatos de criaturas maiores (como <strong>minotauros</strong> deslocados de seus próprios labirintos) tornam a tarefa quase suicida.</p>
        <ul>
          <li><strong>Local:</strong> linhas abandonadas do metrô (estação Aldwych e trechos lacrados).</li>
          <li><strong>Indicação:</strong> Custódios (combate direto), Artífices de Ébano (manutenção dos selos), Inquisidores (recolher provas).</li>
          <li><strong>Entrega:</strong> a cada 3 turnos (mínimo de 8 linhas cada).</li>
          <li><strong>Recompensa:</strong> 350 XP + 100 Golds.</li>
        </ul>

        <h3>7. Proteção de Diplomacia Oculta</h3>
        <p><em>(até 3x por semana)</em></p>
        <p>Nem toda batalha é travada com espadas. Reuniões secretas entre facções divinas e representantes da Égide ocorrem em lugares discretos: porões de igrejas, salões privados de hotéis ou templos escondidos. O trabalho dos agentes é assegurar que a diplomacia siga seu curso sem interrupções externas. A tensão está em vigiar portas, identificar intrusos e, em casos extremos, conter emissários rivais que preferem a força ao diálogo. Combate não é esperado, mas é sempre possível.</p>
        <ul>
          <li><strong>Local:</strong> locais neutros de encontro, escolhidos pela Torre.</li>
          <li><strong>Indicação:</strong> Mediadores (diplomacia), Custódios (segurança), Inquisidores (controle disciplinar).</li>
          <li><strong>Entrega:</strong> a cada 3 turnos (mínimo de 8 linhas cada).</li>
          <li><strong>Recompensa:</strong> 200 XP.</li>
        </ul>

        <h3>8. Investigação de Profecias no Museu Britânico</h3>
        <p><em>(até 3x por semana)</em></p>
        <p>Algumas peças em exposição carregam mais do que história. Inscrições roubadas da Biblioteca de Alexandria costumam reaparecer no Museu, disfarçadas de artefatos acadêmicos. Os Arquivistas são enviados para decifrar sinais, enquanto Vigilantes observam visitantes suspeitos. A tarefa é analisar, identificar possíveis riscos e impedir que manuscritos sejam levados. Muitas vezes não há combate, mas disputas intelectuais e perseguições discretas até becos vizinhos.</p>
        <ul>
          <li><strong>Local:</strong> Museu Britânico, setor de antiguidades.</li>
          <li><strong>Indicação:</strong> Arquivistas de Avalon (interpretação), Arcanistas (rituais e leitura de energia), Vigilantes (observar suspeitos).</li>
          <li><strong>Entrega:</strong> a cada 3 turnos (mínimo de 8 linhas cada).</li>
          <li><strong>Recompensa:</strong> 200 XP.</li>
        </ul>

        <h3>9. Caçada às Keres no Tâmisa Noturno</h3>
        <p><em>(até 3x por semana)</em></p>
        <p>Em raras ocasiões, a concentração de mortes violentas em Londres atrai mais do que ecos. Bandos de <strong>Keres</strong> surgem sobre a água como pássaros negros de carne rasgada, atacando tudo que se move. É uma missão de alto risco, para esquadrões preparados e coordenados. A caçada ocorre sempre sob a névoa espessa, onde os gritos são abafados pelo rio. Enfrentar essas criaturas significa entrar em combate direto com a morte em sua forma mais voraz.</p>
        <ul>
          <li><strong>Local:</strong> trechos do Tâmisa em noites sem lua.</li>
          <li><strong>Indicação:</strong> Custódios (combate direto), Sanctificadores (suporte de cura), Arautos de campo (nível mais alto, para coordenar o esquadrão).</li>
          <li><strong>Entrega:</strong> a cada 3 turnos (mínimo de 8 linhas cada).</li>
          <li><strong>Recompensa:</strong> 400 XP + 200 Golds.</li>
        </ul>

        <h3>10. Patrulha no Hyde Park</h3>
        <p><em>(até 3x por semana)</em></p>
        <p>Durante o dia, o parque é um refúgio de tranquilidade. À noite, o espaço muda de natureza. Cultos pequenos usam clareiras para rituais, e é comum que os guardiões encontrem sinais de feitiçaria recente: cinzas ainda quentes, sangue fresco em pedras, símbolos gravados em árvores. A missão é assegurar que o local permaneça seguro, tanto para mortais quanto para a própria Égide. Criaturas ocasionais podem aparecer, mas a maior ameaça costuma ser o acúmulo de energia mágica fora de controle.</p>
        <ul>
          <li><strong>Local:</strong> Hyde Park, principalmente as clareiras internas.</li>
          <li><strong>Indicação:</strong> Custódios (segurança física), Arcanistas (controle mágico), Tecelões do Véu (reparação da realidade).</li>
          <li><strong>Entrega:</strong> a cada 3 turnos (mínimo de 8 linhas cada).</li>
          <li><strong>Recompensa:</strong> 100 XP + 50 Golds.</li>
        </ul>

        <h3>11. Turnos aleatórios</h3>
        <ul>
          <li><strong>Entrega:</strong> a cada turno.</li>
          <li><strong>Recompensa:</strong> 10 XP (a cada 40 palavras).</li>
        </ul>

        <div class="talamasca-callout warning">
          <strong>OBS:</strong> se o turno tiver mais linhas do que a atividade pede, ele poderá ser considerado como mais de um turno. Por exemplo: se a atividade pede 3 turnos de 8 linhas e o jogador faz 1 turno com 24, não precisará escrever mais dois.
        </div>
      `
    },

    // ══════════════════════════════════════════════════════════
    // SEÇÃO 09 · FICHAS, DEUSES E REGISTROS
    // ══════════════════════════════════════════════════════════
    {
      id: "fichas-de-jogadores",
      categoryId: "fichas-registros",
      title: "Fichas de jogadores (no Hub)",
      subtitle: "Personagens por conta, o que fica na ficha, o Baú e os seis espaços de artefato",
      aliases: ["ficha", "fichas", "hub", "criar ficha", "atualizar ficha", "4 personagens", "baú", "bau", "artefatos", "cabeça", "corpo", "mãos", "pés", "esfera", "corda", "bênção ativa", "slots", "tipos de fichas", "registros"],
      summary: "A criação e a atualização de fichas agora são feitas no Hub. Até 4 personagens; cada ficha tem bênçãos, uma arma e seis artefatos; o resto fica no Baú.",
      source: "Regras & Sistemas 2026 — Tipos de Fichas & Registros (atualizado para o Hub)",
      contentHtml: `
        <div class="talamasca-callout">
          <strong>Tipos de fichas e registros:</strong> fichas de jogadores, de deuses e o registro de shapes (photoplayers) agora ficam no <a href="https://midnight-city.cloud/dashboard" target="_blank" rel="noopener noreferrer"><strong>Hub Midnight City</strong></a>. É lá que você cria e atualiza fichas, registra a distribuição de atributos, guarda itens no Baú e consulta o histórico. <strong>As inscrições em missões continuam no Discord.</strong>
        </div>
        <p>No jogo, todo jogador terá direito a ter no máximo <strong>4 personagens por ficha</strong>, adquirindo direito a mais personagens à medida que cada season chega ao fim, ou quando receber como premiação por participar de eventos especiais da estação vigente.</p>
        <p>Na sua conta de jogador no Hub ficam as fichas dos seus respectivos personagens, deuses e conselheiros/governantes, NPCs, e o seu <strong>Baú</strong>, onde ficam os seus artefatos, bênçãos (compradas na loja) e armas para buildar os seus personagens.</p>
        <p>Na ficha do personagem ficam apenas as bênçãos que ele conquistar com o tempo (ou que você escolher comprar para buildá-lo, mas apenas uma ficará ativa por vez, e as outras terão efeito somente interpretativo), a sua arma e os seus <strong>seis artefatos</strong>, um em cada espaço: <strong>Cabeça, Corpo, Mãos, Pés, Esfera e Corda</strong>. Outras armas e artefatos terão que ser armazenados no Baú do jogador.</p>
      `
    },
    {
      id: "deuses-e-hospedeiros",
      categoryId: "fichas-registros",
      title: "Deuses, hospedeiros e ocupações provisórias",
      subtitle: "Como funciona ocupar a vaga de um deus, as formas de representação e a ocupação temporária",
      aliases: ["deus", "deuses", "vaga de deus", "hospedeiro", "manifestação", "emanador", "4 vagas", "dois grandes", "ocupação provisória", "narrador", "hélio", "selene"],
      summary: "Cada jogador pode ocupar até 4 vagas de deuses (até 2 dos grandes). Deuses se manifestam por hospedeiros; também existem manifestações e emanadores.",
      source: "Regras & Sistemas 2026 — Deuses e Ocupações Provisórias",
      contentHtml: `
        <h3>Deuses</h3>
        <p>Todo jogador que pretender ocupar a vaga de um deus deve ter ciência de que eles são uma categoria especial: têm um grande comprometimento com seus (a)filiados e estão constantemente sendo alvo de uma série de pessoas interessadas na vaga, por razões próprias.</p>
        <p>Os deuses <em>não podem manifestar a sua forma original</em>, já que isso pode ser catastrófico em vários sentidos. Como ainda buscam vínculos e promovem proteção aos seus herdeiros, <em>utilizam outros mortais</em>, sejam eles semideuses, magos ou não mágicos, para se manifestar pelo mundo. Vale ressaltar que uma divindade sempre deposita parte do seu poder no seu hospedeiro, o que significa que pode ocupar outros hospedeiros em vários lugares ao mesmo tempo.</p>
        <p><em>O nível de consciência do hospedeiro</em> varia de acordo com o desejo do jogador, podendo oscilar entre um personagem cuja consciência opera de forma ativa, parcial ou completamente inativa, como uma casca vazia. O intuito é dar ao portador da vaga e aos descendentes desse deus mais possibilidades interpretativas em seus jogos particulares.</p>
        <p>Sendo assim, quando se pretende ocupar a vaga de um deus, é preciso se preocupar com a história do hospedeiro, enquanto personagem, e do deus, enquanto representação divina. <strong>Todo jogador tem o direito de ocupar até <em>4 vagas de deuses</em></strong> — sendo no máximo 2 dos grandes —, que são listadas na ficha do jogador, para que as pessoas saibam de forma mais prática a quem ele pertence.</p>

        <h3>Curiosidade: outras formas de representação</h3>
        <p>Além dos hospedeiros, existem outras formas de representação dos deuses no RPG, como:</p>
        <ul>
          <li><strong>Manifestação:</strong> é a encarnação da energia divina desse deus por meio de objetos ou seres inanimados, ou ainda, em casos mais raros, a energia propriamente dita na forma parecida com a do próprio deus, onde a conexão dele com o divino seja mais forte, como templos. São, de maneira geral, perigosas e representam em 80% dos casos um alto risco à vida e aos segredos da ordem, o que requer eliminação encomendada.</li>
          <li><strong>Emanador:</strong> é o caso mais especial de todos. É o cruzamento das linhas do destino de um celestial com as de um mortal, em que eles ficam intrinsecamente ligados e acabam sendo reconhecidos como um arauto do celestial em questão, ou então são tratados como uma ameaça e um risco à existência dos princípios celestiais. Diferente de um hospedeiro e de uma manifestação, o emanador não é controlado pelo deus: ele usa a fonte do poder dele como um parasita, sendo a presença mais poderosa das três modalidades, capaz de matar outro celestial se aprender a usar o seu poder adequadamente. Existem mitos apagados da história por "tabus" que dizem que algo parecido aconteceu com Hélio e Selene.</li>
        </ul>

        <h3>Ocupações provisórias</h3>
        <p>Representa a possibilidade de jogadores que pretendem se tornar narradores temporariamente solicitarem a ocupação de um deus na plataforma. Isso acontece por meio de outro hospedeiro. Caso já exista alguém ocupando a vaga do deus, a ocupação provisória para a execução da trama que o jogador tem em mente é avaliada pelo próprio dono da vaga; na ausência dele, é avaliada pela ADM.</p>
      `
    },
    {
      id: "photoplayers",
      categoryId: "fichas-registros",
      title: "Photoplayers (shapes)",
      subtitle: "Como o registro de rostos funciona no Hub e o que fazer em caso de conflito",
      aliases: ["photoplayer", "shape", "faceclaim", "rosto", "registro", "conflito", "compartilhar", "verde", "vermelho"],
      summary: "É proibido usar o photoplayer de outro jogador. O Hub registra automaticamente, avisa quando o rosto já está ocupado e sugere dividir ou escolher outro.",
      source: "Regras & Sistemas 2026 — Fichas de Jogadores (atualizado para o Hub)",
      contentHtml: `
        <p>É estritamente proibido usar o photoplayer de outro jogador.</p>
        <p>O controle de photoplayers agora é feito <strong>no Hub</strong>: o registro acontece automaticamente quando você cadastra o rosto do personagem. Se o photoplayer já estiver ocupado, o Hub avisa na hora e sugere duas saídas: <strong>pedir para dividir</strong> o rosto com quem já o usa ou <strong>procurar outro</strong>.</p>
      `
    },

    // ══════════════════════════════════════════════════════════
    // SEÇÃO 10 · MESTIÇOS
    // ══════════════════════════════════════════════════════════
    {
      id: "sistema-de-mesticos",
      categoryId: "mesticos",
      title: "Sistemas e regras sobre mestiços",
      subtitle: "Gestação, envelhecimento, filhos de todos os casais, uniões entre etnias e herança genética",
      aliases: ["mestiço", "mestico", "mestiços", "gestação", "gravidez", "filhos", "herdeiro", "casa de bonecas", "circe", "envelhecimento", "maturação", "homoafetivo", "etnias", "herança genética", "neto", "bisneto"],
      summary: "Como nascem os mestiços, quanto dura a gestação, como acelerar o crescimento, e quantas individualidades herda cada combinação de pais.",
      source: "Regras & Sistemas 2026 — Sistemas e Regras sobre Mestiços",
      contentHtml: `
        <p>É comum que os personagens se relacionem e formem casais entre si. Apesar de serem poucos os que chegam à fase adulta, alguns inclusive geram herdeiros. Estes têm, por vezes, uma ligação proporcional com as divindades das quais descendem, e na maior parte das vezes suas habilidades podem ser herdadas dos pais. Para o nascimento de um mestiço, é preciso que o casal poste dentro do acampamento se envolvendo, não sendo necessárias as turnagens de sexo. A/O gestante, portanto, deve postar dentro do RPG durante o período de gravidez, e é inclusive necessário que seja feito um post na hora do parto. Caso contrário, não será possível a validação do personagem.</p>

        <h3>Gestação</h3>
        <p>Cada três meses online equivalem a um mês off. O tempo de gestação dos mestiços é de dez meses on, o que equivale a <strong>3 meses e uma semana OFF</strong>. Esse tempo é contado a partir da relação dos dois personagens. Quando a prole nascer, ela vai crescer, e somente quando tiver <strong>cinco anos</strong> se tornará um personagem jogável.</p>

        <h3>Envelhecimento e maturação</h3>
        <p>Para jogadores mais ansiosos, existem formas de realizar a gestação e o envelhecimento das crianças de maneira mais rápida e produtiva. A primeira delas é procurar a deusa Circe, em Londres, numa de suas lojas pagãs, com o objetivo de executar <strong>o feitiço da casa de bonecas</strong>. É um feitiço muito poderoso, que permite que o casal e seus filhos sejam transportados para dentro de um ambiente ensaiado, uma dimensão alternativa alimentada por magia. Nela são reproduzidos os dias que os pais e seus filhos viveriam no mundo real num único dia. O feitiço permite que os pais desfrutem desse período com seus filhos, criando-os e educando-os, até que atinjam a maioridade, sem envelhecer, mas tudo isso ao custo de uma de suas bênçãos ou de um item precioso.</p>
        <p>A segunda forma é por meio do <strong>Templo de uma deusa do casamento ou da maternidade</strong>, que pode beneficiá-lo com a transição do tempo sem envelhecer os pais, num limbo, uma pequena faixa dimensional onde a saúde, a felicidade e a segurança da família são garantidas, conservando o tempo de qualidade e a ligação entre o casal e a sua prole.</p>

        <h3>Todos os casais podem ter filhos</h3>
        <p>Isso mesmo: todos os casais podem ter filhos, mesmo aqueles que sejam homoafetivos. Na colina dos templos, especificamente nos de deuses e deusas do matrimônio, da fertilidade e do amor, costuma-se receber esse tipo de casal em orações para contemplar um fruto. Quando é do interesse desses deuses, eles podem conceder essa dádiva de várias maneiras: por meio de um fruto, uma luz estranha ou até uma bebida suspeita. De todo modo, ao aceitar a bênção concedida pelos deuses, um dos personagens passa a ter a capacidade de se tornar gestante. De modo similar ao que acontece com Atena/Minerva, Apolo/Febo ou outros deuses que podem conceber por meios não convencionais, o casal homoafetivo, após uma noite de amor e união, é agraciado com essa dádiva: um deles desenvolve, de forma mágica, a capacidade biológica e orgânica de carregar um (ou mais) herdeiros, passando por todos os mesmos eventos de uma gravidez comum. No caso de um gestante masculino, ele está fadado a ter um parto por cesariana. Vale ressaltar, com o objetivo de verossimilhança, que o fato é sustentado pelos poderes divinos dos deuses: ele não se baseia na fecundação de um óvulo por um espermatozoide; os poderes divinos executam o processo de reunir o material genético do casal para que nasça um(a) herdeiro(a).</p>

        <h3>Todas as etnias podem se unir</h3>
        <ul>
          <li><strong>Deus e Deus:</strong> no caso de dois hospedeiros de deuses se relacionarem entre si, vão gerar um semideus mestiço. Ele vai escolher <strong>4 individualidades</strong>, com no mínimo 1 de cada progenitor divino. A sua energia é equivalente à de um semideus, já que é filho de hospedeiros portadores dos deuses, e não dos deuses diretamente.</li>
          <li><strong>Deus e Semideus:</strong> no caso de algum hospedeiro de deus se relacionar com um semideus, vai gerar um mestiço diferente. Ele vai escolher apenas <strong>1 individualidade</strong> por nível do seu avô (avó) e <strong>3 individualidades</strong> do seu pai ou mãe divino. Usa a energia de um semideus.</li>
          <li><strong>Deus e Mestiço:</strong> quando o hospedeiro de uma divindade tem um filho com um mestiço, este terá ligação apenas com a divindade e então será como um semideus normal, não herdando nenhuma habilidade do bisavô. Usa a energia de um semideus. [Isso não se aplica a deuses egípcios.]</li>
          <li><strong>Semideus e Semideus:</strong> o fruto da relação entre dois semideuses é, de longe, o mais comum. Quando isso acontece, o filho dessa relação terá direito a <strong>2 individualidades</strong> de um dos seus avós e <strong>1 individualidade</strong> do restante, podendo intercalar ao longo dos níveis.</li>
          <li><strong>Semideus e Mestiço:</strong> quando um mestiço se relaciona com um semideus e consequentemente tem um filho, a situação é parecida com a do filho de Semideus e Deus. Quando isso acontece, o filho dessa relação terá direito a <strong>1 individualidade</strong> de um dos bisavós e <strong>2 individualidades</strong> do avô (avó). No entanto, no nível sete terá apenas 2 individualidades.</li>
          <li><strong>Mestiço e Mestiço:</strong> sempre que dois mestiços se juntarem, de primeira geração em diante, os filhos deles vão escolher apenas <strong>1 individualidade</strong> de dois dos ancestrais divinos e, até o nível 7, apenas <strong>1 individualidade</strong> independente entre os ancestrais.</li>
        </ul>

        <h3>Herança genética</h3>
        <p>Quando um personagem recebe uma bênção/maldição peculiar, ela inevitavelmente vai alterar o seu código genético. Há uma chance remota de essas peculiaridades acabarem passando de progenitor para filho. Poderá ser escolhida uma bênção interpretativa sem valor combativo.</p>
      `
    }
  ],


  // ── ACERVO DA PRESENÇA (FAQS PRÉ-REVISADAS • SEM IA) ──
  presenceFaqs: [
    {
      id: "faq-primeira-ficha",
      question: "Onde crio e atualizo a ficha do meu personagem?",
      category: "Fichas",
      docId: "fichas-de-jogadores",
      answer: "No Hub Midnight City (midnight-city.cloud/dashboard). Lá você cria a ficha, registra os pontos de atributo a cada nível, equipa arma, bênçãos e os seis artefatos (Cabeça, Corpo, Mãos, Pés, Esfera e Corda) e guarda o resto no Baú. As inscrições em missões continuam no Discord."
    },
    {
      id: "faq-distribuicao-atributos",
      question: "Quanto vale cada ponto de atributo?",
      category: "Evolução",
      docId: "conversao-de-atributos",
      answer: "1 ponto de atributo vale 10 ATK, 10 DEF, 30 HP, 10% de taxa crítica, 10% de dano crítico ou 3 SPD. Os pontos ganhos ao subir de nível são registrados na ficha do Hub."
    },
    {
      id: "faq-progressao-xp",
      question: "Quanto XP preciso para cada nível?",
      category: "Evolução",
      docId: "sistema-de-evolucao",
      answer: "N1 0 XP · N2 600 · N3 1.100 · N4 2.000 · N5 3.000 · N6 4.100 · N7 5.300 · N8 6.600 · N9 8.000 · N10 10.000 XP. Os níveis 1 e 2 dão 1 ponto de atributo, do 3 ao 9 dão 2 pontos, e o nível 10 dá 4."
    },
    {
      id: "faq-formulas-dano",
      question: "Quais são as fórmulas de dano?",
      category: "Combate",
      docId: "calculo-de-dano",
      answer: "Combate clássico: ATK − DEF = dano sofrido. Com poderes ativos: (NÍVEL + [ATK × 1]) × CRÍTICO + BÔNUS DE DANO; base DEF usa [DEF × 0,6]; base HP usa [HP × 0,4]. Se o poder não disser a base, use ATK."
    },
    {
      id: "faq-rolagem",
      question: "Onde e como rolo os dados?",
      category: "Combate",
      docId: "rolagem-de-dados",
      answer: "As rolagens de combate e de testes continuam no Discord, na sua sala da aba \"rolador\" (com o número da sua ficha). Escreva o personagem e o motivo, use /roll e informe, por exemplo, 10d10 t5: 10 dados com dificuldade 5. Cada dado que atinge a dificuldade é um sucesso."
    },
    {
      id: "faq-limites-critico",
      question: "Qual o limite de taxa crítica e de dano crítico?",
      category: "Custos e limites",
      docId: "custos-e-limites",
      answer: "O limite de taxa crítica é 600% e o de dano crítico é 1200%. Cada +10% custa 1 atributo."
    },
    {
      id: "faq-oracoes",
      question: "Onde faço minhas orações nos banners?",
      category: "Banners",
      docId: "fichas-de-jogadores",
      answer: "No Hub. Lá você converte Contas Celestiais em Orações, escolhe o banner e o prêmio pretendido, faz x1 ou x10 e acompanha o seu pity. Os detalhes estão na página Banners."
    }
  ]
};

if (typeof window !== 'undefined') {
  window.TERMINAL_DATABASE = TERMINAL_DATABASE;
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { TERMINAL_DATABASE };
}
