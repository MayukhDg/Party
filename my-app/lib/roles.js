import { auth } from '@clerk/nextjs/server'

export const checkRole = async (role) => {
  
    if (!checkRole('admin')) {
        redirect('/')
      }
  
    const { sessionClaims } = await auth()
  return sessionClaims?.metadata.role === role
}