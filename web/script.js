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
    let inputFile = document.getElementById("inputFile").files[0];
    console.log(inputFile);
    let content;
    
    let reader = new FileReader(); 
    reader.readAsText(inputFile); 
    reader.onload = function () { 
      content = reader.result; 
	  //console.log(content); 
    } 
    // fetch(path).then( 
    //     (response) => {content = response.text;console.log(content);}
    // )
    FS.createDataFile(
            "/", // folder 
            inputFile.name, // filename
            `${content}`, // content
            true, // read
            true // write
        );
    Module.callMain(["-c", inputFile.name, `${inputFile.name}.z`, "9"])
    content = FS.readFile(`${inputFile.name}.z`);
    downloadFile(`${inputFile.name}.z`, content);
}

async function btnClick() {
    Module.callMain(["book1.xls"]);
}

// window["Module"] = {
//     onRuntimeInitialized: myClass.initModule,
//     print: (text) => myClass.print(text),
//     // printErr: (text) => myClass.print(text)
// }

