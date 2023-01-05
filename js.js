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

const $start=document.querySelector(".start");

$start.addEventListener("click",()=>{
    document.removeEventListener("click",setCeldaValue);
    const celulasVivas=verCelulasVivas();
    morirVivir(celulasVivas);
})
const verCelulasVivas=()=>{
    return celulasVivas=document.querySelectorAll(".celda[data-value='1']");
}
const morirVivir=celulasVivas=>{
    celulasVivas.forEach(celula => {
        
    });
}