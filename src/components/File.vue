<template>

    <div class="container">
        <div class="node-text--header">
            <h3>{{ data.name}}</h3>
        </div>
        <div class="container-node">
            <div class="node-text">
                <span><label>Дата создания: </label>{{data.date | moment("D MMMM YYYY, h:mm")}}</span>
                <span><label>Размер файла: </label>{{convertSize(data.size)}}</span>
                <span><label>Отправитель: </label>{{senderEmail}}</span>
            </div>
            <div class="node-img">
                <img :src="((img || {}).data) || file" width="60px" height="75px" alt="Documents">
            </div>
        </div>
        <div class="container-link">
            <a :href="data.href.view || ''" :class="data.href.view ? '' : 'disabled'" target="_blank">Посмотреть</a>
            <a :href="data.href.download || ''" target="_blank">Скачать</a>
        </div>
    </div>

</template>

<script>
import file from "@/assets/docx/file.png";
import he from "he";
import filesize from "filesize";
export default {
  name: "file",
  props: ["img", "data", "subject", "senderEmail"],
  data() {
    return {
      file,
      slicedSubject: ""
    };
  },
  methods: {
    decode(str) {
      return he.decode(str);
    },
    convertSize(str) {
      return filesize(str, {
        fullform: true,
        fullforms: ["Б", "КБ", "МБ", "ГБ", "ТБ"]
      });
    }
  },
  created() {
    this.slicedSubject = this.decode(this.subject.subject).slice(0, 30) + "...";
    this.$moment.locale("ru");
  }
};
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background: #e5e5e5;
  border-radius: 4px;
  border: 1px solid #b9b9b9;
  border-radius: 2px;
  margin: 20px 30px;

  .container-node {
    display: flex;
    padding: 15px 20px;
  }

  .node-text {
    display: flex;
    flex-direction: column;
    width: 70%;
    font-family: Arial, Helvetica, sans-serif;
    & > span {
      padding: 3px 0;
    }
  }

  .node-text--header {
    width: 100%;
    border-bottom: 1px solid #b9b9b9;
    padding: 5px 20px;
  }

  div h3 {
    margin-bottom: 5px;
    margin-top: 5px;
    font-weight: bold;
    font-size: 20px;
    font-family: "Helvetica Neue", Arial, sans-serif;
    padding-bottom: 10px;
    padding-top: 10px;
  }
  div span {
    display: block;
    width: 100%;
    font-size: 15px;
    color: #585858;
  }
  .node-img {
    display: flex;
    justify-content: center;
    flex-direction: row;
    align-items: center;
    width: 30%;
  }
  .container-link {
    display: flex;
    align-items: flex-start;
    flex-direction: row;
    padding: 15px 20px;
    font-family: Arial, Helvetica, sans-serif;
    text-transform: uppercase;
  }
  a {
    display: inline-block;
    padding: 0 25px 0 0;
    text-decoration: none;
    font-size: 19px;
    color: #007adc;
    font-size: 15px;
    &.disabled {
      pointer-events: none;
      color: gray;
    }
  }
  .node-prewie {
    width: 300px;
    display: flex;
    justify-content: center;
    padding-bottom: 15px;
  }

}
</style>
