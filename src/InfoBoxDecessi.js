import React from 'react';
import { Card, CardContent, Typography } from '@material-ui/core';
function InfoBoxDecessi({ title, total, variation }) {
  return (
    <Card variant="outlined">
      <CardContent>
        <Typography variant="h6">{title}</Typography>
        <Typography variant="subtitle1">Totali: {total}</Typography>
        <Typography variant="subtitle1">Variazione: {variation}</Typography>
      </CardContent>
    </Card>
  );
}

export default InfoBoxDecessi;
