/**
 * RequestCredentials
 */
export type RequestCredentials = 'omit' | 'same-origin' | 'include'

/**
 * Subset of FetchRequestConfig
 */
export type RequestConfig<TData = unknown> = {
  baseURL?: string
  url?: string
  method?: 'GET' | 'PUT' | 'PATCH' | 'POST' | 'DELETE' | 'OPTIONS' | 'HEAD'
  params?: unknown
  data?: TData | FormData
  responseType?: 'arraybuffer' | 'blob' | 'document' | 'json' | 'text' | 'stream'
  signal?: AbortSignal
  headers?: [string, string][] | Record<string, string>
  credentials?: RequestCredentials
}

/**
 * Subset of FetchResponse
 */
export type ResponseConfig<TData = unknown> = {
  data: TData
  status: number
  statusText: string
  headers: Headers
}

let _config: Partial<RequestConfig> = {}

export const getConfig = () => _config

export const setConfig = (config: Partial<RequestConfig>) => {
  _config = config
  return getConfig()
}

export type ResponseErrorConfig<TError = unknown> = TError

export type Client = <TData, _TError = unknown, TVariables = unknown>(config: RequestConfig<TVariables>) => Promise<ResponseConfig<TData>>

export const fetch = async <TData, _TError = unknown, TVariables = unknown>(paramsConfig: RequestConfig<TVariables>): Promise<ResponseConfig<TData>> => {
  const normalizedParams = new URLSearchParams()

  const globalConfig = getConfig()
  const config = {
    ...globalConfig,
    ...paramsConfig,
    headers: {
      ...(Array.isArray(globalConfig.headers) ? Object.fromEntries(globalConfig.headers) : globalConfig.headers),
      ...(Array.isArray(paramsConfig.headers) ? Object.fromEntries(paramsConfig.headers) : paramsConfig.headers),
    },
  }

  Object.entries(config.params || {}).forEach(([key, value]) => {
    if (value !== undefined) {
      normalizedParams.append(key, value === null ? 'null' : value.toString())
    }
  })

  const targetPath = config.url || ''
  const isAbsoluteUrl = /^https?:\/\//i.test(targetPath)
  let targetUrl = isAbsoluteUrl ? targetPath : [config.baseURL, targetPath].filter(Boolean).join('')

  if (normalizedParams.size > 0) {
    targetUrl += `?${normalizedParams}`
  }

  const hasBody = config.data !== undefined && config.data !== null
  const isFormDataBody = config.data instanceof FormData
  const body = !hasBody ? undefined : isFormDataBody ? config.data : JSON.stringify(config.data)
  const headers = new Headers(config.headers)

  if (hasBody && !isFormDataBody && !headers.has('content-type')) {
    headers.set('content-type', 'application/json')
  }

  const response = await globalThis.fetch(targetUrl, {
    credentials: config.credentials || 'same-origin',
    method: config.method?.toUpperCase(),
    body,
    signal: config.signal,
    headers,
  })

  const hasNoPayload = [204, 205, 304].includes(response.status) || !response.body
  const responseContentType = response.headers.get('content-type') || ''
  const data = hasNoPayload
    ? {}
    : responseContentType.includes('application/json')
      ? await response.json()
      : await response.text()

  if (!response.ok) {
    const error = new Error(response.statusText || `Request failed with status ${response.status}`) as Error & {
      data: unknown
      status: number
      headers: Headers
    }
    error.data = data
    error.status = response.status
    error.headers = response.headers as Headers
    throw error
  }

  return {
    data: data as TData,
    status: response.status,
    statusText: response.statusText,
    headers: response.headers as Headers,
  }
}

fetch.getConfig = getConfig
fetch.setConfig = setConfig
