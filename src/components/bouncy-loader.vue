<template>
  <div id="bouncy-container">
    <div id="bouncy" :style="styleMapper" ref="bouncy"></div>
  </div>
</template>
<script setup lang="ts">
import {
  computed,
  onMounted,
  defineProps,
  ref,
  CSSProperties,
  onBeforeUnmount,
} from "vue";

// Interface for all the config options of bouncy
export interface BouncyConfig {
  size: number;
  bounciness: number;
  speed: number;
  rainbow: boolean;
}

// Settings props and their default values
const props = defineProps({
  loading: {
    required: true,
    type: Boolean,
    default: true,
  },
  colors: {
    required: true,
    type: Array,
    default() {
      return ["ff0000"];
    },
  },
  config: {
    required: false,
    type: Object,
    default() {
      return {
        size: 10,
        bounciness: 10,
        speed: 10,
        rainbow: false,
      };
    },
  },
});

// color, the currently visible color. Defaults to first value in colors array
let color = ref<string>(props.colors[0]);
// bouncy, ref to actual HTML element
const bouncy = ref<HTMLInputElement | null>(null);
// loopCounter, for tracking the loops when in rainbow mode
let loopCounter = ref(0);

// Maps the config and color to CSS properties so that the bouncy is updated via CSS variables
const styleMapper = computed((): CSSProperties => {
  return {
    "--color": color.value,
    "--size": props.config.size,
    "--bounciness": props.config.bounciness,
    "--speed": props.config.speed,
  };
});

// onMounted, we check for rainbow mode, if so, start listening to the event.
// It counts the loop and every other loop, we change the color, since the up and down animation are 2 different parts
onMounted(() => {
  if (props.config.rainbow) {
    bouncy.value?.addEventListener("animationiteration", loop);
  }
});

// Event listener cleanup on unmount
onBeforeUnmount(() => {
  bouncy.value?.removeEventListener("animationiteration", loop);
});

// Helper function for checking if the animation is fully complete (each 2 loops, since the ball goes up and down)
const loop = () => {
  if (loopCounter.value % 2 == 0) {
    newRainbowColor();
  }
  loopCounter.value++;
};

// Helper function for picking the next color in rainbow mode. Creates an array with all the color values, except the current one
// and then randomly picks a color.
const newRainbowColor = () => {
  const colorsWithoutCurrentColor = props.colors.filter(
    (e) => e !== color.value
  );

  color.value =
    colorsWithoutCurrentColor[
      Math.floor(Math.random() * colorsWithoutCurrentColor.length)
    ];
};
</script>

<style scoped lang="css">
#bouncy-container {
  display: flex;
  justify-content: center;
}

#bouncy {
  /* Mapping the CSS variables to get the width and size */
  width: calc(10px * var(--size));
  height: calc(10px * var(--size));
  border-radius: 50%;
  background-color: var(--color);

  /* Load animation, with variable speed */
  animation: bounce calc(50ms * var(--speed));
  animation-direction: alternate;
  animation-timing-function: cubic-bezier(0.5, 0.05, 1, 0.5);
  animation-iteration-count: infinite;

  /* Support for all browsers using Prefix */
  -webkit-animation-name: bounce;
  -webkit-animation-duration: calc(50ms * var(--speed));
  -webkit-animation-direction: alternate;
  -webkit-animation-timing-function: cubic-bezier(0.5, 0.05, 1, 0.5);
  -webkit-animation-iteration-count: infinite;
}

/* Bounce animation keyframes */
@keyframes bounce {
  from {
    transform: translate3d(0, 0, 0);
  }
  to {
    transform: translate3d(0, calc(20px * var(--bounciness)), 0);
  }
}

/* Backup animation for webkit support */
@-webkit-keyframes bounce {
  from {
    -webkit-transform: translate3d(0, 0, 0);
    transform: translate3d(0, 0, 0);
  }
  to {
    -webkit-transform: translate3d(0, calc(20px * var(--bounciness)), 0);
    transform: translate3d(0, calc(20px * var(--bounciness)), 0);
  }
}
</style>
