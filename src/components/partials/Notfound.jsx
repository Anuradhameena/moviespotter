import { Link, useNavigate } from 'react-router-dom'
import loader from '/404-Page.gif'

const Notfound = () => {
  const navigate=useNavigate();
  return (
    <>
    <Link
         onClick={()=>navigate(-1)}
         className="absolute hover:text-[#6556CD] ri-close-fill text-3xl text-white right-[5%] top-[5%]"
        >
           
        </Link>
    <div className='w-full h-full flex items-center justify-center bg-black'>
        <img className='h-[50%]' src={loader} alt="" />
    </div>
    </>
  )
}

export default Notfound