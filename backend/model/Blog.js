const mongoose = require('mongoose')

const blogSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true
    },
    content: {
      type: String,
      required: true
    },
    user_name: {
      type: String,
      required:true,
    },
    like: {
      type: Number,
      required: true,
      default: 0
    },
    watch: {
      type: Number,
      required: true,
      default: 0
    },
    image:{
      type:String,
      default:''
    },
    create_at: {
      type: Date,
      default: Date.now()
    }
  }
)

module.exports = mongoose.model('Blogs', blogSchema)
