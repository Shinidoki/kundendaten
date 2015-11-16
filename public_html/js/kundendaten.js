

var csv = JSON.parse(localStorage.getItem('csv'));
var header = csv[0];

var colModel1 = [];
for(var key in header){
    colModel1.push({label: key, name: key, width: 100});
}
jQuery("#list27").jqGrid({ 
    datatype: "local",
    data: csv,
    height: 255,
    autowidth: true,
    shrinkToFit: false,
    colModel: colModel1,
    rowNum:50, 
    rowTotal: 200, 
    rowList : [20,30,50], 
    loadonce:true, 
    rownumbers: true, 
    rownumWidth: 40, 
    
    gridview: true, 
    pager: '#pager27', 
    sortname: 'item_id', 
    viewrecords: true, 
    sortorder: "asc", 
    caption: "Loading data from server at once" }); 
jQuery("#list27").jqGrid('filterToolbar',{searchOperators : true});