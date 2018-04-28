
function makeGrid() {

    //Get number of rows and cols input
    let rows = $("#input_height").val();
    let cols = $("#input_width").val();

    //Get table
    let table = $("#pixel_canvas");

    //Reset to empty table --- in case one already created
    table.children().remove();

    //Create rows
    for (let i = 0; i < rows; i++) {
        table.append("<tr></tr>");
        //Create cols
        for (let j = 0; j < cols; j++) {
            table.children().last().append("<td></td>");
        }
    }

    //Listen for cell clicks
    table.on("click", "td", function() {
        //Get color from color picker
        let color = $("input[type='color']").val();
        //Apply color to cell
        $(this).attr("bgcolor", color);
    });
}

// Listen for button clicks to trigger makeGrid()
$("input[type='submit']").click(function(e) {
    e.preventDefault(); //Required to avoid submit and page reload
    makeGrid();
});


