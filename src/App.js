import React, { useEffect, useState } from 'react';
import { ThemeProvider, makeStyles } from '@material-ui/core/styles';
import theme from './theme';
import InfoBoxGuariti from './InfoBoxGuariti';
import InfoBoxCasi from './InfoBoxCasi';
import InfoBoxDecessi from './InfoBoxDecessi';
import InfoBoxTamponi from './InfoBoxTamponi';
import ReactGA from 'react-ga';

import { format } from 'date-fns';
import itloc from 'date-fns/locale/it';
import {
  AppBar,
  Toolbar,
  Typography,
  FormControl,
  Select,
  MenuItem,
  Grid,
  Container,
} from '@material-ui/core';
import c19ep from './location';
import Graph from './Graph';

const trackingId = ''; // Replace with your Google Analytics tracking ID
ReactGA.initialize(trackingId);
ReactGA.pageview('PageEnter'); // Record a pageview for the given page

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

const App = () => {
  const [regioni, setRegioni] = useState([]);
  const [regionidet, setRegioniDet] = useState([]);
  const [lastupdate, setLastUpdate] = useState([]);
  const [nazionale_p, setNazionale_p] = useState([]);
  const [regione, setRegione] = useState('ITA');
  const [casi, setCasi] = useState({ totali: 0, nuovi_casi: 0, variazione: 0 });
  const [guariti, setGuariti] = useState({
    totali: 0,
    nuovi_casi: 0,
    variazione: 0,
    t_int: 0,
    v_t_int: 0,
    ospedale: 0,
    v_ospedale: 0,
    isolamento: 0,
    v_isolamento: 0,
  });
  const [decessi, setDecessi] = useState({
    totali: 0,
    nuovi_casi: 0,
    variazione: 0,
  });
  const [tamponi, setTamponi] = useState({
    tamponi: 0,
    tot_tamponi: 0,
    testati: 0,
    rapporto: 0,
    rapporto_t: 0,
  });

  const onRegChange = async (e) => {
    const regCode = e.target.value;
    ReactGA.event({
      category: 'Events',
      action: 'Region changed',
      label: regCode,
    });
    setRegione(regCode);
  };

  useEffect(() => {
    const getRegioni = async () => {
      await fetch(c19ep.latest_regioni)
        .then((response) => response.json())
        .then((data) => {
          setRegioni(data);
        });
    };
    const getNazionale_p = async () => {
      await fetch(c19ep.andamento_italia)
        .then((response) => response.json())
        .then((data) => {
          setNazionale_p(data);

          const max = data.length - 1;

          const last_update = Date.parse(data[max].data);
          const date_update = format(last_update, 'dd MMMM yyyy', {
            locale: itloc,
          });
          const time_update = format(last_update, 'HH:MM', { locale: itloc });
          setLastUpdate(date_update + ' ' + time_update);
        });
    };
    getRegioni();
    getNazionale_p();
  }, []);

  useEffect(() => {
    if (regione === 'ITA') {
      const max = nazionale_p.length - 1;

      if (max > 0) {
        setCasi({
          totali: nazionale_p[max].totale_positivi,
          nuovi_casi: nazionale_p[max].nuovi_positivi,
          variazione:
            nazionale_p[max].nuovi_positivi -
            nazionale_p[max - 1].nuovi_positivi,
        });
        setGuariti({
          totali: nazionale_p[max].dimessi_guariti,
          variazione:
            nazionale_p[max].dimessi_guariti -
            nazionale_p[max - 1].dimessi_guariti,
          t_int: nazionale_p[max].terapia_intensiva,
          v_t_int:
            nazionale_p[max].terapia_intensiva -
            nazionale_p[max - 1].terapia_intensiva,
          ospedale: nazionale_p[max].totale_ospedalizzati,
          v_ospedale:
            nazionale_p[max].totale_ospedalizzati -
            nazionale_p[max - 1].totale_ospedalizzati,
          isolamento: nazionale_p[max].isolamento_domiciliare,
          v_isolamento:
            nazionale_p[max].isolamento_domiciliare -
            nazionale_p[max - 1].isolamento_domiciliare,
        });
        setDecessi({
          totali: nazionale_p[max].deceduti,
          variazione: nazionale_p[max].deceduti - nazionale_p[max - 1].deceduti,
        });
        setTamponi({
          tot_tamponi: nazionale_p[max].tamponi,
          tamponi: nazionale_p[max].tamponi - nazionale_p[max - 1].tamponi,
          testati:
            nazionale_p[max].casi_testati - nazionale_p[max - 1].casi_testati,
          rapporto:
            (
              (nazionale_p[max].nuovi_positivi /
                (nazionale_p[max].tamponi - nazionale_p[max - 1].tamponi)) *
              100
            ).toFixed(2) + '%',
          rapporto_t:
            (
              (nazionale_p[max].nuovi_positivi /
                (nazionale_p[max].casi_testati -
                  nazionale_p[max - 1].casi_testati)) *
              100
            ).toFixed(2) + '%',
        });
      }
    } else {
      const getRegioniDet = async () => {
        await fetch(c19ep.dettaglio_regioni + '.' + regione + '.json')
          .then((response) => response.json())
          .then((data) => {
            setRegioniDet(data);
            const max = data.length - 1;
            if (max > 0) {
              setCasi({
                totali: data[max].totale_positivi,
                nuovi_casi: data[max].nuovi_positivi,
                variazione: data[max].variazione_totale_positivi,
              });
              setGuariti({
                totali: data[max].dimessi_guariti,
                variazione:
                  data[max].dimessi_guariti - data[max - 1].dimessi_guariti,
                t_int: data[max].terapia_intensiva,
                v_t_int:
                  data[max].terapia_intensiva - data[max - 1].terapia_intensiva,
                ospedale: data[max].totale_ospedalizzati,
                v_ospedale:
                  data[max].totale_ospedalizzati -
                  data[max - 1].totale_ospedalizzati,
                isolamento: data[max].isolamento_domiciliare,
                v_isolamento:
                  data[max].isolamento_domiciliare -
                  data[max - 1].isolamento_domiciliare,
              });
              setDecessi({
                totali: data[max].deceduti,
                variazione: data[max].deceduti - data[max - 1].deceduti,
              });
              setTamponi({
                tot_tamponi: data[max].tamponi,
                tamponi: data[max].tamponi - data[max - 1].tamponi,
                testati: data[max].casi_testati - data[max - 1].casi_testati,
                rapporto:
                  (
                    (data[max].nuovi_positivi /
                      (data[max].tamponi - data[max - 1].tamponi)) *
                    100
                  ).toFixed(2) + '%',
                rapporto_t:
                  (
                    (data[max].nuovi_positivi /
                      (data[max].casi_testati - data[max - 1].casi_testati)) *
                    100
                  ).toFixed(2) + '%',
              });
            }
          });
      };
      getRegioniDet();
    }
  }, [regione, nazionale_p]);

  const classes = useStyles();
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h5" className={classes.title}>
              Covid-19 Tacker
            </Typography>
            <FormControl>
              <Select value={regione} onChange={onRegChange}>
                <MenuItem value="ITA">Nazionale</MenuItem>
                {regioni.map((reg) => (
                  <MenuItem value={reg.codice_regione} key={reg.codice_regione}>
                    {reg.denominazione_regione}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Toolbar>
        </AppBar>
        <Typography className="lastupdate" variant="overline">
          Ultimo aggiornamento: {lastupdate}
        </Typography>
        <Container>
          <Grid
            container
            spacing={2}
            style={{ padding: '24px' }}
            alignContent="center"
          >
            <Grid xs={12} sm={6} item>
              <InfoBoxCasi
                title="Casi"
                total={casi.totali}
                variation={casi.variazione}
                new_cases={casi.nuovi_casi}
              />
            </Grid>
            <Grid xs={12} sm={6} item>
              <InfoBoxGuariti
                title="Guariti"
                total={guariti.totali}
                variation={guariti.variazione}
                t_int={guariti.t_int}
                v_t_int={guariti.v_t_int}
                ospedale={guariti.ospedale}
                v_ospedale={guariti.v_ospedale}
                isolamento={guariti.isolamento}
                v_isolamento={guariti.v_isolamento}
              />
            </Grid>
            <Grid xs={12} sm={6} item>
              <InfoBoxDecessi
                title="Decessi"
                total={decessi.totali}
                variation={decessi.variazione}
              />
            </Grid>
            <Grid xs={12} sm={6} item>
              <InfoBoxTamponi title="Tamponi" tamponi={tamponi} />
            </Grid>
          </Grid>{' '}
          <Grid
            container
            spacing={2}
            style={{ padding: '24px' }}
            alignContent="center"
          >
            <Graph
              nazionale_p={nazionale_p}
              regionidet={regionidet}
              current={regione}
            />
          </Grid>
        </Container>
        <div className="footer">
          <div className="dev">
            <Typography className="lastupdate" variant="overline">
              DEV:{' '}
              <a href="https://www.popland.it" target="_blank" rel="noreferrer">
                &copy; 2020 popland.it
              </a>
            </Typography>
          </div>
          <div className="datasource">
            <Typography className="lastupdate" variant="overline">
              Data:{' '}
              <a
                href="https://www.protezionecivile.it/attivita-rischi/rischio-sanitario/emergenze/coronavirus"
                target="_blank"
                rel="noreferrer"
              >
                DPC
              </a>
            </Typography>
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
};

export default App;
