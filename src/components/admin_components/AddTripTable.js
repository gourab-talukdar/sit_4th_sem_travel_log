import React from 'react'

const AddTripTable = (props) => {
  
  return (
    <tr style={{'--brd-color':`var(--bs-${props.colors[props.i%props.colors.length]})`}}>
        <td className="track_dot" >
            <span className="track_line"></span>
        </td>
        <td>{props.i+1}</td>
        <td>{`${props.date.getDate()}-${props.date.getMonth()+1}-${props.date.getFullYear()}`}</td>
        <td>
          <input type="text" className="form-control" placeholder='Enter Places Name' defaultValue={props.tableData[props.i].place} onChange={(e)=>{
            props.tableData[props.i].place = e.target.value;
          }} />
        </td>
        <td style={{maxWidth:'100px'}}>
          <div className="input-group" >
            <span className="input-group-text" >₹</span>
            <input type="number" className="form-control" placeholder="Amount per person" defaultValue={props.tableData[props.i].amount} onChange={(e)=>{
            props.tableData[props.i].amount = e.target.value;
          }}/>
          </div>
        </td>
    </tr>
  )
}

export default AddTripTable