require("dotenv").config();
const TelegramBot = require("node-telegram-bot-api");
const express = require("express");

const app = express();
app.use(express.json());

// Load the bot token from environment variables
const token = process.env.TELEGRAM_BOT_TOKEN;
if (!token) {
  throw new Error(
    "TELEGRAM_BOT_TOKEN is not defined in the environment variables."
  );
}

console.log("Bot token loaded successfully");

// Determine webhook URL based on environment
const webhookUrl = `https://055f-223-233-84-214.ngrok-free.app/bot${token}`;
// Initialize the Telegram bot
const bot = new TelegramBot(token, { polling: false });

// Set the webhook
bot
  .setWebHook(webhookUrl)
  .then(() => {
    console.log(`Webhook set successfully: ${webhookUrl}`);
  })
  .catch((error) => {
    console.error("Failed to set webhook:", error);
  });

// Handle incoming webhook requests
app.post(`/bot${token}`, (req, res) => {
  bot.processUpdate(req.body);
  res.sendStatus(200);
});

// Root route for testing
app.get("/", (req, res) => {
  res.send("Bot server is running!");
});

// Game logic
const gameShortName = "hellpong";

// Handle /start and /play commands to send the game
bot.onText(/\/(start|play)/, (msg) => {
  const chatId = msg.chat.id;

  bot
    .sendGame(chatId, gameShortName, {
      reply_markup: {
        inline_keyboard: [[]], // Add buttons here if needed
      },
    })
    .catch((error) => {
      console.error("Failed to send game:", error);
    });
});

// Handle callback queries for "Play"
bot.on("callback_query", (query) => {
  bot.answerCallbackQuery(query.id, {
    url: `https://tubular-taiyaki-18463f.netlify.app/`, // Replace with your actual game URL
  });
});

// Start the Express server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
