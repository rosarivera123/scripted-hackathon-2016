$(document).ready(function(){
    var animation;
    var game = $("#game");
    var player = {
        element: $("#player"),
        x: $("#player").position().left,
        y: $("#player").position().top,
        width: $("#player").width(),
        height: $("#player").height(),
        garbage: null,
        strikes: 0
    };
    
    var time = Date.now();
    var timeSinceGarbage = time;
    
    
    var typed = false;
    var left = false,
    up = false,
    right = false,
    down = false,
    space = false;
    
    $(window).keydown(function(e){
        var key = e.which;
        if(key === 37) left = true;
        if(key === 38) up = true;
        if(key === 39) right = true;
        if(key === 40) down = true;
        if(key === 32) space = true;
    });
    $(window).keyup(function(e){
        var key = e.which;
        if(key === 37) left = false;
        if(key === 38) up = false;
        if(key === 39) right = false;
        if(key === 40) down = false;
        if(key === 32) space = false;
    });
    
    function update(){
        if(space){
            if(typed){
                doGarbage();
                typed = false
            }
        }else{
            typed = true;
        }
        
        if($(".garbage").length > 20){
          window.location.href="./gameover2.html?score=" + countUp;  
          return false;
        }
        
        if(left) player.x -= 4;
        if(right) player.x += 4;
        if(up) player.y -= 4;
        if(down) player.y += 4;
        
        if(player.x >= 800 - player.element.width()) player.x = 800 - player.element.width();
        if(player.x < 0) player.x = 0;
        if(player.y >= 600 - player.element.height()) player.y = 600 - player.element.height();
        if(player.y < 0) player.y = 0;
        
        if(Date.now() - timeSinceGarbage > 2500){
            timeSinceGarbage = Date.now();
            addGarbage(Math.floor(Math.random() * 780), Math.floor(Math.random() * 580));
        }
        
        if(player.garbage != null){
            player.garbage.css("left", (player.x + 10) + "px");
            player.garbage.css("top", (player.y - 10) + "px");
        }
        
        player.element.css("left", player.x + "px");
        player.element.css("top", player.y + "px");
        window.requestAnimationFrame(update);
    }

    function addGarbage(x, y){
        var random = Math.random();
        var newGarbage = $("<div class='garbage "+((random >= 0.5) ? "recycleable" : "trash")+"'></div>");
        newGarbage.css("left", x + "px");
        newGarbage.css("top", y + "px");
        
        game.append(newGarbage);
    }

    function doGarbage(){
        if(player.garbage == null){
            player.garbage = checkForGarbage(); 
        }else{
            var dumpster = checkForDumpster();
            if(dumpster != null){
                var dumpType = dumpster.attr("id");
                var garbageType = player.garbage.attr("class");
                if(dumpType === "rcylbin"){
                    if(garbageType === "garbage recycleable"){
                        player.garbage.remove();
                        player.garbage = null;
                    }else{
                        getStriked()
                    }
                }else{
                    if(garbageType === "garbage recycleable"){
                        getStriked()
                    }else{
                        player.garbage.remove();
                        player.garbage = null;
                    }
                }
            }
        }
    }

    function checkForGarbage(){
        var garbages = $(".garbage");
        for(var i = 0; i < garbages.length; i++){
            e = $(garbages[i]);
            var ex = e.position().left;
            var ey = e.position().top;
            var ew = e.width();
            var eh = e.height();
            
            if(player.x + player.width > ex && player.x < ex + ew && player.y + player.height > ey && player.y < ey + eh){
                return e;
            }
        }
        return null;
    }
    
    function checkForDumpster(){
        var dumpsters = $(".dumpster");
        for(var i = 0; i < dumpsters.length; i++){
            e = $(dumpsters[i]);
            var ex = e.position().left;
            var ey = e.position().top;
            var ew = e.width();
            var eh = e.height();
            
            if(player.x + player.width > ex && player.x < ex + ew && player.y + player.height > ey && player.y < ey + eh){
                return e;
            }
        }
        return null;
    }
    
    function getStriked(){
        player.strikes++;
        if(player.strikes >= 3){
            window.location.href="./gameover1.html?score=" + countUp;
            window.cancelAnimationFrame(animation);
        }
        $("#strikes").append($("<img src='../Pictures/Red-X.jpg' class='strike'>"))
    }
    
    animation = window.requestAnimationFrame(update);
});