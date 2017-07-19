<template>
    <div>
      <m-header title="添加美食"></m-header>
      <div class="add">
        <div class="group">
          <label for="foodName">美食名称</label>
          <input type="text" id="foodName" placeholder="请输入美食" v-model="food.foodName">
        </div>
        <div class="group">
          <label for="foodName">美食地址</label>
          <input type="text" id="foodCover" placeholder="请输入美食封面" v-model="food.foodCover">
        </div>
        <div class="group">
          <label for="content">美食详情</label>
          <input type="text" id="content" placeholder="请输入美食详情" v-model="food.content">
        </div>
        <div class="group">
          <button @click="add">添加美食</button>
        </div>
      </div>
    </div>
</template>
<script>
    import MHeader from 'components/MHeader';
    import {addFood} from 'api';
    export default {
        data(){
            return {
                food:{
                    foodName:'',
                    foodCover:'',
                    content:''
                }
            }
        },
        computed: {},
        components: {MHeader},
        methods: {
            add(){
              addFood(this.food).then(res=>{
                 //添加成功后的逻辑
                 this.$router.push('/list');
              });
            }
        }
    }
</script>
<style scoped lang="less">
  .add{
    padding: 100px 20px;
    display: flex;
    flex-direction: column;
    .group{
      label{
        font-size: 16px;
        line-height: 25px;
      }
      input{
        border: 1px solid #ccc;
        height: 30px;
      }
      margin-bottom: 15px;
      display: flex;
      flex-direction: column;
      button{
        height: 35px;
        border-radius: 5px;
        background: lawngreen;
      }
    }
  }
</style>
