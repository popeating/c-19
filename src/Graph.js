import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';

import { format } from 'date-fns';
import itloc from 'date-fns/locale/it';
import { Grid, FormControl, Select, MenuItem } from '@material-ui/core';
import ReactGA from 'react-ga';
const trackingId = 'UA-261542-12'; // Replace with your Google Analytics tracking ID
ReactGA.initialize(trackingId);

function Graph({ nazionale_p, regionidet, current }) {
  const options = {
    maintainAspectRatio: false,
  };
  const [graphdata, setGraphData] = useState({});
  const [type, setType] = useState('casi');
  const [days, setDays] = useState(14);

  const onTypeChange = (e) => {
    const newType = e.target.value;
    ReactGA.event({
      category: 'Events',
      action: 'Type changed',
      label: newType,
    });
    setType(newType);
  };
  const onDaysChange = (e) => {
    const newDays = e.target.value;
    ReactGA.event({
      category: 'Events',
      action: 'Days changed',
      label: newDays,
    });
    setDays(newDays);
  };

  useEffect(() => {
    const gdata = [];
    const gdates = [];
    var use_data = [];
    var ctitle = '';
    if (current === 'ITA') {
      use_data = nazionale_p;
    } else {
      use_data = regionidet;
    }
    const max = use_data.length - 1;
    if (max > 0) {
      for (var i = days; i >= 1; i--) {
        if (type === 'casi') {
          ctitle = 'Nuovi casi';
          gdata.push(use_data[max + 1 - i].nuovi_positivi);
        }
        if (type === 'intensiva') {
          ctitle = 'Occupazione terapia intensiva';
          gdata.push(use_data[max + 1 - i].terapia_intensiva);
        }

        if (type === 'rapporto') {
          ctitle = 'Rapporto positivi/testati';
          gdata.push(
            (
              (use_data[max + 1 - i].nuovi_positivi /
                (use_data[max + 1 - i].tamponi - use_data[max - i].tamponi)) *
              100
            ).toFixed(2)
          );
        }
        gdates.push(
          format(Date.parse(use_data[max + 1 - i].data), 'dd/MM', {
            locale: itloc,
          })
        );
      }
    }

    const data = {
      labels: gdates,

      datasets: [
        {
          lineTension: 0,
          label: ctitle,
          data: gdata,
          fill: true,
          backgroundColor: '#fff3e0',
          borderColor: '#ccc0ae',
        },
      ],
    };
    setGraphData(data);
  }, [current, nazionale_p, regionidet, type, days]);
  return (
    <>
      <Grid container spacing={8}>
        <Grid xs={12} sm={6} item>
          <FormControl>
            <Select value={type} onChange={onTypeChange}>
              <MenuItem value="casi">Andamento casi</MenuItem>
              <MenuItem value="rapporto">Rapporto positivi/tamponi</MenuItem>
              <MenuItem value="intensiva">Andamento terapia intensiva</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        <Grid xs={12} sm={6} item>
          <FormControl>
            <Select value={days} onChange={onDaysChange}>
              <MenuItem value="14">Ultimi 14 giorni</MenuItem>
              <MenuItem value="7">Ultimi 7 giorni </MenuItem>
              <MenuItem value="30">Ultimi 30 giorni</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </Grid>

      <Grid xs={12} sm={12} item>
        <Line data={graphdata} width={500} height={500} options={options} />
      </Grid>
    </>
  );
}

export default Graph;
