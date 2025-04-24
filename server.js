const cities = [
  { id: 2, name: "Lille", country: "France" },
  { id: 3, name: "Nantes", country: "France" },
  { id: 5, name: "Bremen", country: "Germany" },
  { id: 10, name: "Dresden", country: "Germany" },
  { id: 11, name: "Heidelberg", country: "Germany" },
  { id: 12, name: "Venice", country: "Italy" },
  { id: 13, name: "Rome", country: "Italy" },
  { id: 16, name: "Graz", country: "Austria" },
  { id: 20, name: "Basel", country: "Switzerland" },
  { id: 21, name: "Lucerne", country: "Switzerland" },
  { id: 22, name: "Kraków", country: "Poland" },
  { id: 23, name: "Warsaw", country: "Poland" },
  { id: 24, name: "Poznań", country: "Poland" },
  { id: 28, name: "Ghent", country: "Belgium" },
  { id: 31, name: "Maastricht", country: "Netherlands" },
  { id: 38, name: "Maribor", country: "Slovenia" },
  { id: 42, name: "Strasbourg", country: "France" },
];


async function handler(request) {
  const url = new URL(request.url);
  const headersCORS = new Headers({
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, DELETE, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    "Content-Type": "application/json"
  });
  if (request.method === "OPTIONS") {
    return new Response(null, { headers: headersCORS });
  }
  if (url.pathname == "/cities") {
    if (request.method == "GET") {
      return new Response(JSON.stringify(cities), { headers: headersCORS, status: 200 })
    }
    if (request.method == "POST") {
      let body = await request.json();
      if (cities.some(x => x.name == body.name)) {
        return new Response(null, { headers: headersCORS, status: 409 })
      }
      if (body.name == undefined || body.country == undefined) {
        return new Response(null, { headers: headersCORS, status: 400 })
      }
      if (!cities.some(x => x.name == body.name && body.name != undefined && body.country != undefined)) {
        let newID = null;
        newID = cities[cities.length - 1].id + 1;
        cities.push({ id: newID, name: `${body.name}`, country: `${body.country}` })

        return new Response(JSON.stringify({
          id: newID,
          name: body.name,
          country: body.country
        }), { headers: headersCORS, status: 200, "Content-Type": "application/json" })
      }
    }
    if (request.method == "DELETE") {
      const body = await request.json();
      const id = body.id;
      if (body.id == undefined) {
        return new Response(null, { headers: headersCORS, status: 400 });
      }
      let index = cities.findIndex(x => x.id === id);
      if (index == -1) {
        return new Response(null, { headers: headersCORS, status: 404 });
      }
      if (cities.some(x => x.id == body.id)) {
        let indexToDelete = cities.findIndex(x => x.id == body.id)
        if (indexToDelete != -1) {
          cities.splice(indexToDelete, 1);
          return new Response("Delete OK", { headers: headersCORS, status: 200 });
        }
      }
    }
  }
  if (request.method == "GET" && url.pathname == "/cities/search") {
    const text = url.searchParams.get("text")?.toLocaleLowerCase() || "";
    const country = url.searchParams.get("country")?.toLocaleLowerCase() || "";

    const filteredCities = cities.filter(x => {
      const matchText = x.name.toLocaleLowerCase().includes(text);
      const matchCountry = x.country.toLocaleLowerCase().includes(country);
      return matchText && matchCountry;
    })
    return new Response(JSON.stringify(filteredCities), {
      status: 200,
      headers: headersCORS
    })
  }
}

Deno.serve(handler);