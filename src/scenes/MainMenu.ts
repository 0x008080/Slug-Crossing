import { Scene, GameObjects } from 'phaser';

export class MainMenu extends Scene {
    camera: Phaser.Cameras.Scene2D.Camera;
    background: GameObjects.Image;
    logo: GameObjects.Image;
    menu: GameObjects.Text;

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
        this.logo = this.add.image(this.x_half, 275, 'logo').setScale(.35, .35).setInteractive();


        this.camera = this.cameras.main;

        
        this.idle_player = this.physics.add.sprite(100, 800, 'idle_player').setScale(1.75).refreshBody();
        this.idle_player.setCollideWorldBounds(true);
        
        this.idle_player.setGravityY(300);

        this.ground = this.physics.add.staticGroup();
        this.ground.create(0, 1080, 'ground');
        this.physics.add.collider(this.idle_player, this.ground);

        this.menu = this.add.text(this.x_half, 460, 'Play', {
            fontFamily: 'Arial Black', fontSize: 38, color: '#ffffff',
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

        this.menu.once('pointerdown', () => {

            this.scene.start('Game');

        });
    }
}
