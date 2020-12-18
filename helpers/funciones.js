exports.transformarMilisegundosMinutos = (milisegundos) => {
    const minutos = Math.floor(milisegundos / 60000);
    const segundos = ((milisegundos % 60000) / 1000).toFixed(0);
    return minutos + ":" + (segundos < 10 ? '0' : '') + segundos;
}