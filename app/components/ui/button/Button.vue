<script setup lang="ts">
import { buttonVariants } from '.'
import type { VariantProps } from 'class-variance-authority'
import { cn } from '~/lib/utils'

type ButtonVariants = VariantProps<typeof buttonVariants>

const props = withDefaults(defineProps<{
  variant?: ButtonVariants['variant']
  size?: ButtonVariants['size']
  class?: string
  disabled?: boolean
}>(), {
  variant: 'default',
  size: 'default',
})
</script>

<template>
  <button
    :class="cn(buttonVariants({ variant, size }), props.class)"
    :disabled="disabled"
    v-bind="$attrs"
  >
    <slot />
  </button>
</template>
