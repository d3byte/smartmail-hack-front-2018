<template>
  <div class="home">
    <side-menu :collapsed="collapsed" v-model="collapsed" :folders="folders" @folder="e => currentFolder = e" />
    <users 
      :emptyMessages="emptyMessages"
      :users="users"
      :folder="currentFolder" 
      :loading="loadingUsers"
      v-model="isSubjectVisible" 
      @collapse="e => collapsed = e"
      @user="e => currentUser = e" 
    />
    <subjects v-model="currentSubject" :loading="loadingSubjects" :subjects="subjects" v-if="isSubjectVisible" />
    <div class="files" v-if="files.length > 0 && isSubjectVisible && !loadingFiles">
      <file v-for="file in files" :key="file.id" :img="determineIcon(file)" :data="file" :subject="currentSubject" />
    </div>
    <p v-if="files.length === 0 && isSubjectVisible && !loadingFiles" class="no-file">Нет вложений</p>
  </div>
</template>

<script>
import File from "@/components/File.vue";
import SideMenu from "@/components/SideMenu.vue";
import Subjects from "@/components/Subjects.vue";
import Users from "@/components/Users.vue";

export default {
  name: "home",
  data() {
    return {
      isSubjectVisible: false,
      collapsed: false,
      folders: [],
      currentFolder: "",
      users: [],
      currentUser: {},
      emptyMessages: false,
      subjects: [],
      currentSubject: {},
      files: [],
      loadingUsers: false,
      loadingSubjects: false,
      loadingFiles: false,
    };
  },
  computed: {
    icons() {
      return this.$store.state.icons;
    }
  },
  methods: {
    determineIcon(file) {
      return this.icons.filter(
        icon => file.content_type.split("/")[1] === icon.name
      )[0];
    },
    async getUsers() {
      this.loadingUsers = true
      let response = await this.$http.get(
        `users?folder=${
          typeof this.currentFolder === "object"
            ? this.currentFolder.id
            : this.currentFolder
        }`
      );
      this.users = response.body.users;
      if (response.body.users) {
        this.loadingUsers = false
      }
    },
    async getSubjects() {
      this.loadingSubjects = true
      const response = await this.$http.get(
        `get-users-letters?folder=${
          typeof this.currentFolder === "object"
            ? this.currentFolder.id
            : this.currentFolder
        }&from=${this.currentUser.email}`
      );
      this.subjects = response.body.subjects;
      this.isSubjectVisible = true;
      if (response.body.subjects) {
        this.loadingSubjects = false
      }
    },
    async getFiles() {
      this.loadingFiles = true
      const response = await this.$http.get(
        `get-attaches-letter?id=${this.currentSubject.id}&date=${
          this.currentSubject.date
        }`
      );
      this.files = response.body.files;
      if (response.body.files) {
        this.loadingFiles = false
      }
    }
  },
  watch: {
    currentUser() {
      this.getSubjects();
    },
    currentFolder() {
      if (
        typeof this.currentFolder === "object" &&
        this.currentFolder.messages_with_attachments === 0
      ) {
        this.emptyMessages = true;
        this.isSubjectVisible = false;
        this.subjects = [];
        return;
      }
      this.emptyMessages = false;
      this.getUsers();
      this.getSubjects();
    },
    currentSubject() {
      this.getFiles();
    }
  },
  async created() {
    const { body } = await this.$http.get("get-directories");
    this.folders = body.folders;
    this.getUsers();
  },
  components: {
    File,
    "side-menu": SideMenu,
    subjects: Subjects,
    users: Users
  }
};
</script>

<style lang="scss">
.home {
  display: flex;

  .files {
    overflow: scroll;
    height: calc(100vh - 50px);
  } 
}
</style>
