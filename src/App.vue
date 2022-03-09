<template>
  <main class="main" id="main">
    <Game />
    <RecordsList />
  </main>
</template>

<script>
import Game from "@/components/Game/Game.vue";
import RecordsList from "@/components/Records/RecordsList.vue";
export default {
  name: "App",
  components: {
    Game,
    RecordsList,
  },
};
</script>

<style lang="scss">
@import url(./styles/fonts.scss);

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: "Inter", sans-serif;
  background-color: #faf8ef;
  font-size: 18px;
}

.container {
  width: 700px;
  padding: 0 30px;
  max-width: 100%;
  margin: 0 auto;
  @media screen and (max-width: 768px) {
    padding: 0 15px;
  }
}

h1 {
  font-weight: 500;
  font-size: 36px;
  line-height: 44px;
  color: $colorText;
  text-align: center;
}
</style>
