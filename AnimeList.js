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
            if(received.data.length == 0) {
                postRes.appendChild(document.createElement('p').appendChild(document.createTextNode("No Result Found!")));
            }
            for(let i = 0; i < received.data.length; i++) {
                console.log(received.data[i].images.jpg.image_url);
            }
        }
    );
}


function main() {
    let searchButton = document.getElementById("SearchButton");

    searchButton.addEventListener("click", SearchAnime, false);

}

main();