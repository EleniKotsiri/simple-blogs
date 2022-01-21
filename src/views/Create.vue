<template>
  <div class="create">
    <form @submit.prevent="handleSubmit">
        <label>Title:</label>
        <input type="text" required v-model="title">
        <label>Content:</label>
        <textarea required v-model="body"></textarea>
        <label>Tags (hit enter to add a tag):</label>
        <input
            type="text"
            v-model="tag"
            @keydown.enter.prevent="handleKeydown"
        >
        <div v-for="tag in tags" :key="tag" class="pill">
            #{{ tag }}
        </div>
        <button type="submit" >Add Post</button>
        <button @click.prevent="this.$router.push('/')">Cancel</button>
    </form>
  </div>
</template>

<script>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { projectFirestore, timestamp } from '../firebase/config'

export default {

    setup() {
        const title = ref('')
        const body = ref('')
        const tag = ref('')
        const tags = ref([])

        const router = useRouter()
        // console.log(router)

        // handleKeydown to handle adding tag
        const handleKeydown = () => {
            tag.value = tag.value.replace(/\s+/g,'') // remove spaces (\s)
            // run this only if tag is not already inside tags[]
            if(!tags.value.includes(tag.value)) {
                tags.value.push(tag.value)
            }
            tag.value = ''
        }

        // handleSubmit to handle submitting form
        // using async - await
        const handleSubmit = async () => {
            let post = {
                // JSON server automatically adds id to item
                title: title.value,
                body: body.value,
                tags: tags.value,
                createdAt: timestamp()
            }
            // * * * * Using Firebase * * * *
            const res = await projectFirestore.collection('posts').add(post)


            // * * * * Using JSON Server * * * *
            // send post as JSON to endpoint (uri)
            // await fetch(('http://localhost:3000/posts'), {
            //     method: 'POST',
            //     // headers: we're sending some data with this request that is type of JSON :
            //     headers: {'Content-Type': 'application/json'},
            //     //body: what data we want to send
            //     body: JSON.stringify(post)
            // })

            // redirect to home page after adding a new post
            router.push("/")
            

        }

        return { title, body, tag, tags, handleKeydown, handleSubmit }
    }

}
</script>

<style>
 form {
    max-width: 480px;
    margin: 0 auto;
    text-align: left;
  }
  input, textarea {
    display: block;
    margin: 10px 0;
    width: 100%;
    box-sizing: border-box;
    padding: 10px;
    border: 1px solid #eee;
  }
  textarea {
    height: 160px;
  }
  label {
    display: inline-block;
    margin-top: 30px;
    position: relative;
    font-size: 20px;
    color: white;
    margin-bottom: 10px;
  }
  label::before {
    content: "";
    display: block;
    width: 100%;
    height: 100%;
    background: #1a75ff;
    position: absolute;
    z-index: -1;
    padding-right: 40px;
    left: -30px;
    transform: rotateZ(-1.5deg);
  }
  button {
    display: block;
    margin-top: 30px;
    background: #1a75ff;
    color: white;
    border: none;
    padding: 8px 16px;
    font-size: 18px
  }
  .pill {
    display: inline-block;
    margin: 10px 10px 0 0;
    color: #444;
    background: #ddd;
    padding: 8px;
    border-radius: 20px;
    font-size: 14px;
  }

</style>