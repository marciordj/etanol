import { useState } from 'react'
import { Formik, Field, Form, FormikHelpers } from 'formik'
import styles from './App.module.scss'

interface Values {
  gasoline: string;
  etanol: string;
}

function App() {
  const [count, setCount] = useState(0)

  const calcFuel = (etanol: string, gasoline:string) => {
    return (parseFloat(etanol) / parseFloat(gasoline)) * 100
  }

  return (
    <div className={styles.App}>
      <Formik initialValues={{
        etanol: '',
        gasoline: ''
      }}
      onSubmit={(
        {etanol, gasoline}: Values,
        {setSubmitting}: FormikHelpers<Values> 
      ) => {
        console.log('etanol: -->', etanol);
        console.log('gasoline: -->', gasoline);
        console.log(parseInt(etanol) / parseInt(gasoline))
      }}
      >

      {/* <div className={styles.fuels}>
      <h3>Etanol</h3>
      <h3>X</h3>
      <h3>Gasolina</h3>
      </div> */}

      <Form className={styles.inputFuelValue}>
        <label htmlFor="gasoline">Etanol</label>
        <Field type="text" id='etanol' name='etanol' />
        <label htmlFor="etanol">Gasolina</label>
        <Field type='text' id='gasoline' name='gasoline' />


      <button type='submit'>Calcular</button>
      </Form>
      </Formik>

    </div>
  )
}

export default App
