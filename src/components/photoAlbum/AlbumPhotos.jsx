import { Grid } from "@mui/material";
import React from "react";
import PhotoWidget from "../photoWidget/PhotoWidget";
import "./photoAlbum.scss";
import AddNewPhoto from "../addNewPhoto/AddNewPhoto";
import { getPlaceholders } from "../../getPlaceholders";

const AlbumPhotos = ({ photos, rootUrl, albumId, loading }) => {
  const placeholders = getPlaceholders(20, 160, 160);

  return (
    <div>
      <Grid sx={{ flexGrow: 1 }} container spacing={2}>
        <Grid item xs={12}>
          <Grid
            container
            justifyContent="center"
            alignItems="center"
            spacing="2"
          >
            <AddNewPhoto url={rootUrl} albumId={albumId} />
            {loading
              ? placeholders.map((placeholder) => placeholder)
              : photos.map((photo) => (
                  <Grid key={photo.id} item>
                    <PhotoWidget
                      imageUrl={photo._links.image.href}
                      selfLink={photo._links.self.href}
                    />
                  </Grid>
                ))}
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

export default AlbumPhotos;
