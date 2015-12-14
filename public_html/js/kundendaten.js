
var $ = jQuery;
var grid = $("#kundendaten");
var csv = [];
var header = [];
var colModel1 = [];


//Festlegen der anzuzeigenen Spalten. Wenn noch keine Spalten im localStorage gespeichert wurden, nehme einen Standardwert
var chosenCols = JSON.parse(localStorage.getItem('chosenCols')) !== null ? JSON.parse(localStorage.getItem('chosenCols')) : ['Adresse', 'Anrede', 'Name', 'Vorname'];

$(document).ready(function () 
{
    var gridHeight = $(window).height() - 550;

    if(gridHeight <= 300) {
        gridHeight = 300;
    }
    
    parseCsv();

    grid.jqGrid({ 
        datatype: "local",
        data: csv,
        height: gridHeight,                   //Tabellengröße an die Größe des Browserfensters anpassen (Fenstergröße - 550px damit alles ohne scrollen sichtbar ist
        minHeight: 300,
        autowidth: false,
        width: $(window).width() - 5,                       //Nutze die volle Breite des Browserfensters
        shrinkToFit: false,
        colModel: colModel1,
        rowNum:50,
        rowList : [50,100,250], 
        loadonce:true, 
        rownumbers: true, 
        rownumWidth: 40, 
        gridview: true, 
        pager: '#pager', 
        sortname: 'Adresse', 
        viewrecords: true, 
        sortorder: "asc", 
        caption: "Kundendaten" }); 
    grid.jqGrid('filterToolbar',{searchOperators : true});
    grid.jqGrid('navGrid', '#pager', { search: false, add: false, edit: false, del: false});
    grid.jqGrid('navButtonAdd', '#pager', 
    {
        //"Spalten auswählen"-Button zur Tabelle hinzufügen
        caption: "Spalten",
        buttonicon: "ui-icon-calculator",
        title: "Choose columns",
        onClickButton: function () {
            $(this).jqGrid('columnChooser',
                {dialog_opts:{height: 550, width:700, modal: true}, msel_opts: {dividerLocation: 0.5}, 
                    "done": function(perm){
                        //Beim bestätigen der Spaltenauswahl werden die ausgewählten Spalten im localStorage gespeichert
                        if(perm){
                            this.jqGrid("remapColumns", perm, true);
                            var columnModels = grid.jqGrid('getGridParam','colModel');
                            chosenCols = [];
                            for (var columnModelIndex in columnModels) {
                                var columnModel = columnModels[columnModelIndex];
                                if (! columnModel.hidden) {
                                    chosenCols.push(columnModel.name);
                                }
                            }
                            localStorage.setItem('chosenCols', JSON.stringify(chosenCols));

                            //Breite der Tabelle neu festlegen, da die "remapColumns"-Funktion die Breite anpasst
                            grid.setGridParam({ width: $(window).width() - 5});

                        }
                }});
            //Suchfeld für die Spalten hinzufügen
            $("#colchooser_" + $.jgrid.jqID(this.id) + ' div.available>div.actions')
                .prepend('<label style="float:left;position:relative;margin-left:0.6em;top:0.6em">Suche:</label>');
        
        }
    });

    /**
     * Lese die csv-Daten aus dem localStorage aus und erstelle die Spalten
     * für die Tabelle dynamisch aus der Kopfzeile in der CSV 
     */
    function parseCsv() 
    {
        csv = JSON.parse(localStorage.getItem('csv'));
        if(csv !== null){
            header = csv[0];
            for(var key in header){
                if($.inArray(key, chosenCols) >= 0){
                    colModel1.push({label: key, name: key, width: 100});
                } else {
                    colModel1.push({label: key, name: key, width: 100, hidden: true});
                }
            }
        } else {
            csv = [];
        }
    }
    
    /**
     * Click event des Print Buttons speichert die aktuellen Daten aus der Tabelle
     * im localStorage und ruft dann die "print.html" auf.
     */
    $("#print_button").click(function() { 
        var lastData = grid.jqGrid("getGridParam", "lastSelectedData");
        localStorage.setItem('csv', JSON.stringify(lastData));
        localStorage.setItem('chosenCols', JSON.stringify(chosenCols));
        window.location.href = "print.html";
    });
});
