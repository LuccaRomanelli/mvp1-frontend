import { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {

  useEffect(()=>{
    axios.get('http://127.0.0.1:5000/reviews').then(res=>setData(res.data))
  })
  const [data, setData] = useState([])

  const [formValues, setFormValues] = useState({});

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = (e) =>{
    e.preventDefault()
    const formData = new FormData(e.target)
    const review = Object.fromEntries(formData)
    axios.post("http://127.0.0.1:5000/reviews", review).then((res) => {
      console.log(res)
      // location.reload()
    } 
    )
  }

  const handleDelete = (id) => {
    axios.delete(`http://127.0.0.1:5000/reviews/${id}`).then(res =>{
      console.log('Deletei')
    })
  }


  return (
    <><h1>Mvp 1 de Lucca Romanelli</h1>
    <div>
      <h2>Adicione sua resenha</h2>
        <form onSubmit={handleSubmit}>
          <input type="text" name="title" placeholder="title" onChange={handleInputChange} value={formValues.title || ''} />
          <input type="number" name="year" placeholder="year" onChange={handleInputChange} value={formValues.year || ''} />
          <input type="text" name="type" placeholder="type" onChange={handleInputChange} value={formValues.type || ''} />
          <input type="number" name="rating" placeholder="rating" onChange={handleInputChange} value={formValues.rating || ''} />
          <input type="text" name="description" placeholder="description" onChange={handleInputChange} value={formValues.description || ''} />
          <button type="submit">Enviar</button>
        </form>
    </div>
    <div>
       <h2>Resenhas ja existentes</h2>
          <table>
            <thead>
              <tr>
                <th>Id</th>
                <th>Titulo</th>
                <th>Ano</th>
                <th>Tipo</th>
                <th>Nota</th>
                <th>Resenha</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {
                data.map((review,index) =>(
                  <tr key={index}>
                    <td>{review.id}</td>
                    <td>{review.title}</td>
                    <td>{review.year}</td>
                    <td>{review.type}</td>
                    <td>{review.rating}</td>
                    <td>{review.description}</td>
                    <td><button onClick={() => handleDelete(review.id)}>Deletar</button></td>
                  </tr>
                ))
              }
            </tbody>
          </table>
    </div>
    </>
  );
}

export default App;
