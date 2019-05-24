<template>
    <div>
        <h2>List of Posted Lunches<i class="em em-yum"></i></h2>
        <li class="list-group-item" v-for="lunch in lunches">
            <h3>{{lunch.title}} @ {{lunch.location}}</h3> 
            <b>Created by:</b> {{lunch.createdBy}} <br/>
            <b>Time:</b> {{lunch.time}} <br/>
            <b>Description:</b> {{lunch.description}} <br/>
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
            var url = 'http://localhost:8080/lunch'
            axios.get(url)
            .then((res) => {
                this.lunches = res.data;
                console.log(res.data);
            });
        },
        updateLunchTime(lunch){
            var url = 'http://localhost:8080/lunch/' + lunch._id
            axios.post(url, lunch)
            .then((lunch) => {
                console.log(lunch);
            })
            .catch((err) => console.log(err))
        },
        deleteLunch(id){
            var url = 'http://localhost:8080/lunch/' + id
            axios.delete(url)
            .then(function(lunch){ 
                console.log(lunch);
                this.displayLunches();
            })
            .catch((err) => console.log(err))
        },
        listenForEvents(){
            bus.$on('refreshList', () => {
                console.log('The bus works!');
                this.displayLunches()
        });
        }
    }
}
</script>
