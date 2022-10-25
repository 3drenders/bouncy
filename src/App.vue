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

      <a @click="reset" href="#">Reset</a><br /><br />

      <span>
        Check out the
        <a href="https://github.com/3drenders/bouncy">readme</a>
        for more options
      </span>
    </section>

    <section class="bouncy-loader">
      <bouncy-loader :loading="true" :config="config" :key="key" />
    </section>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import bouncyLoader from "./components/bouncy-loader.vue";

@Options({
  components: {
    bouncyLoader,
  },
})
export default class App extends Vue {
  config = {
    colors: [
      "#FF6633",
      "#FFB399",
      "#FF33FF",
      "#FFFF99",
      "#00B3E6",
      "#E6B333",
      "#3366E6",
      "#999966",
      "#99FF99",
      "#B34D4D",
      "#80B300",
      "#809900",
      "#E6B3B3",
      "#6680B3",
      "#66991A",
      "#FF99E6",
      "#CCFF1A",
      "#FF1A66",
      "#E6331A",
      "#33FFCC",
      "#66994D",
      "#B366CC",
      "#4D8000",
      "#B33300",
      "#CC80CC",
      "#66664D",
      "#991AFF",
      "#E666FF",
      "#4DB3FF",
      "#1AB399",
      "#E666B3",
      "#33991A",
      "#CC9999",
      "#B3B31A",
      "#00E680",
      "#4D8066",
      "#809980",
      "#E6FF80",
      "#1AFF33",
      "#999933",
      "#FF3380",
      "#CCCC00",
      "#66E64D",
      "#4D80CC",
      "#9900B3",
      "#E64D66",
      "#4DB380",
      "#FF4D4D",
      "#99E6E6",
      "#6666FF",
    ], // Array of colors to use, formatted as HEX codes
    size: 10, // default size
    bounciness: 10, // default bounciness
    speed: 10, // default speed
    rainbow: false, // rainbow mode: the ball switches color on each bounce
  };

  key = 0;

  forceRefresh = () => {
    this.key++;
  };

  reset = () => {
    this.config.size = 10; // default size
    this.config.bounciness = 10; // default bounciness
    this.config.speed = 10; // default speed
    this.config.rainbow = false; // rainbow mode: the ball switches color on each bounce
    this.forceRefresh();
  };
}
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
