const TelegramApi = require('node-telegram-bot-api');

const { MENU, BACK } = require('./options');
const { START_MASSAGE, INFO_MASSAGE,  ORDER_MASSAGE, MENU_MASSAGE, ERROR_MASSAGE} = require('./massage');
const {getList} = require("./api");

const TOKEN = '6893124057:AAHDpBpiVfxkV7d7D6qlM1WvMjHNoY6Aqps';

const bot = new TelegramApi(TOKEN, { polling: true });

const start = async () => {
    await bot.setMyCommands([
        {command: '/start', description: 'Начальное приветствие'}
    ]);

    bot.on('message', async (msg)=> {
        const text = msg.text;
        const chatId = msg.chat.id;

        if (text === '/start') {
            await bot.sendMessage(chatId, START_MASSAGE);
            return bot.sendMessage(chatId, MENU_MASSAGE, MENU);
        }

        return bot.sendMessage(chatId, ERROR_MASSAGE);
    });

    bot.on('callback_query', async (callback) => {
        const data = callback.data;
        const chatId = callback.message.chat.id;
        if (data === '/start') {
            await bot.sendMessage(chatId, START_MASSAGE);
            return bot.sendMessage(chatId, MENU_MASSAGE, MENU);
        } else if (data === '/info') {
            await bot.sendMessage(chatId, INFO_MASSAGE);
            return bot.sendMessage(chatId, MENU_MASSAGE, BACK);
        } else if (data === '/products') {
            const products = await getList();

            if (products.length === 0) {
                await bot.sendMessage(chatId, `Товары закончились, но не расстраивайтесь! Скоро будет новая поставка 😅`);
            } else {
                for (let product of products) {
                    await bot.sendMessage(chatId, `${product.id}. ${product.name}`);
                }
            }

            return await bot.sendMessage(chatId, MENU_MASSAGE, BACK);
        } else if (data === '/order') {
            await bot.sendMessage(chatId,  ORDER_MASSAGE);
            return bot.sendMessage(chatId, MENU_MASSAGE, BACK);
        }

        return bot.sendMessage(chatId, ERROR_MASSAGE);
    });
};

start();
