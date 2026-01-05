import { ref, onUnmounted } from 'vue'
import { MS_IN_SECOND } from '@/utils/time/consts'

export type TUseTickOptions = {
  intervalMs: number
  immediate: boolean
}

export function useTick(callback: () => void, options: TUseTickOptions = { intervalMs: MS_IN_SECOND, immediate: false }) {
  const intervalMs = ref<number>(options.intervalMs);
  const isRunning = ref(false)
  let timerId: number | null = null

  function tick() {
    callback()
  }

  function start() {
    if (isRunning.value) return
    isRunning.value = true
    if (options.immediate) tick()
    timerId = window.setInterval(tick, intervalMs.value)
  }

  function stop() {
    if (timerId !== null) {
      clearInterval(timerId)
      timerId = null
    }
    isRunning.value = false
  }

  function setIntervalMs(ms: number) {
    intervalMs.value = ms
    if (isRunning.value) {
      stop()
      start()
    }
  }

  onUnmounted(stop)

  return { start, stop, isRunning, intervalMs, setIntervalMs }
}
