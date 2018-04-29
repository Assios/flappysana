var play = {
    create: function() {
        this.spin_direction = 500;
        this.background_type = Math.floor((Math.random() * 2) + 1);
        console.log(this.background_type);

        if (this.background_type == 1) {
            this.offset = 1600;
            this.sky = game.add.sprite(0, 0, 'sky');
            this.skymirror = game.add.sprite(1600, 0, 'sky');
            this.sky.scale.y = 2;
            this.skymirror.scale.y = 2
        } else {
            this.offset = 1920;
            this.sky = game.add.sprite(0, 0, 'sky2');
            this.skymirror = game.add.sprite(1920, 0, 'sky2');
            this.sky.scale.y = 1.1
            this.skymirror.scale.y = 1.1
        }


        //this.nisse = this.game.add.audio('nisse');
        //this.nisse.volume = 1.5;
        //this.nisse.play()
        this.space = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

        this.yousef2 = game.add.group();
        this.yousef2.createMultiple(5, 'yousef2');
        this.yousef2.setAll('checkWorldBounds', true);
        this.yousef2.setAll('outOfBoundsKill', true);
        this.yousef2.enableBody = true;
        this.yousef2.scale.setTo(1, 1);
        this.yousef = game.add.group();
        this.yousef.createMultiple(5, 'yousef');
        this.yousef.setAll('checkWorldBounds', true);
        this.yousef.setAll('outOfBoundsKill', true);
        this.yousef.enableBody = true;
        this.yousef.scale.setTo(1, 1);
        game.physics.startSystem(Phaser.Physics.ARCADE);

        this.player = this.game.add.sprite(W / 2, H / 2 - 100, 'sana');

        this.player.scale.setTo(2.3, 2.3);
        this.player.animations.add('jump1', [1, 0], 4, false);
        this.player.animations.add("start", [0], 1, false);
        game.physics.arcade.enable(this.player);
        game.physics.arcade.enable(this.yousef2);
        game.physics.arcade.enable(this.yousef);
        this.player.anchor.setTo(0.5, 0.5);
        this.score = 0;

        if (SOUND) {
            this.dick = this.game.add.audio("dick");
            this.dick.volume = 0.2;
        }

        this.player.animations.play("start");        

        this.scoretext = this.game.add.text(230, 20, "POENG: 0", {
            font: "35px Helvetica",
            fill: "#E4DF01",
            align: "center"
        });

        this.besttext = this.game.add.text(210, 80, "REKORD: " + BEST, {
            font: "35px Helvetica",
            fill: "#E4DF01",
            align: "center"
        });
        this.scoretext.fontWeight = "bold";
        this.scoretext.font = "Helvetica";
        this.besttext.fontWeight = "bold";
        this.besttext.font = "Helvetica"

        this.player.body.setSize(32, 80, 25, 25);
        this.player.body.gravity.y = 1600;
        this.timer = this.game.time.events.loop(1800, this.add_p, this);
        this.game.time.events.loop(1800, this.updateScore, this);

        this.backgroundSpeed = 0.4;
    },
    update: function() {
        if(!this.dick.isPlaying ){    this.dick.play();  }
        this.player.angle += this.spin_direction/500;
        game.input.onDown.add(this.jump, this);
        this.space.onDown.add(this.jump, this);
        if (this.player.inWorld == false) this.restart();
        game.physics.arcade.collide(this.player, this.yousef2, 0, this.restart, this);
        game.physics.arcade.collide(this.player, this.yousef, 0, this.restart, this);

      if (this.sky.x < -this.offset) {
        this.sky.x = this.offset;
        this.sky.x -= this.backgroundSpeed;
      } else {}
        this.sky.x -= this.backgroundSpeed;

      if (this.skymirror.x < -this.offset) {
        this.skymirror.x = this.offset;
        this.skymirror.x -= this.backgroundSpeed;
      } else {}
        this.skymirror.x -= this.backgroundSpeed;

    },
    render: function() {
        game.debug.body(this.yousef2)
    },


    getRandomInt: function(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    },

    jump: function() {
        this.random_time = this.getRandomInt(300, 800);
        this.spin_direction = Math.random() < 0.5 ? -500 : 500;
        //var change_expression = Math.floor(Math.random() * 20);

        this.backgroundSpeed += 0.03;

        if (!this.score%50==0 || this.score==0) {
        this.player.animations.stop(null, true);
        this.player.animations.play("jump1");
        }

        if (this.score < 2)
            this.player.body.velocity.y = -1000;
        else
            this.player.body.velocity.y = -600;


        tweenz = this.game.add.tween(this.player);

        if ((this.score > 2 && this.score < 11) || (this.score > 20 && this.score < 41)) {
            tweenz.to({
                angle: -20
            }, 100);
        } else {
                tweenz.to({
                    angle: this.spin_direction
                }, 300);
        }

        tweenz.start();

    },
    restart: function() {
        TOTAL += this.score;

        document.cookie = 'totalcookie='+TOTAL+'; expires=Fri, 1 Aug 2020 20:47:11 UTC; path=/';

        if (this.score >= BEST) {
            BEST = this.score;
            document.cookie = 'bestcookie='+BEST+'; expires=Fri, 1 Aug 2020 20:47:11 UTC; path=/';
        }

        LAST = this.score;

        game.state.start('menu');

    },
    add_p: function() {
        var obstacle = this.yousef2.getFirstDead();
        var obstacle2 = this.yousef.getFirstDead();
        obstacle.body.setSize(169, 581, 50, 90);
        obstacle2.body.setSize(169, 581, 50, 40);
        var random = Math.floor(Math.random() * 400) - 200;
        obstacle.reset(W, -275 + random);
        obstacle2.reset(W, 550 + random);
        obstacle.body.velocity.x = -250;
        obstacle2.body.velocity.x = -250
    },
    updateScore: function() {
        this.score += 1;
        this.scoretext.text = "POENG: " + this.score;
        if (this.score > BEST)
            BEST = this.score;
        this.besttext.text = "REKORD: " + BEST;
    },

}
