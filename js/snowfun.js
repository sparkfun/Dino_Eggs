/*  Snowfall jquery plugin

    ====================================================================
    LICENSE
    ====================================================================
    Licensed under the Apache License, Version 2.0 (the "License");
    you may not use this file except in compliance with the License.
    You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

       Unless required by applicable law or agreed to in writing, software
       distributed under the License is distributed on an "AS IS" BASIS,
       WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
       See the License for the specific language governing permissions and
       limitations under the License.
    ====================================================================

    Version 1.51 Dec 2nd 2012
    // fixed bug where snow collection didn't happen if a valid doctype was declared.

    Version 1.5 Oct 5th 2011
    Added collecting snow! Uses the canvas element to collect snow. In order to initialize snow collection use the following

    $(document).snowfall({collection : 'element'});

    element = any valid jquery selector.

    The plugin then creates a canvas above every element that matches the selector, and collects the snow. If there are a varrying amount of elements the
    flakes get assigned a random one on start they will collide.

    Version 1.4 Dec 8th 2010
    Fixed issues (I hope) with scroll bars flickering due to snow going over the edge of the screen.
    Added round snowflakes via css, will not work for any version of IE. - Thanks to Luke Barker of http://www.infinite-eye.com/
    Added shadows as an option via css again will not work with IE. The idea behind shadows, is to show flakes on lighter colored web sites - Thanks Yutt

    Version 1.3.1 Nov 25th 2010
    Updated script that caused flakes not to show at all if plugin was initialized with no options, also added the fixes that Han Bongers suggested

    Developed by Jason Brown for any bugs or questions email me at loktar69@hotmail
    info on the plugin is located on Somethinghitme.com

    values for snow options are

    flakeCount,
    flakeColor,
    flakeIndex,
    minSize,
    maxSize,
    minSpeed,
    maxSpeed,
    round,      true or false, makes the snowflakes rounded if the browser supports it.
    shadow      true or false, gives the snowflakes a shadow if the browser supports it.

    Example Usage :
    $(document).snowfall({flakeCount : 100, maxSpeed : 10});

    -or-

    $('#element').snowfall({flakeCount : 800, maxSpeed : 5, maxSize : 5});

    -or with defaults-

    $(document).snowfall();

    - To clear -
    $('#element').snowfall('clear');


Based on https://github.com/loktar00/JQuery-Snowfall */

(function() {
    var lastTime = 0;
    var vendors = ['webkit', 'moz'];
    for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
        window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
        window.cancelAnimationFrame =
          window[vendors[x]+'CancelAnimationFrame'] || window[vendors[x]+'CancelRequestAnimationFrame'];
    }

    if (!window.requestAnimationFrame)
        window.requestAnimationFrame = function(callback, element) {
            var currTime = new Date().getTime();
            var timeToCall = Math.max(0, 16 - (currTime - lastTime));
            var id = window.setTimeout(function() { callback(currTime + timeToCall); },
              timeToCall);
            lastTime = currTime + timeToCall;
            return id;
        };

    if (!window.cancelAnimationFrame)
        window.cancelAnimationFrame = function(id) {
            clearTimeout(id);
        };
}());

