<template>
  <div class="landing_page">
    <h1>Add Song</h1>
    <h4>{{ message }}</h4>
    <h4>Album Details: {{ albumId }}</h4>
    <v-form class="form">
      <v-text-field label="Title" v-model="song.title" />
      <v-text-field label="Description" v-model="song.description" />
      <v-checkbox v-model="song.published" label="Published" color="primary"></v-checkbox>
      <v-row class="form_buttons_wrapper">
        <v-btn color="success" @click="saveSong()">Save Song</v-btn>
        <v-btn color="info" @click="cancel()">Cancel</v-btn>
      </v-row>
    </v-form>
  </div>
</template>
<script>
import SongDataService from "../services/SongDataService";
export default {
  name: "addSong",
  props: ["albumId"],
  data() {
    return {
      song: {
        id: null,
        title: "",
        description: "",
        published: false,
      },
      message: "",
    };
  },
  methods: {
    saveSong() {
      var data = {
        title: this.song.title,
        description: this.song.description,
        published: this.song.published,
        albumId: this.albumId,
      };
      SongDataService.createSong(this.albumId, data)
        .then((response) => {
          this.song.id = response.data.id;
          this.$router.push({ name: "view", params: { id: this.albumId } });
        })
        .catch((e) => {
          this.message = e.response.data.message;
        });
    },
    cancel() {
      this.$router.push({ name: "view", params: { id: this.albumId } });
    },
  },
};
</script>
<style>
</style>