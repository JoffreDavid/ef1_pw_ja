<template>
  <Pokemon/>
</template>

<script>
import Pokemon from "@/components/Pokemon.vue";

export default {

  components: {
    Pokemon,
  },

  data() {
    return {
      pokemonSet: [1, 4, 7, 25, 39]
    };
  }
};
</script>
