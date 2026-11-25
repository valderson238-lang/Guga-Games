import { useState, type FormEvent } from 'react';
import {
  CheckCircle2,
  Copy,
  ExternalLink,
  Minus,
  Plus,
  ShoppingBag,
  Trash2,
  X,
} from 'lucide-react';
import { Product, ProductVariant, STORE_LINKS, formatBRL } from '../data/catalog';
import { SmartImage } from './SmartImage';

export interface CartItem {
  product: Product;
  variant: ProductVariant;
  quantity: number;
}

export interface TradeInCredit {
  deviceLabel: string;
  conditionLabel: string;
  targetLabel: string;
  estimatedCredit: number;
}

interface CartDrawerProps {
  isOpen: boolean;
  items: CartItem[];
  tradeInCredit: TradeInCredit | null;
  onClose: () => void;
  onUpdateQty: (variantId: string, delta: number) => void;
  onRemoveItem: (variantId: string) => void;
  onClearTradeIn: () => void;
  onClearCart: () => void;
}

export function CartDrawer({
  isOpen,
  items,
  tradeInCredit,
  onClose,
  onUpdateQty,
  onRemoveItem,
  onClearTradeIn,
  onClearCart,
}: CartDrawerProps) {
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [deliveryMode, setDeliveryMode] = useState<'retirada' | 'entrega'>('retirada');
  const [paymentMode, setPaymentMode] = useState<'pix' | 'cartao'>('pix');
  const [confirmedOrder, setConfirmedOrder] = useState<{
    orderCode: string;
    summaryText: string;
    finalTotal: number;
  } | null>(null);
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const subtotalPix = items.reduce(
    (sum, item) => sum + item.variant.pixPrice * item.quantity,
    0
  );
  const subtotalCard = items.reduce(
    (sum, item) => sum + item.variant.price * item.quantity,
    0
  );

  const rawTotal = paymentMode === 'pix' ? subtotalPix : subtotalCard;
  const discountFromTradeIn = tradeInCredit ? tradeInCredit.estimatedCredit : 0;
  const finalTotal = Math.max(0, rawTotal - discountFromTradeIn);

  const handleConfirmReservation = (e: FormEvent) => {
    e.preventDefault();
    if (!customerName.trim() || !customerPhone.trim()) return;

    const orderCode = `GG-${Math.floor(1000 + Math.random() * 9000)}`;
    const lines = [
      `Pedido Guga Games #${orderCode}`,
      `Cliente: ${customerName.trim()} (${customerPhone.trim()})`,
      `Modalidade: ${
        deliveryMode === 'retirada'
          ? 'Retirar na loja (Santa Ifigênia)'
          : 'Entrega / Envio'
      }`,
      `Pagamento: ${paymentMode === 'pix' ? 'À vista no Pix' : 'Cartão em até 12x'}`,
      ...items.map(
        (i) =>
          `- ${i.quantity}x ${i.product.name} (${i.variant.label}) — ${formatBRL(
            (paymentMode === 'pix' ? i.variant.pixPrice : i.variant.price) *
              i.quantity
          )}`
      ),
    ];

    if (tradeInCredit) {
      lines.push(
        `Abatimento estimado (Troca): ${tradeInCredit.deviceLabel} (${tradeInCredit.conditionLabel}) -> -${formatBRL(
          tradeInCredit.estimatedCredit
        )}`
      );
    }

    lines.push(`Total estimado: ${formatBRL(finalTotal)}`);

    setConfirmedOrder({
      orderCode,
      summaryText: lines.join('\n'),
      finalTotal,
    });
    onClearCart();
  };

  const handleCopySummary = async () => {
    if (!confirmedOrder) return;
    try {
      await navigator.clipboard.writeText(confirmedOrder.summaryText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      setCopied(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex justify-end bg-black/75 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-label="Sacola de compras"
      onClick={onClose}
    >
      <div
        className="flex h-full w-full max-w-md flex-col border-l border-white/10 bg-[#121216] text-zinc-100 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-white/10 px-6 py-4">
          <div className="flex items-center gap-2.5">
            <ShoppingBag className="h-5 w-5 text-[#E5B82E]" />
            <h2 className="font-display-heading text-2xl font-bold text-white">
              Sua Sacola
            </h2>
          </div>
          <button
            type="button"
            onClick={() => {
              setConfirmedOrder(null);
              onClose();
            }}
            aria-label="Fechar sacola"
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 text-zinc-300 hover:border-[#E5B82E] hover:text-white transition-colors cursor-pointer"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-5 space-y-5">
          {confirmedOrder ? (
            <div className="rounded-xl border border-[#E5B82E]/35 bg-[#18181D] p-6 space-y-4">
              <div className="flex items-center gap-3 text-[#E5B82E]">
                <CheckCircle2 className="h-7 w-7 shrink-0" />
                <div>
                  <p className="text-xs font-medium text-zinc-400">
                    Reserva registrada
                  </p>
                  <h3 className="text-lg font-bold text-white tabular-nums">
                    Pedido #{confirmedOrder.orderCode} Confirmado
                  </h3>
                </div>
              </div>

              <p className="text-sm text-zinc-300 leading-relaxed">
                Seu resumo está pronto! Copie o comprovante abaixo e envie no nosso
                Instagram Direct para garantir o estoque no balcão da Santa Ifigênia.
              </p>

              <pre className="whitespace-pre-wrap rounded-lg border border-white/10 bg-[#09090B] p-3 text-xs text-zinc-300 font-mono">
                {confirmedOrder.summaryText}
              </pre>

              <div className="flex flex-col gap-2.5 pt-1">
                <button
                  type="button"
                  onClick={handleCopySummary}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-[#E5B82E] px-4 py-3 text-sm font-bold text-[#09090B] hover:bg-[#F2C94C] transition-colors cursor-pointer"
                >
                  <Copy className="h-4 w-4" />
                  {copied ? 'Resumo copiado!' : 'Copiar Resumo do Pedido'}
                </button>

                <a
                  href={STORE_LINKS.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex w-full items-center justify-center gap-2 rounded-lg border border-white/15 bg-[#121216] px-4 py-3 text-sm font-semibold text-white hover:border-[#E5B82E] transition-colors"
                >
                  <span>Enviar no Instagram @gugagamess</span>
                  <ExternalLink className="h-4 w-4" />
                </a>

                <button
                  type="button"
                  onClick={() => {
                    setConfirmedOrder(null);
                    onClose();
                  }}
                  className="w-full py-2 text-xs font-medium text-zinc-400 hover:text-white transition-colors cursor-pointer"
                >
                  Continuar navegando
                </button>
              </div>
            </div>
          ) : items.length === 0 && !tradeInCredit ? (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <ShoppingBag className="h-10 w-10 text-zinc-600 mb-3" />
              <p className="text-base font-semibold text-white">
                Sua sacola está vazia
              </p>
              <p className="mt-1 text-sm text-zinc-400 max-w-xs">
                Escolha um console, lançamento ou simule a troca do seu game usado
                para reservar na Guga Games.
              </p>
              <button
                type="button"
                onClick={onClose}
                className="mt-5 rounded-lg border border-[#E5B82E]/50 px-5 py-2.5 text-sm font-semibold text-[#E5B82E] hover:bg-[#E5B82E] hover:text-[#09090B] transition-colors cursor-pointer"
              >
                Ver Catálogo
              </button>
            </div>
          ) : (
            <>
              {items.length > 0 && (
                <ul className="divide-y divide-white/10">
                  {items.map((item) => {
                    const unitPrice =
                      paymentMode === 'pix'
                        ? item.variant.pixPrice
                        : item.variant.price;
                    return (
                      <li key={item.variant.id} className="py-4 flex gap-3.5">
                        <div className="h-16 w-20 shrink-0 overflow-hidden rounded-lg bg-[#09090B] border border-white/10">
                          <SmartImage
                            src={item.product.image}
                            alt={item.product.name}
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="text-sm font-semibold text-white truncate">
                            {item.product.name}
                          </h3>
                          <p className="text-xs text-zinc-400 truncate">
                            {item.variant.label}
                          </p>
                          <div className="mt-2 flex items-center justify-between">
                            <div className="inline-flex items-center rounded-md border border-white/10 bg-[#09090B]">
                              <button
                                type="button"
                                aria-label="Diminuir quantidade"
                                onClick={() => onUpdateQty(item.variant.id, -1)}
                                className="px-2 py-1 text-zinc-400 hover:text-white cursor-pointer"
                              >
                                <Minus className="h-3.5 w-3.5" />
                              </button>
                              <span className="px-2.5 text-xs font-semibold tabular-nums text-white">
                                {item.quantity}
                              </span>
                              <button
                                type="button"
                                aria-label="Aumentar quantidade"
                                onClick={() => onUpdateQty(item.variant.id, 1)}
                                className="px-2 py-1 text-zinc-400 hover:text-white cursor-pointer"
                              >
                                <Plus className="h-3.5 w-3.5" />
                              </button>
                            </div>
                            <div className="flex items-center gap-3">
                              <span className="text-sm font-bold tabular-nums text-[#E5B82E]">
                                {formatBRL(unitPrice * item.quantity)}
                              </span>
                              <button
                                type="button"
                                aria-label="Remover item"
                                onClick={() => onRemoveItem(item.variant.id)}
                                className="text-zinc-500 hover:text-red-400 transition-colors cursor-pointer"
                              >
                                <Trash2 className="h-4 w-4" />
                              </button>
                            </div>
                          </div>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              )}

              {tradeInCredit && (
                <div className="rounded-lg border border-[#E5B82E]/35 bg-[#E5B82E]/10 p-4">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <p className="text-xs font-medium text-[#E5B82E]">
                        Crédito estimado de troca anexado
                      </p>
                      <p className="mt-1 text-sm font-semibold text-white">
                        {tradeInCredit.deviceLabel}
                      </p>
                      <p className="text-xs text-zinc-300">
                        {tradeInCredit.conditionLabel} · Abate{' '}
                        <span className="font-bold tabular-nums text-[#E5B82E]">
                          -{formatBRL(tradeInCredit.estimatedCredit)}
                        </span>
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={onClearTradeIn}
                      aria-label="Remover aparelho da troca"
                      className="text-zinc-400 hover:text-white cursor-pointer"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              )}

              <form onSubmit={handleConfirmReservation} className="space-y-4 border-t border-white/10 pt-4">
                <div>
                  <p className="text-xs font-medium text-zinc-400 mb-2">
                    Como prefere receber?
                  </p>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setDeliveryMode('retirada')}
                      className={`rounded-lg border px-3 py-2 text-xs font-semibold transition-colors cursor-pointer ${
                        deliveryMode === 'retirada'
                          ? 'border-[#E5B82E] bg-[#E5B82E]/15 text-white'
                          : 'border-white/10 bg-[#18181D] text-zinc-400 hover:text-white'
                      }`}
                    >
                      Retirar na Santa Ifigênia
                    </button>
                    <button
                      type="button"
                      onClick={() => setDeliveryMode('entrega')}
                      className={`rounded-lg border px-3 py-2 text-xs font-semibold transition-colors cursor-pointer ${
                        deliveryMode === 'entrega'
                          ? 'border-[#E5B82E] bg-[#E5B82E]/15 text-white'
                          : 'border-white/10 bg-[#18181D] text-zinc-400 hover:text-white'
                      }`}
                    >
                      Motoboy SP / Envio
                    </button>
                  </div>
                </div>

                <div>
                  <p className="text-xs font-medium text-zinc-400 mb-2">
                    Forma de pagamento
                  </p>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setPaymentMode('pix')}
                      className={`rounded-lg border px-3 py-2 text-xs font-semibold transition-colors cursor-pointer ${
                        paymentMode === 'pix'
                          ? 'border-[#E5B82E] bg-[#E5B82E]/15 text-white'
                          : 'border-white/10 bg-[#18181D] text-zinc-400 hover:text-white'
                      }`}
                    >
                      Pix (Menor Preço)
                    </button>
                    <button
                      type="button"
                      onClick={() => setPaymentMode('cartao')}
                      className={`rounded-lg border px-3 py-2 text-xs font-semibold transition-colors cursor-pointer ${
                        paymentMode === 'cartao'
                          ? 'border-[#E5B82E] bg-[#E5B82E]/15 text-white'
                          : 'border-white/10 bg-[#18181D] text-zinc-400 hover:text-white'
                      }`}
                    >
                      Cartão até 12x
                    </button>
                  </div>
                </div>

                <div className="space-y-2.5">
                  <label className="block">
                    <span className="text-xs font-medium text-zinc-400">Seu nome</span>
                    <input
                      type="text"
                      required
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      placeholder="Ex: Lucas Oliveira"
                      className="mt-1 w-full rounded-lg border border-white/10 bg-[#09090B] px-3.5 py-2.5 text-sm text-white placeholder:text-zinc-600 focus:border-[#E5B82E] focus:outline-none"
                    />
                  </label>
                  <label className="block">
                    <span className="text-xs font-medium text-zinc-400">
                      WhatsApp / Telefone
                    </span>
                    <input
                      type="tel"
                      required
                      value={customerPhone}
                      onChange={(e) => setCustomerPhone(e.target.value)}
                      placeholder="(11) 99999-9999"
                      className="mt-1 w-full rounded-lg border border-white/10 bg-[#09090B] px-3.5 py-2.5 text-sm text-white placeholder:text-zinc-600 focus:border-[#E5B82E] focus:outline-none"
                    />
                  </label>
                </div>

                <div className="border-t border-white/10 pt-4 space-y-1.5 text-sm">
                  <div className="flex justify-between text-zinc-400">
                    <span>Subtotal</span>
                    <span className="tabular-nums text-zinc-200">
                      {formatBRL(rawTotal)}
                    </span>
                  </div>
                  {tradeInCredit && (
                    <div className="flex justify-between text-[#E5B82E]">
                      <span>Abatimento troca</span>
                      <span className="tabular-nums">
                        -{formatBRL(discountFromTradeIn)}
                      </span>
                    </div>
                  )}
                  <div className="flex justify-between text-base font-bold text-white pt-1">
                    <span>Total estimado</span>
                    <span className="tabular-nums text-[#E5B82E]">
                      {formatBRL(finalTotal)}
                    </span>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full rounded-lg bg-[#E5B82E] px-5 py-3.5 text-sm font-bold text-[#09090B] hover:bg-[#F2C94C] active:scale-[0.99] transition-all cursor-pointer"
                >
                  Confirmar Reserva na Guga Games
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
