// TODO: Make the game actually playable (done)
// TODO: Get images for cards and nobles (70%)
// TODO: Make cards look good on the board (done?)

// Utility functions
function findIndexById(elem, array){ // Returns object's index in an array basing on it's 'id' value
    for(let i=0; i<array.length; i++){
        if(elem.id == array[i].id)
            return i;
    }
    return -1; // If there is no such object in an array
}

function getRandom(min, max, toRound=false){
    if(toRound)
        return Math.floor(Math.random()*(max-min+1))+min;
    return Math.random()*(max-min+1) + min;
}

function shuffle(array){ // Randomizes the order of array's elements
    let tempArray = array;
    let newArray = [];
    while(tempArray.length>0)
        newArray.push(array.splice(getRandom(0,tempArray.length-1,true),1)[0]);
    return newArray;
}

function doesContain(array, item){
	for(let elem of array)
		if(elem==item)
			return true;
	return false;
}

// Global variables
var cardId=0; // Used for setting IDs for every new card
var nobleId=0; // Used for setting IDs for every new noble
var CardImages = { // Array of card pictures
    red: ['./img/1_red_1.jpg','./img/2_red_1.jpg','./img/3_red_1.jpg'],
    green: ['./img/1_green_1.jpg','./img/2_green_1.jpg','./img/3_green_1.jpg'],
    blue: ['./img/1_blue_1.jpg','./img/2_blue_1.jpg','./img/3_blue_1.jpg'],
    white: ['./img/1_white_1.jpg','./img/2_white_1.jpg','./img/3_white_1.jpg'],
    black: ['./img/1_black_1.jpg','./img/2_black_1.jpg','./img/3_black_1.jpg']
};
var nobleImages = ['./img/noble_1.jpg','./img/noble_2.jpg','./img/noble_3.jpg','./img/noble_4.jpg','./img/noble_5.jpg','./img/noble_6.jpg','./img/noble_7.jpg','./img/noble_8.jpg','./img/noble_9.jpg','./img/noble_10.jpg']; // Array of noble pictures

