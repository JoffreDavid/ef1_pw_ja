import axios from "axios";

export async function getPokemonById(id) {
  const resp = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
  return resp.data;
}


export async function pokemonAPIFacade() {
return await pokemonAPI();
}



