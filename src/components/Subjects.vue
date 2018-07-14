
<template>
    <div class="subjects-wrapper">
    <section class="subjects">
      <div class="less-button" v-show="idActiveSubject !== null" @click="deSelectSubject">
            <p>Все темы</p>
        </div>
        <div :class="'subjects-item ' + (idActiveSubject === subject.id ? 'active ' : '') + (index === subjects.length - 1 ? 'no-border' : '')" @click="() => curl(subject.id)" v-for="(subject, index) in subjects" :key="index">
            <div class="subject-data">
                <p>{{subject.value}}</p>
            </div>
        </div>
        <div class="subjects-bottom">
          <button class="more-button">Загрузить ещё</button>
        </div>
    </section>
    </div>
</template>

<script>
export default {
  name: "Subjects",
  data() {
    return {
      idActiveSubject: null,
      backButton: null,
      subjects: [
        {
          id: 0,
          value: "Subject 1"
        },
        {
          id: 1,
          value: "Subject 2"
        },
        {
          id: 2,
          value: "Subject 3"
        },
        {
          id: 3,
          value: "Subject 2"
        },
        {
          id: 4,
          value: "Subject 3"
        },
        {
          id: 5,
          value: "Subject 2"
        },
        {
          id: 6,
          value: "Subject 3"
        },
        {
          id: 7,
          value: "Subject 2"
        },
        {
          id: 8,
          value: "Subject 3"
        }
      ]
    };
  },
  methods: {
    curl(id) {
      this.idActiveSubject = id;
      return;
    },
    backButtonEvent() {
      this.backButton = null;
      return;
    },
    deSelectSubject() {
      this.idActiveSubject = null;
    }
  },
  components: {}
};
</script>

<style lang="scss">
.subjects-wrapper {
  display: flex;
  flex-direction: column;

  .less-button {
    display: flex;
    height: 40px;
    top: 50px;
    background: #e8e8e8;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    -webkit-transition: top 1s ease-out 0.5s;
    -moz-transition: top 1s ease-out 0.5s;
    -o-transition: top 1s ease-out 0.5s;
    transition: top 1s ease-out 0.5s;
    border-bottom: 1px solid #b9b9b9;
    font-size: 13px;
    &:hover {
      background: #c8c8c8;
    }
  }
}

.subjects-bottom {
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 25px;
}

// .less-button {
//   background: #b3b3b3;
//   border-style: none;
//   padding: 10px;
//   transition: 0.3s;
//   font-size: 13px;
//   margin-top: 10px;
// }

// .less-button:hover {
//   background: ##c8c8c8;
// }

section.subjects {
  margin: 0;
  padding: 0px;
  background: #f0f0f0;
  width: 240px;
  height: 100vh;
  ms-user-select: none;
  -moz-user-select: none;
  -khtml-user-select: none;
  -webkit-user-select: none;
  overflow: scroll;
  height: calc(100vh - 50px) !important;
  border-bottom: 1px solid #b9b9b9;

  .subjects-item {
    border-bottom: 1px solid #b9b9b9;
    margin: 0;
    padding: 20px;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    cursor: pointer;

    &:hover {
      background: #e8e8e8;
    }

    &.no-border {
      border-bottom: none !important;
    }

    &.active {
      background: #d8d8d8;
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
  }
}
</style>

