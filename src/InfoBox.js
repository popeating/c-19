import React from 'react';
import { Card, CardContent, Typography } from '@material-ui/core';
function InfoBox({ title, total, variation, new_cases }) {
  return (
    <Card>
      <CardContent>
        <Typography variant="h6">{title}</Typography>
        <Typography variant="subtitle1">
          <b>Totali:</b> {total}
        </Typography>
        <Typography variant="subtitle1">
          <b>Nuovi casi:</b> {new_cases}
        </Typography>
        <Typography variant="subtitle1">
          <b>Variazione:</b> {variation}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default InfoBox;
