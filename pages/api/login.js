import initDB from '../../helpers/initDB'
import User from '../../models/User'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

initDB() 

export default async(req,res) => {
    const {email,password} = req.body
    try {
        if(!email || !password){
            return res.status(422).json({error: "please add all te fields"})
        }
        const user = await User.findOne({email})
        if(!user){
            return res.status(404).json({error: "user don't exist with that email"})
        }
        const doMatch = await bcrypt.compare(password,user.password)
        if(doMatch){
            const token = jwt.sign({userId:user.id},process.env.JWT_SECRET , {
                expiresIn:"10d"
            })
            const {name,role,email} = user
            res.status(201).json({token , user:{name,role,email}})
        }else{
            res.status(401).json({error: "email or password don't match'"})
        }

    } catch (error) {
        console.log(error)
    }
}
