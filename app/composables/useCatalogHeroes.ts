export function useCatalogHeroes() {
  const { data: heroMap } = useFetch<Record<string, string>>('/api/cms/page-heroes', {
    default: () => ({} as Record<string, string>),
  })
  // item.slug or item.to = '/catalog/tsveta/golubye-natyazhnye-potolki' → key = 'golubye-natyazhnye-potolki'
  function heroImg(item: { slug?: string; to?: string; img: string }): string {
    const key = (item.slug || item.to || '').split('/').pop() ?? ''
    return heroMap.value?.[key] || item.img
  }
  return { heroImg }
}
