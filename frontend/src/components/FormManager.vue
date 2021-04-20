<template>
  <div>
    <h1>Form Manager</h1>
    <h2>Add a Form</h2>
    <div>
      <input
        type="text"
        v-model="form"
        placeholder="Form Name"
        class="focus:outline-none focus:border-solid border-b-2 border-transparent focus:border-blue-900 bg-gray-50 hover:bg-gray-200 p-2 w-2/5"
      />
      <button
        @click.prevent="addForm()"
        class="m-4 p-2 bg-blue-900 hover:bg-blue-8n00 focus:outline-none transition duration-75 ease-in-out transform active:-translate-y-1 active:scale-95 shadow-lg text-white rounded-3xl"
      >
        Add New Form
      </button>
    </div>
    <table class="text-left mx-auto w-10/12">
      <tr>
        <th v-if="isAdmin">Created By</th>
        <th>Title</th>
        <th>_id</th>
        <th class="text-center">Edit</th>
        <th class="text-center">Delete</th>
      </tr>
      <tr v-for="form in formList" :key="form.id">
        <td v-if="isAdmin">{{ (form.user) ? form.user.username : "" }}</td>
        <td>{{ form.name }}</td>
        <td>{{ form._id }}</td>
        <td class="text-center">
          <button
            @click="editForm(form)"
            class="text-green-800 focus:outline-none transition duration-75 ease-in-out transform active:-translate-y-1 active:scale-95 shadow-lg px-2 m-2 bg-green-100 rounded-xl"
          >
            &#x2710;
          </button>
        </td>
        <td class="text-center">
          <button
            @click="deleteForm(form)"
            class="text-red-800 focus:outline-none transition duration-75 ease-in-out transform active:-translate-y-1 active:scale-95 shadow-lg px-2 m-2 bg-red-100 rounded-xl"
          >
            &#x2718;
          </button>
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "FormManager",
  data() {
    return {
      form: "",
      // forms: [],
    };
  },
  computed: {
    formList() {
      return this.$root.$data.forms;
    },
    isAdmin() {
      return this.$root.$data.user.role === "admin";
    },
  },
  methods: {
    async getForms() {
      try {
        const response = await axios.get("/api/tasks");
        this.$root.$data.forms = response.data;
        this.formsLoaded = true;
      } catch (error) {
        console.log(error);
      }
    },
    async addForm() {
      try {
        if (this.form === "") {
          return;
        }
        const response = await axios.post("/api/tasks", {
          name: this.form,
          user: this.$root.$data.user,
        });
        console.log(response.data)
        await this.getForms();
        // this.$root.$data.forms.push(response.data);
        // this.$root.$data.forms.push(response.data);
        this.form = "";
      } catch (error) {
        console.log(error);
      }
    },

    async deleteForm(form) {
      try {
        if (!confirm(`Do you really want to delete ${form.name}?`)) {
          return;
        }
        await axios.delete(`/api/tasks/${form._id}`);
        this.getForms();
      } catch (error) {
        console.log(error);
      }
    },
    async editForm(form) {
      try {
        if (this.form === "") {
          return;
        }
        if (
          !confirm(
            `Do you really want to change: ${form.name} to ${this.form}?`
          )
        ) {
          return;
        }
        await axios.put(`/api/tasks/${form._id}`, {
          name: this.form,
        });
        this.getForms();
      } catch (error) {
        console.log(error);
      }
      this.form = "";
    },
  },
};
</script>
