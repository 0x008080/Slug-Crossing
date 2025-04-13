import { Scene } from 'phaser';

export class Game extends Scene {
    camera: Phaser.Cameras.Scene2D.Camera;
    background: Phaser.GameObjects.TileSprite;

    ground: Phaser.Physics.Arcade.StaticGroup;
    ground_image: Phaser.GameObjects.TileSprite;

    player: Phaser.Physics.Arcade.Sprite;
    mean_slug: Phaser.Physics.Arcade.Sprite;

    slugs: any;
    bushes: any;
    rocks: any;
    birds: any;

    player_speed: number = 0;

    gravity_y: number = 300;

    bg_x: number = 512;
    bg_y: number = 384;
    started: boolean = false;
    y_axis: number = 812;

    txt_instructions_one: string = "TAP screen to \njump and avoid ROCKS";
    txt_instructions_two: string = "Collect as many";
    txt_instructions_three: string = "Banana Slugs";
    txt_instructions_four: string = "as you can";

    text_box_one: any;
    text_box_two: any;
    text_box_three: any;
    text_box_four: any;

    score_hud: any;
    private score: number = 0;

    emitter: any;

    space_bar: any;
    jumping: boolean = false;
    jump_velocity: number = -215;

    recent_time: any;
    
    bushTimeout: any;
    rockTimeout: any;
    birdTimeout: any;
    slugTimeout: any;
    playTimeout: any;
    
    init() {
        this.score = 0;
    }

    constructor() {
        super('Game');
    }

    startGame() {

        this.tweens.add({
            targets: this.player,
            duration: 2000,
            x: '+=160',
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
                    this.score = 0;
                    this.started = true;
                    //this.input.on('pointerdown', this.jump, this);
                }
            })
        }, 3000);
    }


    jump() {
        this.player.play('jumping');

        if (this.player.body?.touching.down) {
            this.player.setVelocityY(this.jump_velocity);
            this.recent_time = this.game.getTime();

        } else if (this.player.body?.touching.down == false && ((this.game.getTime() - this.recent_time) > 500) && this.jumping == false) {
            this.jumping = true;
            this.player.setVelocityY(this.jump_velocity);
        }


        setTimeout(() => {
            this.player.play('running');
        }, 1750);
    }

    collectSlug(player: any, slug: any) {

        this.emitter.emitParticleAt(this.player.x, this.player.y, 5);
        slug.destroy();

        this.updateScore();
    }

    updateScore() {
        this.score += 1;

        this.score_hud.destroy();

        this.score_hud = this.add.text(350, 200, this.score.toString(), {
            fontFamily: 'Arial Black', fontSize: 50, color: '#ffffff',
            stroke: '#000000', strokeThickness: 8,
            align: 'center'
        });
    }

    destroyRock(player: any, rock: any) {
            this.player.anims.play('rolling');

            this.player_speed = 0;
            this.player.x -= 100;
            this.player.setVelocityX(this.player_speed);

            setTimeout(() => {
               this.playTimeout = this.player.anims.play('running');
            }, 1100);

        rock.destroy();
    }

    spawnSlugs() {
        const slug = this.slugs.create(1000, this.y_axis, 'slug');
        slug.setGravityY(this.gravity_y).setGravityX(-20);
        slug.anims.play('slugwalk');
        this.physics.add.overlap(this.player, slug, this.collectSlug.bind(this), undefined, this);

       this.slugTimeout = setTimeout(() => {
            this.spawnSlugs();
        }, Phaser.Math.Between(3000, 12000));
    }

    spawnBushes() {
        const num: number = Phaser.Math.Between(1, 2);

        const bush = this.bushes.create(1000, this.y_axis, `bush_${num.toString()}`);
        bush.setGravityY(this.gravity_y).setGravityX(-10);
        bush.setDepth(0);

        this.bushTimeout = setTimeout(() => {
            this.spawnBushes();
        }, Phaser.Math.Between(3000, 20000));
    }

    spawnBirds() {

    }

    spawnRocks() {
        const num: number = Phaser.Math.Between(1, 2);
        const rock = this.rocks.create(1000, this.y_axis, `rock_${num.toString()}`)
        rock.setGravityY(this.gravity_y).setGravityX(-30).setScale(0.023);
        this.physics.add.overlap(this.player, rock, this.destroyRock.bind(this), undefined, this);

        this.rockTimeout = setTimeout(() => {
            this.spawnRocks();
        }, Phaser.Math.Between(1000, 5500));
    }

    endGame() {
        this.slugs.destroy();
        this.rocks.destroy();
        this.bushes.destroy();

        clearTimeout(this.bushTimeout);
        clearTimeout(this.slugTimeout);
        clearTimeout(this.rockTimeout);
        clearTimeout(this.playTimeout);

        this.scene.start('GameOver', { score: this.score});
    }

    create() {
        this.camera = this.cameras.main;
        this.background = this.add.tileSprite(this.bg_x, this.bg_y, 0, 0, 'background').setInteractive();

        this.player = this.physics.add.sprite(100, this.y_axis - 20, 'player').setScale(2).refreshBody();
        this.player.setCollideWorldBounds(true);
        this.player.setGravityY(this.gravity_y);
        this.player.setDepth(1);
        this.player.body?.setSize(20, 42);
        this.player.body?.setOffset(10, 5);

        this.emitter = this.add.particles(0, 0, 'star', {
            speed: 200,
            scale: { start: 1, end: 0 },
            blendMode: 'ADD',
            frequency: -1
        });

        this.ground = this.physics.add.staticGroup();
        this.ground.create(0, 1080, 'ground');
        this.physics.add.collider(this.player, this.ground);

        this.ground_image = this.add.tileSprite(0, 1080, 0, 0, 'ground').setInteractive();

        this.mean_slug = this.physics.add.sprite(-100, this.y_axis + 5, 'mean_slug').setScale(1.25).refreshBody().setDepth(1);
        this.physics.add.collider(this.player, this.mean_slug);
        this.input.on('pointerdown', this.jump, this);

        // Go Slugs
        this.slugs = this.physics.add.group();
        this.physics.add.collider(this.slugs, this.ground);

        // Bushes
        this.bushes = this.physics.add.group();
        this.physics.add.collider(this.bushes, this.ground);

        // Rocks
        this.rocks = this.physics.add.group();
        this.physics.add.collider(this.rocks, this.ground);

        // Bird
        this.birds = this.physics.add.group();
        this.physics.add.collider(this.birds, this.ground);


        this.score_hud = this.add.text(350, 200, this.score.toString(), {
            fontFamily: 'Arial Black', fontSize: 50, color: '#ffffff',
            stroke: '#000000', strokeThickness: 8,
            align: 'center'
        });

        // On Game Start
        this.player.play('running');
        this.displayText();

        // Testing
        //this.started = true;
        //setTimeout(() => { this.startGame() }, 1000);

        // Prod
        setTimeout(() => { this.startGame() }, 6000);
        this.spawnSlugs();
        this.spawnBushes();
        this.spawnRocks();
    }

    update() {

        this.background.tilePositionX += 0.25;
        this.ground_image.tilePositionX += 0.5;

        if (this.player.body?.touching.down) {
            this.jumping = false;
        }

        if(this.physics.overlap(this.player, this.mean_slug) == true) {
            this.endGame();
        }

        if(this.player.x < 320) {
            this.player.setVelocityX(this.player_speed);
            this.player_speed += 0.03;
        } else {
            this.player_speed = 0;
            this.player.setVelocityX(this.player_speed);
        }
    }
}
