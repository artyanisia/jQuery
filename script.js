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

 $(document).ready(function() {

    $("#start").click(animation);
    $("#stop").click(stop);

    $("#schedule").click(function(){
        $("#start").hide();
        $("#square").hide();
        $("table").css({"display": "block"});
        $("body").css({"background-color": "antiquewhite"});
        $("#back").css({"display": "block"});
        $("#addTaskBtn").css({"display": "block"});
        $("#taskInput").css({"display": "block"});
    })
    $("#back").click(function(){
        $("#back").css({"display": "none"});
        $("#taskInput").css({"display": "none"});
        $("table").css({"display": "none"});
        $("#addTaskBtn").css({"display": "none"});
        $("body").css({"background-color": "black"});
        $("#start").show();
        $("#square").show();
    })
    $('#addTaskBtn').click(function(){
        let taskText = $('#taskInput').val();
        if(taskText){
            var timeSlot = prompt("Enter the time slot (7:30, 9:00, or 10:30):");
            var day = prompt("Enter the day (Luni, Marti, Miercuri, Joi, Vineri):");
            var teacher = prompt("Enter teacher:");
            var room = prompt("Enter the room:");
            
            taskText = `${taskText} <br> Prof: ${teacher} <br> Sala: ${room}`;
            console.warn(taskText);
            day = day.toLowerCase();
            timeSlot = timeSlot.replace(":", "-");

            var cellId = `${day}-${timeSlot}`;
            var cell = $('#' + cellId);

            if(cell.length) {
                cell.html(taskText);
                $('#taskInput').val('');
            } else {
                alert('Invalid time or day')
            }
        } else {
            alert('Please enter a task')
        }
    })

});