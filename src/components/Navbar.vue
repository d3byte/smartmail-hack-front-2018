<template>
    <nav class="navigation-top">
        <div class="wrapper">
            <img src="../assets/logo.png">
            <div class="tab" @click="selectTab('/1')" :class="(path === '/1' ? 'active' : '')">
                Письма
            </div>
            <div class="tab" @click="selectTab('/2')" :class="(path === '/2' ? 'active' : '')">
            Контакты
            </div>
            <div class="tab" @click="selectTab('/')" :class="(path === '/' ? 'active' : '')">
            Файлы
            </div>
            <div class="tab" @click="selectTab('/4')" :class="(path === '/4' ? 'active' : '')">
            Темы
            </div>
        </div>
        <!-- <input placeholder="Поиск по почте" /> -->
        <span class="input-span-wrapper">
            <span class="input-span-inner">
                <input placeholder="Поиск по почте"/>
            </span>
            <i class="material-icons">search</i>
        </span>
    </nav>
</template>

<script>
export default {
    name: 'Navbar',
    data() {
        return {
            path: null,
        }
    },
    methods: {
        selectTab(path) {
            this.path = path
            this.$router.push(path)
        }
    },
    created() {
        this.path = this.$route.path
        //this.$route.path
    }
}
</script>

<style lang="scss">
nav.navigation-top {
    display: flex;
    justify-content: space-between;
    background: #168de2;
    height: 50px;
    align-items: center;
    padding: 0 70px;

    .input-span-wrapper {
        display: flex;
        justify-content: space-between;
        border-radius: 3px;
        border-style: none;
        height: 30px;
        width: 202px;
        background: white;
        vertical-align: middle;
    }

    .input-span-inner {
        width: 142px !important;
        margin-left: 10px;
        &:empty{
            width: 142px;
            height: 30px;
        }
    }

    input {
        border-radius: 3px;
        border-style: none;
        width: 142px;
        height: 30px;
        border: none;
        &:placeholder {
            font-size: 13px;
        }
    }

    i.material-icons {
        padding: 5px;
        font-size: 20px;
    }

    img {
        width: 135px;
        margin-right: 50px;
    }

    .tab {
        overflow: hidden;
        background-color: #168de2;
    }

    .wrapper {
        display: flex;
        align-items: center;
    }

    .tab {
        display: flex;
        background-color: inherit;
        border: none;
        outline: none;
        cursor: pointer;
        transition: 0.3s;
        height: 50px;
        align-items: center;
        color: white;
        padding-left: 10px;
        padding-right: 10px;

        &:hover {
            background-color: #137ecb;
        }

        &.active {
            background-color: #1170b4;
        }
    }    

}
</style>