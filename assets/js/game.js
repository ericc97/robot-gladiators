
//function to generate a random numeric value
var randomNumber = function(min,max) {
  var value = Math.floor(Math.random() * (max - min + 1) + min);

  return value;
}
var fightOrSkip = function () {
  // ask player if they'd like to fight or skip using fightOrSkip() 
  var promptFight = window.prompt('Would you like to FIGHT or SKIP this battle? Enter "FIGHT" or "SKIP" to choose.');

  //Enter the conditional recursive function call here!
  if (promptFight === "" || promptFight === null){
    window.alert("You need to provide a valid answer! Please try again.");
    //use return to call it again and stop the rest of this function from running
    return fightOrSkip();
  }

  // convert promtFight to all lowercase so we can check with less options
  promptFight = promptFight.toLowerCase();

  if (promptFight === "skip") {
    //confirm player wants to skip
    var confirmSkip = window.confirm("Are you sure you'd like to quit?");

    //if yes (true), leave fight
    if (confirmSkip) {
      window.alert(playerInfo.name + " has decideed to skip this fight. Goodbye!")
      // subtract money from playerMoney for skipping, but don't let them go into the negative
      playerInfo.money = Math.max(0, playerInfo.money -10);
      // stop while() loop using break; and enter next fight

      //return true if player wants to leave
      return true;
    }
  }
  return false;
}  

// fight function (now with parameter for enemy's name)
var fight = function(enemy) {
  while (playerInfo.health > 0 && enemy.health > 0) {
    // ask player if they'd like to fight or run using fightOrSkip function
    if (fightOrSkip()){
      //if true, leave fight by breaking loop
      break;
    }

    // gerate random damage value based on player's attack power
    var damage = randomNumber(playerInfo.attack - 3, playerInfo.attack);
    console.log(randomNumber(playerInfo.attack - 3, playerInfo.attack));

    enemy.health = Math.max(0, enemy.health - damage); 

    console.log(
      playerInfo.name + ' attacked ' + enemy.name + '. ' + enemy.name + ' now has ' + enemy.health + ' health remaining.'
      );

    // check enemy's health
    if (enemy.health <= 0) {
      window.alert(enemy.name + ' has died!');

      // award player money for winning
      playerInfo.money = playerInfo.money + 20;

      // leave while() loop since enemy is dead
      break;
    } else {
        window.alert(enemy.name + ' still has ' + enemy.health + ' health left.');
      }

    // remove players's health by subtracting the amount set in the enemyAttack variable
    var damage = randomNumber(enemy.attack - 3, enemy.attack)

    playerInfo.health = Math.max(0, playerInfo.health - damage);    
    
    console.log(
      enemy.name + ' attacked ' + playerInfo.name + '. ' + playerInfo.name + ' now has ' + playerInfo.health + ' health remaining.'
    );

    // check player's health
    if (playerInfo.health <= 0) {
      window.alert(playerInfo.name + ' has died!');
      // leave while() loop if player is dead
      break;
    } else {
      window.alert(playerInfo.name + ' still has ' + playerInfo.health + ' health left.');
    }
  }
};

// fight each enemy-robot by looping over them and fighting them one at a time
var startGame = function(enemy){

  //reset player stats
  playerInfo.reset();

  // fight each enemy robot by looping over them and fighting them one at a time
  for (var i = 0; i < enemyInfo.length; i++) {
    // if player is still alive, keep fighting
    if (playerInfo.health > 0) {
      // let player know what round they are in, remember that arrays start at 0 so it needs to have 1 added to it
      window.alert('Welcome to Robot Gladiators! Round ' + (i + 1));
      // pick new enemy to fight based on the index of the enemyNames array
      var pickedEnemyObj = enemyInfo[i];

      // reset enemyHealth before starting new fight
      pickedEnemyObj.health = randomNumber(40,60);
      


      // pass the pickedEnemyObj variable's value into the fight function, where it will assume the value of the enemyName parameter
      fight(pickedEnemyObj);
  
      //if player is still alive and we're not at the last enemy in the array
      if (playerInfo.health > 0 && i < enemyInfo.length -1) {
        //ask if player wants to use the store before next round
        var storeConfirm = window.confirm("The fight is over, visit the store before the next round?");

        // if yes, take them to the store() function
        if (storeConfirm){
          shop();
        }
      }
    }
    // if player isn't alive, stop the game
    else {
      window.alert('You have lost your robot in battle! Game Over!');
      break;
    }
  }
 
  //after loop ends, player is either out of health or enemies to fight
  //play again
  endGame();
};

// function to end the entire game
var endGame = function() {
  window.alert("The game has now ended. Let's see how you did");

  //if player is still alive, player wins!
  if (playerInfo.health > 0) {
    window.alert("Great job, you've survived the game! You now have a score of " + playerInfo.money + ".");
  } else {
    window.alert("You've lost your robot in battle");
  }

  // ask player if they'd like to play again
  var playAgainConfirm = window.confirm("Would you like to play again?");
  
  if (playAgainConfirm) {
    //restart the game
    startGame();
  } else {
    window.alert("Thank you for playing Robot Gladiators! Come back soon!");
  }
};

// go to shop between battle fucntion
var shop = function() {
  // ask player what they'd like to do
  var shopOptionPrompt = window.prompt(
    'Would you like to REFILL your health, UPGRADE your attack, or LEAVE the store? Please enter 1 for REFILL, 2 for UPGRADE, or 3 for LEAVE.'
  );

  //switch case to carry out action
  shopOptionPrompt = parseInt(shopOptionPrompt); 

  switch (shopOptionPrompt) {
    case 1:
      playerInfo.refillHealth();
      break;
    case 2:
      playerInfo.upgradeAttack();
      break;
    case 3:
      window.alert('Leaving the store.');
      // do nothing, so function will end
      break;
    default:
      window.alert('You did not pick a valid option. Try again.');
      // call shop() again to force player to pick a valid option
      shop();
      break;
  }
};
//function to set name
var getPlayername = function (){
  var name = "";

  while (name === "" || name === null){
    name = prompt("What is your robot's name?");
  }
  
  console.log("Your robot's name is " + name);
  return name;
}

// player info
var playerInfo = {
  name: getPlayername(),
  health: 100,
  attack: 10,
  money: 10,
  reset: function(){
    this.health = 100;
    this.money = 10;
    this.attack = 10;
  },
  refillHealth: function (){
    if (this.money >= 7){
      window.alert("Refilling player's health by 20 for 7 dollars.")
      this.health += 20;
      this.money -= 7;
    }
    else {
      window.alert("You don't have enough money!");
    }
  },
  upgradeAttack: function (){
    if (this.money >= 7) {
      window.alert("Upgrading player's attack by 6 for 7 dollars.");
      this.attack += 6;
      this.money -= 7;
    }
    else {
      window.alert("You don't have enough money!");
    }
  }
}

//enemy info
var enemyInfo = [
  {
    name: "Roborto",
    attack:randomNumber(10,14)
  },
  {
    name: "Amy Android",
    attack:randomNumber(10,14)
  },
  {
    name: "Robo Trumble",
    attack:randomNumber(10,14)
  }
]
// start game when page loads
startGame();

