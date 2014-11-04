function sneggfun() {
  $(document).ready(function() {

    init();

    $(window).resize(function(){
      var pos = $('.logo-container').offset();
      segg.css({position:'absolute', left:pos.left + $('.logo-container').width()/2, top:pos.top + ($('.logo-container').height()/2) - 20});
    });

    function init(hide_anim) {

        // js why u no have const
        var LEFT = 1, UP = 2, RIGHT = 3, DOWN = 4;

        //fucking bullshit
        var canvas = $('<div id="sneggfun"></div>').css({position:'absolute',backgroundColor:'black',height:'100%',left:'0',right:'0',zIndex:'100',overflow:'hidden'}),
            snake_bit = '<svg width="20" height="20"><rect x="0" y="0" rx="5" ry="5" width="20" height="20" fill="#AA4643" /></svg>',
            ears = '<svg width="40" height="40"><path d="M 22.418963,15.0624 29.137582,1.9865 35.928447,0.8306 c 0,0 2.119175,3.3712 3.178702,5.0568 0.6929,1.1026 0.566611,3.0422 -0.397349,3.9013 -1.884882,1.6798 -4.182366,1.1667 -5.020902,0.4334 C 33.425021,10.1037 31.836257,8.0958254 31.836257,8.0958254 L 26.683611,14.9178 z" style="fill:#ffffff;fill-opacity:1;stroke:none" /><path d="m 22.907018,14.834151 6.075425,-11.7589885 2.71373,4.717663 -5.308535,6.9268885 z" style="fill:#fcc1bd;fill-opacity:1;stroke:none" /><path d="M 17.673348,14.997256 10.954729,1.9213558 4.1638645,0.76545589 c 0,0 -2.119175,3.37119991 -3.178702,5.05679991 -0.6929,1.1026 -0.566611,3.0422003 0.397349,3.9013003 1.884882,1.6797999 4.182366,1.1666999 5.020902,0.4333999 0.263877,-0.1184 1.8526406,-2.1262749 1.8526406,-2.1262749 L 13.4087,14.852656 z" style="fill:#ffffff;fill-opacity:1;stroke:none" /><path d="M 17.185293,14.769007 11.109868,3.0100183 8.3961381,7.7276811 13.704673,14.65457 z" style="fill:#fcc1bd;fill-opacity:1;stroke:none" /></svg>',
            rectw = '<svg viewBox="0 0 20 20" preserveAspectRatio="none"><rect style="fill:#ac9393;fill-opacity:1;stroke:none" width="10" height="20" x="0" y="0" /></svg>',
            recth = '<svg viewBox="0 0 20 20" preserveAspectRatio="none"><rect style="fill:#ac9393;fill-opacity:1;stroke:none" width="20" height="10" x="0" y="0" /></svg>',
            light_colors = ['#83DDD6', '#8BEAAF', '#F7F396', '#F2C9C9', '#ACA7C4'],
            dark_colors = ['#2B9088', '#2D9855', '#A19C31', '#9D4141', '#43367F'];

        //fucking setup
        if (hide_anim === true) {
          $('body').prepend(canvas);
        } else {
          $('body').prepend(canvas.height(0).css({webkitTransition: 'height 1s ease-in-out',
            mozTransition: 'height 1s ease-in-out',
            msTransition: 'height 1s ease-in-out',
            oTransition: 'height 1s ease-in-out',
            transition: 'height 1s ease-in-out',
          }));
        }

        //calculate our grid size (20x20) and offsets placing 0,0 at the center of window
        var w_offset = $(window).width()/2, h_offset = $(window).height()/2, w_step = 20, h_step = 20,
          max_x = Math.floor(w_offset/w_step)-1, min_x = -max_x, max_y = Math.floor(h_offset/h_step)-1, min_y = -max_y,
          grid_size = ((max_x - min_x)+1) * ((max_y - min_y)+1);

        renderBounds();

        // interesting game vars
        var frame_interval = 200, spawn_snegg_probability = (1/50), end_game = false;
        //powerup specific global vars
        var cur_bunnies = 0, rotate_movement = false;

        var t = $('<span style="color:white;font-size:10px;position:absolute;right:15px;top:70px;z-index:100">Use Arrow keys to move<br/></span>');
        t.append($('<div><a>Back to the Sparkfun Arcade</a></div>').css({textAlign:'right',cursor:'pointer'}).click(function(){
          canvas.remove();
          $(document).unbind('keydown');
          $(window).unbind('resize');
          end_game = true;
        })).appendTo(canvas);

        // snegg defs (powerups)
        var snegg_defs = [
          {
            name: 'Snegg',
            icon: '<svg><path d="m 13.4476,2.8905 c 2.3215,3.5671 2.8633,6.0024 2.8094,8.2390 -0.1023,4.2535 -2.0736,8.4715 -6.3450,8.6494 C 6.0077,19.9416 3.3753,15.3516 3.4408,11.1927 3.5029,8.1375 4.6756,5.2938 6.5028,2.5748 9.8259,-1.5250 11.6979,0.6728 13.4476,2.8905 z"/><path d="M 13.612052,6.1562269 9.7418319,9.9999996 5.9644963,6.1874771 3.8900578,8.2812394 C 3.6535883,9.231518 3.50753,10.195613 3.4875548,11.187507 c -0.00697,0.446721 0.00897,0.893513 0.061923,1.343756 L 5.933534,10.125 l 3.8082975,3.843773 3.8702205,-3.937523 2.445981,2.531266 c 0.05919,-0.47323 0.112413,-0.957626 0.123848,-1.437509 0.01934,-0.810018 -0.02553,-1.6560512 -0.216734,-2.5625159 L 13.612052,6.1562269 z"/></svg>',
            timeout: 30000,
            onSpawn: function(snegg_index) {
              sneggs[snegg_index].el.find('path').attr('fill', dark_colors[rand(dark_colors.length)]);
              sneggs[snegg_index].el.find('path').last().attr('fill', light_colors[rand(light_colors.length)]);
            },
            onCollision: function(snegg_index) {
              score_holder.add(sneggs[snegg_index].timeout - (new Date().getTime() - sneggs[snegg_index].start));
              removeSnegg(snegg_index);
              snake.eat();
            },
          },
          {
            name: 'Doge',
            maxInstances: 1, curInstances: 0,
            spawnable: true,
            icon: '<div style="height:20px;width:20px;background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH3gQCACAfo+WQ4wAAAB1pVFh0Q29tbWVudAAAAAAAQ3JlYXRlZCB3aXRoIEdJTVBkLmUHAAAEcklEQVQ4yyWSy48kdQHHP79HVXV1d01Pd8+jZ2dmWXZYlhWUaAQSyBIjXPCgiYkHLx6MVxOjxsQbN+O/oBfOm3Ax0YAhAQ/IYkSEsLzMAtkXuzO7/ajuqur6PT3M9ZvP5ZvPR3z0xs+jFA4pMrwz5KpE621Obi7I9r9Lb/scadYnCgABAEJADMR2iTM1aX+HiIAIEnMfGdYoadgcH7J55nF6432Wd7/GLW6jdXYKIxBCIARAJJoVn/7zVd698me8WZ/uUqB3Dr9JkiQED1I6QNAuSwiW5fX3GZ77DkmxA0KCUEDELe/yv6t/YT5rqMo1tpqhOj2IAe2MYXFyk0XpKcsa21RsDbYZ7Y5J8w7Lj66ASJBpQZQakRRc//gadW25fduSpxpTleRbp5f1O2/9Gx8lQiZ085TtzT3GwyFGHLI4vo6fz9C9ATImiGiY3/mEu1/V9EYFb1+7xw+f20VlKYQIRLTUXbIsY2c44OzBQ9j1mqAytO7QVjUxG9PIIdFHshjIJxPOqiV//ccd9nYLJocD8sEOkYBAoDvFFnl/yN7uBoGEN9/7nK29A3aLOU1dMTz3JLo7op7doplNKYo+k7MFP/q+Y7VoKY8f4Jd3UZ0LxOiR+0+8xN75p8jPfAu59Siv/WvKO+9+QE+2DPYfwYmcL2/O+OrWjEQLWmsxaCZHl9jb71Mdl6xu/AeiAyRaKoUWLWrjArNrf+NnPzjP+S1B2tsksOCVK69zEh/i729d5dc/vcTlp49QEpp1TVIMOTia0jZTiKd5au8MnfEY6xtiNuLMgSZqSVABYsmL3/sGVz8z/OYXL/Di5YukxYT1ao4CXH3CcL/BO0twFpEodD2/T9jM+OzTKb/67Z+IwLcfP+R3v/wJyjkm2QY/PpQY57B00Ton6Wu8a0gkxFCh2ilmcYts6wgthMeZwLxsqVYrHsxKRpsFxyvFQG2AcPjuHqmUeGfxbUsMDte2+KbGVks0EVN+TTp6GB1CIEk0s3s32J+MGY82ef7y08wfHCPTkrRTQF0hhEdISTA1fl0SgoPoqcsH5FlCU96n7yxaESF49nd6BO8oyxXXPvgvT5wVfFHOWLeexx47QkSLTHqIYEi7GwghaJd3kIAxa1K7JniD+sMff/9yNDXdXNFLBc5YlAy8/+F1FtOSixfPsdHVJEkHqVOkzhDREewSO7+JraZEb1AqkvW20Pg1UkVEsDz7zAUuPTIkeo93NVppkBrnWkKwJCohybqY1QmmvIFb3kN4y7oyaJ3hylvIaBtwhtjOUUIw6Cd0u5ok7eKiwFuDIJIPdlFph3Z1grMNSljwjuqkQmcJKlV4Z9GhqXBuTTQVzjli1IhokNGQRIcnEomYegbRE1EkChyn1tNhTndySNbfRnZHaGcNMUZEZwOxnNI2M2y7xoeINYYQBX4doV7RK3ZIFKchi4TO9sNkvTGqcypJZT20NZZOr0AECW1At47KLLFtg/WA6tAfHZB3N2ibCiToPCXJC7LeJsSIRyNcja1m/B8eG0FphFmNtgAAAABJRU5ErkJggg==);"></div>',
            timeout: 30000,
            probability: 1/10,
            speedBoost: 75,
            words: ['wow!', 'wow!', 'wow!', 'wow!', 'wow!', 'such points', 'good egg','such good', 'so amaze', 'many points', 'many speed', 'very unstoppable', 'such playing', 'very good', 'points', 'very gaming', 'such player', 'concern' ,'bewildered','many game', 'very scores', 'so scoring', 'so hot right now', 'such playing', 'very neat' ,'such natural', 'such meme', 'so shibe'],
            onCollision: function(snegg_index) {
              this.spawnable = false;
              frame_interval -= this.speedBoost;
              score_holder.add(100000);
              var that = this, framecount = 0;
              var dogerval = setInterval(function(){
                framecount = ((framecount + 1) % 5);
                $(canvas).find('.doge' + framecount).remove();
                var pos = makeCoords();
                var doge = {el:$('<span></span>').addClass('doge doge' + framecount).text(that.words[rand(that.words.length)]).css({position:'absolute',fontFamily:'Comic Sans MS',fontWeight: 'bold',color: 'rgb(' + rand(255) + ', ' + rand(255) + ', ' + rand(255) + ')'}).appendTo(canvas),x:pos.x,y:pos.y};
                render(doge);
              }, 200);
              setTimeout(function(){
                clearInterval(dogerval);
                $(canvas).find('.doge').remove();
                frame_interval += that.speedBoost;
                that.spawnable = true;
              }, 30000);
              removeSnegg(snegg_index);
            },
          },
          {
            name: 'Bunny Captive', // extra spawnsnegg attempt for each bunny per frame
            icon: '<svg width="20" height="20"><g transform="translate(0,-1032.3622)"><path style="fill:#ffffff;fill-opacity:1;stroke:none" d="m 12.342802,1039.7354 -0.03157,0.5682 c -0.05741,0.142 -0.03399,0.2724 -0.284105,0.4419 -0.582315,0.076 -0.584044,0.2862 -0.820749,0.442 -0.383036,0.466 -0.574256,0.226 -0.820749,0.1894 -0.9338785,-0.4409 -2.1424765,-1.0454 -4.9560615,0 -1.142374,0.7283 -2.168729,1.5147 -2.809486,2.4938 -0.187162,0.2594 -0.346014,0.5513 -0.505077,1.3574 -0.230683,0.7841 -0.264695,1.6481 -0.159751,2.5161 -0.04013,0.3266 -0.09372,0.4712 -0.28219,0.2934 -0.32071,-0.4217 -0.486174,-0.3555 -0.599778,-0.1263 -0.35566894,0.3273 -0.17333094,0.8615 -0.17665694,1.3242 -0.659272,0.381 -0.271036,0.5233 -0.04814,0.9375 0.31145694,0.2957 0.60973094,0.5955 0.95084794,0.8319 0.308947,0.2975 0.6992,0.5213 1.388959,0.4735 l 1.241956,0.3176 c 0.454131,0.2727 1.478959,0.2374 2.208122,0.3176 l 2.493814,0.1282 c 0.358194,-0.058 0.764607,0.094 1.0956095,-0.2899 0.145506,-0.097 0.351572,-0.1516 0.126269,-0.5051 l -0.284105,-0.3788 c -0.2271985,-0.5602 0.161412,-0.3617 0.310256,-0.4512 0.281778,0.1492 0.511187,-0.066 0.889299,-0.2432 0.512956,-0.2019 0.790338,-0.1879 0.947019,-0.063 0.198938,0.1861 -0.02384,0.1805 0.757614,0.6314 0.442044,0.2798 0.65023,0.7 1.357392,0.8207 0.712408,-0.013 1.505224,0.1019 2.08344,-0.1262 0.51758,-0.1512 0.619848,-0.4001 0.126269,-0.7892 l -1.136422,-0.7576 c -0.554595,-0.4679 -0.527716,-1.0421 -0.04464,-1.2458 0.650426,0.064 1.248214,-0.2033 1.338901,-1.4059 l 0.315673,-1.3258 c 0.0712,-0.098 0.08091,-0.4631 0.06313,-0.947 0.07464,-0.332 -0.09631,-0.5411 -0.252538,-0.7577 l 0.284105,-0.7576 c 0.642373,0.091 1.175881,-0.02 1.609931,-0.3156 0.208867,-0.1959 0.470799,-0.056 0.599778,-0.7577 l 0.347237,-0.4419 c 0.309725,-0.4847 -0.09436,-0.8624 -0.347233,-1.2627 -0.171615,-0.2112 -0.358179,-0.3775 -0.473509,-0.7576 -0.08217,-0.3459 -0.673435,-1.0522 -1.010153,-1.5784 -0.65743,-0.4956 -1.297922,-0.6694 -1.925603,-0.5997 -0.0044,-0.6524 -0.03748,-1.3048 -0.189404,-1.9572 -0.304961,-0.8567 -0.240438,-1.4319 -1.104854,-2.7148 -0.104207,-0.2977 -0.296105,-0.4996 -0.726047,-0.4419 -0.63066,-0.03 -0.481017,0.4713 -0.492001,0.8634 0.06724,0.2731 0.147274,0.6153 -0.360316,0.084 l -0.599778,-0.8523 c -0.732955,-0.639 -0.808603,-0.3576 -1.167989,-0.4736 -0.51325,0.057 -0.403033,0.3217 -0.441941,0.5367 l 0.03157,2.2728 c 0.04974,1.3548 0.557147,1.451 0.915451,1.9572 l 0.599778,1.2943 z" /></g></svg>',
            timeout: 12500,
            probability: 1/15,
            prison: $('<div></div>').css({position:'absolute',right:'25px',top:'50px'}).appendTo(canvas),
            onCollision: function(snegg_index) {
              this.probability = this.probability - (this.probability/4);
              this.prison.append(this.icon);
              score_holder.add(200000);
              cur_bunnies++;
              removeSnegg(snegg_index);
            },
          },
          {
            name: 'Cross',
            maxInstances: 2, curInstances: 0,
            icon: '<svg><g transform="translate(0,-12)"><path style="fill:none;stroke:#008bff;stroke-width:1px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1" d="M 18.628343,30.642341 1.4839528,13.466377" /><path style="fill:none;stroke:#008bff;stroke-width:1px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1" d="M 1.4681664,30.642341 18.612556,13.466377" /></g></svg>',
            timeout: 30000,
            probability: 1/7,
            onCollision: function(snegg_index){
              score_holder.add(1000);
              if (!rotate_movement) {
                rotate_movement = true;
                setTimeout(function(){
                  rotate_movement = false;
                }, 30000);
              }
              removeSnegg(snegg_index);
            },
          },
          {
            name: 'Bean Basket',
            icon: '<svg height="20" width="20"><g transform="translate(0,-12)"><path style="fill:#d38d5f;fill-opacity:1;stroke:none" d="m 1.7365405,24.643379 c 0.7998611,2.146995 0.5514325,6.783679 2.3995832,6.440986 l 11.6190333,-0.06315 c 1.960489,0.259577 1.620771,-4.241744 2.431157,-6.378215 z" /><path style="fill:none;stroke:#d38d5f;stroke-width:1px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1" d="M 3.8203892,24.769672 4.1361239,15.865955 C 3.981551,12.410919 15.851086,11.995822 15.786729,16.023823 l 0.473602,8.808996" /></g></svg>',
            bean: '<svg height="20" width="20"><path d="m 3.8519625,4.702657 c -0.097332,1.8320609 3.6841795,2.9195839 1.1524314,11.224366 -1.1502288,2.396255 2.11153,4.320488 4.6617111,3.57832 5.017991,-1.460364 8.118982,-5.760584 7.162551,-11.1243775 C 16.423509,6.1088473 15.932954,4.0000734 12.881973,1.7505382 11.323861,0.60171799 3.2279607,-1.1123177 3.8519625,4.702657 z" /></svg>',
            probability: 1/11,
            collisions: 0,
            timeout: 30000,
            onCollision: function(snegg_index){
              score_holder.add(200000);
              this.collisions++;

              var beans = (this.collisions + 5 + gameObjCount() > grid_size) ? grid_size - gameObjCount() : (this.collisions+5);

              for(var i = 0; i < beans; i++) {
                var pos = getAvailCoord();
                sneggs.push(render({
                  name: 'Jellybean',
                  el: $(this.bean).attr('fill', light_colors[i % light_colors.length]).css({position:'absolute'}).appendTo(canvas),
                  timeout: 300000,
                  start: new Date().getTime(),
                  def: 0, x:pos.x, y:pos.y,
                }));
              }

              removeSnegg(snegg_index);
            }
          }
        ];


        $('#video_container,#videoMenu').css({zIndex:1}); //videopage hack
        $(canvas).height($(window).height());

        //game obs
        var snake = {
          head: null,
          tail: null,
          ears: {el:$(ears).css({position:'absolute',zIndex:100}).appendTo(canvas),x:0,y:0,r:0},
          length: 0,
          eaten: false,
          direction: UP,
          eat: function() {
            this.eaten = true;
          },
          grow: function() {
            if (this.head === null) {
              this.head = this.bit();
              this.head.x = 0; this.head.y = 0;
              this.tail = this.head;
              render(this.head);
              this.length++;
            } else {
              var move = this.move();
              this.tail.next = this.bit();
              this.tail.next.x = this.tail.x + (this.tail.prev === null ? -move.x : this.tail.x - this.tail.prev.x); //attempting to place the new tail bit
              this.tail.next.y = this.tail.y + (this.tail.prev === null ? -move.y : this.tail.y - this.tail.prev.y); //in the direction of the snake
              this.tail.next.prev = this.tail;
              this.tail = this.tail.next;
              render(this.tail);
              this.length++;
            }
          },
          move: function() {
            if (!rotate_movement) {
              switch(snake.direction)
              {
                case LEFT:  return {x: -1, y:  0};
                case UP:    return {x:  0, y: -1};
                case RIGHT: return {x:  1, y:  0};
                case DOWN:  return {x:  0, y:  1};
              }
            } else {
              //-- cross powerup --
              switch(snake.direction)
              {
                case LEFT:  return {x: -1, y:  1};
                case UP:    return {x: -1, y: -1};
                case RIGHT: return {x:  1, y: -1};
                case DOWN:  return {x:  1, y:  1};
              }
              //-- cross powerup --
            }
          },
          bit: function() {
            return {el:$(snake_bit).css({position:'absolute'}).appendTo(canvas),x:null,y:null,r:0,prev:null,next:null};
          },
          body: function(f) {
            var bit = this.head.next;
            while (bit !== null) {
              f(bit); bit = bit.next;
            }
          },
          ends: function(f) {
            f(this.head); f(this.tail);
          },
          each: function(f) {
            var bit = this.head;
            while (bit !== null) {
              f(bit); bit = bit.next;
            }
          },
        }, sneggs = [];
        for (var i = 0; i < 4; i++) snake.grow();

        spawnSnegg();
        spawnSnegg();
        spawnSnegg();

        //score holder
        var score_holder = {
          points: 0,
          el: $('<span>0</span>').css({color:'white',fontSize:'20px',float:'right',marginRight:'25px',marginTop:'20px',zIndex:100}).appendTo(canvas),
          add: function(pts){
            this.points += pts;
            this.update();
          },
          update: function(){
            this.el.text(this.points);
          }
        };

        //msn messenger
        var msn = {
          holder: $('<div></div>').css({display:'inline-block',zIndex:100,color:'white',fontSize:'30px',textAlign:'center'}).appendTo(canvas),
          timeout: 2000,
          msgs: [],
          active: false,
          msg: function(msg, timeout){
            if (typeof timeout == 'undefined') timeout = this.timeout;
            this.msgs.push([msg, timeout]);
            this.disp();
          },
          disp: function(){
            if (!this.active) {
              var msg = this.msgs.shift(), that = this;
              this.active = true;
              this.holder.append(msg[0]).css({position: 'absolute', top: ($(window).height()/2)-(this.holder.height()/2), left: ($(window).width()/2)-(this.holder.width()/2)});
              if (msg[1] > 0) {
                setTimeout(function(){
                  that.holder.html('');
                  that.active = false;
                  if (that.msgs.length) {
                    that.disp();
                  }
                }, msg[1]);
              }
            }
          }
        };

        //controls
        var input = null;

        eggloops = function(){
          var start = new Date().getTime();
          loop = function() { setTimeout(eggloops, frame_interval - (new Date().getTime() - start)); };

          try {

            if (input) { //assign snake direction as long as it's not doubling back
              if (input == LEFT  && snake.direction != RIGHT) snake.direction = LEFT;  else
              if (input == UP    && snake.direction != DOWN)  snake.direction = UP;    else
              if (input == RIGHT && snake.direction != LEFT)  snake.direction = RIGHT; else
              if (input == DOWN  && snake.direction != UP)    snake.direction = DOWN;
            }

            input = null; // clear inputs

            var move = snake.move();

            var head = snake.bit(); //to move we create a new node, put it on the top
            head.x = snake.head.x + move.x; // then remove the tail
            head.y = snake.head.y + move.y;
            head.next = snake.head;
            snake.head.prev = head;
            snake.head = head;
            snake.head.r = (move.x !== 0 && move.y !== 0) ? 45 : 0; //diagonal movement applys a rotation

            //ears
            snake.ears.x = snake.head.x-0.5; snake.ears.y = snake.head.y-0.5;
            if (snake.direction == LEFT) { snake.ears.r = -90; } else
            if (snake.direction == UP)   { snake.ears.r = 0;   } else
            if (snake.direction == RIGHT){ snake.ears.r = 90;  } else
            if (snake.direction == DOWN) { snake.ears.r = 180; }
            snake.ears.r -= snake.head.r;

            //loop over sneggs, calling defined functions and collision checking
            for (var i = 0; i < sneggs.length; i++) {
              if (snegg_defs[sneggs[i].def].onFrame) snegg_defs[sneggs[i].def].onFrame(i);
              if (sneggs[i].timeout && sneggs[i].timeout - (new Date().getTime() - sneggs[i].start) <= 0)  {
                removeSnegg(i);
              } else if (snake.head.x == sneggs[i].x && snake.head.y == sneggs[i].y) {
                msn.msg(sneggs[i].name, 1000);
                snegg_defs[sneggs[i].def].onCollision(i);
              }
            }

            if (!snake.eaten) { // if we eat simply don't remove tail
              snake.tail.el.remove();
              snake.tail.prev.next = null;
              snake.tail = snake.tail.prev;
            } else {
              snake.length++;
            }

            render(snake.head);
            render(snake.ears);

            //death
            if (snake.head.x < min_x || snake.head.x > max_x || snake.head.y < min_y || snake.head.y > max_y) {
              throw 'gameover';
            }
            snake.body(function(bit){
              if (snake.head.x == bit.x && snake.head.y == bit.y) {
                throw 'gameover';
              }
            });

            if (!sneggs.length) spawnSnegg();
            for (i = 0; i < cur_bunnies+1; i++) {
              if (Math.random() <= spawn_snegg_probability) spawnSnegg();
            }

            snake.eaten = false;
            if (!end_game) loop();

          } catch (err) {
            if (err == 'gameover') {
              var css = {cursor:'pointer',fontSize:'12px',backgroundColor:'#e6321e',padding:'3px',float:'left',width:'40%',textAlign:'center'},
                retry = $('<span></span>').css(css).text('Retry').click(function(){
                  canvas.remove();
                  $(document).unbind('keydown');
                  $(window).unbind('resize');
                  init(true);
                }),
                quit = $('<span></span>').css(css).css({float:'right'}).text('Quit').click(function(){
                  $(document).unbind('keydown');
                  $(window).unbind('resize');
                  canvas.remove();
                });
              msn.msg($('<div>Gameover</div>').add(retry).add(quit), 0);
            }
          }

        };
        eggloops();

        function render(obj) {
          obj.el.css({left: (w_offset + (obj.x * w_step)) - 10, top: (h_offset + (obj.y * h_step)) - 10});
          obj.el.css({msTransform:'rotate('+ obj.r +'deg)',webkitTransform:'rotate('+ obj.r +'deg)',transform:'rotate('+ obj.r +'deg)'});
          return obj;
        }

        function renderBounds(){
          $(rectw).css({position:'absolute',top:0,left:0}).attr('width', 20).attr('height', $(window).height()).appendTo(canvas);
          $(rectw).css({position:'absolute',top:0,right:0}).attr('width', 20).attr('height', $(window).height()).appendTo(canvas).find('rect').attr('x', '10');
          $(recth).css({position:'absolute',top:0,left:0}).attr('height', 20).attr('width', $(window).width()).appendTo(canvas);
          $(recth).css({position:'absolute',bottom:0,left:0}).attr('height', 20).attr('width', $(window).width()).appendTo(canvas).find('rect').attr('y', '10');
        }

        function spawnSnegg(curse){
          var pos = getAvailCoord();

          var def = getAvailSneggDef();
          if (snegg_defs[def].maxInstances) snegg_defs[def].curInstances++;

          var snegg = {
            name: snegg_defs[def].name,
            el: $(snegg_defs[def].icon).css({position:'absolute'}).appendTo(canvas),
            timeout: snegg_defs[def].timeout,
            start: new Date().getTime(),
            def: def, x:pos.x, y:pos.y,
          };

          sneggs.push(render(snegg));

          if (snegg_defs[def].onSpawn) snegg_defs[def].onSpawn(sneggs.indexOf(snegg));
        }

        function removeSnegg(snegg_index) {
          if (snegg_defs[sneggs[snegg_index].def].maxInstances) snegg_defs[sneggs[snegg_index].def].curInstances--;
          if (snegg_defs[sneggs[snegg_index].def].onRemove) snegg_defs[sneggs[snegg_index].def].onRemove(snegg_index);
          sneggs[snegg_index].el.remove();
          sneggs.splice(snegg_index,1);
        }

        function getAvailSneggDef() {
          var def = 0;

          for (var i = 1; i < snegg_defs.length; i++) {
            if (Math.random() <= snegg_defs[i].probability) {
              def = i;
              break;
            }
          }

          if (snegg_defs[def].spawnable === false) return getAvailSneggDef();
          if (snegg_defs[def].maxInstances && snegg_defs[def].curInstances >= snegg_defs[def].maxInstances) return getAvailSneggDef();

          return def;
        }

        function getAvailCoord() {
          if (gameObjCount() >= grid_size) {
            throw new Exception('Gameoverr');
          }

          var pos = makeCoords();

          for (var i = 0; i < sneggs.length; i++) {
            if (sneggs[i].x == pos.x && sneggs[i].y == pos.y) return getAvailCoord();
          }

          var taken_starring_liam_neeson = false;
          snake.each(function(bit){
            if (bit.x == pos.x && bit.y == pos.y) return (taken_starring_liam_neeson = true);
          });
          if (taken_starring_liam_neeson) return getAvailCoord();

          return pos;
        }

        function gameObjCount() {
          return (sneggs.length + snake.length);
        }

        function makeCoords() {
          return {x: rand(min_x, max_x), y: rand(min_y, max_y)};
        }

        function rand(min, max) {
          if (max) {
            return Math.floor(Math.random() * (max - min + 1)) + min;
          } else {
            return Math.floor(Math.random() * min);
          }
        }

        $(document).keydown(function (e) {
          var k = null;
          switch(e.keyCode)
          {
            case 32: //space
              //e.preventDefault();
              //fire = 1;
            break;
            case 37: //left
              e.preventDefault();
              k = LEFT;
            break;
            case 38: //up
              e.preventDefault();
              k = UP;
            break;
            case 39: //right
              e.preventDefault();
              k = RIGHT;
            break;
            case 40: //down
              e.preventDefault();
              k = DOWN;
            break;
          }
          if (input === null) {
            input = k;
          }
        });

        $(window).resize(function(){
          w_offset = $(window).width()/2; h_offset = $(window).height()/2;
          $(canvas).height($(window).height());
          max_x = Math.floor(w_offset/w_step)-1;
          min_x = -max_x;
          max_y = Math.floor(h_offset/h_step)-1;
          min_y = -max_y;
          grid_size = ((max_x - min_x)+1) * ((max_y - min_y)+1);
          for (var i = 0; i < sneggs.length; i++) {
            render(sneggs[i]);
          }
          snake.each(function(bit){ render(bit); });
          renderBounds();
        });

    }
  });
}