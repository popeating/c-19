import React from 'react';
import { Card, CardContent, Typography } from '@material-ui/core';
function InfoBoxGuariti({
  title,
  total,
  variation,
  t_int,
  v_t_int,
  ospedale,
  v_ospedale,
  isolamento,
  v_isolamento,
}) {
  return (
    <Card variant="outlined">
      <CardContent>
        <Typography variant="h6">{title}</Typography>
        <Typography variant="subtitle1">
          <b>Totali:</b> {total}
        </Typography>
        <Typography variant="subtitle1">
          <b>Variazione:</b> {variation}
        </Typography>
        <Typography variant="subtitle1">
          <b>Terapia intensiva:</b> {t_int} ({v_t_int})
        </Typography>
        <Typography variant="subtitle1">
          <b>Ospedalizzati:</b> {ospedale} ({v_ospedale})
        </Typography>{' '}
        <Typography variant="subtitle1">
          <b>Isolamento domiciliare:</b> {isolamento} ({v_isolamento})
        </Typography>
      </CardContent>
    </Card>
  );
}

export default InfoBoxGuariti;
