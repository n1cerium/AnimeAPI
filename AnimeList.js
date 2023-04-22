



function SearchAnime() {
    let res = document.getElementById("result");
    let name = "";
    if(srch.value.includes(" ")) {
        name = srch.value.replace(" ", "%20%");
    } else {
        name = srch.value
    }
    const link = `https://api.jikan.moe/v4/anime?q=${name}`;
    const AnimList = fetch(link);

    AnimeList.then(
        function(response) {
            return response.json();
        }
    ).then(
        function(received) {
            console.log(received);
        }
    );
}


function main() {
    let searchButton = document.getElementById("SearchButton");

    window.addEventListener("click", SearchAnime, false);

}

main();