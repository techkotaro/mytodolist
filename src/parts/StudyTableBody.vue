<template>
    <tbody>
        <tr>
            <td class="col-1">{{ study.id }}</td>
            <td class="col-5">
                <template v-if="study.editing">
                    <input type="text" class="form-control transparent" id="formGroupExampleInput" v-model="study.name"
                        @keypress="OnClickEditEnd(study)" placeholder="study.name">
                </template>
                <template v-else>
                    <p>{{ study.name }}</p>
                </template>
            </td>
            <td class="col-1">
                <button type="button" class="btn btn-success" @click="OnClickEditStart(study)">編集</button>
            </td>
            <td class="col-1">
                <button type="button" class="btn btn-danger" @click="OnClickDelete(study)">削除</button>
            </td>
            <!-- <td class="col-1">
                <select id="taskCategory" v-model="selectedCategories" multiple>
                    <option value="frontend">フロントエンド</option>
                    <option value="backend">バックエンド</option>
                    <option value="system">システム開発</option>
                    <option value="study">座学</option>
                </select>
                <p>選択されたカテゴリ: {{ selectedCategories.join(', ') }}</p>
            </td> -->
        </tr>
    </tbody>
</template>

<script>
export default {
    name:'study-table-body',
    props:{
        studyProps:Object,
    },
    data(){
        return{
            study:this.studyProps,
            selectedCategories: [],
        }
    },
    methods:{
        OnClickEditStart: function(study){
            this.$emit('editStart',study)
        },
        OnClickEditEnd: function(study){
            console.log("Enterキーが押されました。タスク名：" + study.name);
            this.$emit('editEnd')
        },
        OnClickDelete:function(study){
            this.$emit('delete',study)
        },
    }
}
</script>