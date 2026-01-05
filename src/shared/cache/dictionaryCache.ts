export type DictionaryCacheOptions<TItem, TKey> = {
  loader: () => Promise<readonly TItem[]>
  selectKey: (item: TItem) => TKey
}

export function createDictionaryCache<TItem, TKey>(options: DictionaryCacheOptions<TItem, TKey>) {
  let map = new Map<TKey, TItem>()
  let loaded = false
  let loadPromise: Promise<void> | null = null

  async function ensureLoaded(): Promise<void> {
    if (loaded) return
    if (loadPromise) return loadPromise
    loadPromise = (async () => {
      const items = await options.loader()
      const next = new Map<TKey, TItem>()
      for (const it of items) {
        next.set(options.selectKey(it), it)
      }
      map = next
      loaded = true
    })()
    try {
      await loadPromise
    } finally {
      loadPromise = null
    }
  }

  async function getByKey(key: TKey): Promise<TItem | null> {
    if (loaded) return map.get(key) ?? null
    await ensureLoaded()
    return map.get(key) ?? null
  }

  async function getAll(): Promise<TItem[]> {
    await ensureLoaded()
    return Array.from(map.values())
  }

  function clear(): void {
    map.clear()
    loaded = false
    loadPromise = null
  }

  async function preload(): Promise<void> {
    await ensureLoaded()
  }

  return { getByKey, getAll, clear, preload }
}

