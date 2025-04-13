import { Scene, GameObjects } from 'phaser';

export class MainMenu extends Scene {
    camera: Phaser.Cameras.Scene2D.Camera;
    background: GameObjects.Image;
    logo: GameObjects.Image;
    play: GameObjects.Text;
    credits: GameObjects.Text;
    instructions: GameObjects;

    ground: Phaser.Physics.Arcade.StaticGroup;
    idle_player: Phaser.Physics.Arcade.Sprite;

    bg_x: number = 512;
    bg_y: number = 384;
    x_half: number = 360;
    y_half: number = 640;

    constructor() {
        super('MainMenu');
    }

    create() {
        this.camera = this.cameras.main;

        this.background = this.add.image(this.bg_x, this.bg_y, 'background');
        this.logo = this.add.image(this.x_half, 275, 'logo').setScale(.35, .35).setInteractive().setOrigin(0.5);


        this.idle_player = this.physics.add.sprite(100, 800, 'idle_player').setScale(1.75).refreshBody();
        this.idle_player.setCollideWorldBounds(true);

        this.idle_player.setGravityY(300);

        this.ground = this.physics.add.staticGroup();
        this.ground.create(0, 1080, 'ground');
        this.physics.add.collider(this.idle_player, this.ground);

        this.play = this.add.text(this.x_half, 550, 'Play', {
            fontFamily: 'Arial Black', fontSize: 33, color: '#fcff33',
            stroke: '#000000', strokeThickness: 8,
            align: 'center'
        }).setOrigin(0.5).setInteractive();

        this.credits = this.add.text(this.x_half, 600, 'Credits', {
            fontFamily: 'Arial Black', fontSize: 33, color: '#fcff33',
            stroke: '#000000', strokeThickness: 8,
            align: 'center'
        }).setOrigin(0.5).setInteractive();

        this.instructions = this.add.text(this.x_half, 650, 'Instructions', {
            fontFamily: 'Arial Black', fontSize: 33, color: '#fcff33',
            stroke: '#000000', strokeThickness: 8,
            align: 'center'
        }).setOrigin(0.5).setInteractive();

        this.tweens.add({
            targets: this.logo,
            yoyo: true,
            duration: 2000,
            ease: 'bounce',
            y: '+=50',
            repeat: -1

        })

        this.play.on('pointerover', () => {
            this.play.setStyle({ fill: ' #6d7fe9' });
        })

        this.play.on('pointerout', () => {
            this.play.setStyle({ fill: '#fcff33' });
        })

        this.credits.on('pointerover', () => {
            this.credits.setStyle({ fill: '#6d7fe9' });
        })

        this.credits.on('pointerout', () => {
            this.credits.setStyle({ fill: '#fcff33' });
        })

        this.instructions.on('pointerover', () => {
            this.instructions.setStyle({ fill: '#6d7fe9' });
        })

        this.instructions.on('pointerout', () => {
            this.instructions.setStyle({ fill: '#fcff33' });
        })

        this.play.once('pointerdown', () => {
            this.scene.start('Game');

        });

        this.credits.once('pointerdown', () => {
            this.scene.start('Credits');

        });

        this.instructions.once('pointerdown', () => {
            this.scene.start('Instructions');
        })
    }
}
