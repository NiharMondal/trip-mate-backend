import bcrypt from 'bcrypt'
import { envConfig } from '../config'

export const hashPassword = async(value:string) =>{
    const result = await bcrypt.hash(value, envConfig.salt_round);

    return result
}


export const checkPassword = async(newPass:string, oldPass:string)=>{
    const result = await bcrypt.compare(newPass, oldPass);

    return result;
}