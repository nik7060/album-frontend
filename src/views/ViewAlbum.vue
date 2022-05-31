<template>
  <div class="landing_page">
    <h2>View Album</h2>
    <h4>{{ message }}</h4>
    <div class="album_details">
      <h3>Album Title : {{ album.title }}</h3>
      <v-btn color="success" @click="goToAddSong()">Add Song</v-btn>
    </div>
    <v-row class="list_table">
      <div class="list_table_header">
        <v-col cols="8" sm="2">
          <h4>Title</h4>
        </v-col>
        <v-col cols="8" sm="4">
          <h4>Description</h4>
        </v-col>
        <v-col cols="8" sm="1">
          <h4>Edit</h4>
        </v-col>
        <v-col cols="8" sm="1">
          <h4>Delete</h4>
        </v-col>
      </div>
      <div class="list_table_body" v-if="songs.length > 0">
        <DisplaySong
          v-for="song in songs"
          :key="song.id"
          :song="song"
          @deleteSong="deleteSong(song)"
          @updateSong="goToEditSong(song)"
        />
      </div>
      <h3 class="list_table_body no_results" v-else="songs.length < 0">
        SORRY NO SONGS TO DISPLAY
      </h3>
    </v-row>
  <v-btn color="error" @click="removeAllSongs">
    Remove All Songs
    <v-icon right dark> mdi-delete </v-icon>
  </v-btn>
  </div>
</template>
<script>
import AlbumDataService from "../services/AlbumDataService";
import SongDataService from "../services/SongDataService";
import DisplaySong from "@/components/DisplaySong.vue";
export default {
  name: "view-album",
  props: ["id"],
  components: {
    DisplaySong,
  },
  data() {
    return {
      album: {},
      songs: [],
      message: "",
    };
  },
  methods: {
    retrieveSongs() {
      AlbumDataService.get(this.id)
        .then((response) => {
          this.album = response.data;
          SongDataService.getAllsongs(this.id)
            .then((response) => {
              this.songs = response.data;
            })
            .catch((e) => {
              this.message = e.response.data.message;
            });
        })
        .catch((e) => {
          this.message = e.response.data.message;
        });
    },
    goToAddSong() {
      this.$router.push({ name: "addSong", params: { albumId: this.id } });
    },
    goToEditSong(song) {
      this.$router.push({
        name: "editSong",
        params: {
          albumId: this.id,
          songId: song.id,
          albumTitle: this.album.title,
        },
      });
    },
    deleteSong(album) {
      SongDataService.deleteSong(album.albumId, album.id)
        .then(() => {
          this.retrieveSongs();
        })
        .catch((e) => {
          this.message = e.response.data.message;
        });
    },
    removeAllSongs() {
      SongDataService.deleteAllSongs(this.id)
        .then(() => {
          this.retrieveSongs();
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
    this.retrieveSongs();
  },
};
</script>
<style>
.album_details {
  margin: 10px 0 20px 0;
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: center;
  border: var(--fadedGreyBorder);
  gap: 10px;
  padding: 10px 10px;
  border-radius: 10px;
}

.album_details h3 {
  border-right: var(--fadedGreyBorder);
  padding-right: 10px;
}
</style>