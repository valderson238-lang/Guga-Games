export type ProductCategory = 'Todos' | 'PlayStation' | 'Xbox' | 'Nintendo' | 'Jogos';

export interface ProductVariant {
  id: string;
  label: string;
  price: number;
  pixPrice: number;
  stockLabel: string;
}

export interface Product {
  id: string;
  name: string;
  category: Exclude<ProductCategory, 'Todos'>;
  conditionLabel: string;
  shortSpec: string;
  description: string;
  image: string;
  imageAlt: string;
  highlights: string[];
  warranty: string;
  variants: ProductVariant[];
}

export const STORE_ASSETS = {
  logo: '/assets/aistudio/images__1__4fed6504.jpeg',
  heroPyramid: '/assets/aistudio/Se_era_PS5_que_voc__queria..._ele_t__aqui__Na_melhor_loja_gamer_do_BR__com_pre_o_de_oportunidade_e_que_cabe_no_seu_bolso_______Mas__n_o_per_JPG__f8ff047c.jpg',
  wallPs5: '/assets/aistudio/Pared_o_da_Guga_Games__Aqui___a_01_da_Santa_Ifig_nia____O_lugar_certo_para_comprar_ou_trocar_de_game__aqui_o_seu_antigo_faz_parte_do_pagamento_____JPG__c490f71a.jpg',
  counterOwner: '/assets/aistudio/images_56e03fa3.jpeg',
  ps5Pro: '/assets/aistudio/REPOSI__O___O_PS5_Pro_chegou_e_j__t__voando_das_prateleiras______E_sim____na_Guga_Games_que_voc__encontra_com_aquele_precinho_que_voc__JPG__dc70545b.jpg',
  xboxSeries: '/assets/aistudio/A_Black_Friday_mais_braba_t__ON_na_Guga_Games_____Os_melhores_consoles__acess_rios_e_jogos_est_o_te_esperando_com_aquele_precinho_que_s__a_gente__JPG__04b96165.jpg',
  switchOled: '/assets/aistudio/PULA_FOGUEIRA_I_-I_..._MAS_SEGURA_BEM_ESSE_SWITCH_PRIMEIRO__VIU______ARRAI__da_GUGA_GAMES_t__b_o_demais_s____Tem_Nintendo_Switch_pra_garan_JPG__e97634c2.jpg',
  eaFc26: '/assets/aistudio/___A_espera_acabou__O_EA_SPORTS_FC_2026_j__est__dispon_vel____Chegou_a_hora_de_viver_a_emo__o_do_futebol_de_um_jeito_ainda_mais_realista_JPG__b8ac4035.jpg',
  upgradeBanner: '/assets/aistudio/Pensando_em_trocar_de_game__A_hora___agora____Fa_a_seu_upgrade_com_a_Guga_Games__traga_o_seu_antigo_e_use_como_parte_do_pagamento_por_um_novo______JPG__65e33fbe.jpg',
} as const;

export const STORE_LINKS = {
  instagram: 'https://www.instagram.com/gugagamess?avpt=MXJ5bzk1aTd5M2R0Nw==',
  maps: 'https://share.google/bVUeiQLEO6M6OxfRW',
  locationShort: 'Rua Santa Ifigênia · Centro, São Paulo - SP',
  hours: 'Seg a Sáb · 09h00 às 18h30',
};

