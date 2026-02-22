export const possibleCustomEvents = ['pageChange'] as const

export type customEvents = typeof possibleCustomEvents[number]