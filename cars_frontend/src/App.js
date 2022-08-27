import './App.css';
import {useState,useEffect} from 'react'
import axios from 'axios'

const App = () => {
  
  //Define Variables
  const [newMake,setMake] = useState('');
  const [newModel,setModel] = useState('');
  const [newYear,setYear] = useState();
  const [newColor,setColor] = useState('');
  const [newImage,setImage] = useState('');
  const [car,setCar] = useState([])
  const [page,setPage] = useState("")
  const [edit, setEdit] = useState(false)
  // const [sold,setSold] = useState(false);

//Handle Functions for Form Submit
  const handleMake = (event) => {
    setMake(event.target.value)
  }
  const handleModel = (event) => {
    setModel(event.target.value)
  }
  const handleYear = (event) => {
    setYear(event.target.value)
  }
  const handleColor = (event) => {
    setColor(event.target.value)
  }
  const handleImage = (event) => {
    setImage(event.target.value)
  }
  // const handleSold = (event) => {
  //   setSold(event.target.value)
  // }

  //Function for New Car
  const handleNewCar = (event) => {
   event.preventDefault()
   axios.post('http://localhost:3000/car',{
    make: newMake,
    model: newModel,
    year: newYear,
    color: newColor,
    image: newImage    
   }).then(() => {
     axios.get('http://localhost:3000/car').then((res) => {
       setCar(res.data)
     })
   })
   setPage("show") 
  }
// Function to Delete Item
  const handleDelete = (carData) => {
    axios.delete(`http://localhost:3000/car/${carData._id}`).then(() => {
      axios.get('http://localhost:3000/car').then((res) => {
        setCar(res.data)
      })
    }) 
  }

  //function to handle Updates
  const handleUpdates = (carData) => {
    axios.put(`http://localhost:3000/car/${carData._id}`,
    {
      make: newMake ? newMake : carData.make,
      model: newModel ? newModel : carData.model,
      year: newYear ? newYear : carData.year,
      color: newColor ? newColor : carData.color,
      image: newImage ? newImage : carData.image,
      sold: carData.sold 
    }).then(() => {
      axios.get('http://localhost:3000/car').then((res) => {
        setCar(res.data)
      })
    })

    edit ? setEdit(false): setEdit(true)
  }

  const handleToggleSold = (carData) => {
    axios.put(`http://localhost:3000/car/${carData._id}`,
    {
      make:carData.make,
      model:carData.model,
      year:carData.year,
      color:carData.color,
      image:carData.image,
      sold:!carData.sold 
    }).then(() => {
      axios.get('http://localhost:3000/car').then((res) => {
        setCar(res.data)
      })
    })
  }

  //Functions to change views
  const showPage = () => {
    axios.get('http://localhost:3000/car').then((res) => {
      setCar(res.data)
    })
    page === "show" ? setPage("") : setPage("show")
  }

  const newPage = () => {
    page === "new" ? setPage("") : setPage("new")
  }

  //Function to swap Edit views
  const editButton = () => {
    edit ? setEdit(false): setEdit(true)
  }
  
  

  // useEffect(() => {
  //   axios.get('http://localhost:3000/car').then((res) => {
  //     setCar(res.data)
  //   })
  // },[])

  return(
    <div className='container'>
      <h1 className='text-center'>Dealer Inventory</h1>
      <button className='btn btn-outline-primary' onClick={showPage}>Show Inventory</button>
      <button className='btn btn-outline-primary' onClick={newPage}>Add Inventory</button>
      { page === "new"?
      <div>
      <form className='row' onSubmit={handleNewCar}>
        <div className='col-md-6'>
          <label className='form-label'>Make</label>
          <input className='form-control' type="text" onChange={handleMake}/>
        </div>
        <div className='col-md-6'>
          <label className='form-label'>Model</label>
          <input className='form-control' type="text" onChange={handleModel}/>
        </div>
        <div className='col-md-3'>
          <label className='form-label'>Year</label>
          <input className='form-control' type="number" min={1980} max={2022} onChange={handleYear}/>
        </div>
        <div className='col-md-3'>
          <label className='form-label'>Color</label>
          <input className='form-control' type="text" onChange={handleColor}/>
        </div>
        <div className='col-md-6'>
          <label className='form-label'>Image</label>
          <input className='form-control' type="url" placeholder="Enter Image Link" onChange={handleImage}/>
        </div>
        <div className='col-12 m-3'>
          <input type="submit" className='btn btn-primary' value="Add New"/>
        </div>        
      </form>
      </div>
      : page === "show" ?
      <div className='row mt-3'>
        {car.map((car) => {
          return(
            <div className='col' key={car._id}>
              <div className='card border' style={{width:"18rem"}}>
              <img className='card-img-top car-image' src={car.image} alt=""/>
              <div className='card-body'>
                {edit ?
                <>
                <input className='form-control' type="text" defaultValue={car.image} onChange={handleImage}/>
                <input className='form-control' type="text" defaultValue={car.make} onChange={handleMake}/>
                <input className='form-control' type="text" defaultValue={car.model} onChange={handleModel}/>
                <input className='form-control' type="text" defaultValue={car.year} onChange={handleYear}/>
                <input className='form-control' type="text" defaultValue={car.color} onChange={handleColor}/>
                <button className='btn btn-warning' onClick={(event) => {handleUpdates(car)}}>Submit Changes</button>
                </>
                :
                <div className='row'>
                  <div className='d-flex col-12 justify-content-between'>
                    <dt className=''>Make</dt><dd className='my-1 '>{car.make}</dd>
                  </div>
                  <div className='d-flex col-12 justify-content-between'>
                    <dt className=''>Model</dt><dd className='my-1'>{car.model}</dd>
                  </div>
                  <div className='d-flex col-12 justify-content-between'>
                    <dt className=''>Year</dt><dd className='my-1'>{car.year}</dd>
                  </div>
                  <div className='d-flex col-12 justify-content-between'>
                    <dt className=''>Color</dt><dd className='my-1'>{car.color}</dd>
                  </div>
                </div>
                }
                {car.sold ?
                <>
                <div className="card-img-overlay">
                  <h2 onClick={(event) => {handleToggleSold(car)}} className="text-bg-dark text-center">SOLD</h2>
                </div>                            
                </>
                :null
                }
                <div className='row  mt-3'>
                  { edit ?
                  <button className='btn - btn-secondary' onClick={editButton}>Back</button>
                  :
                  <>
                <button className='btn - btn-secondary' onClick={editButton}>Edit</button>
                <button className='btn btn-danger' onClick={(event) => {handleDelete(car)}}>Remove Inventory</button>
                <button className='btn btn-success'  onClick={(event) => {handleToggleSold(car)}}>Mark as Sold</button>
                  </>}
                </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>
      :null}
      
    </div>

  )
}

export default App;
