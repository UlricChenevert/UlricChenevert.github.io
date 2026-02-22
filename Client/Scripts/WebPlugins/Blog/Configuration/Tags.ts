export const possibleTags = ["Video Games", "Religion", "Classwork", "General", "Welcome"] as const

export type Tags = typeof possibleTags[number]