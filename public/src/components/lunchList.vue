<template>
    <div>
        <button @click="displayLunches()"></button>
        <li class="list-group-item" v-for="lunch in lunches">{{lunch.title}}</li>
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
