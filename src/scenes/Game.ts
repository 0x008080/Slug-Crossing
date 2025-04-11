import { Scene } from 'phaser';

export class Game extends Scene
{
    camera: Phaser.Cameras.Scene2D.Camera;
    background: Phaser.GameObjects.Image;
    msg_text : Phaser.GameObjects.Text;

    constructor ()
    {
        super('Game');
    }

    create ()
    {
        this.camera = this.cameras.main;
        this.background = this.add.image(512, 384, 'background');
        this.background.setAlpha(0.5)
        
        this.msg_text = this.add.text(512, 100, 'test');
    }
}
