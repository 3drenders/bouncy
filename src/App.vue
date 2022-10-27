<template>
  <div class="demo-page">
    <section class="controls">
      <h1>🧶 bouncy-loader demo</h1>
      <label>🐖 Size (1 to 100, higher is bigger)</label>
      <input
        type="range"
        min="1"
        max="100"
        v-model="config.size"
        @change="forceRefresh"
      /><br />

      <label>🎈 Bounciness (1 to 100, higher is bigger bouncing effect)</label>
      <input
        type="range"
        min="1"
        max="100"
        v-model="config.bounciness"
        @change="forceRefresh"
      /><br />

      <label>🏎 Speed (1 to 100, higher is slower animation)</label>
      <input
        type="range"
        min="1"
        max="100"
        v-model="config.speed"
        @change="forceRefresh"
      /><br />

      <label>🌈 Rainbow mode (switch color on bounce)</label>
      <input type="checkbox" v-model="config.rainbow" @change="forceRefresh" />
      <span>{{ config.rainbow }}</span>
      <br /><br />

      <a @click="resetSettings" href="#">Reset</a><br /><br />

      <span>
        Check out the
        <a href="https://github.com/3drenders/bouncy">readme</a>
        for more options
      </span>
    </section>

    <section class="bouncy-loader">
      <bouncy-loader
        :loading="true"
        :config="config"
        :colors="colors"
        :key="key"
      />
    </section>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import bouncyLoader from "./components/bouncy-loader.vue";

const colors = [
  "#ff0000 ",
  "#ffa500",
  "#ffff00",
  "#008000",
  "#0000ff",
  "#4b0082",
  "#ee82ee",
]; // Array of colors to be used, formatted as HEX codes

const config = {
  size: 10, // default size: when set to 10, the object is 100px by 100px
  bounciness: 10, // default bounciness
  speed: 10, // default speed: 500ms or 0.5 seconds
  rainbow: false, // rainbow mode: when true the ball switches color on each bounce
};

// For demo purposes, we include a reset function based on the :key property.
// Since out timing events are based on CSS animation triggers, we need to full restart the animation
// when values change
let key = ref(0);

const forceRefresh = () => {
  key.value++;
};

// Resets the settings for the demo page
const resetSettings = () => {
  config.size = 10; // default size
  config.bounciness = 10; // default bounciness
  config.speed = 10; // default speed
  config.rainbow = false; // rainbow mode: the ball switches color on each bounce
  forceRefresh();
};
</script>

<style css scoped>
.demo-page {
  display: flex;
  flex-direction: row;
}
.controls {
  width: 400px;
  margin-right: 100px;
}
label {
  display: block;
}
</style>
