function createList (array) {
    let listDiv = document.querySelector("#divList")
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

        deleteButton.addEventListener("click", function () {
            
        })
    }
}

createList(cities);