let request = new Request("http://localhost:8000/cities")

fetch(request)
    .then((response) => response.json())
    .then((cities) => {
        let listDiv = document.querySelector("#divList");
        listDiv.innerHTML = "";
        for (let city of cities) {
            let cityDiv = document.createElement("div");
            cityDiv.classList.add("cityDiv");
            listDiv.appendChild(cityDiv);
            cityDiv.innerHTML = `${city.name}, ${city.country}`;

            const deleteButton = document.createElement("button");
            deleteButton.classList.add("deleteButton");
            deleteButton.innerHTML = `Delete`;
            cityDiv.appendChild(deleteButton);
            deleteButton.addEventListener("click", () => {
                fetch("http://localhost:8000/cities", {
                    method: "DELETE",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ id: city.id })
                }).then((response) => {
                    if (response.status == 200) {
                        cityDiv.remove();
                    } else {
                        alert("Delete malfunction")
                    }
                })
            })
        }
    })

const addButton = document.querySelector("#addButton");
addButton.addEventListener("click", () => {
    const name = document.querySelector("#inputNameAdd").value;
    const country = document.querySelector("#inputCountryAdd").value;

    if (!name || !country) {
        alert("Du måste fylla i både namn och land!")
        return;
    }

    const body = JSON.stringify({ name, country })

    fetch("http://localhost:8000/cities", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: body
    }).then((response) => {
        if (response.status == 200) {
            return response.json();
        } else if (response.status == 409) {
            throw new Error("Staden finns redan!")
        } else if (response.status == 400) {
            throw new Error("Fyll i namn och eller land");
        } else {
            throw new Error("Något gick fel?")
        }
    }).then((addedCity) => {
        let listDiv = document.querySelector("#divList");
        let cityDiv = document.createElement("div");
        cityDiv.classList.add("cityDiv");
        listDiv.appendChild(cityDiv);
        console.log(cityDiv);
        
        cityDiv.innerHTML = `${addedCity.name}, ${addedCity.country}`;

        const deleteButton = document.createElement("button");
        deleteButton.classList.add("deleteButton");
        deleteButton.innerHTML = `Delete`;
        cityDiv.appendChild(deleteButton);

        deleteButton.addEventListener("click", () => {
            fetch("http://localhost:8000/cities", {
                method: "DELETE",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id: addedCity.id })
            }).then((response) => {
                if (response.status == 200) {
                    cityDiv.remove();
                } else {
                    alert("Delete malfunction")
                }
            })

        })

    })
})

const searchButton = document.querySelector("#searchButton");
searchButton.addEventListener("click", () => {
    const name = document.querySelector("#inputTextSearch").value;
    const country = document.querySelector("#inputCountrySearch").value;

    const urlText = new URLSearchParams();
    if (name) urlText.append("text", name);
    if (country) urlText.append("country", country);

    fetch(`http://localhost:8000/cities/search?${urlText.toString()}`)
        .then((response) => response.json())
        .then((results) => {
            const citiesSearchDiv = document.querySelector("#citiesSearchDiv");
            citiesSearchDiv.innerHTML = "";

            if (results.length == 0) {
                citiesSearchDiv.innerHTML = "Inga städer hittades."
                return;
            } 

            for (let city of results) {
                const cityDiv = document.createElement("div");
                cityDiv.classList.add("cityDiv")
                cityDiv.innerHTML = `${city.name}, ${city.country}`;
                citiesSearchDiv.appendChild(cityDiv);
            }
        })
})