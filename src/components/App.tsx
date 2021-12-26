import { useState } from 'react'
import styles from './App.module.scss'

function App() {
  const [count, setCount] = useState(0)

  const calcFuel = () => {
    document.getElementById('gasolina')
  }

  return (
    <div className={styles.App}>
      <div className={styles.fuels}>
      <h3>Etanol</h3>
      <h3>X</h3>
      <h3>Gasolina</h3>
      </div>

      <div className={styles.inputFuelValue}>
        <input type="text" id='gasolina' />
        <input type="text" />
      </div>

      <button onClick={calcFuel} >Calcular</button>
    </div>
  )
}

export default App
