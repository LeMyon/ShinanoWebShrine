let siteFox = "Shinano Gallery Box";

let gallery = document.getElementById("gallery");
let galleryHeader = document.createElement("h1");
galleryHeader.classList.add("h-title");
galleryHeader.innerHTML = siteFox;

let thumbWrapper = document.createElement("div");
thumbWrapper.classList.add("thumbnail-wrapper");

let thumbBox = document.createElement("div");
thumbBox.classList.add("thumbnail-box");
thumbBox.appendChild(thumbWrapper);

let quoteSection = document.getElementById("quote-box");
let q_noteBox = document.getElementById("note-box");

gallery.appendChild(galleryHeader);
gallery.appendChild(thumbBox);


let historyNav = document.getElementById("nav-history");
let historyBox = document.getElementById("history-box");

///////

let pictureIndex = 30; //index för antal bilder i mappen 

function createGallery() {
    for (i = 0; i < pictureIndex; i++) {

        let img = document.createElement("img");
        img.classList.add("thumbnail");
        img.setAttribute("src", `img/shinano${i}.jpg`);

        //skickar img och indexvärdet till funktionen CreateImage
        createImage(img, i);
    }
}



function createOverlayContent(image) {
    let overlayContent = document.querySelector('.overlay-content');
    overlayContent.appendChild(image);

    //öppnar bild i ny flik
    let ocImage = document.querySelector(".overlay-content img");
    ocImage.addEventListener("click", function () {
        window.open(`${image.src}`)
    })

}

function createImage(image, index) {

    image.setAttribute("src", `img/shinano${index}.jpg`);
    thumbWrapper.appendChild(image);

    //overlay effect toggle
    image.addEventListener("click", function () {
        let overlay = document.querySelector('.overlay');
        overlay.style.display = 'block';

        let imageCopy = document.createElement("img");
        imageCopy.setAttribute("src", `img/shinano${index}.jpg`);

        createOverlayContent(imageCopy);
        overlay.addEventListener("click", clearModal)
    })
}

function clearModal() {
    let overlay = document.querySelector('.overlay');
    overlay.style.display = 'none';
    let overlayContent = document.querySelector('.overlay-content');
    overlayContent.innerHTML = '';
}

createGallery();


//quotes 
async function getQuotes() {

    try {
        let response = await fetch('./quotes.json');
        let data = await response.json();
        // console.log(data);

        // let quoteArr = [];

        for (i = 0; i < data.shinanoQuotes.length; i++) {
            displayQuotes(data.shinanoQuotes[i]);
            // quoteArr.push(data.shinanoQuotes[i]);

        }
        // displayQuotes(quoteArr)
    } catch (err) {
        console.error(err);
    }
}

getQuotes();


function displayQuotes(quote) {
    let quoteWrapper = document.getElementById("quote-wrapper");

    let q_category = document.createElement("h3");
    q_category.classList.add("q-category");
    q_category.innerHTML = quote.category;

    quoteWrapper.appendChild(q_category);

    // console.log(quote)


    q_category.addEventListener("click", function () {



        quoteSection.innerHTML = ""; //reset

        let quoteBubble = document.createElement("div");
        quoteBubble.classList.add("quote-bubble");

        let jpQuote = document.createElement("p");
        jpQuote.classList.add("jp");
        jpQuote.innerHTML = quote.jp_quote;

        let enQuote = document.createElement("p");
        enQuote.classList.add("en");
        enQuote.innerHTML = quote.en_quote;


        q_noteBox.innerHTML = ""; //reset

        let q_notes = document.createElement("div"); //notes
        q_notes.classList.add("q-notes");
        q_notes.innerHTML = quote.notes;
        q_noteBox.appendChild(q_notes);

        let closeBubble = document.createElement("div");
        closeBubble.classList.add("close-bubble");

        let closeBubble_X = document.createElement("p");
        closeBubble_X.classList.add("close-x");
        closeBubble_X.innerHTML = "X";
        closeBubble.appendChild(closeBubble_X);


        quoteBubble.appendChild(jpQuote);
        quoteBubble.appendChild(enQuote);
        quoteSection.appendChild(quoteBubble);
        quoteBubble.appendChild(closeBubble);
        createEmote(); //genererar random emote

        closeBubble_X.addEventListener("click", closeQuote)

    })


}

function createEmote() {
    let emote = document.getElementById("emote");
    emote.innerHTML = "";
    RNG_emote = Math.floor(Math.random() * 6 + 1);

    let emoteImg = document.createElement("img");
    emoteImg.classList.add("emote");
    emoteImg.setAttribute("src", `img/emote/e${RNG_emote}.jpg`);
    emote.appendChild(emoteImg);

}


function closeQuote() {
    quoteSection.innerHTML = ""; //reset
    q_noteBox.innerHTML = ""; //reset

}

//History 



async function getHistory() {

    try {
        let response = await fetch('./history.json');
        let data = await response.json();

        console.log(data.shinanoHistory);

        for (i = 0; i < data.shinanoHistory.length; i++) {
            createHistory(data.shinanoHistory[i]);
        }
    } catch (err) {
        console.error(err);
    }
}

getHistory();

function createHistory(history) {
    //historyNav  & historyBox 
    let chapter = document.createElement("div");
    chapter.classList.add("chapters");

    chapter.innerHTML = history.part;
    historyNav.appendChild(chapter);

    chapter.addEventListener("click", function () {
        printHistory(history.desc, history.img)
    });
}

function printHistory(description, imagec) {
    historyBox.innerHTML = "";
    let desc = document.createElement("div");
    desc.classList.add("desc");
    desc.innerHTML = description;

    historyBox.appendChild(desc);

    let image = document.createElement("img");
    image.classList.add("history-img");
    image.setAttribute("src", imagec);

    historyBox.appendChild(image);


}