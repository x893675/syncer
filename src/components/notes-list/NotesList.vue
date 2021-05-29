<template>
  <div id="notes-list">
    <div id="search-buttons" class="columns">
      <div id="search">
        <b-field>
          <b-input
            placeholder="Search by time..."
            v-model="searchField"
            type="search"
            icon="search"
          ></b-input>
        </b-field>
      </div>
      <div id="buttons">
        <button
          id="add-note"
          class="button is-dark"
          @click="showCreateNoteModal()"
        >
          <b-icon icon="plus"></b-icon>
        </button>
      </div>
    </div>
    <b-modal :active.sync="aboutModalActive" has-modal-card>
      <cn-about-modal></cn-about-modal>
    </b-modal>
  </div>
</template>

<script>
import AboutModal from "../modals/about-modal/AboutModal";

export default {
  name: "cn-notes-list",
  components: {
    "cn-about-modal": AboutModal
  },
  data() {
    return {
      searchField: "",
      aboutModalActive: false
    };
  }
};
</script>

<style src="./NotesList.scss" lang="scss"></style>
