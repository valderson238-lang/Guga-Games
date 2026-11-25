import { useMemo, useState } from 'react';
import {
  ArrowRight,
  Clock,
  CreditCard,
  ExternalLink,
  Instagram,
  MapPin,
  PackageCheck,
  RefreshCw,
  Search,
  ShieldCheck,
  ShoppingBag,
} from 'lucide-react';
import { Navbar } from './components/Navbar';
import { ProductModal } from './components/ProductModal';
import { CartDrawer, CartItem, TradeInCredit } from './components/CartDrawer';
import { TradeInSimulator } from './components/TradeInSimulator';
import { SmartImage } from './components/SmartImage';
import {
  PRODUCTS,
  Product,
  ProductCategory,
  ProductVariant,
  STORE_ASSETS,
  STORE_LINKS,
  formatBRL,
} from './data/catalog';

const CATEGORIES: ProductCategory[] = [
  'Todos',
  'PlayStation',
  'Xbox',
  'Nintendo',
  'Jogos',
];

export default function App() {
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory>('Todos');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeProduct, setActiveProduct] = useState<Product | null>(null);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [tradeInCredit, setTradeInCredit] = useState<TradeInCredit | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const filteredProducts = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    return PRODUCTS.filter((product) => {
      const matchesCategory =
        selectedCategory === 'Todos' || product.category === selectedCategory;
      const matchesSearch =
        query === '' ||
        product.name.toLowerCase().includes(query) ||
        product.shortSpec.toLowerCase().includes(query) ||
        product.category.toLowerCase().includes(query);
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  const totalCartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    window.setTimeout(() => {
      setToastMessage((prev) => (prev === msg ? null : prev));
    }, 2600);
  };

  const handleAddToCart = (product: Product, variant: ProductVariant) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.variant.id === variant.id);
      if (existing) {
        return prev.map((item) =>
          item.variant.id === variant.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { product, variant, quantity: 1 }];
    });
    showToast(`${product.name} adicionado à sacola`);
  };

  const handleUpdateQty = (variantId: string, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((item) =>
          item.variant.id === variantId
            ? { ...item, quantity: item.quantity + delta }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const handleRemoveItem = (variantId: string) => {
    setCartItems((prev) => prev.filter((item) => item.variant.id !== variantId));
  };

  const handleApplyTradeInToBag = (
    credit: TradeInCredit,
    targetProduct: Product,
    targetVariant: ProductVariant
  ) => {
    setTradeInCredit(credit);
    setCartItems((prev) => {
      const exists = prev.some((i) => i.variant.id === targetVariant.id);
      if (exists) return prev;
      return [...prev, { product: targetProduct, variant: targetVariant, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  return (
    <div id="topo" className="min-h-screen bg-[#09090B] text-zinc-100 flex flex-col">
      <Navbar cartCount={totalCartCount} onOpenCart={() => setIsCartOpen(true)} />

      <main className="flex-1">
        {/* Section 1: Storefront Hero Split */}
        <section className="border-b border-white/10">
          <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8 py-10 lg:py-16">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">
              <div className="lg:col-span-6 flex flex-col justify-between gap-8 py-2">
                <div>
                  <p className="text-xs font-semibold tracking-wider uppercase text-[#E5B82E]">
                    Santa Ifigênia · São Paulo
                  </p>
                  <h1 className="mt-3 font-display-heading text-[clamp(2.5rem,5vw,4.25rem)] font-bold leading-[0.98] tracking-tight text-white [text-wrap:balance]">
                    A loja gamer número 01 para comprar ou trocar seu console.
                  </h1>
                  <p className="mt-5 max-w-[54ch] text-base leading-relaxed text-zinc-300">
                    PS5 Pro, PlayStation 5 Slim, Xbox Series S, Nintendo Switch OLED e
                    os principais lançamentos em mídia física com garantia real e
                    avaliação justa do seu game antigo na hora.
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-4">
                  <a
                    href="#catalogo"
                    className="inline-flex items-center gap-2 rounded-lg bg-[#E5B82E] px-6 py-3.5 text-sm font-bold text-[#09090B] hover:bg-[#F2C94C] active:scale-[0.98] transition-all whitespace-nowrap shrink-0"
                  >
                    <span>Explorar Catálogo</span>
                    <ArrowRight className="h-4 w-4" />
                  </a>
                  <a
                    href="#upgrade"
                    className="inline-flex items-center gap-2 rounded-lg border border-white/15 bg-[#121216] px-6 py-3.5 text-sm font-semibold text-white hover:border-[#E5B82E] transition-colors whitespace-nowrap shrink-0"
                  >
                    <span>Simular Troca do Usado</span>
                  </a>
                </div>
              </div>

              <div className="lg:col-span-6">
                <div className="relative h-full min-h-[340px] lg:min-h-[460px] overflow-hidden rounded-xl border border-white/10 bg-[#121216]">
                  <SmartImage
                    src={STORE_ASSETS.heroPyramid}
                    alt="Estoque de PlayStation 5 Slim sob o letreiro oficial da Guga Games"
                    className="h-full w-full object-cover"
                    fallbackTitle="Guga Games — Estoque Oficial"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#09090B]/90 via-[#09090B]/20 to-transparent" />
                  <div className="absolute bottom-0 inset-x-0 p-6 flex items-end justify-between gap-4">
                    <div>
                      <p className="text-xs font-medium text-[#E5B82E]">
                        Estoque físico real
                      </p>
                      <p className="mt-1 text-base font-semibold text-white">
                        Consoles lacrados e testados no balcão
                      </p>
                    </div>
                    <div className="hidden sm:block h-12 w-20 overflow-hidden rounded border border-[#E5B82E]/40 bg-[#09090B]">
                      <SmartImage
                        src={STORE_ASSETS.logo}
                        alt="Selo Guga Games"
                        className="h-full w-full object-cover scale-110"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* 4-column Store Pillars Strip directly below Hero Split */}
            <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 border-t border-white/10 pt-8">
              <div className="rounded-lg border border-white/10 bg-[#121216] p-4 flex items-start gap-3.5">
                <PackageCheck className="h-5 w-5 text-[#E5B82E] shrink-0 mt-0.5" />
                <div>
                  <h2 className="text-sm font-semibold text-white">Pronta Entrega</h2>
                  <p className="mt-1 text-xs leading-relaxed text-zinc-400">
                    Retire no balcão da Santa Ifigênia ou receba via motoboy em SP.
                  </p>
                </div>
              </div>

              <div className="rounded-lg border border-white/10 bg-[#121216] p-4 flex items-start gap-3.5">
                <RefreshCw className="h-5 w-5 text-[#E5B82E] shrink-0 mt-0.5" />
                <div>
                  <h2 className="text-sm font-semibold text-white">
                    Seu Usado Vale Crédito
                  </h2>
                  <p className="mt-1 text-xs leading-relaxed text-zinc-400">
                    PS4, Xbox One, Switch ou jogos físicos como parte do pagamento.
                  </p>
                </div>
              </div>

              <div className="rounded-lg border border-white/10 bg-[#121216] p-4 flex items-start gap-3.5">
                <ShieldCheck className="h-5 w-5 text-[#E5B82E] shrink-0 mt-0.5" />
                <div>
                  <h2 className="text-sm font-semibold text-white">
                    Garantia Guga Games
                  </h2>
                  <p className="mt-1 text-xs leading-relaxed text-zinc-400">
                    12 meses em aparelhos lacrados e 6 meses em seminovos revisados.
                  </p>
                </div>
              </div>

              <div className="rounded-lg border border-white/10 bg-[#121216] p-4 flex items-start gap-3.5">
                <CreditCard className="h-5 w-5 text-[#E5B82E] shrink-0 mt-0.5" />
                <div>
                  <h2 className="text-sm font-semibold text-white">Pix ou até 12x</h2>
                  <p className="mt-1 text-xs leading-relaxed text-zinc-400">
                    Condição especial à vista no Pix ou parcelamento no cartão.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 2: Featured Catalog */}
        <section id="catalogo" className="py-16 lg:py-20 border-b border-white/10">
          <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-[#E5B82E]">
                  Vitrine Oficial
                </p>
                <h2 className="mt-2 font-display-heading text-3xl sm:text-4xl font-bold text-white">
                  Consoles, Acessórios e Lançamentos
                </h2>
              </div>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                <div className="relative">
                  <Search className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500" />
                  <input
                    type="search"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Buscar PS5, Switch, FC 26..."
                    aria-label="Buscar produtos no catálogo"
                    className="w-full sm:w-64 rounded-lg border border-white/10 bg-[#121216] pl-9 pr-3 py-2 text-sm text-white placeholder:text-zinc-500 focus:border-[#E5B82E] focus:outline-none"
                  />
                </div>

                <div
                  role="tablist"
                  aria-label="Filtrar por categoria"
                  className="flex items-center gap-1 overflow-x-auto rounded-lg border border-white/10 bg-[#121216] p-1"
                >
                  {CATEGORIES.map((category) => {
                    const isActive = selectedCategory === category;
                    return (
                      <button
                        key={category}
                        type="button"
                        role="tab"
                        aria-selected={isActive}
                        onClick={() => setSelectedCategory(category)}
                        className={`rounded-md px-3 py-1.5 text-xs font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                          isActive
                            ? 'bg-[#E5B82E] text-[#09090B]'
                            : 'text-zinc-400 hover:text-white'
                        }`}
                      >
                        {category}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {filteredProducts.length === 0 ? (
              <div className="mt-10 rounded-xl border border-white/10 bg-[#121216] p-12 text-center">
                <p className="text-base font-semibold text-white">
                  Nenhum produto encontrado para "{searchQuery}"
                </p>
                <p className="mt-1 text-sm text-zinc-400">
                  Tente limpar a busca ou selecionar outra categoria.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setSelectedCategory('Todos');
                    setSearchQuery('');
                  }}
                  className="mt-4 rounded-lg bg-[#E5B82E] px-4 py-2 text-xs font-bold text-[#09090B] hover:bg-[#F2C94C] transition-colors cursor-pointer"
                >
                  Mostrar Todos
                </button>
              </div>
            ) : (
              <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((product) => {
                  const defaultVariant = product.variants[0];
                  const installment = Math.round(defaultVariant.price / 12);

                  return (
                    <article
                      key={product.id}
                      className="group flex flex-col overflow-hidden rounded-xl border border-white/10 bg-[#121216] transition-transform duration-150 hover:-translate-y-0.5 hover:border-[#E5B82E]/40"
                    >
                      <button
                        type="button"
                        onClick={() => setActiveProduct(product)}
                        className="relative aspect-[4/3] w-full overflow-hidden bg-[#09090B] text-left cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E5B82E]"
                      >
                        <SmartImage
                          src={product.image}
                          alt={product.imageAlt}
                          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                          fallbackTitle={product.name}
                        />
                      </button>

                      <div className="flex flex-1 flex-col justify-between p-5 gap-5">
                        <div>
                          <div className="flex items-center gap-2 text-xs font-medium text-zinc-400">
                            <span className="text-[#E5B82E]">{product.category}</span>
                            <span aria-hidden="true">·</span>
                            <span className="truncate">{product.conditionLabel}</span>
                          </div>

                          <h3 className="mt-2 text-base font-semibold leading-snug text-white">
                            <button
                              type="button"
                              onClick={() => setActiveProduct(product)}
                              className="text-left hover:text-[#E5B82E] transition-colors cursor-pointer"
                            >
                              {product.name}
                            </button>
                          </h3>

                          <p className="mt-1 text-xs text-zinc-400 truncate">
                            {product.shortSpec}
                          </p>
                        </div>

                        <div className="border-t border-white/10 pt-4">
                          <div className="flex items-baseline justify-between gap-2">
                            <div>
                              <span className="block text-[11px] text-zinc-400">
                                À vista no Pix
                              </span>
                              <span className="text-xl font-bold tabular-nums text-[#E5B82E]">
                                {formatBRL(defaultVariant.pixPrice)}
                              </span>
                            </div>
                            <span className="text-xs tabular-nums text-zinc-400">
                              ou 12x de {formatBRL(installment)}
                            </span>
                          </div>

                          <div className="mt-4 grid grid-cols-2 gap-2.5">
                            <button
                              type="button"
                              onClick={() => setActiveProduct(product)}
                              className="rounded-lg border border-white/15 bg-[#18181D] px-3 py-2.5 text-xs font-semibold text-white hover:border-[#E5B82E] transition-colors whitespace-nowrap cursor-pointer"
                            >
                              Ver Detalhes
                            </button>
                            <button
                              type="button"
                              onClick={() => handleAddToCart(product, defaultVariant)}
                              className="inline-flex items-center justify-center gap-1.5 rounded-lg bg-[#E5B82E] px-3 py-2.5 text-xs font-bold text-[#09090B] hover:bg-[#F2C94C] active:scale-[0.98] transition-all whitespace-nowrap cursor-pointer"
                            >
                              <ShoppingBag className="h-3.5 w-3.5" />
                              <span>Adicionar</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    </article>
                  );
                })}
              </div>
            )}
          </div>
        </section>

        {/* Section 3: Trade-In & Upgrade Program */}
        <section id="upgrade" className="py-16 lg:py-20 border-b border-white/10">
          <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
              <div className="lg:col-span-6 overflow-hidden rounded-xl border border-white/10 bg-[#121216] min-h-[380px]">
                <SmartImage
                  src={STORE_ASSETS.upgradeBanner}
                  alt="Vai trocar de game? Faça seu upgrade com a Guga Games — o seu game antigo como parte do pagamento"
                  className="h-full w-full object-cover"
                  fallbackTitle="Upgrade Guga Games"
                />
              </div>

              <div className="lg:col-span-6 flex">
                <div className="w-full">
                  <TradeInSimulator onApplyTradeInToBag={handleApplyTradeInToBag} />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 4: About the Store & Location */}
        <section id="loja" className="py-16 lg:py-20">
          <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              <div className="lg:col-span-5 space-y-6" id="localizacao">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-[#E5B82E]">
                    A 01 da Santa Ifigênia
                  </p>
                  <h2 className="mt-2 font-display-heading text-3xl sm:text-4xl font-bold text-white [text-wrap:balance]">
                    Atendimento direto no balcão, sem enrolação.
                  </h2>
                  <p className="mt-3 text-sm leading-relaxed text-zinc-300">
                    Na Guga Games você vê o console antes de fechar negócio, testa na
                    hora com a nossa equipe e sai jogando no mesmo dia. Acompanhe as
                    reposições diárias pelo Instagram oficial ou trace a rota para
                    nossa loja física.
                  </p>
                </div>

                <div className="space-y-4 rounded-xl border border-white/10 bg-[#121216] p-5">
                  <div className="flex items-start gap-3">
                    <MapPin className="h-5 w-5 text-[#E5B82E] shrink-0 mt-0.5" />
                    <div>
                      <h3 className="text-sm font-semibold text-white">Endereço</h3>
                      <p className="text-sm text-zinc-400">
                        {STORE_LINKS.locationShort}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 border-t border-white/10 pt-4">
                    <Clock className="h-5 w-5 text-[#E5B82E] shrink-0 mt-0.5" />
                    <div>
                      <h3 className="text-sm font-semibold text-white">
                        Horário de Funcionamento
                      </h3>
                      <p className="text-sm text-zinc-400">{STORE_LINKS.hours}</p>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                  <a
                    href={STORE_LINKS.maps}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex flex-1 items-center justify-center gap-2 rounded-lg bg-[#E5B82E] px-5 py-3.5 text-sm font-bold text-[#09090B] hover:bg-[#F2C94C] transition-colors whitespace-nowrap"
                  >
                    <MapPin className="h-4 w-4" />
                    <span>Abrir no Google Maps</span>
                    <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                  <a
                    href={STORE_LINKS.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex flex-1 items-center justify-center gap-2 rounded-lg border border-white/15 bg-[#121216] px-5 py-3.5 text-sm font-semibold text-white hover:border-[#E5B82E] transition-colors whitespace-nowrap"
                  >
                    <Instagram className="h-4 w-4 text-[#E5B82E]" />
                    <span>@gugagamess</span>
                  </a>
                </div>
              </div>

              <div className="lg:col-span-7 grid grid-cols-2 gap-4">
                <div className="aspect-[4/3] overflow-hidden rounded-xl border border-white/10 bg-[#121216]">
                  <SmartImage
                    src={STORE_ASSETS.counterOwner}
                    alt="Atendimento presencial no balcão da Guga Games com estoque de PS5"
                    className="h-full w-full object-cover"
                    fallbackTitle="Balcão Guga Games"
                  />
                </div>
                <div className="aspect-[4/3] overflow-hidden rounded-xl border border-white/10 bg-[#121216]">
                  <SmartImage
                    src={STORE_ASSETS.ps5Pro}
                    alt="Reposição de PlayStation 5 Pro na Guga Games"
                    className="h-full w-full object-cover"
                    fallbackTitle="PS5 Pro em Estoque"
                  />
                </div>
                <div className="aspect-[4/3] overflow-hidden rounded-xl border border-white/10 bg-[#121216]">
                  <SmartImage
                    src={STORE_ASSETS.xboxSeries}
                    alt="Consoles Xbox Series S e controles na Guga Games"
                    className="h-full w-full object-cover"
                    fallbackTitle="Linha Xbox Series"
                  />
                </div>
                <div className="aspect-[4/3] overflow-hidden rounded-xl border border-white/10 bg-[#121216]">
                  <SmartImage
                    src={STORE_ASSETS.eaFc26}
                    alt="Lançamento EA Sports FC 26 disponível na Guga Games"
                    className="h-full w-full object-cover"
                    fallbackTitle="Lançamentos Físicos"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-white/10 bg-[#070709] py-10">
        <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-center gap-3.5">
            <div className="h-10 w-14 overflow-hidden rounded border border-[#E5B82E]/35 bg-[#09090B]">
              <SmartImage
                src={STORE_ASSETS.logo}
                alt="Logo oficial Guga Games"
                className="h-full w-full object-cover scale-125"
              />
            </div>
            <div>
              <p className="font-display-heading text-xl font-bold text-white">
                Guga Games
              </p>
              <p className="text-xs text-zinc-400">
                A 01 da Santa Ifigênia · São Paulo - SP
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-6 text-xs text-zinc-400">
            <a href="#catalogo" className="hover:text-[#E5B82E] transition-colors">
              Catálogo
            </a>
            <a href="#upgrade" className="hover:text-[#E5B82E] transition-colors">
              Troca & Upgrade
            </a>
            <a
              href={STORE_LINKS.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#E5B82E] transition-colors"
            >
              Instagram
            </a>
            <a
              href={STORE_LINKS.maps}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#E5B82E] transition-colors"
            >
              Google Maps
            </a>
          </div>

          <p className="text-xs text-zinc-500">
            © {new Date().getFullYear()} Guga Games. Todos os direitos reservados.
          </p>
        </div>
      </footer>

      {/* Toast confirmation */}
      {toastMessage && (
        <div
          role="status"
          aria-live="polite"
          className="fixed bottom-5 right-5 z-40 flex items-center gap-3 rounded-lg border border-[#E5B82E]/50 bg-[#121216] px-4 py-3 text-sm font-medium text-white shadow-xl"
        >
          <ShoppingBag className="h-4 w-4 text-[#E5B82E] shrink-0" />
          <span>{toastMessage}</span>
          <button
            type="button"
            onClick={() => {
              setToastMessage(null);
              setIsCartOpen(true);
            }}
            className="text-xs font-bold text-[#E5B82E] hover:underline ml-1 cursor-pointer"
          >
            Ver Sacola
          </button>
        </div>
      )}

      <ProductModal
        product={activeProduct}
        onClose={() => setActiveProduct(null)}
        onAddToCart={handleAddToCart}
      />

      <CartDrawer
        isOpen={isCartOpen}
        items={cartItems}
        tradeInCredit={tradeInCredit}
        onClose={() => setIsCartOpen(false)}
        onUpdateQty={handleUpdateQty}
        onRemoveItem={handleRemoveItem}
        onClearTradeIn={() => setTradeInCredit(null)}
        onClearCart={() => {
          setCartItems([]);
          setTradeInCredit(null);
        }}
      />
    </div>
  );
}
