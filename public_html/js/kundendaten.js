
var $ = jQuery;
var grid = $("#kundendaten");
var csv = [];
var header = [];
var colModel1 = [];
var chosenCols = ['Adresse', 'Anrede', 'Name', 'Vorname'];

$(document).ready(function () 
{
    parseCsv();

    grid.jqGrid({ 
        datatype: "local",
        data: csv,
        height: 255,
        autowidth: true,
        shrinkToFit: false,
        colModel: colModel1,
        rowNum:50,
        rowList : [20,30,50], 
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
        caption: "Spalten",
        buttonicon: "ui-icon-calculator",
        title: "Choose columns",
        onClickButton: function () {
            $(this).jqGrid('columnChooser',
                {width: 550, msel_opts: {dividerLocation: 0.5}, modal: true});
            $("#colchooser_" + $.jgrid.jqID(this.id) + ' div.available>div.actions')
                .prepend('<label style="float:left;position:relative;margin-left:0.6em;top:0.6em">Search:</label>');
            
        }
    });

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
    
    $("#print_button").click(function() { 
        var lastData = grid.jqGrid("getGridParam", "lastSelectedData");
        localStorage.setItem('gridData', JSON.stringify(lastData));
        localStorage.setItem('chosenCols', JSON.stringify(chosenCols));
        window.location.href = "print.html";
    });
});