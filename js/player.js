var player = {

  playerImg: null,                            //Imagen del jugador
  position: {x: 0, y: 0},
  imgScale: 0.4,                              //Escala de la imagen
  score: 0,                                   //Puntuación del jugador
  moveLeft: false,                            //Controlador si ha movido a la izquierda
  moveRight: false,                           //Controlador si ha movido a la derecha
  spriteWidth: 527,                           //Ancho del sprite que queremos dibujar, No del spritesheet
  spriteHeight: 413,                          //Altura del sprite que queremos dibujar, No del spritesheet
  //currentFrame: 0, //current frame
  //timePerFrame: 1/60,
  desX: 60,                                   //Coordenadas en X donde renderizar el sprite
  desY: 1300,                                 //Coordenadas en Y donde renderizar el sprite
  srcX: 1054,                                 //Coordenadas en X donde coger el frame del sprite
  srcY: 0,                                    //Coordenadas en Y donde coger el frame del sprite, este se queda en 0 porque es un sprite de 4x1
  chop: false,                                //Controlador de si el jugador esta cortando o no
  chopAudio: new Audio("./media/cut.ogg"),    //Audio de cortar troncos
  lado: 0,                                    //Controlador del lado en el que se encuentra el jugador

  /*
  Animación, está comentada porque no me dibujaba el personaje,
  lo dejé para el final y no me ha dado tiempo a implementarlo bien
  */
    /*animation: {
      desX: 60,
      desY: 1300, 
      srcX: 1054,
      srcY: 0,
      timePerFrame: 1/24,
      currentFrametime: 0,
      
      Update: function(deltaTime) {
        this.currentFrametime += deltaTime;
        //console.log(this.srcX);
        if (this.currentFrametime >= this.timePerFrame) {
          this.srcX += 527;
          if(this.srcX >= 2108){
              this.srcX = 1054;
          } 
          this.currentFrametime = 0.0;
        }
      },
  
      Draw: function(ctx) {     
        ctx.drawImage(playerImg, this.srcX, this.srcY, this.spriteWidth, this.spriteHeight, this.desX, this.desY, this.spriteWidth, this.spriteHeight);
      }
    },*/

  /*
  Inicializamos el jugador
  */
  Start: function(){
    playerImg = new Image();
    playerImg.src = "./img/man.png";                          //Cargamos la imagen para el jugador
  },

  Update: function (deltaTime)
  {
    //this.animation.Update(deltaTime);
    // Movimiento
    if (this.moveRight)                                       //Si el jugador ha pulsado la tecla D o la Derecha
    {
      this.chop=true;                                         //Ponemos chop a true, esto activará la animación de cortar en el Draw
      tree.RemoveTrunk();                                     //Llamamos a la función eliminar de tree
      console.log('Derecha'); 
      this.lado=1;                                            //Ajustamos el Lado a 1 para controlar las colisiones en game
      this.desX = 700;                                        //Cambiamos la posición del jugador
      this.moveRight = false;                                 //Restauramos el estado del controlador de mover a la derecha
      this.score++;                                           //Incrementamos la puntuación
    }

    if (this.moveLeft)                                        //Si el jugador ha pulsado la tecla A o la Izquierda
    {
      this.chop=true;                                         //Ponemos chop a true, esto activará la animación de cortar en el Draw
      tree.RemoveTrunk();                                     //Llamamos a la función eliminar tronco de tree
      console.log('Izquierda');
      this.lado=0;                                            //Ajustamos el Lado a 0 para controlar las colisiones en game
      this.desX = 60;                                         //Cambiamos la posición del jugador
      this.moveLeft = false;                                  //Restauramos el estado del controlador de mover a la izquierda
      this.score++;                                           //Incrementamos la puntuación
    }
  },

  /*
  Esta función dibuja al jugador, depende del controlador "chop", si está en true, dibuja la animación
  del jugador cortando el tronco, si está en false dibuja la animación del jugador en idle
  */
  Draw: function (ctx)
  {
    if(this.chop == true){                                    //si el controlador chop está en true
      ctx.save();
      ctx.scale(this.imgScale, this.imgScale);
      ctx.drawImage(playerImg, this.srcX, this.srcY, this.spriteWidth, this.spriteHeight, this.desX, this.desY, this.spriteWidth, this.spriteHeight); //Dibujamos al jugador
      this.srcX += 527;                                       //mueve 527px en el spritesheet para cambiar de sprite
        if(this.srcX >= 1054){                                //si llega a este punto del spritesheet,
            this.srcX = 0;                                    //vuelve al punto 0 para reiniciar la animación
            this.chopAudio.play();                            //inicia el sonido de cortar tronco
            this.chop = false;                                //devuelve el estado del jugador a false para que vuelva a idle
        }        
      ctx.restore();
    }else{
      ctx.save();
      ctx.scale(this.imgScale, this.imgScale);
      ctx.drawImage(playerImg, this.srcX, this.srcY, this.spriteWidth, this.spriteHeight, this.desX, this.desY, this.spriteWidth, this.spriteHeight); //Dibujamos al jugador
      this.srcX += 527;                                     //mueve 527px en el spritesheet para cambiar de sprite
        if(this.srcX >= 2108){                              //si llega a este punto del spritesheet,
            this.srcX = 1054;                               //vuelve al punto 1054 para reiniciar la animación
        }
      //this.animation.Draw(ctx);          
      ctx.restore();
    }
  }
};
