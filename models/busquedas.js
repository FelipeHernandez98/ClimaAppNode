const fs = require('fs')
const axios = require('axios');

class Busquedas {

    historial = [];
    dbPath = './db/database.json';

    constructor() {
        this.leerDB();
    }

    //Metodo para poner en mayusculas las iniciales
    get historialCapitalizado(){
        return this.historial.map( lugar => { //Se recorre el arreglo

            let palabras = lugar.split(' '); // Se crea el arreglo palabras, y se divide por espacios
            palabras = palabras.map( p => p[0].toUpperCase() + p.substring(1) ); //Se recorre el arreglo y se pone en mayuscula la primera lettra + el resto

            return palabras.join(' ');//Se uno el arreglo y se envia

        })
    }

    get paramsMapbox() {
        return{
            'access_token' : process.env.MAPBOX_KEY,
            'limit': 5,
            'language': 'es'
        }
    }

    get paramsOpenWeather(){
        return{
            appid: process.env.OPENWEATHER_KEY,
            units: 'metric',
            lang: 'es'
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


    async clima(lat, lon){
        try {
            const instance = axios.create({
                baseURL: 'https://api.openweathermap.org/data/2.5/weather',
                params : {...this.paramsOpenWeather, lat, lon}
            });

            const res = await instance.get();
            const {weather, main}= res.data;
            return {
                desc: weather[0].description,
                min: main.temp_min,
                max: main.temp_max,
                temp: main.temp
            }
        } catch (error) {
            console.log(error)
        }
    }

    agregarHistorial(lugar = ''){

        if(this.historial.includes(lugar.toLocaleLowerCase())){
            return;
        }

        this.historial = this.historial.splice(0,5);

        this.historial.unshift(lugar.toLocaleLowerCase());
        this.guardarDB();
    }

    guardarDB(){

        const payload = {
            historial: this.historial
        }

        fs.writeFileSync(this.dbPath, JSON.stringify(payload));
    }

    leerDB(){
        if(!fs.existsSync(this.dbPath)) return;

        const info = fs.readFileSync(this.dbPath, {encoding: 'utf-8'});
        const data = JSON.parse(info);

        this.historial = data.historial;
    }
}

module.exports = Busquedas;