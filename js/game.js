var canvas;
var ctx;
var pi_2 = Math.PI * 2;
var fixedDeltaTime = 0.01666666;                // 60fps: 1 frame cada 16.66666ms
var deltaTime = fixedDeltaTime;
var time = 0,
    FPS = 0,
    frames = 0,
    acumDelta = 0;
var gameOver = false;                           //Controla si ha finalizado el juego
var selected = false;                           //Controla si se ha pulsado el botón de inicio
var themeAudio = new Audio("./media/theme.ogg"); //Sonido del tema del juego 
var deathAudio = new Audio("./media/death.ogg"); //Sonido de muerte
var logoImg = new Image();
logoImg.src = "./img/timberman_logo.png";       //Logo del juego
var gameOverImg = new Image();
gameOverImg.src = "./img/game-over.png";        //Imagen de game over

function Init() {
  window.requestAnimationFrame = (function(evt) {
    return (
      window.requestAnimationFrame ||
      window.mozRequestAnimationFrame ||
      window.webkitRequestAnimationFrame ||
      window.msRequestAnimationFrame ||
      function(callback) {
        window.setTimeout(callback, fixedDeltaTime * 1000);
      }
    );
  })();
  canvas = document.getElementById("my_canvas");
  if (canvas.getContext) {
    ctx = canvas.getContext("2d");
    Start();                                  //Llamamos a la función Start()
  }
}

function Start() {
    SetupKeyboardEvents();                      //Setup eventos del teclado
    //SetupMouseEvents();                       //Setup eventos de ratón, NO SE USA
    background.Start();                         //Inicializamosmos el fondo
    player.Start();                             //Inicializamos el player
    tree.Start();                               //Inicializamos el arbol
    Loop();                                     //llamamos al Loop()
    
    this.themeAudio.volume = 0.4;               //Ajustamos el volumen del sonido del tema
    this.themeAudio.play();                     //Iniciamos el sonido del tema
}

  function Loop() {
    requestAnimationFrame(Loop);

    if(!selected){                                      //Si no se ha pulsado el botón de inicio
      ctx.clearRect(0, 0, canvas.width, canvas.height); //Borramos el canvas
      background.Draw(ctx);                             //Dibujamos el fondo
      ctx.drawImage(logoImg, 0, 20);                    //Dibujamos el logo
    }else{
      if(!gameOver){                                    //Si se ha pulsado el boton de inicio pero no el juego no ha finalizado
        this.themeAudio.pause();                        //Pausamos el sonido del tema del juego
        this.themeAudio.currentTime = 0;                //Ponemos la linea de tiempo del sonido del tema al segundo 0
     
        var now = Date.now();
        deltaTime = now - time;
      if (deltaTime > 1000)
        // discard if time > 1 seg
        deltaTime = 0;
        time = now;
        frames++;
        acumDelta += deltaTime;

      if (acumDelta > 1000) {
        FPS = frames;
        frames = 0;
        acumDelta -= 1000;
      }

      deltaTime /= 1000;                                  //Transforma deltaTime de milisegundos a segundos
      input.Update();                                     //Llamamos a la función Update() del input

      Update();                                           //Lógica del juego
      Draw();                                             //Dibuja el juego
      }else{
      ctx.drawImage(gameOverImg, 0, 110);                 //Si ha finalizado el juego dibuja la imagen de game over
      ctx.drawImage(logoImg, 0, 20);                      //Dibuja el logo
      ctx.globalCompositeOperation = "source-over";
      ctx.fillStyle = "red"; 
      ctx.font = "70px Arial";
      ctx.fillText(player.score-1, 200, 650);             //Dibuja la puntuación

      setTimeout(function() {
        location.reload();                                //Recarga la página a los 2 segundos de finalizar el juego
      }, 2000);
      }
    }
    input.postUpdate();                                   //Llamamos a la función postUpdate() del input
  }
  
  /*
  Esta función de recoger constantemente las teclas que se han pulsado,
  también de la lógica del jugador y comprobar las colisiones
  */
  function Update() {
    if (input.isKeyDown(KEY_D) || input.isKeyDown(KEY_RIGHT)){ //Si se ha pulsado D o tecla derecha
      player.moveRight = true;
    }
    if (input.isKeyDown(KEY_A) || input.isKeyDown(KEY_LEFT)){ //Si se ha pulsado A o tecla izquierda
      player.moveLeft = true;
    }

   player.Update(deltaTime);                                  //Lógica del player
   CheckCollision();                                          //Comprueba colisiones
  }
  
  /*
  Esta función se encarga del dibujado de los componentes de la escena, se actualiza con el Loop()
  */
  function Draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);       //Limpia el canvas
    background.Draw(ctx);                                   //Dibuja el fondo
    ctx.globalCompositeOperation = "source-over";           
    player.Draw(ctx);                                       //Dibuja el jugador
    tree.Draw(ctx);                                         //Dibuja el árbol
    
  
    // Dibuja los FPS y la puntuacion
    ctx.fillStyle = "white"; 
    ctx.font = "10px Arial";
    ctx.fillText("FPS: " + FPS, 10, 10);
    ctx.fillText("deltaTime: " + Math.round(1 / deltaTime), 10, 20);
    ctx.fillText("Score: " + player.score, 10, 30);
  
  }
  /*
  Esta función controla si el jugador ha chocado con una rama.
  Como los objetos no tienen cuerpo, se calcula comprobando el lado en el que se encuentra el jugador
  con la rama que hay en la posición [0] del array del árbol
  */
  function CheckCollision(){
    if(player.lado==1 && tree.tree[0] == 4){            //Si el jugador está en el lado derecho y el tronco en la posición [0] es la rama hacia la derecha
      this.gameOver=true;                               //Se acaba el juego
      this.deathAudio.play();                           //Inicia el sonido de muerte del jugador
      //console.log("CheckCollision");
    }else if(player.lado==0 && tree.tree[0]==3){        //Si el jugador está en el lado izquierdo y el tronco en la posición [0] es la rama hacia la izquierda
      this.gameOver=true;                               //Se acaba el juego
      this.deathAudio.play();                           //Inicia el sonido de muerte del jugador
      //console.log("CheckCollision");
    }
  }
