<template>
    <div id='app'>
        <div class='container'>
            <h1>Helo</h1>
            <create-lunch></create-lunch>
        </div>
    </div>
</template>
<script>
import createLunch from './createLunch.vue'

export default {
    components : {createLunch}
}
</script>
