import React, { Component } from 'react'
import axios from 'axios'
import Switch from "react-switch";

const a = {marginBottom:'20px'}

class sortFunction extends Component {

    constructor(props) {
        super(props)
    
        this.state = {
             checked:false,
             users:[]
        }
    }
    async componentDidMount(){
        const userList = await axios.get(`http://localhost:8080/get/csvfile/data`)
        this.setState({
            users:userList.data.data
        })
    }

    handleChange=(checked)=> {
        this.setState({ checked });
      }

    render() {

        const {users,checked} = this.state
 
        return (
            <>
       <label>
        <span style={{display:'block'}}>List Toggle</span>
        <Switch onChange={this.handleChange} checked={this.state.checked} />
      </label>
      <h2>Contents</h2>
              {checked? <table className="table">

<tbody>
    <>
        {users.length>0?users.map((u,index)=>{return<tr key={index} className='text-center'>{u.map((p,index)=>{return<td key={index}>{p}</td>})}</tr>}):'data not found'}
</>
</tbody>
</table>:
<div className="container">
 
  <div className="row">
      <div >
      
{ users.length>0?users.map((numList,i) =>{
                  return i>0?<div key={i} className="col-md-3 card" style={a}>
                    {
                      numList.map((num,j)=><span className="card-body"  key={j}>{users[0][j]} : {num}<br></br></span>
                      )
                    }
                    </div>:''
                }):''
        }
  
      </div>
  </div>

</div>}



            </>
        )
    }

}

export default sortFunction



