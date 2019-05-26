<template>
    <div>
        <h2 v-if="lunches.length>0">List of Posted Lunches<i class="em em-yum"></i></h2>
        <h2 v-else>No Posted Lunches<i class="em em-cry"></i></h2>
        <li class="list-group-item" v-for="lunch in lunches">
            <h3>{{lunch.title}} @ {{lunch.location}}</h3> 
            <b>Created by:</b> {{lunch.createdBy}} <br/>
            <b>Time:</b> {{lunch.time}} <br/>
            <b>Description:</b> {{lunch.description}} <br/>
            <b>Guests:</b>
            <ul>
                |
                <li v-for="guest in lunch.guests">| <i>{{guest}}</i> |</li>
                |
            </ul>
            <div>
                <input type=text v-model="lunch.guest" @keyup.enter="addGuest(lunch, lunch.guest)" placeholder='Your Name'>
                <button @click="addGuest(lunch, lunch.guest)">RSVP!</button>
            </div>
        </li>
        <link href="https://afeld.github.io/emoji-css/emoji.css" rel="stylesheet">
    </div>
</template>

<script>
import axios from 'axios'
import bus from '../bus.js'

export default {
    data() {
        return {
            lunches : []
        }
    },
    mounted() {
        bus.$on('refreshList', () => {
            console.log('The bus works!');
            this.displayLunches();
        });
    },
    created() {
        this.displayLunches();
    },
    methods : {
        displayLunches(){
            var url = process.env.HOST + '/lunch'
            axios.get(url)
            .then((res) => {
                this.lunches = res.data;
                console.log(res.data);
            });
        },
        updateLunchTime(lunch){
            var url = process.env.HOST + 'lunch/' + lunch._id
            axios.post(url, lunch)
            .then((lunch) => {
                console.log(lunch);
            })
            .catch((err) => console.log(err))
        },
        deleteLunch(id){
            var url = process.env.HOST + 'lunch/' + id
            axios.delete(url)
            .then(function(lunch) { 
                console.log(lunch);
                this.displayLunches();
            })
            .catch((err) => console.log(err))
        },
        listenForEvents(){
            bus.$on('refreshList', () => {
                console.log('The bus works!');
                this.displayLunches()
        })
        },
        addGuest(lunch, guest) {
            if (guest == '') return;
            var url = process.env.HOST + 'lunch/' + lunch._id
            var newGuests = lunch.guests.push(guest)
            lunch.guest = ''
            axios.put(url, lunch)
            .then(function(lunch) {
                console.log('Updated lunch to ' + lunch);
                this.displayLunches()
            })
            .catch((err) => console.log(err))
        }
    }
}
</script>

<style>
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
    ul {
        display: flex;
    }
    li {
        display: inline;
    }
</style>
