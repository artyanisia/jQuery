

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

localStorage.setItem('Day', 'content');
$(document).ready(function() {
    $("#buttonContainer").hide();
    $("#start").click(animation);
    $("#stop").click(stop);

    $("#schedule").click(function(){
        $("body").css({"background-color": "antiquewhite"});
        $("#start").hide();
        $("#square").hide();
        $("#schedule").hide();
        $("table").show();
        $("#back").show();
        $("#addTaskBtn").show();
        $("#taskInput").show();
        $("#saveBtn").show();
        $("#loadBtn").show();
        $("#buttonContainer").show();
    })
    $("#back").click(function(){
        $("body").css({"background-color": "black"});
        $("#back").hide();
        $("#taskInput").hide();
        $("table").hide();
        $("#addTaskBtn").hide();
        $("#start").show();
        $("#square").show();
        $("#schedule").show();
        $("#saveBtn").hide();
        $("#loadBtn").hide();
        $("#buttonContainer").hide();
    })
    $('#addTaskBtn').click(function(){
        let taskText = $('#taskInput').val();
        if(taskText){
            var timeSlot: string | null; 
            timeSlot= prompt("Enter the time slot (7:30, 9:00, or 10:30):") ?? '';
            var day: string | null;
            day= prompt("Enter the day (Luni, Marti, Miercuri, Joi, Vineri):") ?? '';
            var teacher = prompt("Enter teacher:");
            var room = prompt("Enter the room:");
            
            taskText = `${taskText} <br> Prof: ${teacher} <br> Sala: ${room}`;
            
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

    let cellId;
    let cellContent;
    $("#saveBtn").click(function(){
        let table: HTMLTableElement | null;
        table = document.getElementById('scheduleTable') as HTMLTableElement | null; // i have to get the table element
        const editableCells = table?.querySelectorAll('td'); //un array care tine informatia minte asa <td if=.. content..> cell content </td>
        editableCells?.forEach(cell => {
            cellId = cell.id;
            cellContent = cell.innerText;
            localStorage.setItem(cellId,cellContent);
        })

    })

    $("#loadBtn").click(function(){
        let table: HTMLTableElement | null;
        table = document.getElementById('scheduleTable') as HTMLTableElement | null; // i have to get the table element
        const editableCells = table?.querySelectorAll('td[contenteditable="true"]'); //un array care tine informatia minte asa <td if=.. content..> cell content </td>
        
        editableCells?.forEach(cell => {
            const cellElement = cell as HTMLElement;
            cellId = cell.id;
            const savedContent = localStorage.getItem(cellId);
            if (savedContent) {
                cellElement.innerText = savedContent; 
            }
        })
    })
    $(".toggleButton").click(function(){
        var rowId = $(this).attr("data-row")
        $("#" + rowId).slideToggle("slow");
    })
    $("#scheduleTable  td").dblclick(function(){
        $(this).toggleClass("highlighted");
    })
});