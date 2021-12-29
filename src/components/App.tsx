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
  etanol: yup.string().required('Preencha o campo corretamente'),
  gasoline: yup.string().required('Preencha o campo corretamente'),
})

function App() {
  const [fuel, setFuel] = useState(0)

  const calcFuel = (etanol: string, gasoline: string) => {
    const etanolReplaced = etanol.replace(/,/, '.')
    const gasolineReplaced = gasoline.replace(/,/, '.') 

    console.log('etanol -->', etanolReplaced)
    console.log('gasolina -->', gasolineReplaced)
    const calcPercentageFuel = (parseFloat(etanolReplaced) / parseFloat(gasolineReplaced)) * 100

    return Math.round(calcPercentageFuel)
  }

  const formik = useFormik<Values>({
    
    initialValues: {
      etanol: '',
      gasoline: ''
    },
    validationSchema: validationSchema,
    onSubmit: values => {
      console.log(calcFuel(values.etanol, values.gasoline))
      setFuel(calcFuel(values.etanol, values.gasoline))
    }
  })

  return (
    <div className={styles.App}>
      <form onSubmit={formik.handleSubmit} className={styles.inputFuelValue}>
        <TextField 
          helperText={formik.touched.etanol && formik.errors.etanol} 
          error={formik.touched.etanol && Boolean(formik.errors.etanol)} 
          label='Etanol' 
          id='etanol' 
          name='etanol' 
          value={formik.values.etanol} 
          onChange={formik.handleChange} 
          className={styles.input} 
          inputMode='numeric'
        />

        <TextField 
          helperText={formik.touched.gasoline && formik.errors.gasoline} 
          error={formik.touched.gasoline && Boolean(formik.errors.gasoline)} 
          label='Gasolina' id='gasoline' name='gasoline' value={formik.values.gasoline} 
          onChange={formik.handleChange} 
          className={styles.input} 
          inputMode='numeric'
        />
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
