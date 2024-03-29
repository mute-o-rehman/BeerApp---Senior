import { useEffect, useState } from "react";
import { Beer as IBeer } from "../../types";
import { fetchData } from "./utils";
import { useNavigate, useParams } from "react-router-dom";
import { Box, Button, Grid, Typography } from "@mui/material";
import FavoriteButton from "../../components/FavoriteButton";
import { isItemFavorite, updateFavorites } from "../../utils/favorites";
import { BeerDetails } from "./beerDetails";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

// Functional component for individual beer details
const Beer = () => {
  // Extracting the 'id' parameter from the URL using React Router's 'useParams'
  const { id } = useParams();
  // State variable to store the beer details
  const [beer, setBeer] = useState<IBeer>();

  // Fetch beer details when the component mounts or 'id' changes
  useEffect(fetchData.bind(this, setBeer, id), [id]);

  const navigate = useNavigate();

  if (!beer) {
    return null;
  } else {
    return (
      <article>
        <section>
          <header>
            <Typography variant="h2" marginBottom={6}>
              {beer?.name}
              <FavoriteButton
                onClick={() =>
                  updateFavorites({ id: beer.id, name: beer.name })
                }
                isActive={isItemFavorite({ id: beer.id, name: beer.name })}
                sx={{
                  marginLeft: "30px",
                }}
              />
            </Typography>
          </header>
          <main>
            <Grid container marginBottom={5} spacing={2}>
              <Grid md={12} xs={12}>
                <BeerDetails beer={beer} />
                <Box marginTop={5}>
                  <Button
                    variant="contained"
                    startIcon={<ArrowBackIcon />}
                    onClick={() => navigate("/beer")}
                  >
                    Go to the beer list
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </main>
        </section>
      </article>
    );
  }
};

export default Beer;