export const PRODUCTS: Product[] = [
  {
    id: 'ps5-pro-2tb',
    name: 'PlayStation 5 Pro 2TB 4K',
    category: 'PlayStation',
    conditionLabel: 'Lacrado · Pronta Entrega',
    shortSpec: 'SSD 2TB · Ray Tracing Avançado · Wi-Fi 7',
    description:
      'O console mais potente da linha PlayStation com 2TB de SSD ultrarrápido, upscaling por IA (PSSR) e taxa de quadros aprimorada em 4K. Estoque físico disponível na loja para retirada imediata ou envio.',
    image: STORE_ASSETS.ps5Pro,
    imageAlt: 'Pilhas de consoles PlayStation 5 Pro novos na Guga Games',
    highlights: [
      'SSD NVMe de 2TB integrado',
      'Controle sem fio DualSense incluso',
      'Aceita seu PS4 ou PS5 antigo na troca',
    ],
    warranty: '12 meses de garantia Guga Games',
    variants: [
      {
        id: 'ps5-pro-std',
        label: 'Console 2TB Digital (Lacrado)',
        price: 5899,
        pixPrice: 5499,
        stockLabel: 'Em estoque na loja',
      },
      {
        id: 'ps5-pro-disc',
        label: 'PS5 Pro 2TB + Leitor de Disco',
        price: 6499,
        pixPrice: 6099,
        stockLabel: 'Últimas unidades',
      },
    ],
  },
  {
    id: 'ps5-slim-1tb',
    name: 'PlayStation 5 Slim 1TB',
    category: 'PlayStation',
    conditionLabel: 'Mais Vendido · Lacrado',
    shortSpec: 'SSD 1TB · DualSense · Astro’s Playroom',
    description:
      'Design compacto com 1TB de armazenamento e carregamento instantâneo. Disponível nas versões Mídia Física e Digital com atendimento presencial na Santa Ifigênia.',
    image: STORE_ASSETS.heroPyramid,
    imageAlt: 'Pirâmide de caixas PlayStation 5 Slim no balcão da Guga Games',
    highlights: [
      'Versão nacional lacrada com nota e garantia',
      'Compatível com jogos de PS4 e PS5',
      'Parcelamento em até 12x no cartão',
    ],
    warranty: '12 meses de garantia Guga Games',
    variants: [
      {
        id: 'ps5-slim-digital',
        label: 'Edição Digital 1TB',
        price: 3599,
        pixPrice: 3299,
        stockLabel: 'Pronta entrega',
      },
      {
        id: 'ps5-slim-disco',
        label: 'Edição com Leitor de Disco 1TB',
        price: 3949,
        pixPrice: 3649,
        stockLabel: 'Pronta entrega',
      },
    ],
  },
  {
    id: 'ps5-bundle-returnal-ratchet',
    name: 'PS5 Slim Bundle Returnal + Ratchet & Clank',
    category: 'PlayStation',
    conditionLabel: 'Bundle Oficial · Estoque Limitado',
    shortSpec: 'Console 1TB + 2 Jogos Completos',
    description:
      'Combo oficial PlayStation 5 Slim acompanhado de Returnal e Ratchet & Clank: Em Uma Outra Dimensão para você já sair jogando dois exclusivos de peso.',
    image: STORE_ASSETS.wallPs5,
    imageAlt: 'Paredão de PS5 Bundle Returnal e Ratchet & Clank na Guga Games',
    highlights: [
      'Inclui vouchers/jogos Returnal e Ratchet & Clank',
      'Controle DualSense original na caixa',
      'Testado e lacrado direto no balcão',
    ],
    warranty: '12 meses de garantia Guga Games',
    variants: [
      {
        id: 'ps5-bundle-std',
        label: 'Bundle Digital + 2 Jogos',
        price: 3749,
        pixPrice: 3449,
        stockLabel: 'Em estoque na loja',
      },
    ],
  },
  {
    id: 'xbox-series-s',
    name: 'Xbox Series S 512GB + Controles',
    category: 'Xbox',
    conditionLabel: 'Pronta Entrega · Novo & Seminovo',
    shortSpec: 'SSD 512GB · 120 FPS · Game Pass Ready',
    description:
      'A porta de entrada mais rápida para a nova geração com Quick Resume e catálogo gigante no Game Pass. Também temos controles originais Xbox nas cores Carbon Black, Robot White e Pulse Red.',
    image: STORE_ASSETS.xboxSeries,
    imageAlt: 'Consoles Xbox Series S e controles preto, branco e vermelho na Guga Games',
    highlights: [
      'Acompanha controle original sem fio',
      'Opções de controle extra avulso (Preto, Branco ou Vermelho)',
      'Aceita Xbox One na troca com avaliação na hora',
    ],
    warranty: '12 meses (Novo) · 6 meses (Seminovo)',
    variants: [
      {
        id: 'xss-novo',
        label: 'Series S 512GB Lacrado',
        price: 2599,
        pixPrice: 2349,
        stockLabel: 'Pronta entrega',
      },
      {
        id: 'xss-2controles',
        label: 'Series S + Controle Extra Original',
        price: 2999,
        pixPrice: 2749,
        stockLabel: 'Em estoque na loja',
      },
    ],
  },
  {
    id: 'nintendo-switch-oled',
    name: 'Nintendo Switch OLED 64GB',
    category: 'Nintendo',
    conditionLabel: 'Lacrado · Neon ou Branco',
    shortSpec: 'Tela OLED 7" · Dock com Porta LAN',
    description:
      'Cores vibrantes e contraste profundo na tela OLED de 7 polegadas para jogar na TV ou no modo portátil. Disponível nas edições Joy-Con Branco e Neon Vermelho/Azul.',
    image: STORE_ASSETS.switchOled,
    imageAlt: 'Nintendo Switch OLED Branco e Neon com Pro Controllers na vitrine da Guga Games',
    highlights: [
      'Armazenamento interno de 64GB',
      'Suporte traseiro largo ajustável',
      'Combine com Nintendo Switch Pro Controller original',
    ],
    warranty: '12 meses de garantia Guga Games',
    variants: [
      {
        id: 'switch-oled-white',
        label: 'Edição Branca (Lacrado)',
        price: 2349,
        pixPrice: 2149,
        stockLabel: 'Pronta entrega',
      },
      {
        id: 'switch-oled-neon',
        label: 'Edição Neon Vermelho/Azul (Lacrado)',
        price: 2349,
        pixPrice: 2149,
        stockLabel: 'Pronta entrega',
      },
      {
        id: 'switch-oled-pro',
        label: 'Switch OLED + Pro Controller Original',
        price: 2799,
        pixPrice: 2549,
        stockLabel: 'Combo especial',
      },
    ],
  },
  {
    id: 'ea-sports-fc-26',
    name: 'EA SPORTS FC 26 — Mídia Física',
    category: 'Jogos',
    conditionLabel: 'Lançamento · Mídia Física',
    shortSpec: 'PS5 / PS4 · Lacrado Nacional PT-BR',
    description:
      'O lançamento mais esperado do futebol mundial já está nas prateleiras da Guga Games. Mídia física lacrada em português do Brasil, pronta para jogar Ultimate Team e Modo Carreira.',
    image: STORE_ASSETS.eaFc26,
    imageAlt: 'Cópias físicas de EA SPORTS FC 26 para PS5 na Guga Games',
    highlights: [
      'Áudio e menus 100% em Português',
      'Aceita jogos físicos usados como parte do pagamento',
      'Retirada imediata no balcão',
    ],
    warranty: 'Garantia contra defeito de mídia',
    variants: [
      {
        id: 'fc26-ps5',
        label: 'PlayStation 5 (Lacrado)',
        price: 349,
        pixPrice: 319,
        stockLabel: 'Em estoque na loja',
      },
      {
        id: 'fc26-ps4',
        label: 'PlayStation 4 (Lacrado)',
        price: 329,
        pixPrice: 299,
        stockLabel: 'Em estoque na loja',
      },
    ],
  },
  {
    id: 'vitrine-exclusivos-ps',
    name: 'Vitrine PlayStation — Exclusivos & Clássicos',
    category: 'Jogos',
    conditionLabel: 'Novos & Seminovos Revisados',
    shortSpec: 'God of War, Ghost of Tsushima, Horizon, Spider-Man',
    description:
      'Seleção da nossa vitrine física com títulos consagrados de PS4 e PS5: God of War Ragnarök, Ghost of Tsushima, Horizon Forbidden West, Gran Turismo 7, Uncharted 4 e Resident Evil 2.',
    image: STORE_ASSETS.switchOled,
    imageAlt: 'Jogos físicos de PlayStation expostos na vitrine da Guga Games',
    highlights: [
      'Mídias originais testadas e sem riscos',
      'Desconto progressivo levando 2 ou mais jogos',
      'Traga seus jogos parados para trocar na hora',
    ],
    warranty: 'Garantia de funcionamento Guga Games',
    variants: [
      {
        id: 'game-gow-ragnarok',
        label: 'God of War Ragnarök',
        price: 199,
        pixPrice: 179,
        stockLabel: 'Disponível',
      },
      {
        id: 'game-ghost-tsushima',
        label: 'Ghost of Tsushima',
        price: 169,
        pixPrice: 149,
        stockLabel: 'Disponível',
      },
      {
        id: 'game-horizon-fw',
        label: 'Horizon Forbidden West',
        price: 159,
        pixPrice: 139,
        stockLabel: 'Disponível',
      },
    ],
  },
];

