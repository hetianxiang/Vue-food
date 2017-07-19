<template>
    <div class="header">
        {{title}}
    </div>
</template>
<script>
    export default {
        props:["title"],
        data(){
            return {}
        },
        computed: {},
        components: {},
        methods: {}
    }
</script>
<style scoped>
  .header{
    background: #24f1f1;
    height: 50px;
    text-align: center;
    line-height: 50px;
    color: #1e2766;
    font-size: 20px;
  }
</style>
