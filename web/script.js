const onCompressButtonPressed = () => {
    let inputFile = document.getElementById("c_inputFile").files[0];
    let compressionLevel = document.getElementById("compressionLevel").value;
    console.log(compressionLevel);
    console.log(inputFile);
    
    let fileContent;
    const inputFileURL = URL.createObjectURL(inputFile)             // Creating a URL for fetching the file asynchronously
    let xhr = new XMLHttpRequest();                                 // Create a new XMLHttpRequest object
    xhr.overrideMimeType("text/plain; charset=x-user-defined");     // Overriding the mime type for binary content
    xhr.onreadystatechange = function() {                           // Setting an event handler for the XMLHttpRequest object
        if (xhr.readyState === 4) {                                 // Handling an XMLHttpRequest's response
            fileContent = xhr.response;                             // Copying the response to a variable
            FS.createDataFile(                                      // Creating a file in the Emscripten MEMFS File System
                "/", // folder 
                inputFile.name, // filename
                fileContent, // content
                true, // read
                true // write
            );
        
            Module.callMain(["-c", inputFile.name, inputFile.name + ".z", "9"]);      // Calling the main() method of the C code.
           
        }
    }
    xhr.open('GET', inputFileURL, true);
    xhr.send('');
}

const onDecompressButtonPressed = () => {
    let inputFile = document.getElementById("d_inputFile").files[0];
    console.log(inputFile);
    
    let fileContent;
    const inputFileURL = URL.createObjectURL(inputFile)
    let xhr = new XMLHttpRequest();
    xhr.overrideMimeType("application/x-compress; charset=x-user-defined");
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4) {
            fileContent = xhr.response;
            FS.createDataFile(
                "/", // folder 
                inputFile.name, // filename
                fileContent, // content
                true, // read
                true // write
            );
        
            Module.callMain(["-d", inputFile.name, inputFile.name.split(".z")[0] ]);
        }
    }
    xhr.open('GET', inputFileURL, true);
    xhr.send();

}

// window["Module"] = {
//     onRuntimeInitialized: myClass.initModule,
//     print: (text) => myClass.print(text),
//     // printErr: (text) => myClass.print(text)
// }

