function createList (array) {
    let listDiv = document.querySelector("#divList")
    listDiv.innerHTML = "";
    for (let city of array) {
        let cityDiv = document.createElement("div");
        cityDiv.classList.add("cityDiv");
        listDiv.appendChild(cityDiv);
        cityDiv.innerHTML = `${city.name}, ${city.country}`;

        const deleteButton = document.createElement("button");
        deleteButton.classList.add("deleteButton");
        deleteButton.id = `${city.name}`;
        deleteButton.innerHTML = `Delete`;
        cityDiv.appendChild(deleteButton);
        deleteButton.addEventListener("click", function () {
            let indexToDelete = cities.findIndex(x => x.name == deleteButton.id);
            console.log(indexToDelete);
            
            cities.splice(indexToDelete, 1);
            createList(cities);
        })
    }
}
createList(cities);

