import React, { useContext } from 'react';
import AddIcon from '@mui/icons-material/Add';
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { AppState } from '../App';

const Header = () => {
  const useAppState = useContext(AppState);

  return (
    <div>
      <div className='text-3xl  flex justify-between items-center font-bold p-3 border-b-2 border-gray-500 text-green-500 header'>
        <Link to={'/'}>
          <span>
            Filmy <span className='text-white'>Verse</span>
          </span>
        </Link>

        {useAppState.login ? (
          <div className='flex justify-end'>
          <Link to={'/Addmovie'}>
            <h3 className='text-2xl'>
              <Button>
                <AddIcon className='mr-2  text-3xl flex items-center' color='secondary' />
                <span className='text-white font-bold text-xl'>Add New</span>
              </Button>
             
            </h3>
          </Link>
          {/* <Button className='bg-green-700 text-2xl font-bold p-2'>
            Logout
          </Button> */}
          </div>
          
        ) : (
          <Link to={'/Login'}>
            <h3 className='text-2xl'>
              <Button>
                <span className='text-white bg-green-800 p-2 text-2xl rounded-lg hover:bg-gray-800'>Login</span>
              </Button>
            </h3>
          </Link>
        )}
      </div>
    </div>
  );
};

export default Header;
