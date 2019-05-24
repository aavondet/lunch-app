<template>
    <div>
        <button title="Create a Lunch" @click="adding=true"></button>
            HIHIIHIH
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
        addLunch(){
            var url = 'http://localhost:8080/add'
            var newLunch = {
                title : this.title,
                createdBy : this.createdBy,
                location : this.location,
                time : this.time,
                description : this.description
            };
            axios.post(url, newLunch)
            .then((lunch) => {
                console.log(lunch.title + ' was successfully added!');
                this.clearField();
                this.refreshList();
                this.adding = false;
            })
            .catch((err) => console.log(err))
        },
        clearField(){
            title = ''
            createdby = ''
            location = ''
            time = ''
            description = ''
        },
        refreshList(){
            bus.$emit('refreshList');
        }
    }
}
</script>
