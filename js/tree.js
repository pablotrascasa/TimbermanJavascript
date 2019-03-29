var tree = {

    stumpImg: null,                                     //Imagen de la base del arbol
    branchL: null,                                      //Imagen de la rama izquierda
    branchR: null,                                      //Imagen de la rama derecha
    trunk1: null,                                       //Imagen del tronco 1
    trunk2: null,                                       //Imagen del tronco 2
    imgScale: 0.4,                                      //Escala de la imagen
    tree: [],                                           //Array del arbol
    treeY: [1410, 1170, 930, 690, 450, 210, -30],       //Coordenadas en Y donde vamos a dibujar los troncos, se podría haber usado en su lugar sprite.height e ir sumándolo o renstándolo
    treeX: 85,                                          //Coordenadas en X donde vamos a dibujar los troncos
    varTrunk1: 1,                                       //Variable del tronco 1
    varTrunk2: 2,                                       //Variable del tronco 2
    varBranchL: 3,                                      //Variable de la rama izquierda
    varBranchR: 4,                                      //Variable de la rama derecha
    varTemp: null,                                      //Variable temporal, la vamos a usar para dibujar el tronco correspondiente

    /*
    Inicializamos el árbol
    */
    Start: function () {
        this.stumpImg = new Image();
        this.stumpImg.src = "./img/stump.png";          //Cargamos la imagen de la base del arbol
        this.branchL = new Image();
        this.branchL.src = "./img/branch1.png";         //Cargamos la imagen de la rama izquierda
        this.branchR = new Image();
        this.branchR.src = "./img/branch2.png";         //Cargamos la imagen de la rama derecha
        this.trunk1 = new Image();
        this.trunk1.src = "./img/trunk1.png";           //Cargamos la imagen del tronco 1
        this.trunk2 = new Image();
        this.trunk2.src = "./img/trunk2.png";           //Cargamos la imagen del tronco 2

        this.ConstructTree();                            //Llamamos a la función que se encarga de construir el arbol
    },

    Update: function (){

    },

    /*
    Esta función se encarga del dibujado del árbol
    */
    Draw: function (ctx) {
        ctx.save();
        ctx.scale(this.imgScale, this.imgScale);
        ctx.drawImage(this.stumpImg, 400, 1650);                        //Dibujamos la base del arbol
        for(var i=0; i<=6;i++){                                         //Recorremos el array del árbol para ir dibujando 1 a 1 los troncos
            if(this.tree[i]==1){                                        //Si la posición i del array = 1 significa que hay un tronco1
                this.varTemp = this.trunk1;                             //Guardamos en la variable varTemp el contenido de trunk1 que es la imagen
                ctx.drawImage(this.varTemp, this.treeX, this.treeY[i]); //Dibujamos la imagen correspondiente a la variable en la posiciónY correspondiente del array
            }else if(this.tree[i]==2){                                  //Si la posición i del array = 2 significa que hay un tronco2
                this.varTemp = this.trunk2;                             //Guardamos en la variable varTemp el contenido de trunk1 que es la imagen
                ctx.drawImage(this.varTemp, this.treeX, this.treeY[i]); //Dibujamos la imagen correspondiente a la variable en la posiciónY correspondiente del array
            }else if(this.tree[i]==3){                                  //Si la posición i del array = 3 significa que hay una rama izquierda
                this.varTemp = this.branchL;                            //Guardamos en la variable varTemp el contenido de trunk1 que es la imagen
                ctx.drawImage(this.varTemp, this.treeX, this.treeY[i]); //Dibujamos la imagen correspondiente a la variable en la posiciónY correspondiente del array
            }else if(this.tree[i]==4){                                  //Si la posición i del array = 4 significa que hay una rama derecha
                this.varTemp = this.branchR;                            //Guardamos en la variable varTemp el contenido de trunk1 que es la imagen
                ctx.drawImage(this.varTemp, this.treeX, this.treeY[i]); //Dibujamos la imagen correspondiente a la variable en la posiciónY correspondiente del array
            }
        }
        ctx.restore();
    },

    /*
    Esta función se encarga de la construcción del árbol al inicio de la partida
    */
    ConstructTree: function(){
        var trunks = [this.varTrunk1, this.varTrunk2];                  //Array de variables para asignar aleatoriamente uno de cada tipo
        var branchs = [this.varBranchL, this.varBranchR];


        this.tree[0] = this.varTrunk1;                                  //Al principio, los dos primeros troncos no tienen rama para dar margen de maniobra al jugador
        this.tree[1] = this.varTrunk2;

        for(var i=2; i<=6; i++) {                                           //Los siguientes 5 troncos se generan al azar pero
            if(this.tree.length-1 == this.varBranchL  || this.tree[5] == this.varBranchR){ //Si el tronco anterior es una rama directamente pone un tronco liso
                this.tree[i] = trunks[Math.floor(Math.random() * 2)];       //El tipo de tronco 1 o 2, asigna aleatoriamente al 50%
            }else{
                if(Math.random() * 4 <= 1){                                 //Hay una probabilidad entre 4 de que salga un tronco liso
                    this.tree[i] = trunks[Math.floor(Math.random() * 2)];   //El tipo de tronco 1 o 2, asigna aleatoriamente al 50%
                }else{                                                      //Hay 3 probabilidades entre 4 de que salga una rama                                   
                    this.tree[i] = branchs[Math.floor(Math.random() * 2)];  //Si es una rama hacia la derecha o hacia la izquierda se asigna aleatoriamente al 50%
                }                                                         
            }
        }   
    },

    /*
    Esta función se encarga de añadir un tronco, como siempre vamos a pintar el nuevo en la parte de arriba
    podemos controlar directamente en el array la posición que vamos a editar
    */
    AddTrunk: function(){
        var trunks = [this.varTrunk1, this.varTrunk2];                          //Array de variables para asignar aleatoriamente uno de cada tipo
        var branchs = [this.varBranchL, this.varBranchR];

        if(this.tree[5] == this.varBranchL || this.tree[5] == this.varBranchR){ //Si el tronco anterior es una rama directamente pone un tronco liso
            this.tree[6] = trunks[Math.floor(Math.random() * 2)];               //El tipo de tronco 1 o 2, asigna aleatoriamente al 50%
        }else{
            if(Math.random() * 4 <= 1){                                         //Hay una probabilidad entre 4 de que salga un tronco liso
                this.tree[6] = trunks[Math.floor(Math.random() * 2)];           //El tipo de tronco 1 o 2, asigna aleatoriamente al 50%
            }else{                                                              //Hay 3 probabilidades entre 4 de que salga una rama 
                this.tree[6] = branchs[Math.floor(Math.random() * 2)];          //Si es una rama hacia la derecha o hacia la izquierda se asigna aleatoriamente al 50%
            }  
        } 
    },

    /*
    Esta función se encarga de reasignar las variables en el array
    La posición 0 del array pasa a tener el contenido de la posición 1 y así hasta la posición 5
    La posición 6 del array la asignamos con la función Addtrunk()
    */
    RemoveTrunk: function(){
        for(var i=0; i<=5; i++){                                                //Recorremos el array de la posición 0 a la 5
            this.tree[i] = this.tree[i+1];                                      //Ponemos el contenido de la posición siguiente del array en la anterior
        }
        this.AddTrunk();                                                        //Llamamos a la función Addtrunk() para añadir un tronco a la posición 6 del array
       Draw();                                                                  //Llamamos a la función draw
    }

};