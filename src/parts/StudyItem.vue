<template>
    <div class="study">
        <div class="row justify-content-center">
            <table class="table table-striped col-8">
                <study-table-head></study-table-head>
                <study-table-body v-for="study in studyList" v-bind:key="study.id" v-bind:studyProps="study"
                    @editStart="onEditStart" @editEnd="onEditEnd" @delete="onDeleteStudy"></study-table-body>
            </table>
        </div>
    </div>
</template>

<script>
import StudyTableBody from './StudyTableBody.vue';
import StudyTableHead from './StudyTableHead.vue';

export default {
    name: 'study-item',
    components: {
        StudyTableHead,
        StudyTableBody,
    },
    props: {
        studyListProps: [],
    },
    data() {
        return {
            studyList: this.studyListProps,
        }
    },
    methods: {
        onDeleteStudy: function (study) {
            let studyList = this.studyList;
            let index = studyList.indexOf(study);
            if (index != null) {
                studyList.splice(index, 1);
            }
        },
        onEditStart: function (study) {
            study.editing = 'true';
        },
        onEditEnd: function () {
            let studyList = this.studyList;
            //forじゃないとediting=falseにしても効かない
            for (let study of studyList) {
                study.editing = false;
            }
        },
    }
}
</script>
