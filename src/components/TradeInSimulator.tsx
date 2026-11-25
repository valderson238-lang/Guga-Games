import { useState } from 'react';
import { ArrowRight, RefreshCw } from 'lucide-react';
import {
  PRODUCTS,
  Product,
  ProductVariant,
  TRADE_IN_DEVICES,
  UPGRADE_TARGETS,
  formatBRL,
} from '../data/catalog';
import { TradeInCredit } from './CartDrawer';

interface TradeInSimulatorProps {
  onApplyTradeInToBag: (
    credit: TradeInCredit,
    targetProduct: Product,
    targetVariant: ProductVariant
  ) => void;
}

export function TradeInSimulator({ onApplyTradeInToBag }: TradeInSimulatorProps) {
  const [selectedDeviceId, setSelectedDeviceId] = useState(TRADE_IN_DEVICES[0].id);
  const [hasBox, setHasBox] = useState(true);
  const [selectedTargetId, setSelectedTargetId] = useState(UPGRADE_TARGETS[0].id);

  const device =
    TRADE_IN_DEVICES.find((d) => d.id === selectedDeviceId) ?? TRADE_IN_DEVICES[0];
  const target =
    UPGRADE_TARGETS.find((t) => t.id === selectedTargetId) ?? UPGRADE_TARGETS[0];

  const estimatedCredit = hasBox ? device.maxEstimate : device.minEstimate;
  const differenceToPay = Math.max(0, target.pixPrice - estimatedCredit);

  const handleApply = () => {
    const productMatch =
      PRODUCTS.find((p) => {
        if (target.id === 'ps5-slim-disco') return p.id === 'ps5-slim-1tb';
        if (target.id === 'ps5-pro-2tb') return p.id === 'ps5-pro-2tb';
        if (target.id === 'switch-oled') return p.id === 'nintendo-switch-oled';
        if (target.id === 'xbox-series-s') return p.id === 'xbox-series-s';
        return false;
      }) ?? PRODUCTS[1];

    const variantMatch =
      productMatch.variants.find((v) => v.pixPrice === target.pixPrice) ??
      productMatch.variants[0];

    onApplyTradeInToBag(
      {
        deviceLabel: device.label,
        conditionLabel: hasBox ? 'Completo na caixa' : 'Sem caixa / Bom estado',
        targetLabel: target.label,
        estimatedCredit,
      },
      productMatch,
      variantMatch
    );
  };

  return (
    <div className="rounded-xl border border-white/10 bg-[#121216] p-6 sm:p-8 flex flex-col justify-between">
      <div>
        <div className="flex items-center gap-2 text-xs font-medium text-[#E5B82E]">
          <RefreshCw className="h-3.5 w-3.5" />
          <span>Simulador de Upgrade</span>
        </div>

        <h3 className="mt-2 font-display-heading text-3xl font-bold text-white">
          Calcule quanto vale seu game antigo na troca
        </h3>
        <p className="mt-2 text-sm text-zinc-400">
          Traga seu console usado no balcão da Santa Ifigênia, testamos na hora e
          você paga apenas a diferença pelo novo.
        </p>

        <div className="mt-6 space-y-5">
          <div>
            <label
              htmlFor="tradein-device"
              className="block text-xs font-medium text-zinc-300 mb-2"
            >
              1. Qual console você tem hoje?
            </label>
            <select
              id="tradein-device"
              value={selectedDeviceId}
              onChange={(e) => setSelectedDeviceId(e.target.value)}
              className="w-full rounded-lg border border-white/15 bg-[#09090B] px-3.5 py-3 text-sm font-medium text-white focus:border-[#E5B82E] focus:outline-none cursor-pointer"
            >
              {TRADE_IN_DEVICES.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <span className="block text-xs font-medium text-zinc-300 mb-2">
              2. Estado do seu aparelho
            </span>
            <div className="grid grid-cols-2 gap-2.5">
              <button
                type="button"
                onClick={() => setHasBox(true)}
                className={`rounded-lg border px-3 py-2.5 text-xs font-semibold transition-colors cursor-pointer ${
                  hasBox
                    ? 'border-[#E5B82E] bg-[#E5B82E]/15 text-white'
                    : 'border-white/10 bg-[#09090B] text-zinc-400 hover:text-white'
                }`}
              >
                Completo na caixa
              </button>
              <button
                type="button"
                onClick={() => setHasBox(false)}
                className={`rounded-lg border px-3 py-2.5 text-xs font-semibold transition-colors cursor-pointer ${
                  !hasBox
                    ? 'border-[#E5B82E] bg-[#E5B82E]/15 text-white'
                    : 'border-white/10 bg-[#09090B] text-zinc-400 hover:text-white'
                }`}
              >
                Sem caixa / Bom estado
              </button>
            </div>
          </div>

          <div>
            <label
              htmlFor="tradein-target"
              className="block text-xs font-medium text-zinc-300 mb-2"
            >
              3. Qual console quer levar?
            </label>
            <select
              id="tradein-target"
              value={selectedTargetId}
              onChange={(e) => setSelectedTargetId(e.target.value)}
              className="w-full rounded-lg border border-white/15 bg-[#09090B] px-3.5 py-3 text-sm font-medium text-white focus:border-[#E5B82E] focus:outline-none cursor-pointer"
            >
              {UPGRADE_TARGETS.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.label} — {formatBRL(item.pixPrice)}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="mt-7 border-t border-white/10 pt-5">
        <div className="grid grid-cols-2 gap-4 rounded-lg bg-[#09090B] border border-white/10 p-4">
          <div>
            <span className="block text-xs text-zinc-400">Seu usado vale até</span>
            <span className="mt-0.5 block text-xl font-bold tabular-nums text-[#E5B82E]">
              {formatBRL(estimatedCredit)}
            </span>
          </div>
          <div className="text-right">
            <span className="block text-xs text-zinc-400">Diferença no Pix</span>
            <span className="mt-0.5 block text-xl font-bold tabular-nums text-white">
              {formatBRL(differenceToPay)}
            </span>
          </div>
        </div>

        <button
          type="button"
          onClick={handleApply}
          className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-[#E5B82E] px-5 py-3.5 text-sm font-bold text-[#09090B] hover:bg-[#F2C94C] active:scale-[0.99] transition-all cursor-pointer"
        >
          <span>Reservar Upgrade na Sacola</span>
          <ArrowRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
