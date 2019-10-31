Component({
	options: {
		addGlobalClass: true,
		multipleSlots: true,
	},
  behaviors: [],
	observers: {},
  properties: {
		content: {
			type: String,
			value: 'testtest',
		},
		hideClose: Boolean,
	},
  data: {
		show: true,
	}, 
  attached() {},
  ready() {},
  moved() {},
  detached() {},
  methods: {
		_bindContent() {
			this.setData({
				show: false
			})
			this.triggerEvent("content")
		},
		_bindClose() {
			this.setData({
				show: false
			})
			this.triggerEvent("close")
		},
	}
})
