Component({
	options: {
		addGlobalClass: true,
		multipleSlots: true,
	},
  behaviors: [],
  properties: {
		className: String,
		type: {
			type: String,
			value: 'success', // success, success_no_circle, info, warn, waiting, cancel, download, search, clear
		},
		title: String,
		titleList: Array,
		subTitle: String,
		subTitleList: Array,
		mainButton: Object,
		subButton: Object,
	},
  data: {}, 
  attached() {},
  ready() {},
  moved() {},
  detached() {},
  methods: {
		_bindMainButton(){
			this.triggerEvent("main")
		},
		_bindSubButton() {
			this.triggerEvent("sub")
		},
	}
})
