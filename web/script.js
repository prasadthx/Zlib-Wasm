// async function initModule() {
//     let files = ["book1.xls"];

//     for (let i = 0; i < files.length; i++) {
//         let file = files[i];
//         let responseText = await $.ajax({
//             url: './' + file,
//             beforeSend: function (xhr) {
//                 xhr.overrideMimeType("text/plain; charset=x-user-defined");
//             }
//         });
//         console.log(file,responseText.length);

        
//         FS.createDataFile(
//             "/", // folder 
//             file, // filename
//             responseText, // content
//             true, // read
//             true // write
//         );
//     }

const downloadFile = (filename, text) => {
    var element = document.createElement('a');
    console.log("Downloaded " + filename);
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute('download', filename);
  
    element.style.display = 'none';
    document.body.appendChild(element);
  
    element.click();

    console.log("Downloaded " + filename);
  
    document.body.removeChild(element);
  }
  
  // Start file download.
  //download("hello.txt","This is the content of my file :)");
  
    
// }

const onCompressButtonPressed = () => {
    let inputFile = document.getElementById("c_inputFile").files[0];
    console.log(inputFile);
    let fileContent;
    
    // let reader = new FileReader(); 
    // reader.readAsText(inputFile); 
    // reader.onload = function () { 
    //   content = reader.result; 
	//   //console.log(content); 
    // } 

    const inputFileURL = URL.createObjectURL(inputFile)
    // fetch(path).then( 
    //     (response) => {content = response.text;console.log(content);}
    // )
    // FS.createDataFile(
    //         "/", // folder 
    //         inputFile.name, // filename
    //         `${content}`, // content
    //         true, // read
    //         true // write
    //     );
    // Module.callMain(["-c", inputFile.name, `${inputFile.name}.z`, "9"])
    // content = FS.readFile(`${inputFile.name}.z`);
    // downloadFile(`${inputFile.name}.z`, content);


    let xhr = new XMLHttpRequest();
    xhr.overrideMimeType("text/plain; charset=x-user-defined");
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
        
            Module.callMain(["-c", inputFile.name, inputFile.name + ".z", 9]);
            //console.log(fileContent);
            //content = FS.readFile( inputFile.name.split(".z")[0] );
            //downloadFile( inputFile.name.split(".z")[0] , content);
        }
    }
    xhr.open('GET', inputFileURL, true);
    xhr.send('');
}

const onDecompressButtonPressed = () => {
    let inputFile = document.getElementById("d_inputFile").files[0];
    console.log(inputFile);
    let fileContent;
    
    // let reader = new FileReader(); 
    // reader.readAsText(inputFile); 
    // reader.onload = function () { 
    //   content = reader.result; 
	//   //console.log(content); 
    // } 
    const inputFileURL = URL.createObjectURL(inputFile)

    // let responseText = await $.ajax({
    //     url: inputFileURL,
    //     beforeSend: function (xhr) {
    //         xhr.overrideMimeType("text/plain; charset=x-user-defined");
    //     }
    // });

    //fetch(inputFileURL).then((response) => console.log(response));

    // FS.open(`/${inputFile.name}`, "w+");
    // FS.writeFile(`/${inputFile.name}`, content);
    // FS.close();

    let xhr = new XMLHttpRequest();
    xhr.overrideMimeType("text/plain; charset=x-user-defined");
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
            //console.log(fileContent);
            //content = FS.readFile( inputFile.name.split(".z")[0] );
            //downloadFile( inputFile.name.split(".z")[0] , content);
        }
    }
    xhr.open('GET', inputFileURL, true);
    xhr.send('');

}

// window["Module"] = {
//     onRuntimeInitialized: myClass.initModule,
//     print: (text) => myClass.print(text),
//     // printErr: (text) => myClass.print(text)
// }

