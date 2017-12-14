let choice = new Array("rock", "paper", "scissors");
 //Card Constructor stores the coices: rock paper, scissors
 function Card(cardChoices) {
     this.choice = cardChoices;
 }
/*Existing card objects use it to create a card Node which is div element that holds a graphic which is an
img draggable that represents a specific card value
*/
 Card.prototype.create=function () {
     let cardNode, faceGraphic,rockNode,paperNode,scissorsNode
     cardNode = document.createElement("div")
     Graphic = document.createElement("img");
   
     Graphic.style.width="150px";
     Graphic.style.height="200px";
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
  //Loops through the deck four times and swaps all 80 cards to a different order in the deck
 Stack.prototype.shuffle = function () 
 {
     for (let i = 0; i < 4; i++) {
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
       ret = Array(5);
       for(let i = 0; i < 5; i++) {
           ret[i] = this.cards.pop();
       }
     }
   
       return ret;
 }
 
 Stack.prototype.cardCount =function () 
 {
     return this.cards.length;
 }
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
 let deck, dealRound, dealerHand, playerHand,playerScore,dealerScore;
 let playerScoreText, dealerScoreText;
 let playerCardPlayed, dealerCardPlayed;
 window.onload = init;
 function init() {
     deck = new Stack();
     dealerHand = new Hand("dealer")
     playerHand = new Hand("player");
     playerScore=0;
     dealerScore=0;
     playerScoreText =document.getElementById("playerScore");
     dealerScoreText = document.getElementById("dealerScore");
 }
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
     deck.CreateDeck(80);
     deck.shuffle();
 }
 /* Give cards to computer and player, if no cards left in deck make new deck
 */
 function getHand()
 {
     if(deck.cardCount()==0)
     {
         alert("New Deck");
         newDeck(80);
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
    
     $(".rockCard").draggable({ revert: "invalid" });
     $(".paperCard").draggable({ revert: "invalid" });
     $(".scissorsCard").draggable({ revert: "invalid" });
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
             alert("You played: "+playerCardPlayed+" Dealer Played: "+dealerCardPlayed);
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
             alert("You played: "+playerCardPlayed+" Dealer Played: "+dealerCardPlayed);
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
             alert("You played: "+playerCardPlayed+" Dealer Played: "+dealerCardPlayed);
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
 function ResetRound()
 {
     alert("You tied")
     playerHand.reset();
     dealerHand.reset();
 }
 function LoseRound()
 {
     dealerScore++;
     dealerScoreText.appendChild(dealerScore);
     alert("You Lose")
     playerHand.reset();
     dealerHand.reset();
 }
 function WinRound()
 {
     alert("You Win")
     playerScore++;
     playerScoreText.appendChild(playerScore);
     playerHand.reset();
     dealerHand.reset();
 }
 /*Method that accepts the cards played and determines which function to use to end round
 */
 function CompareCard(dealerCardPlayed, playerCardPlayed)
 {
     
     if(dealerCardPlayed==playerCardPlayed)
     {
         ResetRound();
     }
      else if(dealerCardPlayed=="paper")
         {
             if(playerCardPlayed=="scissors")
             {
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
             WinRound();
         }
          if(playerCardPlayed =="paper" )
         {
             LoseRound();
         }
     }
    else if(dealerCardPlayed=="rock")
     {
         if(playerCardPlayed=="paper")
         {
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
        if(randomChance<0.20)
        {
            dealerCardPlayed = dealerHand.cards[0].choice;
        }
        else if(randomChance<0.4&&randomChance>0.2)
        {
            dealerCardPlayed = dealerHand.cards[1].choice;
        }
        else if(randomChance<0.6&&randomChance>0.4)
        {
            dealerCardPlayed =dealerHand.cards[2].choice;
        }
        else if(randomChance<0.8&&randomChance>0.6)
        {
            dealerCardPlayed =dealerHand.cards[3].choice;
        }
        else 
        {
            dealerCardPlayed =dealerHand.cards[4].choice;
        }
 }