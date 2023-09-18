<script setup lang="ts">
import uniqueId from "../utils/UniqueId";

const props = defineProps({
  uid: {
    type: [String, Number],
    default: () => uniqueId()
  },

  min: {
    type: Number,
    default: 0
  },

  max: {
    type: Number,
    default: 100
  },

  step: {
    type: Number,
    default: 1
  },

  modelValue: {
    type: Number,
    default: 50,
    required: true
  }
});

const emit = defineEmits(["update:modelValue"]);

const sliderValue = ref(props.modelValue);
const slider = ref(null);

// the user can either click on the slider or use the input. this function captures both and updates the sliderValue to keep them in sync
const handleInput = (e: Event) => {
  const value = (e.target as HTMLInputElement).value;

  const numberValue = Number(value);

  sliderValue.value = numberValue;

  emit("update:modelValue", numberValue);
};
</script>

<template>
  <div class="slider-input" :id="`z-a-slider-container-${props.uid}`">
    <div class="flex flex-row space-x-4 items-center">
      <input
        :id="`z-a-slider-range-${props.uid}`"
        type="range"
        :min="props.min"
        :max="props.max"
        :step="props.step"
        :value="props.modelValue"
        class="range-input"
        ref="slider"
        @input="handleInput"
      />
      <input
        :value="sliderValue"
        :min="min"
        :max="max"
        :step="step"
        type="number"
        class="text-input"
        @input="handleInput"
        :id="`z-a-slider-text-${props.uid}`"
      />
    </div>
  </div>
</template>
