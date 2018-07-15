<template>
<aside :class="`side-menu ${collapsed && 'collapsed'}`">
    <ul>
        <li class="toggle-menu" @click="collapse">
            <div class="menu-item">
                <div class="image-wrapper">
                    <img src="@/assets/icons/menu-icon.svg" />
                </div>
                <span>Скрыть меню</span>
            </div>
        </li>
        <li v-for="folder in folders" :key="folder.id">
            <div :class="`menu-item ${active === folder.id ? 'active' : ''}`" @click="() => select(folder.id)">
                <input v-if="folder.children.length > 0" type="checkbox" @change="() => toggle(folder.id)" />
                <div class="image-wrapper">
                    <img v-if="folder.name === 'Входящие'" src="@/assets/icons/mail-icon.svg" alt="menu-icon" />
                    <img v-else-if="folder.name === 'Отправленные'" src="@/assets/icons/reply-icon.svg" alt="menu-icon" />
                    <img v-else src="@/assets/icons/folder-icon.svg" alt="menu-icon" />
                </div>
                <span>{{ folder.name }}</span>
                <img v-if="folder.children.length > 0" src="@/assets/icons/drop-icon.svg" />
            </div>
            <ul v-if="folder.children.length > 0" :class="`sub-menu ${toggled.includes(folder.id) ? 'toggled' : ''}`">
                <li v-for="subFolder in folder.children" :key="subFolder.id">
                    <div :class="`menu-item ${active === subFolder.id ? 'active' : ''}`" @click="() => select(subFolder.id)">
                        <div class="image-wrapper">
                            <img src="@/assets/icons/folder-icon.svg" alt="menu-icon" />
                        </div>
                        {{ subFolder.name }}
                    </div>
                </li>
            </ul>
        </li>
    </ul>
</aside>
</template>

<script>
export default {
  props: ['collapsed', 'folders'],
  data() {
    return {
      toggled: [],
      active: null
    };
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
      let found = false
      const folder = this.folders.map(item => {
        if (!found) {
          if (item.id == id) {
            found = true
            return item
          } else if (item.children.length > 0) {
            const child = item.children.filter(child => child.id === id)[0]
            if (child != undefined) {
              found = true
              return child
            }
          }
        }
      }).filter(item => item != undefined)[0]
      this.$emit('folder', folder)
    },
    collapse() {
      this.$emit("input", !this.collapsed)
    }
  }
};
</script>

<style lang="scss" scoped>
.side-menu {
  width: 250px;
  height: 100vh;
  padding: 5px;
  border-right: 1px solid #b9b9b9;
  background: rgb(255, 255, 255);
  height: calc(100vh - 50px) !important;
  -webkit-animation: slide-in .4s 1 ease-in-out;
  -moz-animation: slide-in .4s 1 ease-in-out;
  -o-animation: slide-in .4s 1 ease-in-out;
  animation: slide-in .4s 1 ease-in-out;
  animation-fill-mode: forwards;
  &.collapsed {
    -webkit-animation: slide-out .4s 1 ease-in-out;
    -moz-animation: slide-out .4s 1 ease-in-out;
    -o-animation: slide-out .4s 1 ease-in-out;
    animation: slide-out .4s 1 ease-in-out;
    animation-fill-mode: forwards;

    ul li {
      .menu-item {
        & > input[type="checkbox"],
        & > span,
        & > img {
          display: none;
        }

        .image-wrapper {
          width: 100% !important;
        }
      }
      .sub-menu {
        display: none;
      }
    }
  }

  ul {
    margin: 0;
    padding: 2px 5px;
    list-style: none;

    li {
      font-family: Arial, Helvetica, sans-serif;
      font-size: 15px;
      font-weight: normal;
      padding: 2px 0;
      &.active {
        .image-wrapper {
          background: rgb(221, 221, 221);
        }
      }

      &.toggle-menu {
        border-bottom: 1px solid #b9b9b9;
        padding-bottom: 6px; 
      }

      .menu-item {
        display: flex;
        align-items: center;
        position: relative;
        cursor: pointer;

        &.active {
          background: rgb(221, 221, 221);
          border-radius: 8px;
          font-weight: bold;
        }

        .image-wrapper {
          
          display: flex;
          align-items: center;
          justify-content: center;
          width: 40px;
          height: 40px;
          border-radius: 4px;

          // Icon
          img {
            width: 17px;
          }
        }

        & > img {
          width: 7px;
          margin-left: 10px;
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
        padding-left: 12px;
        &:not(.toggled) {
          display: none;
        }
      }

    }
  }
}

@keyframes slide-out {
  0% {
    width: 250px;
  }
  100% {
    width: 70px;
  }
}

@keyframes slide-in {
  0% {
    width: 70px;
  }
  100% {
    width: 250px;
  }
}
</style>
