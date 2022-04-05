const formRecetario = document.getElementById("form-recipe");
const listaRecetas = document.getElementById("listaRecetas");

const listIngredientes = document.getElementById("ingredient-temp-list");


const keyRecetas = "listaRecetas";

document.addEventListener("DOMContentLoaded", function() {
    //Recetas 
    console.log(JSON.parse(localStorage.getItem(keyRecetas)));

    // Enviar recetas
    formRecetario.addEventListener("submit", submitRecipe);

    showRecetas();


});

function submitRecipe(e){
    e.preventDefault(); 
    e.stopPropagation();

    // console.log(formRecetario["title"].value);

    let nuevaReceta = {
        id: Date.now(),
        nombre: formRecetario["title"].value,
        image: formRecetario["img_url"].value,
        description: formRecetario["description"].value,
        ingredientes: listIngredientes[""]
    };

    let list = getRecetasGuardadas();

    list.push(nuevaReceta);

    localStorage.setItem(keyRecetas, JSON.stringify(list));

    showRecetas();

    console.log(list);
}

function showRecetas() {

    let list = getRecetasGuardadas();

    let html = '';

    for(var i = 0; i < list.length; i++) {
        html += 
            `<div class="[ card ] [ bg-secondary color-white ] [ radius shadow ]" id="${list[i].id}">
                <div class="[ flow ]">
                    <img src="${list[i].image}" alt="">
                    <h5>${list[i].nombre}</h5>
                    <div class="[ flex ]" data-state="justify-between">
                        <button class="[ btn ]" data-state="white" onclick="getRecipe(${list[i].id})">Ver</button>
                        <button class="[ btn ]" data-state="warning" onclick="deleteRecipe(${list[i].id})">Eliminar</button>
                    </div>
                </div>
            </div>`;
    }

    listaRecetas.innerHTML = html;
}


function getRecetasGuardadas() {
    let list = JSON.parse(localStorage.getItem(keyRecetas));
    if (list === null)return [];
    else return list;
}

function deleteRecipe(id) {
    // console.log(id);

    let list = getRecetasGuardadas();
    list = list.filter(i => i.id !== id);


    localStorage.setItem(keyRecetas, JSON.stringify(list));

    let receta = document.getElementById(id);

    receta.className += ' hide';

    setTimeout(() => {receta.remove();}, 200);

}

function getRecipe(id){
    titulo = document.getElementById("tituloRecetas");
    titulo.innerHTML = "";

    let list = getRecetasGuardadas();
    
    recipe = null;

    for(var i = 0; i < list.length; i++) {
        if(list[i].id === id)recipe = list[i];
    }
    

    let html = 
            `<h1 class="[ color-primary ] [ text-center ]">Receta</h1>

            <div class="[ recipe ] [ flex ] [ shadow ]">
                <div class="recipe-img">
                    <img src="${recipe.image}" alt="">
                </div>
                <div class="[ recipe-info ] [ flow ]">
                    <h2>${recipe.nombre}</h2>
                    <div class="[ text-justify ]">${recipe.description}</div>
                    <h5>Ingredientes</h5>
                    <ul class="[ recipe-ing ] [ flex ]" data-state="wrap">
                        <li>${i}</li>
                    </ul>
                </div>
            </div>
    
            <div class="text-right">
                <button class="[ btn ]" data-state="primary" onclick="showRecetas()">Volver al listado</button>
            </div>`;
    
    listaRecetas.innerHTML = html;
}