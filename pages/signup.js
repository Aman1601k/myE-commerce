import {useState} from 'react'
import Link from 'next/link'
import baseUrl from '../helpers/baseUrl'
import {useRouter} from 'next/router'

const Signup = () => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const router = useRouter() 

    const userSignup =async (e) => {
      e.preventDefault()
      const res = await fetch(`${baseUrl}/api/signup`,{
        method: 'POST',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name,
          email,
          password
        })
      })
      const res2 = await res.json()
      if(res2.error) {
        M.toast({html: res2.error, classes: 'red'})
      }else{
        M.toast({html: res2.message, classes: 'green'})
        router.push('/login')
      }
    }
    return (
      <div className="container card authcard center-align">
        <h3> 
          Sign Up
          {" "}
          <i class="material-icons">
          account_circle
          </i>
        </h3>
        <form onSubmit={(e) => userSignup(e)}>
            <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)}/>
            <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)}/>
            <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}/>
            <button className="btn waves-effect waves-light #607d8b blue-grey" type="submit" name="action">Sign Up
              <i className="material-icons right">send</i>
            </button>
            <div className="center-align">
              <p>Already have an account?</p><Link href="/login"><a style={{cursor: 'pointer' , color: 'red'}}>Sign in!</a></Link>
            </div>
        </form>
      </div>
    )
  }
  export default Signup