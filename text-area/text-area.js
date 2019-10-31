Component({
  behaviors: [],
  properties: {
		className: String,
		plain: Boolean,
		content: String,
		placeholder: String,
		showMod: Boolean,
		maxlength: {
			type: Number,
			value: 140,
		}
	},
  data: {}, 
  attached() {},
  ready() {},
  moved() {},
  detached() {},
  methods: {
		_bindInput(e) {
			const {
				value,
			} = e.detail
			this.triggerEvent("input", {
				value,
			})
		}
	}
})
