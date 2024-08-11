import express, { Request, Response } from 'express';
import { getRates, estimateExchange } from '../services/exchangeService';

const router = express.Router();

// GET Rates Endpoint
router.get('/getRates', async (req: Request, res: Response) => {
  const { baseCurrency, quoteCurrency } = req.query;
  if (!baseCurrency || !quoteCurrency) {
    return res.status(400).json({ error: 'Missing query parameters' });
  }
  try {
    const rates = await getRates(baseCurrency.toString().toUpperCase(), quoteCurrency.toString().toUpperCase());
    res.json(rates);
  } catch (error) {
    console.error('Error in /getRates endpoint:', error);
    res.status(500).json({ error: 'Error fetching rates' });
  }
});

// Estimate Endpoint
router.get('/estimate', async (req: Request, res: Response) => {
  const { inputAmount, inputCurrency, outputCurrency } = req.query;
  if (!inputAmount || !inputCurrency || !outputCurrency) {
    return res.status(400).json({ error: 'Missing query parameters' });
  }
  try {
    const result = await estimateExchange(parseFloat(inputAmount.toString()), inputCurrency.toString().toUpperCase(), outputCurrency.toString().toUpperCase());
    res.json(result);
  } catch (error) {
    console.error('Error in /estimate endpoint:', error);
    res.status(500).json({ error: 'Error estimating exchange' });
  }
});

export default router;
