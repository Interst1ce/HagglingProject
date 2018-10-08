// Edit Scriptnode here.
// Add subroutines for each in-event or exposed field
// that you define in the script node's property page.

var playerCash;
var playerOffer;
var playerInventory = [0, 0, 0];

var easyPool = ["You are a gentleman and a scholar my friend. Let's make a deal.",
                "My friend I find your attitude very agreeable, however your price is not.",
                "I like your offer, but you need to take a you need to take a 'chill pill' my friend.",
                "My friend you seem very disinterested, however your price is agreeable.",
                "My friend you seem very disinterested, and your price is...interesting...",
                "I can tell you haven't done this before my friend..."];
var mediumPool = ["I SEE YOU TOO THIRST FOR BLOOD. MAY MY AXE SATE YOUR BLOODLUST AS IT HAS DONE MINE.",
                  "I SEE YOU TOO LOVE TO CRUSH THE SKULLS OF YOUR ENEMIES, HOWEVER YOU WON'T BE DOING IT WITH MY AXE FOR THAT PRICE.",
                  "YOUR OFFER TRICKS ME INTO BELIEVING YOU  HAVE THE SPIRIT OF A CONQUEROR. HOWEVER, YOUR FEEBLE APPROACH PORTRAYS WEAKNESS JUST LIKE THE FRAILTY OF YOUR SPECIES.",
                  "YOUR OFFER TRICKS ME INTO BELIEVING YOU  HAVE THE SPIRIT OF A CONQUEROR. HOWEVER, YOUR NEUTRAL APPROACH PORTRAYS BORES ME.",
                  "YOUR NEUTRAL APPROACH AND AWFUL PRICE PORTRAY YOUR  SPECIES GENERAL LACK OF BACKBONE AND AWFUL ABILITY TO EVEN DO BASIC MATH.",
                  "IF WE WEREN'T HAGGLING RIGHT NOW, I WOULD CRUSH YOU."];
var hardPool = ["I see that you too see multi-dimensional discounts. Lets us mind meld and come to this financial agreement.",
                "While I see your mind is calm and prepared for a proper mind meld, however your offer is very one-dimensional.",
                "Your mind is a tumultuous, rid it of emotion you must. However, you too see the discounts that underlie the dimensions of our universe.",
                "Your mind is so open it’s closed, on two different dimensional wavelengths we are. However, you too see the discounts that underlie the dimensions of our universe.",
                "Your mind is so open its closed, on two different dimensional wavelengths we are. However, your offer is very one-dimensional.",
                "Your primitive mind cannot comprehend discounts in this dimension or any other. "];
var itemPool = ["You’ve purchased the human’s dagger! Good Hagglin’!", "You’ve purchased the Mintoaur’s axe! Good Hagglin’!", "You’ve purchased the Alien’s ray gun! Good Hagglin’!"];
var endPool = [];

var easyMerchant = {disposition: 0, initialOffer: 100, currentOffer: 100, responses: easyPool, loop: 7, intro: "Hello my friend. Today is a great day for you indeed, here I have a great item that has come from a far away land. Come and let us converse in a civil manner to discuss a possible agreement we may come to regarding the price of this item."};
var mediumMerchant = {disposition: 1, initialOffer: 200, currentOffer: 200, responses: mediumPool, loop: 5, intro: "HUMAN, I AM ONGAR THE DESTROYER. I HAVE CRUSHED COUNTLESS OF YOUR KIND UNDER THE WEIGHT OF MY AXE. YOUR FRAIL FIGURE CLEARLY INDICATES YOU ARE WEAK NOT ONLY IN COMBAT, BUT IN YOUR PATHETIC SKILLS OF PERSUASION. COME, DO BUSINESS WITH ME IF YOU DARE."};
var hardMerchant = {disposition: 2, initialOffer: 300, currentOffer: 300, responses: hardPool, loop: 3, intro: "Hrrrmmm, traveled this universe over I have, human. Many civilizations I have seen, yes yes, many deals I have made. There is no good, nor bad, only discounts. Do not bore with me with your primitive emotions human, I see every possible dimensional outcome of our dealing here."};

