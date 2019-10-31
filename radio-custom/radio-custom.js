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
			value: 2
		},
		value: String,
		dataSource: Array,  //  [{label , value}]
		alias: {
			type: String,
			value: 'label'
		},
	},
  data: {
		selectedValue: null,
	}, 
  attached() {
		this.setData({
			selectedValue: this.data.value || '',
		})
	},
  ready() {},
  moved() {},
  detached() {},
  methods: {
		_bindRadioItem(e) {
			const {
				value,
				index
			} = e.currentTarget.dataset
			this.setData({
				selectedValue: value,
			})
			this.triggerEvent('change', {
				value,
				item: this.data.dataSource[index],
			})
		},
	}
})
