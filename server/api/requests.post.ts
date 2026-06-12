// Public endpoint — receives submissions from site contact forms / quiz
export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  if (!body.phone && !body.name) {
    throw createError({ statusCode: 400, message: 'Укажите имя или телефон' })
  }

  const storage = useStorage('data')
  const requests = await storage.getItem<Record<string, unknown>[]>('cms:requests') ?? []

  const newId = requests.length > 0
    ? Math.max(...requests.map((r) => Number(r.id) || 0)) + 1
    : 1

  const now = new Date()
  const date = now.toLocaleString('ru', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' })

  const entry: Record<string, unknown> = {
    id: newId,
    name:    body.name    ?? '',
    phone:   body.phone   ?? '',
    message: body.message ?? body.comment ?? body.text ?? '',
    source:  body.source  ?? 'Форма на сайте',
    date,
    status: 'new',
  }

  requests.unshift(entry)
  await storage.setItem('cms:requests', requests)

  return { ok: true, id: newId }
})
