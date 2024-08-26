/*global fetch*/

import { Web3 } from 'web3';

const web3 = new Web3('https://eth-mainnet.g.alchemy.com/v2/ALCHEMY_TOKEN');

const handler = async (event) => {
  let response;
  try {

    // Fetch chain ID and gas price
    const chainId = await web3.eth.getChainId();
    const gasPrice = await web3.eth.getGasPrice();
    const gasPriceGwei = web3.utils.fromWei(gasPrice, 'gwei');

    // Prepare the message
    const message = `Chain ID: ${chainId}, Gas Price (Gwei): ${parseFloat(gasPriceGwei).toFixed(2)}`;

    // Bot's API token
    const token = 'TELEGRAM_TOKEN';
    // Chat ID or your own Telegram user ID
    const chatId = 'CHAT_ID';

    const url = `https://api.telegram.org/bot${token}/sendMessage`;
    const params = {
      chat_id: chatId,
      text: message,
    };

    // Send a request to the Telegram API
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(params),
    });
    const data = res.json();
    response = {
      statusCode: 200,
      body: data,
    };
  } catch (e) {
    response = {
      statusCode: 500,
      body: e.message,
    };
  }
  return response;
};

module.exports = { handler };
