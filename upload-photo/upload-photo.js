import config from '../../config/config'
const regeneratorRuntime = require('../../libs/runtime.js')
import {
	getOssPolicyAndSignFromNet,
	getTimestamp,
	getRandomString,
	getSuffix,
} from '../../utils/util.js'

const timestamp = getTimestamp()

Component({
	options: {
		addGlobalClass: true,
		multipleSlots: true,
	},
	observers: {
		'defaultImages': function (defaultImages) {
			if (this.data.showMod) {
				this.setData({
					images: this.data.images.concat(defaultImages),
				})
			}
		},
	},
  properties: {
		className: String,
		plain: Boolean,
    title: String,
    titleTip: String,
    required: Boolean,
    contentTip: String,
    defaultImages: Array,
    showMod: Boolean,
		accept: {
		  type:	Array, // 接受上传的文件类型后缀名
			value: ['jpg', 'jpeg'],
		},
    sizeType: {
      type: Array,
      value: ['original', 'compressed'],
    },
    sourceType: {
      type: Array,
      value: ['album', 'camera'],
    },
    count: {
      type: Number,
      value: 9,
    },
    max: {
      type: Number,
      value: 10,
    },
  },
  data: {
    images:[],
  },
  attached: function(){ 
    // 可以在这里发起网络请求获取插件的数据
    this.setData({
      images: this.data.images.concat(this.data.defaultImages),
    })
		
		getOssPolicyAndSignFromNet()
  },
  methods: {
    _chooseImg() {
			const {
				images,
				sizeType,
				sourceType,
				count,
			} = this.data

      wx.chooseImage({
        sizeType,
        sourceType,
        count,
        success: res => {

					wx.showToast({
						title: '图片上传中，请稍候',
						icon: 'none',
						duration: 10000000
					})

					let promiseList = null
					const tempFilePaths = res.tempFilePaths
					const oss = wx.getStorageSync('oss')

					console.log(oss)

					const upload = filePath => {
						return new Promise(resolve => {
							const filename = `${getRandomString(18)}${getSuffix(filePath)}`
							
							const formData = {
								key: `${timestamp}/${filename}`,
								policy: oss.policy,
								AWSAccessKeyId: oss.accessId,
								signature: oss.signature,
							}
							
							console.log('formData', formData)

							wx.uploadFile({
								url: oss.domain,
								filePath: filePath,
								name: 'file',
								formData,
								success: res => {
									resolve(`${oss.domain}/${timestamp}/${filename}`)
								}
							})
						})
					}

					if (images.length + tempFilePaths.length > 10) {
						promiseList = tempFilePaths.slice(0, 10 - images.length).map(v => upload(v))
					} else {
						promiseList = tempFilePaths.map(v => upload(v))
					}

					Promise.all(promiseList).then((res) => {
						console.log('images', images)
						console.log('promise', res)
					  const	midUrls = [...images, ...res]
						if (midUrls.length > this.data.max) {
							midUrls.splice(this.data.max - 1, midUrls.length - 10)
						}
						console.log('midUrls', midUrls)
						this.setData({
							images: midUrls,
						}, this.triggerEvent('change', { images: midUrls }))
						wx.hideToast()
					}).catch((error) => {
						wx.showToast({
							title: error.message || error,
							icon: 'none'
						})
						console.log(error)
					}) 
        },
      })
    },
    _del(e) {
			if (this.data.showMod) return
      const {
        index,
      } = e.currentTarget.dataset

      wx.showModal({
        content: '确定要删除这张图片吗？',
				confirmColor: '#006bff',
        success: res => {
          if (res.confirm) {
						const {
							images,
						 } = this.data
						images.splice(index, 1)
            this.setData({
              images,
            })
            this.triggerEvent('change', {images})
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
    },
    _preview(e) {
      const {
        url,
      } = e.currentTarget.dataset
      wx.previewImage({
        urls: [url],
      })
    }
  },
})