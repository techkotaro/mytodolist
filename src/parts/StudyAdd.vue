<template>
        <div class="study-add">
                <div class="row justify-content-center">
                <div class="mb-3 col-6">
                    <input type="text" name="study-name" class="form-control" id="formGroupExampleInput" placeholder="学習内容を入力" v-model="studyName">
                    <div class="error-message" v-if="!isStudyNameValid">
                        {{ errorMessage }}
                    </div>
                    <div class="error-message" v-if="errorMessageProps">
                        {{ errorMessageProps }}
                    </div>
                </div>
            </div>
            <b-button
            size="lg"
            variant="outline-primary"
            class="mb-4"
            @click="OnClickStudyAdd(studyName)"
            :disabled="!isStudyNameValid">
            学習内容追加
            </b-button>
        </div>
</template>

<script>
export default {
    name:'study-add',
    props:{
        errorMessageProps:String,
    },
    data(){
        return{
            studyName:'',
            isStudyNameValid:true,
            errorMessage: '',
        }
    },
    methods:{
        OnClickStudyAdd: function(studyName){
            if(this.isStudyNameValid){
                this.$emit('studyAdd',studyName)
            }else{
                this.errorMessage = 'タスク名を入力してください'
            }
        }
    },
    watch:{
        studyName: {
            handler:function(newVal){
                if(newVal.trim() == ''){
                    this.isStudyNameValid = false;
                }else{
                    this.isStudyNameValid = true;
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
