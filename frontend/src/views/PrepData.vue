<template>
  <div class="bg-gray-300 shadow-inner">
    <div class="w-2/3 mx-auto py-4">
      <Timer v-bind:time="30" to="prep_video" from="prep_data" class="p-4" />
      <DataEntry class="w-3/4 mx-auto" />
    </div>
  </div>
</template>

<script>
import DataEntry from "@/components/DataEntry.vue";
import Timer from "@/components/Timer.vue";
export default {
  name: "PrepVideo",
  components: {
    Timer,
    DataEntry,
  },
  mounted() {
    alert("Try to submit as many records as you can before the time runs out!");
  },
};
</script>
