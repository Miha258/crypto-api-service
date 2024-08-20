# Crypto Exchange API

This is a simple API service that provides cryptocurrency exchange rates from Binance and KuCoin. The service supports fetching rates for the following cryptocurrencies: BTC, ETH, and USDT.

## Features

- **/api/estimate**: Estimates the best exchange rate for converting between two cryptocurrencies.
- **/api/getRates**: Returns the exchange rates for a specified cryptocurrency pair across multiple exchanges.

## Prerequisites

- Docker installed on your machine.

## Running the Project with Docker

### Step 1: Clone the Repository

First, clone the repository to your local machine:

```bash
git clone https://github.com/Miha258/crypto-api-service
cd crypto-exchange-api
docker build -t crypto-exchange-api .
docker run -p 3000:3000 crypto-exchange-api
```