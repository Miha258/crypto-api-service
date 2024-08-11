import { getBinanceRate } from './binanceService';
import { getKuCoinRate } from './kucoinService';

interface Rate {
  exchangeName: string;
  rate: number;
}

const getRates = async (baseCurrency: string, quoteCurrency: string): Promise<Rate[]> => {
  try {
    const binanceRate = await getBinanceRate(baseCurrency, quoteCurrency);
    const kucoinRate = await getKuCoinRate(baseCurrency, quoteCurrency);

    return [
      { exchangeName: 'binance', rate: binanceRate },
      { exchangeName: 'kucoin', rate: kucoinRate }
    ];
  } catch (error) {
    console.error('Error fetching rates:', error);
    throw error;
  }
};

const estimateExchange = async (inputAmount: number, inputCurrency: string, outputCurrency: string): Promise<{ exchangeName: string, outputAmount: number }> => {
  try {
    const rates = await getRates(inputCurrency, outputCurrency);

    let bestExchange = rates[0];
    rates.forEach(exchange => {
      if ((inputAmount * exchange.rate) > (inputAmount * bestExchange.rate)) {
        bestExchange = exchange;
      }
    });

    return {
      exchangeName: bestExchange.exchangeName,
      outputAmount: inputAmount * bestExchange.rate
    };
  } catch (error) {
    console.error('Error estimating exchange:', error);
    throw error;
  }
};

export { getRates, estimateExchange };
