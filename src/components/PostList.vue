<template>
  <div class="post-list">
    <div v-for="post in posts" :key="post.id">
      <SinglePost :post="post" />
    </div>
  </div>
</template>

<script>
import { onMounted, onUnmounted, onUpdated } from 'vue'
// component imports
import SinglePost from './SinglePost.vue'

export default {
  // PostList expects a 'posts' prop
  props: ['posts'],
  components: { SinglePost },
  
  setup(props) {
    onMounted(() => console.log('component mounted'))
    onUnmounted(() => console.log('component unmounted'))
    onUpdated(() => console.log('component updated'))
  }
}
</script>

<style>
</style>