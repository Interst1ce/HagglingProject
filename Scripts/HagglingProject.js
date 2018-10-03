// Edit Scriptnode here.
// Add subroutines for each in-event or exposed field
// that you define in the script node's property page.

var playerCash;
var playerOffer;
var playerInventory = [0, 0, 0];

var easyMerchant = {disposition: 0, initialOffer: 100, currentOffer: 100, responses: easyPool, loop: 7};
var mediumMerchant = {disposition: 1, initialOffer: 200, currentOffer: 200, responses: mediumPool, loop: 5};
var hardMerchant = {disposition: 2, initialOffer: 300, currentOffer: 300, responses: hardPool, loop: 3};

var offerRange;

var currentLoop = 0;

var easyPool = ["++", "+", "+/", "-/", "-", "--"];
var mediumPool = ["++", "+", "+/", "-/", "-", "--"];
var hardPool = ["++", "+", "+/", "-/", "-", "--"];

var gameWin = "";
var gameLose = "";
var gameTooLong = "";

function initialize(){
	playerCash = 500;
  eon.FindNode("playerMoney").GetFieldByName("Text").value = ("Player Money: " + playerCash.toString());
  mainLoop(easyMerchant);
}

function mainLoop(merchant){
  if(currentLoop  = 0){
    offerRange = merchant.currentOffer - 10;
    eon.FindNode("offerSlider").GetFieldByName("CurrentValue").value = merchant.initialOffer;
  }
  if(playerCash < (merchant.initialOffer + 100)){
    eon.FindNode("offerSlider").GetFieldByName("Range").value[1] = playerCash;
  }else{
    eon.FindNode("offerSlider").GetFieldByName("Range").value[1] = (merchant.initialOffer + 100);
  }
  for(currentLoop; currentLoop < merchant.loop; currentLoop++){
    if(eon.FindNode("aggressive").GetFieldByName("Button").value){
      playerOffer = eon.FindNode("offerSlider").GetNode("CurrentValue").value;
      makeOffer(2, merchant);
    }else if(eon.FindNode("friendly").GetFieldByName("Button").value){
      playerOffer = eon.FindNode("offerSlider").GetNode("CurrentValue").value;
      makeOffer(0, merchant);
    }else if(eon.FindNode("neutral").GetFieldByName("Button").value){
      playerOffer = eon.FindNode("offerSlider").GetNode("CurrentValue").value;
      makeOffer(1, merchant);
    }else if(eon.FindNode("confirm").GetNode("Button").value){
      switch (merchant.disposition) {
        case 0:
          playerInventory[0] = 1;
          if(playerCash < 0){
            gameEnd(0);
          }else{
            eon.FindNode("minotaurPlace").GetFieldByName("SetRun").value = true;
            mainLoop(mediumMerchant);
            currentLoop = 0;
          }
        break;
        case 1:
          playerInventory[1] = 1;
          if(playerCash < 0){
            gameEnd(0);
          }else{
            eon.FindNode("alienPlace").GetFieldByName("SetRun").value = true;
            mainLoop(hardMerchant);
            currentLoop = 0;
          }
        break;
        case 2:
          playerInventory[2] = 1;
          gameEnd(1);
        break;
        default:

      }
    }
  }
  gameEnd(2);
}

function makeOffer(playerChoice, merchant){
  switch (playerChoice) {
    case 0:
      switch (merchant.disposition) {
        case 0:
          if(playerOffer >= offerRange){
            eon.FindNode("VendorText").GetNode("Text").value = merchant.responses[0]
            currentOffer -= 5;
            mainLoop(merchant);
          }else{
            eon.FindNode("VendorText").GetNode("Text").value = merchant.responses[1]
            offerRange -= 5;
            mainLoop(merchant);
          }
        break;
        case 1:
          if(playerOffer >= offerRange){
            eon.FindNode("VendorText").GetNode("Text").value = merchant.responses[2]
            offerRange -= 2;
            mainLoop(merchant);
          }else{
            eon.FindNode("VendorText").GetNode("Text").value = merchant.responses[3]
            offerRange += 2;
            mainLoop(merchant);
          }
        break;
        case 2:
          if(playerOffer >= offerRange){
            eon.FindNode("VendorText").GetNode("Text").value = merchant.responses[4]
            offerRange += 5;
            mainLoop(merchant);
          }else{
            eon.FindNode("VendorText").GetNode("Text").value = merchant.responses[5]
            currentOffer += 5;
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
            eon.FindNode("VendorText").GetNode("Text").value = merchant.responses[2]
            currentOffer -= 5;
            mainLoop(merchant);
          }else{
            eon.FindNode("VendorText").GetNode("Text").value = merchant.responses[3]
            offerRange -= 5;
            mainLoop(merchant);
          }
        break;
        case 1:
          if(playerOffer >= offerRange){
            eon.FindNode("VendorText").GetNode("Text").value = merchant.responses[0]
            offerRange -= 2;
            mainLoop(merchant);
          }else{
            eon.FindNode("VendorText").GetNode("Text").value = merchant.responses[1]
            offerRange += 2;
            mainLoop(merchant);
          }
        break;
        case 2:
          if(playerOffer >= offerRange){
            eon.FindNode("VendorText").GetNode("Text").value = merchant.responses[2]
            offerRange += 5;
            mainLoop(merchant);
          }else{
            eon.FindNode("VendorText").GetNode("Text").value = merchant.responses[3]
            currentOffer += 5;
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
            eon.FindNode("VendorText").GetNode("Text").value = merchant.responses[5]
            currentOffer -= 5;
            mainLoop(merchant);
          }else{
            eon.FindNode("VendorText").GetNode("Text").value = merchant.responses[4]
            offerRange -= 5;
            mainLoop(merchant);
          }
        break;
        case 1:
          if(playerOffer >= offerRange){
            eon.FindNode("VendorText").GetNode("Text").value = merchant.responses[3]
            offerRange -= 2;
            mainLoop(merchant);
          }else{
            eon.FindNode("VendorText").GetNode("Text").value = merchant.responses[2]
            offerRange += 2;
            mainLoop(merchant);
          }
        break;
        case 2:
          if(playerOffer >= offerRange){
            eon.FindNode("VendorText").GetNode("Text").value = merchant.responses[1]
            offerRange += 5;
            mainLoop(merchant);
          }else{
            eon.FindNode("VendorText").GetNode("Text").value = merchant.responses[0]
            currentOffer += 5;
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
  if(end = 0){
    eon.FindNode("gameEndText").GetFieldByName("Text").value == gameLose;
  }else if(end = 1){
    if(playerInventory[0] == 1 && playerInventory[1] == 1 && playerInventory[2] == 1){
      eon.FindNode("gameEndText").GetFieldByName("Text").value == gameWin;
    }else{
      eon.FindNode("gameEndText").GetFieldByName("Text").value == gameLose;
    }
  }else if(end = 2){
    eon.FindNode("gameEndText").GetFieldByName("Text").value == gameTooLong;
  }
}
