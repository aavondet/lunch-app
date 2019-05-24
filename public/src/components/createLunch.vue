<template>
    <div>
        <button title="Create a Lunch" @click="toggle()" >Create a Lunch</button>
        <div class="form-group" :class="{ forminvisible: !adding }">
            <input type=text v-model="title" placeholder="Title">
            <input type=text v-model="createdBy" placeholder="Your Name">
            <input type=text v-model="location" placeholder="Location">
            <input type=text v-model="time" placeholder="Time">
            <button title="Create a Lunch" @click="addLunch();" >Submit</button>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import bus from '../bus.js'

export default {
    data() {
        return {
            adding : false,
            title : '',
            createdBy : '',
            location : '',
            time : '',
            description : ''
        }
    },
    methods : {
        toggle(){
            this.adding = !this.adding;
        },
        addLunch(){
            var url = 'http://localhost:8080/lunch'
            var newLunch = {
                title : this.title,
                createdBy : this.createdBy,
                location : this.location,
                time : this.time,
                description : this.description
            };
            axios.post(url, newLunch)
            .then((lunch) => {
                console.log(lunch.data.title + ' was successfully added!');
                this.clearField();
                this.refreshList();
                this.toggle();
            })
            .catch((err) => console.log(err))
        },
        clearField(){
            this.title = ''
            this.createdBy = ''
            this.location = ''
            this.time = ''
            this.description = ''
        },
        refreshList(){
            console.log('please emit:(')
            bus.$emit('refreshList');
        }
    }
}
</script>

<style>
.forminvisible {
    visibility: hidden
}
</style>
