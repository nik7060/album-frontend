<template>
  <v-row class="list_table_item">
    <v-col cols="9" sm="2">
      <span>{{ album.title }}</span>
    </v-col>
    <v-col cols="9" sm="2">
      <span> {{ album.description }}</span>
    </v-col>
    <v-col cols="9" sm="2">
      <span>{{ album?.artist[0]?.name }}</span>
    </v-col>
    <v-col cols="9" sm="2">
      <span>{{ album?.published ? "Published" : "UnPublished" }}</span>
    </v-col>
    <v-col cols="9" sm="1">
      <v-btn size="x-small" icon="mdi-pencil" @click="updateAlbum" />
    </v-col>
    <v-col cols="9" sm="1">
      <v-btn
        size="x-small"
        icon="mdi-format-list-bulleted-type"
        @click="viewAlbum"
      />
    </v-col>
    <v-col cols="9" sm="1">
      <v-btn size="x-small" icon="mdi-trash-can" @click="deleteAlbum" />
    </v-col>
  </v-row>
</template>

<script>
export default {
  props: {
    album: Object,
  },
  data() {
    return {};
  },
  methods: {
    deleteAlbum() {
      this.$emit("deleteAlbum");
    },
    updateAlbum() {
      this.$emit("updateAlbum");
    },
    viewAlbum() {
      this.$emit("viewAlbum");
    },
  },
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
