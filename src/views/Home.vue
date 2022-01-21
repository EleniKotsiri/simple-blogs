<template>
  <div class="home">
    <h1>Home</h1>
    <div v-if="error"> {{ error }} </div>
    <div v-if="posts.length" class="layout">
      <!-- we get posts from getPosts (line 27) -->
      <PostList :posts="posts" />
      <TagCloud :posts="posts" />
    </div>
    <div v-else>
      <Spinner />
    </div>
  </div>
</template>

<script>
// component imports
import PostList from '../components/PostList.vue'
import TagCloud from '../components/TagCloud.vue'
import Spinner from '../components/Spinner.vue'
import getPosts from '../composables/getPosts'

export default {
  name: 'Home',
  components: { PostList, Spinner, TagCloud },
  setup() {
    
    const { posts, error, load } = getPosts()
    // firstly posts, error are empty and null respectively 
    // then load() runs and they get values
    load()

    return { posts, error }
  },
}
</script>

<style>
  .home {
    max-width: 1200px;
    margin: 0 auto;
    padding: 10px;
  }
  .layout {
    display: grid;
    grid-template-columns: 3fr 1fr;
    gap: 20px;
  }
</style>