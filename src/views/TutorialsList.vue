<template>

    <h1>Album List</h1>
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
      <TutorialDisplay
        v-for="tutorial in tutorials"
        :key="tutorial.id"
        :tutorial="tutorial"
        @deleteTutorial="goDelete(tutorial)"
        @updateTutorial="goEdit(tutorial)"
        @viewTutorial="goView(tutorial)"
    />
 
  <v-btn  @click="removeAllTutorials">
    Remove All Albums
  </v-btn>
</template>
<script>
import AlbumDataService from "../services/AlbumDataService";
import TutorialDisplay from '@/components/TutorialDisplay.vue';
export default {
  name: "albums-list",
  data() {
    return {
      tutorials: [],
      currentTutorial: null,
      currentIndex: -1,
      title: "",
      message : "Search, Edit or Delete Albums"
    };
  },
  components: {
        TutorialDisplay
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
          this.retrieveTutorials()
        })
        .catch(e => {
          this.message = e.response.data.message;
        });
    },
    retrieveTutorials() {
      AlbumDataService.getAll()
        .then(response => {
          this.tutorials = response.data; 
        })
        .catch(e => {
          this.message = e.response.data.message;
        });
    },
    refreshList() {
      this.retrieveTutorials();
      this.currentTutorial = null;
      this.currentIndex = -1;
    },
    setActiveTutorial(tutorial, index) {
      this.currentTutorial = tutorial;
      this.currentIndex = tutorial ? index : -1;
    },
    removeAllTutorials() {
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
          this.tutorials = response.data;
          this.setActiveTutorial(null); 
        })
        .catch(e => {
          this.message = e.response.data.message;
        });
    }
  },
  mounted() {
    this.retrieveTutorials();
  }
};
</script>
<style>
.search__input{
  /*top-bottom  left-right*/
  margin: 10px 0; 
}
</style>