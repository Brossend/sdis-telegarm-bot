const { get } = require('axios');

const getList = async () => {
    try {
        const res = await get('https://1a87c0cadaa76017.mokky.dev/products');

        if (res.status === 200) {
            return res.data;
        }
    } catch (e) {
        console.error(e)
    }

    return [];
};

module.exports.getList = getList;