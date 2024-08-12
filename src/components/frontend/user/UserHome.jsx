import React, { useState } from 'react';
import Button from '@mui/material/Button';
import FlashCard from '../FlashCard/FlashCard';

function UserHome() {
  const [showFlashcard, setShowFlashcard] = useState(false);

  const handlePlayNowClick = () => {
    setShowFlashcard(true);
  };

  return (
    <div className='bg-black h-screen text-white flex flex-col items-center justify-center'>
      {!showFlashcard ? (
        <>
          <div className='text-center text-[50px] font-bold mb-8'>
            User Page
          </div>
          <Button variant="contained" onClick={handlePlayNowClick}>
            Play Now
          </Button>
        </>
      ) : (
        <FlashCard />
      )}
    </div>
  );
}

export default UserHome;

