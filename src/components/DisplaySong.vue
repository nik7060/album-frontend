<template>
  <v-row class="list_table_item">
    <v-col cols="8" sm="2">
      <span>{{ song.title }}</span>
    </v-col>
    <v-col cols="8" sm="4">
      <span> {{ song.description }}</span>
    </v-col>
    <v-col cols="9" sm="2">
      <span>{{ song?.published ? "Published" : "UnPublished" }}</span>
    </v-col>
    <v-col cols="8" sm="1">
      <v-btn size="x-small" icon="mdi-pencil" @click="updateSong" />
    </v-col>
    <v-col cols="8" sm="1">
      <v-btn size="x-small" icon="mdi-trash-can" @click="deleteSong" />
    </v-col>
  </v-row>
</template>
<script>
export default {
  props: {
    song: Object
  },
  data() {
    return {
    };
  },
  methods: {
    deleteSong() {
      this.$emit("deleteSong");
    },
    updateSong() {
      this.$emit("updateSong");
    }
  }
};
</script>

<style>
.list_table_item {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px 0;
  border-top: var(--fadedGreyBorder);
}
</style>
