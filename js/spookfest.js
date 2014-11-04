$(document).ready(function(){

  var casper = $('<img src="/img/ghost.png"/>').css({position:'absolute',height:'25px',top:'20px'});

  $('.logo-container').append(casper);

  casper.click(function(){
    casper.remove();
    do_it();
  });

});

var bkg = null;
function spookfest() {
bkg = $('<div style="backgroundColor:black"></div>').css({backgroundColor:'black'});

  $('body').prepend(bkg.height(0).css({webkitTransition: 'height 1s ease-in-out',
    mozTransition: 'height 1s ease-in-out',
    msTransition: 'height 1s ease-in-out',
    oTransition: 'height 1s ease-in-out',
    transition: 'height 1s ease-in-out',
  }));

  $('body').css('overflow', 'hidden');

  $('#video_container,#videoMenu').css({zIndex:1});
  bkg.height($(window).height());

  var canvas = $('<canvas></canvas>').css({position:'absolute',zIndex:101,cursor:'none',top:'50%',left:'50%',marginLeft:'-255px',marginTop:'-255px'}).prependTo(bkg)[0];
  canvas.width = 510;
  canvas.height = 510;

  var quitter_link = $('<a id="quit_and_give_up_link" href="#" style="float:right; margin-right:15px">Take me back to SparkFun Arcade</a>').click(function(){
    $('body').css('overflow', 'initial');
    bkg.remove();
  });

  $(canvas).after(quitter_link);

  spookfest_init_game_pls(canvas);
}

