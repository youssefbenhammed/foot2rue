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

export async function team(id){
  const response = await fetch('http://127.0.0.1:8000/teams?id='+id, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json'},
      mode: 'cors'
    }).then(function (a) {
      return a.json(); // call the json method on the response to get JSON
  })
  return response;
}

export async function player(exact_name){
  const response = await fetch('http://127.0.0.1:8000/player?player_name='+exact_name, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json'},
      mode: 'cors'
    }).then(function (a) {
      return a.json(); // call the json method on the response to get JSON
  })
  return response;
}

export default {test,team,player};