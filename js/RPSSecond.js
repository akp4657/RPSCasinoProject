let choice = new Array("rock", "paper", "scissors");
//Card Constructor stores the coices: rock paper, scissors
function Card(cardChoices) {
    this.choice = cardChoices;
}
/*Existing card objects use it to create a card Node which is div element that holds a graphic which is an
img draggable that represents a specific card value
*/
Card.prototype.create=function () {
    let cardNode, faceGraphic
    cardNode = document.createElement("div")
    Graphic = document.createElement("img");
    //Setting style of cards
    Graphic.style.width="150px";
    Graphic.style.height="200px";
    //img name variable
    let graphicSrc;
    if (this.choice == "rock") {
        graphicSrc = "rock.jpg";
        Graphic.className="rockCard ui-widget-content"
    }
    else if (this.choice == "paper") {
        graphicSrc = "paper.jpg";
        Graphic.className = "paperCard ui-widget-content";
    }
    else if (this.choice == "scissors") {
        graphicSrc = "scissors.jpg";
        Graphic.className = "scissorsCard ui-widget-content";
    }
   
    Graphic.src="../images/"+graphicSrc;
    cardNode.appendChild(Graphic);
    return cardNode;
}
//Helper Function that helpes deck of cards be used
function Stack() {
    //Make empty array for deck
    this.cards = new Array();
        }

 //Loops through the deck four times and swaps all 80 cards to a different order in the deck by randomly choosing an
 //int value within the amount of cards in the deck and swap index with another card
Stack.prototype.shuffle = function () 
{
    for (let i = 0; i < 20; i++) {
        for (let j = 0; j < this.cards.length; j++) {
            let k = Math.floor(Math.random() * this.cards.length);
            temp = this.cards[j];
            this.cards[j] = this.cards[k];
            this.cards[k] = temp;
        }
    }
}
Stack.prototype.draw = function () 
{
    console.log(this.cards);
    let ret = null;
    if(this.cards.length > 0) {
      ret = Array(3);
      for(let i = 0; i < 3; i++) {
          ret[i] = this.cards.pop();
      }
    }
  
      return ret;
}

Stack.prototype.cardCount =function () 
{
    return this.cards.length;
}
//Function an existing stack uses to create a new deck
//Takes in an options and loops through the options length based on amount of cards needed in deck
Stack.prototype.CreateDeck = function(n) 
{
    let options = new Array("rock", "paper", "scissors")
    this.cards = new Array(n);
    for (let i = 0; i < n; i++) 
    {
        for (let j = 0; j < options.length; j++) 
        {
            this.cards[i] = new Card(options[i % options.length]);
        }
    }
};
//Global Variables for Game State
let deck, dealRound, dealerHand, playerHand,playerScore,dealerScore;
let playerScoreText, dealerScoreText;
let playerCardPlayed, dealerCardPlayed;
window.onload = init;
//Initalizing Hands and a deck variable on load
function init() {
    deck = new Stack();
    //Creating hand for dealer and player
    dealerHand = new Hand("dealer")
    playerHand = new Hand("player")
    playerScore=0;
    dealerScore=0;
    dealerScoreText = document.getElementById("dealerScoreText")
    playerScoreText = document.getElementById("playerScoreText");
    
}
//Hand Function that creates a new card array that is the hand of the respective player
//Param is id of the owner of the hand
function Hand(id) 
{
    this.cards = new Array();
    
    this.handzone = document.getElementById(id)
    this.cardNode = document.getElementById(id + "Cards")
    
    
}
//Function used by existing hand objects to remove all card objects from its cardNode array
Hand.prototype.clear = function()
{
    //Removes cards from cardNodeArray until no more
    while (this.cardNode.lastChild)
        {
            this.cardNode.removeChild(this.cardNode.lastChild);
        }
        //Initializes new card array
    this.cards = new Array();
}
/*Function that existing hand objects use to clear cards in its hand array
does so by callng clear 
*/
Hand.prototype.reset =  function()
{
    this.clear();
    this.cards= new Array();
}
/* function that an existing hand object uses to add cards to its array
*/
Hand.prototype.add = function (card)
{
    let number;
    let node;
    for(let i =0; i <card.length;i++)
    {
        this.cards[i]=card[i];
        
        node = this.cards[i].create();
        this.cardNode.appendChild(node);
        console.log(node);
       
    }
    
}


//# region DuringGame functions
function newDeck()
{
    deck.CreateDeck(200);
    deck.shuffle();
    
}
/* Give cards to computer and player, if no cards left in deck make new deck
*/
function getHand()
{
    if(deck.cardCount()==0)
    {
        newDeck(200);
    }
    return deck.draw();
}
           //initalizing the jqery ui plugins after i create the draggable images through the card create function
           //because jquery ui is looking for objects that already have the class name if jquery is not loaded during start
           //round jquery ui plugin cannot locate the objects 
