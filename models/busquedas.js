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
            return res.data.features.map(lugar => ({
                id: lugar.id,
                nombre: lugar.place_name,
                lng: lugar.center[0],
                lat: lugar.center[1]
            }));


        } catch (error) {
            return [];
        }

    }
}

module.exports = Busquedas;