import React, { useEffect, useState } from 'react';
import './Cards.css';
import ReactStars from 'react-stars';
import { Bars } from 'react-loader-spinner';
import { getDocs } from 'firebase/firestore';
import { moviesRef } from '../Firebase/Firebase';
import { Link } from 'react-router-dom';

const Cards = () => {
  const [data, setData] = useState([]);
  const [loading, setloading] = useState(false);

  useEffect(() => {
    async function getData() {
      setloading(true);
      const _data = await getDocs(moviesRef);
      const dataArr = [];
      _data.forEach((doc) => {
        dataArr.push({ ...(doc.data()), id: doc.id });
      });
      setData(dataArr);
      setloading(false);
    }
    getData();
  }, []);

  return (
    <div className='flex flex-wrap justify-around p-3 mt-6'>
      {loading ? (
        <div className='flex justify-center w-full items-center loading'>
          <Bars height={40} color='white' />
        </div>
      ) : (
        data.map((e, i) => (
          <Link to={`/detail/${e.id}`} key={i}>
            <div
              className='card bg-slate-800 font-bold cursor-pointer text-lg hover:-translate-y-2 hover:transition-all duration-300'
            >
              <img src={e.img} alt='' />
              <h1 className='mt-6'>
                <span className='text-gray-400 px-2'>Name:</span>
                {e.name}
              </h1>
              <h1 className='flex items-center'>
                <span className='text-gray-400 px-2'>Rating:</span>
                <ReactStars size={20} half={true} value={e.rating / e.rated} edit={false} />
              </h1>
              <h1>
                <span className='text-gray-400 px-2'>Year:</span>
                {e.year}
              </h1>
            </div>
          </Link>
        ))
      )}
    </div>
  );
};

export default Cards;
