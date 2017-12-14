// #region CardandDeckCreation

        let choice = new Array("rock", "paper", "scissors,lizard,spock");
        let computerChoice;
        let draw;
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
            //Setting style of card
            Graphic.style.width="100px";
            Graphic.style.height="150px";
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
           else if(this.choice=="lizard")
           {
               graphicSrc="lizard.jpg";
               Graphic.className = "lizardCard ui-widget-content";
           }
           else if(this.choice=="spock")
           {
               graphicSrc = "spock.jpg";
               Graphic.className="spockCard ui-widget-content"
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
         //Loops through the deck ten times and swaps all 80 cards to a different order in the deck
        Stack.prototype.shuffle = function ShuffleCards() 
        {
            for (let i = 0; i < 10; i++) {
                for (let j = 0; j < this.cards.length; j++) {
                    let k = Math.floor(Math.random() * this.cards.length);
                    temp = this.cards[j];
                    this.cards[j] = this.cards[k];
                    this.cards[k] = temp;
                }
            }
        }
        //Drawing 5 cards
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
        //function that returns cardCount
        Stack.prototype.cardCount =function () 
        {
            return this.cards.length;
        }
        //Function that creates a deck based on the amount of cards wanted in deck and iterates over options array
        //adds them in iteratively, shuffle deck in separate function
		Stack.prototype.CreateDeck = function(n) 
        {
            let options = new Array("rock", "paper", "scissors","lizard","spock")
            this.cards = new Array(n);
            for (let i = 0; i < n; i++) 
            {
                for (let j = 0; j < options.length; j++) 
                {
                    this.cards[i] = new Card(options[i % options.length]);
                }
            }
        };
        //Global Variables
        let deck, dealRound, dealerHand, playerHand,playerScore,dealerScore;
        let playerScoreText, dealerScoreText;
        let playerCardPlayed, dealerCardPlayed;
        window.onload = init;
        //On load create a deck variable to use to use stack functions
        //initalize hands and find the score box in the document
        function init() {
            deck = new Stack();
            dealerHand = new Hand("dealer")
            playerHand = new Hand("player");
            playerScoreText =document.getElementById("playerScore");
            dealerScoreText = document.getElementById("dealerScore");
        }
        //Hand constructor takes a string parameter to find the right owner of the hand
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
        /* Start Round function, where I reset hands and the round is dealt also load in the jquery draggable
        */
        function StartRound()
        {
            dealerHand.reset();
            playerHand.reset();
            //Index for dealing cards in order
            dealRound=1;
            //Deak round after start round
            DealRound();
           //initalizing the jqery ui plugins after i create the draggable images through the card create function
           //because jquery ui is looking for objects that already have the class name if jquery is not loaded during start
           //round jquery ui plugin cannot locate the objects 
            $(".rockCard").draggable({ revert: "invalid" });
            $(".paperCard").draggable({ revert: "invalid" });
            $(".scissorsCard").draggable({ revert: "invalid" });
            $(".spockCard").draggable({ revert: "invalid" });
            $(".lizardCard").draggable({ revert: "invalid" });
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
                    alert("You played: "+playerCardPlayed+"\nDealer Played: "+dealerCardPlayed);
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
                    alert("You played: "+playerCardPlayed+"\nDealer Played: "+dealerCardPlayed);
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
                    alert("You played: "+playerCardPlayed+"\nDealer Played: "+dealerCardPlayed);
                    CompareCard(dealerCardPlayed,playerCardPlayed);
                }
            });
            $("#dropzoneSpock").droppable({
                activeClass: "ui-state-highlight",
                accept:".spockCard",
                classes: {
                    "ui-droppable-hover": "ui-state-hover"
                    
                },
                drop: function (event, ui) {
                    $(this)
                    playerCardPlayed ="spock";
                    ComputerPlay();
                    alert("You played: "+playerCardPlayed+"\nDealer Played: "+dealerCardPlayed);
                    CompareCard(dealerCardPlayed,playerCardPlayed);
                }
            });
            $("#dropzoneLizard").droppable({
                activeClass: "ui-state-highlight",
                accept:".lizardCard",
                classes: {
                    "ui-droppable-hover": "ui-state-hover"
                    
                },
                drop: function (event, ui) {
                    $(this)
                    playerCardPlayed ="lizard";
                    ComputerPlay();
                    alert("You played: "+playerCardPlayed+"\nDealer Played: "+dealerCardPlayed);
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
                default: return; break;
            }
            dealRound++;
        }
        }
        function ResetRound()
        {
            alert("Unfortunate, it is a tie.");
            playerHand.reset();
            dealerHand.reset();
        }
        function LoseRound()
        {
            alert("What a shame, the house wins.");
            playerHand.reset();
            dealerHand.reset();
        }
        function WinRound()
        {
            alert("Congratulations, you win!");
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
                        anime({
                            targets: '#dropzoneScissors',
                            rotate:{
                              value: '1turn',
                              easing: 'easeInOutSine'
                            },
                            loop: 2
                          });
                        WinRound();
                    }
                    if(playerCardPlayed=="lizard")
                    {
                        anime({
                            targets: '#dropzoneLizard',
                            rotate:{
                              value: '1turn',
                              easing: 'easeInOutSine'
                            },
                            loop: 2
                          }); 
                        WinRound();
                    }
                    if (playerCardPlayed=="rock")
                    {
                        LoseRound();
                    }
                    if(playerCardPlayed=="spock")
                    {
                        LoseRound();
                    }
                }
            else if(dealerCardPlayed=="scissors")
            {
                if(playerCardPlayed=="rock")
                { 
                    anime({
                    targets: '#dropzoneRock',
                    rotate:{
                      value: '1turn',
                      easing: 'easeInOutSine'
                    },
                    loop: 2
                  }); 
                    WinRound();
                }
                if(playerCardPlayed=="spock")
                {
                    anime({
                        targets: '#dropzoneSpock',
                        rotate:{
                          value: '1turn',
                          easing: 'easeInOutSine'
                        },
                        loop: 2
                      }); 
                    WinRound();
                }
                 if(playerCardPlayed =="paper" )
                {
                    LoseRound();
                }
                if(playerCardPlayed=="lizard")
                {
                    LoseRound();
                }
            }
            else if(dealerCardPlayed=="rock")
            {
                if(playerCardPlayed=="paper")
                {
                    anime({
                        targets: '#dropzonePaper',
                        rotate:{
                          value: '1turn',
                          easing: 'easeInOutSine'
                        },
                        loop: 2
                      });  
                    WinRound();
                }
                if(playerCardPlayed=="spock")
                {
                    anime({
                        targets: '#dropzoneSpock',
                        rotate:{
                          value: '1turn',
                          easing: 'easeInOutSine'
                        },
                        loop: 2
                      }); 
                    WinRound();
                }
                if (playerCardPlayed=="scissors")
                {
                    LoseRound();
                }
                if(playerCardPlayed=="lizard")
                {
                    LoseRound();
                }
            }
            else if(dealerCardPlayed=="lizard")
            {
                if(playerCardPlayed=="paper")
                {
                    anime({
                        targets: '#dropzonePaper',
                        rotate:{
                          value: '1turn',
                          easing: 'easeInOutSine'
                        },
                        loop: 2
                      });  
                    WinRound();
                }
                if(playerCardPlayed=="spock")
                {
                    anime({
                        targets: '#dropzoneSpock',
                        rotate:{
                          value: '1turn',
                          easing: 'easeInOutSine'
                        },
                        loop: 2
                      }); 
                    WinRound();
                }
                if (playerCardPlayed=="scissors")
                {
                    LoseRound();
                }
                if(playerCardPlayed=="rock")
                {
                    LoseRound();
                }
            }
            else if(dealerCardPlayed=="spock")
            {
                if(playerCardPlayed=="paper")
                {
                    anime({
                        targets: '#dropzonePaper',
                        rotate:{
                          value: '1turn',
                          easing: 'easeInOutSine'
                        },
                        loop: 2
                      });  
                    WinRound();
                }
                if(playerCardPlayed=="lizard")
                {
                    anime({
                        targets: '#dropzoneLizard',
                        rotate:{
                          value: '1turn',
                          easing: 'easeInOutSine'
                        },
                        loop: 2
                      }); 
                    WinRound();
                }
                if (playerCardPlayed=="scissors")
                {
                    LoseRound();
                }
                if(playerCardPlayed=="rock")
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
        