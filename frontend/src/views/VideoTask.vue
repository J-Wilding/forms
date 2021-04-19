<template>
  <div class="p-2 shadow-inner bg-gray-300">
    <div id="content" class="flex items-center justify-evenly px-8 py-4">
      <DataEntry class="pt-4" />
      <div>
        <Timer
          v-bind:time="60"
          to="data_with_image_search"
          from="data_with_video"
          class="p-4 mb-10"
        />
        <Video class="mx-auto" />
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
import Video from "@/components/Video.vue";
// import Submissions from "@/components/Submissions.vue";

export default {
  name: "VideoTask",
  components: {
    Timer,
    DataEntry,
    Video,
    // Submissions,
  },
  data() {
    return {
      taskName: "data_with_video",
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
