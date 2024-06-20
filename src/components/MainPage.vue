<template>
    <div class="todo-container">
        <h1>ToDoリスト</h1>
        <TaskAdd
        v-bind:errorMessageProps="errorMessage"
        @taskAdd="onTaskAdd"
        />

        <div class="row justify-content-center">
            <div class="col-8" style="text-align: right;">
                <button type="button" class="btn btn-info transparent mb-3" @click="onClickButtonSave">
                <i class="fas fa-save"></i> 保存
                </button>
            </div>
        </div>
        
        <div class="task-list">
           <TaskItem
           v-bind:taskListProps="taskList"
           />
        </div>
        <!-- <pre>
            {{ taskList }}
        </pre> -->
    </div>
  </template>
  
  <script>
  import TaskAdd from '../parts/TaskAdd.vue'
  import TaskItem from '../parts/TaskItem';

  export default {
    name: 'HelloWorld',
    components: {
        TaskItem,
        TaskAdd,
    },
    props: {
      msg: String
    },
    data:function(){
        return {
            taskList:[],
            errorMessage:'',
        }
    },
    created: function() {
        const localData = localStorage.getItem('taskItem');
        if (localData != null)  {
            this.taskList = JSON.parse(localData);
        }
    },
    methods: {
        onTaskAdd: function(taskName){
            for(let taskItem of this.taskList ){
                if(taskItem.name == taskName){
                    this.errorMessage = 'すでに登録されたタスクです。'
                }
            }

            let id = this.taskList.length;

            if(id == 0){
                id = 1;
            }else{
                id++;
            }

            let task = {
                id:id,
                editing:false,
                name:taskName,
            }

            this.taskList.push(task);
        },
        onClickButtonSave : function() {
            localStorage.setItem('taskItem', JSON.stringify(this.taskList));
            this.$toasted.show('タスクを保存しました', {
                position: 'top-left',
                duration: 1000,
                type: 'success'
            });
        },
    }

}
  </script>
  
  <!-- Add "scoped" attribute to limit CSS to this component only -->
  <style scoped>
  h3 {
    margin: 40px 0 0;
  }
  ul {
    list-style-type: none;
    padding: 0;
  }
  li {
    display: inline-block;
    margin: 0 10px;
  }
  a {
    color: #42b983;
  }

.todo-container{
    width: 80%;
    margin: auto;
  }
  </style>
  