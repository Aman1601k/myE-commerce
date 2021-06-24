import Link from 'next/link'
import {useRouter} from 'next/router'
import { parseCookies } from 'nookies';
import cookie from 'js-cookie'

const Navbar = () => {
    const router = useRouter();
    const cookieuser = parseCookies();
    const user = cookieuser.user ? JSON.parse(cookieuser.user) :""

    function isActive(route) {
        if(route == router.pathname){
            return "active"
        }
        else ""
    }

    return (
        <nav>
            <div className="nav-wrapper #607d8b blue-grey">
            <Link href="/"><a href="#" className="brand-logo left">My Store</a></Link>
            <ul id="nav-mobile" className="right">
                <li className={isActive('/cart')}><Link href="/cart"><a>Cart</a></Link></li>
                {(user.role == "admin" || user.role == "root") && 
                <li className={isActive('/create')}><Link href="/create"><a>Create</a></Link></li>}

                {user ? 
                    <>
                    <li className={isActive('/account')}><Link href="/account"><a>Account</a></Link></li>
                    <li><button className="btn red" onClick={() => {
                        cookie.remove('token')
                        cookie.remove('user')
                        router.push('/login')
                    }}>logout</button></li>
                    </>

                :
                    <>
                    <li className={isActive('/login')}><Link href="/login"><a>Login</a></Link></li>
                    <li className={isActive('/signup')}><Link href="/signup"><a>Signup</a></Link></li>
                    </>
                }
                
            </ul>
            </div>
        </nav>
    )
}

export default Navbar