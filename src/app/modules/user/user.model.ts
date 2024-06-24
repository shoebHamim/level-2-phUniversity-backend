import { Schema, model } from 'mongoose';
import { TUser } from './user.interface';
import bcrypt from 'bcrypt';
const userSchema = new Schema({
  id: { type: String, required: true },
  password: { type: String, required: true },
  needsPasswordChange: { type: Boolean, default: true },
  role: { type: String, enum: ['admin', 'student', 'faculty'], required: true },
  isDeleted: { type: Boolean, required: true,default:false },
  status:{type:String,enum:['in-progress','blocked'],required:true}

},{
  timestamps:true
});


userSchema.pre('save', async function(next) {
  const user=this
  if (this.isModified('password')) {
    // Encrypt the password
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(user.password, salt);
    // Replace the plain text password with the hash
    user.password = hash;
  }
  next();
});

userSchema.post('save',function(doc,next){
  doc.password='';
  next()
})




const UserModel = model<TUser>('User', userSchema);

export default UserModel;