const {physics, styler} = popmotion;

let allList;

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
    let currentList = JSON.parse(localStorage.getItem("Lists"));
    allList = currentList;
    for(let i = 0; i < currentList.length; i++) {
        current =  currentList[i][0];
        const newDiv = crtElem("div", "class", "Item");
        console.log(currentList[i]);
        const dImg = crtElem("div", "class", "ImageDiv");
        const AnimImg = crtElem("img", "src", current.image);
        dImg.appendChild(AnimImg);

        const dTitle = crtElem("div", "class", "TitleDiv");
        const pTitle = crtElemText("h3", "id", "Title", current.title);
        dTitle.appendChild(pTitle);

        const DInfo1 = crtElem("div", "class", "Info1");
        let pGenres;
        if(current.genre.length == 1) {
            pGenres = crtElemText("p", "class", "Genre", "Genre: " + current.genre[0]);

        } else {
            pGenres = crtElemText("p", "class", "Genre", "Genre: " + current.genre.join(", "));

        }
        
        let pStatus= crtElemText("p", "class", "Status", "Status: Complete");
        if(current.status == "Currently Airing") {
            pStatus = crtElemText("p", "class", "Status", "Status: OnGoing");
        } else if (current.status == "Not yet aired") {
            pStatus = crtElemText("p", "class", "Status", "Status: Not yet aired");
        }
        const pSeason = crtElemText("p", "class", "Season", "Season: " + current.season);
        DInfo1.appendChild(pGenres);
        DInfo1.appendChild(pStatus);
        DInfo1.appendChild(pSeason);

        const DInfo2 = crtElem("div", "class", "Info2");

        let episodes = current.episodes;
        if(current.episodes == null) {
            episodes = "Unknown";
        } 
        const pEpisodes = crtElemText("p", "class", "Episodes", "Total Episode(s): " + current.episodes);
        const pDuration = crtElemText("p", "class", "Duration", "Duration: " + current.duration);
        DInfo2.appendChild(pEpisodes);
        DInfo2.appendChild(pDuration);

        const dDesc = crtElem("div", "class", "DescDiv");
        const hDesc = crtElemText("h3", "class", "Desc", "Description: ");
        const pDescription = crtElemText("p", "class", "Synopsis", shortenWord(current.description));
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

            allList.splice(i,1);
            console.log(allList);
            localStorage.setItem("Lists", JSON.stringify(allList));
            setTimeout(() => {
                res.removeChild(allItem[i]);
              }, "2000");
            
        });
    }
}


start();