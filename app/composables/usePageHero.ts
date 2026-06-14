export function usePageHero(pageSlug: string, defaultImg: string) {
  const { data } = useFetch<{ img: string; title: string } | null>(
    `/api/cms/page-hero/${pageSlug}`,
    { default: () => null },
  )
  const heroImg = computed(() => data.value?.img || defaultImg)
  return heroImg
}
