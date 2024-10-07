<template>
  <div class="about">
    <h1>これまでの学習実績</h1>
    <div class="row attendance justify-content-center">
      <button type="button" class="btn btn-info transparent mb-3 start-btn" @click.prevent="onClickButtonStart">
        開始
      </button>
      <button type="button" class="btn btn-info transparent mb-3 end-btn" @click="onClickButtonEnd">
        終了
      </button>
    </div>
    <div class="forget">
      <a href="#" class="forget-link" @click="onClickForgetBtn">打刻打ち忘れ/手動入力</a>
      <div class="forget-modal" v-if="isShowModal">
        <div class="forget-modal-content p-6 bg-white rounded shadow">
          <button @click="onClickCloseModal" class="close-button btn">
            <i class="fa-solid fa-xmark"></i> 閉じる
          </button>
          <div class="study-time-wrapper">
            <label for="study-time">勉強時間：</label>
            <input placeholder="0" type="number" name="study-hour" class="narrow-input" min="0" max="24"
              v-model="studyHour">
            時間
            <input placeholder="0" type="number" name="study-minutes" class="narrow-input" min="0" max="59"
              v-model="studyMinutes">
            分
          </div>
          <p class="validationMessage text-danger" v-if="validationMessage">{{ validationMessage }}</p>
          <button @click="onClickButtonSave" class="save-btn btn btn-info transparent mb-3" :disabled="isInvalid">
            保存
          </button>
        </div>
      </div>
    </div>
    <div>
      <p>2024/9/28~現在までの総学習時間 : {{ formatedTime }}</p>
      <p>本日の学習時間：{{ }}</p>
    </div>
    <study-add v-bind:errorMessageProps="errorMessage" @studyAdd="onStudyAdd" />
    <div class="row">
      <div class="col-6 ml-auto">
        <button type="button" class="btn btn-warning transparent mb-3 mr-3" @click.prevent="onClickButtonStudyContent">
          <i class="fa-solid fa-pen mr-1"></i>学習内容を記録
        </button>
        <button type="button" class="btn btn-info transparent mb-3" @click="onClickButtonStudySave">
          <i class="fas fa-save"></i> 保存
        </button>
      </div>
      <div class="forget-modal" v-if="isShowStudyModal">
        <div class="forget-modal-content p-6 bg-white rounded shadow">
          <button @click="onClickCloseStudyModal" class="close-button btn">
            <i class="fa-solid fa-xmark"></i> 閉じる
          </button>
          <div class="study-content-wrapper">
            <p>本日({{ formattedCurrentDate }})の学習時間：</p>
            <study-content v-for="study in studyList" :key="study.id" :studyProps="study">
            </study-content>
          </div>
          <p class="validationMessage text-danger" v-if="validationMessage">{{ validationMessage }}</p>
          <button class="save-btn btn btn-info transparent mb-3" :disabled="isInvalid">
            保存
          </button>
        </div>
      </div>
    </div>
    <study-item :studyListProps="studyList"></study-item>
  </div>
</template>

<script>
import $ from 'jquery';
import StudyItem from '@/parts/StudyItem.vue';
import StudyAdd from '@/parts/StudyAdd.vue';
import StudyContent from '@/parts/StudyContent.vue';

