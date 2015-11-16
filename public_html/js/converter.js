
var $ = jQuery;
// Check for the various File API support.
if (window.File && window.FileReader && window.FileList && window.Blob) {
    $(document).ready(function () 
    {
        
        $("#upload_button").click(function() { 
            $("#file_upload").click();
        });


        function handleFileSelect(evt) {

            var files = evt.target.files[0]; // FileList object
            var reader = new FileReader();
            var csvData;

            reader.readAsText(files);
            // files is a FileList of File objects. List some properties.
            reader.onload = function(e){
                 csvData = $.csv.toObjects(reader.result, {
                             separator: ';'
                         });
                 localStorage.setItem('csv', JSON.stringify(csvData));
            };    
        }

        document.getElementById('file_upload').addEventListener('change', handleFileSelect, false);  
    });
} else {
  alert('Dateiupload wird von Ihrem Browser nicht unterstützt.');
}
