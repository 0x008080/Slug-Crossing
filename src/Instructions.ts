import { Scene } from 'phaser';

export class Instructions extends Scene {

    constructor () {
        super('Instructions');
    }

    camera: Phaser.Cameras.Scene2D.Camera;
    background:Phaser.GameObjects.Image;
    ground: Phaser.GameObjects.Image;

    instructions: Phaser.GameObjects.Text;
    menu: Phaser.GameObjects.Text;

    inst_text: string = 'Collect Banana Slugs on your way to class \n\n avoid the ROCKS \n\nby TAPPING (mobile) or CLICKING (desktop) \n\non the screen\n\n';

    bg_x: number = 512;
    bg_y: number = 384;

    create() {
        this.camera = this.cameras.main;
        this.background = this.add.image(this.bg_x, this.bg_y, 'background');
        this.ground = this.add.image(0, 1080, 'ground');

        this.instructions = this.add.text(360, 200, 'Instructions', {
            fontFamily: 'Arial Black', fontSize: 33, color: '#fcff33',
            stroke: '#000000', strokeThickness: 8,
            align: 'center'
        }).setInteractive().setOrigin(0.5);

        this.instructions = this.add.text(360, 500, this.inst_text, {
            fontFamily: 'Arial Black', fontSize: 27, color: '#FFF',
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