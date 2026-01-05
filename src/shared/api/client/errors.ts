export function normalizeError(err: unknown): Error {
  const anyErr = err as any
  const resp = anyErr?.response
  const data = resp?.data
  const status: number | undefined = resp?.status

  // Prefer backend message from { message, error }
  const backendMessage: string | undefined =
    typeof data?.message === 'string' ? data.message : undefined
  const backendCode: string | undefined =
    typeof data?.error === 'string' ? data.error : undefined
  const fallbackMessage: string =
    typeof anyErr?.message === 'string' ? anyErr.message : 'Произошла ошибка'
  const message = backendMessage ?? fallbackMessage

  const e = new Error(String(message))
  if (backendCode) (e as any).name = String(backendCode)
  if (typeof status === 'number') (e as any).status = status
  ;(e as any).cause = err
  return e
}
