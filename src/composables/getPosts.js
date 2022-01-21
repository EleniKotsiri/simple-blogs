// Composables (composition functions): Reusable functions using composition API

import { ref } from 'vue'

import { projectFirestore } from '../firebase/config.js'

const getPosts = () => {
    const posts = ref([])
    const error = ref(null)

    const load = async () => {
      // * * * * Using Firestore database: * * * * 
      try {
        const res = await projectFirestore.collection('posts')
        .orderBy('createdAt', 'desc') // show newer first then older blogs
        // createdAt is generated using serverTimestamp in firebase/config.js
        .get() // connect to a collection (posts) in firebase
        // .get() to actually get the data (without it, it's just a reference to the database)
        // 'await' because it's async function

        posts.value = res.docs.map((doc) => {
          // console.log(doc.data())
          // each document is a unique id, the id is not stored inside the documents (only title,body,tags properties)
          // so we return an object with the id and the data fields using spread operator
          return { ...doc.data(), id: doc.id}
          // now PostList.vue can get the id
        })

      }
      // * * * * Using JSON server: * * * * 
      // try {
      //   //simulate delay to call Spinner.vue
      //   await new Promise((resolve) => {
      //     setTimeout(resolve, 500)
      //   })

      //   let data = await fetch('http://localhost:3000/posts')
      //   //data.ok : status 200 OK (ok: true)
      //   if(!data.ok){
      //     throw Error('data not available')
      //   }
      //   posts.value = await data.json()
      // }
      catch(err) {
        error.value = err.message
        console.log(error.value)        
      }
    }

    return { posts, error, load }
}

export default getPosts