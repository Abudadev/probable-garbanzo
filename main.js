var Object_Wanted = "";
objects = []

function setup(){
    canvas = createCanvas(400,400);
    canvas.position(480,330);
    video = createCapture(VIDEO);
    video.hide();
}

function speakup(){
    synth = window.speechSynthesis;
    speakdata = "a" + Object_Wanted  + " found!";
    utterthis = new SpeechSynthesisUtterance(speakdata);
    synth.speak(utterthis);
}

function draw(){
    image(video,0,0,400,400);
    if(status !== ""){
        ObjectDetector.detect(video,gotresults);
        for(i = 0; i < objects.length; i++){

        if(objects[i].label == Object_Wanted){
        document.getElementById("wanted_Object").innerHTML = "A " + Object_Wanted + " found!"
         speakup();
        }

         fill("blue");
         percent = floor(objects[i].confidence * 100);
         text(objects[i].label + " " + percent + "%",objects[i].x + 15,objects[i].y + 15);
         noFill();
         stroke("black");
         rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height);
        }
    }
}

function start(){
    ObjectDetector = ml5.objectDetector("cocossd",ModelLoaded);
    document.getElementById("S").innerHTML = "Status: Looking for desired object";
}

function ModelLoaded(){
    console.log("Model has been successfully loaded :D");
    status = true
    Object_Wanted = document.getElementById("Object").value
    document.getElementById("wanted_Object").innerHTML = "A " + Object_Wanted + " is so far not found"
    console.log(Object_Wanted);
}

function gotresults(error,results){
 if(error){
  console.error(error)
 }
 if(results){
  console.log(results)
  objects = results
 }
}