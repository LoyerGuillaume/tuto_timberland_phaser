

var GAME_START = false;
var GAME_OVER = false;

const WIDTH = 1080;
const HEIGHT = 1775;

var game = new Phaser.Game(WIDTH, HEIGHT, Phaser.auto, 'timberman');

game.transparent = true;



var gameState ={};
gameState.load = function(){};
gameState.main = function(){};

gameState.load.prototype = {
	preload : function(){
		//Chargement des ressources
		game.load.image("background", "img/background.png");
		game.load.atlas("man","img/man.png","data/man.json");
	},

	create : function() {
		game.state.start("main");
	}
};

gameState.main.prototype = {
	create : function(){
		//Initialisation et intégration des ressources dans le Canvas
		// ...
		//On fait en sorte que le jeu se redimensionne selon la taille de l'écran
		game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
		game.scale.setShowAll();
		window.addEventListener("resize",function(){
			game.scale.refresh();
		});
		game.scale.refresh();

		//Création de l'arrière plan dans le Canvas
		this.background = game.add.sprite(0,0,"background");
		this.background.width = game.width;
		this.background.height = game.height;

		//Bucheron
		this.man = game.add.sprite(0,1070, "man");
		//On ajoute l'animation de la respiration (fait appel au JSON)
		this.man.animations.add("breath",[0,1]);
		//On ajoute l'animation de la coupe 
		this.man.animations.add("cut", [1,2,3,4]);
		//On fait démarrer l'animation avec 3 images par seconde et répétée en boucle
		this.man.animations.play("breath", 3, true);
		//Position du bûcheron
		this.manPosition = "left";
	},

	update : function(){
		// Animations
	}

};

game.state.add("load", gameState.load);
game.state.add("main", gameState.main);

game.state.start("load");
