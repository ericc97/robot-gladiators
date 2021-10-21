var playerName = window.prompt("What is your robot's name?");
var playerHealth = 100;
var playerAttack = 10;
var playerMoney= 10;

// Nyou can also log multiple values at once like this 
console.log(playerName, playerAttack, playerHealth,playerMoney);

var enemyNames = ["Roborto","Amy Android", "Robo Trumble"];
var enemyHealth = 50;
var enemyAttack = 12;


//created a function by assigning a variable
var fight = function(enemyName) {

    //alert players they're starting the round
    window.alert("Welcome to Robot Gladiators");
    //prompt user wether to figh or skip
    //add console.log to view answer in the console
    var promptFight = window.prompt("Would you like to FIGHT or SKIP this battle? Enter 'FIGHT' or 'SKIP' to choose.");
    console.log(promptFight);
    
    // if player chooses to fight, then fight
    if (promptFight === "fight" || promptFight === "FIGHT") {
        //remove enemy's health by subtracting the amount set in the playerAttack
        enemyHealth = enemyHealth - playerAttack;
        console.log (
            playerName + " attacked " + enemyName + ". " + enemyName + " now has " + enemyHealth + " health remaining."
        );
    
    
    //check enemy's health
    if (enemyHealth <= 0) {
        window.alert(enemyName + " has died!");
    }
    else {
        window.alert(enemyName + " still has " + enemyHealth + " health left.");
    }
    // remove player's health by subtracting the amount set in the enemyAttack 
    playerHealth = playerHealth - enemyAttack;
   
    //log a resulting message to the console so we know that it worked
    console.log (
        enemyName + " attacked " + playerName + ". " + playerName + " now has " + playerHealth + " health remaining."
    );
    //check player's health
    if (playerHealth <= 0) {
        window.alert(playerName + " has died!");
    }else {
        window.alert(playerName + " still has " + playerHealth + " health left.");
    }
    //if player chooses to skip
}    else if (promptFight === "skip" || promptFight === "SKIP") {
    
    //confirm player wants to skip
    var confirmSkip = window.confirm("Are you sure you'd like to quit?");

    // if yes (true), leave fight
    if (confirmSkip){
        window.alert(playerName + " has decided to skip this fight. Goodbye!");
        playerMoney= playerMoney - 2;
    }
   //if not (false), ask question again by running fight() again
    else {
        fight();
    }
}   else {
    window.alert("You need to pick a valid option. Try Again!");
}

};


for(var i=0; i < enemyNames.length; i++){
    fight(enemyNames[i]);
}