import { Scene } from 'phaser';

export class Preloader extends Scene
{

    config: any;

    constructor ()
    {
        super('Preloader');
    }

    init ()
    {
        //  We loaded this image in our Boot Scene, so we can display it here
        this.add.image(512, 384, 'background');

        //  A simple progress bar. This is the outline of the bar.
        this.add.rectangle(512, 384, 468, 32).setStrokeStyle(1, 0xffffff);

        //  This is the progress bar itself. It will increase in size from the left based on the % of progress.
        const bar = this.add.rectangle(512-230, 384, 4, 28, 0xffffff);

        //  Use the 'progress' event emitted by the LoaderPlugin to update the loading bar
        this.load.on('progress', (progress: number) => {

            //  Update the progress bar (our bar is 464px wide, so 100% = 464px)
            bar.width = 4 + (460 * progress);

        });
    }

    preload ()
    
    {
        // Set Path
        this.load.setPath('assets');

        // Load Atlas
        this.load.atlas('player', 'player/playersheet.png', 'JSON/player.json');
        this.load.atlas('slug', 'slug.png', 'JSON/slug.json');
        this.load.atlas('mean_slug', 'mean_slug.png', 'JSON/mean_slug.json')

        // Load Images

        this.load.image('logo', 'slug-crossing.png');
        this.load.image('ground', 'ground.png');
        this.load.image('idle_player', 'player/player.png');
        //this.load.json('theconfig', 'JSON/config.json')
        
    }

    create ()
    {
        //this.config = this.cache.json.get('theconfig');
        
        // Player Animations     
        this.anims.create({
            key: 'running',
            frames: this.anims.generateFrameNames('player', {
                prefix: 'run', start: 1, end: 6
            }), 
            frameRate: 10,
            repeat: -1,
        });


        this.anims.create({
            key: 'jumping',
            frames: this.anims.generateFrameNames('player', {
                prefix: 'jump', start: 1, end: 6
            }), 
            frameRate: 10,
            repeat: -1,
        });


        this.anims.create({
            key: 'rolling',
            frames: this.anims.generateFrameNames('player', {
                prefix: 'roll', start: 1, end: 6
            }), 
            frameRate: 10,
            repeat: -1,
        }); 

        // Slug Animation
        this.anims.create({
            key: 'slugwalk',
            frames: this.anims.generateFrameNames('slug', {
                prefix: 'slug', start: 1, end: 4
            }), 
            frameRate: 10,
            repeat: -1,
        });

        // Mean Slug Animation
        this.anims.create({
            key: 'meanslugrunning',
            frames: this.anims.generateFrameNames('mean_slug', {
                prefix: 'meanslug_', start: 1, end: 3
            }), 
            frameRate: 10,
            repeat: -1,
        });


        //this.scene.start('MainMenu');
        this.scene.start('Game');
    }
}