(function($){
    $.snowfall = function(element, options){
        var defaults = {
                flakeCount : 35,
                flakeColor : '#ffffff',
                flakeIndex: 999999,
                minSize : 1,
                maxSize : 2,
                minSpeed : 1,
                maxSpeed : 5,
                round : false,
                shadow : false,
                deviceorientation : false
            },
            options = $.extend(defaults, options),
            random = function random(min, max){
                return Math.round(min + Math.random()*(max-min));
            };

            $(element).data("snowfall", this);

            function Score() {
              this.points = 0;
              this.element = $('<div></div>').css({position:'fixed',color:'#F03528',top:'25px',right:'25px',fontWeight:'bold',fontSize:'22px'}).text(this.points);

              $('body').append(this.element);
              //throw some info on it on it
              $('body').append($('<div></div>').css({position:'fixed',color:'grey',top:'50px',right:'25px'}).text('Use h/l to move and space to shoot!'));

              this.update = function(){
                this.element.text(this.points);
              }

            }

            function Ship(_x, _y) {
              this.x = _x;
              this.y = _y;
              this.element = $('<div></div>').addClass('sfe-icon-flame')
                .css({fontSize:'36px',width:'25px',height:'36px',position:'fixed',color:'#F03528',bottom:'25px'});

              $('body').append(this.element);

              this.update = function() {
                this.element.css({left:this.x});
              }
            }

            function Lazor(_x, _y) {
              this.x = _x;
              this.y = _y;
              this.element = $('<div></div>').css({position:'fixed',width:'2px',height:'10px',backgroundColor:'blue'});
              $('body').append(this.element);

              this.update = function() {
                this.y += 5;

                this.element.css({left: this.x, bottom:this.y});

                var lpos = this.element.offset();

                for( i = 0; i < flakes.length; i += 1){
                    if (lpos.left >= flakes[i].x && lpos.left <= flakes[i].x+flakes[i].size) {
                      if (lpos.top >= flakes[i].y && lpos.top <= flakes[i].y+flakes[i].size) {
                        //collision
                        this.element.remove();
                        flakes[i].reset();
                        hit(flakes[i].points, lpos.left, lpos.top);
                        return false;
                      }
                    }
                }

                if(lpos.top <= 0){
                  this.element.remove();
                  return false;
                }

                return true;
              }

            }

            // Snow flake object
            function Flake(_x, _y, _size, _speed, _id){
                // Flake properties
                this.id = _id;
                this.x  = _x;
                this.y  = _y;
                this.size = _size;
                this.speed = _speed;
                this.step = 0;
                this.stepSize = random(1,10) / 100;

                this.points = Math.floor((this.speed * (this.stepSize * 100)) * 100);

                var flakeMarkup = null;

                if(options.image){
                    flakeMarkup = $(document.createElement("img"));
                    flakeMarkup[0].src = options.image;
                }else{
                    flakeMarkup = $(document.createElement("div"));
                    flakeMarkup.css({'background' : options.flakeColor});
                }

                flakeMarkup.attr({'class': 'snowfall-flakes', 'id' : 'flake-' + this.id}).css({'width' : this.size, 'height' : this.size, 'position' : 'absolute', 'top' : this.y, 'left' : this.x, 'fontSize' : 0, 'zIndex' : options.flakeIndex});

                if($(element).get(0).tagName === $(document).get(0).tagName){
                    $('body').append(flakeMarkup);
                    element = $('body');
                }else{
                    $(element).append(flakeMarkup);
                }

                this.element = document.getElementById('flake-' + this.id);

                // Update function, used to update the snow flakes, and checks current snowflake against bounds
                this.update = function(){
                    this.y += this.speed;

                    if(this.y > (elHeight) - (this.size  + 6)){
                        this.reset();
                    }

                    this.element.style.top = this.y + 'px';
                    this.element.style.left = this.x + 'px';

                    this.step += this.stepSize;

                    this.x += Math.cos(this.step);

                    if(this.x > (elWidth) - widthOffset || this.x < widthOffset){
                        this.reset();
                    }
                }

                // Resets the snowflake once it reaches one of the bounds set
                this.reset = function(){
                    this.y = 0;
                    this.x = random(widthOffset, elWidth - widthOffset);
                    this.stepSize = random(1,10) / 100;
                    this.size = random((options.minSize * 100), (options.maxSize * 100)) / 100;
                    this.speed = random(options.minSpeed, options.maxSpeed);
                }
            }

            function hit(pts, x, y) {
              score.points += pts;
              var alert = $('<span></span>').css({position:'absolute',top:y,left:x,color:'#f03528',fontWeight:'bold'}).text(pts);
              $('body').append(alert);
              setTimeout(function(){
                alert.fadeOut();
              }, 2500);
            }

            // local vars
            var flakes = [],
                lazers = [],
                flakeId = 0,
                i = 0,
                elHeight = $(element).height(),
                elWidth = $(element).width(),
                widthOffset = 0,
                snowTimeout = 0;

            if (options.fun){
              var ship = new Ship(elWidth/2, 25),
              score = new Score();

              //hotkey timeouts
              var lefttimeout = null, righttimeout = null, spacetimeout = null;
              $('body').append('')
              $('body').keydown(function(e){
                if ($(e.target).is('input, textarea')) {
                    return;
                }
                switch(e.keyCode)
                {
                  case 72:
                    e.preventDefault();
                    if (!lefttimeout) {
                      lefttimeout = setInterval(function(){
                        ship.x -= 5;
                      }, 25);
                    }
                  break;
                  case 76:
                    e.preventDefault();
                    if (!righttimeout) {
                      righttimeout = setInterval(function(){
                        ship.x += 5;
                      }, 25);
                    }
                  break;
                  case 32:
                    e.preventDefault();
                    if (lazers.length < 5) {
                      lazers.push(new Lazor(ship.x + 10, 50));
                    }
                  break;
                }
              }).keyup(function(e){
                switch(e.keyCode)
                {
                   case 72:
                    clearTimeout(lefttimeout);
                    lefttimeout = null;
                  break;
                  case 76:
                    clearTimeout(righttimeout);
                    righttimeout = null;
                  break;
                }
              });
            }


            // This will reduce the horizontal scroll bar from displaying, when the effect is applied to the whole page
            if($(element).get(0).tagName === $(document).get(0).tagName){
                widthOffset = 25;
            }

            // Bind the window resize event so we can get the innerHeight again
            $(window).bind("resize", function(){
                elHeight = $(element)[0].clientHeight;
                elWidth = $(element)[0].offsetWidth;
                console.log(elHeight);
            });


            // initialize the flakes
            for(i = 0; i < options.flakeCount; i+=1){
                flakeId = flakes.length;
                flakes.push(new Flake(random(widthOffset,elWidth - widthOffset), random(0, elHeight), random((options.minSize * 100), (options.maxSize * 100)) / 100, random(options.minSpeed, options.maxSpeed), flakeId));
            }

            // this controls flow of the updating snow
            function snow(){
                for( i = 0; i < flakes.length; i += 1){
                    flakes[i].update();
                }

                if (options.fun){
                  for( j = 0; j < lazers.length; j += 1){
                    if (!lazers[j].update()) {
                        lazers.splice(j, 1);
                      }
                  }

                  score.update();
                  ship.update();
                }

                snowTimeout = requestAnimationFrame(function(){snow()});
            }

            snow();

            // clears the snowflakes
            this.clear = function(){
                $(element).children('.snowfall-flakes').remove();
                flakes = [];
                cancelAnimationFrame(snowTimeout);
            }
    };

    // Initialize the options and the plugin
    $.fn.snowfall = function(options){
        if(typeof(options) == "object" || options == undefined){
                 return this.each(function(i){
                    (new $.snowfall(this, options));
                });
        }else if (typeof(options) == "string") {
            return this.each(function(i){
                var snow = $(this).data('snowfall');
                if(snow){
                    snow.clear();
                }
            });
        }
    };
})(jQuery);

