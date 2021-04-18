const button = document.getElementById("button");
const audioElement = document.getElementById("audio");

function toggleButton() {
    button.disabled = !button.disabled;
}

function tellMe(joke) {
    VoiceRSS.speech({
        key: '35284d5c4d8a4beabde14747b1fb387d',
        hl: 'en-us',
        src: joke,
        r: 0,
        c: 'mp3',
        f: '44khz_16bit_stereo',
        ssml: false
    });
}
async function getJokes() {
    let joke = '';
    const apiUrl = 'https://v2.jokeapi.dev/joke/Programming?blacklistFlags=nsfw,religious,political,racist,sexist,explicit&type=twopart'
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        if (data.setup) {
            joke = `${data.setup} ... ${data.delivery}`
            console.log(joke);
        } else {
            joke = data.joke
        }
        tellMe(joke);
        toggleButton();
    } catch (error) {
        console.error("Whoops ", error);
    }
}
button.addEventListener("click", getJokes);
audioElement.addEventListener("ended", toggleButton)