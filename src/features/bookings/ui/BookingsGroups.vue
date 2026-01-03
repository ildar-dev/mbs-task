<template>
  <div class="flex flex-col gap-6">
    <Bookings
      v-for="group in groups"
      :key="group.type"
      :title="getGroupTitle(group.type)"
      :items="group.items"
      @pay="$emit('pay', $event)"
    />
  </div>
</template>

<script setup lang="ts">
import Bookings from './Bookings.vue'
import { getGroupTitle } from './groupTitles'
import type { IBooking } from '@/entities/booking/models/booking'
import type { ISessionPage } from '@/features/session/models/sessionPage'
import type { IGroupedBookings } from '../models/groupedBookings'
import { computed } from 'vue'

const props = defineProps<{
  groups: IGroupedBookings[]
  sessionsById: Record<number, ISessionPage>
}>()

defineEmits<{
  (e: 'pay', bookingId: string): void
}>()

const groups = computed(() =>
  props.groups.filter((g: IGroupedBookings) => g.bookings.length > 0).map((g: IGroupedBookings) => ({
    type: g.type,
    items: g.bookings
      .map((b: IBooking) =>
        props.sessionsById[b.sessionId] ? { booking: b, sessionPage: props.sessionsById[b.sessionId] } : null
      )
      .filter((v: { booking: IBooking; sessionPage: ISessionPage } | null): v is { booking: IBooking; sessionPage: ISessionPage } => v !== null),
  }))
)
</script>