export interface TradeInDeviceOption {
  id: string;
  label: string;
  minEstimate: number;
  maxEstimate: number;
}

export const TRADE_IN_DEVICES: TradeInDeviceOption[] = [
  { id: 'ps4-slim', label: 'PlayStation 4 Slim 1TB', minEstimate: 1050, maxEstimate: 1300 },
  { id: 'ps4-pro', label: 'PlayStation 4 Pro 1TB', minEstimate: 1350, maxEstimate: 1650 },
  { id: 'xbox-one-s', label: 'Xbox One S / X', minEstimate: 850, maxEstimate: 1200 },
  { id: 'xbox-series-s', label: 'Xbox Series S 512GB', minEstimate: 1300, maxEstimate: 1550 },
  { id: 'switch-v2', label: 'Nintendo Switch V2 / Lite', minEstimate: 950, maxEstimate: 1350 },
  { id: 'ps5-fat', label: 'PlayStation 5 Fat (Disco)', minEstimate: 2300, maxEstimate: 2700 },
];

export const UPGRADE_TARGETS = [
  { id: 'ps5-slim-disco', label: 'PlayStation 5 Slim 1TB (Disco)', pixPrice: 3649 },
  { id: 'ps5-pro-2tb', label: 'PlayStation 5 Pro 2TB 4K', pixPrice: 5499 },
  { id: 'switch-oled', label: 'Nintendo Switch OLED 64GB', pixPrice: 2149 },
  { id: 'xbox-series-s', label: 'Xbox Series S 512GB', pixPrice: 2349 },
];

export function formatBRL(value: number): string {
  return value.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    maximumFractionDigits: 0,
  });
}
