import axios from 'axios';

const getKuCoinRate = async (baseCurrency: string, quoteCurrency: string): Promise<number> => {
  try {
    let url = `https://api.kucoin.com/api/v1/market/orderbook/level1?symbol=${baseCurrency}-${quoteCurrency}`;
    let response = await axios.get(url);

    if (response.data && response.data.data && response.data.data.price) {
      return parseFloat(response.data.data.price);
    } else {
      url = `https://api.kucoin.com/api/v1/market/orderbook/level1?symbol=${quoteCurrency}-${baseCurrency}`;
      response = await axios.get(url);

      if (response.data && response.data.data && response.data.data.price) {
        return 1 / parseFloat(response.data.data.price);
      } else {
        throw new Error(`Price not found for ${baseCurrency}-${quoteCurrency} or ${quoteCurrency}-${baseCurrency} on KuCoin.`);
      }
    }
  } catch (error) {
    console.error(`Error fetching KuCoin rate for ${baseCurrency}-${quoteCurrency}:`, error);
    throw error;
  }
};

export { getKuCoinRate };
