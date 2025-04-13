import { Scene } from 'phaser';
import GLOBAL_SCORE from './Game';
import { MainMenu } from './MainMenu';

export class GameOver extends Scene
{
    camera: Phaser.Cameras.Scene2D.Camera;
    background: Phaser.GameObjects.Image;
    ground: Phaser.GameObjects.Image;

    menu_text: Phaser.GameObjects.Text;
    gameover_text: Phaser.GameObjects.Text;
    score_text: Phaser.GameObjects.Text;

    bg_x: number = 512;
    bg_y: number = 384;
    constructor ()
    {
        super('GameOver');
    }

    create ()
    {
 
        this.camera = this.cameras.main;
        this.background = this.add.image(this.bg_x, this.bg_y, 'background');

        this.ground = this.add.image(0, 1080, 'ground');

        this.gameover_text = this.add.text(360, 384, 'Game Over', {
            fontFamily: 'Arial Black', fontSize: 64, color: '#ffffff',
            stroke: '#000000', strokeThickness: 8,
            align: 'center'
        });

        this.gameover_text.setOrigin(0.5);

        this.score_text = this.add.text(360, 484, `Final Score ${GLOBAL_SCORE}`, {
            fontFamily: 'Arial Black', fontSize: 48, color: '#ffffff',
            stroke: '#000000', strokeThickness: 8,
            align: 'center'
        });

        this.score_text.setOrigin(0.5);

        this.menu_text = this.add.text(360, 700, 'Main Menu', {
            fontFamily: 'Arial Black', fontSize: 38, color: '#ffffff',
            stroke: '#000000', strokeThickness: 8,
            align: 'center'
        }).setOrigin(0.5).setInteractive();

        this.menu_text.once('pointerdown', () => {
            this.scene.start('MainMenu');
        })
    }
}
