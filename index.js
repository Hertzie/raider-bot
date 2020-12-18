const fs = require('fs');
const Discord = require("discord.js");
const { Attachment } = require('discord.js');
let config = fs.readFileSync('./config/credenciales.json');
let token = JSON.parse(config);
const acciones = require('./src/networking/ejectuarHttp.js');
const helpers = require('./helpers/funciones.js');

const cliente = new Discord.Client();
const prefix = "!";

cliente.on('message', async function(message){
    if(message.author.bot) return;
    if (!message.content.startsWith(prefix)) return;

    const commandBody = message.content.slice(prefix.length);
    const args = commandBody.split(' ');
    const command = args.shift().toLowerCase();

    if (command === "consulta") {
       message.reply(`Clickea el link para ir al perfil: https://raider.io/characters/us/ragnaros/${args[0]}`);
    }

    if(command === 'gear'){
        const region = args[0];
        const reino = args[1];
        const nombre = args[2];
        const response = await acciones.ejecutarServicio(token, {region,reino,nombre});
        console.log("Response: ", response);
    }

    if(command === 'guild'){
        const response = await acciones.consultarGuild();
        console.log("Response: ", response);
    }

    if(command === 'ultimosruns'){
        const region = args[0];
        const reino = args[1];
        const nombre = args[2];
        const response = await acciones.ultimosRunsPorJugador({region,reino,nombre});
        
        console.log("Response: ", response);
    }

    if(command === 'mejoresruns'){
        const region = args[0];
        const reino = args[1];
        const nombre = args[2];
        const response = await acciones.mejoresRunsPorJugador({region,reino,nombre});
        
        const nombreJugador = response.name;
        const rolJugador = response.active_spec_role;
        const puntosLogros = response.achievement_points;
        const ultimoRecuento = response.last_crawled_at;
        const dungeons = response.mythic_plus_best_runs.map( r => {return {
            dungeon : r.dungeon,
            nivel : r.mythic_level,
            tiempo : helpers.transformarMilisegundosMinutos(r.clear_time_ms),
            mejora_llave : r.num_keystone_upgrades,
            puntaje : r.score,
            url : r.url
        }});
        /*dungeons.forEach( r => {
            respuesta = respuesta + `
            ${r.url}
            `;
        });*/
        const embedJugador = new Discord.MessageEmbed()
            .setColor('#0099ff')
            .setTitle(`Mejores runs de ${nombreJugador}`)

        dungeons.forEach( r => {
            embedJugador.addFields(
                {name : `${r.dungeon} | Nivel: +${r.nivel} | Tiempo: ${r.tiempo}`, value : r.url}
            );
        });

        message.channel.send(embedJugador);
        
    }

    //const datos = await acciones.ejecutarServicio(config);
    //console.log(datos);
});


cliente.login(token.BOT_TOKEN);

