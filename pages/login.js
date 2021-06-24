import { useState } from "react";
import Link from "next/link";
import baseUrl from "../helpers/baseUrl";
import cookie from 'js-cookie'
import {useRouter} from 'next/router'

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router =  useRouter();

  const userLogin = async (e) => {
    e.preventDefault();
    const res = await fetch(`${baseUrl}/api/login` ,{
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body:JSON.stringify({
        email,
        password
      })
    })
    const res2 = await res.json()
    if(res2.error) {
      M.toast({html: res2.error, classes: 'red'})
    }else{
      cookie.set('token' , res2.token )
      cookie.set('user' , res2.user)
      router.push('/account')
    }
  }

  return (
    <div className="container card authcard center-align">
      <h3>
        Login
        {" "}
        <i className="material-icons">login</i>
      </h3>

      <form onSubmit={(e) => userLogin(e)}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          className="btn waves-effect waves-light #607d8b blue-grey"
          type="submit"
          name="action"
        >
          Login
          <i className="material-icons right">send</i>
        </button>
        <div className="center-align">
          <p>Don't have an account yet?</p>
          <Link href="/signup">
            <a style={{ cursor: "pointer", color: "red" }}> Sign Up!</a>
          </Link>
        </div>
      </form>
    </div>
  );
};
export default Login;
