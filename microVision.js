

function exSpriteCanvas(aCanvas, x0, y0) {
    this.canvas = aCanvas; 

    this.context = aCanvas.getContext("2d");
    this.context.fillStyle = 'white';
    this.context.strokeStyle = "#000";
    this.cxw = this.context.canvas.width; 
    this.cxh = this.context.canvas.height; 
    this.tileSize = 32;    // size of tiles on screen; set how you please
    this.imgTileSz = 32;    // sze of tiles in exTiles: 32
    this.tileW = Math.floor(this.cxw / this.tileSize) + 1; // # tiles available on canvas in X
    this.tileH = Math.floor(this.cxh / this.tileSize) + 1; // in Y
    this.x0 = x0 * this.tileSize;
    this.y0 = y0 * this.tileSize;

    // load the tile set bitmap. 
    this.loaded = 0; 
    this.tiles = new Image(); 
    this.tiles.src = "microTiles.png"; 
    that = this;
    this.tiles.onload= function(that) { that.loaded=1; }

    // bbox for all draws since last erase-- uses canvas 
    this.minX = 999.0; 
    this.minY = 999.0; 
    this.maxX = -999.0; 
    this.maxY = -999.0; 
}


exSpriteCanvas.prototype = {
    // draw tile at tx,ty at grid point x, y-- minimal default case
    drawSprite: function(x, y, tx, ty) { 
        var ts = this.tileSize; 
        var is = this.imgTileSz;
        var xpos = this.x0 + (ts*x); 
        var ypos = this.y0 + (ts*y); 
        this.context.drawImage(this.tiles, tx*is, ty*is, is, is, xpos, ypos, ts, ts); 
        if (x<this.minX) { this.minX = x; }
        if (y<this.minY) { this.minY = y; }
        if (x>this.maxX) { this.maxX = x; }
        if (y>this.maxY) { this.maxY = y; }
        
    },


    // draws multiple tiles on a grid point
    drawLargeSprite: function(x, y, tx, ty, txsz, tysz) { 
        var ts = this.tileSize; 
        var is = this.imgTileSz;
        var xpos = this.x0 + (ts*x); 
        var ypos = this.y0 + (ts*y); 
        this.context.drawImage(this.tiles, tx*is, ty*is, txsz*is, tysz*is, xpos, ypos, txsz*ts, tysz*ts); 
        if (x<this.minX) { this.minX = x; }
        if (y<this.minY) { this.minY = y; }
        if ((x+txsz)>this.maxX) { this.maxX = (x+txsz); }
        if ((y+tysz)>this.maxY) { this.maxY = (y+tysz); }
    },


    // scale the sprite by xscale and yscale 
    drawStretchedSprite: function(x, y, tx, ty, txsz, tysz, xscale, yscale) { 
        var ts = this.tileSize; 
        var is = this.imgTileSz
        var xpos = this.x0 + (ts*x); 
        var ypos = this.y0 + (ts*y); 
        this.context.drawImage(this.tiles, tx*is, ty*is, txsz*is, tysz*is, xpos, ypos, txsz*ts*xscale, tysz*ts*yscale); 
        if (x<this.minX) { this.minX = x; }
        if (y<this.minY) { this.minY = y; }
        if (((x+txsz)*xscale)>this.maxX) { this.maxX = ((x+txsz)*xscale); }
        if (((y+tysz)*yscale)>this.maxY) { this.maxY = ((y+tysz)*yscale); }
    },


    // erases canvas
    clear: function() {
        var ts = this.tileSize; 
        this.context.fillStyle = this.bg;
        this.context.beginPath();
        this.context.rect(this.x0 + (this.minX*ts), this.y0+(this.minY*ts), this.maxX*ts, this.maxY*ts);
        this.context.fill();
        this.minX = 999.0; 
        this.minY = 999.0; 
        this.maxX = -999.0; 
        this.maxY = -999.0; 
    },

    // erases canvas
    clearAll: function() {
        var ts = this.tileSize; 
        this.context.fillStyle = this.bg;
        this.context.beginPath();
        this.context.rect(0.0,0.0, this.tileW*ts, this.tileH*ts);
        this.context.fill();
    },
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
}


microVision.prototype = {
    keyDn: function(evt) {
        this.plot(15,14);
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
        this.plot(15,15);
        switch (evt.keyCode) {
            case 87: this.wDn = 0; break; 
            case 65: this.aDn = 0; break; 
            case 83: this.sDn = 0; break; 
            case 68: this.dDn = 0; break; 
            case 74: this.jDn = 0; break; 
            case 75: this.kDn = 0; break; 
            case 73: this.iDn = 0; break; 
            case 77: this.mDn = 0; break; 
            case 32:this.spDn = 0; break; 
        }
    },
    // draw tile at tx,ty at grid point x, y-- minimal default case
    drawOne: function(x, y) {
        this.sp.drawSprite(.9+(x*.5), 1.9+(y*.5), 15, 2);
    },

    plot: function(x, y) {
        var ind = (y*16)+x; 
        this.pix[ind] = 2.0; 
    },
    unplot: function(x, y) {
        var ind = (y*16)+x; 
        this.pix[ind] = 0.0; 
    },

    read: function(x, y, onOff) {
        var ind = (y*16)+x; 
        return this.pix[ind]; 
    },

    redraw: function() {
        this.sp.drawLargeSprite(0.0,0.0, 0,1, 11,15);
        var i, j, ind; 
        for (i=0; i<16; i=i+1) { 
            for (j=0; j<16; j=j+1) { 
                ind = (j*16)+i; 
                if (this.pix[ind]>1.0) {
                    this.drawOne(i, j); 
                }
            }
        }
    },

    wipe: function(ar) {
        var i; 
        for (i=0; i<256; i=i+1) { 
            this.pix[i] = 0.0; 
        }
    }
}







function missile() {
    this.x = -1;
    this.y = -1;
    this.dx = 0;
    this.dy = 0;
    this.flying = 0; 
}


missile.prototype = {
    launch: function(px, py, dirx, diry) {
        this.x = px;
        this.y = py; 
        this.dx = dirx; 
        this.dy = diry;
        this.flying = 2; 
    }, 

    move: function() { 
        if (this.flying >1.0) {
            this.x = this.x + this.dx; 
            this.y = this.y + this.dy; 
        }
    },

    hitWall: function() { 
        var res = 0; 
        if ((this.x<.2)&&(this.dx<0)) { res = 2; }
        if ((this.y<.2)&&(this.dy<0)) { res = 2; }
        if ((this.x>14.8)&&(this.dx>0)) { res = 2; }
        if ((this.y>14.8)&&(this.dy>0)) { res = 2; }
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
    }
}



