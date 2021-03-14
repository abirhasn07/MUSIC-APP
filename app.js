const songSearch = document.getElementById('searchSong');



songSearch.addEventListener('click', function() {
    const searchSongText = document.getElementById('search-field').value

    // fetch api here 

    const mainAPI = ` https://api.lyrics.ovh/suggest/${searchSongText}`
    fetch(mainAPI)
        .then(res => res.json())
        .then(data => {
            displaySong(data.data)
        })
})

const displaySong = songs => {

    const songContainer = document.getElementById('song-container')
    songContainer.innerHTML = ""
    songs.forEach(song => {
        console.log(song);


        const songDiv = document.createElement('div');
        songDiv.className = 'single-result row align-items-center my-3 p-3'
        songDiv.innerHTML = `<div class="col-md-9">
        <h3 class="lyrics-name">${song.title}</h3>
        <p class="author lead">Album by <span>${song.artist.name}</span></p>
        <audio controls class="audio_preview">
        <source src="${song.preview}">
       </audio>
    </div>
    <div class="col-md-3 text-md-right text-center">
        <button onclick="getLyric('${song.artist.name}','${song.title}')" class="btn btn-success" id="lyricBtn" >Get Lyrics</button>
    </div>`


        songContainer.appendChild(songDiv);

    });
}







const getLyric = (artist, title) => {
    const LyricsAPI = `https://api.lyrics.ovh/v1/${artist}/${title}`
    fetch(LyricsAPI)
        .then(res => res.json())
        .then(data => {
            displayLyrics(data.lyrics)
        })


}

const displayLyrics = (lyrics) => {
    const lyricDiv = document.getElementById('lyric-div')
    lyricDiv.innerText = ""
    lyricDiv.innerText = lyrics;
}