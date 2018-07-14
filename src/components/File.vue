<template>
    <div class="file-bar">
        <ul>
            <li v-for="(item, index) in node" :key="index" class="node-item">
                <div class="container">
                    <div class="container-node">
                        <div class="node-text">
                            <h3>{{item.name}}</h3>
                            <span>{{item.date}}</span>
                            <span>{{item.title}}</span>
                            <span>{{item.size}}</span>
                        </div>
                        <div class="node-img">
                            <img :src="img" width="45px" height="60px" alt="Documents">
                        </div>
                    </div>
                    <div class="container-link">
                        <a href="">Посмотреть</a>
                        <a href="">Скачать</a>
                    </div>
                </div>
                <div class="node-prewie">
                    <img src="../assets/160.png" alt="">
                </div>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
  name: "File",
  props: ['img', 'data'],
  data() {
    return {
      node: [
        {
          name: "Название",
          date: "Создан: 01.11.2018",
          title: "Тема письма",
          size: "32 Кб"
        }
      ]
    };
  }
};
</script>

<style lang="scss" scoped>
.node-item {
  box-shadow: rgba(0, 0, 0, 0.2) 0px 0px 3px;
  width: 300px;
  background: white;
  border-radius: 4px;
}
.container {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.container-node {
  display: flex;
}
.node-text {
  display: flex;
  flex-direction: column;
  margin-left: 10px;
  width: 70%;
  font-family: Arial, Helvetica, sans-serif;
}
ul {
  padding: 0px;
  margin: 0px;
}
li {
  list-style-type: none;
}
ul li h3 {
  margin-bottom: 5px;
  margin-top: 5px;
  font-weight: normal;
  font-size: 22px;
}
ul li span {
  display: block;
  width: 100%;
  font-size: 15px;
  color: #585858;
}
.node-img {
  display: flex;
  justify-content: center;
  flex-direction: column;
  width: 30%;
}
.container-link {
  display: flex;
  align-items: flex-end;
  flex-direction: row;
  padding: 15px 10px;
  font-family: Arial, Helvetica, sans-serif;
  text-transform: uppercase;
}
ul li a {
  display: inline-block;
  width: 50%;
}
li a {
  text-decoration: none;
  font-size: 19px;
  color: #007adc;
  font-size: 15px;
}
.node-prewie {
  width: 300px;
  display: flex;
  justify-content: center;
  padding-bottom: 15px;
}
</style>
