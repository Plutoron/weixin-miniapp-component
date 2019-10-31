Component({
	options: {
		addGlobalClass: true,
		multipleSlots: true,
	},
  behaviors: [],
  properties: {
		showModal: Boolean,
	},
  data: {}, 
  attached() {},
  ready() {},
  moved() {},
  detached() {},
  methods: {
		_bindgetuserinfo(e) {
			const {
				detail,
			} = e
			console.log(detail)
			this.triggerEvent('getuserinfo', {
				...detail,
			})
		},
		_bindcancel() {
			this.triggerEvent('cancel')
		}
	}
})
