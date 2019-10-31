Component({
	options: {
		addGlobalClass: true,
		multipleSlots: true,
	},
  behaviors: [],
  properties: {
		title: String,
		content: String,
		contentList: Array,
		hideClose: Boolean,
    buttonText: {
			type: String,
			value: '确定',
		},
		height: Number,
	},
  data: {
		height: 0,
		show: true,
	}, 
  attached() {
		const {
			showNotice,
			height,
		} = this.data
		
		wx.getSystemInfo({
			success: res => {
				this.setData({
					height: height > 0 ? res.windowHeight * height : res.windowHeight * .75,
				})
			}
		})
	},
  ready() {
		
	},
  moved() {},
  detached() {},
  methods: {
		_bindClose() {
			this.setData({
				show: false
			})
			this.triggerEvent("close")
		},
		_bindConfirm() {
			this.setData({
				show: false
			})
			this.triggerEvent("confirm")
		},
	}
})
