let mute = false;
let mystream;
let join=false;


// client creation
let client = AgoraRTC.createClient({
  mode: "rtc",
  codec: "vp8",
});

// initialized the client
client.init("31ad0c3d0c714f41b5526c2dfb4c1861");

// creating the channel
client.join(
   "00631ad0c3d0c714f41b5526c2dfb4c1861IADJ0lBiirp/ETWyi5PPImS8bRTx0p7NTpLWuh621CHg77Cn3UMAAAAAEAAHiSHUnBDvYAEAAQCbEO9g",
   "kusum",
  null,
  (uid) => {
    // Create a local stream
    let localStream = AgoraRTC.createStream({     
      audio: true,
      video: true,
    });
    localStream.init(() => {                    
      mystream = localStream;
      localStream.play("local");
      client.publish(localStream);
    });
  }
);

client.on("stream-added", function (evt) {
  client.subscribe(evt.stream);
});

client.on("stream-subscribed", function (evt) {
  let stream = evt.stream;
  let streamId = String(stream.getId());
  let right = document.getElementById("remote");
  let div = document.createElement("div");
  div.id = streamId;
  right.appendChild(div);
  stream.play(streamId);
});

function muteAudio() {
  mystream.muteAudio();
}

function unmuteAudio() {
  mystream.unmuteAudio();
}
