<script setup lang="ts">
import {Stratagem} from '@/assets/ts/random_stratagems.ts'
import {Ref, ref} from "vue";

const props = defineProps({
  stratagems: {
    type: Array,
    default: () => []
  }
})
const emit = defineEmits(['clearUp'])

const stratagems: Ref<Array<Stratagem>> = ref(props.stratagems)

</script>

<template>
  <div v-for="arg in stratagems" :key="arg.index"></div>
</template>

<style scoped>

</style>