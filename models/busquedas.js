const axios = require('axios');

class Busquedas {

    historial = [];

    constructor() {

    }

    get paramsMapbox() {
        return{
            'access_token' : process.env.MAPBOX_KEY,
            'limit': 5,
            'language': 'es'
        }
    }

    async ciudad(lugar = '') {

        try {
            //console.log(lugar);
            const instance = axios.create({
                baseURL : `https://api.mapbox.com/geocoding/v5/mapbox.places/${ lugar }.json`,
                params : this.paramsMapbox
            });

            const res = await instance.get();
            console.log(res.data);
        } catch (error) {
            return [];
        }

    }
}

module.exports = Busquedas;