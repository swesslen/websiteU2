const cities = [
  { id: 2, name: "Lille", country: "France"},
  { id: 3, name: "Nantes", country: "France"},
  { id: 5, name: "Bremen", country: "Germany"},
  { id: 10, name: "Dresden", country: "Germany"},
  { id: 11, name: "Heidelberg", country: "Germany"},
  { id: 12, name: "Venice", country: "Italy"},
  { id: 13, name: "Rome", country: "Italy"},
  { id: 16, name: "Graz", country: "Austria"},
  { id: 20, name: "Basel", country: "Switzerland"},
  { id: 21, name: "Lucerne", country: "Switzerland"},
  { id: 22, name: "Kraków", country: "Poland"},
  { id: 23, name: "Warsaw", country: "Poland"}, 
  { id: 24, name: "Poznań", country: "Poland"},
  { id: 28, name: "Ghent", country: "Belgium"},
  { id: 31, name: "Maastricht", country: "Netherlands"},
  { id: 38, name: "Maribor", country: "Slovenia"},
  { id: 42, name: "Strasbourg", country: "France"},
];


async function handler (request) {
  const url = new URL(request.url);
  const headersCORS = new Headers();
  headersCORS.set("Access-Control-Allow-Origin", "*");
  if (request.method === "OPTIONS") {
    return new Response(null, { headers: headersCORS });
  }
  if (url.pathname == "/cities/") {
    if (request.method == "GET") {
      return new Response(cities, { headers: headersCORS, status: 200, "Content-Type": "application/json" })
    }
    if (request.method == "POST") {
      let jsonRqst = await request.json();
      let rqstInJS = JSON.parse(jsonRqst);
      if (cities.some(x => x.name == rqstInJS.name)) {
        return new Response(null, {headers: headersCORS, status: 409 })
      }
      if (rqstInJS.name == undefined || rqstInJS.country == undefined) {
        return new Response(null, {headers: headersCORS, status: 400 })
      }
      if (!cities.some(x => x.name == rqstInJS.name && rqstInJS.name != undefined && rqstInJS.country != undefined)) {
        cities.push({id: cities[cities.length - 1].id + 1, name: `${rqstInJS.name}`, country: `${rqstInJS.country}`})
        
        return new Response({
          "id": `${cities[cities.length - 1].id + 1}`,
          "name": `${JSON.stringify(rqstInJS.name)}`,
          "country": `${JSON.stringify(rqstInJS.country)}`},
          { headers: headersCORS, status: 200, "Content-Type": "application/json" }
        )
      }
    }
    if (request.method == "DELETE") {
      let jsonRqst = await request.json();
      let rqstInJS = JSON.parse(jsonRqst);
      if (rqstInJS.id == undefined) {
        return new Response(null, { headers: headersCORS, status: 400});
      }
      let citiesWithOkID = cities.filter(x => x.id == rqstInJS.id);
      if (citiesWithOkID.length == 0) {
        return new Response(null, { headers: headersCORS, status: 404 });
      }
      if (cities.some(x => x.id == rqstInJS.id)) {
        let indexToDelete = cities.indexOf(x => x.id == rqstInJS.id)
        if (indexToDelete != -1) {
          cities.splice(indexToDelete, 1);
          return new Response("Delete OK", { headers: headersCORS, status: 200 });
        }
      }
    }
  }
  
}

Deno.serve(handler);