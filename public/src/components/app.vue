<template>
    <div id='app'>
        <div class='container'>
            <create-lunch></create-lunch>
            <lunch-list></lunch-list>
        </div>
    </div>
</template>
<script>
import createLunch from './createLunch.vue'
import lunchList from './lunchList.vue'

export default {
    components : {createLunch, lunchList}
}
</script>
