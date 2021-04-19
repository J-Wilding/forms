<template>
  <div class="p-2 shadow-inner bg-gray-300">
    <div id="content" class="flex items-center justify-evenly px-12 py-4">
      <DataEntry class="" />
      <div
        class="flex flex-col w-full md:w-5/12 px-6 items-center justify-center"
      >
        <Timer
          v-bind:time="30"
          to="exit"
          from="data_with_image_search"
          class="p-4"
        />
        <ImageSearch />
      </div>
    </div>
    <!-- <Submissions /> -->
  </div>
</template>

<script>
import axios from "axios";
// @ is an alias to /src
import Timer from "@/components/Timer.vue";
import DataEntry from "@/components/DataEntry.vue";
import ImageSearch from "@/components/ImageSearch.vue";
// import Submissions from "@/components/Submissions.vue";

export default {
  name: "ImageTask",
  components: {
    Timer,
    DataEntry,
    ImageSearch,
    // Submissions,
  },
  data() {
    return {
      taskName: "data_with_image_search",
      taskId: "",
    };
  },
  created() {
    this.getTaskId();
  },
  methods: {
    async getTaskId() {
      try {
        const response = await axios.get(`/api/task/${this.taskName}`);
        this.taskId = response.data._id;
        console.log(this.taskId);
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>
