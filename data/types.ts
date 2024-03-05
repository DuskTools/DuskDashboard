export interface User {
  id: string
}

export type AuthState = { user: User | null; hydrated: boolean }
export type AppState = {
  auth: AuthState,
}
