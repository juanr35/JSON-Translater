import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';

const sidebar = {
  title: 'Json Translate App',
  description:
    'Debe ingresar un componente json valido ([{...}]). Las etiquetas html (<...>) deben estar completas para un funcionamiento adecuado de la app, entidades html aparte de las etiquetas html como &nbsp tambien son detectadas y excluidas de la traduccion\n\n\nEjemplo:[{"imagen":"El_Juicio","nombre":"El Juicio","amor":"<p>Limitaciones y traumas, fatalidad. Atracciones secretas. Magia negra y poder oculto. <br><br>Persona atrapada por sus instintos mas bajos, muy sexual, materialista, egoista y con poder. <br><br>Momentos dolorosos, dramáticos, crueldad y violencia. Traicion</p>"}]',
};

const theme = createTheme();

export default function Blog() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="lg">
        <Header title="JSON HTML TRANSLATE" />
        <main>
          <Grid container spacing={4}>
            <Main
              title={sidebar.title}
              description={sidebar.description}
            />
          </Grid>
        </main>
      </Container>
      <Footer
        title="Footer"
        description="Something here to give the footer a purpose!"
      />
    </ThemeProvider>
  );
}