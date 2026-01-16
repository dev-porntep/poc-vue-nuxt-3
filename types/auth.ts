export interface User {
  id: string
  email: string
  name: string
  role: 'admin' | 'user'
}

export interface LoginDto {
  email: string
  password: string
}

