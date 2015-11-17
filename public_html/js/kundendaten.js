

var csv = JSON.parse(localStorage.getItem('csv'));
var header = csv[0];

var colModel1 = [];
for(var key in header){
    colModel1.push({label: key, name: key, width: 100});
}
jQuery("#kundendaten").jqGrid({ 
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
jQuery("#kundendaten").jqGrid('filterToolbar',{searchOperators : true});
jQuery("#kundendaten").jqGrid('navGrid', '#pager', {refreshstate: 'current', search: false, add: false, edit: false, del: false});
jQuery("#kundendaten").jqGrid('navButtonAdd', '#pager', {
                caption: "",
                buttonicon: "ui-icon-calculator",
                title: "Choose columns",
                onClickButton: function () {
                    $(this).jqGrid('columnChooser',
                        {width: 550, msel_opts: {dividerLocation: 0.5}, modal: true});
                    $("#colchooser_" + $.jgrid.jqID(this.id) + ' div.available>div.actions')
                        .prepend('<label style="float:left;position:relative;margin-left:0.6em;top:0.6em">Search:</label>');
                }
            });