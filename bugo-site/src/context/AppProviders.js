import React from 'react'
import {AuthProvider} from './auth'

function AppProviders({children}) {
  return (
    <AuthProvider>
      {children}
    </AuthProvider>
  )
}
export default AppProviders