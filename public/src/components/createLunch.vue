<template>
    <div>
        <button title="Create a Lunch" @click="toggle()"><h3 id='create'>Create a Lunch</h3></button>
        <div class="fields" v-if="adding">
            <div class="maininputs">
                Title: <input type=text v-model="title">
                Your Name: <input type=text v-model="createdBy">
                Location: <input type=text v-model="location">
                Time: <input type=time v-model="time">
            </div>
            <div class="desc">
                Description: <input type=text id="descbox" v-model="description">
            </div>
            <div id="submit">
                <button title="Create a Lunch" @click="addLunch();" >Submit</button>
                <button title="Close" @click="toggle();" >Close</button>
            </div>
            <div class="warning" v-if="!filled">
                <h2>Please fill every field!<i class="em em-angry"></i></h2>
            </div>
        </div>
        
        <link href="https://afeld.github.io/emoji-css/emoji.css" rel="stylesheet">
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
            this.filled = true;
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
    border-radius: 12px;
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
.desc {
    display: block;
    margin-left: auto;
    margin-right: auto;
}
#descbox {
    width: 70%;
    height: 75px;
}
.maininputs {
    display: block;
    margin-left: auto;
    margin-right: auto;
}
#create::after {
    content : Now;
    opacity: 0;
    transition: 0.5;
}
#create {
    margin: 20px;
}
button:hover #create::after {
    content : Now;
    opacity: 1;
}
</style>
