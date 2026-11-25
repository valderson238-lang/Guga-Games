import { useEffect, useState } from 'react';
import { Check, ShieldCheck, X } from 'lucide-react';
import { Product, ProductVariant, formatBRL } from '../data/catalog';
import { SmartImage } from './SmartImage';

interface ProductModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product, variant: ProductVariant) => void;
}

export function ProductModal({ product, onClose, onAddToCart }: ProductModalProps) {
  const [selectedVariantId, setSelectedVariantId] = useState<string>('');

  useEffect(() => {
    if (product && product.variants.length > 0) {
      setSelectedVariantId(product.variants[0].id);
    }
  }, [product]);

  useEffect(() => {
    if (!product) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [product, onClose]);

  if (!product) return null;

  const activeVariant =
    product.variants.find((v) => v.id === selectedVariantId) ?? product.variants[0];

  const installment = Math.round(activeVariant.price / 12);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby="pdp-title"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-xl border border-white/10 bg-[#121216] text-zinc-100 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Fechar detalhes do produto"
          className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 bg-[#09090B]/90 text-zinc-300 hover:border-[#E5B82E] hover:text-white transition-colors cursor-pointer"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          <div className="bg-[#09090B] p-6 flex items-center justify-center border-b md:border-b-0 md:border-r border-white/10">
            <div className="w-full aspect-[4/3] overflow-hidden rounded-lg bg-[#18181D]">
              <SmartImage
                src={product.image}
                alt={product.imageAlt}
                className="h-full w-full object-cover"
                fallbackTitle={product.name}
              />
            </div>
          </div>

          <div className="p-6 sm:p-8 flex flex-col justify-between gap-6">
            <div>
              <div className="flex items-center gap-2 text-xs font-medium text-[#E5B82E]">
                <span>{product.category}</span>
                <span aria-hidden="true" className="text-zinc-600">·</span>
                <span className="text-zinc-400">{product.conditionLabel}</span>
              </div>

              <h2
                id="pdp-title"
                className="mt-2 font-display-heading text-3xl font-bold tracking-tight text-white"
              >
                {product.name}
              </h2>

              <p className="mt-3 text-sm leading-relaxed text-zinc-300">
                {product.description}
              </p>

              <div className="mt-5">
                <p className="text-xs font-medium text-zinc-400 mb-2">
                  Selecione a edição
                </p>
                <div className="flex flex-col gap-2">
                  {product.variants.map((variant) => {
                    const isSelected = variant.id === activeVariant.id;
                    return (
                      <button
                        key={variant.id}
                        type="button"
                        onClick={() => setSelectedVariantId(variant.id)}
                        className={`flex items-center justify-between gap-3 rounded-lg border px-4 py-3 text-left text-sm transition-colors cursor-pointer ${
                          isSelected
                            ? 'border-[#E5B82E] bg-[#E5B82E]/10 text-white'
                            : 'border-white/10 bg-[#18181D] text-zinc-300 hover:border-white/25'
                        }`}
                      >
                        <span className="font-medium truncate">{variant.label}</span>
                        <span className="font-semibold tabular-nums text-[#E5B82E] shrink-0">
                          {formatBRL(variant.pixPrice)}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <ul className="mt-5 space-y-2 border-t border-white/10 pt-4 text-sm text-zinc-300">
                {product.highlights.map((item) => (
                  <li key={item} className="flex items-start gap-2.5">
                    <Check className="h-4 w-4 text-[#E5B82E] mt-0.5 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="border-t border-white/10 pt-5">
              <div className="flex items-baseline justify-between gap-4">
                <div>
                  <span className="block text-xs text-zinc-400">À vista no Pix</span>
                  <span className="text-3xl font-bold tabular-nums text-[#E5B82E]">
                    {formatBRL(activeVariant.pixPrice)}
                  </span>
                </div>
                <div className="text-right">
                  <span className="block text-xs text-zinc-400">No cartão</span>
                  <span className="text-sm font-medium tabular-nums text-zinc-200">
                    12x de {formatBRL(installment)} ({formatBRL(activeVariant.price)})
                  </span>
                </div>
              </div>

              <div className="mt-3 flex items-center justify-between text-xs text-zinc-400">
                <span className="inline-flex items-center gap-1.5 text-zinc-300">
                  <ShieldCheck className="h-4 w-4 text-[#E5B82E]" />
                  {product.warranty}
                </span>
                <span>{activeVariant.stockLabel}</span>
              </div>

              <button
                type="button"
                onClick={() => {
                  onAddToCart(product, activeVariant);
                  onClose();
                }}
                className="mt-5 w-full rounded-lg bg-[#E5B82E] px-6 py-3.5 text-sm font-bold text-[#09090B] hover:bg-[#F2C94C] active:scale-[0.99] transition-all cursor-pointer"
              >
                Adicionar à Sacola
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
