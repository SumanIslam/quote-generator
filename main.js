// selecting elements
const newQuote = document.querySelector('.quote');
const newAuthor = document.querySelector('.author');
const newQuoteButton = document.querySelector('#new-quote');
const twitterButton = document.querySelector('#twitter');
const quoteContainer = document.querySelector('#quote-container');
const loader = document.querySelector('#loader');


// show loader 
const showLoader = () => {
  loader.style.display = 'block';
  quoteContainer.style.display = 'none';
}

const hideLoader = () => {
  if(loader.style.display === 'block') {
    quoteContainer.style.display = 'block'
    loader.style.display = 'none';
  }
}

// quote container function
const quoteTemplate = (data) => {
  const dash = '\u2014';
  // reduce font size for 'long quote'
  if(data.quoteText.length > 120) {
    newQuote.classList.add('long-quote');
  } else {
    newQuote.classList.remove('long-quote')
  }
  newQuote.textContent = data.quoteText;

  // add 'unknown' if author is blank
  if(data.quoteAuthor === '') {
    newAuthor.textContent = `${dash} Unknown`;
  } else {
    newAuthor.textContent = `${dash} ${data.quoteAuthor}`;
  }
}
// get quote function
async function getQuote() {
  // displaying loader
  showLoader();
  const proxyUrl = 'https://evening-chamber-02520.herokuapp.com/';
  const apiUrl = 'https://api.forismatic.com/api/1.0/?method=getQuote&format=json&lang=en'
  try {
    const response = await fetch(proxyUrl + apiUrl);
    const data = await response.json();

    quoteTemplate(data); //calling quoteContainer function
  } catch(error) {
    getQuote();
  }

  // hide loader
  hideLoader();
}

// tweet quote function
const tweetQuote = () => {
  const quote = newQuote.textContent;
  const author = newAuthor.textContent;
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quote} ${author}`
  window.open(twitterUrl, '_blank')
}

// event listener
newQuoteButton.addEventListener('click', getQuote);
twitterButton.addEventListener('click', tweetQuote);
// on load
getQuote();


