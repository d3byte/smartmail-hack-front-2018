<template>
    <section :class="'users ' + (backButton !== null ? 'hidden' : '')">
        <div class="back" @click="backButtonEvent">
            <img src="@/assets/button/icon.svg">
        </div>
        <div :class="'users-item ' + (idActiveUser === user.id ? 'active' : '')" @click="() => curl(user.id)" v-for="(user, index) in users" :key="index">
            <div class="user-img">
                <img src="../assets/ava.png" class="user-file" />
            </div>
            <div class="user-data">
                <h4>{{user.name}}</h4>
                <p>{{user.subject}}</p>
            </div>
        </div>
    </section>
</template>

<script>
export default {
    data() {
        return {
            idActiveUser: null,
            backButton: null,
            users: [
                {
                    id: 0,
                    name: "Vasya Pupkin",
                    subject: "Subject 1",
                    isActive: false
                },
                {
                    id: 1,
                    name: "Vasya Sisya",
                    subject: "Subject 2",
                    isActive: false
                },
                {
                    id: 2,
                    name: "Vasya Pisya",
                    subject: "Subject 3",
                    isActive: false
                },
                {
                    id: 3,
                    name: "Vasya Sisya",
                    subject: "Subject 2",
                    isActive: false
                },
                {
                    id: 4,
                    name: "Vasya Pisya",
                    subject: "Subject 3",
                    isActive: false
                },
                {
                    id: 5,
                    name: "Vasya Sisya",
                    subject: "Subject 2",
                    isActive: false
                },
                {
                    id: 6,
                    name: "Vasya Pisya",
                    subject: "Subject 3",
                    isActive: false
                },
                {
                    id: 7,
                    name: "Vasya Sisya",
                    subject: "Subject 2",
                    isActive: false
                },
                {
                    id: 8,
                    name: "Vasya Pisya",
                    subject: "Subject 3",
                    isActive: false
                },
            ]
        }
    },
    methods: {
        curl(id) {
            this.idActiveUser = id
            this.backButton = id
            return
        },
        backButtonEvent() {
            this.backButton = null
            return
        }
    }
}
</script>

<style lang="scss">
section.users {
    margin: 0;
    padding: 0px;
    background: #CECECE;
    width: 320px;
    height: 100vh;
    ms-user-select: none;
    -moz-user-select: none;
    -khtml-user-select: none;
    -webkit-user-select: none;
    overflow: scroll;

    .users-item {
        border-bottom: 1px solid #b9b9b9;
        margin: 0;
        padding: 5px;
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        cursor: pointer;

        &:hover, &:active {
            background: #c1c1c1;
        }

        &.active {
            background: #b9b9b9;
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
                border: 1px solid rgba(0,0,0,0.12);
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

            h4, p {
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
        width: 100px;
        padding-top: 40px;

        .user-data {
            display: none !important;
        }

        .back {
            display: flex;
            height: 40px;
            width: 100px;
            position: fixed;
            top: 0;
            background: #CECECE;
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

