const KEY_NAME = "favoriteBeers";

interface Beer {
  id: string;
  name: string;
}

export function getFavoritesItems() {
  const favorites = window.localStorage.getItem(KEY_NAME);
  if (favorites !== null) {
    return JSON.parse(favorites);
  }
  return [];
}

export function removeAllFavorites() {
  window.localStorage.removeItem(KEY_NAME);
}

export function isItemFavorite(item: Beer) {
  const favorites = getFavoritesItems();
  const hasItem = favorites.filter((el: Beer) => {
    return el.id === item.id;
  });
  return hasItem.length ? true : false;
}

export function updateFavorites(item: Beer) {
  const favorites = getFavoritesItems();
  let newFavorites;
  const hasItem = favorites.filter((el: Beer) => {
    return el.id === item.id;
  });

  if (!hasItem.length) {
    // if item does not exist in local storage, add it
    newFavorites = [...favorites, item];
  } else {
    // otherwise remove it
    favorites.splice(favorites.indexOf(hasItem[0]), 1);
    newFavorites = favorites;
  }
  window.localStorage.setItem(KEY_NAME, JSON.stringify(newFavorites));
}
