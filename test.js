console.log("TEST 1");

fetch("http://localhost:8000/cities")
    .then(response => {
        console.log(response.status);
        
    })