import { stringify } from "qs"

export type HttpMethod = "GET" | "POST" | "PUT" | "DELETE"

export type SatelliteConfig<TBody, TParams = unknown> = Partial<{
  origin: string
  body: TBody
  token: string
  params: TParams
  signal: AbortSignal
}>

async function satellite<TRes, TBody = unknown, TParams = unknown>(
  method: HttpMethod,
  url: string,
  config?: SatelliteConfig<TBody, TParams>
): Promise<TRes> {
  const newUrl = new URL(url, config?.origin)

  if (config?.params) newUrl.search = stringify(config.params, { addQueryPrefix: true })

  const res = await fetch(newUrl, {
    method: method,
    body: config?.body ? JSON.stringify(config.body) : undefined,
    headers: {
      ["Content-Type"]: "application/json",
    },
    signal: config?.signal,
  })

  return await res.json()
}

export default satellite
