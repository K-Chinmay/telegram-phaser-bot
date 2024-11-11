require("dotenv").config();
const TelegramBot = require("node-telegram-bot-api");

const token = process.env.TELEGRAM_BOT_TOKEN;
console.log("Bot token:", token); // Check if token loads correctly

const bot = new TelegramBot(token, {
  polling: {
    autoStart: false,
    interval: 300, // Check for updates every 300 ms
    params: { timeout: 10 }, // Long polling timeout
  },
});

const gameShortName = "hellpong";

bot.deleteWebHook().then(() => {
  bot.startPolling();

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

  // Optional: Handle callback queries when users click "Play"
  bot.on("callback_query", (query) => {
    const chatId = query.message.chat.id;
    bot.answerCallbackQuery(query.id, {
      url: `https://tubular-taiyaki-18463f.netlify.app/`,
    });
  });
});
