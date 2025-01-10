import e from "express"

export interface User {
  email: string
  password: string
  userName: string
  address: string
  status: string
}

export interface UpedateUser {
  email: string
  userName: string
  address: string
  status: string
}