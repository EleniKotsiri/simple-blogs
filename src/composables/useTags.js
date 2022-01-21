import { ref } from 'vue'

const useTags = (posts) => {

    const tags = ref([])
    const tagSet = new Set();
    // Set is like an array that doesn't accept duplicates
    // Some posts have the same tag and we want to show a tag only once

    // for each item(post) in posts, for each tag in tags in item, add tag to tagSet
    posts.forEach((item) => { // item == post
        item.tags.forEach((tag) => tagSet.add(tag))   
    })
    // tagSet now has all tags from posts and not more than one instance of tags (no duplicates)

    // we want to show an array and not a Set
    tags.value = [...tagSet]

    return { tags }
}

export default useTags