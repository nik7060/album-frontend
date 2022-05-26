<template>
    <h1>Albums List</h1>
    <h4>{{ message }}</h4>
      <v-row class="search__input">
        <v-col col="12" sm="10">
            <v-text-field density="compact" clearable
              v-model="title"
              />
        </v-col>
        <v-col  cols="12"
        sm="2">
          <v-btn color = "success"
            @click="searchAlbumByTitle"
          >
            Search
          </v-btn>
        </v-col>
      </v-row>
      <v-row>
        <v-col  cols="9"
              sm="2">
            <span class="text-h6">Title</span>
        </v-col>
        <v-col  cols="9"
              sm="4">
            <span class="text-h6">Description</span>
        </v-col>
          <v-col  cols="9"
              sm="2">
            <span class="text-h6">Artist Name</span>
        </v-col>
        <v-col  cols="9"
              sm="1">
            <span class="text-h6">Edit</span>
        </v-col>
        <v-col  cols="9"
              sm="1">
            <span class="text-h6">View</span>
        </v-col>
        <v-col  cols="9"
              sm="1">
            <span class="text-h6">Delete</span>
        </v-col>
      </v-row>
      <DisplayAlbum
        v-for="album in albums"
        :key="album.id"
        :album="album"
        @deleteAlbum="goDelete(album)"
        @updateAlbum="goEdit(album)"
        @viewAlbum="goView(album)"
    />
 
  <v-btn  @click="removeAllAlbums">
    Remove All Albums
  </v-btn>
</template>
<script>
import AlbumDataService from "../services/AlbumDataService";
import DisplayAlbum from '@/components/DisplayAlbum.vue';
export default {
  name: "albums-list",
  data() {
    return {
      albums: [],
      currentAlbum: null,
      currentIndex: -1,
      title: "",
      message : "Search, Edit or Delete Albums"
    };
  },
  components: {
        DisplayAlbum
    },
  methods: {
    goEdit(album) {
      this.$router.push({ name: 'edit', params: { id: album.id } });
    },
    goView(album) {
      this.$router.push({ name: 'view', params: { id: album.id } });
    },
    goDelete(album) {
      AlbumDataService.delete(album.id)
        .then( () => {
          this.retrieveAlbums()
        })
        .catch(e => {
          this.message = e.response.data.message;
        });
    },
    retrieveAlbums() {
      AlbumDataService.getAll()
        .then(response => {
          this.albums = response.data; 
        })
        .catch(e => {
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
        .then(response => {
          console.log(response.data);
          this.refreshList();
        })
        .catch(e => {
          this.message = e.response.data.message;
        });
    }, 
    searchAlbumByTitle() {
      AlbumDataService.findByTitle(this.title)
        .then(response => {
          this.albums = response.data;
          this.setActiveAlbum(null); 
        })
        .catch(e => {
          this.message = e.response.data.message;
        });
    }
  },
  mounted() {
    this.retrieveAlbums();
  }
};
</script>
<style>
.search__input{
  /*top-bottom  left-right*/
  margin: 10px 0; 
}
</style>