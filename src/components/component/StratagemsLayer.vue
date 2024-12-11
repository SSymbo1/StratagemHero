<script setup lang="ts">
import {Stratagem} from '@/assets/ts/random_stratagems.ts'
import {computed, Ref, ref, watch} from "vue";

const props = defineProps({
  stratagems: {
    type: Array<Stratagem>,
    default: () => []
  },
  ampleTime: {
    type: Boolean,
    default: true
  }
})
const emit = defineEmits(['clearUp', 'nowStratagem'])

const stratagems: Ref<Array<Stratagem>> = ref(props.stratagems)
const showLabel = computed(() => stratagems.value.slice(0, 4))

const removeFirstStratagem = () => {
  stratagems.value.shift()
  if (stratagems.value.length === 0) {
    emit('clearUp')
  }
}

watch(showLabel, (newValue) => {
  if (newValue.length > 0) {
    emit('nowStratagem', newValue[0])
  } else {
    emit('clearUp')
  }
})

defineExpose({
  removeFirstStratagem
})
</script>

<template>
  <div class="stratagems-container" v-for="(obj,index) in showLabel" :key="index">
    <div
        class="stratagems-label"
        :class="{'yellow-border': index == 0 && ampleTime, 'red-border': index == 0 && !ampleTime}">
      <img :src="obj.icon" alt=""/>
    </div>
  </div>
</template>

<style scoped>
@import "@/assets/css/stratagems_layer.css";

.yellow-border {
  border: 5px solid gold;
}

.red-border {
  border: 5px solid red;
}
</style>