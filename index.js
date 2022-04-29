require('dotenv').config();

const { leerInput, inquirerMenu, pausa, listarLugares } = require('./helpers/inquirer');
const Busquedas = require('./models/busquedas');


const main = async () => {

    const busquedas = new Busquedas();

    let opt;

    do {

        opt = await inquirerMenu();

        switch (opt) {
            case 1:
                //Mostrar mensaje
                const lugar = await leerInput('Ciudad: ');
                //Buscar lugares con el lugar que se envió
                const lugares = await busquedas.ciudad(lugar);
                //Seleccionar un lugar de los lugares del resultado
                const id = await listarLugares(lugares);
                if(id === '0')continue;
                const lugarSel = lugares.find(l => l.id === id );
                //Gradar en DB
                busquedas.agregarHistorial(lugarSel.nombre);
                //Clima
                const clima = await busquedas.clima(lugarSel.lat, lugarSel.lng);
                //Mostrar información
                console.log('\nInformación de la ciudad\n'.green);
                console.log('Ciudad: '+lugarSel.nombre);
                console.log('Lat: ' + lugarSel.lat);
                console.log('Lng: ' +lugarSel.lng);
                console.log('Temperatura: '+clima.temp);
                console.log('Minima: '+ clima.min);
                console.log('Maxima: '+ clima.max); 
                console.log('Descripcion: '+ clima.desc.green);

                break;

            case 2:
                busquedas.historialCapitalizado.forEach((lugar,i) => {
                    const idx = `${ i + 1}.`.green;
                    console.log(`${idx} ${lugar}`)
                })
                break;
        }

        if (opt !== 0) await pausa();
    } while (opt !== 0);


}


main();