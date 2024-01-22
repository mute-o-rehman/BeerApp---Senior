/* eslint-disable max-lines-per-function */
import BusinessIcon from "@mui/icons-material/Business";
import LinkIcon from "@mui/icons-material/Link";
import PhoneRoundedIcon from "@mui/icons-material/PhoneRounded";
import SegmentIcon from "@mui/icons-material/Segment";
import { Box, Link, Paper, Tooltip, Typography } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import { ReactNode } from "react";
import { Beer as IBeer } from "../../types";

type ListWithIcon = {
  icon: JSX.Element;
  title: string;
  children: ReactNode;
}[];

export function BeerDetails({ beer }: { beer?: IBeer }) {
  const items: ListWithIcon = [
    {
      icon: <SegmentIcon />,
      title: "Type",
      children: (
        <Tooltip title={beer?.brewery_type}>
          <div>
            <Typography variant="body1">{beer?.brewery_type}</Typography>
          </div>
        </Tooltip>
      ),
    },
    {
      icon: <LinkIcon />,
      title: "Website",
      children: beer?.website_url && (
        <Link noWrap href={beer.website_url}>
          {beer.website_url}
        </Link>
      ),
    },
    {
      icon: <PhoneRoundedIcon />,
      title: "Phone",
      children: beer?.phone && (
        <Link href={`tel:${beer.phone}`}>{beer.phone}</Link>
      ),
    },
    {
      icon: <BusinessIcon />,
      title: "Address",
      children: (
        <>
          <Typography variant="body1">{beer?.street}</Typography>
          <Typography variant="body1">
            {beer?.postal_code}, {beer?.city},{" "}
            {beer?.state || beer?.state_province}
          </Typography>
          <Typography variant="body1">{beer?.country}</Typography>
        </>
      ),
    },
  ];

  return (
    <Paper>
      <Box padding={2}>
        {items
          .filter(({ children }) => !!children)
          .map(({ icon, title, children }) => (
            <Grid container key={title} marginBottom={1}>
              <Grid marginRight={2}>{icon}</Grid>
              <Grid xs={2}>{title}</Grid>
              <Grid>{children}</Grid>
            </Grid>
          ))}
      </Box>
    </Paper>
  );
}
