require("dotenv").config();
const TelegramBot = require("node-telegram-bot-api");
const express = require("express");

const token = process.env.TELEGRAM_BOT_TOKEN;
console.log("Bot token:", token); // Check if token loads correctly

const bot = new TelegramBot(token, { polling: false }); // Disable polling
const app = express();
app.use(express.json());

// Define your webhook URL
const webhookUrl = `https://055f-223-233-84-214.ngrok-free.app/bot${token}`;

// Set the webhook
bot
  .setWebHook(webhookUrl)
  .then(() => {
    console.log("Webhook set successfully");
  })
  .catch((error) => {
    console.error("Failed to set webhook:", error);
  });

// Handle incoming webhook requests
app.post(`/bot${token}`, (req, res) => {
  bot.processUpdate(req.body);
  res.sendStatus(200);
});

// Game logic
const gameShortName = "hellpong";

// Handle /start and /play commands to send the game
bot.onText(/\/(start|play)/, (msg) => {
  const chatId = msg.chat.id;

  bot
    .sendGame(chatId, gameShortName, {
      reply_markup: {
        inline_keyboard: [[]],
      },
    })
    .catch((error) => {
      console.error("Failed to send game:", error);
    });
});

// Handle callback queries for "Play"
bot.on("callback_query", (query) => {
  bot.answerCallbackQuery(query.id, {
    url: `https://tubular-taiyaki-18463f.netlify.app/`,
  });
});

// Start the Express server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
