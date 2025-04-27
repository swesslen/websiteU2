async function execTests() {
    await test1();
};

execTests();

async function test1() {
    fetch("http://localhost:8000/cities")
        .then(response => {
            if (!response.ok) {
                throw new Error("Något gick fel (GET-förfrågan till /cities)");
            };
            console.log("TEST 1", response.status);
            return response.json();
        })
        .then(cities => {
            console.log("TEST 1", cities);
            test2();
        })
        .catch(error => {
            console.error("test 1", error);
        });
};

async function test2() {
    fetch("http://localhost:8000/cities", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            name: "Malmö",
            country: "Sweden"
        })
    })
        .then(response => {
            if (!response.ok) {
                throw new Error("Något gick fel (POST-förfrågan till /cities");
            };
            console.log("TEST 2", response.status);
            return response.json();
        })
        .then(data => {
            console.log("TEST 2: Staden tillagd:", data);
            test3();
        })
        .catch(error => {
            console.error("test 2", error);
        });
};

async function test3() {
    fetch("http://localhost:8000/cities", {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            id: 2
        })
    })
        .then(response => {
            if (!response.ok) {
                throw new Error("Något gick fel (DELETE-förfrågan till /cities");
            };
            console.log("TEST 3", response.status);
            return response.json();
        })
        .then(data => {
            console.log("TEST 3:", data);
            test4();
        })
        .catch(error => {
            console.error("test 3", error);
        });
};

async function test4() {
    fetch("http://localhost:8000/cities")
        .then(response => {
            if (!response.ok) {
                throw new Error("Något gick fel (GET-förfrågan till /cities)");
            };
            console.log("TEST 4", response.status);
            return response.json();
        })
        .then(cities => {
            console.log("TEST 4", cities);
            test5();
        })
        .catch(error => {
            console.error("test 4", error);
        });
};

async function test5() {
    fetch("http://localhost:8000/cities/43")
        .then(response => {
            if (!response.ok) {
                throw new Error("Något gick fel (GET-förfrågan till /cities)");
            };
            console.log("TEST 5", response.status);
            return response.json();
        })
        .then(data => {
            console.log("TEST 5", data);
            test6();
        })
        .catch(error => {
            console.error("test 5", error);
        });
};

async function test6() {
    fetch("http://localhost:8000/cities/search?text=en")
        .then(response => {
            if (!response.ok) {
                throw new Error("Något gick fel (GET-förfrågan /cities/search?text=en");
            };
            console.log("TEST 6", response.status);
            return response.json();
        })
        .then(data => {
            console.log("TEST 6", data);
            test7();
        })
        .catch(error => {
            console.error("test 6", error);
        });
};

async function test7() {
    fetch("http://localhost:8000/cities/search?text=en&country=Sweden")
        .then(response => {
            if (!response.ok) {
                throw new Error("Något gick fel (GET-förfrågan /cities/search?text=en&country=Sweden");
            };
            console.log("TEST 7", response.status);
            return response.json();
        })
        .then(data => {
            console.log("TEST 7", data);
            test8();
        })
        .catch(error => {
            console.error("test 7", error);
        });
};

async function test8() {
    fetch("http://localhost:8000/cities", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            name: "Dresden",
            country: "Germany"
        })
    })
        .then(response => {
            console.log("FAULTY TEST 8", response.status);
            test9();
            return response.json();;
        })
        .catch(error => {
            console.log("FAULTY TEST 8 ERROR",error);
        });
};

async function test9() {
    fetch("http://localhost:8000/cities", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            name: "Ystad"
        })
    })
        .then(response => {
            console.log("FAULTY TEST 9", response.status)
            test10();
            return response.json();
        })
        .catch(error => {
            console.error("FAULTY TEST 9 ERROR",error)
        });
};

async function test10() {
    fetch("http://localhost:8000/cities", {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            id: 56
        })
    })
        .then(response => {
            console.log("FAULTY TEST 10", response.status);
            test11();
            return response.json();
        })
        .catch(error => {
            console.error("FAULTY TEST 10 ERROR",error);
        });
};

async function test11() {
    fetch("http://localhost:8000/cities", {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({})
    })
    .then(response => {
        console.log("FAULTY TEST 11", response.status);
        test12();
        return response.json();
    })
    .catch(error => {
        console.error("FAULTY TEST 11 ERROR",error);
    });
};

async function test12() {
    fetch("http://localhost:8000/messages", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            from: 2,
            to: 1,
            password: "pass"
        })
    })
    .then(response => {
        console.log("FAULTY TEST 12", response.status);
        test13();
        return response.json();
    })
}

async function test13() {

}