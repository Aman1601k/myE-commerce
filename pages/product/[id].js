import {useRouter} from 'next/router'
import baseUrl from '../../helpers/baseUrl'
import {useRef , useEffect , useState} from 'react'
import { parseCookies } from 'nookies'
import cookie2 from 'js-cookie'

const Product = ({product}) => {
    const [quantity,setQuantity] = useState(1)
    const router = useRouter()
    const modalRef = useRef(null)
    const cookie = parseCookies();
    const user = cookie.user ? JSON.parse(cookie.user) :""

    useEffect(() =>{
        M.Modal.init(modalRef.current)
    },[])

    if(router.isFallback){
        return (
            <h3>Loading...</h3>
        )
    }

    const getModal = () => {
        return (
            <div id="modal1" className="modal" ref={modalRef}>
            <div className="modal-content">
              <h4>Delete</h4>
              <p>{`Are you sure you want to delete "${product.name}"`}</p>
            </div>
            <div className="modal-footer">
                <button className="btn waves-effect waves-light green" >No</button>
                <button className="btn waves-effect waves-light red" onClick={() => deleteProduct()} >Yes</button>
             </div>
          </div>
        )
    }

    const deleteProduct = async () => {
        const res = await fetch(`${baseUrl}/api/product/${product._id}` , {
            method: 'DELETE'
        })
        await res.json()
        router.push('/')
    }

    const AddToCart = async ()=>{
        const res =  await fetch(`${baseUrl}/api/cart`,{
          method:"PUT",
          headers:{
            "Content-Type":"application/json",
            "Authorization":cookie.token
          },
          body:JSON.stringify({
           quantity,
           productId:product._id
          })
        })
        const res2 = await res.json()
   if(res2.error){
      M.toast({html:error,classes:"red"})
      cookie2.remove("user")
      cookie2.remove("token")
      router.push('/login')
   }
   M.toast({html:res2.message,classes:"green"})

   }
        
    return (
        <div className="container center-align">
            <h3>{product.name}</h3>
            <img src={product.mediaUrl} style={{width:'30%'}}/>
            <h5>???{product.price}</h5>
            <input type="number" style={{width:"400px" , margin:"10px"}}  min="1" 
            value={quantity}
            onChange={(e)=>setQuantity(Number(e.target.value))} 
            placeholder="Quantity"/>
            {user ?
            <button className="btn waves-effect waves-light #607d8b blue-grey" onClick={()=>AddToCart()} >Add
                <i className="material-icons right">add</i>
            </button>
            :
            <button className="btn waves-effect waves-light #607d8b blue-grey" onClick={() => router.push('/login')} >Login To Add
            </button>
            }
            
            <p className="left-align">
                {product.description}
            </p>
            {user.role !=  'user' &&
                <button data-target="modal1" className="btn waves-effect waves-light red modal-trigger" >Delete
                    <i className="material-icons left">delete</i>
                </button>
            }
            {getModal()}
        </div>
    )
}

// export async function getServerSideProps({params:{id}}){
//     const res = await fetch(`http://localhost:3000/api/product/${id}`)
//     const data = await res.json()
//     return {
//         props:{product:data}
//     }
// }

export async function getStaticProps({params:{id}}){
    const res = await fetch(`${baseUrl}/api/product/${id}`)
    const data = await res.json()
    return {
        props:{product:data}
    }
}

export async function getStaticPaths() {
    return {
        paths: [
            {params: {id: "60d21e632763e930841e94e0"}}
        ],
        fallback: true

    };
}

export default Product;