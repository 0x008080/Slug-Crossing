import { Scene } from 'phaser';

export class Game extends Scene {
    camera: Phaser.Cameras.Scene2D.Camera;
    background: Phaser.GameObjects.TileSprite;

    ground: Phaser.Physics.Arcade.StaticGroup;
    player: Phaser.Physics.Arcade.Sprite;
    mean_slug: Phaser.Physics.Arcade.Sprite;

    gravity_y: number = 300;

    bg_x: number = 512;
    bg_y: number = 384;
    started: boolean = false;
    y_axis: number = 812;

    txt_instructions_one: string = "TAP screen to \njump and avoid obstacles";
    txt_instructions_two: string = "Collect as many";
    txt_instructions_three: string = "Banana Slugs";
    txt_instructions_four: string = "as you can";

    text_box_one: any;
    text_box_two: any;
    text_box_three: any;
    text_box_four: any;

    score_hud: any;
    score: number = 0;

    space_bar: any;
    jumping: boolean = false;
    jump_velocity: number = -300;

    recent_time: any;

    constructor() {
        super('Game');
    }

    startGame() {

        this.tweens.add({
            targets: this.player,
            duration: 2000,
            x: '+=220',
        });

        this.tweens.add({
            targets: this.mean_slug,
            duration: 2000,
            x: '+=200',
        });

        this.mean_slug.play('meanslugrunning');
    }

    displayText() {

        this.text_box_one = this.add.text(200, 400, this.txt_instructions_one, {
            fontFamily: 'Arial Black', fontSize: 30, color: '#ffffff',
            stroke: '#000000', strokeThickness: 8,
            align: 'center'
        });

        this.tweens.add({
            targets: this.text_box_one,
            duration: 2900,
            y: '+=50',
            onComplete: () => { this.text_box_one.destroy() }
        })


        setTimeout(() => {
            this.text_box_two = this.add.text(240, 400, this.txt_instructions_two, {
                fontFamily: 'Arial Black', fontSize: 30, color: '#ffffff',
                stroke: '#000000', strokeThickness: 8,
                align: 'center'
            });

            this.text_box_three = this.add.text(260, 440, this.txt_instructions_three, {
                fontFamily: 'Arial Black', fontSize: 30, color: '#fcff33',
                stroke: '#000000', strokeThickness: 8,
                align: 'center'
            });

            this.text_box_four = this.add.text(280, 480, this.txt_instructions_four, {
                fontFamily: 'Arial Black', fontSize: 30, color: '#ffffff',
                stroke: '#000000', strokeThickness: 8,
                align: 'center'
            });

            this.tweens.add({
                targets: [this.text_box_two, this.text_box_three, this.text_box_four],
                duration: 3000,
                y: '+=50',
                onComplete: () => {
                    this.text_box_two.destroy();
                    this.text_box_three.destroy();
                    this.text_box_four.destroy();
                    this.score_hud.setVisible(true);
                    //this.input.on('pointerdown', this.jump, this);
                }
            })
        }, 3000);
    }

    updateScore() {
        this.score += 1;

        this.score_hud = this.add.text(350, 200, this.score.toString(), {
            fontFamily: 'Arial Black', fontSize: 50, color: '#ffffff',
            stroke: '#000000', strokeThickness: 8,
            align: 'center'
        });
    }

    jump() {
        this.player.play('jumping');

        if(this.player.body?.touching.down) {
            this.player.setVelocityY(this.jump_velocity);
            this.recent_time = this.game.getTime();

        } else if (this.player.body?.touching.down == false && ((this.game.getTime() - this.recent_time) > 500) && this.jumping) {
            this.jumping = false;
            this.player.setVelocityY(this.jump_velocity);
        }


        setTimeout(() => {
            this.player.play('running');
        }, 1500);
    }

    spawnSlugs() {

    }

    spawnBushes() {

    }

    spawnBirds() {

    }

    create() {
        this.camera = this.cameras.main;
        this.background = this.add.tileSprite(this.bg_x, this.bg_y, 0, 0, 'background').setInteractive();

        this.player = this.physics.add.sprite(100, this.y_axis, 'player').setScale(1.75).refreshBody();
        this.player.setCollideWorldBounds(true);
        this.player.setGravityY(this.gravity_y);
        

        this.ground = this.physics.add.staticGroup();
        this.ground.create(0, 1080, 'ground');
        this.physics.add.collider(this.player, this.ground);

        this.mean_slug = this.physics.add.sprite(-100, this.y_axis, 'mean_slug').setScale(1.25).refreshBody();
        this.input.on('pointerdown', this.jump, this);

        this.score_hud = this.add.text(350, 200, this.score.toString(), {
            fontFamily: 'Arial Black', fontSize: 50, color: '#ffffff',
            stroke: '#000000', strokeThickness: 8,
            align: 'center'
        }).setVisible(false);

        // On Game Start
        this.player.play('running');
        console.log(this.player.body?.touching.down);
        //this.displayText();
        
        // Testing
        setTimeout(() => { this.startGame() }, 1000);
        // Prod
        //setTimeout(() => { this.startGame() }, 6000);
    }

    update() {
        this.background.tilePositionX += 0.25;
        
        
    }
}
