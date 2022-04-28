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
                const lugarSel = lugares.find(l => l.id === id );
                //Clima

                console.log('\nInformación de la ciudad\n'.green);
                console.log('Ciudad: '+lugarSel.nombre);
                console.log('Lat: ' + lugarSel.lat);
                console.log('Lng: ' +lugarSel.lng);
                console.log('Temperatura: ');
                console.log('Minima: ');
                console.log('Maxima: ');

                break;

            case 2:
                break;
        }

        if (opt !== 0) await pausa();
    } while (opt !== 0);


}


main();