import bcrypt from 'bcryptjs'
import mongoose, { Schema } from 'mongoose'

const userSchema = new Schema({
  name: { type: String, require: true},
  title: { type: String, require: true},
  role: { type: String, require: true},
  email: { type: String, require: true, unique: true},
  password: { type: String, require: true},
  isAdmin: { type: Boolean, require: true, default: false},
  task: [{ type: Schema.Types.ObjectId, ref: "Task"}],
  isActive: { type: Boolean, require: true, default: true },
}, { timestamps: true }
)

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next()
  }

  const salt = await bcrypt.genSalt(10)
  this.password = await bcrypt.hash(this.password, salt)
})

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password)
}

const User = mongoose.model("User", userSchema)

export default User