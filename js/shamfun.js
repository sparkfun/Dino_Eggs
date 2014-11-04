function shamfun() {
  $(document).ready(function() {

    var canvas = $('<div style="-webkit-transition: height 1s ease-in-out;-moz-transition: height 1s ease-in-out;-ms-transition: height 1s ease-in-out;-o-transition: height 1s ease-in-out;transition: height 1s ease-in-out;"></div>').css({position:'absolute',backgroundColor:'black',height:'100%',left:'0',right:'0',zIndex:'100',overflow:'hidden'}),
      fl = '<div class="flame" style="display:none;position:relative;left:10px;top:-14px;z-index:-1;display:inline-block;-ms-transform: rotate(180deg);-webkit-transform: rotate(180deg);transform: rotate(180deg);"><span class="sfe-icon-flame" style="color:red;"></span></div>',
      flame = $(fl), flamem = $(fl), flames = $([flame.get(0), flamem.get(0)]),
      sh = '<svg width="100%" height="100%" viewBox="0 0 10 15" xmlns="http://www.w3.org/2000/svg"><path fill="#AA4643" d="M 5 0 l 5 15 -10 0 Z"></path></svg>',
      ship = $('<div></div>').html(sh).append(flame), shipm = $('<div></div>').html(sh).append(flamem).hide(), ships = $([ship.get(0), shipm.get(0)]).css({position:'absolute',height:'25px',width:'30px'}),
      leaf1= '<path fill="green" d="M 7.156,4.183 C 9.305,0.180 13.150,0.435 15.796,5.196 17.596,8.180 17.412,9.014 18.220,10.923 l 2.258,8.951 -8.694,0.142 C 10.761,20.216 6.057,19.878 3.214,18.630 -0.410,17.423 -0.273,14.686 0.483,12.859 0.996,11.592 3.825,9.731 4.791,8.107 6.469,5.288 6.354,5.780 7.156,4.183 z"></path>',
      leaf2= '<path fill="green" d="m 36.022,7.148 c 4.003,2.149 3.748,5.994 -1.013,8.640 -2.983,1.800 -3.817,1.616 -5.726,2.424 l -8.951,2.258 -0.142,-8.694 c -0.199,-1.023 0.139,-5.727 1.387,-8.570 1.207,-3.625 3.943,-3.488 5.771,-2.730 1.266,0.512 3.127,3.341 4.751,4.307 2.819,1.678 2.326,1.562 3.924,2.364 z"></path>',
      leaf3= '<path fill="green" d="m 32.939,34.966 c -2.149,4.003 -5.994,3.748 -8.640,-1.013 -1.800,-2.983 -1.616,-3.817 -2.424,-5.726 l -2.258,-8.951 8.694,-0.142 c 1.023,-0.199 5.727,0.139 8.570,1.387 3.625,1.207 3.488,3.943 2.730,5.771 -0.512,1.266 -3.341,3.127 -4.307,4.751 -1.678,2.819 -1.562,2.326 -2.364,3.924 z"></path>',
      leaf4= '<path fill="green" d="m 5.210,31.943 c -4.003,-2.149 -3.748,-5.994 1.013,-8.640 2.983,-1.800 3.817,-1.616 5.726,-2.424 l 8.951,-2.258 0.142,8.694 c 0.199,1.023 -0.139,5.727 -1.387,8.570 -1.207,3.625 -3.943,3.488 -5.771,2.730 C 12.619,38.103 10.758,35.274 9.135,34.308 6.315,32.630 6.808,32.745 5.210,31.943 z"></path>',
      sham = '<svg viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">'+leaf1+leaf2+leaf3+leaf4+'</svg>',
      half = '<svg viewBox="0 0 20 40" xmlns="http://www.w3.org/2000/svg"><g transform="matrix(0.5735,0.8191,-0.8191,0.5735,14.8755,-7.5956)">'+leaf1+leaf3+'</g></svg>',
      leaf = '<svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><g transform="matrix(0.5735,0.8191,-0.8191,0.5735,14.8755,-7.5956)">'+leaf1+leaf3+'</g></svg>',
      bullet = '<svg viewBox="0 0 1 1" xmlns="http://www.w3.org/2000/svg"><path fill="white" d="M 0,0 L 0 1 1 1 1 1 1 0 z"></path></svg>',
      ptsel = $('<span style="color:white;font-size:20px;float:right;margin-right:20px;margin-top:20px;z-index:100"></span>');

    var t = $('<span style="clear:both;color:white;font-size:10px;float:right;margin-right:20px;z-index:100">Use Arrow keys to move and spacebar to shoot<br/></span>');
    t.append($('<div><a>Back to the Sparkfun Arcade</a></div>').css({textAlign:'right',cursor:'pointer'}).click(function(){
      canvas.height(0);
      $('#video_container,#videoMenu').css({zIndex:101});
      $('.sfe-icon-clover').unbind('click').click(function(e){
        e.preventDefault(); alert('You must to refresh to play again');
      })
      setTimeout(function(){ canvas.remove() }, 1000);
    }));

    canvas.append(ptsel).append(ships).append(t);
    canvas.append('<div class="lifebox" style="margin:20px"></div>');
    $('body').prepend(canvas.height(0).css({webkitTransition: 'height 1s ease-in-out',
        mozTransition: 'height 1s ease-in-out',
        msTransition: 'height 1s ease-in-out',
        oTransition: 'height 1s ease-in-out',
        transition: 'height 1s ease-in-out',
      }));

    $('#video_container,#videoMenu').css({zIndex:1});
    $(canvas).height($(window).height());


    var w = 30, h = 25, W = $(window).width(), H = $(window).height();
    var shipangle = 0, dirangle = 0;
    var shipgo = false, shipv = 0, shipturn = 0, fire = 0;
    var sx = W/2, sy = H/2, scx = sx + (w/2)-1, scy = sy + (h/2)-1, mx, my, mcx, mcy;
    var firedelay = 200, lastfire = new Date().getTime();
    var pts = 0, lives = 3, delay = 0, go = false;

    for (var i = 0; i < lives; i++) {
      $('<div></div>').addClass('lives').css({display:'inline-block',width:10,height:15}).html(sh).appendTo('.lifebox');
    }

    var dx2 = false, dy2 = false;

    var proj = [], roids = [], lvl = 0;

    var ss = 0.01, sms = 5, ssm = 25, s = 5, ps = 5;

    fruitloops = function(){
      var start = new Date().getTime();
      loop = function() { setTimeout(fruitloops, 20 - (new Date().getTime() - start)); };

      ptsel.text(pts);

      var drad = (dirangle) * (Math.PI/180), srad = (shipangle-90) * (Math.PI/180),
        dx = (shipv * Math.cos(drad)), dy = (shipv * Math.sin(drad)),
        ssrad = Math.sin(srad), scrad = Math.cos(srad);

      if (!go) {
        if (shipturn) {
          shipangle += shipturn * s;
        }

        flames.toggle(shipgo);
        if (shipgo) {

          var sx1 = ((ssm*ss) * scrad), sy1 = ((ssm*ss) * ssrad),
            tx = dx + sx1, ty = dy + sy1;

          shipv = Math.sqrt(Math.pow(tx, 2) + Math.pow(ty, 2));
          if (shipv > sms) shipv = sms;
          dirangle = Math.atan2(-ty, -tx)/Math.PI*180 + 180;
        }
        if (shipv > 0) {
          var rx = (shipv * Math.cos(drad)), ry = (shipv * Math.sin(drad));

          sx += rx; sy += ry;
          scx += rx; scy += ry;
          shipv-=ss;
        }

        if (sx < 0 && sx > -w) {
          mx = sx+W; mcx = scx+W;
          shipm.show().css({left:mx,top:my});
          dx2 = true;
        } else if (sx > W-w && sx < W) {
          mx = sx-W; mcx = scx-W;
          shipm.show().css({left:mx,top:my});
          dx2 = true;
        } else if (dx2) {
          dx2 = false;
          shipm.hide();
          if (sx < 0-w || sx > W) {
            sx = mx; scx = mcx;
          }
        } else {
          mx = sx;
        }
        if (sy < 0 && sy > -h) {
          my = sy+H; mcy = scy+H;
          shipm.show().css({left:mx,top:my});
          dy2 = true;
        } else if (sy > H-h && sy < H) {
          my = sy-H; mcy = scy-H;
          shipm.show().css({left:mx,top:my});
          dy2 = true;
        } else if (dy2) {
          dy2 = false;
          shipm.hide();
          if (sy < 0-h || sy > H) {
            sy = my; scy = mcy;
          }
        } else {
          my = sy;
        }

        ships.css({msTransform:'rotate('+ shipangle +'deg)',webkitTransform:'rotate('+ shipangle +'deg)',transform:'rotate('+ shipangle +'deg)'});
        ship.css({left:sx, top:sy});

        if (fire && (new Date().getTime() - lastfire) > firedelay) {
          var b = $(bullet).css({position:'absolute',height:'2px',width:'2px'});

          var sx1 = (ps * scrad), sy1 = (ps * ssrad),
            tx = dx + sx1, ty = dy + sy1, nx = ((w/2)+2) * scrad, ny = ((h/2)+2) * ssrad;

          projv = Math.sqrt(Math.pow(tx, 2) + Math.pow(ty, 2));
          projangle = Math.atan2(-ty, -tx)/Math.PI*180 + 180;

          if (projv < ps) projv = ps;

          proj.push([b.appendTo(canvas), projangle, scx+nx, scy+ny, projv, 100]);
          lastfire = new Date().getTime();
        }
      }

      if (proj.length) {
        for (var i in proj) {
          if (proj[i][5]-- > 0) {
            var rad = (proj[i][1]) * (Math.PI/180);
            proj[i][2] = proj[i][2] + (proj[i][4] * Math.cos(rad));
            proj[i][3] = proj[i][3] + (proj[i][4] * Math.sin(rad));

            if (proj[i][2] < 0) {
              proj[i][2] += W;
            } else if (proj[i][3] < 0) {
              proj[i][3] += H;
            } else if (proj[i][2] > W) {
              proj[i][2] = 0;
            } else if (proj[i][3] > H) {
              proj[i][3] = 0;
            }


            if (delay == 0 && proj[i][2] > sx && proj[i][2] < sx+w && proj[i][3] > sy && proj[i][3] < sy+h) {
              //projectile hit ship
              proj[i][0].remove();
              proj.splice(i,1);

              ded();
            } else if (delay == 0 && (dx2 || dy2) && proj[i][2] > mx && proj[i][2] < mx+w && proj[i][3] > my && proj[i][3] < my+h) {
              //projectile hit ship
              proj[i][0].remove();
              proj.splice(i,1);

              ded();
            } else {
              proj[i][0].css({left:proj[i][2],top:proj[i][3]});
            }
          } else {
            proj[i][0].remove();
            proj.splice(i,1);
          }
        }
      }

      if (roids.length) {

        for (var i = 0; i < roids.length; i++) {
          var rad = (roids[i][3]) * (Math.PI/180);
          roids[i][4] = roids[i][4] + (roids[i][6] * Math.cos(rad));
          roids[i][5] = roids[i][5] + (roids[i][6] * Math.sin(rad));
          roids[i][16] = roids[i][16] + (roids[i][6] * Math.cos(rad));
          roids[i][17] = roids[i][17] + (roids[i][6] * Math.sin(rad));

          roids[i][8] += roids[i][7];

          if (roids[i][4] < 0 && roids[i][4] > -roids[i][9]) {
            roids[i][12] = roids[i][4]+W; roids[i][18] = roids[i][16]+W;
            roids[i][10] = true;
          } else if (roids[i][4] > W-roids[i][9] && roids[i][4] < W) {
            roids[i][12] = roids[i][4]-W; roids[i][18] = roids[i][16]-W;
            roids[i][10] = true;
          } else if (roids[i][10]) {
            roids[i][10] = false;
            if (roids[i][4] < 0-roids[i][9] || roids[i][4] > W) {
              roids[i][16] = roids[i][18];
              roids[i][4] = roids[i][12];
            }
          } else {
            roids[i][12] = roids[i][4]; roids[i][18] = roids[i][16];
          }
          if (roids[i][5] < 0 && roids[i][5] > -roids[i][14]) {
            roids[i][13] = roids[i][5]+H; roids[i][19] = roids[i][17]+H;
            roids[i][11] = true;
          } else if (roids[i][5] > H-roids[i][14] && roids[i][5] < H) {
            roids[i][13] = roids[i][5]-H; roids[i][19] = roids[i][17]-H;
            roids[i][11] = true;
          } else if (roids[i][11]) {
            roids[i][11] = false;
            if (roids[i][5] < 0-roids[i][14] || roids[i][5] > H) {
              roids[i][17] = roids[i][19];
              roids[i][5] = roids[i][13];
            }
          } else {
            roids[i][13] = roids[i][5]; roids[i][19] = roids[i][17];
          }

          if (roids[i][12] != roids[i][4] || roids[i][5] != roids[i][13]) {
            roids[i][1].show().css({left:roids[i][12],top:roids[i][13]});
          } else {
            roids[i][1].hide();
          }

          roids[i][2].css({msTransform:'rotate('+ roids[i][8] +'deg)',webkitTransform:'rotate('+ roids[i][8] +'deg)',transform:'rotate('+ roids[i][8] +'deg)'});
          roids[i][0].css({left:roids[i][4],top:roids[i][5]});


            var sul = rot((scx - (w-12)/2), (scy - h/2), scx, scy, ssrad, scrad);
            var sur = rot((scx + (w-12)/2), (scy - h/2), scx, scy, ssrad, scrad);
            var sbl = rot((scx - (w-12)/2), (scy + h/2), scx, scy, ssrad, scrad);
            var sbr = rot((scx + (w-12)/2), (scy + h/2), scx, scy, ssrad, scrad);

            if (dx2 || dy2) {
              var sulm = rot((mcx - (w-12)/2), (mcy - h/2), mcx, mcy, ssrad, scrad);
              var surm = rot((mcx + (w-12)/2), (mcy - h/2), mcx, mcy, ssrad, scrad);
              var sblm = rot((mcx - (w-12)/2), (mcy + h/2), mcx, mcy, ssrad, scrad);
              var sbrm = rot((mcx + (w-12)/2), (mcy + h/2), mcx, mcy, ssrad, scrad);
            }

          var colli = false;
          for (var j = 0; j < proj.length; j++) {
            var col = (proj[j][2] > roids[i][4] && proj[j][2] < roids[i][4] + roids[i][9] && proj[j][3] > roids[i][5] && proj[j][3] < roids[i][5] + roids[i][14]);
            var coll = col || (roids[i][10] || roids[i][11]) && (proj[j][2] > roids[i][12] && proj[j][2] < roids[i][12] + roids[i][9] && proj[j][3] > roids[i][13] && proj[j][3] < roids[i][13] + roids[i][14]);
            if (col || coll) {
              proj[j][0].remove();
              proj.splice(j,1);

              var croid = roids[i];
              roids[i][2].remove();
              roids.splice(i, 1);
              expl(croid);

              colli = true;
              break;
            }

          }

          if (delay == 0 && !go) {
            if (!colli) {
              var spr = (roids[i][8]) * (Math.PI/180), rc = Math.cos(spr), rs = Math.sin(spr);
              var colli = cli(roids[i][16], roids[i][17], roids[i][9], roids[i][14], rs, rc, sul, sur, sbl, sbr);
              if (!colli) {
                if (roids[i][10] || roids[i][11]) {
                  colli = cli(roids[i][18], roids[i][19], roids[i][9], roids[i][14], rs, rc, sul, sur, sbl, sbr);
                  if (!colli && dx2 || dy2) {
                    colli = cli(roids[i][18], roids[i][19], roids[i][9], roids[i][14], rs, rc, sulm, surm, sblm, sbrm);
                  }
                }
                if (!colli && dx2 || dy2) {
                  colli = cli(roids[i][16], roids[i][17], roids[i][9], roids[i][14], rs, rc, sulm, surm, sblm, sbrm);
                }
              }
              if (colli) {
                var croid = roids[i];
                roids[i][2].remove();
                roids.splice(i, 1);
                expl(croid);
                ded();
              }
            }

          }
        }

      } else {
        if (proj.length) {
          for (var i = 0; i < proj.length; i++) {
            proj[i][0].remove();
          }
          proj = [];
        }

        delay = 150;

        lvl++;
        for (var i=0;i<10 + (lvl-1)*5;i++){
          var wh = 20 + (Math.random() * 60), rx = Math.random() * (W-wh), ry = Math.random() * (H-wh);
          var shamr = $('<div></div>').append(sham);
          var shamm = $('<div></div>').append(sham).hide();
          roids.push([shamr.appendTo(canvas),
            shamm.appendTo(canvas),
            $([shamr.get(0), shamm.get(0)]).css({position:'absolute',width:wh,height:wh}),
            Math.random() * 360, rx, ry, 1 + Math.random() * 1.5,
            1 + Math.random() * 1.5 * (Math.random() > 0.5) ? -1 : 1, Math.random() * 360, wh, false, false,
            0, 0, wh, 100, rx + (wh/2), ry + (wh/2), 0, 0]);
        }
      }

      if (delay > 0) {
        delay--;
        if (delay % 5 == 0) {
          if (dx2 || dy2) {
              ships.toggle();
          } else { ship.toggle(); }
        }
      }
      if (lives == 0 && !go){
        go = true;
        $(canvas).append('<div style="color:white;left:0;font-size:70px;position:relative;top:40%;text-align:center">Game Over</div');
      }
      loop();
    };
    fruitloops();

    var expl = function(roid) {
      var c = '';
      pts += roid[15];
      if (roid[15] == 100) {
        roid[15] = roid[15] / 2;
        roid[9] = roid[9]/2;
        c = half;
      } else if (roid[15] == 50) {
        roid[15] = roid[15] / 2;
        roid[14] = roid[14]/2;
        c = leaf;
      } else {
        return;
      }

      var halfr = $('<div></div>');
      var halfm = $('<div></div>').hide();
      roid[0] = halfr.appendTo(canvas);
      roid[1] = halfm.appendTo(canvas);
      roid[2] = $([halfr.get(0), halfm.get(0)]).append(c).css({position:'absolute',width:roid[9],height:roid[14]});
      roids.push(roid);
      roid = roid.slice();
      var halfr = $('<div></div>');
      var halfm = $('<div></div>').hide();
      roid[0] = halfr.appendTo(canvas);
      roid[1] = halfm.appendTo(canvas);
      roid[3] += (Math.random() * 179);
      roids[i][7] += 0.1 + (Math.random() * 0.4);
      roid[2] = $([halfr.get(0), halfm.get(0)]).append(c).css({position:'absolute',width:roid[9],height:roid[14]});
      roids.push(roid);
    }

    var ded = function(){
      delay = 150;
      lives--;
      $('.lifebox .lives').last().remove();
      sx = W/2; sy = H/2; scx = (sx + w/2)-1; scy = (sy + h/2)-1;
      shipv = 0; shipangle = 0;
    }

    var cli = function(acx, acy, w, h, rs, rc, sul, sur, sbl, sbr) {
      var aul = rot((acx - w/2), (acy - h/2), acx, acy, rs, rc),
          aur = rot((acx + w/2), (acy - h/2), acx, acy, rs, rc),
          abl = rot((acx - w/2), (acy + h/2), acx, acy, rs, rc),
          abr = rot((acx + w/2), (acy + h/2), acx, acy, rs, rc);

      var colli = false, corn = [[aur, aul], [aur, abr], [sul, sbl], [sul, sur]];
      for(var i = 0; i < 4; i++){
        var axis = {x:corn[i][0].x - corn[i][1].x,y:corn[i][0].y - corn[i][1].y};
        var projections = [];
        for(var j = 0; j < 4; j++){
          for (var g = 0; g < 2; g++){
            var scalar = pro(corn[j][g], axis);
            projections.push(scalar.x * axis.x + scalar.y + axis.y);
          }
        }
        colli = (Math.min(projections[4], projections[5], projections[6], projections[7]) <= Math.max(projections[0], projections[1], projections[2], projections[3]) &&
          Math.max(projections[4], projections[5], projections[6], projections[7]) >= Math.min(projections[0], projections[1], projections[2], projections[3]));
        if (!colli) break;
      }
      return colli;
    }

    var rot = function(px, py, cx, cy, rs, rc) {
      return {x:cx + (px-cx)*rc - (py-cy)*rs,
        y:cy + (px-cx)*rs + (py-cy)*rc};
    };

    var pro = function(p, a) {
      var pp = (p.x * a.x + p.y * a.y) / (Math.pow(a.x,2) + Math.pow(a.y,2));
      return {x:pp * a.x,y:pp * a.y};
    };

    $(document).keydown(function (e) {
      switch(e.keyCode)
      {
        case 32:
          //space
          e.preventDefault();
          fire = 1;
        break;
        case 37:
          //left
          e.preventDefault();
          shipturn = -1;
        break;
        case 38:
          //up
          e.preventDefault();
          shipgo = true;
        break;
        case 39:
          //right
          e.preventDefault();
          shipturn = 1;
        break;
        case 40:
          //down
          e.preventDefault();
        break;
      }
    });

    $(document).keyup(function (e) {
      switch(e.keyCode)
      {
        case 32:
          fire = 0;
        break;
        case 37:
          shipturn = 0;
        break;
        case 38:
          shipgo = false;
        break;
        case 39:
          shipturn = 0;
        break;
      }
    });

    $(window).resize(function(){
      W = $(canvas).width(); H = $(canvas).height();
    });

  });
}