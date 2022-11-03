import { Grid } from "@mui/material";
import React from "react";
import PhotoWidget from "../photoWidget/PhotoWidget";
import "./photoAlbum.scss";
import AddNewPhoto from "../addNewPhoto/AddNewPhoto";

const AlbumPhotos = ({ photos, rootUrl, albumId }) => {
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
            {photos.map((photo) => (
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
