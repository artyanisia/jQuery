function animation() {
    $('#square')
        .css('backgroundColor', 'green')
        .animate({
        left: '600px',
        width: '120px',
        height: '120px'
    }, 2000)
        .queue(function () {
        $(this).css({ "background-color": "red", "top": "50px" });
        $('#square').dequeue();
    })
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
$(document).ready(function () {
    $("#buttonContainer").hide();
    $("#start").click(animation);
    $("#stop").click(stop);
    $("#schedule").click(function () {
        $("body").css({ "background-color": "antiquewhite" });
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
    });
    $("#back").click(function () {
        $("body").css({ "background-color": "black" });
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
    });
    $('#addTaskBtn').click(function () {
        var _a, _b;
        var taskText = $('#taskInput').val();
        if (taskText) {
            var timeSlot;
            timeSlot = (_a = prompt("Enter the time slot (7:30, 9:00, or 10:30):")) !== null && _a !== void 0 ? _a : '';
            var day;
            day = (_b = prompt("Enter the day (Luni, Marti, Miercuri, Joi, Vineri):")) !== null && _b !== void 0 ? _b : '';
            var teacher = prompt("Enter teacher:");
            var room = prompt("Enter the room:");
            taskText = "".concat(taskText, " <br> Prof: ").concat(teacher, " <br> Sala: ").concat(room);
            day = day.toLowerCase();
            timeSlot = timeSlot.replace(":", "-");
            var cellId = "".concat(day, "-").concat(timeSlot);
            var cell = $('#' + cellId);
            if (cell.length) {
                cell.html(taskText);
                $('#taskInput').val('');
            }
            else {
                alert('Invalid time or day');
            }
        }
        else {
            alert('Please enter a task');
        }
    });
    var cellId;
    var cellContent;
    $("#saveBtn").click(function () {
        var table;
        table = document.getElementById('scheduleTable'); // i have to get the table element
        var editableCells = table === null || table === void 0 ? void 0 : table.querySelectorAll('td'); //un array care tine informatia minte asa <td if=.. content..> cell content </td>
        editableCells === null || editableCells === void 0 ? void 0 : editableCells.forEach(function (cell) {
            cellId = cell.id;
            cellContent = cell.innerText;
            localStorage.setItem(cellId, cellContent);
        });
    });
    $("#loadBtn").click(function () {
        var table;
        table = document.getElementById('scheduleTable'); // i have to get the table element
        var editableCells = table === null || table === void 0 ? void 0 : table.querySelectorAll('td[contenteditable="true"]'); //un array care tine informatia minte asa <td if=.. content..> cell content </td>
        editableCells === null || editableCells === void 0 ? void 0 : editableCells.forEach(function (cell) {
            var cellElement = cell;
            cellId = cell.id;
            var savedContent = localStorage.getItem(cellId);
            if (savedContent) {
                cellElement.innerText = savedContent;
            }
        });
    });
    $(".toggleButton").click(function () {
        var rowId = $(this).attr("data-row");
        $("#" + rowId).slideToggle("slow");
    });
    $("#scheduleTable  td").dblclick(function () {
        $(this).toggleClass("highlighted");
    });
});
