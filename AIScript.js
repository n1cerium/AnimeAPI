

function getIDFromURL(link) {
    let idx = link.indexOf("id");
    let IDinfo = link.substring(idx);

    return IDinfo.split("=")[1];
}


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


function FetchAndDisplayAnimeInfo(AnimeID) {
    const res = document.getElementById("result");
    const AnimeLink = `https://api.jikan.moe/v4/anime/${AnimeID}`;
    const AnimeInfo = fetch(AnimeLink);

    AnimeInfo.then(
        function(response) {
            return response.json();
        }
    ).then(
        function(received) {
            let title = received.data.title;
            if(title.includes("\"")) {
                title = received.data.title.substring(1, received.data.title.length-1);
            } 
            const fromDay = received.data.aired.prop.from.day;
            const fromMonth = received.data.aired.prop.from.month;
            const fromYear = received.data.aired.prop.from.year;
            const toDay = received.data.aired.prop.to.day;
            const toMonth = received.data.aired.prop.to.month;
            const toYear = received.data.aired.prop.to.year;

            document.title = title
            console.log(received);
            const dImg = crtElem("div", "id", "ImageDiv");
            const AnimImg = crtElem("img", "src", received.data.images.jpg.large_image_url);
            dImg.appendChild(AnimImg);

            const dTitle = crtElem("div", "id", "TitleDiv");
            const pTitle = crtElemText("h3", "id", "Title", title);
            dTitle.appendChild(pTitle);

            const DInfo1 = crtElem("div", "id", "Info1");
            const pType = crtElemText("p", "class", "status", "Type: " + received.data.type);

            let pAired;
            if(toDay == null || toMonth == null || toYear == null) { // check if the the anime is ongoing
                pAired = crtElemText("p", "id", "Aired", "Aired: " + fromMonth + "/" + fromDay + "/" + fromYear);
            } else {
                pAired = crtElemText("p", "id", "Aired", "Aired: " + fromMonth + "/" + fromDay + "/" + fromYear + " - " + toMonth + "/" + toDay + "/" + toYear);
            }

            DInfo1.appendChild(pAired);
            DInfo1.appendChild(pType);

            let pBroadcast;
            let pStatus= crtElemText("p", "id", "Status", "Status: Complete");
            if(received.data.status == "Currently Airing") {
                pStatus = crtElemText("p", "id", "Status", "Status: OnGoing");
                pBroadcast = crtElemText("p", "id", "Broadcast", received.data.broadcast.string);
                DInfo1.appendChild(pBroadcast);
            }
            DInfo1.appendChild(pStatus);
            

            const DInfo2 = crtElem("div", "id", "Info2");
            let genres = [];
            for(let i = 0; i < received.data.genres.length; i++) {
                genres.push(received.data.genres[i].name);
            }
            const pGenre = crtElemText("p", "id", "Genre", "Genres: " + genres.join(", "));

            let season = received.data.season;
            if(season == null) {
                season = "Unknown";
            } else {
                season = season[0].toUpperCase() + season.slice(1);
            }
            const pSeason = crtElemText("p", "id", "Season", "Season: " + season);

            let episodes = received.data.episodes;
            if(received.data.episodes == null) {
                episodes = "Unknown";
            } 
            const pEpisodes = crtElemText("p", "id", "Episodes", "Total Episode(s): " + episodes);
            const pDuration = crtElemText("p", "id", "Duration", "Duration: " + received.data.duration);


            DInfo2.appendChild(pGenre);
            DInfo2.appendChild(pSeason);
            DInfo2.appendChild(pEpisodes);
            DInfo2.appendChild(pDuration);

            const dDesc = crtElem("div", "id", "DescDiv");
            const hDesc = crtElemText("h3", "id", "Desc", "Description: ");
            let desc = received.data.synopsis;
            if(desc.includes("[Written by MAL Rewrite]")) {
                desc = received.data.synopsis.replace("[Written by MAL Rewrite]", "");
            }
            const pDescription = crtElemText("p", "id", "Synopsis", desc);

            dDesc.appendChild(hDesc);
            dDesc.appendChild(pDescription);

            res.appendChild(dImg);
            res.appendChild(dTitle);
            res.appendChild(DInfo1);
            res.appendChild(DInfo2);
            res.appendChild(dDesc);

        }
    );
}



function main() {
    const currentURL = window.location.href;
    const AnimeID = getIDFromURL(currentURL);
    FetchAndDisplayAnimeInfo(AnimeID);
}



main();