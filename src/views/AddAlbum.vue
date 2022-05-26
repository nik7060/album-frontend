<template>
  <h1>Add Album</h1>
  <h4>{{ message }}</h4>
  <v-form>
    <v-text-field label="Title" v-model="album.title" />
    <v-text-field label="Description" v-model="album.description" />
    <v-text-field label="Artist Name" v-model="album.artist" />
    <v-row class="align__field">
      <input type="checkbox" id="publish" v-model="album.published" />
      <label for="publish">Publish Album</label>
    </v-row>
    <v-row justify="center">
      <v-col col="2"> </v-col>
      <v-col col="2">
        <v-btn color="success" @click="saveAlbum()">Save Album</v-btn>
      </v-col>
      <v-col col="2">
        <v-btn color="info" @click="cancel()">Cancel</v-btn>
      </v-col>
      <v-col col="2"> </v-col>
    </v-row>
  </v-form>
</template>
<script>
import AlbumDataService from "../services/AlbumDataService";
export default {
  name: "add-album",
  data() {
    return {
      album: {
        id: null,
        title: "",
        description: "",
        artist: "",
        published: false,
      },
      message: "Enter data and click save album",
    };
  },
  methods: {
    saveAlbum() {
      var data = {
        title: this.album.title,
        description: this.album.description,
        artist: this.album.artist,
        published:this.album.published
      };
      // console.log("published??",this.album);
      AlbumDataService.create(data)
        .then((response) => {
          this.album.id = response.data.id;
          console.log("add response from api >", response.data);
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
};
</script>
<style>
</style>