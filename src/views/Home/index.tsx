import { useEffect, useState } from "react";
import { fetchData } from "./utils";
import { Beer } from "../../types";
import { Link as RouterLink } from "react-router-dom";
import {
  Button,
  Checkbox,
  Paper,
  TextField,
  Link,
  ListItem,
  List,
  ListItemIcon,
  ListItemButton,
} from "@mui/material";
import styles from "./Home.module.css";
import {
  getFavoritesItems,
  removeAllFavorites,
  updateFavorites,
} from "../../utils/favorites";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [beerList, setBeerList] = useState<Array<Beer>>([]);
  const [savedList, setSavedList] = useState<Array<Beer>>([]);
  const [filterQuery, setFilterQuery] = useState<string>("");

  useEffect(() => {
    const favoritesObject = getFavoritesItems();
    const favoritesArray = Object.values(favoritesObject) as Beer[];
    setSavedList(favoritesArray || []);
    fetchData(setBeerList);
  }, []);

  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setFilterQuery(e.target.value);
  };

  const reloadList = () => {
    fetchData(setBeerList);
  };

  const filteredBeers = beerList.filter((beer) => {
    return beer.name.toLowerCase().includes(filterQuery.toLowerCase());
  });

  const handleRemoveFromFavorites = (beer: Beer) => {
    // Remove the clicked beer from favorites
    updateFavorites({ id: beer.id, name: beer.name });

    const favoritesObject = getFavoritesItems();
    const favoritesArray = Object.values(favoritesObject) as Beer[];
    setSavedList(favoritesArray || []);
  };

  const noItemsMessage = (
    <p style={{ textAlign: "center", marginTop: "10px", color: "#666" }}>
      No items found.
    </p>
  );

  return (
    <article>
      <section>
        <main>
          <Paper>
            <div className={styles.listContainer}>
              <div className={styles.listHeader}>
                <TextField
                  label="Filter..."
                  variant="outlined"
                  onChange={handleChange}
                />
                <Button variant="contained" onClick={reloadList}>
                  Reload list
                </Button>
              </div>
              {filteredBeers.length === 0 ? (
                noItemsMessage
              ) : (
                <ul className={styles.list}>
                  {filteredBeers.map((beer, index) => (
                    <li key={index.toString()}>
                      <Checkbox />
                      <Link component={RouterLink} to={`/beer/${beer.id}`}>
                        {beer.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </Paper>

          <Paper>
            <div className={styles.listContainer}>
              <div className={styles.listHeader}>
                <h3>Saved items</h3>
                <Button
                  variant="contained"
                  size="small"
                  onClick={() => {
                    removeAllFavorites();
                    setSavedList([]);
                  }}
                >
                  Remove all items
                </Button>
              </div>
              <List>
                {savedList.map((beer, index) => (
                  <ListItem key={index.toString()}>
                    <ListItemIcon>
                      <DeleteIcon
                        onClick={() => handleRemoveFromFavorites(beer)}
                        sx={{
                          color: "#ed143d",
                          cursor: "pointer",
                        }}
                      />
                    </ListItemIcon>
                    <ListItemButton
                      onClick={() => navigate(`/beer/${beer.id}`)}
                    >
                      {String(beer.name)}
                    </ListItemButton>
                  </ListItem>
                ))}
              </List>
            </div>
          </Paper>
        </main>
      </section>
    </article>
  );
};

export default Home;
