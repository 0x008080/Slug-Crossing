import { Scene, GameObjects } from 'phaser';

export class MainMenu extends Scene {
    camera: Phaser.Cameras.Scene2D.Camera;
    background: GameObjects.Image;
    logo: GameObjects.Image;
    menu: GameObjects.Text;

    constructor() {
        super('MainMenu');
    }

    create() {
        this.camera = this.cameras.main

        this.background = this.add.image(512, 384, 'background');
        this.logo = this.add.image(512, 250, 'logo').setScale(.35, .35).setInteractive();

        this.menu = this.add.text(512, 460, 'Play', {
            fontFamily: 'Arial Black', fontSize: 38, color: '#ffffff',
            stroke: '#000000', strokeThickness: 8,
            align: 'center'
        }).setOrigin(0.5).setInteractive();

        this.menu.once('pointerdown', () => {

            this.scene.start('Game');

        });
    }
}
