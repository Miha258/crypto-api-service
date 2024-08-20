import { getBinanceRate } from './binanceService';
import { getKuCoinRate } from './kucoinService';

interface Rate {
  exchangeName: string;
  rate: number;
}


const getRates = async (baseCurrency: string, quoteCurrency: string): Promise<Rate[]> => {
  const exchanges = [
    { exchangeName: 'binance', getRate: getBinanceRate },
    { exchangeName: 'kucoin', getRate: getKuCoinRate },
    // You can add new services here
  ];

  try {
    const rates = await Promise.all(
      exchanges.map(async (exchange) => {
        const rate = await exchange.getRate(baseCurrency, quoteCurrency);
        return { exchangeName: exchange.exchangeName, rate };
      })
    );
    
    return rates;
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