export default {
  name: 'StudyComponent',
  components: {
    StudyItem,
    StudyAdd,
    StudyContent,
  },
  props: {

  },
  data: function () {
    return {
      startDateObj: {},
      endDateObj: {},
      totalSec: 6.5 * 3600,
      formatedTime: '',
      isShowModal: false,
      isShowStudyModal: false,
      studyHour: null,
      studyMinutes: null,
      validationMessage: '',
      isInvalid: true,
      errorMessage: '',
      studyList: [],
    }
  },
  computed: {
    formattedCurrentDate() {
      const date = new Date();
      const year = date.getFullYear()
      const month = date.getMonth() + 1; // 月は0から始まるので+1
      const day = date.getDate();
      return `${year}/${month}/${day}`;
    },
  },
  created: function () {
    const localData = localStorage.getItem('studyItem');
    if (localData != null) {
      this.studyList = JSON.parse(localData);
    }
  },
  mounted() {
    this.totalSec = localStorage.getItem('totalSec');

    this.formatTotalTime(this.totalSec)

    const startBtn = $('.start-btn');
    const endBtn = $('.end-btn');
    const isDisabled = localStorage.getItem('startBtnDisabled');

    if (isDisabled == 'true') {
      startBtn.prop('disabled', true);
    } else {
      endBtn.prop('disabled', true)
    }

    // localStorage.removeItem('totalSec')
  },
  methods: {
    onClickButtonStart: function () {
      this.startDateObj = new Date();

      const startBtn = $('.start-btn');
      startBtn.prop('disabled', true);


      const endBtn = $('.end-btn');
      endBtn.prop('disabled', false);

      localStorage.setItem('startBtnDisabled', 'true');
      localStorage.setItem('startDateObj', this.startDateObj);
    },
    onClickButtonEnd: function () {
      this.endDateObj = new Date();

      const endBtn = $('.end-btn');
      endBtn.prop('disabled', true);

      const startBtn = $('.start-btn');
      startBtn.prop('disabled', false);
      localStorage.setItem('startBtnDisabled', 'false');

      if (this.startDateObj) {
        //総学習時間を更新
        this.updateTotalSec();
      }
      this.formatTotalTime(this.totalSec)
    },
    onClickButtonStudyContent(event){
      this.isShowStudyModal = true;
      event.target.blur();
      console.log('保存ボタンが押されました');
    },
    onClickCloseStudyModal: function () {
      this.isShowStudyModal = false;
    },
    onClickForgetBtn: function () {    
      //モーダル表示
      this.isShowModal = true;
    },
    onClickCloseModal: function (event) {
      this.isShowModal = false;
      event.target.blur();
    },
    onClickButtonSave: function (event) {
      if (isNaN(this.studyHour) || isNaN(this.studyMinutes)) {
        this.$toasted.show('不正な入力です。時間は0〜24、分は0〜59の範囲で入力してください。', {
          type: 'error',
          duration: 5000 // 表示時間 (ミリ秒)
        });
        return;
      }

      const studySec = this.studyHour * 3600 + this.studyMinutes * 60 
      const currentTotalSec = parseInt(this.totalSec, 10) || 0;

      // 合計秒数を更新
      this.totalSec = currentTotalSec + studySec;

      try {
        // ローカルストレージに保存
        localStorage.setItem('totalSec', this.totalSec);

        this.formatTotalTime(this.totalSec)

        const startBtn = $('.start-btn');
        startBtn.prop('disabled', false);

        // 保存完了メッセージを表示
        this.$toasted.show('保存しました。', {
          type: 'success',
          duration: 2000 // 表示時間 (ミリ秒)
        });
      } catch (error) {
        // エラーメッセージを表示
        this.$toasted.show('保存に失敗しました。ローカルストレージの容量を確認してください。', {
          type: 'error',
          duration: 5000 // 表示時間 (ミリ秒)
        });
        console.error('ローカルストレージの保存中にエラーが発生しました:', error);
      }
      event.target.blur();
    },
    formatTotalTime(totalSec) {
      const hours = Math.floor(totalSec / 3600);  // 時間
      const minutes = Math.floor((totalSec % 3600) / 60);  // 分
      const seconds = totalSec % 60;  // 秒

      this.formatedTime = `${hours}時間${minutes}分${seconds}秒`;  // フォーマットされた文字列を返す
    },
    updateTotalSec() {
      const differenceMs = this.endDateObj - this.startDateObj;
      const differenceSec = Math.floor(differenceMs / 1000);

      const currentTotalSec = parseInt(this.totalSec, 10) || 0;

      // 合計秒数を更新
      this.totalSec = currentTotalSec + differenceSec;

      if (this.startDateObj.getDate() == this.endDateObj.getDate()) {
        this.todaySec += differenceSec 
      }
      // ローカルストレージに保存
      localStorage.setItem('todaySec', differenceSec);
      localStorage.setItem('totalSec', this.totalSec);
    },
    validateForm() {
      if (
        this.studyHour == null ||
        this.studyMinutes == null
      ) {
        this.validationMessage = '数値を入力してください';
      } else if (
        this.studyHour < 0 ||
        this.studyHour > 24 ||
        this.studyMinutes < 0 ||
        this.studyMinutes > 59
      ) {
        this.validationMessage = '時間は0〜24の範囲で、分は0〜59の範囲で入力してください';
      } else {
        this.validationMessage = ''; // バリデーションが成功した場合、メッセージを空に
      }

      if(this.validationMessage) {
        this.isInvalid = true;
      }else {
        this.isInvalid = false;
      }
    },
    onStudyAdd: function (studyName) {
      for (let studyItem of this.studyList) {
        if (studyItem.name == studyName) {
          this.errorMessage = 'すでに登録されたタスクです。'
        }
      }

      let id = this.studyList.length;

      if (id == 0) {
        id = 1;
      } else {
        id++;
      }

      let study = {
        id: id,
        editing: false,
        name: studyName,
      }

      this.studyList.push(study);
    },
    onClickButtonStudySave: function () {
      localStorage.setItem('studyItem', JSON.stringify(this.studyList));
      this.$toasted.show('タスクを保存しました', {
        position: 'top-left',
        duration: 1000,
        type: 'success'
      });
    },
  },
  watch: {
    studyHour() {
      this.validateForm()
    },
    studyMinutes() {
      this.validateForm()
    }
  }
}

</script>


<style scoped>
.attendance {
  /* text-align: left; */
}

.narrow-input {
  width: 60px;
  /* 幅を狭める */
  padding: 5px;
  /* 余白を調整 */
  margin-right: 5px;
  /* 右側の余白 */
}

.study-time-wrapper {
  margin-bottom: 1rem;
}

.start-btn {
  margin-right: 0.5%;
}

.forget {
  margin-bottom: 2rem;
}

.forget-modal {
  position: fixed;
  z-index: 998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.forget-modal-content {
  background-color: white;
  padding: 6% 5%;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  position: relative;
  z-index: 999;
}

.close-button {
  position: absolute;
  top: 10px;
  right: -2%;
  background-color: transparent;
  cursor: pointer;
  min-width: 150px;
}

.close-button:focus {
  outline: none;
  /* 青いフォーカス枠を非表示にする */
  box-shadow: none;
  /* Bootstrap のフォーカス時の影も非表示にする */
}

.close-button i {
  margin-right: 1%;
}

.forget-link {
  text-decoration: underline;
}

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

.todo-container {
  width: 80%;
  margin: auto;
}
</style>