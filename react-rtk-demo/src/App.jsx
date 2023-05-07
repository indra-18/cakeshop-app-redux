import { useState } from 'react'
import IcecreamView from './features/icecream/IcecreamView'
import UserView from './features/user/UserView'
import CakeView from './features/cake/cakeView'

function App() {

  return (
    <div>
      <CakeView />
      <IcecreamView />
      <UserView />
    </div>
  )
}

export default App
