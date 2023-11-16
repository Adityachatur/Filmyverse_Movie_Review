import React, { useContext, useEffect, useState } from 'react';
import ReactStars from 'react-stars';
import { reviewRef, db } from '../Firebase/Firebase';
import { addDoc, doc, updateDoc, query, where, getDocs } from 'firebase/firestore';
import { TailSpin, ThreeDots } from 'react-loader-spinner';
import swal from 'sweetalert';
import { AppState } from '../App';

const Reviews = (id, prvrating, useRated) => {
  const UseAppstate = useContext(AppState);
  const [rating, setRating] = useState();
  const [loading, setloading] = useState(false);
  const [form, setForm] = useState('');
  const [data, setData] = useState([]); // Initialize as an empty array
  const [Reviewloading, setreviewloading] = useState(false);
 

  const sendReview = async () => {

    setloading(true);
    try {
      await addDoc(reviewRef, {
        Movieid: id,
        Fanname: UseAppstate.UserName,
        rating: rating,
        Comment: form,
        time: new Date().getTime(),
      });
      const ref = doc(db, 'Movies', id);
      await updateDoc(ref, {
        rating: prvrating + rating,
        rated: useRated + 1,
      });
      setForm("");
      setRating(0);
      setloading(false);
      swal({
        title: 'Success',
        icon: 'success',
        buttons: false,
        timer: 2500,
      });
    } catch (error) {
      console.error(error); // Log the error for debugging
      setForm("");
      setRating(0);
      setloading(false);
      swal({
        title: 'Success',
        icon: 'success',
        buttons: false,
        timer: 2500,
      });
    }
  }



  useEffect(() => {
    async function getData() {
      setreviewloading(true);
      const qur = query(reviewRef, where('Movieid', '==', id));
      const querysnap = await getDocs(qur);
      const newData = []; // Create a new array to store the data
      querysnap.forEach((doc) => {
        newData.push(doc.data());
      });
      setData(newData); // Set the data array with the new data
      setreviewloading(false);
    }
    getData();
  }, [id]);


  return (
    <>
      <div className='mt-20 w-full border-t border-gray-200'>




        {UseAppstate.login ?
          (
            <>
              <ReactStars
                size={30}
                half={true}
                value={rating}
                edit={true}
                onChange={(rate) => setRating(rate)}
              />
              <input
                type='text'
                value={form}
                onChange={(e) => setForm(e.target.value)}
                placeholder='Enter Your Comments'
                className='w-full p-2 outline-none text-2xl bg-gray-800 text-slate-50'
              />
              <button
                onClick={sendReview}
                className='w-full mt-3 p-3 h-16 bg-green-500 text-2xl font-bold text-black flex justify-center'>
                {loading ? <TailSpin height={25} color='white' /> : 'SHARE'}
              </button>
            </>
          ) : null
        }





        {Reviewloading ? (
          <div className='mt-10 flex justify-center'>
            <ThreeDots height={20} color='white' />
          </div>
        ) : (
          <div>
            {data.map((e, i) => {

              return <div className='ont-bold bg-gray-900 shadow-sm shadow-white' key={i}>
                <div className='flex mt-4'>
                  <h3 className='mr-5 text-blue-300 text-2xl'>{e.Fanname}</h3>
                  <h2 className='text-white mr-4 text-xl'>{new Date(e.time).toLocaleDateString()}</h2>
                  <h2 className='text-white text-xl'>{new Date(e.time).toLocaleTimeString()}</h2>
                </div>
                <p className='text-gray-300 text-2xl'>{e.Comment}</p>
                <ReactStars
                  half={true}
                  edit={false}
                  value={e.rating}
                  size={20}
                  className='mb-10'
                />
              </div>;
            })}
          </div>
        )}
      </div>
    </>
  );
}

export default Reviews;
