<template>
  <div class="home">
    <div class="wrapp-up">
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
        <file v-for="file in files" :key="file.id" :senderEmail="currentUser.email" :img="determineIcon(file)" :data="file" :subject="currentSubject" />
      </div>
      <div v-if="files.length === 0 && isSubjectVisible && !loadingFiles" class="no-files">
        <p>Выберите тему письма</p>
      </div>
    </div>
    <div class="marketing">
        <img src="../assets/marketing.png" alt="">
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
      loadingFiles: false
    };
  },
  computed: {
    icons() {
      return this.$store.state.icons;
    }
  },
  methods: {
    determineIcon(file) {
      const length = file.name.split(".").length;
      const icon = this.icons.filter(
        icon => file.name.split(".")[length - 1] === icon.name
      );
      return (icon[0] || {}).data;
    },
    async getUsers() {
      this.loadingUsers = true;
      this.isSubjectVisible = false;
      let response = await this.$http.get(
        `users?folder=${
          typeof this.currentFolder === "object"
            ? this.currentFolder.id
            : this.currentFolder
        }`
      );
      this.users = response.body.users;
      if (response.body.users) {
        this.loadingUsers = false;
      }
    },
    async getSubjects() {
      this.loadingSubjects = true;
      this.isSubjectVisible = false;
      const response = await this.$http.get(
        `get-users-letters?folder=${
          typeof this.currentFolder === "object"
            ? this.currentFolder.id
            : this.currentFolder
        }&from=${this.currentUser.email}`
      );
      this.subjects = response.body.subjects;
      if (response.body.subjects) {
        this.loadingSubjects = false;
      }
      if (this.subjects.length > 0) {
        console.log("s");
        this.isSubjectVisible = true;
        this.files = [];
      }
    },
    async getFiles() {
      if (this.currentSubject.date) {
        this.loadingFiles = true;
        const response = await this.$http.get(
          `get-attaches-letter?id=${this.currentSubject.id}&date=${
            this.currentSubject.date
          }`
        );
        this.files = response.body.files;
        if (response.body.files) {
          this.loadingFiles = false;
        }
      } else {
        this.files = [];
      }
      // if (Object.keys(this.currentSubject).length === 0) {
      //   this.files = []
      //   return
      // }
    }
  },
  watch: {
    currentUser() {
      this.getSubjects();
    },
    currentFolder() {
      this.currentUser = {};
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
.wrapp-up {
  display: flex;
  flex-grow: 1;
}
.home {
  display: flex;
  justify-content: space-between;

  .files {
    overflow: scroll;
    height: calc(100vh - 50px);
  }

  .no-files {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    font-size: 30px;
    flex-grow: 1;

    .no-file {
      font-size: 30px;
    }
  }
}
.marketing {
  margin: 20px;
}

@media (max-width: 1024px) {
  .marketing {
    display: none;
  }
}

@media (max-width: 840px) {
  .users.hidden {
    min-width: 70px !important;
    max-width: 70px !important;

    .back {
      width: 70px !important;
    }

    .user-img {
      padding: 5px !important;
      margin: 0 auto !important;
      img {
        width: 32px !important;
        height: 32px !important;
      }
    }
  }
}
</style>
