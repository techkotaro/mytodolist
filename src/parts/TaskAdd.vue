<template>
        <div class="task-add">
                <div class="row justify-content-center">
                <div class="mb-3 col-6">
                    <input type="text" name="task-name" class="form-control" id="formGroupExampleInput" placeholder="Example input placeholder" v-model="taskName">
                    <div class="error-message" v-if="!isTaskNameValid">
                        {{ errorMessage }}
                    </div>
                    <!-- <div class="error-message" v-if="errorMessageProps">
                        {{ errorMessageProps }}
                    </div> -->
                </div>
            </div>
            <b-button
            size="lg"
            variant="outline-primary"
            class="mb-4"
            @click="OnClickTaskAdd(taskName)"
            :disabled="!isTaskNameValid">
            タスク追加
            </b-button>
        </div>
</template>

<script>
export default {
    name:'task-add',
    props:{
        errorMessageProps:String,
    },
    data(){
        return{
            taskName:'',
            isTaskNameValid:true,
            errorMessage: '',
        }
    },
    methods:{
        OnClickTaskAdd: function(taskName){
            if(this.isTaskNameValid){
                this.$emit('taskAdd',taskName)
            }else{
                this.errorMessage = 'タスク名を入力してください'
            }
        }
    },
    watch:{
        taskName: {
            handler:function(newVal){
                if(newVal.trim() == ''){
                    this.isTaskNameValid = false;
                }else{
                    this.isTaskNameValid = true;
                }
            },
            deep : true,
            immediate : true
        }
    }
}
</script>

<style scoped>
.error-message{
    color: red;
    text-align: left;
}
</style>
