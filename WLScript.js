
function crtElem(tagName, attributeType, className) {
    const node = document.createElement(tagName);
    node.setAttribute(attributeType, className);

    return node;
}

function crtElemText(tagName, attributeType, className, content) {
    const elem = crtElem(tagName, attributeType, className);
    const cont = document.createTextNode(content);
    elem.appendChild(cont);

    return elem;
}

function display() {
    const res = document.getElementById("result")
    let currentList = JSON.parse(localStorage.getItem("Lists"));
    for(let i = 0; i < 1; i++) {
        console.log(currentList[i]);
        const dImg = crtElem("div", "id", "ImageDiv");
        const AnimImg = crtElem("img", "src", currentList[i][0].image);
        dImg.appendChild(AnimImg);

        const dTitle = crtElem("div", "id", "TitleDiv");
        const pTitle = crtElemText("h3", "id", "Title", currentList[i][0].title);
        dTitle.appendChild(pTitle);

        const DInfo1 = crtElem("div", "id", "Info1");
        const pGenres = crtElemText("p", "class", "Genre", "Genre: " + currentList[i][0].genre.join(", "));
        
        let pStatus= crtElemText("p", "id", "Status", "Status: Complete");
        if(received.data.status == "Currently Airing") {
            pStatus = crtElemText("p", "id", "Status", "Status: OnGoing");
        } else if (received.data.status == "Not yet aired") {
            pStatus = crtElemText("p", "id", "Status", "Status: Not yet aired");
        }
        const pSeason = crtElemText("p", "id", "Season", "Season: " + currentList[i][0].season);
        DInfo1.appendChild(pGenres);
        DInfo1.appendChild(pStatus);
        DInfo1.appendChild(pSeason);

        const DInfo2 = crtElem("div", "id", "Info2");

        let episodes = received.data.episodes;
        if(received.data.episodes == null) {
            episodes = "Unknown";
        } 
        const pEpisodes = crtElemText("p", "id", "Episodes", "Total Episode(s): " + currentList[i][0].episodes);
        const pDuration = crtElemText("p", "id", "Duration", "Duration: " + currentList[i][0].duration);
        DInfo2.appendChild(pEpisodes);
        DInfo2.appendChild(pDuration);

        const dDesc = crtElem("div", "id", "DescDiv");
        const hDesc = crtElemText("h3", "id", "Desc", "Description: ");
        let desc = currentList[i][0].synopsis == null ? "Unknown" : currentList[i][0]
        const pDescription = crtElemText("p", "id", "Synopsis", desc);
        dDesc.appendChild(hDesc);
        dDesc.appendChild(pDescription);
        res.appendChild(dImg);
        res.appendChild(dTitle);
        res.appendChild(DInfo1);
        res.appendChild(DInfo2);
        res.appendChild(dDesc);


    }
}

function start() {
    display();
}


start();