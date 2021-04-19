<template>
  <div class="text-6xl font-extrabold text-red-700">
    {{ Math.floor(timerCount / 60) }}:{{ ("0" + (timerCount % 60)).slice(-2) }}
  </div>
</template>

<script>
import axios from "axios";
export default {
  props: ["time", "to", "from"],
  data() {
    return {
      timerCount: this.time,
    };
  },
  watch: {
    timerCount: {
      handler(value) {
        if (value > 0) {
          setTimeout(() => {
            this.timerCount--;
          }, 1000);
        } else {
          this.submit();
        }
      },
      immediate: true, // This ensures the watcher is triggered upon creation
    },
  },
  methods: {
    async submit() {
      await axios.put(
        `/api/${this.$root.$data.participant._id}/taskData/`,
        {
          dataEntries: this.$root.$data.participant.dataEntries,
          imageSearches: this.$root.$data.participant.imageSearches,
        }
      );
      this.$router.push({
        path: "/survey",
        query: { from: this.from, to: this.to },
      });
    },
  },
};
</script>
