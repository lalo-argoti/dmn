import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { UserList } from './aplicaciones/UserList/UserList';

function App() {
  return (
    <div>
      <h1>Mi Aplicación</h1>
      <UserList onUserSelect={(user) => console.log('Usuario seleccionado:', user)} />
    </div>
  );}



export default App
