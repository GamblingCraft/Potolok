<script setup lang="ts">
import { badgeVariants } from '.'
import type { VariantProps } from 'class-variance-authority'
import { cn } from '~/lib/utils'
type BadgeVariants = VariantProps<typeof badgeVariants>
const props = withDefaults(defineProps<{ variant?: BadgeVariants['variant']; class?: string }>(), { variant: 'default' })
</script>
<template>
  <div :class="cn(badgeVariants({ variant }), props.class)"><slot /></div>
</template>
