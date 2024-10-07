<template>
    <div class="study-content">
        <table>
            <tbody>
                <tr>
                    <td>
                        <label for="study-time">{{ study.name }}</label>
                    </td>
                    <td>
                        <input placeholder="0" type="number" name="study-hour" class="narrow-input" min="0" max="24"
                            v-model="studyHour">
                        :
                        <input placeholder="0" type="number" name="study-minutes" class="narrow-input" min="0" max="59"
                            v-model="studyMinutes">
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>

export default {
    name: 'study-content',
    components: {
    },
    props: {
        studyProps:[],
    },
    data() {
        return {
            study:this.studyProps,
        }
    },
    methods: {
       
    }
}
</script>
