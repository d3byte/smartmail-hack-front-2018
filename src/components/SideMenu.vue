<template>
<aside :class="`side-menu ${collapsed && 'collapsed'}`">
    <ul>
        <li class="toggle-menu" @click="collapse">
            <div class="menu-item">
                <div class="image-wrapper">
                    <img src="@/assets/icons/menu-icon.svg" />
                </div>
            </div>
        </li>
        <li>
            <div :class="`menu-item ${active === 0 ? 'active' : ''}`" @click="() => select(0)">
                <input type="checkbox" @change="() => toggle(0)" />
                <div class="image-wrapper">
                    <img src="@/assets/icons/mail-icon.svg" alt="menu-icon" />
                </div>
                <span>Входящие</span>
                <img src="@/assets/icons/drop-icon.svg" />
            </div>
            <ul :class="`sub-menu ${toggled.includes(0) ? 'toggled' : ''}`">
                <li>
                    <div class="menu-item">
                        <div class="image-wrapper">
                            <img src="@/assets/icons/users-icon.svg" alt="menu-icon" />
                        </div>
                        Социальные сети
                    </div>
                </li>
                <li>
                    <div class="menu-item">
                        <div class="image-wrapper">
                            <img src="@/assets/icons/mailings-icon.svg" alt="menu-icon" />
                        </div>
                        Рассылки
                    </div>
                </li>
                <li>
                    <div class="menu-item">
                        <div class="image-wrapper">
                            <img src="@/assets/icons/discount-icon.svg" alt="menu-icon" />
                        </div>
                        Скидки
                    </div>
                </li>

            </ul>
        </li>
        <li>
            <div :class="`menu-item ${active === 1 ? 'active' : ''}`" @click="() => select(1)">
                <div class="image-wrapper">
                    <img src="@/assets/icons/folder-icon.svg" alt="menu-icon" />
                </div>
                <span>Важное</span>
            </div>
        </li>
        <li>
            <div :class="`menu-item ${active === 2 ? 'active' : ''}`" @click="() => select(2)">
                <div class="image-wrapper">
                    <img src="@/assets/icons/reply-icon.svg" alt="menu-icon" />
                </div>
                <span>Отправленные</span>
            </div>
        </li>
    </ul>
</aside>
</template>

<script>
export default {
    props: ['collapsed'],
    data() {
        return {
            toggled: [],
            active: null,
        }
    },
    methods: {
        toggle(id) {
            if (this.toggled.includes(id)) {
                this.toggled = this.toggled.filter(item => item !== id)
                return
            }
            this.toggled.push(id)
        },
        select(id) {
            this.active = id
        },
        collapse() {
            this.$emit('input', !this.collapsed)
        }
    }
}
</script>

<style lang="scss">
.side-menu {
    width: 20%;
    height: 100vh;
    border-right: 1px solid #b9b9b9;
    background: rgb(240, 240, 240);

    &.collapsed {
        width: 70px;

        ul li {
            .menu-item {
                    & > input[type="checkbox"], & > span, & > img {
                        display: none;
                    }
                }
        }
    } 

    ul {
        margin: 0;
        padding: 0 15px;
        list-style: none;

        li {

            &.active {
                .image-wrapper {
                    background: rgb(221, 221, 221);
                }
            }

            .menu-item {
                display: flex;
                align-items: center;
                position: relative;
                cursor: pointer;

                &.active {
                    background: rgb(221,221, 221);
                    border-radius: 8px;
                    font-weight: bold;
                }

                .image-wrapper {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    width: 40px;
                    height: 40px;
                    padding: 10px;
                    border-radius: 4px;

                    // Icon
                    img {
                        width: 17px;
                    }
                }

                & > img {
                    width: 7px;
                    // margin-left: 10px;
                    transform: rotate(180deg);
                }

                & > input[type="checkbox"] {
                    opacity: 0;
                    position: absolute;
                    width: 100%;
                    height: 100%;
                    cursor: pointer;

                    &:checked {
                        & ~ img {
                            transform: rotate(0);
                        }



                    }

                }

            }

            .sub-menu {
                &:not(.toggled) {
                    display: none;
                }

            }

        }

    }
}
</style>
