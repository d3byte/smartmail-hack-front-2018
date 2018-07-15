<template>
    <section :class="'users ' + (backButton !== null ? 'hidden' : '')">
        <div class="back" @click="backButtonEvent">
            <img src="@/assets/button/icon.svg">
        </div>
        <div v-if="!emptyMessages" :class="'users-item ' + (emailActiveUser === user.email ? 'active' : '')" @click="() => curl(user.email)" v-for="user in users" :key="user.email">
            <div class="user-img">
                <img :src="user.avatar">
            </div>
            <div class="user-data">
                <h4>{{user.name}}</h4>
                <p>{{user.email}}</p>
            </div>
        </div>
        <p class="no-attaches" v-else-if="emptyMessages && !loading">Нет сообщений с вложениями</p>
        <div v-if="loading" class="preloader">
          <img src="@/assets/icons/settings-icon.svg" />
        </div>
    </section>
</template>

<script>
import axios from "axios";
export default {
  props: ["users", "folder", "emptyMessages", "loading", "emailActiveUser"],
  name: "Users",
  methods: {
    curl(id) {
      this.emailActiveUser = id;
      this.backButton = id;
      this.$emit("input", true);
      this.$emit("collapse", true);
      this.$emit("user", this.users.filter(user => user.email === id)[0]);
      return;
    },
    backButtonEvent() {
      this.backButton = null;
      this.emailActiveUser = null;
      this.$emit("input", false);
      this.$emit("user", {});
      return;
    }
  },
  computed: {
    backButton() {
      return this.emailActiveUser !== null ? this.emailActiveUser : null;
    }
  }
};
</script>

<style lang="scss">
section.users {
  margin: 0;
  padding: 0px;
  background: #fafafa;
  width: 320px;
  height: 100vh;
  ms-user-select: none;
  -moz-user-select: none;
  -khtml-user-select: none;
  -webkit-user-select: none;
  overflow: scroll;
  border-right: 1px solid #b9b9b9;
  height: calc(100vh - 50px) !important;

  .users-item {
    border-bottom: 1px solid #b9b9b9;
    margin: 0;
    padding: 5px;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    cursor: pointer;

    &:hover {
      background: #e8e8e8;
    }

    &.active {
      background: #d8d8d8;
    }

    .user-img {
      padding: 20px;
      margin: 0;
      display: flex;
      flex-direction: column;
      justify-content: center;

      img {
        width: 48px;
        height: 48px;
        border: 1px solid rgba(0, 0, 0, 0.12);
        border-radius: 50%;
      }
    }

    .user-data {
      margin: 0;
      padding: 0;
      line-height: 1.7;
      display: flex;
      flex-direction: column;
      justify-content: center;

      h4,
      p {
        margin: 0;
        font-family: Arial, Helvetica, sans-serif;
        color: #333333;
      }

      h4 {
        font-size: 15px;
        font-weight: normal;
      }

      p {
        font-size: 13px;
      }
    }
  }

  .back {
    display: none;
    -webkit-transition: top 1s ease-out 0.5s;
    -moz-transition: top 1s ease-out 0.5s;
    -o-transition: top 1s ease-out 0.5s;
    transition: top 1s ease-out 0.5s;
  }

  &.hidden {
    padding-top: 40px;
    min-width: 100px;
    max-width: 100px;

    .user-data {
      display: none !important;
    }

    .back {
      display: flex;
      height: 40px;
      width: 100px;
      position: absolute;
      top: 50px !important;
      background: #e8e8e8;
      justify-content: center;
      align-items: center;
      cursor: pointer;
      -webkit-transition: top 1s ease-out 0.5s;
      -moz-transition: top 1s ease-out 0.5s;
      -o-transition: top 1s ease-out 0.5s;
      transition: top 1s ease-out 0.5s;
      border-bottom: 1px solid #b9b9b9;
      border-right: 1px solid #b9b9b9;

      img {
        width: 10px;
        height: 10px;
      }
    }
  }

  .no-attaches {
    text-align: center;
    margin-top: 40px;
  }
}

.preloader {
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin: 30px 0;
  img {
    -webkit-animation: spin 1s infinite ease-in-out;
    -moz-animation: spin 1s infinite ease-in-out;
    -o-animation: spin 1s infinite ease-in-out;
    animation: spin 1s infinite ease-in-out;
    animation-fill-mode: forwards;
  }

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
}
</style>

