navigator.getUserMedia = ( navigator.getUserMedia ||
                       navigator.webkitGetUserMedia ||
                       navigator.mozGetUserMedia ||
                       navigator.msGetUserMedia);

if(navigator.getUserMedia){
  console.log('getUserMedia supported.');
  navigator.mediaDevices.getUserMedia(
    {
    audio:true
  })

  .then(function(stream){
    var mediaRecorder = new MediaRecorder(stream);
    record.onclick = function(){
      mediaRecorder.start();
      console.log(mediaRecorder.state);
      console.log('recorder started');
      record.style.background = 'red';
      record.style.color = 'black';
    }

    var clipStream = [];

    mediaRecorder.ondataavailable = function(e){
      clipStream.push(e.data);
    }

    stop.onclick = function(){
      mediaRecorder.stop();
      console.log(mediaRecorder.state);
      console.log('recorder stopped');
      record.style.background = '';
      record.style.color = '';
    }
    mediaRecorder.onstop=function(e){ //On stop, recording should load into player
      console.log('recorder stopped');
      var blob = new Blob(clipStream, {'type':'audio/ogg; codecs=opus'});
      clipStream= [];
      //jquery_jplayer_1.jPlayer('load'):jQuery;  //Tryna load the blob into the player, but not sure how jquery works
    }
  })

  .catch(function(err){
    console.log('The following getUserMedia error occurred: ' + err);
    }
  );
} else{
  console.log('getUserMedia not supported on your browser!');
}
