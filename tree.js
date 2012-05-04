//========================================
//
//    scene
//
var ctx, canvasWidth, canvasHeight;

function drawScene (canvas) {
    ctx = canvas.getContext("2d");
    extendCanvasContext(ctx);

    canvasWidth = parseInt(canvas.getAttribute("width"));
    canvasHeight = parseInt(canvas.getAttribute("height"));

    drawSky();
    drawMountains();
    drawTree();
}


//---------------------------------------
//
//    sky
//

function drawSky () {
    ctx.save();

    var gradient = ctx.createLinearGradient(0,0,0,canvasHeight);
    gradient.addColorStop(0, "#b4e0fe");
    gradient.addColorStop(1, "#d3f8ff");

    ctx.fillStyle = gradient;

    ctx.fillRect(0,0,canvasWidth,canvasHeight);

    ctx.restore();    
}


//---------------------------------------
//
// mountains
//

function drawMountains () {
    resetRandom();

    drawMountain(130, "#8bb2bb");
    drawMountain(50, "#618087");
}

function drawMountain (offset, fillStyle) {
    var x = 0;
    var y = canvasHeight - offset;


    ctx.beginPath();
    ctx.moveTo(x, y);

    while (x >=0 && x < canvasWidth) {
        x += random(2,10);
        y += random(-4,3);
				ctx.lineTo(x, y);
    }

	ctx.lineTo(canvasWidth, canvasHeight);
	ctx.lineTo(0, canvasHeight);
    ctx.closePath();

    ctx.fillStyle = fillStyle;
	ctx.fill();
}


//---------------------------------------
//
//    tree
//

function drawTree () {
    var blossomPoints = [];

    resetRandom();
    drawBranches(0, -Math.PI/2, canvasWidth/2, canvasHeight, 30, blossomPoints);

    resetRandom();
    drawBlossoms(blossomPoints);
}

function drawBranches (i,angle,x,y,width,blossomPoints) {
    ctx.save();

    var length = tween(i, 1, 62, 12, 3) * random(0.7, 1.3);
    if(i == 0) { length = 98; }

    ctx.translate(x,y);
    ctx.rotate(angle);
    ctx.fillStyle = "#000";
    ctx.fillRect(0, -width/2, length, width);

    ctx.restore();

    var tipX = Math.floor(x + (length - width/2) * Math.cos(angle)); 
    var tipY = Math.floor(y + (length - width/2) * Math.sin(angle)); 

    if (i > 5) {
        blossomPoints.push([x,y,tipX,tipY]);
    }

    if (i < 6) {
         drawBranches(i + 1, angle + random(-0.15, -0.05) * Math.PI/*?*/,tipX,tipY,width*.65,blossomPoints);
         drawBranches(i + 1, angle + random( 0.15,  0.05) * Math.PI/*?*/,tipX,tipY,width*.65,blossomPoints);
    }
    else if (i < 9) {
         drawBranches(i + 1, angle + random( 0.15,  0.05) * Math.PI/*?*/,tipX,tipY,width*.6,blossomPoints);
    }
}

function drawBlossoms (blossomPoints) {
    var colors = ["#f5ceea", "#e8d9e4", "#f7c9f3", "#ebb4cc", "#cccccc"];//?
    ctx.globalAlpha = 0.60;

    for (var i = 0; i < blossomPoints.length; i++) {
        var p = blossomPoints[i];
        for (var j = 0; j < 16; j++) {
            var x = lerp(p[0], p[2], random(0,1))// + random(-10,10); 
            var y = lerp(p[1], p[3], random(0,1)  )// + random(-10,10);


            ctx.fillStyle = colors[Math.floor(random(0,colors.length))];
            ctx.fillCircle(x, y, 5);
        }
    }

    ctx.globalAlpha = 1.0; 
}