function spookfest_init_game_pls(passed_canvas) {
  var ghost = new Image();ghost.src = "data:image/png;base64,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";
  var ghostf = new Image();ghostf.src = "data:image/png;base64,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";
  var candy = new Image();candy.src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAYCAYAAAD6S912AAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAABhgAAAYYB6OC/LwAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAIcSURBVDiNrZU/aBNRHMe/791rYmJ6jSStSFuPVCvRNG2lg6BLHBUUHIrFRRwKgqBQqoLBSUQnwUF0cNBBBUVBBUEHpYMi1Q5twYKIRbQISjBBDOndJV+Harg0uTOJ+cIb3r3f93Pfe3/uCZIADj8APqaA+TCQE2hICkDiJ9A/AyztBTn+mARb0w4+EWRsGVj0NZbKTZ22BKhaAwOANimBaLZ1wPaCAnY9A96O/X1U+uJD8V0QpYwCfyiUsgrMaoAEhF6E1IsQug0RtaEG8pAblx3AwWlB3jKK708u2jOmsOfWgpnGZkCEbahkHtqQDTV4NCVIonBlfMGefRH/n4+VRiIXTD8MSwAQvVtPQzS4/VZJ6912DwAkAPj3TzzS+rZnmoUJf5BWeyRdBgKAFhu+3HS6zSMfQgcmv1UAfQvWedllmE0BN2wqhxErZ3lF5s0zd8yXd8dqulwkI91W8MJU+aRJ56DZ1X9cBHVW2zyAsaGpir6zE9pz5LsW3/mmbpqQ4LqetCsQANjddwJSqy+dMZAJjJ6a9gQG9k281rbs+FxXwJ747aqX1CpURuJctbty44s1IRYCHWerypyr7FT+4mhO6hFdS+6GSqYg9Cj4K4fSp3lYr+5DWOas/9i14Sqjx+/3EL01UsvnBWwjueQCm3Pz1ZzDP7IAXHIZu+rq+setI0k+X5XuKUnh5qnnKltP8jrJryRvkOz0qv8NH8jGvumsVSsAAAAASUVORK5CYII=";
  var Factory = function () {};
  var slice = Array.prototype.slice;
  var augment = function (base, body) {
      var uber = Factory.prototype = typeof base === "function" ? base.prototype : base;
      var prototype = new Factory, properties = body.apply(prototype, slice.call(arguments, 2).concat(uber));
      if (typeof properties === "object") for (var key in properties) prototype[key] = properties[key];
      if (!prototype.hasOwnProperty("constructor")) return prototype;
      var constructor = prototype.constructor;
      constructor.prototype = prototype;
      return constructor;
  };

  var canvas, ctx;

  var level = 0;

  var zoom = 1;

  var mouse = {x:0, y:0};

  var ship = null;

  var cur_creeps = 0;

  var gameover = false;

  var colours = {
    blue: 'hsla(240, 100%, 50%, 1)',
    yellow: 'hsla(60, 100%, 50%, 1)',
    red: 'hsla(0, 100%, 50%, 1)',
    purple: 'hsla(300, 100%, 25%, 1)',
    green: 'hsla(120, 100%, 25%, 1)',
    cyan: 'hsla(180, 100%, 50%, 1)',
    black: 'hsla(0, 0%, 0%, 1)',
    white: 'hsla(0, 0%, 100%, 1)',
  };

  var scoring = {
    score: 0, lives: 3,
    add: function(pts) {
      this.score += pts;
    },
    render: function(){
      if (this.lives <= 0) {
        gameover = true;
        levels[getLevel()].whirlpool = [];
      }
      ctx.fillStyle = "white";
      ctx.font = "bold 16px Arial";
      ctx.fillText('Score: ' + this.score, canvas.width - 150, 20);
      ctx.fillText('Level: ' + (level+1), canvas.width/2 - 50, 20);
      ctx.fillText('Lives: ' + this.lives, 50, 20);
    }
  };

  var colors = {
    5: {tunnel: 'blue',   ship: 'yellow', zapper: 'yellow', flipper: 'red',    tanker: 'purple', spike: 'green'},
    10: {tunnel: 'red',    ship: 'green',  zapper: 'cyan',   flipper: 'purple', tanker: 'blue',   spike: 'cyan',  pulsars: 'yellow'},
    15: {tunnel: 'yellow', ship: 'blue',   zapper: 'blue',   flipper: 'green',  tanker: 'cyan',   spike: 'red',   pulsars: 'blue'},
    20: {tunnel: 'cyan',   ship: 'blue',   zapper: 'red',    flipper: 'green',  tanker: 'purple', spike: 'red',   pulsars: 'yellow'},
    25: {tunnel: 'black',  ship: 'yellow', zapper: 'white',  flipper: 'red',    tanker: 'purple', spike: 'green', pulsars: 'cyan'},
    30: {tunnel: 'green',  ship: 'red',    zapper: 'purple', flipper: 'yellow', tanker: 'purple', spike: 'blue',  pulsars: 'yellow'},
  };

  var levels = [
    {
      origin: {x: 50, y: 64},
      outer: [
        {x:38, y:23},{x:50, y:20},{x:62, y:23},{x:72, y:30},{x:79, y:40},
        {x:82, y:52},{x:79, y:63},{x:72, y:74},{x:62, y:80},{x:50, y:83},
        {x:38, y:80},{x:28, y:74},{x:21, y:64},{x:18, y:52},{x:21, y:40},
        {x:28, y:29},{x:38, y:23}
      ],
      inner: [
        {x:48.14, y:58.68},{x:50,    y:58.29},{x:51.86, y:58.68},{x:53.64, y:60},{x:54.6,  y:61.83},
        {x:55,    y:63.59},{x:54.6,  y:65.55},{x:53.63, y:66.92},{x:51.86, y:67.90},{x:50,    y:68.25},
        {x:48.14, y:67.90},{x:46.37, y:66.92},{x:45.40, y:65.55},{x:45,    y:63.59},{x:45.40, y:61.83},
        {x:46.36, y:60},{x:48.14, y:58.68}
      ], lanes: [], whirlpool: [], bullets: [], effects: []
    },
    {
      origin: {x: 50, y: 58},
      outer:[
        {x:21.57, y:18.63},{x:35.88, y:18.63},{x:50.2,  y:18.64},
        {x:64.31, y:18.63},{x:78.63, y:18.63},{x:78.63, y:33.14},
        {x:78.63, y:47.65},{x:78.63, y:61.59},{x:78.63, y:75.88},
        {x:64.31, y:75.88},{x:50.21,  y:75.88},{x:35.88, y:75.88},
        {x:21.57, y:75.88},{x:21.57, y:61.55},{x:21.57, y:47.45},
        {x:21.57, y:33.14},{x:21.57, y:18.63}
      ],
      inner:[
        {x:45.49, y:52.94},{x:47.84, y:52.94},{x:50.2,  y:52.94},
        {x:52.35, y:52.94},{x:54.71, y:52.94},{x:54.71, y:55.29},
        {x:54.71, y:57.65},{x:54.71, y:59.80},{x:54.71, y:62.16},
        {x:52.55, y:62.16},{x:50.2,  y:62.16},{x:47.84, y:62.16},
        {x:45.49, y:62.16},{x:45.49, y:59.80},{x:45.49, y:57.65},
        {x:45.49, y:55.29},{x:45.49, y:52.94}
      ], lanes: [], whirlpool: [], bullets: [], effects: []
    },
    {
      origin: {x:50, y:54.7}, /////
      outer: [
        {x:34.31, y:11.76},{x:50.2,  y:11.76},{x:65.88, y:11.76},{x:65.88, y:27.65},{x:81.57, y:27.65},
        {x:81.57, y:43.33},{x:81.57, y:59.02},{x:65.88, y:59.02},{x:65.88, y:74.71},{x:50.2,  y:74.71},
        {x:34.31, y:74.71},{x:34.31, y:59.02},{x:18.63, y:59.02},{x:18.63, y:43.33},{x:18.63, y:27.65},
        {x:34.31, y:27.65},{x:34.31, y:11.76}
      ],
      inner: [
        {x:47.65,    y:50},{x:50.2,     y:50},{x:52.55,    y:50},{x:52.55, y:52.35},{x:54.9,  y:52.35},
        {x:54.9,  y:54.71},{x:54.9,  y:57.06},{x:52.55, y:57.06},{x:52.55, y:59.41},{x:50.2,  y:59.41},
        {x:47.65, y:59.41},{x:47.65, y:57.06},{x:45.29, y:57.06},{x:45.29, y:54.71},{x:45.29, y:52.35},
        {x:47.65, y:52.35},{x:47.65,    y:50}
      ], lanes:[], whirlpool:[], bullets:[]
    },
    {
      origin: {x: 50, y: 56},
      outer: [
        {x:50.2,  y:11.76},{x:56.47, y:24.12},{x:62.35, y:37.06},{x:68.63, y:49.41},{x:75.1,  y:61.96},
        {x:81.57, y:74.71},{x:70.78, y:74.71},{x:60.79, y:74.71},{x:50.2,  y:74.71},{x:39.61, y:74.71},
        {x:29.02, y:74.71},{x:18.63, y:74.71},{x:25.1,  y:61.96},{x:30.98, y:49.41},{x:37.25, y:36.86},
        {x:43.73, y:24.31},{x:50.2,  y:11.76}
      ],
      inner: [
        {x:50.2,   y:50.2},{x:50.98, y:51.76},{x:51.96, y:53.73},{x:52.94, y:55.69},{x:53.92, y:57.65},
        {x:55.1,  y:59.41},{x:53.33, y:59.41},{x:51.76, y:59.41},{x:50.2,  y:59.41},{x:48.43, y:59.41},
        {x:46.86, y:59.41},{x:45.29, y:59.41},{x:46.27, y:57.65},{x:47.25, y:55.69},{x:48.24, y:53.73},
        {x:49.22, y:51.76},{x:50.2,   y:50.2}
      ], lanes:[], whirlpool:[], bullets:[]
    },
    {
      origin: {x: 50, y: 54.7},
      outer: [
        {x:18.63, y:13.73},{x:18.63, y:24.32},{x:18.63, y:34.71},{x:18.63, y:45.29},{x:20.39, y:55.49},
        {x:25.69, y:65.29},{x:33.92, y:72.16},{x:43.73, y:76.27},{x:56.47, y:76.27},{x:66.27, y:72.16},
        {x:74.51, y:65.29},{x:79.8,  y:55.49},{x:81.57, y:45.29},{x:81.57, y:34.71},{x:81.57, y:24.32},
        {x:81.57, y:13.73}
      ],
      inner: [
        {x:45.29, y:51.96},{x:45.29, y:53.53},{x:45.29,  y:55.1},{x:45.29, y:56.86},{x:45.49, y:58.43},
        {x:46.47,  y:59.8},{x:47.65, y:60.78},{x:49.22, y:61.37},{x:50.98, y:61.37},{x:52.75, y:60.78},
        {x:53.92,  y:59.8},{x:54.71, y:58.43},{x:54.9,  y:56.86},{x:54.9,   y:55.1},{x:54.9,  y:53.53},
        {x:54.9,  y:51.96}
      ], lanes: [], whirlpool: [],bullets: []
    },
    {
      origin: {x: 50, y: 19},
      outer: [
        {x:1.57,  y:58.82},{x:7.65,  y:58.82},{x:14.31, y:58.82},{x:20.78, y:58.82},{x:27.25, y:58.82},
        {x:33.73, y:58.82},{x:40.2,  y:58.82},{x:46.67, y:58.82},{x:52.94, y:58.82},{x:59.61, y:58.82},
        {x:66.08, y:58.82},{x:72.55, y:58.82},{x:79.02, y:58.82},{x:85.49, y:58.82},{x:91.96, y:58.82},
        {x:98.43, y:58.82}
      ],
      inner: [
        {x:45.1,  y:21.76},{x:45.69, y:21.76},{x:46.47, y:21.76},{x:47.06, y:21.76},{x:47.65, y:21.76},
        {x:48.43, y:21.76},{x:49.22, y:21.76},{x:49.8,  y:21.76},{x:50.39, y:21.76},{x:51.18, y:21.76},
        {x:51.76, y:21.76},{x:52.35, y:21.76},{x:53.14, y:21.76},{x:53.73, y:21.76},{x:54.51, y:21.76},
        {x:55.49, y:21.76}
      ], lanes: [], whirlpool: [], bullets: []
    },
  ];

  var ship_tube = null, ship_frame = 0;

  var diff = {
    flipper: 8,
    flipFire: 9.95,
    spike: 5,
    tank: 8,
    creepLim: 4,
    creepDel: 1500,
    creepProc: 0.01,
  };

  var TubeThing = augment(function(){}, function () {
    this.pT = null; this.f = 0.955; this.v = 5; this.tp = 1;
    this.constructor = function(pT) {
      this.pT = pT;
    };
    this.render = function() {
      this.v *= this.f;
      this.tp += this.v;
    };
  });

  var Ship = augment(TubeThing, function (base) {
    this.tp = 0; this.f = 1; this.v = 0; this.frame = 0; this.totframe = 0;
    this.distances = []; this.ld = 0; this.display = true; this.dead = false;
    this.constructor = function(pT) {
      base.constructor.apply(this, arguments);
    };
    this.die = function(){
      if (this.dead) return;
      var effect = new Explosion(this.p);
      levels[getLevel()].effects.push(effect);
      this.dead = true;
      scoring.lives--;
    };
    this.resurrect = function(){
      this.dead = false;
    };
    this.render = function() {

      if (this.dead || !this.display) return;
      base.render.apply(this, arguments);

      if (mouse) {
        this.distances.sort(function(a,b){
          if (a[1] < b[1]) return -1;
          else if (a[1] > b[1]) return 1;
          return 0;
        });

        var index = this.distances[0][0];

        this.distances = [];

        /* SHIP */
        var color = getColor('ship'), dir = 0;

        if (levels[getLevel()].closed) {
          var l = 0, r = 0, c = this.pT.next.i;

          while(c != index) {
            c = levels[getLevel()].lanes[c].next.i;
            r++;
          }

          c = this.pT.prev.i;
          while(c != index) {
            c = levels[getLevel()].lanes[c].prev.i;
            l++;
          }

          if (r == l) {
            dir = 0;
          } else if (r < l) {
            this.ld = 1;
            dir = 1;
          } else {
            this.ld = -1;
            dir = -1;
          }
        } else {
          if (this.pT.i == index) {
            dir = 0;
          } else if (this.pT.i < index) {
            this.ld = 1;
            dir = 1;
          } else {
            this.ld = -1;
            dir = -1;
          }
        }

        if (dir != 0 && ship_frame++ > 2) {
          ship_frame = 0;
          if (dir == 1) {
            if (this.pT.next) {
              index = this.pT.next.i;
            } else {
              index = this.pT.i;
            }
          } else if (dir == -1) {
            if (this.pT.prev) {
              index = this.pT.prev.i;
            } else {
              index = this.pT.i;
            }
          }
        } else {
          index = this.pT.i;
        }

        this.pT = levels[getLevel()].lanes[index];

        var spl = this.lp = { x: this.pT.leftOuterPoint.x  + this.pT.leftSeg.x  * this.tp,
          y: this.pT.leftOuterPoint.y  + this.pT.leftSeg.y  * this.tp};

        var spr = this.rp = { x: this.pT.rightOuterPoint.x + this.pT.rightSeg.x * this.tp,
          y: this.pT.rightOuterPoint.y + this.pT.rightSeg.y * this.tp};

        var s_x = (this.lp.x + this.rp.x)/2; s_y = ((this.lp.y + this.rp.y)/2);

        var s_rad = Math.atan2(this.pT.rightOuterPoint.y-this.pT.leftOuterPoint.y, this.pT.rightOuterPoint.x-this.pT.leftOuterPoint.x);

        var scale = (100-(this.tp*0.65)) /100;

        //var spl = this.pT.leftOuterPoint, spr = this.pT.rightOuterPoint;

        var frame_offset_x = 0, frame_offset_y = 0;

        if (ship_frame == 1) {
          frame_offset_x = 2 * dir;
        }

        if (ship_frame == 2) {
          frame_offset_x = 7 * dir;
          if (dir > 0) {
            if (this.pT.next) {
              spr = this.pT.next.rightOuterPoint;
            }
          } else {
            if (this.pT.prev) {
              spl = this.pT.prev.leftOuterPoint;
            }
          }
        }

        if (ship_frame == 3) {
          frame_offset_x = 10 * dir;
          if (this.pT.next) {
            spl = this.pT.next.leftOuterPoint;
            spr = this.pT.next.rightOuterPoint;
          }
          if (dir < 0) {
            if (this.pT.prev) {
              spl = this.pT.prev.leftOuterPoint;
              spr = this.pT.prev.rightOuterPoint;
            }
          }
        }

        var tmp = rot({x:s_x,y:s_y}, {x:s_x+frame_offset_x,y:s_y-2+frame_offset_y}, s_rad);
        s_x = tmp.x; s_y = tmp.y;

        this.p = {x: s_x, y: s_y};

        tmp = transformPosition(tmp);

        var spider = [
          [rot({x:s_x,y:s_y},{x:s_x,y:s_y-(0.4*scale)},s_rad), rot({x:s_x,y:s_y},{x:s_x-(5.2*scale),y:s_y-(2*scale)},s_rad), spl],
          [{x:s_x,y:s_y}, rot({x:s_x,y:s_y},{x:s_x-(5*scale),y:s_y-(1*scale)},s_rad), spl],
          [rot({x:s_x,y:s_y},{x:s_x,y:s_y+(0.4*scale)},s_rad), rot({x:s_x,y:s_y},{x:s_x-(5*scale),y:s_y-(0.4*scale)},s_rad), spl],
          [rot({x:s_x,y:s_y},{x:s_x,y:s_y-(0.4*scale)},s_rad), rot({x:s_x,y:s_y},{x:s_x+(5.2*scale),y:s_y-(2*scale)},s_rad), spr],
          [{x:s_x,y:s_y}, rot({x:s_x,y:s_y},{x:s_x+(5*scale),y:s_y-(1*scale)},s_rad), spr],
          [rot({x:s_x,y:s_y},{x:s_x,y:s_y+(0.4*scale)},s_rad), rot({x:s_x,y:s_y},{x:s_x+(5*scale),y:s_y-(0.4*scale)},s_rad), spr]
        ];

        for (var i = 0; i < spider.length; i++) {
          drawLines(spider[i], '#3E3E3E', 2);
        }

        ctx.save();

        ctx.translate(tmp.x, tmp.y);

        ctx.rotate(s_rad);

        ctx.translate(-tmp.x, -tmp.y);

        tmp = {x:s_x, y:s_y};
        if (this.ld < 0) {
          drawImage(ghostf, tmp, 5*scale, 5*scale);
        } else {
          drawImage(ghost, tmp, 5*scale, 5*scale);
        }

        ctx.restore();

        drawLine(levels[getLevel()].outer[index], levels[getLevel()].inner[index], color);
        drawLine(levels[getLevel()].outer[index+1], levels[getLevel()].inner[index+1], color);
      }

      if (this.pT.spike.tp && this.tp >= this.pT.spike.tp) {
        this.die();
        return false;
      }

      this.frame = this.frame+1 % this.totframe;
    };
  });

  var bullet_count = 0;
  var Bullet = augment(TubeThing, function (base) {
    this.s = 0.75; this.r = 0;
    this.constructor = function(pT) {
      base.constructor.apply(this, arguments);
      bullet_count++;
    };
    this.render = function() {
      base.render.apply(this, arguments);
      this.p = { x: this.pT.outerPoint.x+((this.pT.innerPoint.x - this.pT.outerPoint.x)/100) * this.tp ,
        y: this.pT.outerPoint.y+((this.pT.innerPoint.y - this.pT.outerPoint.y)/100) * this.tp };

      var scale = (100-(this.tp*0.65)) /100;

      this.r+=0.25;

      var tmp = transformPosition(this.p);

      ctx.save();
      ctx.translate(tmp.x, tmp.y);
      ctx.rotate(this.r);
      ctx.translate(-tmp.x, -tmp.y);

      drawImage(candy, this.p, 2.65 * scale, 2.65 * scale);

      ctx.restore();

      //drawLine({x:this.p.x-(this.s/100)*scale, y:this.p.y-(this.s/100)*scale}, {x:this.p.x+(this.s/100)*scale, y:this.p.y+(this.s/100)*scale});
      //drawLine({x:this.p.x-(this.s/100)*scale, y:this.p.y+(this.s/100)*scale}, {x:this.p.x+(this.s/100)*scale, y:this.p.y-(this.s/100)*scale});

      if (this.pT.spike.tp && this.tp > this.pT.spike.tp){
        this.pT.spike.tp += 5;
        bullet_count--;
        scoring.add( Math.floor(rand(1,3.25)) );
        return false;
      }

      if (this.tp >= 100) {
        bullet_count--;
        return false;
      }
      return true;
    };
  });

  var Enemy = augment(TubeThing, function (base) {
    this.f = 1.009; this.v = -0.1; this.tp = 100;
    this.lp = null; this.p = null; this.rp = null;
    this.co = null; this.si = null;
    this.constructor = function(pT) {
      base.constructor.apply(this, arguments);
      var rad = Math.atan2(pT.rightOuterPoint.y-pT.leftOuterPoint.y, pT.rightOuterPoint.x-pT.leftOuterPoint.x);
      this.co = Math.cos(rad); this.si = Math.sin(rad);
    };
    this.render = function(){
      base.render.apply(this, arguments);
      this.lp = { x: this.pT.leftOuterPoint.x  + this.pT.leftSeg.x  * this.tp,
        y: this.pT.leftOuterPoint.y  + this.pT.leftSeg.y  * this.tp};

      this.p  = { x: this.pT.outerPoint.x + this.pT.seg.x * this.tp,
        y: this.pT.outerPoint.y + this.pT.seg.y * this.tp };

      this.rp = { x: this.pT.rightOuterPoint.x + this.pT.rightSeg.x * this.tp,
        y: this.pT.rightOuterPoint.y + this.pT.rightSeg.y * this.tp};

      if (levels[getLevel()].dir == -1) {
        var tmp = this.lp, rtmp = this.rp;
        this.lp = rtmp;
        this.rp = tmp;
      }
    };
  });

  var BadBullet = augment(Enemy, function(base) {
    this.v = -0.35; this.r = 0; this.notCreep = true;
    this.constructor = function(pT) {
      base.constructor.apply(this, arguments);
    };
    this.render = function(){
      base.render.apply(this, arguments);

      var scale = 0.10 + ((100-this.tp)/100) * 0.90 * levels[getLevel()].dir;

      var d1 = {x: this.p.x+(0.35*scale), y: this.p.y+(0.35*scale)};
      var d2 = {x: this.p.x-(0.35*scale), y: this.p.y+(0.35*scale)};
      var d3 = {x: this.p.x-(0.35*scale), y: this.p.y-(0.35*scale)};
      var d4 = {x: this.p.x+(0.35*scale), y: this.p.y-(0.35*scale)};

      ctx.save();
      var tmp = transformPosition(this.p);

      ctx.translate(tmp.x, tmp.y);
      ctx.rotate(this.r);
      ctx.translate(-tmp.x, -tmp.y);

      drawDot(d1.x, d1.y, getColor('red'));
      drawDot(d2.x, d2.y, getColor('red'));
      drawDot(d3.x, d3.y, getColor('red'));
      drawDot(d4.x, d4.y, getColor('red'));

      var pa = {x: this.p.x +(0.75*scale), y: this.p.y+(0.75*scale)};
      var pb = {x: this.p.x -(0.75*scale), y: this.p.y+(0.75*scale)};
      var pc = {x: this.p.x -(0.75*scale), y: this.p.y-(0.75*scale)};
      var pd = {x: this.p.x +(0.75*scale), y: this.p.y-(0.75*scale)};

      var pab = {x: this.p.x +(1.65*scale), y: this.p.y+(1.65*scale)};
      var pbb = {x: this.p.x -(1.65*scale), y: this.p.y+(1.65*scale)};
      var pcb = {x: this.p.x -(1.65*scale), y: this.p.y-(1.65*scale)};
      var pdb = {x: this.p.x +(1.65*scale), y: this.p.y-(1.65*scale)};

      drawLine(pa, pab, getColor('white'));
      drawLine(pb, pbb, getColor('white'));
      drawLine(pc, pcb, getColor('white'));
      drawLine(pd, pdb, getColor('white'));

      this.r += 0.05;

      ctx.restore();

      if (this.tp <= 0) {
        if (ship.pT.i == this.pT.i) {
          //SHIP DEATH
          ship.die();
        }
        return false;
      }

      return true;
    };
  });

  var Flipper = augment(Enemy, function (base) {
    this.fl = false; this.fd = 1; this.r = null; this.score = 150;
    this.constructor = function(pT) {
      base.constructor.apply(this, arguments);
    };
    this.render = function(){
      base.render.apply(this, arguments);

      if (this.fl) {
        var rotp = this.pT.leftOuterPoint;

        if (this.fd > 0) {
          if (this.pT.prev) {
            if ( ship.pT.i == this.pT.prev.i && this.pT.prev.bullets.length && this.pT.prev.bullets[this.pT.prev.bullets.length-1].tp <= 10 ) {
              bullet_count--;
              this.pT.prev.bullets.splice(this.pT.prev.bullets.length-1, 1);
              return false;
            }
            //b leftOuterPoint
            var angle = find_angle(this.pT.prev.leftOuterPoint, this.pT.leftOuterPoint, this.pT.rightOuterPoint);

            var trimid = {x: (this.pT.rightOuterPoint.x + this.pT.prev.leftOuterPoint.x)/2 + this.pT.leftSeg.x * 2, y: (this.pT.rightOuterPoint.y + this.pT.prev.leftOuterPoint.y)/2 + this.pT.leftSeg.y * 2};
            if (!isPointInPoly(levels[getLevel()].outer, trimid) && getLevel() != 5) {
              angle *= 3;
            }

            rotprog = (this.r * Math.PI/180) / (angle);
          } else {
            this.fd = -this.fd;
            rotprog = 0;
          }
        } else {
          if (this.pT.next) {
            if ( ship.pT.i == this.pT.next.i && this.pT.next.bullets.length && this.pT.next.bullets[this.pT.next.bullets.length-1].tp <= 10 ) {
              bullet_count--;
              this.pT.next.bullets.splice(this.pT.next.bullets.length-1, 1);
              return false;
            }
            var angle = find_angle(this.pT.leftOuterPoint, this.pT.rightOuterPoint, this.pT.next.rightOuterPoint);

            var trimid = {x: (this.pT.leftOuterPoint.x + this.pT.next.rightOuterPoint.x)/2 + this.pT.leftSeg.x * 2, y: (this.pT.leftOuterPoint.y + this.pT.next.rightOuterPoint.y)/2 + this.pT.leftSeg.y * 2};
            if (!isPointInPoly(levels[getLevel()].outer, trimid) && getLevel() != 5) {
              angle *= 3;
            }

            rotprog = (-this.r * Math.PI/180) / (angle);
          } else {
            this.fd = -this.fd;
            rotprog = 0;
          }
          rotp = this.pT.rightOuterPoint;
        }

        rotprog *= 100;

        ctx.save();
        var p = transformPosition(rotp);
        ctx.translate(p.x, p.y);
        ctx.rotate(this.r * Math.PI/180);
        ctx.translate(-p.x, -p.y);
      }

      var color = getColor('flipper');

      var scale = 0.10 + ((100-this.tp)/100) * 0.90 * levels[getLevel()].dir;

      var la2 = {x: this.p.x + this.co * ((this.p.x+(4*scale)) - this.p.x) - this.si * ((this.p.y+(3*scale)) - this.p.y),
          y: this.p.y + this.si * ((this.p.x+(4*scale)) - this.p.x) + this.co * ((this.p.y+(3*scale)) - this.p.y)};

      var la3 = {x: this.p.x + this.co * ((this.p.x+(3*scale)) - this.p.x) - this.si * ((this.p.y+(1.75*scale)) - this.p.y),
          y: this.p.y + this.si * ((this.p.x+(3*scale)) - this.p.x) + this.co * ((this.p.y+(1.75*scale)) - this.p.y)};

      var lb2 = {x: this.p.x + this.co * ((this.p.x-(4*scale)) - this.p.x) - this.si * ((this.p.y+(3*scale)) - this.p.y),
          y: this.p.y + this.si * ((this.p.x-(4*scale)) - this.p.x) + this.co * ((this.p.y+(3*scale)) - this.p.y)};

      var lb3 = {x: this.p.x + this.co * ((this.p.x-(3*scale)) - this.p.x) - this.si * ((this.p.y+(1.75*scale)) - this.p.y),
          y: this.p.y + this.si * ((this.p.x-(3*scale)) - this.p.x) + this.co * ((this.p.y+(1.75*scale)) - this.p.y)};

      drawLine(this.lp, la2, color);
      drawLine(la2, la3, color);
      drawLine(la3, this.rp, color);

      drawLine(this.rp, lb2, color);
      drawLine(lb2, lb3, color);
      drawLine(lb3, this.lp, color);

      //drawLine(la1, lb1, 'hsla(50, 60%, 50%, 1)');

      if (this.fl) {
        ctx.restore();

        this.r += (this.fd * 10);

        if (rotprog >= 85) {
          this.r = 0;
          if (this.fd > 0) {
            if (ship.pT.i == this.pT.prev.i) {
              //SHIP DEATH
              ship.die();
            }
            this.constructor.call(this, this.pT.prev);
          } else {
            if (ship.pT.i == this.pT.next.i) {
              //SHIP DEATH
              ship.die();
            }
            this.constructor.call(this, this.pT.next);
          }
        }
      }

      if (!this.fl && this.tp >= 80 && rand(0,10) > getDiff('flipFire'))  {
        var bb = new BadBullet(this.pT);
        bb.tp = this.tp;
        this.pT.inside.push(bb);
      }

      if (this.tp <= 0 && !this.fl) {
        if (ship.pT.i == this.pT.i) {
          //SHIP DEATH
          ship.die();
          return false;
        } else {
          if (Math.random() < 0.5) this.fd = -this.fd;
          this.f = 1; this.v = 0; this.fl = true;
        }
      }

      return true;
    };
  });

  var Spiker = augment(Enemy, function (base) {
    this.spiker = true; this.score = 50;
    this.constructor = function(pT) {
      base.constructor.apply(this, arguments);
    };
    this.render = function(){
      base.render.apply(this, arguments);

      var scale = 0.10 + ((100-this.tp)/100) * 0.90;

      //21, 25
      var body = [
        {x:-0.2,y:-0.39},{x:0.39,y:-0.2},{x:0.2,y:0.39},
        {x:-0.59,y:0.39},{x:-0.78,y:-0.2},{x:-0.59,y:-0.98},
        {x:0.39,y:-1.18},{x:1.18,y:-0.2},{x:0.98,y:0.78},
        {x:0,y:1.37},{x:-1.18,y:0.98},{x:-1.76,y:-0.2},
        {x:-1.37,y:-1.37},{x:0,y:-2.16},{x:1.37,y:-1.76},
        {x:2.16,y:-0.2},{x:1.57,y:1.37}
      ];

      for (var i = 0; i < body.length; i++) {
        body[i] = {x: this.p.x + (body[i].x * scale), y: this.p.y + (body[i].y * scale)};
      }

      drawLines(body, getColor('spike'));

      if (this.tp <= 20 || this.tp >= 100) {
        this.v *= -1;
        if (this.f > 1) {
          this.f = 0.991;
        } else {
          this.f = 1.009;
        }
      }

      if (!this.pT.spike.tp || this.tp < this.pT.spike.tp) {
        this.pT.spike.tp = this.tp+0.5;
      }

      return true;
    };
  });

  var Tanker = augment(Enemy, function (base) {
    this.tank = true; this.score = 100;
    this.constructor = function(pT) {
      base.constructor.apply(this, arguments);
    };
    this.split = function(){
      if (this.pT.next) {
        var flip = new Flipper(this.pT.next);
        flip.tp = this.tp;
        flip.v = this.v;
        this.pT.next.inside.push(flip);
        cur_creeps++;
      }
      if (this.pT.prev) {
        var flip = new Flipper(this.pT.prev);
        flip.tp = this.tp;
        flip.v = this.v;
        this.pT.prev.inside.push(flip);
        cur_creeps++;
      }
    }
    this.render = function(){
      base.render.apply(this, arguments);

      var scale = 0.10 + ((100-this.tp)/100) * 0.90

      //52, 43
      var body = [{"x":0,"y":-1.57},{"x":0,"y":-3.92},{"x":3.92,"y":0},{"x":0,"y":-1.57},{"x":1.57,"y":0},{"x":3.92,"y":0},{"x":0,"y":3.73},{"x":1.57,"y":0},{"x":0,"y":1.37},{"x":0,"y":3.73},{"x":-3.73,"y":0},{"x":0,"y":1.37},{"x":-1.37,"y":0},{"x":-3.73,"y":0},{"x":0,"y":-3.92},{"x":-1.37,"y":0},{"x":0,"y":-1.57}];

      for (var i = 0; i < body.length; i++) {
        body[i] = {x: this.p.x + (body[i].x * scale), y: this.p.y + (body[i].y * scale)};
      }

      drawLines(body, getColor('tanker'));

      if (this.tp >= 80 && rand(0,10) > getDiff('flipFire'))  {
        var bb = new BadBullet(this.pT);
        bb.tp = this.tp;
        this.pT.inside.push(bb);
      }

      if (this.tp <= 3) {
        this.split();
        return false;
      }

      return true;
    };
  });

  var Effect = augment(function(){}, function () {
    this.p = null; this.frame = 0;
    this.constructor = function(p) {
      this.p = p;
    };
  });

  var Burst = augment(Effect, function (base) {
    this.totframe = 5; this.spoke = 16; this.circseg = null;
    this.size = 3;
    this.constructor = function(p) {
      base.constructor.apply(this, arguments);
      this.circseg = 2 * Math.PI / 16;
    };
    this.render = function() {

      for(var i = 0; i < this.spoke; i++) {

        var rad = this.circseg * i;
        var co = Math.cos(rad), si = Math.sin(rad);

        scale = this.frame / this.totframe;

        var tmp = {x: this.p.x + co * ((this.p.x+(this.size*scale)) - this.p.x) - si * ((this.p.y+(this.size*scale)) - this.p.y),
          y: this.p.y + si * ((this.p.x+(this.size*scale)) - this.p.x) + co * ((this.p.y+(this.size*scale)) - this.p.y)};

        drawLine(this.p, tmp, getColor('white'));

      }

      this.frame++;
      if (this.frame > this.totframe) {
        return false;
      }
      return true;
    }
  });

  var Explosion = augment(Effect, function (base) {
    this.totframe = 16;
    this.baseFrame = [
      {color: getColor('yellow'), points: [{x: -1.2, y: -1.6},{x: -1,   y: -4},  {x: 0.2,  y: -3.5}]},
      {color: getColor('red'),    points: [{x: 0.2,  y: -3.5},{x: 1.5,  y: -4.2},{x: 1.3,  y: -1.9}]},
      {color: getColor('white'),  points: [{x: 1.3,  y: -1.9},{x: 2.9,  y: -2.8},{x: 2.4,  y: -1.8}]},
      {color: getColor('yellow'), points: [{x: 2.4,  y: -1.8},{x: 3.1,  y: -1.7},{x: 2.8,  y: -1}]},
      {color: getColor('red'),    points: [{x: 2.8,  y: -1},  {x: 4.9,  y: -0.7},{x: 2,    y: 0.8}]},
      {color: getColor('white'),  points: [{x: 2,    y: 0.8}, {x: 2.9,  y: 2.7}, {x: 1.5,  y: 2.2}]},
      {color: getColor('yellow'), points: [{x: 1.5,  y: 2.2}, {x: 1.3,  y: 4},   {x: 0.3,  y: 2.9}]},
      {color: getColor('white'),  points: [{x: 0.3,  y: 2.9}, {x: -0.8, y: 4},   {x: -1.2, y: 2.9}]},
      {color: getColor('red'),    points: [{x: -1.2, y: 2.9}, {x: -1.5, y: 3.1}, {x: -1.3, y: 1.3}]},
      {color: getColor('yellow'), points: [{x: -1.3, y: 1.3}, {x: -3.5, y: 2.1}, {x: -3,   y: 1}]},
      {color: getColor('red'),    points: [{x: -3,   y: 1},   {x: -3.5, y: 0.8}, {x: -2.6, y: 0.1}]},
      {color: getColor('white'),  points: [{x: -2.6, y: 0.1}, {x: -4.2, y: -2.1},{x: -1.2, y: -1.6}]},
    ];
    this.constructor = function(p) {
      base.constructor.apply(this, arguments);
    };
    this.render = function() {
      for (var n = 1 ; n <= (this.frame+1)/2; n++) {
        n = n * 1.15;
        for (var i = 0; i < this.baseFrame.length; i++) {
          var cframe = [];
          for (var j = 0; j < this.baseFrame[i].points.length; j++) {
            cframe.push({x: this.p.x+(this.baseFrame[i].points[j].x * 0.4375 * n), y: this.p.y+(this.baseFrame[i].points[j].y * 0.4375 * n)});
          }
          drawLines(cframe, this.baseFrame[i].color);
        }
      }

      this.frame++;

      if (this.frame > this.totframe) {
        ship.resurrect();
        return false;
      }

      return true;
    }
  });

  //build lanes
  var lane = {
    prev: null, next: null,
    leftOuterPoint: null, leftInnerPoint: null, leftSeg: null,
    outerPoint: null, innerPoint: null, seg: null,
    rightOuterPoint: null, rightInnerPoint: null, rightSeg: null,
    inside: [], bullets: [], spike: null,
    init: function(lOP, lIP, oP, iP, rOP, rIP) {
      var instance = $.extend({}, lane);
      instance.leftOuterPoint  = lOP; instance.leftInnerPoint  = lIP; instance.leftSeg  = seg(lOP, lIP);
      instance.outerPoint      = oP;  instance.innerPoint      = iP;  instance.seg      = seg(oP, iP);
      instance.rightOuterPoint = rOP; instance.rightInnerPoint = rIP; instance.rightSeg = seg(rOP, rIP);
      instance.inside = []; instance.bullets = []; instance.spike = {tp: null};
      return instance;
    },
  }

  for (var j = 0; j < levels.length; j++) {
    for (var i = 0; i < levels[j].outer.length-1; i++) {
      var leftOuter = levels[j].outer[i], rightOuter = levels[j].outer[i+1];
      var outer = {x:(leftOuter.x+rightOuter.x)/2, y:(leftOuter.y+rightOuter.y)/2};

      var leftInner = levels[j].inner[i], rightInner = levels[j].inner[i+1];
      var inner = {x:(leftInner.x+rightInner.x)/2, y:(leftInner.y+rightInner.y)/2};

      var lane_obj = lane.init(leftOuter, leftInner, outer, inner, rightOuter, rightInner);
      if (levels[j].lanes.length) {
        lane_obj.prev = levels[j].lanes[levels[j].lanes.length-1];
        levels[j].lanes[levels[j].lanes.length-1].next = lane_obj;
      }
      lane_obj.i = levels[j].lanes.length;
      levels[j].lanes.push(lane_obj);
    }

    if (levels[j].lanes[levels[j].lanes.length-1].rightOuterPoint.x == levels[j].lanes[0].leftOuterPoint.x &&
      levels[j].lanes[levels[j].lanes.length-1].rightOuterPoint.y == levels[j].lanes[0].leftOuterPoint.y) {

      levels[j].closed = true;
      levels[j].lanes[0].prev = levels[j].lanes[levels[j].lanes.length-1];
      levels[j].lanes[levels[j].lanes.length-1].next = levels[j].lanes[0];
    }

    if (levels[j].dir == null) {
      if (levels[j].lanes[0].leftOuterPoint.y > levels[j].lanes[0].rightInnerPoint.y) {
        levels[j].dir = -1;
      } else {
        levels[j].dir = 1;
      }
    }
  }

  function initLevel() {
    levels[getLevel()].effects = [];
    cur_creeps = 0;
    bullet_count = 0;

    var flips = getDiff('flipper');
    ship_tube = levels[getLevel()].lanes[0];

    for (var i = 0; i < levels[getLevel()].lanes.length; i++) {
      levels[getLevel()].lanes[i].spike.tp = null;
      levels[getLevel()].lanes[i].inside = [];
      levels[getLevel()].lanes[i].bullets = [];
    }

    for (var i = 0; i < flips; i++) {
      //dir, s
      //delay
      var p = {x: rand(-2.5, 2.5), y: rand(-0.25, 0.25)};
      var r = rand(0, Math.PI * 2);
      var s = rand(0.04, 0.12);
      levels[getLevel()].whirlpool.push({type:'flipper', x: p.x, y: p.y, r: r, s: s});
    }

    if (level >= 1) {
      var tanks = getDiff('tank');
      for (var i = 0; i < tanks; i++) {
        //dir, s
        //delay
        var p = {x: rand(-2.5, 2.5), y: rand(-0.25, 0.25)};
        var r = rand(0, Math.PI * 2);
        var s = rand(0.04, 0.12);
        levels[getLevel()].whirlpool.push({type:'tanker', x: p.x, y: p.y, r: r, s: s});
      }
    }

    if (level >= 2) {
      var spikes = getDiff('spike');
      for (var i = 0; i < spikes; i++) {
        //dir, s
        //delay
        var p = {x: rand(-2.5, 2.5), y: rand(-0.25, 0.25)};
        var r = rand(0, Math.PI * 2);
        var s = rand(0.04, 0.12);
        levels[getLevel()].whirlpool.push({type:'spiker', x: p.x, y: p.y, r: r, s: s});
      }
    }
  }

  function drawLevel() {
    var color = getColor('tunnel');
    var clevel = levels[getLevel()];

    drawLines(clevel.outer, color);

    drawLines(clevel.inner, color);

    for (var i in clevel.outer) {
      drawLine(clevel.outer[i], clevel.inner[i], color);
    }

  }

  function drawLine(p1, p2, color, width) {
    drawLines([p1, p2], color, width);
  }

  function drawLines(pArr, color, width) {
    if (!color) color = 'hsla(0, 0%, 100%, 1)';
    if (!width) width = 1;

    ctx.beginPath();

    for (var i = 0; i < pArr.length; i++) {
      var p = transformPosition(pArr[i]);
      if (i == 0) {
        ctx.moveTo(p.x, p.y);
      } else {
        ctx.lineTo(p.x, p.y);
      }
    }

    ctx.strokeStyle = color;
    ctx.lineWidth = width / zoom;
    ctx.stroke();
  }

  function drawDot(x, y, color) {
    var p = transformPosition({x:x,y:y});
    ctx.fillStyle=color;
    ctx.fillRect(p.x-1.5/2,p.y-1.5/2,1.5,1.5);
  }

  function drawImage(image, p, width, height) {
    p = transformPosition(p);
    var width = width * canvas.width/100, height = height * canvas.height/100;
    ctx.drawImage(image, p.x-width/2, p.y-height/2, width, height);
  }

  function getNearestTube(p) {
    var distances = [];
    for (var i = 0; i < levels[getLevel()].lanes.length; i++) {
      var v = levels[getLevel()].lanes[i].outerPoint,
       w = levels[getLevel()].lanes[i].innerPoint;
      distances.push([i, distToSegment(p, v, w)]);
    }
    distances.sort(function(a,b){
      if (a[1] < b[1]) return -1;
      else if (a[1] > b[1]) return 1;
      return 0;
    });
    return distances[0][0];
  }

  function getColor(thing) {
    for(var i in colours) {
      if (i === thing) return colours[i];
    }
    for(var i in colors) {
      if (level <= i) break; //todo:broken at high level
    }
    return colours[colors[i][thing]];
  }

  function getDiff(thing) {
    mul = 1;
    if (level >= 4 && thing == 'flip' || thing == 'spike' || thing == 'tank' || thing == 'creepLim') {
      mul = 1 + (0.15 * level);
    }
    return diff[thing];
  }

  function getLevel() {
    return level % levels.length;
  }

  function transformPosition(p) {
    return {x: (p.x * canvas.width/100) + 0.5,
        y: (p.y * canvas.height/100) + 0.5};
  }

  function getMousePos(canvas, evt) {
    var rect = canvas.getBoundingClientRect();
    return {
      x: evt.clientX - rect.left,
      y: evt.clientY - rect.top
    };
  }

  function rand(min, max){
    return Math.random() * ( max - min ) + min;
  }

  function rot(op, p, r) {
    var s = Math.sin(r), c = Math.cos(r);
    return {x: op.x + c * (p.x - op.x) - s * (p.y - op.y),
      y: op.y + s * (p.x - op.x) + c * (p.y - op.y)};
  }

  function seg(sp, tp, segs) {
    if (!segs) segs = 100;
    return {x:(tp.x-sp.x)/segs, y:(tp.y-sp.y)/segs};
  }

  function sqr(x) { return x * x }
  function dist2(v, w) { return sqr(v.x - w.x) + sqr(v.y - w.y) }
  function distToSegmentSquared(p, v, w) {
    var l2 = dist2(v, w);
    if (l2 == 0) return dist2(p, v);
    var t = ((p.x - v.x) * (w.x - v.x) + (p.y - v.y) * (w.y - v.y)) / l2;
    if (t < 0) return dist2(p, v);
    if (t > 1) return dist2(p, w);
    return dist2(p, { x: v.x + t * (w.x - v.x),
                      y: v.y + t * (w.y - v.y) });
  }
  function distToSegment(p, v, w) { return Math.sqrt(distToSegmentSquared(p, v, w)); }

  function rto(p, t) {
    return r = Math.atan2(t.y-p.y,t.x-p.x);
  }

  function dirto(p, t) {
    var r = Math.atan2(t.y-p.y,t.x-p.x);
    return {x: Math.cos(r) * 1, y: Math.sin(r) * 1};



    var len = Math.sqrt(dist2(p, t));
    //return {x: (t.x - p.x)/len, y: (t.y - p.y)/len };
    var x = t.x - p.x, y = t.y - p.y;
    return {x: x/len, y: y/len};
    if (x == 0) x = 1;
    if (y == 0) y = 1;
    return { x: x && x/Math.abs(x), y: y && y/Math.abs(y) };
  }

  function find_angle(A,B,C) {
    var AB = Math.sqrt(Math.pow(B.x-A.x,2)+ Math.pow(B.y-A.y,2));
    var BC = Math.sqrt(Math.pow(B.x-C.x,2)+ Math.pow(B.y-C.y,2));
    var AC = Math.sqrt(Math.pow(C.x-A.x,2)+ Math.pow(C.y-A.y,2));
    return Math.acos((BC*BC+AB*AB-AC*AC)/(2*BC*AB));
  }

  function isPointInPoly(poly, pt){
    for(var c = false, i = -1, l = poly.length, j = l - 1; ++i < l; j = i)
        ((poly[i].y <= pt.y && pt.y < poly[j].y) || (poly[j].y <= pt.y && pt.y < poly[i].y))
        && (pt.x < (poly[j].x - poly[i].x) * (pt.y - poly[i].y) / (poly[j].y - poly[i].y) + poly[i].x)
        && (c = !c);
    return c;
  }

  /*function find_angle(p0,p1,p2) {
    var b = Math.pow(p1.x-p0.x,2) + Math.pow(p1.y-p0.y,2),
        a = Math.pow(p1.x-p2.x,2) + Math.pow(p1.y-p2.y,2),
        c = Math.pow(p2.x-p0.x,2) + Math.pow(p2.y-p0.y,2);
    return Math.acos( (a+b-c) / Math.sqrt(4*a*b) );
  }*/

  function curTime() {
    return new Date().getTime();
  }

  var level_time = 25;
  $(document).ready(function() {
    canvas = passed_canvas;
    ctx = canvas.getContext( '2d' );


    canvas.addEventListener('mousemove', function(evt) {
      if (!mouse) mouse = {};
      var p = getMousePos(canvas, evt);
      mouse.x = p.x; mouse.y = p.y;
    }, false);

    canvas.addEventListener('mousedown', function(evt) {
      evt.preventDefault();
      if (!mouse) mouse = {};
      mouse.down = true;
      /*if (evt.button == 0) {
        levels[getLevel()].outer.push({x: Math.round(mouse.x / canvas.width * 10000)/100, y: Math.round(mouse.y / canvas.height * 10000)/100});
      } else {
        levels[getLevel()].inner.push({x: Math.round(mouse.x / canvas.width * 10000)/100, y: Math.round(mouse.y / canvas.height * 10000)/100});
      }*/
    }, false);

    canvas.addEventListener('mouseup', function(evt) {
      if (!mouse) mouse = {};
      mouse.down = false;
    }, false);

    $(canvas).bind("contextmenu",function(){
      return false;
    });

    ship = new Ship(levels[getLevel()].lanes[0]);

    var down_delay = 0; var debug_delay = 500; var debug_c = 0;
    var last_creep_insert = null;
    var level_end = false, level_end_up = false;//, zoom = 1;
    var menu = true;
    hulahoops = function(){

      var start = curTime();
      hula = function() { setTimeout(hulahoops, level_time - (curTime() - start)); };

      if (!bkg) return;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      if (!level_end) {
        var tmp = {x: mouse.x / canvas.width * 100, y: mouse.y / canvas.width * 100};
        drawLine({x: tmp.x-3, y:tmp.y}, {x: tmp.x+3,y:tmp.y});
        drawLine({x: tmp.x, y:tmp.y-3}, {x: tmp.x,y:tmp.y+3});
      }

      if (menu || gameover) {

        $('#quit_and_give_up_link').hide();

        if (menu) {
          ctx.fillStyle = "white";
          ctx.font = "bold 30px Arial";
          ctx.fillText('SpookFest', canvas.width/2 - 80, canvas.height/2 - 80);
        } else {
          ctx.fillStyle = "white";
          ctx.font = "bold 30px Arial";
          ctx.fillText('Gameover', canvas.width/2 - 80, canvas.height/2 - 80);
          ctx.fillStyle = "white";
          ctx.font = "bold 12px Arial";
          ctx.fillText('Last score: ' + scoring.score, canvas.width/2 - 50, canvas.height/2 - 60);
        }

        ctx.font = "bold 30px Arial";

        if (mouse.x >= canvas.width/2 - 140 && mouse.x <= canvas.width/2) {
          if (mouse.y >= (canvas.height/2) - 40 && mouse.y <= canvas.height/2) {
            if (mouse.down) {
              menu = false; gameover = false;
              scoring.score = 0;
              scoring.lives = 3;
              ship.dead = false;
              level = 0;
              initLevel();
              $('#quit_and_give_up_link').show();
            }
            ctx.fillStyle = "grey";
          }
        }

        ctx.fillText('Play', canvas.width/2 - 140, canvas.height/2 - 20);

        ctx.fillStyle = "white";

        if (mouse.x >= canvas.width/2 && mouse.x <= (canvas.width/2) + 140) {
          if (mouse.y >= (canvas.height/2) - 40 && mouse.y <= canvas.height/2) {
            if (mouse.down) {
              $('body').css('overflow', 'initial');
              bkg.remove();
              return;
            }
            ctx.fillStyle = "grey";
          }
        }

        ctx.fillText('Quit', canvas.width/2 + 80, canvas.height/2 - 20);

        hula();
        return;
      }

      if (!level_end) scoring.render();

      if (!level_end && levels[getLevel()].whirlpool.length == 0 && cur_creeps == 0) {
        //var op = transformPosition(levels[getLevel()].origin);
        level_end = true;
        ctx.save();
      }

      if (level_end) {
        var op = transformPosition(levels[getLevel()].origin);

        ctx.translate(op.x, op.y);
        //if (!level_end_up) {
          zoom *= 1.07;
          ctx.scale(1.07, 1.07);
        //} else{
          //zoom -= 0.07;
          //ctx.scale(0.93, 0.93);
        //}
        ctx.translate(-op.x, -op.y);

        if (!level_end_up) {
          if (ship.tp >= 100){
            ship.display = false;
          } else {
            ship.tp += 6;
          }
          if (zoom >= 10) {
            level_end_up = true;
            level++;
            ctx.restore();
            ctx.save();
            zoom = 0.1;
            var op = transformPosition(levels[getLevel()].origin);
            ctx.translate(op.x, op.y);
            ctx.scale(0.1, 0.1);
            ctx.translate(-op.x, -op.y);
            ship.tp = 0;
            ship.display = true;
          }
        } else {
          if (zoom >= 1) {
            ctx.restore();
            zoom = 1;
            level_end = false;
            level_end_up = false;
            initLevel();
          }
        }
      }


      drawLevel();

      /*MOUSE/CREEPS INSIDE TUBE/PLAYER BULLETS/COLLISIONS*/
      for (var i = 0; i < levels[getLevel()].lanes.length; i++) {

        if (levels[getLevel()].lanes[i].spike.tp !== null) {
          if (levels[getLevel()].lanes[i].spike.tp >= 100) {
            levels[getLevel()].lanes[i].spike.tp = null;
          } else {
            var p = {x: levels[getLevel()].lanes[i].outerPoint.x + (levels[getLevel()].lanes[i].seg.x * levels[getLevel()].lanes[i].spike.tp),
                  y: levels[getLevel()].lanes[i].outerPoint.y + (levels[getLevel()].lanes[i].seg.y * levels[getLevel()].lanes[i].spike.tp) };
            drawLine(levels[getLevel()].lanes[i].innerPoint, p, getColor('spike'));
          }
        }

        var v = transformPosition(levels[getLevel()].lanes[i].outerPoint),
         w = transformPosition(levels[getLevel()].lanes[i].innerPoint);

        for (var j = 0; j < levels[getLevel()].lanes[i].inside.length; j++) {
          if (!levels[getLevel()].lanes[i].inside[j].render()) {
            if (!levels[getLevel()].lanes[i].inside[j].notCreep) cur_creeps--;
            var burst = new Burst(levels[getLevel()].lanes[i].inside[j].p);
            levels[getLevel()].effects.push(burst);
            levels[getLevel()].lanes[i].inside.splice(j, 1);
          }
        }

        for (var j = 0; j < levels[getLevel()].lanes[i].bullets.length; j++) {
          if (!levels[getLevel()].lanes[i].bullets[j].render()) {
            levels[getLevel()].lanes[i].bullets.splice(j, 1);
          } else {
            for (var h = 0; h < levels[getLevel()].lanes[i].inside.length; h++) {
              if (levels[getLevel()].lanes[i].inside[h].tp - levels[getLevel()].lanes[i].bullets[j].tp < 1 && !levels[getLevel()].lanes[i].inside[h].fl) {
                levels[getLevel()].lanes[i].bullets.splice(j, 1); bullet_count--;
                if (!levels[getLevel()].lanes[i].inside[h].notCreep) {
                  cur_creeps--;
                  scoring.add(levels[getLevel()].lanes[i].inside[h].score);
                  if (levels[getLevel()].lanes[i].inside[h].tank) {
                    levels[getLevel()].lanes[i].inside[h].split();
                  }
                }
                var burst = new Burst(levels[getLevel()].lanes[i].inside[h].p);
                levels[getLevel()].effects.push(burst);
                levels[getLevel()].lanes[i].inside.splice(h, 1);
                break;
              }
            }
          }
        }

        if (mouse)
          ship.distances.push([i, distToSegment(mouse, v, w)]);
      }

      ship.render();

      if (levels[getLevel()].effects) {
        for (var j = 0; j < levels[getLevel()].effects.length; j++) {
          if (!levels[getLevel()].effects[j].render()) {
            levels[getLevel()].effects.splice(j, 1);
          }
        }
      }

      if (mouse && down_delay++ > 2 && bullet_count < 8 && mouse.down) {
        down_delay = 0;

        var bull = new Bullet(levels[getLevel()].lanes[ship.pT.i]);
        levels[getLevel()].lanes[ship.pT.i].bullets.push(bull);
      }

      //*WHIRLPOOL*/
      ctx.save();
      var op = transformPosition(levels[getLevel()].origin);
      ctx.translate(op.x, op.y);
      for (var i = 0; i < levels[getLevel()].whirlpool.length; i++) {
        ctx.save();
        ctx.rotate(levels[getLevel()].whirlpool[i].r+=levels[getLevel()].whirlpool[i].s);

        if (levels[getLevel()].whirlpool[i].y < 2) {
          levels[getLevel()].whirlpool[i].y += levels[getLevel()].whirlpool[i].s/15;
        }

        if (Math.random() < getDiff('creepProc') && (!last_creep_insert || curTime()-last_creep_insert > getDiff('creepDel')) && cur_creeps < getDiff('creepLim')) {
          //insert creep into tube and delete from whirlpool
          var rotp = rot(levels[getLevel()].origin, {x: levels[getLevel()].origin.x+levels[getLevel()].whirlpool[i].x, y: levels[getLevel()].origin.y+levels[getLevel()].whirlpool[i].y}, levels[getLevel()].whirlpool[i].r);
          levels[getLevel()].whirlpool[i].t = getNearestTube(rotp);

          var hasSpiker = false;
          for (var h = 0; h < levels[getLevel()].lanes[levels[getLevel()].whirlpool[i].t].inside.lenth; h++){
            if (levels[getLevel()].lanes[levels[getLevel()].whirlpool[i].t].inside.spiker) {
              hasSpiker = true;
              break;
            }
          }

          if (!hasSpiker) {
            if (levels[getLevel()].whirlpool[i].type == 'flipper') {
              var flip = new Flipper(levels[getLevel()].lanes[levels[getLevel()].whirlpool[i].t]);
              levels[getLevel()].lanes[levels[getLevel()].whirlpool[i].t].inside.push(flip);
            } else if (levels[getLevel()].whirlpool[i].type == 'spiker') {
              var spike = new Spiker(levels[getLevel()].lanes[levels[getLevel()].whirlpool[i].t]);
              levels[getLevel()].lanes[levels[getLevel()].whirlpool[i].t].inside.push(spike);
            } else if (levels[getLevel()].whirlpool[i].type == 'tanker') {
              var tank = new Tanker(levels[getLevel()].lanes[levels[getLevel()].whirlpool[i].t]);
              levels[getLevel()].lanes[levels[getLevel()].whirlpool[i].t].inside.push(tank);
            }

            levels[getLevel()].whirlpool.splice(i, 1);

            cur_creeps++;
            last_creep_insert = curTime();
          }
        } else {
          drawDot(levels[getLevel()].whirlpool[i].x, levels[getLevel()].whirlpool[i].y, getColor('red'));
        }

        ctx.restore();
      }
      ctx.translate(-op.x, -op.y);
      ctx.restore();

      hula();
    };
    hulahoops();


  });
}