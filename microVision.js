

function exSpriteCanvas(aCanvas, x0, y0) {
    this.canvas = aCanvas; 
    this.context = aCanvas.getContext("2d");
    this.cxw = this.context.canvas.width; 
    this.cxh = this.context.canvas.height; 
    this.tileSize = 64;    // size of tiles on screen; set how you please
    this.x0 = x0 * this.tileSize;
    this.y0 = y0 * this.tileSize;
    this.twopi = 2.0 * Math.PI;
}


exSpriteCanvas.prototype = {
    // draw tile at tx,ty at grid point x, y-- minimal default case
    drawSprite: function(x, y, c) { 
        var ts = 40; 
        var xpos = this.x0 + (ts*x); 
        var ypos = this.y0 + (ts*y); 
        
        this.context.beginPath();
        switch (c) { 
        case 1: this.context.fillStyle = "#080000"; break;
        case 2: this.context.fillStyle = "#000800"; break;
        case 3: this.context.fillStyle = "#000008"; break;
        case 4: this.context.fillStyle = "#080800"; break;
        case 5: this.context.fillStyle = "#080008"; break;
        case 6: this.context.fillStyle = "#000808"; break;
        default: this.context.fillStyle = "#000008"; break;
        }
        this.context.arc(xpos, ypos, 0.6*ts, 0.0, this.twopi);
        this.context.fill();

        this.context.beginPath();
        switch (c) { 
        case 1: this.context.fillStyle = "#550000"; break;
        case 2: this.context.fillStyle = "#005500"; break;
        case 3: this.context.fillStyle = "#000055"; break;
        case 4: this.context.fillStyle = "#555500"; break;
        case 5: this.context.fillStyle = "#550055"; break;
        case 6: this.context.fillStyle = "#005555"; break;
        default: this.context.fillStyle = "#000055"; break;
        }
        this.context.arc(xpos, ypos, 0.25*ts, 0.0, this.twopi);
        this.context.fill();

        this.context.beginPath();
        switch (c) { 
        case 1: this.context.fillStyle = "#ff0000"; break;
        case 2: this.context.fillStyle = "#00ff00"; break;
        case 3: this.context.fillStyle = "#0000ff"; break;
        case 4: this.context.fillStyle = "#ffff00"; break;
        case 5: this.context.fillStyle = "#ff00ff"; break;
        case 6: this.context.fillStyle = "#00ffff"; break;
        default: this.context.fillStyle = "#0000ff"; break;
        }
        this.context.arc(xpos, ypos, 0.15*ts, 0.0, this.twopi);
        this.context.fill();

    },

    // erases canvas
    clear: function() {
        var ts = this.tileSize; 
        this.context.fillStyle = "black";
        this.context.fillRect(0.0,0.0, this.cxw, this.cxh);
    }
}







function microVision(aCanvas) {
    this.sp = new exSpriteCanvas(aCanvas, 0,0); 
    this.pix = new Array(); 
    var i; 
    for (i=0; i<256; i=i+1) { 
        this.pix[i] = 0.0; 
    }
    this.wDn=0; // which keys are down?
    this.aDn=0; 
    this.sDn=0; 
    this.dDn=0; 
    this.jDn=0; 
    this.kDn=0; 
    this.mDn=0; 
    this.iDn=0; 
    this.spDn=0; 

    this.wTap = 0; 
    this.aTap = 0; 
    this.sTap = 0; 
    this.dTap = 0; 
    this.jTap = 0; 
    this.kTap = 0; 
    this.mTap = 0; 
    this.iTap = 0; 
    this.spTap = 0; 
}


