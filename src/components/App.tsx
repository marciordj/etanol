import { useState } from 'react'
import { useFormik } from 'formik'
import * as yup from 'yup';
import styles from './App.module.scss'

interface Values {
  gasoline: string;
  etanol: string;
}

const validationSchema = yup.object({
  etanol: yup.string().required('Add alguma coisa'),
  gasoline: yup.string().required('Add alguma coisa'),
})

function App() {
  const [count, setCount] = useState(0)

  const calcFuel = (etanol: string, gasoline:string) => (parseFloat(etanol) / parseFloat(gasoline)) * 100

  const formik = useFormik<Values>({
    validationSchema,
    initialValues: {
      etanol: '',
      gasoline: ''
    },
    onSubmit: values => {
      console.log(calcFuel(values.etanol, values.gasoline))
    }
  })

  return (
    <div className={styles.App}>
      {/* <div className={styles.fuels}>
      <h3>Etanol</h3>
      <h3>X</h3>
      <h3>Gasolina</h3>
      </div> */}

      <form onSubmit={formik.handleSubmit} className={styles.inputFuelValue}>
        <label htmlFor="gasoline">Etanol</label>
        <input onChange={formik.handleChange} value={formik.values.etanol} type="text" id='etanol' name='etanol' />
        <label htmlFor="etanol">Gasolina</label>
        <input onChange={formik.handleChange} value={formik.values.gasoline} type='text' id='gasoline' name='gasoline' />


      <button type='submit'>Calcular</button>
      </form>
    </div>
  )
}

export default App
