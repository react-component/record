import React from 'react';
var RecordWorker = require("worker-loader!./worker");
var resampler = require('audio-resampler');

let recLength = 0;
let recBuffersL = [];
let recBuffersR = [];

function hasGetUserMedia() {
  return !!(navigator.getUserMedia || navigator.webkitGetUserMedia ||
            navigator.mozGetUserMedia || navigator.msGetUserMedia);
}

function getAudioContext() {
  return (AudioContext && new AudioContext()) || 
         (webkitAudioContext && new webkitAudioContext());
}

function getUserMedia(...args) {
  if (!hasGetUserMedia()) {
    return;
  }

  return navigator.getUserMedia && navigator.getUserMedia(...args)|| 
         navigator.webkitGetUserMedia && navigator.webkitGetUserMedia(...args)||
         navigator.mozGetUserMedia && navigator.mozGetUserMedia(...args) || 
         navigator.msGetUserMedia && navigator.msGetUserMedia(...args)
}

class Record extends React.Component {
  constructor() {
    super();
    this.state = {
      avaliable: hasGetUserMedia(),
      recording: false,
    }
  }
  componentWillMount() {
    if (hasGetUserMedia()) {
      getUserMedia({audio: true}, this.onSuccess, this.onFail);
    }
  }
  onSuccess = (localMediaStream) => {
    const context = getAudioContext();
    const inputPoint = context.createGain();
    const realAudioInput = context.createMediaStreamSource(localMediaStream);
    const audioInput = realAudioInput;
    
    var worker = new RecordWorker();

    worker.postMessage({
      command: 'init',
      config: {
        sampleRate: context.sampleRate
      }
    });

    worker.onmessage = (e) => {
      var blob = e.data;
      var audioBlob = new Blob([blob], { type: 'audio/wav' });
  
      resampler(window.URL.createObjectURL(audioBlob), 16000, function(event){
        event.getFile(function (fileEvent) {
          var audio = document.querySelector('audio');
          audio.src = fileEvent;
          var a = document.createElement("a");
          document.body.appendChild(a);
          a.download = "resampled.wav";
          a.style = "display: none";
          a.href = fileEvent;
          a.click();
          window.URL.revokeObjectURL(fileEvent);
          document.body.removeChild(a);
        });
      });

      // this.forceDownload(blob, 'record.wav');
    }

    const node = context.createScriptProcessor(4096, 1, 1);
    audioInput.connect(inputPoint);

    node.onaudioprocess = (e) => {
      if (this.state.recording) {
        worker.postMessage({
          command: 'record',
          buffer: [
            e.inputBuffer.getChannelData(0),
          ]
        });
      }
    }

    this.worker = worker;

    inputPoint.connect(node);
    node.connect(context.destination);  
    // updateAnalysers();
  }
  onFail = (e) => {
    console.error('Initial userMedia failed!', e);
  }
  exportWav = () => {
    const type = 'audio/wav';
    this.worker.postMessage({
      command: 'exportMonoWAV',
      type: type
    });
  }
  forceDownload = (blob, filename) => {
    const url = (window.URL || window.webkitURL).createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.innerHTML = 'download';
    link.download = filename || 'output.wav';
    document.body.appendChild(link);
    const click = document.createEvent("Event");
    click.initEvent("click", true, true);
    link.dispatchEvent(click);
  }
  startRecord = () => {
    this.setState({
      recording: true
    });
    this.worker.postMessage({
      command: 'clear',
    });
  }
  stopRecord = () => {
    this.setState({
      recording: false
    });
    this.exportWav();
  }
  render() {
    return <div> 
     <div>  {this.state.recording ? 'recording....' : 'click `Start` to record'} </div>
      {this.state.recording ? <button onClick={this.stopRecord}> Stop </button> : <button onClick={this.startRecord}> Start </button>}
      <div> <audio controls/> </div>
    </div>;
  }
}


export default Record;