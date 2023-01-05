//INICIO
(()=>{
    const $tablero=document.querySelector(".tablero");
    const $fragment=document.createDocumentFragment();
    for (let fila = 0; fila < 20 ; fila++) {
        for (let col = 0; col < 40; col++) {
            const celda=document.createElement("div");
            celda.classList.add("celda");
            celda.dataset.value="0";
            celda.dataset.fila=fila;
            celda.dataset.col=col;
            $fragment.appendChild(celda)
        }
    }
    $tablero.appendChild($fragment);

    const setCeldaValue=(e)=>{
        if(e.target.matches(".celda")){
            const celda=e.target;
            if(celda.dataset.value=="0")
                celda.dataset.value="1";
            else
                celda.dataset.value="0";
        }
    }
    document.addEventListener("click",setCeldaValue);
})();
//GLOBAL
let muerteCelula=[];
let vidaCelula=[];
const coordenadas={
    no:{fila:-1,col:-1},
    n:{fila:-1,col:0},
    ne:{fila:-1,col:1},
    o:{fila:0,col:-1},
    e:{fila:0,col:1},
    so:{fila:1,col:-1},
    s:{fila:1,col:0},
    se:{fila:1,col:1}
}
let timer;
//START
document.querySelector(".start").addEventListener("click",()=>{

    timer=setInterval(() => {
        //obtenemos todas las celulas  vivas
        let celulas=document.querySelectorAll(".celda[data-value='1']");
        celulas.forEach(celula=>{
            celulasVecinas(celula);
        })
        muerteCelula.forEach(celula=>celula.dataset.value=0);
        vidaCelula.forEach(celula=>celula.dataset.value=1);
        vidaCelula=[];
        muerteCelula=[];
    }, 1000);
})
const celulasVecinas=(celula)=>{
    const celulasVecinasVivas=[];
    const celulasVecinasMuertas=[];
    for (const coord in coordenadas) {
        const fila=Number(celula.dataset.fila)+Number(coordenadas[coord].fila);
        const col=Number(celula.dataset.col)+Number(coordenadas[coord].col);
        if(fila>=20 || fila<0 || col>=40 || col<0){
            continue;
        }
        const celda=document.querySelector(`[data-fila='${fila}'][data-col='${col}']`);
        
        if(celda.dataset.value=="1") celulasVecinasVivas.push(celda);
        else celulasVecinasMuertas.push(celda);
    }
    //SI NO HAY DOS O TRES CELULAS VECINAS, LA CELULA PRIMOGENIA MUERE
    if(celulasVecinasVivas.length!==2 && celulasVecinasVivas.length!==3){
        muerteCelula.push(celula)
    }
    celulasVecinasMuertas.forEach(celulasResicitar)
}
const celulasResicitar=(celula)=>{
    const celulasVecinasVivas=[];
    for (const coord in coordenadas) {
        const fila=Number(celula.dataset.fila)+Number(coordenadas[coord].fila);
        const col=Number(celula.dataset.col)+Number(coordenadas[coord].col);
        if(fila>=20 || fila<0 || col>=40 || col<0){
            continue;
        }
        const celda=document.querySelector(`[data-fila='${fila}'][data-col='${col}']`);
        
        if(celda.dataset.value=="1") celulasVecinasVivas.push(celda);
    }
    if(celulasVecinasVivas.length===3)vidaCelula.push(celula);
}

//PAUSE
document.querySelector(".pause").addEventListener("click",()=>{
    clearTimeout(timer)
})
