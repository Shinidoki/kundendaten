
var $ = jQuery;
// Check for the various File API support.
if (window.File && window.FileReader && window.FileList && window.Blob) {
    $(document).ready(function () 
    {
        /**
         * Click Event auf den Upload button um das Dateiauswahlfenster zu öffnen
         */
        $("#upload_button").click(function() { 
            $("#file_upload").click();
        });

        /**
         * Wird aufgerufen nachdem eine Datei ausgewählt wurde.
         * Liest die CSV-Datei aus und wandelt die Daten in ein JSON-Objekt um.
         * Speichert das Objekt dann im localStorage zur weiteren Verwendung
         */
        function handleFileSelect(evt) {

            var files = evt.target.files[0]; // FileList object
            var reader = new FileReader();
            var csvData;

            //Benutze den HTML5 Filereader um die CSV (in ISO-8859-1 Kodierung) einzulesen
            reader.readAsText(files, 'ISO-8859-1');

            /**
             * Wird aufgerufen sobald der Filereader die Datei komplett eingelesen hat
             */
            reader.onload = function(){
                csvData = $.csv.toObjects(reader.result, {
                            separator: ';'
                        });
                localStorage.setItem('csv', JSON.stringify(csvData));
                
                location.reload();
            };    
        }
        
        //Listener zum "Change"-Event des file-upload Feldes hinzufügen. Beim Aufruf des Events wird "handleFileSelect" ausgeführt.
        document.getElementById('file_upload').addEventListener('change', handleFileSelect, false);  
    });
} else {
  alert('Dateiupload wird von Ihrem Browser nicht unterstützt.');
}
