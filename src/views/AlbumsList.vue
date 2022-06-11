<template>
  <div class="landing_page">
    <h1>Albums List</h1>
    <h4>{{ message }}</h4>
    <v-row class="search_input">
      <v-col col="12" sm="10">
        <v-text-field
        density="compact"
          label="Enter Album title or Artist Name"
          clearable
          v-model="title"
        />
      </v-col>
      <v-col cols="12" sm="2">
        <v-btn color="success" @click="searchAlbumByTitle">Search Albums</v-btn>
      </v-col>
    </v-row>
    <button
      @click="showPublishedAlbums"
      class="login_button align_button_end"
      v-if="albums.length > 0"
    >
      Show Published Albums
    </button>
    <v-row class="list_table">
      <div class="list_table_header">
        <v-col cols="9" sm="2">
          <h4>Title</h4>
        </v-col>
        <v-col cols="9" sm="2">
          <h4>Description</h4>
        </v-col>
        <v-col cols="9" sm="2">
          <h4>Artist Name</h4>
        </v-col>
        <v-col cols="9" sm="2">
          <h4>Album Status</h4>
        </v-col>
        <v-col cols="9" sm="1">
          <h4>Edit</h4>
        </v-col>
        <v-col cols="9" sm="1">
          <h4>View</h4>
        </v-col>
        <v-col cols="9" sm="1">
          <h4>Delete</h4>
        </v-col>
      </div>
      <div class="list_table_body" v-if="albums.length > 0">
        <DisplayAlbum
          v-for="album in albums"
          :key="album.id"
          :album="album"
          @deleteAlbum="goDelete(album)"
          @updateAlbum="goEdit(album)"
          @viewAlbum="goView(album)"
        />
      </div>
      <h3 class="list_table_body no_results" v-else="albums.length < 0">
        SORRY NO ALBUMS TO DISPLAY
      </h3>
    </v-row>
    <v-btn color="error" @click="removeAllAlbums">
      Remove All Albums
      <v-icon right dark> mdi-delete </v-icon>
    </v-btn>
  </div>
</template>
<script>
import AlbumDataService from "../services/AlbumDataService";
import DisplayAlbum from "@/components/DisplayAlbum.vue";
export default {
  name: "albums-list",
  data() {
    return {
      albums: [],
      currentAlbum: null,
      currentIndex: -1,
      title: "",
      message: "",
    };
  },
  components: {
    DisplayAlbum,
  },
  methods: {
    goEdit(album) {
      this.$router.push({ name: "edit", params: { id: album.id } });
    },
    goView(album) {
      this.$router.push({ name: "view", params: { id: album.id } });
    },
    goDelete(album) {
      AlbumDataService.delete(album.id)
        .then(() => {
          this.retrieveAlbums();
        })
        .catch((e) => {
          this.message = e.response.data.message;
        });
    },
    retrieveAlbums() {
      AlbumDataService.getAll()
        .then((response) => {
          this.albums = response.data;
        })
        .catch((e) => {
          this.message = e.response.data.message;
        });
    },
    refreshList() {
      this.retrieveAlbums();
      this.currentAlbum = null;
      this.currentIndex = -1;
    },
    setActiveAlbum(album, index) {
      this.currentAlbum = album;
      this.currentIndex = album ? index : -1;
    },
    removeAllAlbums() {
      AlbumDataService.deleteAll()
        .then((response) => {
          console.log(response.data);
          this.refreshList();
        })
        .catch((e) => {
          this.message = e.response.data.message;
        });
    },
    searchAlbumByTitle() {
      AlbumDataService.findByTitle(this.title)
        .then((response) => {
          this.albums = response.data;
          this.setActiveAlbum(null);
        })
        .catch((e) => {
          this.message = e.response.data.message;
        });
    },
    showPublishedAlbums() {
      AlbumDataService.getAllPublishedAlbums()
        .then((response) => {
          console.log("response??", response);
          this.albums = response.data;
        })
        .catch((e) => {
          this.message = e.response.data.message;
        });
    },
  },
  mounted() {
    this.retrieveAlbums();
  },
};
</script>
<style>
.landing_page {
  background: #f5f5f5;
  padding: 10px 40px 30px 40px;
  border-radius: 10px;
  display: grid;
  place-items: center;
}
.search_input {
  /*top-bottom  left-right*/
  margin: 10px 0;
  width: 100%;
}
.list_table {
  border: var(--fadedGreyBorder);
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
  border-radius: 10px;
  width: 100%;
  overflow: hidden;
}
.list_table_header {
  background: var(--secondaryColor);
  display: flex;
  align-items: center;
  justify-content: center;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  height: 60px;
}
.list_table_header > div > h4 {
  color: var(--whiteColor);
  font-weight: 500;
}
.list_table_body {
  margin-top: 12px;
}
.no_results {
  text-align: center;
  color: orangered;
  margin: 10px 0;
}
.align_button_end {
  margin: -20px 0px 25px 78%;
}
</style>