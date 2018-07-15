<template>
  <div class="home">
    <side-menu :collapsed="collapsed" v-model="collapsed" :folders="folders" @folder="e => currentFolder = e" />
    <users 
      :emptyMessages="emptyMessages"
      :users="users"
      :folder="currentFolder" 
      :loading="loadingUsers"
      :emailActiveUser="currentUser.email || null"
      v-model="isSubjectVisible" 
      @collapse="e => collapsed = e"
      @user="e => currentUser = e" 
    />
    <subjects v-model="currentSubject" :loading="loadingSubjects" :subjects="subjects" v-if="isSubjectVisible" />
    <div class="files" v-if="files.length > 0 && isSubjectVisible && !loadingFiles">
      <file v-for="file in files" :key="file.id" :img="determineIcon(file)" :data="file" :subject="currentSubject" />
    </div>
    <div v-if="files.length === 0 && isSubjectVisible && !loadingFiles" class="no-files">
      <p>Выберите тему письма</p>
    </div>
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
      this.isSubjectVisible = false
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
      this.isSubjectVisible = false
      const response = await this.$http.get(
        `get-users-letters?folder=${
          typeof this.currentFolder === "object"
            ? this.currentFolder.id
            : this.currentFolder
        }&from=${this.currentUser.email}`
      );
      this.subjects = response.body.subjects;
      if (response.body.subjects) {
        this.loadingSubjects = false
      }
      if (this.subjects.length > 0) {
        this.isSubjectVisible = true;
        this.files = []
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
      this.currentUser = {}
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

  .no-files {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 661px;
    font-size: 30px;

    .no-file {
      font-size: 30px;
    }
  }
  
}
</style>
