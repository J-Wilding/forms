<template>
  <div class="bg-gray-300 shadow-inner p-4 pb-14">
    <div class="w-2/3 mx-auto">
      <Timer
        v-bind:time="15"
        to="prep_image_search"
        from="prep_video"
        class="p-4"
      />
      <Video />
    </div>
  </div>
</template>

<script>
import Video from "@/components/Video.vue";
import Timer from "@/components/Timer.vue";
export default {
  name: "PrepVideo",
  components: {
    Timer,
    Video,
  },
  mounted() {
    alert("Are you ready to begin?");
  },
};
</script>