microVision.prototype = {
    keyDn: function(evt) {
        //this.plot(15,14);
        switch (evt.keyCode) {
            case 87: this.wDn = 2; break; 
            case 65: this.aDn = 2; break; 
            case 83: this.sDn = 2; break; 
            case 68: this.dDn = 2; break; 
            case 74: this.jDn = 2; break; 
            case 75: this.kDn = 2; break; 
            case 73: this.iDn = 2; break; 
            case 77: this.mDn = 2; break; 
            case 32: this.spDn = 2; break; 
        }
    },

    keyUp: function(evt) {
        //this.plot(15,15);
        switch (evt.keyCode) {
            case 87: this.wDn = 0; this.wTap = 1; break; 
            case 65: this.aDn = 0; this.aTap = 1; break; 
            case 83: this.sDn = 0; this.sTap = 1; break; 
            case 68: this.dDn = 0; this.dTap = 1; break; 
            case 74: this.jDn = 0; this.jTap = 1; break; 
            case 75: this.kDn = 0; this.kTap = 1; break; 
            case 73: this.iDn = 0; this.mTap = 1; break; 
            case 77: this.mDn = 0; this.iTap = 1; break; 
            case 32:this.spDn = 0; this.spTap = 1; break; 
        }
    },

    isTap: function() {

    },


    touchStart: function(evt) { 
        var sx = evt.Touch.pageX/ 32.0;
    },
    touchEnd: function(evt) { 

    },

    // draw tile at tx,ty at grid point x, y-- minimal default case
    drawOne: function(x, y, c) {
        this.sp.drawSprite(.5+x, .5+y, c);
    },

    plotc: function(x, y, c) {
        var ind = (y*16)+x; 
        this.pix[ind] = c; 
    },
    plot: function(x, y) {
        var ind = (y*16)+x; 
        this.pix[ind] = 1; 
    },
    unplot: function(x, y) {
        var ind = (y*16)+x; 
        this.pix[ind] = 0; 
    },

    drawBlock: function(xlo, ylo, xsz, ysz) { 
        var i, j; 

        for (i=xlo; i<(xlo+xsz); i=i+1) {
            for (j=ylo; j<(ylo+ysz); j=j+1) {
                if ((-1<i)&&(i<16)&&(-1<j)&&(j<16)) { 
                    this.plot(i, j); 
                }
            }
        }
    },


    read: function(x, y, onOff) {
        var ind = (y*16)+x; 
        return this.pix[ind]; 
    },

    redraw: function() {
        this.sp.clear();
        var i, j, ind; 
        for (i=0; i<16; i=i+1) { 
            for (j=0; j<16; j=j+1) { 
                ind = (j*16)+i; 
                if (this.pix[ind]>0) {
                    this.drawOne(i, j, this.pix[ind]); 
                }
            }
        }
    },

    wipe: function(ar) {
        var i; 
        for (i=0; i<256; i=i+1) { 
            this.pix[i] = 0; 
        }
    }
}







function missile() {
    this.x = -1;
    this.y = -1;
    this.dx = 0;
    this.dy = 0;
    this.flying = 0; 
    this.boomTimer = 0; 
}


missile.prototype = {
    launch: function(px, py, dirx, diry) {
        this.x = px;
        this.y = py; 
        this.dx = dirx; 
        this.dy = diry;
        this.flying = 2; 
        this.boomTimer = 0; 
    }, 

    move: function() { 
        if (this.flying >1.0) {
            this.x = this.x + this.dx; 
            this.y = this.y + this.dy; 
        }
        if (this.boomTimer>0.5) { 
            this.boomTimer = this.boomTimer - 1; 
        }
    },

    explode: function() { 
        this.flying = 0; 
        this.boomTimer = 20; 
    },

    hitWall: function() { 
        var res = 0; 
        if ((this.x<-.8)&&(this.dx<0)) { res = 2; }
        if ((this.y<-.8)&&(this.dy<0)) { res = 2; }
        if ((this.x>15.8)&&(this.dx>0)) { res = 2; }
        if ((this.y>15.8)&&(this.dy>0)) { res = 2; }
        return res; 
    },

    isOn: function(ax, ay) {
        var res, sx, sy;
        res = 0;  
        sx = this.x-ax; 
        sy = this.y-ay; 
        if (((sx*sx)+(sy*sy))<.2) { res = 2; }
        return res; 
    },

    isNextTo: function(ax, ay) {
        var res, sx, sy;
        res = 0;  
        sx = this.x-ax; 
        sy = this.y-ay; 
        if (((sx*sx)+(sy*sy))<3) { res = 2; }
        return res; 
    },

    isExploding: function() {
        return this.boomTimer > 0.5; 
    }
}



