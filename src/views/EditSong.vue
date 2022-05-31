<template>
  <div class="landing_page">
    <h1>Edit Song</h1>
    <h4>{{ message }}</h4>
    <div class="updateSong_albumDetails">
      <h3>Album Title : {{ albumTitle }}</h3>
      </div>
    <v-form class="form">
      <v-text-field label="Title" v-model="song.title" />
      <v-text-field label="Description" v-model="song.description" />
      <v-checkbox v-model="song.published" label="Published" color="primary"></v-checkbox>
      <v-row class="form_buttons_wrapper">
        <v-btn color="success" @click="updateSong()">Update Song</v-btn>
        <v-btn color="info" @click="cancel()">Cancel</v-btn>
      </v-row>
    </v-form>
  </div>
</template>
<script>
import SongDataService from "../services/SongDataService";
export default {
  name: "edit-song",
  props: ["albumId", "songId", "albumTitle"],
  data() {
    return {
      song: Object,
      message: "",
    };
  },
  methods: {
    retrieveSong() {
      SongDataService.getSong(this.albumId, this.songId)
        .then((response) => {
          this.song = response.data;
        })
        .catch((e) => {
          this.message = e.response.data.message;
        });
    },
    updateSong() {
      var data = {
        title: this.song.title,
        description: this.song.description,
        albumId: this.song.albumId,
        published: this.song.published
      };
      SongDataService.updateSong(
        this.song.albumId,
        this.song.id,
        data
      )
        .then((response) => {
          this.song.id = response.data.id;
          this.$router.push({
            name: "view",
            params: { id: this.song.albumId },
          });
        })
        .catch((e) => {
          this.message = e.response.data.message;
        });
    },
    cancel() {
      this.$router.push({
        name: "view",
        params: { id: this.albumId },
      });
    },
  },
  mounted() {
    this.retrieveSong();
  },
};
</script>
<style>
.updateSong_albumDetails{
  padding: 10px;
  border: var(--fadedGreyBorder);
  border-radius: 10px;
}
</style>