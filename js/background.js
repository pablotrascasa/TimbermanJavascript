var background = {

    backgroundImg: null,                                 //Variable que va a contener la imagen del fondo

    Start: function () {
        this.backgroundImg = new Image();
        this.backgroundImg.src = "./img/background.png"; //Cargamos la imagen para el fondo
    },

    Draw: function (ctx) {
        ctx.save();
        ctx.translate(0,0);                             //Que empiece a dibujar en la coordenada 0x,0y
        ctx.scale(0.45,0.45);                           //Ajustamos la escala para adaptarlo al tamaño del canvas
        ctx.drawImage(this.backgroundImg,0,0);          //Dibujamos el fondo
        ctx.restore();
    }
};