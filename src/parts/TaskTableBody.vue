<template>
    <tbody>
        <tr>
            <td class="col-1">{{ task.id }}</td>
            <td class="col-5">
                <template v-if="task.editing">
                    <input type="text" class="form-control transparent" id="formGroupExampleInput" v-model="task.name"
                        @keypress="OnClickEditEnd(task)" placeholder="task.name">
                </template>
                <template v-else>
                    <p>{{ task.name }}</p>
                </template>
            </td>
            <td class="col-1">
                <button type="button" class="btn btn-success" @click="OnClickEditStart(task)">編集</button>
            </td>
            <td class="col-1">
                <button type="button" class="btn btn-danger" @click="OnClickDelete(task)">削除</button>
            </td>
        </tr>
    </tbody>
</template>

<script>
export default {
    name:'task-table-body',
    props:{
        taskProps:Object,
    },
    data(){
        return{
            task:this.taskProps,
        }
    },
    methods:{
        OnClickEditStart: function(task){
            this.$emit('editStart',task)
        },
        OnClickEditEnd: function(task){
            console.log("Enterキーが押されました。タスク名：" + task.name);
            this.$emit('editEnd')
        },
        OnClickDelete:function(task){
            this.$emit('delete',task)
        },
    }
}
</script>