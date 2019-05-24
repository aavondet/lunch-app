<template>
    <div>
        <button title="Create a Lunch" @click="toggle()" >Create a Lunch</button>
        <div class="fields" :class="{ forminvisible: !adding }">
            <input type=text v-model="title" placeholder="Title">
            <input type=text v-model="createdBy" placeholder="Your Name">
            <input type=text v-model="location" placeholder="Location">
            <input type=time v-model="time" placeholder="Time">
            <input type=text v-model="description" placeholder="Description">
            <div id="submit">
                <button title="Create a Lunch" @click="addLunch();" >Submit</button>
            </div>
        </div>
        <div class="warning" :class="{ forminvisible: filled }">
            <h2>Please fill every field!</h2>
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
            filled : true,
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
        checkFilled(){
            return this.title != '' &&
                   this.createdBy != '' &&
                   this.location != '' &&
                   this.time != '' &&
                   this.description != '';
        },
        addLunch(){
            if (!this.checkFilled()) {
                this.filled = false;
                return;
            }
            this.filled = true;
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
.fields {
    background-color: rgba(204, 255, 204, 0.3);
    margin: 10px 15px 10px 15px;
}
input {
    margin: 10px 15px 10px 15px;
}
button {
    display: block;
    margin-left: auto;
    margin-right: auto;
    border-radius: 12px;
    background-color: white;
}
button:hover {
    background-color:rgba(204, 255, 204, 0.1);
}
.warning {
    color:  red;
    text-align: center;
}
</style>
