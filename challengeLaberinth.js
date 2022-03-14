//función para encontrar donde se encuentra el jugador, en el caso de que se cambie de posición o que se quiera usar en otro maze
//index1 es la altura del maze, y index2 es el ancho
function findPlayer(maze) {
    for (let index1 = 0; index1 < maze.length; index1++) {
        for (let index2 = 0; index2 < maze[index1].length; index2++) {          
            if( maze[index1][index2]==2){
                return [index1,index2];
            }
        }
    }    
}

//Función que hace que funcione todo junto
function mazeRunner(maze, directions) {
   //Posición original del jugador, array con dos posiciones
   let positionPlayer = findPlayer(maze);
   let keepGoing = true;
   let directionIndex=0;
   //Por cada dirección que nos da el usuario, "movemos" el jugador de posicioón y luego comprobamos los posibles estados del player
    while (keepGoing) {
        // Esta función nos devuelve una nueva array con la nuevas posiciones de indeces a causa de mover el player  Ejemplo [5,1] = move("N",6,1)  
        let newPositionPlayer = move(directions[directionIndex],positionPlayer[0],positionPlayer[1]);
        // hay que sobrescribir los valores antiguos para poder mover el player, si no, el personaje no se mueve
        positionPlayer[0] = newPositionPlayer[0]; 
        positionPlayer[1] = newPositionPlayer[1];
        
        console.log(positionPlayer);
        checkStatus = endGame(maze,positionPlayer[0],positionPlayer[1],directionIndex,directions.length);
        
        //añadir uno mas para cambiar posición en la array de directions
        directionIndex++;
        //si el resultado de la funcion nos da falso el while acabara
        keepGoing=checkStatus[1];
    }   
   return (checkStatus[0]);
}

// "cambia" la posición del player atraves de las variables, no se modifica la array maze
function move(direction,newIndex1,newIndex2){
    switch (direction) {
        case "N":
            newIndex1--;
            break;    
        case "S":
            newIndex1++;
            break;
        case "W":
            newIndex2--;
            break;        
        case "E":
            newIndex2++;
            break;
    }
    return [newIndex1,newIndex2];
}

function endGame(maze,positionPlayer1,positionPlayer2,directionIndex,directionsLenght){
    //comprobar si el player esta dentro de la array, si punto maze[x][y] realmente existe 
    //por alguna razon comprobar la posición maze[x][y] si es undefined daba error, y lo he tenido que controlar por los lenghts
    if (positionPlayer1>=0 && positionPlayer1 < maze.length && positionPlayer2>=0 && positionPlayer2 < maze[1].length ) {
        //cada uno de los casos posibles
        //si se encuetra con una pared 1, muerto
        if (maze[positionPlayer1][positionPlayer2]==1) {
            return ["Dead, you hit a wall",false];
        // el jugador a encontrado la salida
        }else if (maze[positionPlayer1][positionPlayer2]==3) {
            return ["Finish",false];
        // en el caso que no se encuentre en finish(3) y es la última oportunidad de moverse, el jufador esta perdido
        }else if (directionIndex==directionsLenght) {
            return ["Lost",false];
        //no es ninguno de los otros resultados por lo tanto se encuentra en 0 y puede continuar hacia la siguiente dirección
        }else{
            return ["Still going",true];
        }   
    // si el punto maze[x][y] no existe, el player se ha salido del laberinto  
    }else { 
        return ["Dead, falling out of the Labyrinth",false];        
    }
}

var maze = 
[[1, 1, 1, 1, 1, 1, 1],
[1, 0, 0, 0, 0, 0, 3],
[1, 0, 1, 0, 1, 0, 1],
[0, 0, 1, 0, 0, 0, 1],
[1, 0, 1, 0, 1, 0, 1],
[1, 0, 0, 0, 0, 0, 1],
[1, 2, 1, 0, 1, 0, 1]];

console.log(mazeRunner(maze, ["N", "N", "N", "N", "N", "E", "E", "E", "E", "E"]), "Finish");
console.log(mazeRunner(maze, ["N", "N", "N", "W", "W"]), "Dead");
console.log(mazeRunner(maze, ["N", "N", "N", "N", "N", "E", "E", "S", "S", "S", "S", "S", "S"]), "Dead", "Expected Dead");
console.log(mazeRunner(maze, ["N", "E", "E", "E", "E"]), "Lost");
console.log(mazeRunner(maze, ["W", "N", "E", "E", "E"]), "Wall");
