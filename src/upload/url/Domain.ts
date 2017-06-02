export type Scheme = "http" | "https" | string

export type Domain = string | { http: string; https: string }