// Classes
class GameManager{
    constructor(canvasSize, title){
		this.title = title;
        this.canvasSize = canvasSize;
        // Array of players
        this.players = [];
        // Array of all cards
        this.Cards = {
            levelOne: [],
            levelTwo: [],
            levelThree: []
        };
        // Array of cards laid on the board
        this.CardsOnBoard = {
            levelOne: [],
            levelTwo: [],
            levelThree: []
        };
        // Array of all nobles
        this.nobles = [];
        this.Tokens = {
            red: 7,
            green: 7,
            blue: 7,
            white: 7,
            black: 7,
            gold: 5
        };
        this.Message = {
            title: ``,
            message: ``,
            messageBox: ``
        }
        this.round = 0;
        this.turn = 0;
        this.currentScene = 'startingScreen';
    }
    // Adds cards and nobles from the original game and shuffles them
    setup(){
        // Clean everything beforehand!
        cardId = 0;
        nobleId = 0;
        this.Cards = {
            levelOne: [],
            levelTwo: [],
            levelThree: []
        };
        this.CardsOnBoard = {
            levelOne: [],
            levelTwo: [],
            levelThree: []
        };
        this.nobles = [];
        // Red cards
        // Lvl 1
        this.addCard(1, 'red', {red:0, green:0, blue:0, white:3, black:0}, 0);
        this.addCard(1, 'red', {red:1, green:0, blue:0, white:1, black:3}, 0);
        this.addCard(1, 'red', {red:0, green:1, blue:2, white:0, black:0}, 0);
        this.addCard(1, 'red', {red:0, green:1, blue:0, white:2, black:2}, 0);
        this.addCard(1, 'red', {red:0, green:1, blue:1, white:2, black:1}, 0);
        this.addCard(1, 'red', {red:0, green:1, blue:1, white:1, black:1}, 0);
        this.addCard(1, 'red', {red:2, green:0, blue:0, white:2, black:0}, 0);
        this.addCard(1, 'red', {red:0, green:0, blue:0, white:4, black:0}, 1);
        // Lvl 2
        this.addCard(2, 'red', {red:2, green:0, blue:3, white:0, black:3}, 1);
        this.addCard(2, 'red', {red:2, green:0, blue:0, white:2, black:3}, 1);
        this.addCard(2, 'red', {red:0, green:2, blue:4, white:1, black:0}, 2);
        this.addCard(2, 'red', {red:0, green:0, blue:0, white:3, black:5}, 2);
        this.addCard(2, 'red', {red:0, green:0, blue:0, white:0, black:5}, 2);
        this.addCard(2, 'red', {red:6, green:0, blue:0, white:0, black:0}, 3);
        // Lvl 3
        this.addCard(3, 'red', {red:0, green:3, blue:5, white:3, black:3}, 3);
        this.addCard(3, 'red', {red:0, green:7, blue:0, white:0, black:0}, 4);
        this.addCard(3, 'red', {red:3, green:6, blue:3, white:0, black:0}, 4);
        this.addCard(3, 'red', {red:3, green:7, blue:0, white:0, black:0}, 5);
        // Green cards
        // Lvl 1
        this.addCard(1, 'green', {red:0, green:0, blue:1, white:2, black:0}, 0);
        this.addCard(1, 'green', {red:2, green:0, blue:2, white:0, black:0}, 0);
        this.addCard(1, 'green', {red:0, green:1, blue:3, white:1, black:0}, 0);
        this.addCard(1, 'green', {red:1, green:0, blue:1, white:1, black:1}, 0);
        this.addCard(1, 'green', {red:1, green:0, blue:1, white:1, black:2}, 0);
        this.addCard(1, 'green', {red:2, green:0, blue:1, white:0, black:2}, 0);
        this.addCard(1, 'green', {red:3, green:0, blue:0, white:0, black:0}, 0);
        this.addCard(1, 'green', {red:0, green:0, blue:0, white:0, black:4}, 1);
        // Lvl 2
        this.addCard(2, 'green', {red:3, green:2, blue:0, white:3, black:0}, 1);
        this.addCard(2, 'green', {red:0, green:0, blue:3, white:2, black:2}, 1);
        this.addCard(2, 'green', {red:0, green:0, blue:2, white:4, black:1}, 2);
        this.addCard(2, 'green', {red:0, green:5, blue:0, white:0, black:0}, 2);
        this.addCard(2, 'green', {red:0, green:3, blue:5, white:0, black:0}, 2);
        this.addCard(2, 'green', {red:0, green:6, blue:0, white:0, black:0}, 3);
        // Lvl 3
        this.addCard(3, 'green', {red:3, green:0, blue:3, white:5, black:3}, 3);
        this.addCard(3, 'green', {red:0, green:3, blue:6, white:0, black:0}, 4);
        this.addCard(3, 'green', {red:0, green:0, blue:7, white:0, black:0}, 4);
        this.addCard(3, 'green', {red:0, green:3, blue:7, white:0, black:0}, 5);
        // Blue cards
        // Lvl 1
        this.addCard(1, 'blue', {red:0, green:0, blue:0, white:1, black:2}, 0);
        this.addCard(1, 'blue', {red:2, green:1, blue:0, white:1, black:1}, 0);
        this.addCard(1, 'blue', {red:1, green:1, blue:0, white:1, black:1}, 0);
        this.addCard(1, 'blue', {red:1, green:3, blue:1, white:0, black:0}, 0);
        this.addCard(1, 'blue', {red:0, green:0, blue:0, white:0, black:3}, 0);
        this.addCard(1, 'blue', {red:2, green:2, blue:0, white:1, black:0}, 0);
        this.addCard(1, 'blue', {red:0, green:2, blue:0, white:0, black:2}, 0);
        this.addCard(1, 'blue', {red:4, green:0, blue:0, white:0, black:0}, 1);
        // Lvl 2
        this.addCard(2, 'blue', {red:2, green:2, blue:2, white:0, black:0}, 1);
        this.addCard(2, 'blue', {red:0, green:3, blue:2, white:0, black:3}, 1);
        this.addCard(2, 'blue', {red:0, green:0, blue:3, white:5, black:0}, 2);
        this.addCard(2, 'blue', {red:0, green:0, blue:5, white:0, black:0}, 2);
        this.addCard(2, 'blue', {red:1, green:0, blue:0, white:2, black:4}, 2);
        this.addCard(2, 'blue', {red:0, green:0, blue:6, white:0, black:0}, 3);
        // Lvl 3
        this.addCard(3, 'blue', {red:3, green:3, blue:0, white:3, black:5}, 3);
        this.addCard(3, 'blue', {red:0, green:0, blue:0, white:7, black:0}, 4);
        this.addCard(3, 'blue', {red:0, green:0, blue:3, white:6, black:3}, 4);
        this.addCard(3, 'blue', {red:0, green:0, blue:3, white:7, black:0}, 5);
        // White cards
        // Lvl 1
        this.addCard(1, 'white', {red:0, green:2, blue:2, white:0, black:1}, 0);
        this.addCard(1, 'white', {red:2, green:0, blue:0, white:0, black:1}, 0);
        this.addCard(1, 'white', {red:1, green:1, blue:1, white:0, black:1}, 0);
        this.addCard(1, 'white', {red:0, green:0, blue:3, white:0, black:0}, 0);
        this.addCard(1, 'white', {red:0, green:0, blue:2, white:0, black:2}, 0);
        this.addCard(1, 'white', {red:1, green:2, blue:1, white:0, black:1}, 0);
        this.addCard(1, 'white', {red:0, green:0, blue:1, white:3, black:1}, 0);
        this.addCard(1, 'white', {red:0, green:0, blue:0, white:4, black:0}, 1);
        // Lvl 2
        this.addCard(2, 'white', {red:2, green:3, blue:0, white:0, black:2}, 1);
        this.addCard(2, 'white', {red:3, green:0, blue:3, white:2, black:0}, 1);
        this.addCard(2, 'white', {red:4, green:1, blue:0, white:0, black:2}, 2);
        this.addCard(2, 'white', {red:5, green:0, blue:0, white:0, black:0}, 2);
        this.addCard(2, 'white', {red:5, green:0, blue:0, white:0, black:3}, 2);
        this.addCard(2, 'white', {red:0, green:0, blue:0, white:6, black:0}, 3);
        // Lvl 3
        this.addCard(3, 'white', {red:5, green:3, blue:3, white:0, black:3}, 3);
        this.addCard(3, 'white', {red:0, green:0, blue:0, white:0, black:7}, 4);
        this.addCard(3, 'white', {red:3, green:0, blue:0, white:3, black:6}, 4);
        this.addCard(3, 'white', {red:0, green:0, blue:0, white:3, black:7}, 5);
        // Black cards
        // Lvl 1
        this.addCard(1, 'black', {red:1, green:1, blue:1, white:1, black:0}, 0);
        this.addCard(1, 'black', {red:1, green:2, blue:0, white:0, black:0}, 0);
        this.addCard(1, 'black', {red:0, green:2, blue:0, white:2, black:0}, 0);
        this.addCard(1, 'black', {red:3, green:1, blue:0, white:0, black:1}, 0);
        this.addCard(1, 'black', {red:0, green:3, blue:0, white:0, black:0}, 0);
        this.addCard(1, 'black', {red:1, green:1, blue:2, white:1, black:0}, 0);
        this.addCard(1, 'black', {red:1, green:0, blue:2, white:2, black:0}, 0);
        this.addCard(1, 'black', {red:0, green:0, blue:4, white:0, black:0}, 1);
        // Lvl 2
        this.addCard(2, 'black', {red:0, green:2, blue:2, white:3, black:0}, 1);
        this.addCard(2, 'black', {red:0, green:3, blue:0, white:3, black:2}, 1);
        this.addCard(2, 'black', {red:2, green:4, blue:1, white:0, black:0}, 2);
        this.addCard(2, 'black', {red:0, green:0, blue:0, white:5, black:0}, 2);
        this.addCard(2, 'black', {red:3, green:5, blue:0, white:0, black:0}, 2);
        this.addCard(2, 'black', {red:0, green:0, blue:0, white:0, black:6}, 3);
        // Lvl 3
        this.addCard(3, 'black', {red:3, green:5, blue:3, white:3, black:0}, 3);
        this.addCard(3, 'black', {red:7, green:0, blue:0, white:0, black:0}, 4);
        this.addCard(3, 'black', {red:6, green:3, blue:0, white:0, black:3}, 4);
        this.addCard(3, 'black', {red:7, green:0, blue:0, white:0, black:3}, 5);
        // Nobles
        this.addNoble({red:4, green:4, blue:0, white:0, black:0}, 3);
        this.addNoble({red:3, green:0, blue:0, white:3, black:3}, 3);
        this.addNoble({red:0, green:0, blue:4, white:4, black:0}, 3);
        this.addNoble({red:0, green:0, blue:0, white:4, black:4}, 3);
        this.addNoble({red:0, green:4, blue:4, white:0, black:0}, 3);
        this.addNoble({red:3, green:3, blue:3, white:0, black:0}, 3);
        this.addNoble({red:0, green:3, blue:3, white:3, black:0}, 3);
        this.addNoble({red:4, green:0, blue:0, white:0, black:4}, 3);
        this.addNoble({red:0, green:0, blue:3, white:3, black:3}, 3);
        this.addNoble({red:3, green:3, blue:0, white:0, black:3}, 3);
        // Shuffle cards and nobles
        this.Cards.levelOne = shuffle(this.Cards.levelOne);
        this.Cards.levelTwo = shuffle(this.Cards.levelTwo);
        this.Cards.levelThree = shuffle(this.Cards.levelThree);
        this.nobles = shuffle(this.nobles);
        // No messages
        this.drawMessage('none');

        return true;
    }
    // With players in, call it to begin a new game
    begin(){
        // Prepares cards and nobles for a new game
        this.setup();
        // Rules depending on player number
        if(this.players.length==2){
            this.Tokens = {
                red: 4,
                green: 4,
                blue: 4,
                white: 4,
                black: 4,
                gold: 5
            };
        }
        else if(this.players.length==3){
            this.Tokens = {
                red: 5,
                green: 5,
                blue: 5,
                white: 5,
                black: 5,
                gold: 5
            };
        }
        else{
            this.Tokens = {
                red: 7,
                green: 7,
                blue: 7,
                white: 7,
                black: 7,
                gold: 5
            };
        }
        this.round = 0;
        this.turn = 0;
        this.exchangeTo = 'start';
        
        // Sets the amount of nobles to the amount of players plus one
        this.nobles.splice(0,Math.abs(this.players.length-9));
        // Change the scene
        this.currentScene = 'game';
        // Update all logic and render the board
        this.update();
        return true;
    }
    // Turn and round cycles
    endTurn(){
        this.players[this.turn].action='none';
        for(let i=0; i<this.nobles.length; i++){
            if(
                this.players[this.turn].Production.red >= this.nobles[i].Requirements.red &&
                this.players[this.turn].Production.green >= this.nobles[i].Requirements.green &&
                this.players[this.turn].Production.blue >= this.nobles[i].Requirements.blue &&
                this.players[this.turn].Production.white >= this.nobles[i].Requirements.white &&
                this.players[this.turn].Production.black >= this.nobles[i].Requirements.black
            ){
                this.players[this.turn].nobles.push(this.nobles.splice(i,1)[0]);
                break;
            }
        }
        if(this.turn >= this.players.length-1){
            this.turn = 0;
            this.round++;
            if(this.checkForWinners()!=false){
                this.drawMessage('endGame',this.checkForWinners());
            }
        }
        else
            this.turn++;
        this.update();
        return true;
    }
    // To display some messages
    drawMessage(type, arg){
        switch(type){
            case 'endGame':
                this.Message.title = `<p style="margin:0; font-weight:bold;">We've got a winner!</p>`;
                this.Message.message = `
                <div>
                    <p style="margin:0;font-size:60px;color:rgb(${arg.nameColor.r},${arg.nameColor.g},${arg.nameColor.b})">${arg.name}</p>
                    <p style="margin:0;">Congratulations!</p>
                    <div class="pyro">
                        <div class="before"></div>
                        <div class="after"></div>
                    </div>
                </div>`;
                break;
            case 'none':
                this.Message.messageBox = ``;
                this.Message.title = ``;
                this.Message.message = ``;
                this.renderBoard();
                return true;
            case 'default':
                this.Message.title = `<p style="margin:0; font-weight:bold;">${arg.title}</p>`;
                this.Message.message = `<div style="margin-top:10px;">${arg.message}</div>`;
                break;
        }
        if(type != 'endGame')
            this.Message.messageBox = `<div style="position:absolute;width:${this.canvasSize.width-2}px;height:${this.canvasSize.height-2}px;background:linear-gradient(to bottom, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0) 100%);" onclick="game.drawMessage('none')"></div>`;
        else
            this.Message.messageBox = `<div style="position:absolute;width:${this.canvasSize.width-2}px;height:${this.canvasSize.height-2}px;background:linear-gradient(to bottom, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0) 100%);" onclick="game.players=[]; game.changeScene('startingScreen')"></div>`;

        this.Message.messageBox = this.Message.messageBox.concat(`
        <div style="position:absolute;width:${this.canvasSize.width/2}px;background-color:#DDD;border-radius:20px;padding:10px;text-align:center;margin-left:${this.canvasSize.width/2-this.canvasSize.width/4}px;margin-top:50px;box-shadow:0px 6px 23px #666;">
            ${this.Message.title}
            ${this.Message.message}
        </div>
        `);
        
        this.renderBoard();
        return true;
    }
    // Called at the end of each round
    checkForWinners(){
        this.playersOverFifteen = [];
        for(let i=0; i<this.players.length; i++)
            if(this.players[i].points >= 15)
                this.playersOverFifteen.push(this.players[i]);
        if(this.playersOverFifteen.length > 0){
            while(this.playersOverFifteen.length > 1){
                if(this.playersOverFifteen[0].points > this.playersOverFifteen[1].points)
                    this.playersOverFifteen.splice(1,1);
                else if(this.playersOverFifteen[0].points < this.playersOverFifteen[1].points)
                    this.playersOverFifteen.splice(0,1);
                else{
                    if(this.playersOverFifteen[0].developmentCards.length > this.playersOverFifteen[0].developmentCards.length)
                        this.playersOverFifteen.splice(1,1);
                    else if(this.playersOverFifteen[0].developmentCards.length < this.playersOverFifteen[0].developmentCards.length)
                        this.playersOverFifteen.splice(0,1);
                    else
                        return 'draw';
                }
            }
            return this.playersOverFifteen[0];
        }
        return false;
    }
    // Call it when some action is done
    update(){
        // Pulling cards from decks
        while(this.CardsOnBoard.levelOne.length<4 && this.Cards.levelOne.length>0){
            this.CardsOnBoard.levelOne.push(this.Cards.levelOne.splice(this.Cards.levelOne.length-1,1)[0]);
        }
        while(this.CardsOnBoard.levelTwo.length<4 && this.Cards.levelTwo.length>0){
            this.CardsOnBoard.levelTwo.push(this.Cards.levelTwo.splice(this.Cards.levelTwo.length-1,1)[0]);
        }
        while(this.CardsOnBoard.levelThree.length<4 && this.Cards.levelThree.length>0){
            this.CardsOnBoard.levelThree.push(this.Cards.levelThree.splice(this.Cards.levelThree.length-1,1)[0]);
        }
        // Update every player's info
        for(let i=0; i<this.players.length; i++){
            this.players[i].update();
        }
        if(this.exchangeTo == 'start')
            this.renderBoard();
        if(this.currentScene == 'game') this.exchangeTo = document.getElementById('goldTokenExchange').value;

        this.renderBoard();
        if(this.currentScene == 'startingScreen'){
            if(this.players.length >= 4)
                document.getElementById('addPlayer').disabled = true;
            else
                document.getElementById('addPlayer').focus();
        }

        return true;
    }
    // Renders everything on the screen
    renderBoard(scene=this.currentScene){
        // Rendering the starting screen
        if(scene == 'startingScreen'){
            this.StartingScreen = {
                background: `<div class="background" style="width:${this.canvasSize.width-2}px; height:${this.canvasSize.height-2}px;"></div>`,
                title: `<div class="title" style="width:${this.canvasSize.width-2}px;">${this.title}</div>`,
                playersFrame: ``
            }
            this.StartingScreen.playersFrame = this.StartingScreen.playersFrame.concat(`
            <div class="players" style="margin-left:${this.canvasSize.width/2-165}px;">
                <p style="font-size:26px;font-weight:bold;margin:0;text-align:center;">Players:</p>
                <input id="addPlayer" type="text" style="width:100%;margin-top:5px;" placeholder="Type player's name and hit enter to add!">
                <ol>
            `);
            for(let i=0; i<this.players.length; i++)
                this.StartingScreen.playersFrame = this.StartingScreen.playersFrame.concat(`<li style="color:rgb(${this.players[i].nameColor.r},${this.players[i].nameColor.g},${this.players[i].nameColor.b}); font-size:20px; font-weight:bold; text-shadow:1px 1px 2px #555;">${this.players[i].name}</li>`);
            this.StartingScreen.playersFrame = this.StartingScreen.playersFrame.concat(`</ol>`);
            if(this.players.length > 1 && this.players.length < 4)
                this.StartingScreen.playersFrame = this.StartingScreen.playersFrame.concat(`<button style="width:100%;" onclick="game.begin()">Start the game!</button>`);
            else if(this.players.length >= 4)
                this.StartingScreen.playersFrame = this.StartingScreen.playersFrame.concat(`<button style="width:100%;animation-name:glow;animation-iteration-count:infinite;animation-duration:2s;" onclick="game.begin()">Start the game!</button>`);
            else
                this.StartingScreen.playersFrame = this.StartingScreen.playersFrame.concat(`<button style="width:100%;" disabled>Start the game!</button>`);
            this.StartingScreen.playersFrame = this.StartingScreen.playersFrame.concat(`</div>`);
        }
        // Rendering the game board
        if(scene == 'game'){
            this.Board = {
                message: this.Message.messageBox,
                actionMenu: ``,
                playerFrame: ``,
                nobles: ``,
                tokens: ``,
                levelOneDeck: `<div class=${this.Cards.levelOne.length>0 ? "deck-1" : "deck-1-empty"}>${this.Cards.levelOne.length}</div>`,
                levelTwoDeck: `<div class=${this.Cards.levelTwo.length>0 ? "deck-2" : "deck-2-empty"}>${this.Cards.levelTwo.length}</div>`,
                levelThreeDeck: `<div class=${this.Cards.levelThree.length>0 ? "deck-3" : "deck-3-empty"}>${this.Cards.levelThree.length}</div>`,
                levelOne: ``,
                levelTwo: ``,
                levelThree: ``
            };
            
            // Rendering action menu
            this.Board.actionMenu = this.Board.actionMenu.concat(`<div class="action-menu">`);
            // Pick token button
            if(this.players[this.turn].action=='none' && this.players[this.turn].Tokens.red+this.players[this.turn].GoldTokens.red+this.players[this.turn].Tokens.green+this.players[this.turn].GoldTokens.green+this.players[this.turn].Tokens.blue+this.players[this.turn].GoldTokens.blue+this.players[this.turn].Tokens.white+this.players[this.turn].GoldTokens.white+this.players[this.turn].Tokens.black+this.players[this.turn].GoldTokens.black+this.players[this.turn].Tokens.gold < 10)
                this.Board.actionMenu = this.Board.actionMenu.concat(`<button onclick="game.players[game.turn].setAction('pickingTokens')">Pick up tokens</button>`);
            else
                this.Board.actionMenu = this.Board.actionMenu.concat(`<button disabled>Pick up tokens</button>`);
            // Reserve a card button
            if(this.players[this.turn].action=='none' && this.players[this.turn].reservedCards.length < 3)
                this.Board.actionMenu = this.Board.actionMenu.concat(`<button onclick="game.players[game.turn].setAction('reserving')">Reserve a card</button>`);
            else
                this.Board.actionMenu = this.Board.actionMenu.concat(`<button disabled>Reserve a card</button>`);
            // Buy a reserved card button
            if(this.players[this.turn].action=='none' && this.players[this.turn].canBuyFromReserve())
                this.Board.actionMenu = this.Board.actionMenu.concat(`<button onclick="game.players[game.turn].setAction('buyingFromReserve')">Buy from reserve</button>`);
            else
                this.Board.actionMenu = this.Board.actionMenu.concat(`<button disabled>Buy from reserve</button>`);
            // Buy from board button
            if(this.players[this.turn].action=='none' && this.players[this.turn].canBuyFromBoard())
                this.Board.actionMenu = this.Board.actionMenu.concat(`<button onclick="game.players[game.turn].setAction('buyingFromBoard')">Buy from board</button>`)
            else
                this.Board.actionMenu = this.Board.actionMenu.concat(`<button disabled>Buy from board</button>`);
            // Abort action button
            if(this.players[this.turn].action!='none')
                this.Board.actionMenu = this.Board.actionMenu.concat(`<button onclick="game.players[game.turn].abortAction()" style="float:right;">Abort</button>`);
            else
                this.Board.actionMenu = this.Board.actionMenu.concat(`<button style="float:right;" disabled>Abort</button>`);
            // Gold token turning
            this.Board.actionMenu = this.Board.actionMenu.concat(`
            <div style="margin-top:10px;">Turn one gold token into a
                <select id="goldTokenExchange" onchange="game.update()">
            `);
            this.Board.actionMenu = this.Board.actionMenu.concat(`${this.exchangeTo == 'red' ? '<option value="red" selected>red token</option>' : '<option value="red">red token</option>'}`);
            this.Board.actionMenu = this.Board.actionMenu.concat(`${this.exchangeTo == 'green' ? '<option value="green" selected>green token</option>' : '<option value="green">green token</option>'}`);
            this.Board.actionMenu = this.Board.actionMenu.concat(`${this.exchangeTo == 'blue' ? '<option value="blue" selected>blue token</option>' : '<option value="blue">blue token</option>'}`);
            this.Board.actionMenu = this.Board.actionMenu.concat(`${this.exchangeTo == 'white' ? '<option value="white" selected>white token</option>' : '<option value="white">white token</option>'}`);
            this.Board.actionMenu = this.Board.actionMenu.concat(`${this.exchangeTo == 'black' ? '<option value="black" selected>black token</option>' : '<option value="black">black token</option>'}`);
            this.Board.actionMenu = this.Board.actionMenu.concat(`</select>`);
            if(this.players[this.turn].action=='none' && this.players[this.turn].Tokens.gold>0)
                this.Board.actionMenu = this.Board.actionMenu.concat(`<button onclick="game.players[game.turn].turnGold('${document.getElementById('goldTokenExchange').value}')">></button>`);
            else
                this.Board.actionMenu = this.Board.actionMenu.concat(`<button disabled>></button>`);
            this.Board.actionMenu = this.Board.actionMenu.concat(`</div>`);
            this.Board.actionMenu = this.Board.actionMenu.concat(`</div>`);
            // Rendering tokens
            if(this.players[this.turn].action!='pickingTokens'){ // player isn't picking up tokens
                this.Board.tokens = `
                <div class="tokens">
                    <div class="token token-red" style="box-shadow:0px ${this.Tokens.red}px;margin-top:${-this.Tokens.red}px;">${this.Tokens.red}</div>
                    <div class="token token-green" style="box-shadow:0px ${this.Tokens.green}px;margin-top:${-this.Tokens.green+55}px;">${this.Tokens.green}</div>
                    <div class="token token-blue" style="box-shadow:0px ${this.Tokens.blue}px;margin-top:${-this.Tokens.blue+110}px;">${this.Tokens.blue}</div>
                    <div class="token token-white" style="box-shadow:0px ${this.Tokens.white}px;margin-top:${-this.Tokens.white+165}px;">${this.Tokens.white}</div>
                    <div class="token token-black" style="box-shadow:0px ${this.Tokens.black}px;margin-top:${-this.Tokens.black+220}px;">${this.Tokens.black}</div>
                    <div class="token token-gold" style="box-shadow:0px ${this.Tokens.gold}px;margin-top:${-this.Tokens.gold+275}px;">${this.Tokens.gold}</div>
                </div>
                `;
            }
            else{ // player is picking up tokens
                this.Board.tokens = this.Board.tokens.concat(`<div class="tokens">`);
                // Red tokens
                if(
                    this.players[this.turn].tempTokens.red==1 && this.players[this.turn].tempTokens.red+this.players[this.turn].tempTokens.green+this.players[this.turn].tempTokens.blue+this.players[this.turn].tempTokens.white+this.players[this.turn].tempTokens.black>=2 ||
                    this.players[this.turn].tempTokens.red+this.Tokens.red<4 &&  this.players[this.turn].tempTokens.red>0 ||
                    this.Tokens.red==0
                )
                    this.Board.tokens = this.Board.tokens.concat(`<div class="token token-gray" style="box-shadow:0px ${this.Tokens.red}px;margin-top:${-this.Tokens.red}px;">${this.Tokens.red}</div>`);
                else
                    this.Board.tokens = this.Board.tokens.concat(`<div class="token token-red" style="box-shadow:0px ${this.Tokens.red}px,0px 0px 15px 0px;margin-top:${-this.Tokens.red}px;" onclick="game.players[game.turn].pickToken('red')">${this.Tokens.red}</div>`);
                // Green tokens
                if(
                    this.players[this.turn].tempTokens.green==1 && this.players[this.turn].tempTokens.red+this.players[this.turn].tempTokens.green+this.players[this.turn].tempTokens.blue+this.players[this.turn].tempTokens.white+this.players[this.turn].tempTokens.black>=2 ||
                    this.players[this.turn].tempTokens.green+this.Tokens.green<4 &&  this.players[this.turn].tempTokens.green>0 ||
                    this.Tokens.green==0
                )
                    this.Board.tokens = this.Board.tokens.concat(`<div class="token token-gray" style="box-shadow:0px ${this.Tokens.green}px;margin-top:${-this.Tokens.green+55}px;">${this.Tokens.green}</div>`);
                else
                    this.Board.tokens = this.Board.tokens.concat(`<div class="token token-green" style="box-shadow:0px ${this.Tokens.green}px,0px 0px 15px 0px;margin-top:${-this.Tokens.green+55}px;" onclick="game.players[game.turn].pickToken('green')">${this.Tokens.green}</div>`);
                // Blue tokens
                if(
                    this.players[this.turn].tempTokens.blue==1 && this.players[this.turn].tempTokens.red+this.players[this.turn].tempTokens.green+this.players[this.turn].tempTokens.blue+this.players[this.turn].tempTokens.white+this.players[this.turn].tempTokens.black>=2 ||
                    this.players[this.turn].tempTokens.blue+this.Tokens.blue<4 &&  this.players[this.turn].tempTokens.blue>0 ||
                    this.Tokens.blue==0
                )
                    this.Board.tokens = this.Board.tokens.concat(`<div class="token token-gray" style="box-shadow:0px ${this.Tokens.blue}px;margin-top:${-this.Tokens.blue+110}px;">${this.Tokens.blue}</div>`);
                else
                    this.Board.tokens = this.Board.tokens.concat(`<div class="token token-blue" style="box-shadow:0px ${this.Tokens.blue}px,0px 0px 15px 0px;margin-top:${-this.Tokens.blue+110}px;" onclick="game.players[game.turn].pickToken('blue')">${this.Tokens.blue}</div>`);
                // White tokens
                if(
                    this.players[this.turn].tempTokens.white==1 && this.players[this.turn].tempTokens.red+this.players[this.turn].tempTokens.green+this.players[this.turn].tempTokens.blue+this.players[this.turn].tempTokens.white+this.players[this.turn].tempTokens.black>=2 ||
                    this.players[this.turn].tempTokens.white+this.Tokens.white<4 &&  this.players[this.turn].tempTokens.white>0 ||
                    this.Tokens.white==0
                )
                    this.Board.tokens = this.Board.tokens.concat(`<div class="token token-gray" style="box-shadow:0px ${this.Tokens.white}px;margin-top:${-this.Tokens.white+165}px;">${this.Tokens.white}</div>`);
                else
                    this.Board.tokens = this.Board.tokens.concat(`<div class="token token-white" style="box-shadow:0px ${this.Tokens.white}px,0px 0px 15px 0px;margin-top:${-this.Tokens.white+165}px;" onclick="game.players[game.turn].pickToken('white')">${this.Tokens.white}</div>`);
                // Black tokens
                if(
                    this.players[this.turn].tempTokens.black==1 && this.players[this.turn].tempTokens.red+this.players[this.turn].tempTokens.green+this.players[this.turn].tempTokens.blue+this.players[this.turn].tempTokens.white+this.players[this.turn].tempTokens.black>=2 ||
                    this.players[this.turn].tempTokens.black+this.Tokens.black<4 &&  this.players[this.turn].tempTokens.black>0 ||
                    this.Tokens.black==0
                )
                    this.Board.tokens = this.Board.tokens.concat(`<div class="token token-gray" style="box-shadow:0px ${this.Tokens.black}px;margin-top:${-this.Tokens.black+220}px;">${this.Tokens.black}</div>`);
                else
                    this.Board.tokens = this.Board.tokens.concat(`<div class="token token-black" style="box-shadow:0px ${this.Tokens.black}px,0px 0px 15px 0px;margin-top:${-this.Tokens.black+220}px;" onclick="game.players[game.turn].pickToken('black')">${this.Tokens.black}</div>`);

                this.Board.tokens = this.Board.tokens.concat(`<div class="token token-gray" style="box-shadow:0px ${this.Tokens.gold}px;margin-top:${-this.Tokens.gold+275}px;">${this.Tokens.gold}</div>`);
                this.Board.tokens = this.Board.tokens.concat(`</div>`);
            }
            // Rendering noble cards
            for(let i=0; i<5; i++){
                if(this.nobles[i]){
                    this.Board.nobles = this.Board.nobles.concat(`<div class="noble" style="margin-left:${20+i*96}px; background:url(${this.nobles[i].image});"><div class="label-bottom">
                        <span class="req red" style="display:${this.nobles[i].Requirements.red==0 ? 'none' : 'inline'};">${this.nobles[i].Requirements.red}</span>
                        <span class="req green" style="display:${this.nobles[i].Requirements.green==0 ? 'none' : 'inline'};">${this.nobles[i].Requirements.green}</span>
                        <span class="req blue" style="display:${this.nobles[i].Requirements.blue==0 ? 'none' : 'inline'};">${this.nobles[i].Requirements.blue}</span>
                        <span class="req white" style="display:${this.nobles[i].Requirements.white==0 ? 'none' : 'inline'};">${this.nobles[i].Requirements.white}</span>
                        <span class="req black" style="display:${this.nobles[i].Requirements.black==0 ? 'none' : 'inline'};">${this.nobles[i].Requirements.black}</span>
                    </div>
                        <span class="points-left">${this.nobles[i].points}</span>
                    </div>`);
                }
                
                else{
                    this.Board.nobles = this.Board.nobles.concat(`<div class="noble-empty" style="margin-left:${20+i*96}px;"></div>`);
                }
            }
            // Rendering level one cards
            for(let i=0; i<4; i++){
                if(this.CardsOnBoard.levelOne[i]){
                    this.Board.levelOne = this.Board.levelOne.concat(`<div class="card" style="margin-left:${20+(i+1)*96}px; bottom: 20px; border:2px solid ${this.CardsOnBoard.levelOne[i].color}; background:url(${this.CardsOnBoard.levelOne[i].image}); box-shadow:${this.players[this.turn].action!='reserving' ? (this.players[this.turn].canBuyCard(this.CardsOnBoard.levelOne[i]) && this.players[this.turn].action=='buyingFromBoard' ? '0px 0px 15px 0px '.concat(this.CardsOnBoard.levelOne[i].color=='white' ? 'gray':this.CardsOnBoard.levelOne[i].color): '0px 0px'):'0px 0px 5px 0px '.concat(this.CardsOnBoard.levelOne[i].color=='white' ? 'gray':this.CardsOnBoard.levelOne[i].color)};" onclick="game.players[game.turn].pickCard(${i},1)"><div class="label">
                        <span class="req red" style="display:${this.CardsOnBoard.levelOne[i].Requirements.red==0 ? 'none' : 'inline'};">${this.CardsOnBoard.levelOne[i].Requirements.red}</span>
                        <span class="req green" style="display:${this.CardsOnBoard.levelOne[i].Requirements.green==0 ? 'none' : 'inline'};">${this.CardsOnBoard.levelOne[i].Requirements.green}</span>
                        <span class="req blue" style="display:${this.CardsOnBoard.levelOne[i].Requirements.blue==0 ? 'none' : 'inline'};">${this.CardsOnBoard.levelOne[i].Requirements.blue}</span>
                        <span class="req white" style="display:${this.CardsOnBoard.levelOne[i].Requirements.white==0 ? 'none' : 'inline'};">${this.CardsOnBoard.levelOne[i].Requirements.white}</span>
                        <span class="req black" style="display:${this.CardsOnBoard.levelOne[i].Requirements.black==0 ? 'none' : 'inline'};">${this.CardsOnBoard.levelOne[i].Requirements.black}</span>
                    </div>
                        <span class="points" style="display:${this.CardsOnBoard.levelOne[i].points==0 ? 'none' : 'inline'}">${this.CardsOnBoard.levelOne[i].points}</span>
                    </div>`);
                }
                else{
                    this.Board.levelOne = this.Board.levelOne.concat(`<div class="card-empty" style="margin-left:${20+(i+1)*96}px; bottom: 20px;"></div>`);
                }
            }
            // Rendering level two cards
            for(let i=0; i<4; i++){
                if(this.CardsOnBoard.levelTwo[i]){
                    this.Board.levelTwo = this.Board.levelTwo.concat(`<div class="card" style="margin-left:${20+(i+1)*96}px; bottom: 140px; border:2px solid ${this.CardsOnBoard.levelTwo[i].color}; background:url(${this.CardsOnBoard.levelTwo[i].image}); box-shadow:${this.players[this.turn].action!='reserving' ? (this.players[this.turn].canBuyCard(this.CardsOnBoard.levelTwo[i]) && this.players[this.turn].action=='buyingFromBoard' ? '0px 0px 15px 0px '.concat(this.CardsOnBoard.levelTwo[i].color=='white' ? 'gray':this.CardsOnBoard.levelTwo[i].color): '0px 0px'):'0px 0px 5px 0px '.concat(this.CardsOnBoard.levelTwo[i].color=='white' ? 'gray':this.CardsOnBoard.levelTwo[i].color)};" onclick="game.players[game.turn].pickCard(${i},2)"><div class="label">
                        <span class="req red" style="display:${this.CardsOnBoard.levelTwo[i].Requirements.red==0 ? 'none' : 'inline'};">${this.CardsOnBoard.levelTwo[i].Requirements.red}</span>
                        <span class="req green" style="display:${this.CardsOnBoard.levelTwo[i].Requirements.green==0 ? 'none' : 'inline'};">${this.CardsOnBoard.levelTwo[i].Requirements.green}</span>
                        <span class="req blue" style="display:${this.CardsOnBoard.levelTwo[i].Requirements.blue==0 ? 'none' : 'inline'};">${this.CardsOnBoard.levelTwo[i].Requirements.blue}</span>
                        <span class="req white" style="display:${this.CardsOnBoard.levelTwo[i].Requirements.white==0 ? 'none' : 'inline'};">${this.CardsOnBoard.levelTwo[i].Requirements.white}</span>
                        <span class="req black" style="display:${this.CardsOnBoard.levelTwo[i].Requirements.black==0 ? 'none' : 'inline'};">${this.CardsOnBoard.levelTwo[i].Requirements.black}</span>
                    </div>
                        <span class="points" style="display:${this.CardsOnBoard.levelTwo[i].points==0 ? 'none' : 'inline'}">${this.CardsOnBoard.levelTwo[i].points}</span>
                    </div>`);
                }
                else{
                    this.Board.levelTwo = this.Board.levelTwo.concat(`<div class="card-empty" style="margin-left:${20+(i+1)*96}px; bottom: 140px;"></div>`);
                }
            }
            // Rendering level three cards
            for(let i=0; i<4; i++){
                if(this.CardsOnBoard.levelThree[i]){
                    this.Board.levelThree = this.Board.levelThree.concat(`<div class="card" style="margin-left:${20+(i+1)*96}px; bottom: 260px; border:2px solid ${this.CardsOnBoard.levelThree[i].color}; background:url(${this.CardsOnBoard.levelThree[i].image});box-shadow:${this.players[this.turn].action!='reserving' ? (this.players[this.turn].canBuyCard(this.CardsOnBoard.levelThree[i]) && this.players[this.turn].action=='buyingFromBoard' ? '0px 0px 15px 0px '.concat(this.CardsOnBoard.levelThree[i].color=='white' ? 'gray':this.CardsOnBoard.levelThree[i].color): '0px 0px'):'0px 0px 5px 0px '.concat(this.CardsOnBoard.levelThree[i].color=='white' ? 'gray':this.CardsOnBoard.levelThree[i].color)};" onclick="game.players[game.turn].pickCard(${i},3)"><div class="label">
                        <span class="req red" style="display:${this.CardsOnBoard.levelThree[i].Requirements.red==0 ? 'none' : 'inline'};">${this.CardsOnBoard.levelThree[i].Requirements.red}</span>
                        <span class="req green" style="display:${this.CardsOnBoard.levelThree[i].Requirements.green==0 ? 'none' : 'inline'};">${this.CardsOnBoard.levelThree[i].Requirements.green}</span>
                        <span class="req blue" style="display:${this.CardsOnBoard.levelThree[i].Requirements.blue==0 ? 'none' : 'inline'};">${this.CardsOnBoard.levelThree[i].Requirements.blue}</span>
                        <span class="req white" style="display:${this.CardsOnBoard.levelThree[i].Requirements.white==0 ? 'none' : 'inline'};">${this.CardsOnBoard.levelThree[i].Requirements.white}</span>
                        <span class="req black" style="display:${this.CardsOnBoard.levelThree[i].Requirements.black==0 ? 'none' : 'inline'};">${this.CardsOnBoard.levelThree[i].Requirements.black}</span>
                    </div>
                        <span class="points" style="display:${this.CardsOnBoard.levelThree[i].points==0 ? 'none' : 'inline'}">${this.CardsOnBoard.levelThree[i].points}</span>
                    </div>`);
                }
                else{
                    this.Board.levelThree = this.Board.levelThree.concat(`<div class="card-empty" style="margin-left:${20+(i+1)*96}px; bottom: 260px;"></div>`);
                }
            }
            // Render player frames
            for(let i=0; i<this.players.length; i++){
                this.Board.playerFrame = this.Board.playerFrame.concat(`
                <div class="player-frame" style="margin-top:${2+i*220}px;">
                    <div style="display:flex; font-weight: bold; font-size:16px; color: rgb(${this.players[i].nameColor.r},${this.players[i].nameColor.g},${this.players[i].nameColor.b}); text-shadow:1px 1px 2px #555;">${this.players[i].name}<span class="swinging-arrow" style="display:${i != this.turn ? 'none' : 'inline'};"><<</span></div>
                    <div class="player-frame-row"><div class="player-frame-cell">Production:</div><div class="span-holder"><span class="req red">${this.players[i].Production.red}</span><span class="req green">${this.players[i].Production.green}</span><span class="req blue">${this.players[i].Production.blue}</span><span class="req white">${this.players[i].Production.white}</span><span class="req black">${this.players[i].Production.black}</span></div></div>
                    <div class="player-frame-row"><div class="player-frame-cell">Tokens:</div><div class="span-holder"><span class="req gold">${this.players[i].Tokens.gold}</span><span class="req red">${this.players[i].Tokens.red}<span style="display:${this.players[i].GoldTokens.red<=0 ? 'none' : 'inline'};color:rgb(255, 217, 0);">+${this.players[i].GoldTokens.red}</span></span><span class="req green">${this.players[i].Tokens.green}<span style="display:${this.players[i].GoldTokens.green<=0 ? 'none' : 'inline'};color:rgb(255, 217, 0);">+${this.players[i].GoldTokens.green}</span></span><span class="req blue">${this.players[i].Tokens.blue}<span style="display:${this.players[i].GoldTokens.blue<=0 ? 'none' : 'inline'};color:rgb(255, 217, 0);">+${this.players[i].GoldTokens.blue}</span></span><span class="req white">${this.players[i].Tokens.white}<span style="display:${this.players[i].GoldTokens.white<=0 ? 'none' : 'inline'};color:rgb(187, 159, 0);">+${this.players[i].GoldTokens.white}</span></span><span class="req black">${this.players[i].Tokens.black}<span style="display:${this.players[i].GoldTokens.black<=0 ? 'none' : 'inline'};color:rgb(255, 217, 0);">+${this.players[i].GoldTokens.black}</span></span></div></div>
                    <div class="player-frame-row"><div class="player-frame-cell">Points:</div><div class="span-holder">${this.players[i].points}</div></div>
                    <div class="player-frame-row" style="font-weight:bold;">Reserve:</div>
                `);
                // Rendering reserved cards
                if(this.players[i].reservedCards.length>0){
                    for(let j=0;j<this.players[i].reservedCards.length;j++){
                        this.Board.playerFrame = this.Board.playerFrame.concat(`
                        <div class="card" style="position:relative; margin-left:0; border:2px solid ${this.players[i].reservedCards[j].color}; background:url(${this.players[i].reservedCards[j].image}); box-shadow:${this.players[i].canBuyCard(this.players[i].reservedCards[j]) && this.players[i].action == 'buyingFromReserve' ? '0px 0px 15px 0px '.concat(this.players[i].reservedCards[j].color=='white' ? 'gray':this.players[i].reservedCards[j].color) : '0px 0px'};" onclick="game.players[game.turn].pickCard(${j},${i})"><div class="label">
                            <span class="req red" style="display:${this.players[i].reservedCards[j].Requirements.red==0 ? 'none' : 'inline'}">${this.players[i].reservedCards[j].Requirements.red}</span>
                            <span class="req green" style="display:${this.players[i].reservedCards[j].Requirements.green==0 ? 'none' : 'inline'}">${this.players[i].reservedCards[j].Requirements.green}</span>
                            <span class="req blue" style="display:${this.players[i].reservedCards[j].Requirements.blue==0 ? 'none' : 'inline'}">${this.players[i].reservedCards[j].Requirements.blue}</span>
                            <span class="req white" style="display:${this.players[i].reservedCards[j].Requirements.white==0 ? 'none' : 'inline'}">${this.players[i].reservedCards[j].Requirements.white}</span>
                            <span class="req black" style="display:${this.players[i].reservedCards[j].Requirements.black==0 ? 'none' : 'inline'}">${this.players[i].reservedCards[j].Requirements.black}</span>
                        </div>
                            <span class="points" style="display:${this.players[i].reservedCards[j].points==0 ? 'none' : 'inline'}">${this.players[i].reservedCards[j].points}</span>
                        </div>
                        `);
                    }
                }
                else{
                    this.Board.playerFrame = this.Board.playerFrame.concat(`<div style="height:100px;line-height:100px;">---</div>`);
                }
                this.Board.playerFrame = this.Board.playerFrame.concat('</div>');
            }
        }
        
        // Final render
        switch(scene){
            case 'game':
                this.table = `
                ${this.Board.playerFrame}
                <div class="table" style="margin-left:${this.canvasSize.width*2/3-250}px; margin-top:${this.canvasSize.height/2-250}px">
                    ${this.Board.actionMenu}
                    ${this.Board.tokens}
                    ${this.Board.nobles}
                    ${this.Board.levelThreeDeck} ${this.Board.levelThree}
                    ${this.Board.levelTwoDeck} ${this.Board.levelTwo}
                    ${this.Board.levelOneDeck} ${this.Board.levelOne}
                </div>
                ${this.Board.message}`;
                break;
            case 'startingScreen':
                this.table = `
                ${this.StartingScreen.background}
                ${this.StartingScreen.title}
                ${this.StartingScreen.playersFrame}
                `;
                break;
        }
        this.canvas = `<div class="canvas" style="width:${this.canvasSize.width}px; height:${this.canvasSize.height}px;">${this.table}</div>`;
        document.getElementById('game').innerHTML = this.canvas;

        if(this.currentScene == 'startingScreen'){
            document.getElementById('addPlayer').addEventListener('keypress',(e) => {
                if(e.keyCode == 13 && (document.getElementById('addPlayer').value != 'draw' && document.getElementById('addPlayer').value.length > 0 && !doesContain(document.getElementById('addPlayer').value,' '))){
                    this.addPlayer(document.getElementById('addPlayer').value);
                    document.getElementById('addPlayer').value = '';
                }
            });
        }

        return true;
    }
    addPlayer(name){
        this.players.push(new Player(name));
        this.update();
        return true;
    }
    addCard(level, color, Requirements, points){
        switch(level){
            case 1:
                this.Cards.levelOne.push(new Card(level, color, Requirements, points));
                break;
            case 2:
                this.Cards.levelTwo.push(new Card(level, color, Requirements, points));
                break;
            case 3:
                this.Cards.levelThree.push(new Card(level, color, Requirements, points));
                break;
        }
        return true;
    }
    addNoble(Requirements, points){
        this.nobles.push(new Noble(Requirements, points));
        return true;
    }
    // Finds a card on the board and removes it
    removeCardFromBoard(card){
        for(let i=0;i<4;i++){
            if(findIndexById(card, this.CardsOnBoard.levelOne)!=-1) {
                this.CardsOnBoard.levelOne.splice(findIndexById(card, this.CardsOnBoard.levelOne),1);
                this.update();
                return true;
            }
            else if(findIndexById(card, this.CardsOnBoard.levelTwo)!=-1) {
                this.CardsOnBoard.levelTwo.splice(findIndexById(card, this.CardsOnBoard.levelTwo),1);
                this.update();
                return true;
            }
            else if(findIndexById(card, this.CardsOnBoard.levelThree)!=-1) {
                this.CardsOnBoard.levelThree.splice(findIndexById(card, this.CardsOnBoard.levelThree),1);
                this.update();
                return true;
            }
            else{
                this.update();
                return false;
            }
        }
    }
    changeScene(scene){
        this.currentScene = scene;
        this.renderBoard();
        this.update();
        return true;
    }
}
var game = new GameManager({width: 1028, height: 900}, 'Splendor');

