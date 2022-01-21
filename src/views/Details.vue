<template>
  <div v-if="error"> {{ error }} </div>
  <div v-if="post" class="post">
    <h3>{{ post.title }}</h3>
    <p class="pre"> {{ post.body }}</p>
    <button class="delete" @click="handleDelete">Delete post</button>
  </div>
  <div v-else>
    <Spinner/>
  </div>
</template>

<script>
import getSinglePost from '../composables/getSinglePost'
import Spinner from '../components/Spinner.vue'
import { useRoute, useRouter } from 'vue-router' 
import { projectFirestore } from '../firebase/config'

export default {
  components: { Spinner },
  props: ['id'],
  setup(props) {
    const route = useRoute()
    const router = useRouter()
    // get route params using useRoute()
    const {post, error, load} = getSinglePost(route.params.id) 
    // const {post, error, load} = getSinglePost(props.id) // props.id is the id we pass from getSinglePost as a prop (const getSinglePost = (id) => {...})
    load()

    const handleDelete = async () => {
      // I'll use props to get the id (we could use useRoute too)
      await projectFirestore.collection('posts').doc(props.id).delete()

      router.push('/')
    }

    return { post, error, handleDelete }
  }
}
</script>

<style>
.post {
    max-width: 1200px;
    margin: 0 auto;
  }
  .post p {
    color: #444;
    line-height: 1.5em;
    margin-top: 40px;
  }
  .pre {
    white-space: pre-wrap;
  }

  button.delete {
    margin: 10px auto;
  }
</style>