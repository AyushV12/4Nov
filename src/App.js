
function App() {
   var inputDivCss={
    textAlign:"center"
   }
   var outputDivCss={
    textAlign:"center",
    margin:"10px",
    border: "1px solid",
    boxShadow: "5px 2px grey",
    borderRadius:"10px"
   }

  return (
    <div className="App">
      <div className="inputDiv" style={inputDivCss}>
        <input className="inputFile" type="file"></input>
        <button onClick={getData}> Get Data</button>
      </div>
      <div className="DisplayText" style={outputDivCss}>
        <span className="outputText" ></span>
      </div>
      <div className="outputDiv" style={outputDivCss}>
        <img className="output" id="output">
        </img>
      </div>
    </div>
  );
function getData(){
  var inputFile=document.getElementsByClassName("inputFile")[0]
  var formData= new FormData()
  formData.append("file",inputFile.files[0])

  openFile(inputFile.files[0])

  function a(l){
    l = eval(l)
    l = l[0]
    for (let i = 0; i < Object.keys(l).length; i++) {
      var key = Object.keys(l)[i]
      l[key] = l[key].toString()
    }
    console.log(l)
    var txtElement = document.getElementsByClassName("outputText")[0]
    txtElement.innerHTML = l.label_type_name

    txtElement.style.position = "inherit"
    txtElement.style.left = l.left+"px"
    txtElement.style.right = l.right+"px"
    txtElement.style.bottom = l.bottom+"px"
    txtElement.style.top = l.top+"px"



  }


  function openFile(file) {
    var reader = new FileReader();
    reader.onload = function(){
      var dataURL = reader.result;
      var output = document.getElementById('output');
      output.src = dataURL;
    };
    reader.readAsDataURL(file);
  }
  
  fetch("http://3.134.98.180:8100/api/detect?engine=test_image", {method:"POST", body:formData})
  .then(response => response.formData())
  .then(fd => {
    console.log(fd)
    for (let [key, prop] of fd) {
      if(key==="image"){
        openFile(prop)
      }
      else if(key==="labels"){
        a(prop)
      }
    }
  })

}
  


}

export default App;
