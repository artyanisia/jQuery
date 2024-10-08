 // This is the jQuery code

 function animation() {
    $('#square')
    .css('backgroundColor', 'green')
    .animate({
        left: '600px',
        width: '120px',
        height: '120px'
    }, 2000)
    .queue(function () {
        $(this).css({"background-color": "red", "top": "50px"});
        $('#square').dequeue();
        }
    )
    .animate({
        top: '150px',
        left: '50px',
        width: '60px',
        height: '60px'
    }, animation);    
}

function stop() {
    $("#square").stop(true);
}

function jumpPet(){
    $("#pet")
        .animate({ top: "-=30px" },300)
        .animate({ top: "+=30px" },300)
}

let isPlaying = false; 

function playfulPet(){
    
    let direction = 'right';
    if (!isPlaying) return; 

    $("#pet").hide();
    $("#dogPlaying").show();
    
    $("#dogPlaying").css({ left: direction === 'right' ? '-500px' : '0px', transform: 'rotate(0deg)' });

    $("#dogPlaying").animate({
        left: direction === 'right' ? '0px' : '-500px'
    }, 3000); 

    $({ rotation: 0 }).animate({ rotation: 360 }, {
        duration: 3000,
        step: function (now) { 
           
            $("#dogPlaying").css({ transform: `rotate(${now}deg)` });

        },
        complete: function () {
            direction = direction === 'right' ? 'left' : 'right';
            playfulPet();
        }
    });
}

function feedDog(){
    $("#foodPicture")
        .show(1000)
        .css({left: "20px", bottom: 0})
        .promise().done(function(){
            $("#pet").hide();
            $("#dogPlaying")
                .show()
                .animate({left: "-1000px"}, 2000)
                .promise().done(function(){
                    $("#foodPicture").hide(500)
                    $("#dogPlaying").animate({left: 0, right: 0}, 2000, function(){
                        $("#pet").show();
                        $("#dogPlaying").hide()

                        $("#jump, #play, #back").prop("disabled", false);
                    })
                },2000)
        })
}

$(document).ready(function() {

    $("#start").click(animation);
    $("#stop").click(stop);

    $("#petWindow").click(function(){
        $("#start").hide();
        $("#square").hide();
        $("#stop").hide();
        $("body").css({"background-color": "antiquewhite"});
        $("#back").css({"display": "block"});
        $("#pet").css({"display": "block"});
        $("#jump").show();
        $("#play").show();
        $("#feed").show();
    })
    $("#back").click(function(){
        $("#back").css({"display": "none"});
        $("body").css({"background-color": "black"});
        $("#start").show();
        $("#square").show();
        $("#stop").show();
        $("#jump").hide();
        $("#play").hide();
        $("#feed").hide();
        $("#pet").hide();
    })

    $("#jump").click(function(){
        jumpPet();
    })
    $("#play").click(function(){
        if (!isPlaying) {
            isPlaying = true;  
            playfulPet();      
            $("#stopPlay").show();  
        }
        $("#jump, #feed, #back").prop("disabled", true);
    })
    $("#stopPlay").click(function(){
        isPlaying = false;
        $("#dogPlaying").stop(true, true).hide();

        $("#pet").show();
        $("#stopPlay").hide();

        $("#jump, #feed, #back").prop("disabled", false);
    })
    $("#feed").click(function(){
        feedDog();
        $("#jump, #play, #back").prop("disabled", true);
    })
});