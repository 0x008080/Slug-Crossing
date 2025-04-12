import { Scene } from 'phaser';

export class Game extends Scene
{
    camera: Phaser.Cameras.Scene2D.Camera;
    background: Phaser.GameObjects.TileSprite;

    ground: Phaser.Physics.Arcade.StaticGroup;
    player: Phaser.Physics.Arcade.Sprite;
    msg_text : Phaser.GameObjects.Text;

    theground: any;

    bg_x: number = 512;
    bg_y: number = 384;

    started: boolean = false;

    constructor ()
    {
        super('Game');
    }

    create ()
    {
        this.camera = this.cameras.main;
        this.background = this.add.tileSprite(this.bg_x, this.bg_y, 0, 0, 'background').setInteractive();
        //this.background.setAlpha(0.5)
        
        this.player = this.physics.add.sprite(100, 812, 'player').setScale(1.75).refreshBody();
        this.player.setCollideWorldBounds(true);
        this.player.setGravityY(300);

        this.ground = this.physics.add.staticGroup();
        this.ground.create(0, 1080, 'ground');
        this.physics.add.collider(this.player, this.ground);
        
        this.player.play('running');

        this.tweens.add({
            targets: this.player,
            duration: 2000,
            x: '+=230',
        });
        

    }

    update() {
       this.background.tilePositionX += 0.25;
    }
}
