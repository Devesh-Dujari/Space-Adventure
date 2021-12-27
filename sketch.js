var rocket, rocketImg;
var space, spaceImg;
var earth, earthImg;
var comet, cometImg1, cometImg2, cometImg3, cometImg4, cometGroup;
var weapon, weaponImg, weaponGroup;

var weaponCount = 50;
var score = 0, highScore = 0;
var frameNumber = 50;
var rocketMovingSpeed = 10;

var gameState = "PLAY";

function preload()
{
    rocketImg = loadImage("images/rocket.png");
    spaceImg = loadImage("images/space.jpg");
    earthImg = loadImage("images/earth.png");
    cometImg1 = loadImage("images/comet1.png");
    cometImg2 = loadImage("images/comet2.png");
    cometImg3 = loadImage("images/comet3.png");
    cometImg4 = loadImage("images/comet4.png");
    weaponImg = loadImage("images/fireball.png");
}

function setup()
{
    createCanvas(900, 500);

    space = createSprite(600, 250, 10, 10);
    space.addImage(spaceImg);
    space.scale = 2;
    space.velocityX = -5;

    rocket = createSprite(250, 250, 10, 10);
    rocket.addImage(rocketImg);
    rocket.scale = 0.3

    earth = createSprite(-150, 250, 10, 10);
    earth.addImage(earthImg);
    earth.scale = 1.18;
    earth.rotationSpeed = 0.2;

    cometGroup = new Group();
    weaponGroup = new Group();
}

function draw()
{
    background(0);

    if(gameState === "PLAY")
    {
        rocket.visible = true;
        earth.visible = true;

            if(space.x <250)
        {
            space.x = 600;
        }

        if(keyDown("up_arrow"))
        {   
            rocket.y -=rocketMovingSpeed;
        }

        if(keyDown("down_arrow"))
        {   
            rocket.y +=rocketMovingSpeed;
        }

        if(rocket.y > 530)
        {
            rocket.y = -30;
        }

        if(rocket.y < -30)
        {
            rocket.y = 530;
        }

        if(keyWentDown("space") && weaponCount > 0)
        {
            shootWeapons();
            weaponCount -= 1;
        }

        if(keyWentUp("space") && weaponCount < 50)
        {
            weaponCount += 1;
        }

        if(cometGroup.isTouching(weaponGroup))
        {
            cometGroup.get(0).destroy();
            weaponGroup.get(0).destroy();
            //weaponGroup.destroyEach();
            score += 1;
        }

        if(score > 50)
        {
            frameNumber = 35;
            rocketMovingSpeed = 13;
        }
        
        if(score > 200)
        {
            frameNumber = 27;
            rocketMovingSpeed = 15;
        }

        if(score > 350)
        {
            frameNumber = 25;
            rocketMovingSpeed = 17;
        }

        if(score > 600)
        {
            frameNumber = 20;
            rocketMovingSpeed = 20;
        }

        if(score > 900)
        {
            frameNumber = 15;
            rocketMovingSpeed = 25;
        }

        if(score > highScore)
        {
        highScore = score;
        }

        if(cometGroup.isTouching(rocket) || cometGroup.isTouching(earth))
        {
            gameState = "END";
        }

        spawnComets();
    }

    if(gameState === "END")
    {
        rocket.visible = false;
        earth.visible = false;

        rocket.x = 250;
        rocket.y = 250;

        cometGroup.destroyEach();

        fill(255);
        textFont("Comic Sans")
        textSize(50);
        text("GAME OVER", 300, 200);
        textSize(30);
        text("Press 'R' to Restart", 350, 300);

        if(keyDown("r"))
        {
            gameState = "PLAY";
            score = 0;
        }

    }

    drawSprites();

    fill(255);
    textFont("Comic Sans")
    textSize(20);
    text("Score: " + score, 100, 50);
    text("High Score: " + highScore, 300, 50);
}

function spawnComets()
{
    if(frameCount % frameNumber === 0)
    {
        comet = createSprite(950, 250, 10, 10);
        //comet.addImage(cometImg);
        comet.velocityX = -7;
        comet.scale = 0.5;

        var rand = Math.round(random(0, 3));
        switch(rand)
        {
            case 1: comet.addImage(cometImg1);
                    comet.scale = random(0.05, 0.1);
                break;
            case 2: comet.addImage(cometImg2);
                    comet.scale = random(0.08, 0.35);
                break;
            case 3: comet.addImage(cometImg3);
                    comet.scale = random(0.65, 0.3);
                break;
            default: comet.addImage(cometImg4);
                     comet.scale = random(0.35, 0.15);
                break;
        }

        comet.y = Math.round(random(-20, 520));

        comet.depth = rocket.depth;
        rocket.depth = comet.depth + 1;
        earth.depth = rocket.depth;

        cometGroup.add(comet);
    }
}

function shootWeapons()
{
    weapon = createSprite(335, 10, 10, 10);
    weapon.addImage(weaponImg);
    weapon.y = rocket.y;
    weapon.scale = 0.05;
    weapon.velocityX = 10;
    weapon.lifetime = 100;
    //weapon.debug = true;

    weaponGroup.add(weapon);
}