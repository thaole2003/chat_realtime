import React from 'react'
import {auth} from '../firebase'
const style = {
    button: `bg-gray-200 m-1 items-center gap-1 flex  hover:bg-red-800 hover:text-white rounded-lg h-9`
}


const LogOut = (props) => {
    const signOut = () => {
        signOut(auth)
    }

    return (
        <>    
       
        <div className="flex justify-around items-center gap-3">
          <img className='w-10 h-10 rounded-full' src={props.user.photoURL} alt="" />
          {/* <span>{props.user.displayName}</span> */}
          <button  onClick={() => auth.signOut()} className={style.button}>
            <p>Log out</p><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
  <path stroke-linecap="round" stroke-linejoin="round" d="M5.636 5.636a9 9 0 1012.728 0M12 3v9" />
</svg>

        </button>
        </div>
        </>
    
    )
}

export default LogOut