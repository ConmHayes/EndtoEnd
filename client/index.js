// const getData = async () => {
//     try {
//         const response = await fetch('http://localhost:3003/countries')
//         const data = await response.json();
//         return console.log(data);
//     } catch (err) {
//         console.error(err)
//     }
// }

const container = document.querySelector(".container");

function createPostElement(data) {
    const post = document.createElement("div");
    post.className = "post";

    const header = document.createElement("h2");
    header.textContent = data["name"];
    post.appendChild(header);

    const content = document.createElement("p");
    content.textContent = data["capital"];
    post.appendChild(content);

    return post;
}
function showCountry(data) {
    const country = document.createElement("div");
    country.className = "country";

    const header = document.createElement("h3");
    header.textContent = data["name"];
    country.appendChild(header);

    const content = document.createElement("span");
    content.textContent = data["capital"];
    country.appendChild(content);

    const ul = document.createElement("ul");
    country.appendChild(ul);

    const population = document.createElement('li')
    population.textContent = data["population"];
    ul.appendChild(population);

    const languages = document.createElement('li')
    languages.textContent = data["languages"];
    ul.appendChild(languages);

    const fun_fact = document.createElement('li')
    fun_fact.textContent = data["fun_fact"];
    ul.appendChild(fun_fact);

    return country;
}
async function loadPosts() {

    const response = await fetch('http://localhost:3003/countries')

    const posts = await response.json();




    posts.forEach(p => {
        console.log(p)
        const elem = createPostElement(p);
        container.appendChild(elem);
    })

}

loadPosts()

document.getElementById("chooseCountry").addEventListener("submit", async (e) => {
    e.preventDefault();
    const name = e.target[0].value;
    const response = await fetch(`http://localhost:3003/countries/${name}`);
    const data = await response.json();
    const country = document.querySelector(".country");

    if (response.status == 200) {
        container.style.display = 'none'
        const elem = showCountry(data);
        country.appendChild(elem);


    } else {
        console.log(data.error)

    }
})