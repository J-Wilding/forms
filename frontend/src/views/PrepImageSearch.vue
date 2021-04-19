<template>
  <div class="bg-gray-300 shadow-inner p-4 pb-14">
    <div class="w-2/3 mx-auto">
      <Timer
        v-bind:time="30"
        to="data_with_video"
        from="prep_image_search"
        class="p-4"
      />
      <ImageSearch class="w-max mx-auto h-2/3" />
    </div>
  </div>
</template>

<script>
import ImageSearch from "@/components/ImageSearch.vue";
import Timer from "@/components/Timer.vue";
export default {
  name: "PrepVideo",
  components: {
    Timer,
    ImageSearch,
  },
  mounted() {
    alert("Are you ready to begin?");
  },
};
</script>
