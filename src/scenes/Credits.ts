import { Scene } from 'phaser';

export class Credits extends Scene {

    constructor () {
        super('Credits');
    }

    camera: Phaser.Cameras.Scene2D.Camera;
    background:Phaser.GameObjects.Image;
    ground: Phaser.GameObjects.Image;

    credits: Phaser.GameObjects.Text;
    menu: Phaser.GameObjects.Text;

    credits_text: string = 'Gameplay Programming\n Christian Perez\n\n Art Design\n Kayla Garcia\n\n Sound Design\n Jalen Suwa';

    bg_x: number = 512;
    bg_y: number = 384;

    create() {
        this.camera = this.cameras.main;
        this.background = this.add.image(this.bg_x, this.bg_y, 'background');
        this.ground = this.add.image(0, 1080, 'ground');

        this.credits = this.add.text(360, 200, 'Credits', {
            fontFamily: 'Arial Black', fontSize: 33, color: '#fcff33',
            stroke: '#000000', strokeThickness: 8,
            align: 'center'
        }).setInteractive().setOrigin(0.5);

        this.credits = this.add.text(360, 500, this.credits_text, {
            fontFamily: 'Arial Black', fontSize: 25, color: '#FFF',
            stroke: '#000000', strokeThickness: 8,
            align: 'center'
        }).setInteractive().setOrigin(0.5);

        this.menu = this.add.text(360, 800, 'Main Menu', {
            fontFamily: 'Arial Black', fontSize: 33, color: '#fcff33',
            stroke: '#000000', strokeThickness: 8,
            align: 'center'
        }).setInteractive().setOrigin();

        this.menu.on('pointerover', () => {
            this.menu.setStyle({ fill: ' #6d7fe9' }); 
        })

        this.menu.on('pointerout', () => {
            this.menu.setStyle({ fill: '#fcff33' }); 
        })

        this.menu.once('pointerdown', () => {
            this.scene.start('MainMenu')
        })
    }

}