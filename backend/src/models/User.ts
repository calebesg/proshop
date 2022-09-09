import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'

interface UserProps {
  name: string
  email: string
  password: string
  isAdmin: boolean
  matchPassword: (password: string) => boolean
}

const userSchema = new mongoose.Schema<UserProps>(
  {
    name: {
      type: String,
      require: true,
    },

    email: {
      type: String,
      require: true,
      unique: true,
    },

    password: {
      type: String,
      require: true,
    },

    isAdmin: {
      type: Boolean,
      require: true,
      default: false,
    },
  },
  { timestamps: true }
)

userSchema.methods.matchPassword = async function (enteredPassword: string) {
  return await bcrypt.compare(enteredPassword, this.password)
}

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next()
  }

  const salt = await bcrypt.genSalt(10)
  this.password = await bcrypt.hash(this.password, salt)
})

const User = mongoose.model('User', userSchema)
export default User
