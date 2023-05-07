import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { ordered, restocked } from './icecreamSlice'

const IcecreamView = () => {
    const numOfIceCreams = useSelector((state) => state.icecream.numOfIcecreams)
    const [value, setValue] = useState('')
    const dispatch = useDispatch();
  return (
    <div>
        <h2>Number Of Icecreams - {numOfIceCreams}</h2>
      <button onClick={() => dispatch(ordered())}>Order Icecream</button>
      <input 
      type='number'
      value={value}
      onChange={(e) => setValue(parseInt(e.target.value))}
       />
      <button onClick={() => dispatch(restocked(value))}>Restock Icecream</button>
    </div>
  )
}

export default IcecreamView
