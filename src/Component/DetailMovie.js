import React, { useEffect, useState } from 'react'
import ReactStars from 'react-stars';
import './DetailsMovie.css';
import { useParams } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../Firebase/Firebase';
import { Bars } from 'react-loader-spinner';
import Reviews from './Reviews';
const DetailMovie = () => {

  const [loading, setloading] = useState(false);
  const { id } = useParams();

  const [data, setData] = useState({
    name: "",
    year: "",
    rating:"",
    img: "",
    description: "",
    rating:0,
    rated:0,
  });

  useEffect(() => {
    async function getData() {
      setloading(true);
      const _doc = doc(db, "Movies", id);
      const _data = await getDoc(_doc);
      setData(_data.data());
      setloading(false);
    }
    getData();
  }, [id])


  return (
    <div>
      {loading ? <div className='flex justify-center w-full items-center loading'><Bars height={40} color='white' /></div> : <section class="text-gray-600 body-font overflow-hidden">
        <div class="container px-5 py-24 mx-auto">
          <div class="lg:w-5/5 mx-auto flex flex-wrap">
            <img alt="ecommerce" class="detail-img rounded " src={data.img} />

            <div class="detail-info lg:w-3/5 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
              <h1 class="text-5xl font-bold title-font text-gray-50 tracking-widest">{data.name} <span>({data.year})</span></h1>
              <div className="flex items-center mb-4">
                <ReactStars
                  size={40}
                  half={true}
                  edit={false}
                  value={data.rating/data.rated}
                />

              </div>
              <p class="leading-relaxed text-2xl text-white">{data.description}</p>

              <Reviews id={id} prvrating={data.rating} useRated={data.rated}/>
            </div>
          </div>
        </div>
      </section>
      }
    </div>
  )
}

export default DetailMovie
