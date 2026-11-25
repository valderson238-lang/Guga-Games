import { ShoppingBag } from 'lucide-react';
import { STORE_ASSETS } from '../data/catalog';
import { SmartImage } from './SmartImage';

interface NavbarProps {
  cartCount: number;
  onOpenCart: () => void;
}

export function Navbar({ cartCount, onOpenCart }: NavbarProps) {
  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-[#09090B]/95 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-[1280px] items-center justify-between gap-8 px-4 sm:px-6 lg:px-8">
        <a
          href="#topo"
          className="flex items-center gap-3 whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E5B82E] rounded-md"
        >
          <div className="h-9 w-12 overflow-hidden rounded border border-[#E5B82E]/35 bg-[#09090B]">
            <SmartImage
              src={STORE_ASSETS.logo}
              alt="Logo Guga Games"
              className="h-full w-full object-cover scale-125"
              fallbackTitle="GG"
            />
          </div>
          <span className="font-display-heading text-2xl font-bold tracking-tight text-white">
            Guga Games
          </span>
        </a>

        <nav
          aria-label="Navegação principal"
          className="hidden md:flex items-center gap-7 text-sm font-medium text-zinc-300"
        >
          <a
            href="#catalogo"
            className="whitespace-nowrap shrink-0 py-1 border-b border-transparent hover:border-[#E5B82E] hover:text-white transition-colors duration-150"
          >
            Catálogo
          </a>
          <a
            href="#upgrade"
            className="whitespace-nowrap shrink-0 py-1 border-b border-transparent hover:border-[#E5B82E] hover:text-white transition-colors duration-150"
          >
            Upgrade
          </a>
          <a
            href="#loja"
            className="whitespace-nowrap shrink-0 py-1 border-b border-transparent hover:border-[#E5B82E] hover:text-white transition-colors duration-150"
          >
            A Loja
          </a>
          <a
            href="#localizacao"
            className="whitespace-nowrap shrink-0 py-1 border-b border-transparent hover:border-[#E5B82E] hover:text-white transition-colors duration-150"
          >
            Localização
          </a>
        </nav>

        <div className="flex items-center shrink-0">
          <button
            type="button"
            onClick={onOpenCart}
            className="inline-flex items-center gap-2 rounded-lg bg-[#E5B82E] px-4 py-2 text-sm font-semibold text-[#09090B] hover:bg-[#F2C94C] active:scale-[0.98] transition-all duration-150 whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white cursor-pointer"
          >
            <ShoppingBag className="h-4 w-4 shrink-0" strokeWidth={2.2} />
            <span className="tabular-nums">
              {cartCount > 0 ? `Sacola (${cartCount})` : 'Sacola'}
            </span>
          </button>
        </div>
      </div>
    </header>
  );
}
