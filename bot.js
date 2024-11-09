require("dotenv").config();
const TelegramBot = require("node-telegram-bot-api");

// Replace this with your BotFather token
const token = process.env.TELEGRAM_BOT_TOKEN;
const bot = new TelegramBot(token, { polling: true });

// Main /start command that sends Play and Share buttons
bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;

  bot.sendMessage(chatId, "Welcome! Click below to play or share the game.", {
    reply_markup: {
      inline_keyboard: [
        [
          {
            text: "Play Game",
            web_app: { url: "https://tubular-taiyaki-18463f.netlify.app/" }, // Your game URL
          },
          {
            text: "Share Game",
            switch_inline_query: "Jump in for a quick 2 min Game!",
          },
        ],
      ],
    },
  });
});

console.log("Bot is running!");
