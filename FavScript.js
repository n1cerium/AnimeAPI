const {physics, keyframes,  tween, styler} = popmotion;

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

function display() {
    let currentlist = JSON.parse(localStorage.getItem("Favorite"));
    allList = currentlist;
    const res = document.getElementById("result");
    for(let i = 0; i < currentlist.length; i++) {
        const item = crtElem("div", "class", "Item");
        let title = crtElemText("h3", "class", "title", currentlist[i][0].title);
        let crossImage = crtElem("img", "src", "x_img.png");
        let img = crtElem("img", "src", currentlist[i][0].image);
        img.setAttribute("class", "AnimImage");
        crossImage.setAttribute("class", "xImage");
        item.appendChild(img);
        item.appendChild(title);
        item.appendChild(crossImage);

        res.appendChild(item);
    }
}

function start() {
    display();
    
    let res = document.getElementById("result");
    const item = document.querySelectorAll(".Item");
    const xImage = document.querySelectorAll(".xImage");
    for(let i = 0; i < item.length; i++) {
       xImage[i].addEventListener("click", function() {
        let styleDiv = popmotion.styler(item[i]);
        popmotion.tween({
            from: {scale: 1},
            to: {scale: 0},
            duration: 2000
        }).start(styleDiv.set);

        allList.splice(i,1);
        console.log(item);
        localStorage.setItem("Favorite", JSON.stringify(allList));
        setTimeout(() => {
            res.removeChild(item[i]); console.log("dsds")
          }, "3000");
       });
        
    }
    
}


start();