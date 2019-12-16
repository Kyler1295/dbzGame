var audio = new Audio('SS3.mp3');

new Vue({
    el: '#app',
    data: {
        playerHealth: 100,
        monsterHealth: 100,
        gameIsRunning: false,
        senzus: 5,
        turns: [],
        stamina: 6,
        isSuperSaiyan: false,
    },
    methods: {
        startGame: function() {
            this.gameIsRunning = true;
            this.playerHealth = 100;
            this.monsterHealth = 100;
            this.senzus = 5;
            this.turns = [];
            this.stamina = 6;
            this.isSuperSaiyan = false;
        },

        attack: function(){
            var damage;
            if(this.isSuperSaiyan){
                damage = this.calculateDamage(8, 15);
            } else {
                damage = this.calculateDamage(3, 10);
            }
            this.monsterHealth -= damage;
            this.turns.unshift({
                isPlayer: true,
                text: 'Player hits Monster for ' + damage
            });
            if (this.checkWin()){ return; };
            this.staminaDown();
            this.monsterAttacks();
        },

        specialAttack: function(){
            if(this.stamina > 0){
                this.stamina--;
                var damage;
                if(this.isSuperSaiyan){
                    damage = this.calculateDamage(15, 25);
                } else {
                    damage = this.calculateDamage(8, 13);
                }
                this.monsterHealth -= damage;
                this.turns.unshift({
                    isPlayer: true,
                    text: 'Player hits Monster for ' + damage
                });
                if (this.checkWin()){ return; };
                this.staminaDown();
                this.monsterAttacks();
            } else {
                alert('Oh no! You\'re out of stamina! Try something else!');
            }
        },

        charge: function(){
            if(this.stamina >= 6){
                alert('Your stamina is maxed!');
            } else {
                this.stamina++;
                this.turns.unshift({
                    isPlayer: true,
                    text: 'Player charged his energy!'
                });
                this.staminaDown();
                this.monsterAttacks();
            }
        },  

        heal: function(){
            if(this.senzus > 0){
                if (this.playerHealth <= 90){
                    this.playerHealth += 10;
                } else {
                    this.playerHealth = 100;
                }
                this.turns.unshift({
                    isPlayer: true,
                    text: 'Player heals for +10 and uses a Senzu Bean'
                });
                this.monsterAttacks();
                this.senzus--;
            } else {
                alert('Oh no! You\'re out of Senzu beans! Try an attack!');
            }
            
        },

        giveUp: function(){
            if(confirm('Are you sure you want to give up?')){
                this.gameIsRunning= false;
            }
        },

        monsterAttacks: function(){
            var damage = this.calculateDamage(5, 12);
            this.playerHealth -= damage;
            this.turns.unshift({
                isPlayer: false,
                text: 'Monster hits Player for ' + damage
            });
            this.checkWin();
        },

        superSaiyan: function(){
            if(this.stamina > 1){
                this.isSuperSaiyan = true;
                this.turns.unshift({
                    isPlayer: true,
                    text: 'Player has gone Super!'
                });
                audio.play();
            } else {
                alert('You need at least 2 stamina to go Super Saiyan!');
            }
            this.monsterAttacks();
        },

        calculateDamage: function(min, max){
            return Math.max(Math.floor(Math.random() * max) + 1, min);
        },

        staminaDown: function(){
            if(this.isSuperSaiyan && this.stamina > 2){
                this.stamina = this.stamina - 2;
            } else if (this.isSuperSaiyan && this.stamina <= 2){
                this.isSuperSaiyan = false;
                alert('You\'re no longer a superSiayan!');
                audio.pause();
            }
        },

        checkWin: function(){
            if (this.monsterHealth <= 0){
                if (confirm('You won! New Game?')){
                    this.startGame();
                } else {
                    this.gameIsRunning = false;
                }
                return true;
            }
            else if (this.playerHealth <= 0){
                if (confirm('You lost! New Game?')){
                    this.startGame();
                } else {
                    this.gameIsRunning = false;
                }
                return true;
            }
        return false;
        }
    }
});