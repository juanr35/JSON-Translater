import * as React from 'react';
import PropTypes from 'prop-types';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import FilledInput from '@mui/material/FilledInput';
import InputLabel from '@mui/material/InputLabel';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Button from '@mui/material/Button';
import { useState, useEffect } from "react";
import axios from "axios"
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import { useRouter } from 'next/router';

function Main(props) {

  const { description, title } = props;
  const { query, push } = useRouter();

  const [values, setValues] = React.useState({
    input: '[{"JSON":"Hola Mundo!!"}]',
    output: '',
  });
  const [errors, setErrors] = useState({
    msg: ''
  })
  const [stateForm, setStateForm] = useState({
    loading: false,
  });
  
  const handleChange = (event) => {
    setValues({ 
      ...values, 
      [event.target.name]: event.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    setStateForm({loading: true})
    setErrors({})
    
    let res
    try {        
      res = await axios({
        url: "http://localhost:3000/api/uploadJson",
        method: "post",
        data: values
      })
      if (res.status == 200) {
        setStateForm({loading: false})
        setValues({
          ...values,
          output: JSON.stringify(res.data.output)
        })
      }

    } 
    catch (error) {
      if (error?.response?.status == 500) {
        setErrors({msg: "Invalid input"})
      }
      else {
        setErrors({msg: "Server Error"})
      }
      setStateForm({loading: false})      
      return
    }
  };

  const handleDownload = async (e) => {
    e.preventDefault();
    await axios({
      url: "http://localhost:3000/api/download",
      method: "post",
      data: values
    })
    push("api/download")
  };
  
  return (
    <>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={stateForm.loading}
        >
        <CircularProgress color="inherit" />
      </Backdrop>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Paper elevation={0} sx={{ p: 2, bgcolor: 'grey.200' }}>
            <Typography variant="h6" gutterBottom>
              {title}
            </Typography>
            <Typography>
              {'Debe ingresar un componente json valido ([{...}]). Las etiquetas html (<...>) deben estar completas para un funcionamiento adecuado de la app, entidades html aparte de las etiquetas html como &nbsp tambien son detectadas y excluidas de la traduccion.'}<br/><br/>{'Ejemplo:'}<br/>{'[{"imagen":"El_Juicio","nombre":"El Juicio","amor":"<p>Limitaciones y traumas, fatalidad. Atracciones secretas. Magia negra y poder oculto. <br><br>Persona atrapada por sus instintos mas bajos, muy sexual, materialista, egoista y con poder. <br><br>Momentos dolorosos, dramáticos, crueldad y violencia. Traicion</p>"}]'}
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
            <FormControl fullWidth sx={{ m: 1 }} variant="outlined">
              <InputLabel htmlFor="field-input">Input Text</InputLabel>
              <FilledInput
                id="field-input"
                name="input"
                error={errors.msg ? true: false}
                onChange={handleChange}
                multiline
                rows={13}
                placeholder='[ {a... ...} ]'
                aria-describedby="component-error-text"
                value={values.input}      
              />
              <FormHelperText id="component-error-text" sx={{ color: "red" }}>{errors.msg}</FormHelperText>
              <Button 
                variant="contained"
                onClick={handleSubmit}
              >
                Translate
              </Button>
            </FormControl>
          </Box>
        </Grid>
        <Grid item xs={12} md={6}>
          <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
              <FormControl fullWidth sx={{ m: 1 }} variant="filled">
                <InputLabel htmlFor="field-output">Output</InputLabel>
                <FilledInput
                  id="field-output"
                  value={values.output}
                  name="output"
                  multiline
                  rows={13}
                  disabled
                />
                {values.output ? (
                  <Button 
                    variant="contained"
                    onClick={handleDownload}
                  >
                    Download
                  </Button>
                ) : null}
              </FormControl>
            </Box>
        </Grid>
      </Grid>
    </>
  );
}

Main.propTypes = {
  description: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

export default Main;