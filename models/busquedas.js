const axios = require('axios');

class Busquedas {

    historial = [];

    constructor() {

    }

    async ciudad(lugar = '') {

        try {
            //console.log(lugar);
            const res = await axios.get('https://reqres.in/api/users?page=2');
            console.log(res.data);
        } catch (error) {
            return [];
        }

    }
}

module.exports = Busquedas;