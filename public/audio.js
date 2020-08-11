//Add more songs to make it show in the website :)
const songs = [
  {
    name: 'New Wave Kit',
    url: 'https://cdn.glitch.com/3fbe69b3-3f37-400c-b091-3c0b436ecb3f%2Fnew-wave-kit.ogg?v=1597079706818'
  }, 
  {
    name: 'Synth Organ',
    url: 'https://cdn.glitch.com/3fbe69b3-3f37-400c-b091-3c0b436ecb3f%2Fsynth-organ.ogg?v=1597079755404'
  }
];

// Create new element
function createNode(element) {
  return document.createElement(element);
}

// Create new element
function append(parent, el) {
  return parent.appendChild(el);
}

const main = document.querySelector('main');


// Render all song objects as elements and append it to #main
songs.forEach((song,index) => {
  let div = createNode('div'),
    playButton = createNode('button'),
    songName = createNode('h3');

  div.className = "song";
  playButton.id = `play${index}`;

  playButton.innerHTML = '▶';
  songName.innerHTML = song.name;

  append(main, div);
  append(div, playButton);
  append(div, songName);
  
  playButton.onclick = (event) => play(event, index, `play${index}`);
})


// Play Audio
function play(event, index, id) {
  const context = new AudioContext();  
  fetch(songs[index].url)
    .then(response => response.arrayBuffer())
    .then(arrayBuffer => context.decodeAudioData(arrayBuffer))
    .then(audioBuffer => {
      const source = context.createBufferSource();
      source.buffer = audioBuffer;
      source.connect(context.destination);
      source.start(); // play audio
      const playButton = document.getElementById(id);
      playButton.innerHTML = "▇"
      playButton.onclick = () => stop(playButton, index, source); // while the song is playing, attach onclick handler to call stop()
      source.onended = () => stop(playButton, index, source);
  });
}

// Stop playing audio
function stop(playButton, index, source) {
    playButton.innerHTML = "▶"
    source.stop(0); // stop audio
    playButton.onclick = (event) => play(event, index, `play${index}`); //re-attach onclicke handler to call play()
};

