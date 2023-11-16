import React, { useContext, useState } from 'react';
import { TailSpin } from 'react-loader-spinner';  // loading spinnner
import { addDoc } from 'firebase/firestore';      // connect to the firebase with form 
import { moviesRef } from '../Firebase/Firebase';  // import the moviesref from the firebase file 
import swal from 'sweetalert';    // import the alert message from swat alert
import { AppState } from '../App';
import { useNavigate } from 'react-router-dom';
const Addmovie = () => {
  const UseAppstate = useContext(AppState)
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    year: "",
    description: "",
    img: "",
    rating: 50,
    rated:4,
  })

  const [loading, setloading] = useState(false); // Loadig the spin 
  ;

  const addMovie = async () => {
    setloading(true);
    try {
      if(UseAppstate.login)
      {
        await addDoc(moviesRef, form);
        setloading(true);
        swal({
          title: "Successfully Added",
          icon: "success",
          buttons: false,
          timer:3000,
        })
        setloading(false);
        setForm({
          name: "",
          year: "",
          description: "",
          img: "",
          rating: "",
        })

      }else{
            navigate('/Login')
      }
   
    } catch (error) {
      swal({
        title: error,
        icon: "error",
        buttons: false,
        timer: 300,
      })
    }
    


  }
  return (
    <div>
      <section class="text-gray-600 body-font relative">
        <div class="container px-5 py-24 mx-auto">
          <div class="flex flex-col text-center w-full mb-12">
            <h1 class="text-6xl font-bold title-font mb-4 text-white">Add Movie</h1>
          </div>
          <div class="lg:w-1/2 md:w-2/3 mx-auto">
            <div class="flex flex-wrap -m-2">
              <div class="p-2 w-1/2">
                <div class="relative">
                  <label for="name" class="leading-7 text-2xl  text-white">Movie Name :</label>
                  <input type="text"
                    id="name"
                    name="name"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name:e.target.value })}
                    class="w-full h-12 bg-transparent  rounded border border-gray-300 focus:border-red-500  focus:ring-2 focus:ring-red-200 text-xl outline-none text-white py-1 px-3  mt-2 leading-8 transition-colors duration-200 ease-in-out" />
                </div>
              </div>
              <div class="p-2 w-1/2">
                <div class="relative">
                  <label for="name" class="leading-7 text-2xl  text-white">Release Year :</label>
                  <input type="text"
                    id="year"
                    name="year"
                    required
                    value={form.year}
                    onChange={(e) => setForm({ ...form, year:e.target.value })}
                    class="w-full h-12 bg-transparent  rounded border border-gray-300 focus:border-red-500  focus:ring-2 focus:ring-red-200 text-xl outline-none text-white py-1 px-3  mt-2 leading-8 transition-colors duration-200 ease-in-out" />
                </div>
              </div>

              <div class="p-2 w-full mt-5">
                <div class="relative">
                  <label for="name" class="leading-7 text-2xl  text-white">Poster URL:</label>
                  <input type="text"
                    id="img"
                    name="img"
                    required
                    value={form.img}
                    onChange={(e) => setForm({ ...form, img:e.target.value })}
                    class="w-full h-12 bg-transparent  rounded border border-gray-300 focus:border-red-500  focus:ring-2 focus:ring-red-200 text-xl outline-none text-white py-1 px-3  mt-2 leading-8 transition-colors duration-200 ease-in-out" />
                </div>
              </div>


              <div class="p-2 w-full mt-5">
                <div class="relative">
                  <label for="message" class="leading-7 text-2xl text-white">Desciption :</label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    value={form.description}
                    onChange={(e) => setForm({ ...form, description: e.target.value })}
                    class="w-full h-32 bg-transparent bg-opacity-50 rounded border border-gray-300 focus:border-red-500  focus:ring-2 focus:ring-red-200 text-xl outline-none text-white py-1 px-3  mt-3 resize-none leading-6 transition-colors duration-200 ease-in-out"></textarea>
                </div>
              </div>
              <div class="p-2 w-full">
                <button onClick={addMovie} class="flex mx-auto text-white bg-red-500 border-0 py-2 px-8 focus:outline-none hover:bg-red-600 rounded text-lg">
                  {loading ? <TailSpin height={25} color='white' /> : 'Submit'}</button>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  )
}

export default Addmovie
