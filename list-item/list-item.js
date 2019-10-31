Component({
	relations: {
		'../list': {
			type: 'parent', // 关联的目标节点应为父节点
		}
	},
	options: {
		addGlobalClass: true,
		multipleSlots: true,
	},
  behaviors: [],
  properties: {
		className: String,
		plain: Boolean,
		type: {
			type: String,
		  value: 'text', // 'text', 'input', 'picker', 'custom'
		},
		title: String,
		titleColor: String,
		subTitle: String,
		subTitleColor: String,
		array: Boolean,
		paddingType: {
			type: String,
			value: 'indent', // normal / indent
		},
		borderType: {
			type: String,
			value: 'normal', // normal / indent
		},
		last: Boolean,
		// type text 
		// content 对齐
		align: {
			type: String,
			value: 'left', // left / right / center
		},
		wrap: Boolean,
		redDot: Boolean,

		value: String,    
		// input 时
		placeholder: String,
		password: Boolean,
		maxlength: {
			type: Number,
			value: -1,
		},
		inputType: {
			type: String,
			value: 'text', // text / number / idcard /digit
		},
		confirmType: {
			type: String,
			value: 'done', // send / search / next / go / done
		},

		// picker
    mode: {
			type: String,
			value: 'selector', // selector/multiSelector/time/date/region
		},
		range: Array,
		rangeKey: String,
		disabled: Boolean,
		start: String, // YYYY-MM-DD
		end: String,
		fields: {
			type: String,
			value: 'day', // year/month/day
		},
		customItem: String,
	},
  data: {
		pickerValue: null,
		pickerContent: null,
	}, 
  attached() {
		this.setData({
			pickerValue: this.data.value || null,
		})
	},
  ready() {},
  moved() {},
  detached() {},
  methods: {
		_bindinput(e) {
			const {
				value,
			} = e.detail
			this.triggerEvent("input", {
				value,
			})
		},
		_bindconfirm(e) {
			const {
				value,
			} = e.detail
			this.triggerEvent("confirm", {
				value,
			})
		},
		_bindPickerChange(e) {
			const {
				value,
			} = e.detail

			const {
				mode,
				range,
				rangeKey
			} = this.data

			let pickerContent

			if (mode === 'multiSelector') {
				if (rangeKey) {
					pickerContent = `${range[0][value[0]][rangeKey]}${range[1][value[1]][rangeKey]}`
				} else {
					pickerContent = `${range[value[0]]}${range[value[1]]}`
				}
			} else {
				if (rangeKey) {
					pickerContent = `${range[value][rangeKey]}`
				} else {
					pickerContent = value
				}
			}
	
			this.setData({
				pickerValue: value,
				pickerContent: pickerContent,
			})

			this.triggerEvent("change", {
				value,
			})
		}, 
		_bindPickerCancel(e) {
			this.triggerEvent("cancel")
		},
	},
})
