Hi, thanks for checking out my code. 

This website is built with plain vanilla JS and the Web Audio API.

Why PlainJS?

If there was no contingency in using a bundler, my choice would've been going with a framework like React / Next.js. Since the application's features were minimal, plain JS was enough to fetch, render, allow for sorting and grouping.

How does it work?

Data Page (`script.js`) - 

1. First, the main() fn is called which fetches the data and calls insertPosts() with the fetched data.
2. insertPosts() creates the necessary DOM elements and inserts it on to the page, applying the required styling.
3. onclick() and onchange() handlers are set on Sort and GroupBy input elements.
4. when Sort is clicked, the posts are sorted and replacePosts() is called with the new sorted data. replacePosts() directly inserts the data into the innerHTML and does not remove and add new DOMs (since they're a costly operation).
5. When groupBy is selected from the dropdown, it filters the posts based on user ID and insertPosts() is called with the new filtered data.

Audio Page (`audio.js`)

1. The songs are stored in an object and they are rendered on to the DOM by applying the necessary styles.
2. When clicked on Play on a song, it fetches the song and plays the song using the Web Audio API.
3. When the song is being played, onclick listeners are added to call stop(). So when the user click on button, the song stops playing.
4. When the song has finished playing, stop() is automatically called since the web audio allows us to assign stop() to the onended property in the audio bufferSource.
