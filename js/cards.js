//Creating card deck
        let choice;
        let computerChoice;
        let draw;
        function Card(choices)
        {
            this.choice = choices
            this.createNode = CreateGraphics;
        }
        //Helper Function that helpes deck of cards be used
        function Stack()
        {
            //Make empty array for deck
            this.cards = new Array(80);
            this.makeDeck = CreateDeck;
            this.shuffle = ShuffleCards;
            this.draw = DrawCard;
            this.cardCount = StackCardCount;
            this.result = CompareCard;
            

        }
        function CreateDeck(n)
        {
            
            let options = new Array("rock", "paper","scissors")
            this.choice = new Array(n);
            for(let i = 0;i<n;i++)
             {
                 for(let j = 0; j <options.length;j++)
                {
                    this.choice[n+j]= new Card(options[j]);
                   
                }
             }   
        }
        function DrawCard()
        {
            let card;
            for(let i=0;i<3;i++)
            {
                 if(choice.length>0)
            {
                //Creating random index that returns an integer proportional to deck length
                let randIndex = Math.floor(Math.random*choice.length)
                card = choice.splice(randIndex,1)[0];
            }
            return card;
            }
           
        }
        //Loops through the deck four times and swaps all 80 cards to a different order in the deck
        function ShuffleCards()
        {
            for(let i = 0; i <4;i++)
            {
                for(let j =0; j<choice.length;j++)
                {
                    let k = Math.floor(Math.random()*this.deck.length);
                    temp = this.choice[j];
                    this.choice[j] = this.choice[k];
                    this.choice[k]=temp;
                }
            }
        }
        //Returns length of cards in stack, helps with discard and hand management
        function StackCardCount()
        {
            return this.choice.length;
        }

        function CreateGraphics()
        {
            let cardNode, faceGraphic

            cardNode = document.getElementById("playerHand");
            faceGraphic = document.createElement("img");
            faceGraphic.id="card";
            faceGraphic.className="ui-widget-content";
            if(this.choices=="rock")
            {
                faceGraphic.src="rockCard.jpg";
            }
             if(this.choices=="paper")
            {
                faceGraphic.src="paperCard.jpg";
            }
             if(this.choices=="scissors")
            {
                faceGraphic.src="scissorsCard.jpg";
            }
            cardNode.appendChild(faceGraphic);
            return cardNode;
        }
        function CompareCard(cardOne, cardTwo)
        {
            if(cardOne.choice=="scissors"&&cardTwo.choice=="papers")
            {
                return cardOne;
            }
            else if(cardOne.choice="scissors"&&cardTwo.choice=="rock")
            {
                return cardTwo;
            }
            else if(cardOne.choice==cardTwo.choice)
            {
                draw = Draw;
                return draw;
            }
            else if(cardOne.choice=="rock"&&cardTwo.choice=="scissors")
            {
                return cardOne;
            }
            else if(cardOne.choice=="rock"&&cardTwo.choice=="paper")
            {
                return cardTwo;
            }
            else if(cardOne.choice==cardTwo.choice)
            {
                draw = Draw;
                return draw;
            }
            else  if(cardOne.choice=="paper"&&cardTwo.choice=="rock")
            {
                return cardOne;
            }
            else if(cardOne.choice=="paper"&&cardTwo.choice=="scissors")
            {
                return cardTwo;
            }
            else if(cardOne.choice==cardTwo.choice)
            {
                draw = Draw;
                return draw;
            }
            else if(cardTwo.choice=="scissors"&&cardOne.choice=="papers")
            {
                return cardTwo;
            }
            else if(cardTwo.choice=="scissors"&&cardOne.choice=="rock")
            {
                return cardTwo;
            }
           
            else if(cardTwo.choice=="rock"&&cardOne.choice=="scissors")
            {
                return cardTwo;
            }
            else if(cardTwo.choice="rock"&&cardOne.choice=="paper")
            {
                return cardTwo;
            }
            else  if(cardTwo.choice=="paper"&&cardOne.choice=="rock")
            {
                return cardTwo;
            }
            else if(cardTwo.choice="paper"&&cardOne.choice=="scissors")
            {
                return cardTwo;
            }
            
        }
        function Draw()
        {

        }
        
        