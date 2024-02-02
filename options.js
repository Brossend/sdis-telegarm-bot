module.exports = {
    MENU: {
        reply_markup: JSON.stringify({
            inline_keyboard: [
                [{ text: 'Информация о боте', callback_data: '/info'}],
                [{ text: 'Информация о доступном товаре', callback_data: '/products'}],
                [{ text: 'Информация о контактах для заказа', callback_data: '/order'}]
            ]
        })
    },
    BACK: {
        reply_markup: JSON.stringify({
            inline_keyboard: [
                [{ text: 'Вернуться назад', callback_data: '/start'}],
            ]
        })
    }
}