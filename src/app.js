/* eslint-disable */
import "bootstrap";
import "./style.css";

import "./assets/img/rigo-baby.jpg";
import "./assets/img/4geeks.ico";
let btnDraw = document.querySelector("#btnDraw");
let btnSort = document.querySelector("#btnSort");

let numeros = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];
let pintas = ["♦", "♥", "♠", "♣"];
let orderCards = [];

function createCards(elem) {
  let input = document.getElementById("amountOfCards");
  let amountOfCards = parseInt(input.value); //valido entero para cantidad de cartas a generar
  orderCards = [];

  for (let i = 0; i < amountOfCards; i++) {
    let randomNumber = Math.floor(Math.random() * numeros.length);
    let randomSuit = Math.floor(Math.random() * pintas.length);

    let card = document.createElement("div");
    card.classList.add("card");

    let topSuit = document.createElement("div");
    topSuit.classList.add("topSuit");
    topSuit.innerHTML = pintas[randomSuit];

    let middleNumber = document.createElement("div");
    middleNumber.classList.add("middleNumber");
    middleNumber.innerHTML = numeros[randomNumber];

    let bottonSuit = document.createElement("div");
    bottonSuit.classList.add("bottonSuit");

    if (topSuit.innerHTML === "♥" || topSuit.innerHTML === "♦") {
      topSuit.style.color = "red";
      middleNumber.style.color = "red";
      bottonSuit.style.color = "red";
    } else {
      topSuit.style.color = "black";
      middleNumber.style.color = "black";
      bottonSuit.style.color = "black";
    }

    bottonSuit.innerHTML = topSuit.innerHTML;

    card.appendChild(topSuit);
    card.appendChild(middleNumber);
    card.appendChild(bottonSuit);
    elem.appendChild(card);

    let cardContent = {
      number: parseInt(changeValue(middleNumber.innerHTML)),
      html: card.innerHTML
    };
    orderCards.push(cardContent);
  }
}

/* Traté de que cambie el formato al mostrar pero aún no se puede implementar bien, lo dejo pendiente para preguntar*/

function changeValue(valor) {
  switch (valor) {
    case 1:
      return "A";
    case 11:
      return "J";
    case 12:
      return "Q";
    case 13:
      return "K";
    default:
      return valor;
  }
}
/* DRAW button lógica para la*/

btnDraw.addEventListener("click", e => {
  const cardDeck = document.querySelector("#cardDeck");
  cardDeck.innerHTML = "";
  createCards(cardDeck);
  let sortDeck = document.getElementById("sortDeck");
  sortDeck.innerHTML = "";
});

btnSort.addEventListener("click", e => {
  let sortDeck = document.getElementById("sortDeck");
  sortDeck.innerHTML = "";

  let currentOrder = [...orderCards];

  for (let i = 0; i < currentOrder.length - 1; i++) {
    for (let j = 0; j < currentOrder.length - i - 1; j++) {
      if (currentOrder[j].number > currentOrder[j + 1].number) {
        let temp = currentOrder[j];
        currentOrder[j] = currentOrder[j + 1];
        currentOrder[j + 1] = temp;
      }
    }

    let currentStep = document.createElement("div");
    currentStep.classList.add("lines");
    currentStep.innerHTML = `log ${i + 1}:`;
    sortDeck.appendChild(currentStep);

    for (let h = 0; h < currentOrder.length; h++) {
      let newCard = document.createElement("div");
      newCard.classList.add("newCard");

      newCard.innerHTML = currentOrder[h].html;
      currentStep.appendChild(newCard);
    }
  }
});
