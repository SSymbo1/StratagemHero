<script setup lang="ts">
import { onMounted } from 'vue'
import GameTitle from '@/components/common/GameTitle.vue'
import GamePage from '@/components/layout/GamePage.vue'
import { useAudio } from '@/hooks/use-audio.ts'
import { useGameInput } from '@/hooks/use-game-input.ts'
import router from '@/router/index.ts'
import { Operation } from '@/utils/operation-parser.ts'

const { preloadAudio } = useAudio()

async function startGame(event: KeyboardEvent | HammerInput) {
  if (new Operation(event).checkOPEffective() && await preloadAudio()) {
    await router.replace('/level')
  }
}

const { targetRef, startListening } = useGameInput(startGame)

onMounted(() => {
  startListening()
})
</script>

<template>
  <GamePage>
    <div ref="targetRef" class="h-full w-full">
      <GameTitle
        :title="$t('home.title')"
        :subtitle="$t('home.subtitle')"
      />
    </div>
  </GamePage>
</template>
