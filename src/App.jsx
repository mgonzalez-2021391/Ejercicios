import { AuthPage } from './Pages/Auth/AuthPage.jsx'
import { Toaster } from 'react-hot-toast'

export const App = () => {
  return (
    <>
      <AuthPage/>
      <Toaster position='bottom-right' reverseOrder={false}/>
    </>
  )
}