var currentMerchant;

var offerRange;

var currentLoop = 0;

var gameWin = "";
var gameLose = "";
var gameTooLong = "";

function initialize(){
	playerCash = 500;
  eon.FindNode("playerMoney").GetFieldByName("Text").value = ("$" + playerCash.toString() + "$");
  currentMerchant = easyMerchant;
  mainLoop(easyMerchant, 4);
}

function mainLoop(merchant, disposition){
  eon.FindNode("playerMoney").GetFieldByName("Text").value = ("$" + playerCash.toString() + "$");
  if(currentLoop == 0){
    if(playerCash < (merchant.initialOffer + 100)){
      eon.FindNode("offerSlider").GetFieldByName("Range").value[1] = playerCash;
    }else{
      eon.FindNode("offerSlider").GetFieldByName("Range").value[1] = (merchant.initialOffer + 100);
    }
    offerRange = merchant.currentOffer - 10;
    eon.FindNode("offerSlider").GetFieldByName("CurrentValue").value = merchant.initialOffer;
    eon.FindNode("vendorText").GetFieldByName("Text").value = merchant.intro;
  }else if(currentLoop == merchant.loop){
      gameEnd(2);
  }
  if(disposition == 2){
    playerOffer = eon.FindNode("offerSlider").GetFieldByName("CurrentValue").value;
    makeOffer(2, merchant);
  }else if(disposition == 0){
    playerOffer = eon.FindNode("offerSlider").GetFieldByName("CurrentValue").value;
    makeOffer(0, merchant);
  }else if(disposition == 1){
    playerOffer = eon.FindNode("offerSlider").GetFieldByName("CurrentValue").value;
    makeOffer(1, merchant);
  }
}

