import axios from 'axios';

const getBinanceRate = async (baseCurrency: string, quoteCurrency: string): Promise<number> => {
  try {
    const url = `https://api.binance.com/api/v3/ticker/price?symbol=${baseCurrency}${quoteCurrency}`;
    const response = await axios.get(url);
    return parseFloat(response.data.price);
  } catch (error) {
    console.error(`Error fetching Binance rate for ${baseCurrency}/${quoteCurrency}:`, error);
    throw error;
  }
};

export { getBinanceRate };
