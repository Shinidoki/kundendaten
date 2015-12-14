
var $ = jQuery;

// Speichern der Daten aus dem localStorage in Variablen
var gridData = JSON.parse(localStorage.getItem('csv'));
var chosenCols = JSON.parse(localStorage.getItem('chosenCols'));
// Danach wird der alte Wert in der CSV Variable gelöscht, da sonst beim nächsten Aufruf der Kundendaten nur die Daten des aktuellen Druckvorgangs angezeigt werden
localStorage.setItem('csv',JSON.stringify([]));

$(document).ready(function () {
    var tableHead = "<thead><tr>";
    var tableBody = "<tbody>";
    
    /**
     * Erstelle die Kopfzeile der Tabelle mit den Spaltennamen
     */
    $.each(chosenCols, function(index, value) {
        if(value != 'rn'){
            tableHead += "<th>" + value + "</th>";
        }
    });
    
    tableHead += "</thead></tr>";
    
    /**
     * Fülle die Tabelle mit den Daten die aus der CSV kommen
     */
    $.each(gridData, function(index, value) {
        var rowInside = "";
        $.each(chosenCols, function(cIndex, cValue){
            if(cValue != 'rn'){
                rowInside += "<td class=\"text-nowrap\">" + value[cValue] + "</td>"; 
            }
        });
        tableBody += "<tr>" + rowInside + "</tr>";
    });
    
    tableBody += "</tbody>";
    
    //Schreibe die HTML-Formatierten Daten der CSV in den Container der Tabelle
    $('#printTable').html(tableHead+tableBody);
    
    //Rufe die "Drucken"-Funktion des Browsers auf
    window.print();
});