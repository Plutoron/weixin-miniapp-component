Component({
	options: {
		addGlobalClass: true,
		multipleSlots: true,
	},
  properties: {
		content: String,
	},
	lifetimes: {
		detached: function () {
			clearTimeout(this.timeout)
		},
	},
  data: {
    show: true
	}, 
  ready() {
		this.timeout = setTimeout(() => {
			this.setData({
				show: false,
			})
			this.triggerEvent('hide')
			clearTimeout(this.timeout)
		}, 1500)
	},
})
