import axios from 'axios';

const getKuCoinRate = async (baseCurrency: string, quoteCurrency: string): Promise<number> => {
  try {
    const url = `https://api.kucoin.com/api/v1/market/orderbook/level1?symbol=${baseCurrency}-${quoteCurrency}`;
    const response = await axios.get(url);
    return parseFloat(response.data.data.price);
  } catch (error) {
    console.error(`Error fetching KuCoin rate for ${baseCurrency}/${quoteCurrency}:`, error);
    throw error;
  }
};

export { getKuCoinRate };
