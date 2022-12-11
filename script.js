const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');

let apiQuotes = [];
// Show loading
function loading(){
    loader.hidden=false;
    quoteContainer.hidden=true;
}
function complete(){
    quoteContainer.hidden = false;
    loader.hidden = true;
}


// Show new quote
function newQuote(){
    loading();
    // Pick a random quote from apiQuotes array
    const quote = apiQuotes[Math.floor(Math.random()*apiQuotes.length)];
//    Check if Author field is blank and replace with 'Unknown'
    if(!quote.author){
        authorText.textContent = 'Unkonwn';
    } else{
        authorText.textContent = quote.author;
    }
//    Chcek Quote length to determine styling
    if(quote.text.length > 100){
        quoteText.classList.add('long-quote');
    } else{
        quoteText.classList.remove('long-quote')
    }
    // Set Quote, Hide Loader
    quoteText.textContent = quote.text;
    complete();
}

// Get quotes from API
async function getQuotes(){
    loading();
    const apiUrl='https://jacintodesign.github.io/quotes-api/data/quotes.json';
    try {
        const response = await fetch(apiUrl);
        apiQuotes = await response.json();
        newQuote()
    } catch (error) {
        
        // Catch Error Here
    }
}

// Tweet Quote
function tweetQuote(){
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
    window.open(twitterUrl, 'blank');
}

// Event Listeners
newQuoteBtn.addEventListener('click',getQuotes);
twitterBtn.addEventListener('click',tweetQuote);

// on load
getQuotes()
