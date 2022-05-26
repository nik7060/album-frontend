<template>
  <h1>Edit Album</h1>
  <h4>{{ message }}</h4>
  <v-form>
    <v-text-field label="Title" v-model="album.title" />
    <v-text-field label="Description" v-model="album.description" />
    <v-text-field label="Artist Name" v-model="album.artist" />
    <v-row class="align__field">
      <input type="checkbox" id="publish" v-model="album.published" />
      <label for="publish">Album Published</label>
    </v-row>
    <v-row justify="center">
      <v-col col="2"> </v-col>
      <v-col col="2">
        <v-btn color="success" @click="updateAlbum()">Update Album</v-btn>
      </v-col>
      <v-col col="2">
        <v-btn color="info" @click="cancel()">Cancel</v-btn>
      </v-col>
      <v-col col="2"></v-col>
    </v-row>
  </v-form>
</template>
<script>
import AlbumDataService from "../services/AlbumDataService";
export default {
  name: "edit-album",
  props: ["id"],
  data() {
    return {
      album: {},
      message: "Enter data and click update",
    };
  },
  methods: {
    retrieveAlbum() {
      AlbumDataService.get(this.id)
        .then((response) => {
          this.album = response.data;
        })
        .catch((e) => {
          this.message = e.response.data.message;
        });
    },
    updateAlbum() {
      const data = {
        title: this.album.title,
        description: this.album.description,
        published: this.album.published,
        artist: this.album.artist,
      };
      AlbumDataService.update(this.id, data)
        .then((response) => {
          this.album.id = response.data.id;
          console.log("update response from api??? ", response.data);
          this.$router.push({ name: "albums" });
        })
        .catch((e) => {
          this.message = e.response.data.message;
        });
    },
    cancel() {
      this.$router.push({ name: "albums" });
    },
  },
  mounted() {
    this.retrieveAlbum();
  },
};
</script>
<style>
.align__field {
  /* display-flex : align children items in a row */
  display: flex;
  /* align-items-center : aligns the items in center vertically */
  align-items: center;
  width: 25%;
  justify-content: space-around;
}
</style>