<template>
    <div>
        
    </div>
</template>

<script>
import axios from 'axios'
import bus from '../bus.js'

export default {
    data() {
        lunches : []
    },
    created : () => {
        this.listenForEvents();
        this.displayLunches();
    },
    methods : {
        displayLunches(){
            var url = 'http://localhost:8080/lunch'
            axios.get(url)
            .then((res) => {
                this.lunches = res.data;
            })
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
            .then((lunch) => {
                console.log(lunch);
                this.displayLunches();
            })
            .catch((err) => console.log(err))
        },
        listenForEvents(){
            bus.$on('refreshList', () => {
                this.displayLunches();
            })
        }
    }
}
</script>
