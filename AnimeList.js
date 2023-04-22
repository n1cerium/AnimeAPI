const { tween, styler, value} = popmotion;

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


function SearchAnime() {
    let postRes = document.getElementById("result");
    let res = document.getElementById("SearchResult");
    let name = "";
    if(res.value.includes(" ")) {
        name = res.value.replace(" ", "%20%");
    } else {    
        name = res.value;
    }
    name = name.toLowerCase();
    const link = `https://api.jikan.moe/v4/anime?q=${name}`;
    console.log(link);
    const AnimList = fetch(link);

    AnimList.then(
        function(response) {
            return response.json();
        }
    ).then(
        function(received) {
            console.log(received);
            
            if(document.getElementById("AnimImages") != null) {
                postRes.removeChild(document.getElementById("AnimImages"));   
            }
            if(document.getElementById("none") != null)
                    postRes.removeChild(document.getElementById("none"));

            if(received.data.length == 0) {
                const hRes = crtElemText("h3", "id", "none", "No Result Found!");
                postRes.appendChild(hRes);
            } else {
                const imgArticle = crtElem("article", "id", "AnimImages");

                for(let i = 0; i < received.data.length; i++) {
                    const aInfo = crtElem("a", "href", "AnimeInfo.html?id=" + received.data[i].mal_id);
                    const dAnimInfo = crtElem("div", "class", "Anime");
                    const imgRes = crtElem("img", "id", received.data[i].mal_id);
                    console.log()
                    const pTitle = crtElemText("p", "class", "Title", received.data[i].title);
                    
                    imgRes.setAttribute("src", received.data[i].images.jpg.image_url);
                    dAnimInfo.appendChild(imgRes);
                    dAnimInfo.appendChild(pTitle);
                    aInfo.appendChild(dAnimInfo);
                    imgArticle.appendChild(aInfo);

                    
                }    
                postRes.appendChild(imgArticle);
            }
        }
    );
}


function main() {
    let searchButton = document.getElementById("SearchButton");

    searchButton.addEventListener("click", SearchAnime, false);

}

main();