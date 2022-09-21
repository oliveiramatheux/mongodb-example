import mongoose, { Schema } from 'mongoose'
import bcrypt from 'bcrypt'
import randomstring from 'randomstring'

const UserSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    require: true,
    unique: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true,
    minLength: [6, 'Password should be at least six characters'],
    select: false
  },
  age: {
    type: String
  },
  secretToken: {
    type: String
  },
  resetToken: {
    type: String
  },
  active: {
    type: Boolean,
    default: false
  },
  admin: {
    type: Boolean,
    default: false
  }
},
{
  timestamps: true,
  versionKey: false
})

UserSchema.pre('save', userPreSaveHook)

export async function userPreSaveHook (next) {
  this.password = await bcrypt.hash(this.password, 10)
  this.secretToken = randomstring.generate({
    length: 8,
    charset: 'numeric'
  })
  this.resetToken = randomstring.generate({
    length: 8,
    charset: 'numeric'
  })
  next()
}

UserSchema.index({ email: 1 })

const User = mongoose.model('usertests', UserSchema)

export { User }