function snowfun() {
  var img = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAAUCAYAAACAl21KAAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH3QwXEDMEhWolLwAAAB1pVFh0Q29tbWVudAAAAAAAQ3JlYXRlZCB3aXRoIEdJTVBkLmUHAAADJ0lEQVQ4y5WUzWucRRzHPzPz7LP7bLKbt8Z0SRqLSaxIrIqotEIFaUSqKAgFQTx4VS+CJ09e/Bv0JAVpIYjiQVBQRE8pLQ2NNBKCNmmaNGjiJrtpdp+Xmfl5eVaW0oQ6l3lh5st85/f5jhIRDmkaCPKxBfxBG4NDRArAIDCazzeAOpD9HyEDDAGnL7WSFxMReben9AswB2wD7iChjgXTtX583fmzt5w/G4uXv503Dxl9B2jlNsmtWsB1DvcDx/NeASkwPp9mEyJSG1BaLraTyQ97oymgBISAALvAKrDbERpfd/71dedOAkFV6e3HCyYNUCN3vRScEh4JTA04s+Z8CDKsUJmC38aM/ha4+5+1uSQb+LoVT1eNGc5E2u/3Rq1zUTjwXTsJYqV4u6c0Pp/ayk9JVu5VKmqJ3xoz+vZb5ZLuvI0DNs+Xiwt16zfvOO8tVGfbyejV1Fa1UqaklZlPbfVyakfLiqpHZMfJ5rlScQHYBKzKOYqAJ39sp2/OtuKnS0qN3EyysaLWfUcCrYeMoaiV/yuzjZoxGwJbL0Xhwpli4SvgOtDuWEuB1Zko/HUmCveAJz6t71V+aCWV2Cu9H3iGjPHTYdD8oFJeBlaAZeCfnCvpLn/Y9NI/206mFExuQJ8T0Yko2l5oKq83vK5ebMWPKtTAs2FgpgJzA7gN2KALvuc/349f+2K7ccqKHBlSOpgoFWQpsyTOowqGpcz2NMLCRCJybNUWCh9Xy4t5+ROdC41eSe0LF+p7T20lWbUeZ3vn+8obl2qDzRPF0A0Gxn1zdLDxXn/v+rX9uLGcZCzG6dHv4/QkUAOCjjW/5X1jWqulyaj458NhsP3RYCW9mtrnVqx9rKI11zO7NhMVr8z1ROFikg5nmcv2vOx0gqxEpJvsgS6yj11ott75ZGv3tFGKl/t65j4bqn4JrHWRvdNNtstRv3FP1pITYXCzmdgprZV+IyquAH8Ai11Zc91Z6yy4e9K/eqoU/vxqJSo3kcor5eJl4Bawf7/0q0M+tgIw0vTyTFNkZMzoa8DvQJzbemChjlg/UMnfo3m/2zyIUAdWnVfnwK/2X58gbi8N99IEAAAAAElFTkSuQmCC";
  $(document).snowfall({image : img, flakeCount : 20, minSize: 10, maxSize:16, fun:true});
}