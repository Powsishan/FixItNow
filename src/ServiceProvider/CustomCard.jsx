import * as React from 'react';
import AspectRatio from '@mui/joy/AspectRatio';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import Typography from '@mui/joy/Typography';
import Sheet from '@mui/joy/Sheet';
import { Grid } from '@mui/material';

const CustomCard = ({ table, handleTableSelect }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        width: '100%',
        margin: '5px 0',
        position: 'relative',
        overflow: { xs: 'auto', sm: 'initial' },
        boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
      }}
    >
      <Box />
      <Card
        elevation={3}
        orientation="horizontal"
        sx={{
          width: '100%',
          flexWrap: 'wrap',
          [`& > *`]: {
            '--stack-point': '500px',
            minWidth:
              'clamp(0px, (calc(var(--stack-point) - 2 * var(--Card-padding) - 2 * var(--variant-borderWidth, 0px)) + 1px - 100%) * 999, 100%)',

          },



        }}
      >
        <AspectRatio flex ratio="1" maxHeight={182} sx={{ minWidth: 182 }}>
          <img
            src={`http://localhost:3001/images/${table.img}`}

            loading="lazy"
            alt=""
          />
        </AspectRatio>
        <CardContent>
          <Typography fontSize="xl" fontWeight="lg">
            {table.firstName} {table.lastName}
            

          </Typography>
          <Typography level="body-sm" fontWeight="lg" textColor="text.tertiary">
            {table.JobTitle}
          </Typography>
          <Sheet
            sx={{
              bgcolor: 'background.level1',
              borderRadius: 'sm',
              p: 1.5,
              my: 1.5,
              display: 'flex',
              gap: 2,
              '& > div': { flex: 1 },
            }}
          >

            <Grid container spacing={0} sx={{ flexGrow: 1 }}>
              <Grid xs={12}>
                <CardContent >
                  {table.Description}
                </CardContent>
              </Grid>
              <Grid xs={6}>
                <Typography level="body-xs" fontWeight="lg">
                  Job Done
                </Typography>
                <Typography fontWeight="lg">34</Typography>
              </Grid>
              <Grid xs={6}>
                <Typography level="body-xs" fontWeight="lg">
                  Rating
                </Typography>
                <Typography fontWeight="lg">8.9</Typography>
              </Grid>
            </Grid>

          </Sheet>
          <Box sx={{ display: 'flex', gap: 1.5, '& > button': { flex: 1 } }}>
            <Button variant="outlined" color="neutral">
              View
            </Button>
            <Button variant="solid" sx={{
              backgroundColor: '#0f1b4c',
              '&:hover': {
                backgroundColor: '#0f1b2c',
              },
            }} onClick={() => handleTableSelect(table.username)}>
              Book Now
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};
export default CustomCard;