class Player{
    constructor(name){
        this.name = name;
        this.developmentCards = [];
        this.reservedCards = [];
        this.nobles = [];
        this.Production = {
            red: 0,
            green: 0,
            blue: 0,
            white: 0,
            black: 0
        };
        this.action = 'none'; // actions include: none, pickingTokens, buyingFromBoard, buyingFromReserve, reserving
        this.tempTokens = {
            red: 0,
            green: 0,
            blue: 0,
            white: 0,
            black: 0
        };
        this.Tokens = {
            red: 0,
            green: 0,
            blue: 0,
            white: 0,
            black: 0,
            gold: 0
        };
        this.GoldTokens = {
            red: 0,
            green: 0,
            blue: 0,
            white: 0,
            black: 0,
            gold: 0
        };
        this.points = 0;
        this.nameColor = {
            r: getRandom(0,255,true),
            g: getRandom(0,255,true),
            b: getRandom(0,255,true)
        }
    }
    // Updates player's statistics
    update(){
        this.points = 0;
        this.Production = {red: 0, green: 0, blue: 0, white: 0, black: 0};
        for(let i=0; i<this.developmentCards.length; i++){
            this.points += this.developmentCards[i].points;
            switch(this.developmentCards[i].color){
                case 'red':
                    this.Production.red++;
                    break;
                case 'green':
                    this.Production.green++;
                    break;
                case 'blue':
                    this.Production.blue++;
                    break;
                case 'white':
                    this.Production.white++;
                    break;
                case 'black':
                    this.Production.black++;
                    break;
            }
        }
        for(let i=0; i<this.nobles.length;i++)
            this.points += this.nobles[i].points;
        this.Tokens.red += this.tempTokens.red;
        this.Tokens.green += this.tempTokens.green;
        this.Tokens.blue += this.tempTokens.blue;
        this.Tokens.white += this.tempTokens.white;
        this.Tokens.black += this.tempTokens.black;
        this.tempTokens = {
            red: 0,
            green: 0,
            blue: 0,
            white: 0,
            black: 0
        };
        return true;
    }
    setAction(action){
        this.action = action;
        game.update();
    }
    abortAction(){
        switch(this.action){
            case 'pickingTokens':
                game.Tokens.red += this.tempTokens.red;
                game.Tokens.green += this.tempTokens.green;
                game.Tokens.blue += this.tempTokens.blue;
                game.Tokens.white += this.tempTokens.white;
                game.Tokens.black += this.tempTokens.black;
                this.tempTokens = {
                    red: 0,
                    green: 0,
                    blue: 0,
                    white: 0,
                    black: 0
                };
                break;
        }
        this.action = 'none';
        game.update();
    }
    // Called by clicks on cards
    pickCard(id, arg){
        switch(this.action){
            case 'reserving':
                switch(arg){
                    case 1:
						this.addToReserve(game.CardsOnBoard.levelOne[id]);
                        break;
                    case 2:
                        this.addToReserve(game.CardsOnBoard.levelTwo[id]);
                        break;
                    case 3:
                        this.addToReserve(game.CardsOnBoard.levelThree[id]);
                        break;
                }
                break;
            case 'buyingFromReserve':
                if(game.turn == arg)
                    this.buyFromReserve(game.players[game.turn].reservedCards[id]);
                else{
                    this.action = 'none';
                    return false;
                }
                break;
            case 'buyingFromBoard':
                switch(arg){
                    case 1:
                        if(!this.buyCard(game.CardsOnBoard.levelOne[id]))
							return false;
                        break;
                    case 2:
                        if(!this.buyCard(game.CardsOnBoard.levelTwo[id]))
							return false;
                        break;
                    case 3:
                        if(!this.buyCard(game.CardsOnBoard.levelThree[id]))
							return false;
                        break;
                }
                break;
        }
        if(this.action != 'none'){
			this.action = 'none';
			game.endTurn();
        }
		
        return false;
    }
    // When the player chose to pick up tokens
    pickToken(color){
        if(this.action == 'pickingTokens' && this.Tokens.red+this.GoldTokens.red+this.Tokens.green+this.GoldTokens.green+this.Tokens.blue+this.GoldTokens.blue+this.Tokens.white+this.GoldTokens.white+this.Tokens.black+this.GoldTokens.black+this.Tokens.gold < 10){
            switch(color){
                case 'red':
                    game.Tokens.red--;
                    this.tempTokens.red++;
                    break;
                case 'green':
                    game.Tokens.green--;
                    this.tempTokens.green++;
                    break;
                case 'blue':
                    game.Tokens.blue--;
                    this.tempTokens.blue++;
                    break;
                case 'white':
                    game.Tokens.white--;
                    this.tempTokens.white++;
                    break;
                case 'black':
                    game.Tokens.black--;
                    this.tempTokens.black++;
                    break;
            }
            game.renderBoard();
            if(this.tempTokens.red==2 || this.tempTokens.green==2 || this.tempTokens.blue==2 || this.tempTokens.white==2 || this.tempTokens.black==2 || this.tempTokens.red+this.tempTokens.green+this.tempTokens.blue+this.tempTokens.white+this.tempTokens.black >= 3 || this.tempTokens.red+this.tempTokens.green+this.tempTokens.blue+this.tempTokens.white+this.tempTokens.black+this.Tokens.red+this.GoldTokens.red+this.Tokens.green+this.GoldTokens.green+this.Tokens.blue+this.GoldTokens.blue+this.Tokens.white+this.GoldTokens.white+this.Tokens.black+this.GoldTokens.black+this.Tokens.gold >= 10)
                game.endTurn();
            return true;
        }
        else if(this.action!='pickingTokens')
            return 'wrongAction';
        else if(this.Tokens.red+this.GoldTokens.red+this.Tokens.green+this.GoldTokens.green+this.Tokens.blue+this.GoldTokens.blue+this.Tokens.white+this.GoldTokens.white+this.Tokens.black+this.GoldTokens.black >= 10)
            return 'tooManyTokens';
        return false;
    }
    // Returns true if there is a card on board that can be bought
    canBuyFromBoard(){
        for(let i=0; i<game.CardsOnBoard.levelOne.length; i++){
            if(
                this.Tokens.red + this.GoldTokens.red + this.Production.red - game.CardsOnBoard.levelOne[i].Requirements.red >= 0 &&
                this.Tokens.green + this.GoldTokens.green + this.Production.green - game.CardsOnBoard.levelOne[i].Requirements.green >= 0 &&
                this.Tokens.blue + this.GoldTokens.blue + this.Production.blue - game.CardsOnBoard.levelOne[i].Requirements.blue >= 0 &&
                this.Tokens.white + this.GoldTokens.white + this.Production.white - game.CardsOnBoard.levelOne[i].Requirements.white >= 0 &&
                this.Tokens.black + this.GoldTokens.black + this.Production.black - game.CardsOnBoard.levelOne[i].Requirements.black >= 0
            )
                return true;
        }
        for(let i=0; i<game.CardsOnBoard.levelOne.length; i++){
            if(
                this.Tokens.red + this.GoldTokens.red + this.Production.red - game.CardsOnBoard.levelTwo[i].Requirements.red >= 0 &&
                this.Tokens.green + this.GoldTokens.green + this.Production.green - game.CardsOnBoard.levelTwo[i].Requirements.green >= 0 &&
                this.Tokens.blue + this.GoldTokens.blue + this.Production.blue - game.CardsOnBoard.levelTwo[i].Requirements.blue >= 0 &&
                this.Tokens.white + this.GoldTokens.white + this.Production.white - game.CardsOnBoard.levelTwo[i].Requirements.white >= 0 &&
                this.Tokens.black + this.GoldTokens.black + this.Production.black - game.CardsOnBoard.levelTwo[i].Requirements.black >= 0
            )
                return true;
        }
        for(let i=0; i<game.CardsOnBoard.levelOne.length; i++){
            if(
                this.Tokens.red + this.GoldTokens.red + this.Production.red - game.CardsOnBoard.levelThree[i].Requirements.red >= 0 &&
                this.Tokens.green + this.GoldTokens.green + this.Production.green - game.CardsOnBoard.levelThree[i].Requirements.green >= 0 &&
                this.Tokens.blue + this.GoldTokens.blue + this.Production.blue - game.CardsOnBoard.levelThree[i].Requirements.blue >= 0 &&
                this.Tokens.white + this.GoldTokens.white + this.Production.white - game.CardsOnBoard.levelThree[i].Requirements.white >= 0 &&
                this.Tokens.black + this.GoldTokens.black + this.Production.black - game.CardsOnBoard.levelThree[i].Requirements.black >= 0
            )
                return true;
        }
        return false;
    }
    // Returns true if there is a card in player's reserve that can be bought
    canBuyFromReserve(){
        for(let i=0; i<this.reservedCards.length; i++){
            if(
                this.Tokens.red + this.GoldTokens.red + this.Production.red - this.reservedCards[i].Requirements.red >= 0 &&
                this.Tokens.green + this.GoldTokens.green + this.Production.green - this.reservedCards[i].Requirements.green >= 0 &&
                this.Tokens.blue + this.GoldTokens.blue + this.Production.blue - this.reservedCards[i].Requirements.blue >= 0 &&
                this.Tokens.white + this.GoldTokens.white + this.Production.white - this.reservedCards[i].Requirements.white >= 0 &&
                this.Tokens.black + this.GoldTokens.black + this.Production.black - this.reservedCards[i].Requirements.black >= 0
            )
                return true;
        }
        return false;
    }
    // Returns true if player can afford the card
    canBuyCard(card){
        if(
            this.Tokens.red + this.GoldTokens.red + this.Production.red - card.Requirements.red >= 0 &&
            this.Tokens.green + this.GoldTokens.green + this.Production.green - card.Requirements.green >= 0 &&
            this.Tokens.blue + this.GoldTokens.blue + this.Production.blue - card.Requirements.blue >= 0 &&
            this.Tokens.white + this.GoldTokens.white + this.Production.white - card.Requirements.white >= 0 &&
            this.Tokens.black + this.GoldTokens.black + this.Production.black - card.Requirements.black >= 0
        )
            return true;
        return false;
    }
    // Turns gold token into other colored tokens
    turnGold(color){
        if(this.Tokens.gold>0){
            this.Tokens.gold--;
            switch(color){
                case 'red':
                    this.GoldTokens.red++;
                    break;
                case 'green':
                    this.GoldTokens.green++;
                    break;
                case 'blue':
                    this.GoldTokens.blue++;
                    break;
                case 'white':
                    this.GoldTokens.white++;
                    break;
                case 'black':
                    this.GoldTokens.black++;
                    break;
            }
            game.update();
            return true;
        }
        return false;
    }
    // Add a card to player's development cards (action 1 of 5)
    buyCard(card, checkReq=true){
        if(!checkReq){
            this.developmentCards.push(card);
            game.removeCardFromBoard(card);
            return true; // when added successfully
        }
        // This below probably could be written in a better way... (works nonetheless)
        if(
            this.Tokens.red + this.GoldTokens.red + this.Production.red - card.Requirements.red >= 0 &&
            this.Tokens.green + this.GoldTokens.green + this.Production.green - card.Requirements.green >= 0 &&
            this.Tokens.blue + this.GoldTokens.blue + this.Production.blue - card.Requirements.blue >= 0 &&
            this.Tokens.white + this.GoldTokens.white + this.Production.white - card.Requirements.white >= 0 &&
            this.Tokens.black + this.GoldTokens.black + this.Production.black - card.Requirements.black >= 0
        ){
            // if production doesn't suffice
            if(card.Requirements.red - this.Production.red > 0) {
                if(this.GoldTokens.red >= card.Requirements.red - this.Production.red){
                    game.Tokens.gold += card.Requirements.red - this.Production.red;
                    this.GoldTokens.red -= card.Requirements.red - this.Production.red;
                }
                else{
                    game.Tokens.gold += this.GoldTokens.red;
                    this.Tokens.red -= card.Requirements.red - this.Production.red - this.GoldTokens.red;
                    game.Tokens.red += card.Requirements.red - this.Production.red - this.GoldTokens.red;
                    this.GoldTokens.red = 0;
                }
            }
            if(card.Requirements.green - this.Production.green > 0) {
                if(this.GoldTokens.green >= card.Requirements.green - this.Production.green){
                    game.Tokens.gold += card.Requirements.green - this.Production.green;
                    this.GoldTokens.green -= card.Requirements.green - this.Production.green;
                }
                else{
                    game.Tokens.gold += this.GoldTokens.green;
                    this.Tokens.green -= card.Requirements.green - this.Production.green - this.GoldTokens.green;
                    game.Tokens.green += card.Requirements.green - this.Production.green - this.GoldTokens.green;
                    this.GoldTokens.green = 0;
                }
            }
            if(card.Requirements.blue - this.Production.blue > 0) {
                if(this.GoldTokens.blue >= card.Requirements.blue - this.Production.blue){
                    game.Tokens.gold += card.Requirements.blue - this.Production.blue;
                    this.GoldTokens.blue -= card.Requirements.blue - this.Production.blue;
                }
                else{
                    game.Tokens.gold += this.GoldTokens.blue;
                    this.Tokens.blue -= card.Requirements.blue - this.Production.blue - this.GoldTokens.blue;
                    game.Tokens.blue += card.Requirements.blue - this.Production.blue - this.GoldTokens.blue;
                    this.GoldTokens.blue = 0;
                }
            }
            if(card.Requirements.white - this.Production.white > 0) {
                if(this.GoldTokens.white >= card.Requirements.white - this.Production.white){
                    game.Tokens.gold += card.Requirements.white - this.Production.white;
                    this.GoldTokens.white -= card.Requirements.white - this.Production.white;
                }
                else{
                    game.Tokens.gold += this.GoldTokens.white;
                    this.Tokens.white -= card.Requirements.white - this.Production.white - this.GoldTokens.white;
                    game.Tokens.white += card.Requirements.white - this.Production.white - this.GoldTokens.white;
                    this.GoldTokens.white = 0;
                }
            }
            if(card.Requirements.black - this.Production.black > 0) {
                if(this.GoldTokens.black >= card.Requirements.black - this.Production.black){
                    game.Tokens.gold += card.Requirements.black - this.Production.black;
                    this.GoldTokens.black -= card.Requirements.black - this.Production.black;
                }
                else{
                    game.Tokens.gold += this.GoldTokens.black;
                    this.Tokens.black -= card.Requirements.black - this.Production.black - this.GoldTokens.black;
                    game.Tokens.black += card.Requirements.black - this.Production.black - this.GoldTokens.black;
                    this.GoldTokens.black = 0;
                }
            }

            this.developmentCards.push(card);
            game.removeCardFromBoard(card);
            return true; // when the player had enough tokens and production bonus to buy a card
        }
        return false; // when the player has insufficient amount of tokens and production bonuses to buy a card
    }
    // Add a card to player's reserve (action 2 of 5)
    addToReserve(card){
        if(this.reservedCards.length < 3){
            if(game.Tokens.gold > 0){
                game.Tokens.gold--;
                this.Tokens.gold++;
            }
            this.reservedCards.push(card);
            game.removeCardFromBoard(card);
            return true; // when added successfully
        }
        return false; // when player can't add the card to reserve due to it's 3 cards limit
    }
    // Buy a card from player's reserve (action 3 of 5)
    buyFromReserve(card, checkReq=true){
        if(!checkReq){
            //this.developmentCards.push(this.reservedCards[findIndexById(card,this.reservedCards)]);
            this.developmentCards.push(card);
            this.reservedCards.splice(findIndexById(card,this.reservedCards),1);
            game.update();
            return true; // when added successfully
        }
        if(
            this.Tokens.red + this.GoldTokens.red + this.Production.red - card.Requirements.red >= 0 &&
            this.Tokens.green + this.GoldTokens.green + this.Production.green - card.Requirements.green >= 0 &&
            this.Tokens.blue + this.GoldTokens.blue + this.Production.blue - card.Requirements.blue >= 0 &&
            this.Tokens.white + this.GoldTokens.white + this.Production.white - card.Requirements.white >= 0 &&
            this.Tokens.black + this.GoldTokens.black + this.Production.black - card.Requirements.black >= 0
        ){
            // if production doesn't suffice
            if(card.Requirements.red - this.Production.red > 0) {
                if(this.GoldTokens.red >= card.Requirements.red - this.Production.red){
                    game.Tokens.gold += card.Requirements.red - this.Production.red;
                    this.GoldTokens.red -= card.Requirements.red - this.Production.red;
                }
                else{
                    game.Tokens.gold += this.GoldTokens.red;
                    this.Tokens.red -= card.Requirements.red - this.Production.red - this.GoldTokens.red;
                    game.Tokens.red += card.Requirements.red - this.Production.red - this.GoldTokens.red;
                    this.GoldTokens.red = 0;
                }
            }
            if(card.Requirements.green - this.Production.green > 0) {
                if(this.GoldTokens.green >= card.Requirements.green - this.Production.green){
                    game.Tokens.gold += card.Requirements.green - this.Production.green;
                    this.GoldTokens.green -= card.Requirements.green - this.Production.green;
                }
                else{
                    game.Tokens.gold += this.GoldTokens.green;
                    this.Tokens.green -= card.Requirements.green - this.Production.green - this.GoldTokens.green;
                    game.Tokens.green += card.Requirements.green - this.Production.green - this.GoldTokens.green;
                    this.GoldTokens.green = 0;
                }
            }
            if(card.Requirements.blue - this.Production.blue > 0) {
                if(this.GoldTokens.blue >= card.Requirements.blue - this.Production.blue){
                    game.Tokens.gold += card.Requirements.blue - this.Production.blue;
                    this.GoldTokens.blue -= card.Requirements.blue - this.Production.blue;
                }
                else{
                    game.Tokens.gold += this.GoldTokens.blue;
                    this.Tokens.blue -= card.Requirements.blue - this.Production.blue - this.GoldTokens.blue;
                    game.Tokens.blue += card.Requirements.blue - this.Production.blue - this.GoldTokens.blue;
                    this.GoldTokens.blue = 0;
                }
            }
            if(card.Requirements.white - this.Production.white > 0) {
                if(this.GoldTokens.white >= card.Requirements.white - this.Production.white){
                    game.Tokens.gold += card.Requirements.white - this.Production.white;
                    this.GoldTokens.white -= card.Requirements.white - this.Production.white;
                }
                else{
                    game.Tokens.gold += this.GoldTokens.white;
                    this.Tokens.white -= card.Requirements.white - this.Production.white - this.GoldTokens.white;
                    game.Tokens.white += card.Requirements.white - this.Production.white - this.GoldTokens.white;
                    this.GoldTokens.white = 0;
                }
            }
            if(card.Requirements.black - this.Production.black > 0) {
                if(this.GoldTokens.black >= card.Requirements.black - this.Production.black){
                    game.Tokens.gold += card.Requirements.black - this.Production.black;
                    this.GoldTokens.black -= card.Requirements.black - this.Production.black;
                }
                else{
                    game.Tokens.gold += this.GoldTokens.black;
                    this.Tokens.black -= card.Requirements.black - this.Production.black - this.GoldTokens.black;
                    game.Tokens.black += card.Requirements.black - this.Production.black - this.GoldTokens.black;
                    this.GoldTokens.black = 0;
                }
            }

            this.developmentCards.push(card);
            this.reservedCards.splice(findIndexById(card,this.reservedCards),1);
            game.update();
            return true; // when the player had enough tokens and production bonus to buy a card
        }
        return false; // when the player has insufficient amount of tokens and production bonuses to buy a card
    }
}

