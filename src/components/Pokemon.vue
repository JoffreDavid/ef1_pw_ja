<template>
  <div class="pokemon_container">

    <h2>Puntaje: {{ puntaje }}</h2>
    <h2>Intento: {{ intentos }}</h2>

    <div class="cards">
      <div v-for="(p, index) in pokemons" :key="index">
        <img :src="p.img" />
        <p>{{ p.name }}</p>
      </div>
    </div>

    <button @click="jugar" :disabled="intentos === 5">
      JUGAR
    </button>

    <div v-if="intentos === 5" class="mensaje-final">
      <h3>Has utilizado tus 5 intentos</h3>
      <p v-if="puntaje < 10">
        El juego ha terminado, inténtalo nuevamente
      </p>
      <p v-else>
         ¡Felicidades! Has ganado el juego 
      </p>
    </div>

  </div>
</template>

<script>
import { getPokemonById } from "@/clients/PokemonClient";

export default {
  data() {
    return {
      puntaje: 0,
      intentos: 0,

      pokemons: [
        { img: "https://dummyimage.com/250x250", name: "XXXXXX" },
        { img: "https://dummyimage.com/250x250", name: "XXXXXX" },
        { img: "https://dummyimage.com/250x250", name: "XXXXXX" }
      ],

      pool: [1, 4, 7, 25, 39] 
    };
  },

  methods: {
    async jugar() {
      if (this.intentos === 5) return;

      const ids = [];

      for (let i = 0; i < 3; i++) {
        const id = this.pool[Math.floor(Math.random() * this.pool.length)];
        ids.push(id);

        const pokemon = await getPokemonById(id);

        this.pokemons[i] = {
          name: pokemon.name,
          img: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${id}.svg`
        };
      }

      this.calcularPuntaje(ids);
      this.intentos++;
    },

    calcularPuntaje(ids) {
      const conteo = {};

      ids.forEach(id => {
        conteo[id] = (conteo[id] || 0) + 1;
      });

      const repeticiones = Object.values(conteo);

      if (repeticiones.includes(3)) {
        this.puntaje += 5;
      } else if (repeticiones.includes(2)) {
        this.puntaje += 2;
      }
    }
  }
};
</script>

<style>
.pokemon_container {
  border: 2px solid black;
  padding: 20px;
  text-align: center;
}

.cards {
  display: flex;
  justify-content: space-around;
  margin-bottom: 20px;
}

img {
  width: 250px;
  height: 250px;
}

button {
  padding: 10px 30px;
  font-size: 16px;
}

.mensaje-final {
  margin-top: 20px;
  color: red;
  font-weight: bold;
}
</style>
