<!-- A component to show tags on the right side of the page -->
<template>
    <div class="tag-cloud">
        <h3> Tags </h3>
        <div v-for="tag in tags" :key="tag">
            <!-- we want all tags to be clickable and take us to tag page -->
            <!-- Tag is the name of route (component), first tag is the parameter (from route: tags/:tag)
            2nd tag is the tag in v-for -->
            <router-link :to="{ name: 'Tag', params: { tag }}">
                #{{ tag }}
            </router-link>
        </div>
    </div>
  
</template>

<script>
import useTags from '../composables/useTags'

export default {
    // accept posts prop
    props:['posts'],

    setup(props) {
        // pass posts to useTags so it can cycle through posts
        // that's why setup has props argument
        const { tags } = useTags(props.posts)

        return { tags }
    }

}
</script>

<style>
  .tag-cloud {
    padding: 10px;
  }
  .tag-cloud h3 {
    border-bottom: 1px solid #eee;
    padding: 16px 8px;
    color: #444;
  }
  .tag-cloud div {
    display: inline-block;
    padding: 10px;
  }
  .tag-cloud a {
    color: #ccc;
    text-decoration: none;
  }
  .tag-cloud a.router-link-active {
    color: #1a75ff;
    font-weight: bold;
  }

</style>