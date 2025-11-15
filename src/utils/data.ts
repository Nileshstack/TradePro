

export type OHLC = {
  date: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume?: number;
};

export function generateRandomOHLC(days = 200, start = 100): OHLC[] {
  const out: OHLC[] = [];
  let price = start;
  for (let i = 0; i < days; i++) {
    const date = new Date();
    date.setDate(date.getDate() - (days - i));
    const volatility = Math.max(0.5, Math.random() * 2);
    const change = (Math.random() - 0.5) * volatility;
    const open = price;
    const close = Math.max(0.1, price + change);
    const high = Math.max(open, close) + Math.random() * volatility;
    const low = Math.min(open, close) - Math.random() * volatility;
    const volume = Math.round(100 + Math.random() * 1000);
    out.push({ date: date.toISOString().slice(0, 10), open, high, low, close, volume });
    price = close;
  }
  return out;
}

export function sma(values: number[], period = 14): (number | null)[] {
  const out: (number | null)[] = [];
  for (let i = 0; i < values.length; i++) {
    if (i + 1 < period) out.push(null);
    else {
      const sum = values.slice(i + 1 - period, i + 1).reduce((a, b) => a + b, 0);
      out.push(sum / period);
    }
  }
  return out;
}

export function ema(values: number[], period = 14): (number | null)[] {
  const out: (number | null)[] = [];
  const k = 2 / (period + 1);
  let prev: number | null = null;
  for (let i = 0; i < values.length; i++) {
    const v = values[i];
    if (i === 0) {
      prev = v;
      out.push(prev);
    } else {
      prev = prev! * (1 - k) + v * k;
      out.push(prev);
    }
  }
  return out.map((v, idx) => (idx < period - 1 ? null : v));
}

export function bollinger(values: number[], period = 20, mult = 2) {
  const ma = sma(values, period);
  const out: { middle: number | null; upper: number | null; lower: number | null }[] = [];
  for (let i = 0; i < values.length; i++) {
    if (ma[i] === null) out.push({ middle: null, upper: null, lower: null });
    else {
      const slice = values.slice(i + 1 - period, i + 1);
      const mean = ma[i]!;
      const variance = slice.reduce((s, v) => s + Math.pow(v - mean, 2), 0) / period;
      const sd = Math.sqrt(variance);
      out.push({ middle: mean, upper: mean + sd * mult, lower: mean - sd * mult });
    }
  }
  return out;
}

export function rsi(values: number[], period = 14): (number | null)[] {
  const out: (number | null)[] = [];
  let gains = 0;
  let losses = 0;
  for (let i = 0; i < values.length; i++) {
    if (i === 0) {
      out.push(null);
      continue;
    }
    const change = values[i] - values[i - 1];
    gains += Math.max(0, change);
    losses += Math.max(0, -change);
    if (i < period) {
      out.push(null);
    } else if (i === period) {
      const avgGain = gains / period;
      const avgLoss = losses / period;
      const rs = avgLoss === 0 ? 100 : avgGain / avgLoss;
      out.push(100 - 100 / (1 + rs));
    } else {
      const slice = values.slice(i + 1 - period, i + 1);
      let g = 0,
        l = 0;
      for (let j = 1; j < slice.length; j++) {
        const c = slice[j] - slice[j - 1];
        g += Math.max(0, c);
        l += Math.max(0, -c);
      }
      const avgGain = g / period;
      const avgLoss = l / period;
      const rs = avgLoss === 0 ? 100 : avgGain / avgLoss;
      out.push(100 - 100 / (1 + rs));
    }
  }
  return out;
}

export function detectCandlestickPatterns(data: OHLC[]) {

  return data.map((d, i) => {
    const body = Math.abs(d.close - d.open);
    const range = d.high - d.low;
    if (range === 0) return null;
    const bodyPct = body / range;
    if (bodyPct < 0.1) return { type: "doji", index: i };
    if (d.close > d.open && (d.low + (d.high - d.low) * 0.2) > Math.min(d.open, d.close)) return { type: "hammer", index: i };
    if (i > 0) {
      const prev = data[i - 1];
      if (prev.open > prev.close && d.close > d.open && d.close > prev.open && d.open < prev.close) return { type: "bullish_engulfing", index: i };
      if (prev.open < prev.close && d.close < d.open && d.open > prev.close && d.close < prev.open) return { type: "bearish_engulfing", index: i };
    }
    return null;
  });
}
