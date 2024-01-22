import React, { useState } from "react";
import { IconButton } from "@mui/material";
import Favorite from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { SxProps } from "@mui/system";

interface FavoriteButtonProps {
  isActive?: boolean;
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void; // Update the type
  sx: SxProps;
}

export default function FavoriteButton({
  isActive = false,
  onClick,
  sx,
}: FavoriteButtonProps) {
  const [isFavorite, setIsFavorite] = useState<boolean>(isActive);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setIsFavorite(!isFavorite);
    onClick(event);
  };

  return (
    <IconButton aria-label="Add to favorites" sx={sx} onClick={handleClick}>
      {isFavorite ? <Favorite /> : <FavoriteBorderIcon />}
    </IconButton>
  );
}
