let displayContent = document.getElementById("displayedContent");
let submitBtn = document.getElementById("submitBtn");

let timestamp = "1709381378289";
let apiKey = "d595dbcf2df6c0469d7368f570ef9b7c";
let hash = "66c44d4abdac8e3a153b571c47b265bd";

async function getCharacter() {
    let inputValue = document.getElementsByTagName("input")[0].value;
    console.log(inputValue)

    let url = `https://gateway.marvel.com/v1/public/characters?name=${inputValue}&ts=${timestamp}&apikey=${apiKey}&hash=${hash}`;

    await fetch(url)
        .then(response => response.json())
        .then(data => {
            displayContent.innerHTML = ""
            console.log(data)
            if (data.data.results.length < 1) {
                let InvalidCharacter = document.createElement("h4");
                InvalidCharacter.classList.add("text-danger")
                InvalidCharacter.innerHTML = `<span class="fw-bolder text-muted">${inputValue}</span> is a Invalid Character of MCU`
                displayContent.append(InvalidCharacter)
            } else {
                let h3 = document.createElement("h3");
                let p = document.createElement("p");
                let img = document.createElement("img");
                h3.innerText = data.data.results[0].name
                p.innerText = data.data.results[0].description
                img.src = `${data.data.results[0].thumbnail.path}.${data.data.results[0].thumbnail.extension}`
                img.style.width = "500px";

                displayContent.append(h3)
                displayContent.append(p)
                displayContent.append(img)
            }

        })
        .catch(error => console.error(error));
}

submitBtn.addEventListener("click", getCharacter);