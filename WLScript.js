const {physics, styler} = popmotion;

let currentList = [];

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
function shortenWord(desc) {
    let splitDesc = desc.split(" ");
    let newDesc = [];
    for(let i = 0; i < 35; i++){
        newDesc.push(splitDesc[i]);
    }
    return newDesc.join(" ") + "...";
}
function display() {
    const res = document.getElementById("result");
    currentList = JSON.parse(localStorage.getItem("Lists"));
    for(let i = 0; i < currentList.length; i++) {
        const newDiv = crtElem("div", "class", "Item");
        console.log(currentList[i]);
        const dImg = crtElem("div", "class", "ImageDiv");
        const AnimImg = crtElem("img", "src", currentList[i][0].image);
        dImg.appendChild(AnimImg);

        const dTitle = crtElem("div", "class", "TitleDiv");
        const pTitle = crtElemText("h3", "id", "Title", currentList[i][0].title);
        dTitle.appendChild(pTitle);

        const DInfo1 = crtElem("div", "class", "Info1");
        const pGenres = crtElemText("p", "class", "Genre", "Genre: " + currentList[i][0].genre.join(", "));
        
        let pStatus= crtElemText("p", "class", "Status", "Status: Complete");
        if(currentList[i][0].status == "Currently Airing") {
            pStatus = crtElemText("p", "class", "Status", "Status: OnGoing");
        } else if (currentList[i][0].status == "Not yet aired") {
            pStatus = crtElemText("p", "class", "Status", "Status: Not yet aired");
        }
        const pSeason = crtElemText("p", "class", "Season", "Season: " + currentList[i][0].season);
        DInfo1.appendChild(pGenres);
        DInfo1.appendChild(pStatus);
        DInfo1.appendChild(pSeason);

        const DInfo2 = crtElem("div", "class", "Info2");

        let episodes = currentList[i][0].episodes;
        if(currentList[i][0].episodes == null) {
            episodes = "Unknown";
        } 
        const pEpisodes = crtElemText("p", "class", "Episodes", "Total Episode(s): " + currentList[i][0].episodes);
        const pDuration = crtElemText("p", "class", "Duration", "Duration: " + currentList[i][0].duration);
        DInfo2.appendChild(pEpisodes);
        DInfo2.appendChild(pDuration);

        const dDesc = crtElem("div", "class", "DescDiv");
        const hDesc = crtElemText("h3", "class", "Desc", "Description: ");
        const pDescription = crtElemText("p", "class", "Synopsis", shortenWord(currentList[i][0].description));
        dDesc.appendChild(hDesc);
        dDesc.appendChild(pDescription);

        newDiv.appendChild(dImg);
        newDiv.appendChild(dTitle);
        newDiv.appendChild(DInfo1);
        newDiv.appendChild(DInfo2);
        newDiv.appendChild(dDesc);

        const Links = crtElem("div", "class", "links");
        let divElement = crtElem("div", "class", "Favorite");
        let image = crtElem("img", "src", "star.png");
        let paragraph = crtElemText("p", "class", "", "Add to Favorite");
        divElement.appendChild(image);
        divElement.appendChild(paragraph);
        Links.appendChild(divElement);

        divElement = crtElem("div", "class", "Remove");
        image = crtElem("img", "src", "star.png");
        paragraph = crtElemText("p", "class", "", "Remove From List");
        divElement.appendChild(image);
        divElement.appendChild(paragraph);
        Links.appendChild(divElement);


        
        newDiv.appendChild(Links);

        res.appendChild(newDiv);


    }
}

function start() {
    display();
    let res = document.getElementById("result");
    const allItem = document.querySelectorAll(".Item");
    const removeButton = document.querySelectorAll(".Remove");
    for(let i = 0; i < allItem.length; i++) {
        removeButton[i].addEventListener("click", function() {
            let styleDiv = popmotion.styler(allItem[i]);
            popmotion.tween({
                from: {x:0, opacity: 1},
                to: {x: 2000, opacity: 0.5},
                duration: 3000
                
            }).start(styleDiv.set);

            currentList.splice(i,1);
            console.log(currentList);
            localStorage.setItem("Lists", JSON.stringify(currentList));
            setTimeout(() => {
                res.removeChild(allItem[i]);
              }, "2000");
            
        });
    }
}


start();