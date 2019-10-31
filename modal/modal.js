Component({
	options: {
		addGlobalClass: true,
		multipleSlots: true,
	},
  behaviors: [],
  properties: {
		showModal: Boolean,
		title: String,
		titleColor: {
			type: String,
			value: '#000',
		},
		content: String,
		contentColor: {
			type: String,
			value: '#666',
		},
		showCancel: {
			type:	Boolean,
			value: true,
		},
		cancelText: {
			type: String,
			value: '取消'
		},
		cancelColor: {
			type: String,
			value: '#000',
		},
		confirmText: {
			type: String,
			value: '确定'
		},
		confirmColor: {
			type: String,
			value: '#006bff',
		},
		footer: {
			type: String,
			value: 'default', // none/ custom / default
		},
		confirm: {
			type: String,
			value: 'default', // custom / default
		},
		maskClosable: {
			type: Boolean,
			value: true,
		},
		customModal: Boolean,
	},
  data: {}, 
  attached() {},
  ready() {},
  moved() {},
  detached() {},
  methods: {
		_catchMask() {
			if (this.data.maskClosable) {
				this.setData({
					showModal: false
				})
			}
		},
		_catchContainer() {},
		_bindButton(e) {
			const {
				type,
			} = e.currentTarget.dataset
			
			this.setData({
				showModal: false,
			})

			if (type === 'confirm') {
				this.triggerEvent('confirm')
			} else if (type === 'cancel') {
				this.triggerEvent('cancel')
			}
		},
	},
	
})
