<template>
  <div class="landing_page">
    <h1>Edit Lesson</h1>
    <h4>{{ message }}</h4>
    <h4>Tutorial : {{ tutorialId }} Lesson : {{ lessonId }}</h4>
    <v-form>
      <v-text-field label="Title" v-model="lesson.title" />
      <v-text-field label="Description" v-model="lesson.description" />
      <v-checkbox
        v-model="album.published"
        label="Published"
        color="primary"
      ></v-checkbox>
      <v-row class="form_buttons_wrapper">
        <v-btn color="success" @click="saveLesson()">Save</v-btn>
        <v-btn color="info" @click="cancel()">Cancel</v-btn>
      </v-row>
    </v-form>
  </div>
</template>
<script>
import LessonDataService from "../services/LessonDataService";
export default {
  name: "edit-lesson",
  props: { tutorialId: String, lessonId: String },
  data() {
    return {
      lesson: Object,
      message: "",
    };
  },
  methods: {
    retrieveLesson() {
      LessonDataService.getLesson(this.tutorialId, this.lessonId)
        .then((response) => {
          this.lesson = response.data;
        })
        .catch((e) => {
          this.message = e.response.data.message;
        });
    },
    saveLesson() {
      var data = {
        title: this.lesson.title,
        description: this.lesson.description,
        tutorialId: this.lesson.tutorialId,
      };
      LessonDataService.updateLesson(
        this.lesson.tutorialId,
        this.lesson.id,
        data
      )
        .then((response) => {
          this.lesson.id = response.data.id;

          this.$router.push({
            name: "view",
            params: { id: this.lesson.tutorialId },
          });
        })
        .catch((e) => {
          this.message = e.response.data.message;
        });
    },
    cancel() {
      this.$router.push({
        name: "view",
        params: { id: this.lesson.tutorialId },
      });
    },
  },
  mounted() {
    this.retrieveLesson();
  },
};
</script>
<style>
</style>