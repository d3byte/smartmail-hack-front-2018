
<template>
    <div class="subjects-wrapper">
    <section :class="'subjects ' + (backButton !== null ? 'hidden' : '')">
        <div class="back" @click="backButtonEvent">
            <a> Все темы </a>
        </div>
        <div :class="'subjects-item ' + (idActiveUser === user.id ? 'active ' : '') + (index === users.length - 1 ? 'no-border' : '')" @click="() => curl(user.id)" v-for="(user, index) in users" :key="index">
            <div class="subject-data">
                <p>{{user.subject}}</p>
            </div>
        </div>
        <div class="subjects-bottom">
          <button class="more-button">Загрузить ещё</button>
        </div>
    </section>
    </div>
</template>

<script>
import Users from "./Users.vue";
export default {
  name: "Subjects",
  data() {
    return {
      idActiveUser: null,
      backButton: null,
      users: [
        {
          id: 0,
          subject: "Subject 1",
          isActive: false
        },
        {
          id: 1,
          subject: "Subject 2",
          isActive: false
        },
        {
          id: 2,
          subject: "Subject 3",
          isActive: false
        },
        {
          id: 3,
          subject: "Subject 2",
          isActive: false
        },
        {
          id: 4,
          subject: "Subject 3",
          isActive: false
        },
        {
          id: 5,
          subject: "Subject 2",
          isActive: false
        },
        {
          id: 6,
          subject: "Subject 3",
          isActive: false
        },
        {
          id: 7,
          subject: "Subject 2",
          isActive: false
        },
        {
          id: 8,
          subject: "Subject 3",
          isActive: false
        }
      ]
    };
  },
  methods: {
    curl(id) {
      this.idActiveUser = id;
      //   this.backButton = id;
      return;
    },
    backButtonEvent() {
      this.backButton = null;
      return;
    }
  },
  components: {
    Users
  }
};
</script>

<style lang="scss">
.subjects-wrapper {
  display: flex;
  flex-direction: row;
}

.subjects-bottom {
  display: flex;
  justify-content: center;
  padding: 25px;
}

section.subjects {
  margin: 0;
  padding: 0px;
  background: #cecece;
  width: 240px;
  height: 100vh;
  ms-user-select: none;
  -moz-user-select: none;
  -khtml-user-select: none;
  -webkit-user-select: none;
  overflow: scroll;

  .subjects-item {
    border-bottom: 1px solid #b9b9b9;
    margin: 0;
    padding: 20px;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    cursor: pointer;

    &:hover {
      background: #c1c1c1;
    }

    &.no-border {
      border-bottom: none !important;
    }

    &.active {
      background: #b9b9b9;
    }

    .subject-data {
      margin: 0;
      padding: 5px;
      display: flex;
      flex-direction: column;
      justify-content: center;

      h4,
      p {
        margin: 0;
        font-family: Arial, Helvetica, sans-serif;
        color: #333333;
        font-size: 16px !important;
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

    // .user-data {
    //   display: none !important;
    // }

    .back {
      display: flex;
      height: 40px;
      position: fixed;
      top: 50px;
      background: #cecece;
      justify-content: center;
      align-items: center;
      cursor: pointer;
      -webkit-transition: top 1s ease-out 0.5s;
      -moz-transition: top 1s ease-out 0.5s;
      -o-transition: top 1s ease-out 0.5s;
      transition: top 1s ease-out 0.5s;
      border-bottom: 1px solid #b9b9b9;

      img {
        width: 10px;
        height: 10px;
      }
    }
  }
}
</style>