class Card{
    constructor(level, color, Requirements, points){
        this.id = cardId++;
        this.level = level;
        this.color = color;
        this.Requirements = Requirements;
        this.points = points;
        this.Size = {
            width: 80,
            height: 100
        };
        switch(level){
            case 1:
                switch(color){
                    case 'red':
                        this.image = CardImages.red[0];
                        break;
                    case 'green':
                        this.image = CardImages.green[0];
                        break;
                    case 'blue':
                        this.image = CardImages.blue[0];
                        break;
                    case 'white':
                        this.image = CardImages.white[0];
                        break;
                    case 'black':
                        this.image = CardImages.black[0];
                        break;
                }
                break;
            case 2:
                switch(color){
                    case 'red':
                        this.image = CardImages.red[1];
                        break;
                    case 'green':
                        this.image = CardImages.green[1];
                        break;
                    case 'blue':
                        this.image = CardImages.blue[1];
                        break;
                    case 'white':
                        this.image = CardImages.white[1];
                        break;
                    case 'black':
                        this.image = CardImages.black[1];
                        break;
                }
                break;
            case 3:
                switch(color){
                    case 'red':
                        this.image = CardImages.red[2];
                        break;
                    case 'green':
                        this.image = CardImages.green[2];
                        break;
                    case 'blue':
                        this.image = CardImages.blue[2];
                        break;
                    case 'white':
                        this.image = CardImages.white[2];
                        break;
                    case 'black':
                        this.image = CardImages.black[2];
                        break;
                }
                break;
            default:
                this.image = CardImages.white[0];
                break;
        }
    }
}

class Noble{
    constructor(Requirements, points){
        this.image = nobleImages[nobleId];
        this.id = nobleId++;
        this.Requirements = Requirements;
        this.points = points;
    }
}