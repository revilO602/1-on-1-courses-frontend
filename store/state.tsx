import { createState } from '@hookstate/core';

export const signedIn = createState(false)
export const email = createState("")
export const password = createState('')
export const userId = createState('')

export const logOut = () => {
  signedIn.set(false)
  email.set('')
  password.set('')
  userId.set('')
}