function StartRound()
{
    dealerHand.reset();
    playerHand.reset();
    dealRound=1;
    DealRound();
   //Creating draggable cards
    $(".rockCard").draggable({ revert: "invalid" });
    $(".paperCard").draggable({ revert: "invalid" });
    $(".scissorsCard").draggable({ revert: "invalid" });
    //Creating three specific drop zones for each card
    $("#dropzoneRock").droppable({
        accept:".rockCard",
        classes: {
            "ui-droppable-hover": "ui-state-hover"
        },
         //After drop set the player's card to the right value, calculate computer play, and then compare card method
        drop: function (event, ui) {
            $(this)
            playerCardPlayed ="rock";
            ComputerPlay();
            alert("You Played: "+playerCardPlayed+"\nDealer Played: "+dealerCardPlayed);
            CompareCard(dealerCardPlayed,playerCardPlayed);
        }
    });
    $("#dropzonePaper").droppable({
        accept:".paperCard",
        classes: {
            "ui-droppable-hover": "ui-state-hover"
        },
        drop: function (event, ui) {
            $(this)
            playerCardPlayed ="paper";
            ComputerPlay();
            alert("You Played: "+playerCardPlayed+"\nDealer Played: "+dealerCardPlayed);
            CompareCard(dealerCardPlayed,playerCardPlayed);
        }
    });
    $("#dropzoneScissors").droppable({
        activeClass: "ui-state-highlight",
        accept:".scissorsCard",
        classes: {
            "ui-droppable-hover": "ui-state-hover"
            
        },
        drop: function (event, ui) {
            $(this)
            playerCardPlayed ="scissors";
            ComputerPlay();
            alert("You Played: "+playerCardPlayed+"\nDealer Played: "+dealerCardPlayed);
            CompareCard(dealerCardPlayed,playerCardPlayed);
        }
    });
    
}
/* The deal round, uses a switch statement to give card from player to dealer in order
*/
function DealRound()
{
    while(dealerHand.cards.length<1)
    {
    switch(dealRound)
    {
        case 1: playerHand.add(getHand());
        break;
        case 2: dealerHand.add(getHand());
        break;
        default: return; 
    }
    dealRound++;
    }
        
}

function TieRound()
{
    alert("Unfortunate, it is a tie.");
    playerHand.reset();
    dealerHand.reset();
}
function LoseRound()
{
    dealerScore++;
    alert("What a shame, the house wins.");
    console.log(dealerScore);
    dealerScoreText.innerHTML = `Score: ${dealerScore}`;
    playerHand.reset();
    dealerHand.reset();
    if(dealerScore==5)
    {
        alert("You lost to the house!!")
        newDeck(200);
    }
}
function WinRound()
{
    playerScore++;
    alert("Congratulations, you win!");
    playerScoreText.innerHTML=`Score: ${playerScore}`;
    playerHand.reset();
    dealerHand.reset();
    if(playerScore==5)
    {
        alert("You BEAT THE HOUSE!!")
        newDeck(200);
    }
}

/*Method that accepts the string value of card played and determines which function to use to end round
*/
function CompareCard(dealerCardPlayed, playerCardPlayed)
{
    //If same string tie
    if(dealerCardPlayed==playerCardPlayed)
    {
        TieRound();
    }
    else if(dealerCardPlayed=="paper")
        {
            if(playerCardPlayed=="scissors")
            {
                /*
                anime({
                    targets: '#dropzoneScissors',
                    rotate:{
                      value: '1turn',
                      easing: 'easeInOutSine'
                    },
                    loop: 2
                  }); 
                  */
                  
                WinRound(); 
            }
            if (playerCardPlayed=="rock")
            {
                
                LoseRound();
                
            }
        }
    else if(dealerCardPlayed=="scissors")
    {
        if(playerCardPlayed=="rock")
        {
           
            /*
            anime({
                targets: '#dropzoneRock',
                rotate:{
                  value: '1turn',
                  easing: 'easeInOutSine'
                },
                loop: 2
              }); 
              */
            WinRound(); 
             
        }
         if(playerCardPlayed =="paper" )
        {

            LoseRound();
            
        }
    }
     else if(dealerCardPlayed="rock")
        {
        if(playerCardPlayed=="paper")
        {
               /*
            anime({
                targets: '#dropzonePaper',
                rotate:{
                  value: '1turn',
                  easing: 'easeInOutSine'
                },
                loop: 2
              });
              */
             
            WinRound();
        }
        if (playerCardPlayed=="scissors")
        {
            LoseRound();
        }
        }
}
/* Function that is called after player drops card into drop zone, computer randomly selects a card from hand 
array
*/
function ComputerPlay()
{
    let randomChance = Math.random();
    if(randomChance<0.33)
    {
        dealerCardPlayed = dealerHand.cards[0].choice;
        dealerHand.cards.shift();
    }
    else if(randomChance>0.33&&randomChance>0.66)
    {
        dealerCardPlayed = dealerHand.cards[1].choice;
       
    }
    else
    {
        dealerCardPlayed =dealerHand.cards[2].choice;
        dealerHand.cards.pop();
    }
}//Creating card deck
        