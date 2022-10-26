<template>
  <div id="bouncy-container">
    <div id="bouncy" :style="styleMapper" ref="bouncy"></div>
  </div>
</template>
<script setup lang="ts">
import { computed, onMounted, defineProps, ref } from "vue";

export interface BouncyConfig {
  size: number;
  bounciness: number;
  speed: number;
  rainbow: boolean;
}

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
      return ["ffffff"];
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

let color = ref(props.colors[0]);
const bouncy = ref<HTMLInputElement | null>(null);

const styleMapper = computed(() => {
  return {
    "--color": color.value,
    "--size": props.config.size,
    "--bounciness": props.config.bounciness,
    "--speed": props.config.speed,
  };
});

const newRainbowColor = () => {
  const colorsWithoutCurrentColor = props.colors.filter(
    (e) => e !== color.value
  );

  color.value =
    colorsWithoutCurrentColor[
      Math.floor(Math.random() * colorsWithoutCurrentColor.length)
    ];
};

onMounted(() => {
  if (props.config.rainbow) {
    let loopCounter = 0;

    bouncy.value?.addEventListener("animationiteration", () => {
      if (loopCounter % 2 == 0) {
        newRainbowColor();
      }
      loopCounter++;
    });
  }
});
</script>

<style scoped lang="css">
#bouncy-container {
  display: flex;
  justify-content: center;
}

#bouncy {
  width: calc(10px * var(--size));
  height: calc(10px * var(--size));
  border-radius: 50%;
  background-color: var(--color);

  /* Load animation */
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

@keyframes bounce {
  from {
    transform: translate3d(0, 0, 0);
  }
  to {
    transform: translate3d(0, calc(20px * var(--bounciness)), 0);
  }
}

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
