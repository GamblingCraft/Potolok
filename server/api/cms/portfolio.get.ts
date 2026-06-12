import { portfolio as defaultPortfolio } from '~/data/portfolio'

export default defineEventHandler(async () => {
  const storage = useStorage('data')
  const stored = await storage.getItem('cms:portfolio')
  return stored ?? defaultPortfolio
})
