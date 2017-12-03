<template>
  <section class="home">
    <div class="home__main">
    <MasterSlider :activeCategory="activeCategory" :activeImage="activeImage" :phrase="phrase" :phraseaux="phraseAux"></MasterSlider>
    <History v-if="imgs.length" :images="imgs"></History>
    <Sugestions v-if="sugestions.length" :sugestions="sugestions"></Sugestions>
    </div>
  </section>
</template>

<script>
import CategorySelector from './CategorySelector'
import MasterSlider from './MasterSlider'
import History from './History'
import Sugestions from './Sugestions'
import { mapGetters } from 'vuex'

export default {
  name: 'home',
  computed: mapGetters([
    'activeCategory',
    'imgs',
    'activeImage',
    'sugestions'
  ]),
  data: function () {
    return {
      langs: 'pt-BR',
      recognition: '',
      recognizing: false,
      phrase: '',
      phraseAux: '',
      startTimestamp: '',
      finalTranscript: '',
      ignoreOnEnd: false
    }
  },
  components: {
    CategorySelector: CategorySelector,
    MasterSlider: MasterSlider,
    History: History,
    Sugestions: Sugestions
  },
  created () {
    this.recog()
  },
  methods: {
    linebreak: function (s) {
      let twoLine = /\n\n/g
      let oneLine = /\n/g
      return s.replace(twoLine, '<p></p>').replace(oneLine, '<br>')
    },
    capitalize: function (s) {
      let firstChar = /\S/
      return s.replace(firstChar, function (m) { return m.toUpperCase() })
    },
    recog: function () {
      console.log('recog')
      let self = this
      self.recognition = new window.webkitSpeechRecognition()
      self.recognition.lang = 'pt-BR'
      self.recognition.continuous = true
      self.recognition.interimResults = true

      self.recognition.onstart = function () {
        self.recognizing = true
      }

      self.recognition.onerror = function (event) {
        if (event.error === 'no-speech') {
          console.log('no-speech')
          self.ignoreOnEnd = true
        }
        if (event.error === 'audio-capture') {
          console.log('info_no_microphone')
          self.ignoreOnEnd = true
        }
        if (event.error === 'not-allowed') {
          if (event.timeStamp - self.startTimestamp < 100) {
            console.log('info_blocked')
          } else {
            console.log('info_denied')
          }
          self.ignoreOnEnd = true
        }
      }

      self.recognition.onend = function () {
        self.recognizing = false
        if (self.ignoreOnEnd) {
          return
        }
      }

      self.recognition.onresult = function (event) {
        console.log('onresult', event.results.length)
        let interimTranscript = ''
        let aux = ''
        for (var i = event.resultIndex; i < event.results.length; ++i) {
          if (event.results[i].isFinal) {
            self.finalTranscript += ' ' + event.results[i][0].transcript
            aux += ' ' + event.results[i][0].transcript
            self.sendResult(aux || self.finalTranscript)
          } else {
            interimTranscript += ' ' + event.results[i][0].transcript
            aux += ' ' + event.results[i][0].transcript
          }
        }
        self.finalTranscript = self.capitalize(self.finalTranscript)
        self.phrase = self.linebreak(self.finalTranscript)
        self.phraseAux = self.linebreak(interimTranscript)
      }
    },
    startButton: function (event) {
      if (this.recognizing) {
        this.recognition.stop()
        return
      }
      this.phrase = ''
      this.recognition.start()
      this.ignoreOnEnd = false
      this.phrase = ''
      this.phraseAux = ''
      this.startTimestamp = event.timeStamp
    },

    sendResult: function (phrase) {
      console.log('sendResult')
      let self = this
      let callback = function (img) {
        console.log('teste')
      }
      this.$store.dispatch('getImages', { words: phrase, activeCategory: self.activeCategory, cb: callback })
    }
  }
}
</script>
<style lang="sass">
  @import "./src/style/_home.scss"
</style>