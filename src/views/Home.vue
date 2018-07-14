<template>
  <div class="home">
    <side-menu :collapsed="collapsed" v-model="collapsed" />
    <users v-model="isSubjectVisible" @collapse="e => collapsed = e" />
    <subjects v-if="isSubjectVisible" />
  </div>
</template>

<script>
import File from '@/components/File.vue'
import SideMenu from '@/components/SideMenu.vue'
import Subjects from '@/components/Subjects.vue'
import Users from '@/components/Users.vue'

export default {
  name: 'home',
  data() {
    return {
      isSubjectVisible: false,
      collapsed: false
    }
  },
  components: {
    File, 
    'side-menu': SideMenu, 
    'subjects': Subjects,
    'users': Users,
  }
}
</script>

<style lang="scss">
.home {
  display: flex;
}
</style>
