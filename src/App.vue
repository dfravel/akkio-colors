<script setup lang="ts">
import axios from "axios";
import Slider from "./components/Slider.vue";
import { ColorApiReturnModel } from "./types/ColorApiReturn";

// #region Local State Management
const initialState = {
  loading: false,
  saturation: 100,
  lightness: 50,
  colors: [] as ColorApiReturnModel[]
};

const state = reactive(initialState);
// #endregion

// #region Lifecycle Hooks
// onMounted, we'll make a request to the color api to get the colors based on the initial state values
// this is mostly to show the user something when they first load the page
onMounted(() => {
  getColors();
});
// #endregion

// #region API Call
const getColors = async () => {
  const urls = [...Array(361).keys()].map((i) => `https://www.thecolorapi.com/id?hsl=hsl(${i},${state.saturation}%,${state.lightness}%)`);
  const requests = urls.map((url) => axios.get<ColorApiReturnModel>(url));

  state.loading = true;

  try {
    const responses = await Promise.all(requests);
    state.colors = responses.map((response) => response.data);
  } catch (error) {
    // TODO: better error handling
    console.error(error);
  } finally {
    state.loading = false;
  }
};
// #endregion

// #region Helper Functions
// in the first iteration of this function, I used colors.name.closest_named_hex. this worked well for the most part but there were some instances where the HEX codes were different but the name was the same (e.g. #BFFF00 and #B2F302 are both "Lime"). I changed this to colors.name.value and it appears to return the desired results
const dedupeColors = (colors: ColorApiReturnModel[]): ColorApiReturnModel[] => {
  const dedupedColors = colors.reduce((acc, color) => {
    const existingColor = acc.find((c) => c.name.value === color.name.value);

    if (!existingColor) {
      acc.push(color);
    }

    return acc;
  }, [] as ColorApiReturnModel[]);

  return dedupedColors;
};

// the color API returns a contrast value. I believe those values are always #000000 or #ffffff, but just in case, I want to do a quick comparison.
const getTextColor = (color: ColorApiReturnModel): string => {
  const contrast = color.contrast.value;
  const contrastValue = parseInt(contrast.replace("#", ""), 16);

  return contrastValue > 0xffffff / 1.1 ? "#ffffff" : "#000000";
};
// #endregion
</script>

<template>
  <div class="flex flex-col lg:flex-row h-screen bg-gray-100">
    <div class="w-full lg:max-w-md h-full bg-white">
      <div class="w-full p-6">
        <h1 class="text-2xl text-gray-800">Color Swatch Generator</h1>
        <p class="mt-2 text-gray-500 mb-6 text-sm">Please select saturation and lightness values to generate a color swatch.</p>

        <div class="mb-4 flex flex-col">
          <div class="text-sm text-gray-700">Saturation</div>
          <slider v-model="state.saturation" />
        </div>

        <div class="mb-4 flex flex-col">
          <div for="" class="text-sm text-gray-700">Lightness</div>
          <slider v-model="state.lightness" />
        </div>

        <div class="mt-10">
          <button
            type="button"
            class="rounded-full bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 transition duration-150 ease-in-out"
            @click="getColors"
          >
            Generate Color Swatches
          </button>
        </div>
      </div>
    </div>
    <div class="flex-1 p-6">
      <!-- Headline and explainer text -->
      <div class="mb-6" v-if="state.colors.length >= 1">
        <h1 class="text-2xl font-bold text-gray-700">Color Swatches</h1>
        <p class="mt-2 text-gray-500 text-sm">Based on your selected saturation and lightness, here are the color swatches.</p>
      </div>
      <div class="mb-6" v-else>
        <h1 class="text-2xl font-bold text-gray-700">Color Swatches</h1>
        <p class="mt-2 text-gray-500 text-sm">Please select saturation and lightness values to generate a color swatch.</p>
      </div>

      <!-- if we're loading state.colors show the loading component -->

      <div v-if="state.loading" class="flex items-center justify-center h-full">
        <svg class="animate-spin h-10 w-10 text-gray-700" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path
            class="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.94l3-2.65z"
          ></path>
        </svg>
      </div>

      <!-- grid to loop through the color palette -->
      <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7 gap-4" v-else>
        <div
          v-for="color in dedupeColors(state.colors)"
          :key="color.hex.value"
          class="w-32 h-32 shadow-md rounded-lg fade-in"
          :style="`background-color:${color.hex.value};color:${getTextColor(color)}`"
        >
          <div class="flex items-center justify-center w-full h-full text-center">
            <div class="flex flex-col">
              <div class="text-xs">{{ color.rgb.value }}</div>
              <div>{{ color.name.value }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* simple little fade transition that can be applied to the color swatches. without it the appearance was too jarring */
.fade-in {
  @apply opacity-0 transition-opacity;
  animation: fade-in 0.5s forwards;
}

@keyframes fade-in {
  to {
    opacity: 1;
  }
}
</style>
