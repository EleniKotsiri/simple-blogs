<template>
  <div class="tag">
    <div v-if="error"> {{ error }} </div>
    <div v-if="posts.length" class="layout">
      <!-- use PostList.vue to show postsWithTag. It uses 'posts' prop -->
      <PostList :posts="postsWithTag" />
      
      <TagCloud :posts="posts" />
    </div>
    <div v-else>
      <Spinner />
    </div>
  </div>
</template>

<script>
import Spinner from '../components/Spinner.vue'
import PostList from '../components/PostList.vue'
import TagCloud from '../components/TagCloud.vue'
import getPosts from '../composables/getPosts'

import { computed } from 'vue'
import { useRoute } from 'vue-router'

export default {

  components: { PostList, Spinner, TagCloud },

  setup() {
    // useRoute to fetch :tag
    const route = useRoute()
    // debugger;
    // We'll use getPosts to get all posts and then filter them out
    const { posts, error, load } = getPosts()
    load()

    // computed property to get posts with certain tag
    const postsWithTag = computed(() => {
      // we return the post (parameter) that includes that particular tag
      return posts.value.filter((post) => {
        // post.tag to get tag property from posts
        return post.tags.includes(route.params.tag) // this returns a boolean. True if the tags (post.tags) of the post
                                            // that we are iterating contain the tag that's in the route
      })

    })
    // console.log(postsWithTag)

    return { error, posts, postsWithTag }
  }

}
</script>

<style>
.tag {
    max-width: 1200px;
    margin: 0 auto;
    padding: 10px;
  }

</style>