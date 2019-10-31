Component({
	relations: {
		'../list-item': {
			type: 'child', 
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
	},
  data: {}, 
  attached() {},
  ready() {},
  moved() {},
  detached() {},
  methods: {}
})
