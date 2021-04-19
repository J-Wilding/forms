<template>
  <div class="felx flex-col m-2 bg-blue-200 shadow-lg rounded-md">
    <div class="flex items-center justify-center">
      <img
        :src="
          require(`@/assets/images/TSA_bw/File ${
            this.$root.$data.imageOrder[this.$root.$data.imageIndex]
          }.jpg`)
        "
        :class="rotation"
        style="height: 30rem; width: 30rem"
        class="p-4 transform"
      />
    </div>
    <div class="bg-blue-300 rounded-b-md">
      <button
        class="p-1 mx-2 w-36 bg-red-700 hover:bg-red-600 text-white rounded-3xl shadow-lg focus:outline-none transition duration-150 ease-in-out transform active:-translate-y-1 active:scale-95 my-2"
        @click="nextImage(true)"
      >
        Contraband Present
      </button>
      <button
        class="p-1 mx-2 w-36 bg-green-600 hover:bg-green-500 text-white rounded-3xl shadow-lg focus:outline-none transition duration-150 ease-in-out transform active:-translate-y-1 active:scale-95 my-2"
        @click="nextImage(false)"
      >
        No Contraband Present
      </button>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "ImageSearch",
  data() {
    return {
      angles: ["rotate-0", "rotate-90", "rotate-180", "-rotate-90"],
      rotation: "rotate-0",
      task: Object,
    };
  },
  created: async function () {
    if (this.$root.$data.imageOrder.length === 0) {
      this.shuffleArray(52);
    }
    const response = await axios.get(`/api/task${this.$route.path}`);
    this.task = response.data;
  },
  methods: {
    shuffleArray(size) {
      // let a = [];
      if (this.$root.$data.imageOrder.length === 0) {
        for (let i = 0; i < size; i++) {
          this.$root.$data.imageOrder.push(i + 1);
        }
      }
      for (let i = this.$root.$data.imageOrder.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [this.$root.$data.imageOrder[i], this.$root.$data.imageOrder[j]] = [
          this.$root.$data.imageOrder[j],
          this.$root.$data.imageOrder[i],
        ];
      }
    },
    randomOrientation() {
      this.rotation = this.angles[Math.floor(Math.random() * 4)];
    },
    nextImage(contrabandPresent) {
      this.$root.$data.participant.imageSearches.push({
        task: this.task,
        imageNumber: this.$root.$data.imageOrder[this.$root.$data.imageIndex],
        imageOrientation: this.rotation,
        hasContraband: contrabandPresent,
      });
      this.$root.$data.imageIndex++;
      if (this.$root.$data.imageIndex % 52 === 0) {
        this.shuffleArray(52);
        this.$root.$data.imageIndex = 0;
      }
      this.randomOrientation();
    },
  },
};
</script>
