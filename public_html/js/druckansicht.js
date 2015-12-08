
var $ = jQuery;
var gridData = JSON.parse(localStorage.getItem('csv'));
var chosenCols = JSON.parse(localStorage.getItem('chosenCols'));
localStorage.setItem('csv',JSON.stringify([]));

$(document).ready(function () {
    var tableHead = "<thead><tr>";
    var tableBody = "<tbody>";
    
    $.each(chosenCols, function(index, value) {
        if(value != 'rn'){
            tableHead += "<th>" + value + "</th>";
        }
    });
    
    tableHead += "</thead></tr>";
    
    $.each(gridData, function(index, value) {
        var rowInside = "";
        $.each(chosenCols, function(cIndex, cValue){
            if(cValue != 'rn'){
                rowInside += "<td>" + value[cValue] + "</td>"; 
            }
        });
        tableBody += "<tr>" + rowInside + "</tr>";
    });
    
    tableBody += "</tbody>";
    
    $('#printTable').html(tableHead+tableBody);
    window.print();
});