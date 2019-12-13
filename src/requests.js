export async function test(limit,page){
    const response = await fetch('http://127.0.0.1:8000/allTeams?limit='+limit+'&page='+page, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json'},
        mode: 'cors'
      }).then(function (a) {
        return a.json(); // call the json method on the response to get JSON
    })
    return response;
}

export default test;