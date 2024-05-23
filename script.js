let input=document.getElementById("input-box");
let button=document.getElementById("submit-button");
let showContainer=document.getElementById("show-container");
let listContainer=document.querySelector(".list");

let date= new Date();
console.log(date.getTime());

const [timeStamp, apiKey, hashValue]= ["1710154592618", "2539c3b7c0131ca3c2e46d7caf28ed02", "a22dc185dbf5fd411ccb73291e09c967"];

function displayWords(value){
    input.value = value;
    removeElements();
}

function removeElements(){
    listContainer.innerHTML="";
}

input.addEventListener("keyup", async () => {
    removeElements();
    if(input.value.length < 4){
        return false;
    }

    const url= `https://gateway.marvel.com:443/v1/public/characters?ts=${timeStamp}&apikey=${apiKey}&hash=${hashValue}&nameStartsWith=${input.value}`;

    const response= await fetch(url);
    const jsonData= await response.json();

    jsonData.data["results"].forEach((result) => {
        let name= result.name;
        let div= document.createElement("div");
        div.style.cursor= "pointer";
        div.classList.add("autocomplete-items");
        div.setAttribute("onclick", "displayWords('" + name + "')");
        let word= "<b>" + name.substr(0, input.value.length) + "</b>";
        word += name.substr(input.value.length);
        div.innerHTML= `<p class="item"> ${word} </p>`;
        listContainer.appendChild(div);
    });
});
button.addEventListener("click", (getResult= async() => {
    if(input.value.trim().length < 1){
        alert("Input cannot be blank");
    }
    showContainer.innerHTML= "";
    const url= `https://gateway.marvel.com:443/v1/public/characters?ts=${timeStamp}&apikey=${apiKey}&hash=${hashValue}&name=${input.value}`;

    const response= await fetch(url);
    const jsonData= await response.json();
    jsonData.data["results"].forEach((element) =>{
        showContainer.innerHTML= `<div
        class="card-container">
        <div class="container-character-image">
        <img src="${
            element.thumbnail["path"] + "." + element.thumbnail["extension"]
        }"/></div>
        <div class="character-name">${element.name}</div>
        <div class="character-details">${element.description}</div>
        </div>`;
    });
  })
);

window.onload = () => {
    getResult();
};