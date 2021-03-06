import Vue from 'vue'
import App from './App'
import store from './store/index.js'
import toast from './utils/toast.js'
import voice from './utils/voiceTips.js'
import uView from 'uview-ui'

Vue.config.productionTip = false

Vue.prototype.$store = store
Vue.prototype.$toast = toast
Vue.prototype.$voice = voice
Vue.use(uView)

String.prototype.endWith = function(endStr) {
	var d = this.length - endStr.length;
	return (d >= 0 && this.lastIndexOf(endStr) == d)
}

String.prototype.gblen = function() {
	var len = 0;
	for (var i = 0; i < this.length; i++) {
		if (this.charCodeAt(i) > 127 || this.charCodeAt(i) == 94) {
			len += 2;
		} else {
			len++;
		}
	} 
	return len;
}

App.mpType = 'app'

const app = new Vue({
	...App
})
app.$mount()
