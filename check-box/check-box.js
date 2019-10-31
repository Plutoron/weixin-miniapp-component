Component({
	options: {
		addGlobalClass: true,
		multipleSlots: true,
	},
	behaviors: [],
	properties: {
		className: String,
		plain: Boolean,
		layout: {
			type: String,
			value: 'normal', // flex/normal
		},
		perLineNum: {
			type: Number,
			value: 3
		},
		value: Array,
		dataSource: {
			type: Array,
			value: [],
		},  //  [{label , value}]
		alias: {
			type: String,
			value: 'label',
		},
	},
	data: {
		items: [],
	},
	observers: {
		'dataSource': function (dataSource) {
			dataSource.forEach(v => {
				if (this.data.value.indexOf(v.value) > -1) {
					v.select = true
				} else {
					v.select = false
				}
				return v
			})

			this.setData({
				items: dataSource,
			})
		},
		'value': function (value) {
			const items = this.data.items

			value.forEach(v => {
				items.forEach(item => {
					if (item.value === v.value) {
						item.select = true
					}
					return item
				})
			})

			this.setData({
				items,
			})
		},
	},
	attached() {
	  const dataSource = this.data.dataSource
    
		if (this.data.value.length > 0) {
		  dataSource.forEach(v => {
				if (this.data.value.indexOf(v.value) > -1) {
					v.select = true
				} else {
					v.select = false
				}
				return v
			})
		}

		this.setData({
			items: dataSource,
		})
	},
	ready() { },
	moved() { },
	detached() { },
	methods: {
		_bindCheckboxItem(e) {
			const {
				index,
			} = e.currentTarget.dataset
		
	    const {
				items,
			} = this.data

			items[index] = {
				...items[index],
				select: !items[index].select,
			}

			this.setData({
				items,
			})

			let value = items.filter(v => v.select)

		  value = value.map(v => {
				delete v.select
				return {...v}
			})

			this.triggerEvent('change', {
				value,
			})
		},
	}
})
