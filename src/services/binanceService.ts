import axios from 'axios';

const getBinanceRate = async (baseCurrency: string, quoteCurrency: string): Promise<number> => {
  try {
    const url = `https://api.binance.com/api/v3/ticker/price?symbol=${baseCurrency}${quoteCurrency}`;
    const response = await axios.get(url);
    return parseFloat(response.data.price);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response && error.response.data && error.response.data.code === -1121) {
        try {
          // Спроба отримати курс для оберненої пари
          const reverseUrl = `https://api.binance.com/api/v3/ticker/price?symbol=${quoteCurrency}${baseCurrency}`;
          const reverseResponse = await axios.get(reverseUrl);
          return 1 / parseFloat(reverseResponse.data.price);
        } catch (reverseError) {
          console.error(`Error fetching reverse Binance rate for ${quoteCurrency}/${baseCurrency}:`, reverseError);
          throw reverseError;
        }
      } else {
        console.error(`Error fetching Binance rate for ${baseCurrency}/${quoteCurrency}:`, error);
      }
    } else {
      console.error('An unknown error occurred:', error);
    }
    throw error;
  }
};

export { getBinanceRate };