function makeOffer(playerChoice, merchant){
  switch (playerChoice) {
    case 0:
      switch (merchant.disposition) {
        case 0:
          if(playerOffer >= offerRange){
            eon.FindNode("vendorText").GetFieldByName("Text").value = merchant.responses[0]
            merchant.currentOffer -= 5;
            mainLoop(merchant);
          }else{
            eon.FindNode("vendorText").GetFieldByName("Text").value = merchant.responses[1]
            offerRange -= 5;
            mainLoop(merchant);
          }
        break;
        case 1:
          if(playerOffer >= offerRange){
            eon.FindNode("vendorText").GetFieldByName("Text").value = merchant.responses[2]
            offerRange -= 2;
            mainLoop(merchant);
          }else{
            eon.FindNode("vendorText").GetFieldByName("Text").value = merchant.responses[3]
            offerRange += 2;
            mainLoop(merchant);
          }
        break;
        case 2:
          if(playerOffer >= offerRange){
            eon.FindNode("vendorText").GetFieldByName("Text").value = merchant.responses[4]
            offerRange += 5;
            mainLoop(merchant);
          }else{
            eon.FindNode("vendorText").GetFieldByName("Text").value = merchant.responses[5]
            merchant.currentOffer += 5;
            mainLoop(merchant);
          }
        break;
        default:

      }
    break;
    case 1:
      switch (merchant.disposition) {
        case 0:
          if(playerOffer >= offerRange){
            eon.FindNode("vendorText").GetFieldByName("Text").value = merchant.responses[2]
            merchant.currentOffer -= 5;
            mainLoop(merchant);
          }else{
            eon.FindNode("vendorText").GetFieldByName("Text").value = merchant.responses[3]
            offerRange -= 5;
            mainLoop(merchant);
          }
        break;
        case 1:
          if(playerOffer >= offerRange){
            eon.FindNode("vendorText").GetFieldByName("Text").value = merchant.responses[0]
            offerRange -= 2;
            mainLoop(merchant);
          }else{
            eon.FindNode("vendorText").GetFieldByName("Text").value = merchant.responses[1]
            offerRange += 2;
            mainLoop(merchant);
          }
        break;
        case 2:
          if(playerOffer >= offerRange){
            eon.FindNode("vendorText").GetFieldByName("Text").value = merchant.responses[2]
            offerRange += 5;
            mainLoop(merchant);
          }else{
            eon.FindNode("vendorText").GetFieldByName("Text").value = merchant.responses[3]
            merchant.currentOffer += 5;
            mainLoop(merchant);
          }
        break;
        default:

      }
    break;
    case 2:
      switch (merchant.disposition) {
        case 0:
          if(playerOffer >= offerRange){
            eon.FindNode("vendorText").GetFieldByName("Text").value = merchant.responses[5]
            merchant.currentOffer -= 5;
            mainLoop(merchant);
          }else{
            eon.FindNode("vendorText").GetFieldByName("Text").value = merchant.responses[4]
            offerRange -= 5;
            mainLoop(merchant);
          }
        break;
        case 1:
          if(playerOffer >= offerRange){
            eon.FindNode("vendorText").GetFieldByName("Text").value = merchant.responses[3]
            offerRange -= 2;
            mainLoop(merchant);
          }else{
            eon.FindNode("vendorText").GetFieldByName("Text").value = merchant.responses[2]
            offerRange += 2;
            mainLoop(merchant);
          }
        break;
        case 2:
          if(playerOffer >= offerRange){
            eon.FindNode("vendorText").GetFieldByName("Text").value = merchant.responses[1]
            offerRange += 5;
            mainLoop(merchant);
          }else{
            eon.FindNode("vendorText").GetFieldByName("Text").value = merchant.responses[0]
            merchant.currentOffer += 5;
            mainLoop(merchant);
          }
        break;
        default:

      }
    break;
    default:

   }
}
function gameEnd(end){
  if(end == 0){
    eon.FindNode("gameEndText").GetFieldByName("Text").value = gameEndText[1];
  }else if(end == 1){
    if(playerInventory[0] == 1 && playerInventory[1] == 1 && playerInventory[2] == 1){
      eon.FindNode("gameEndText").GetFieldByName("Text").value = gameEndText[2];
    }else{
      eon.FindNode("gameEndText").GetFieldByName("Text").value = gameEndText[1];
    }
  }else if(end == 2){
    eon.FindNode("gameEndText").GetFieldByName("Text").value = gameEndText[0];
  }
}

function On_clickFriendly(){
  currentLoop++;
  mainLoop(currentMerchant, 0);
}
function On_clickNeutral(){
  currentLoop++;
  mainLoop(currentMerchant, 1);
}
function On_clickAgressive(){
  currentLoop++;
  mainLoop(currentMerchant, 2);
}
function On_clickConfirm(){
  playerCash -= Math.floor(eon.FindNode("offerSlider").GetFieldByName("CurrentValue").value);
  currentLoop = 0;
  switch (currentMerchant.disposition) {
    case 0:
      playerInventory[0] = 1;
      if(playerCash < 0){
        gameEnd(0);
      }else if(playerOffer >= offerRange){
        eon.FindNode("minotaurPlace").GetFieldByName("SetRun").value = true;
        currentMerchant = mediumMerchant;
        currentLoop = 0;
        playerOffer = 0;
        mainLoop(mediumMerchant);
      }
    break;
    case 1:
      playerInventory[1] = 1;
      if(playerCash < 0){
        gameEnd(0);
      }else if(playerOffer >= offerRange){
        eon.FindNode("alienPlace").GetFieldByName("SetRun").value = true;
        currentMerchant = hardMerchant;
        currentLoop = 0;
        playerOffer = 0;
        mainLoop(hardMerchant);
      }
    break;
    default:
      playerInventory[2] = 1;
      gameEnd(1);
    }
}
