var load = {
	preload: function() {
        this.input.maxPointers = 1;
        this.stage.disableVisibilityChange = false;
        this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        this.scale.minWidth = 260;
        this.scale.minHeight = 480;
        this.scale.maxWidth = 640;
        this.scale.maxHeight = 1136;
        this.scale.pageAlignHorizontally = true;
        this.scale.pageAlignVertically = true;
        //this.scale.refresh(true);

        game.stage.backgroundColor = '#ff0000';

        this.loadingtext = game.add.text(135, 200, "LASTER...", { font: "80px Arial", fill: "#E4DF01", align: "center" });

        this.loadingtext.fontWeight = "bold";
        this.loadingtext.font = "Helvetica";
        this.loadingtext.fontSize = "80px";

        game.load.image('sky', 'assets/oslo.png');
        game.load.image('sky2', 'assets/bg2.png');

        game.load.image('yousef', 'assets/yousef.png');
        game.load.image('yousef2', 'assets/yousef2.png');

        game.load.image('menu', 'assets/flappysana.jpg');
        game.load.spritesheet('sana', 'assets/spritesheet2.png', 72, 64);

        game.load.audio("dick", "assets/fyfaen.mp3");
	},

	create: function() {
        this.input.maxPointers = 1;
        this.stage.disableVisibilityChange = false;

        this.game.scale.scaleMode = Phaser.ScaleManager.EXACT_FIT;
        this.scale.minWidth = 260;
        this.scale.minHeight = 480;
        this.scale.maxWidth = 640;
        this.scale.maxHeight = 1136;
        this.scale.pageAlignHorizontally = true;
        this.scale.pageAlignVertically = true;
        //this.scale.refresh(true);

        this.game.state.start('menu');
	}
}
