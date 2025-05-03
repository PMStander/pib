import { clearUserSession } from '../../ai/session'

export default defineEventHandler(async (event) => {
  await clearUserSession(event)
  return { success: true }
}) 