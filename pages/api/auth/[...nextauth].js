import NextAuth,{NextAuthOptions} from "next-auth"
import CredentialsProvider from 'next-auth/providers/credentials'
//=======================
const authOptions = {
session:{
    strategy:"jwt",
},
providers:[
    CredentialsProvider({
        type:'credentials',
        credentials:{},
        authorize(credentials,res){
            return{JWT:"jwtToken"}
        }
    })
]

}
export default NextAuth(authOptions)