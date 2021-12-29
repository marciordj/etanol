import { useState } from 'react'
import { useFormik } from 'formik'
import * as yup from 'yup';
import { TextField, Button, Alert } from '@mui/material';
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
  const [fuel, setFuel] = useState(0)

  const calcFuel = (etanol: string, gasoline:string) => {
    const calcPercentageFuel = (parseFloat(etanol) / parseFloat(gasoline)) * 100

    return Math.round(calcPercentageFuel)
  }

  const formik = useFormik<Values>({
    validationSchema,
    initialValues: {
      etanol: '',
      gasoline: ''
    },
    onSubmit: values => {
      console.log(calcFuel(values.etanol, values.gasoline))
      setFuel(calcFuel(values.etanol, values.gasoline))
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
        <TextField label='Etanol' id='etanol' name='etanol' value={formik.values.etanol} onChange={formik.handleChange} className={styles.input} />
        <TextField label='Gasolina' id='gasoline' name='gasoline' value={formik.values.gasoline} onChange={formik.handleChange} className={styles.input} />
        <Button type='submit'>Calcular</Button>
      </form>

      {fuel === 0 ? '' : 
        <Alert 
          className={styles.alert} 
          severity='info'>
          {fuel >= 78 ? `A paridade está em ${fuel}%, melhor colocar gasolina` : `A paridade está em ${fuel}%, melhor colocar alcool`}
        </Alert>
      }
      
    </div>
  )
}

export default App
