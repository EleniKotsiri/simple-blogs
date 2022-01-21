import { ref } from 'vue'
import { projectFirestore } from '../firebase/config'

const getSinglePost = (id) => {
    const post = ref(null)
    //it's a single post so at first it's ref(null) and not an empty array (ref([]))
    const error = ref(null)

    const load = async () => {
        try {
            //simulate delay to call Spinner.vue
            await new Promise((resolve) => {
                setTimeout(resolve, 500)
            })
            // * * * * Using Firebase * * * *
            const res = await projectFirestore.collection('posts').doc(id).get()
            // console.log(res.data())

            if(!res.exists){
              throw Error('this post does not exist')
            }
            post.value = { ...res.data(), id: res.id}
            // * * * * Using JSON server * * * *
            // let data = await fetch('http://localhost:3000/posts/' +id)
            // //data.ok : status 200 OK (ok: true)
            // if(!data.ok){
            //   throw Error('that post does not exist')
            // }
            // post.value = await data.json()
        }
        catch(err) {
          error.value = err.message
          console.log(error.value)        
        }
    }

    return { post, error, load}
}

export default getSinglePost