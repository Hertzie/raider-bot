const axios = require('axios');
const fs = require('fs');
let configRaw = fs.readFileSync('./config/credenciales.json');
let configData = JSON.parse(configRaw);
const raider = configData.RAIDER;

exports.ejecutarServicio = async(config, datos) => {
    const raider = config.RAIDER;
    const response = await axios.get(`${raider.base_url}/${raider.personajes}&region=${datos.region}&realm=${datos.reino}&name=${datos.nombre}`);
    const data = response.data;
    return data;
}

exports.ultimosRunsPorJugador = async(datos) => {
    const response = await axios.get(`${raider.base_url}/${raider.personajes}&region=${datos.region}&realm=${datos.reino}&name=${datos.nombre}&fields=mythic_plus_recent_runs`);
    const data = response.data;
    return data;
}

exports.mejoresRunsPorJugador = async(datos) => {
    const response = await axios.get(`${raider.base_url}/${raider.personajes}&region=${datos.region}&realm=${datos.reino}&name=${datos.nombre}&fields=mythic_plus_best_runs`);
    const data = response.data;
    return data;
}

exports.consultarGuild = async() => {
    const response = await axios.get(`${raider.base_url}/${raider.guilds}&region=us&realm=ragnaros&name=Primary%20Instincts`);
    const data = response.data;
    return data;
}