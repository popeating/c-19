import React from 'react';
import { Card, CardContent, Typography } from '@material-ui/core';
function InfoBoxTamponi({ title, tamponi }) {
  return (
    <Card variant="outlined">
      <CardContent>
        <Typography variant="h6">{title}</Typography>
        <Typography variant="subtitle1">
          <b>Tamponi:</b> {tamponi.tamponi} / <b>Testati:</b> {tamponi.testati}
        </Typography>
        <Typography variant="subtitle1">
          <b>In Totale:</b> {tamponi.tot_tamponi}
        </Typography>
        <Typography variant="subtitle1">
          <b>Rapporto positivi/tamponi:</b> {tamponi.rapporto}
        </Typography>
        <Typography variant="subtitle1">
          <b>Rapporto positivi/testati:</b> {tamponi.rapporto_t}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default InfoBoxTamponi;
