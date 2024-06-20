<template>
    <div class="task">
        <div class="row justify-content-center">
            <table class="table table-striped col-8">
                <task-table-head></task-table-head>
                <task-table-body
                v-for="task in taskList"
                v-bind:key="task.id"
                v-bind:taskProps="task"
                @editStart="onEditStart"
                @editEnd="onEditEnd"
                @delete="onDeleteTask"
                ></task-table-body>
            </table>
     </div>
    </div>
</template>

<script>
import TaskTableBody from './TaskTableBody.vue'
import TaskTableHead from './TaskTableHead.vue'

export default {
    name:'task-item',
    components:{
        TaskTableHead,
        TaskTableBody,
    },
    props:{
        taskListProps:Object,
    },
    data(){
        return{
            taskList:this.taskListProps,
        }
    },
    methods:{
        onDeleteTask:function(task){
            let taskList = this.taskList;
            let index = taskList.indexOf(task);
            if(index != null){
                taskList.splice(index,1);
            }
        },
        onEditStart:function(task){
            task.editing = 'true';
        },
        onEditEnd: function(){
            let taskList = this.taskList;
            //forじゃないとediting=falseにしても効かない
            for (let task of taskList){
                task.editing = false;
            }
        },
    }
}
</script>
