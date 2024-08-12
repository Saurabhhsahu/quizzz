import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import axios from 'axios';

function FlashCard() {
    const [flipped, setFlipped] = useState(false);
    const [idx, setIdx] = useState(0);
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('https://flashcard-backend-kd5h.onrender.com/flashcards');
                setData(response.data);
                console.log(response.data);
            } catch (error) {
                console.error('Error fetching flashcards:', error);
            }
        };

        fetchData();
    }, []);

    const handlePrev = () => {
        if (idx !== 0) {
            setIdx(idx - 1);
            setFlipped(false);
        }
    }

    const handleNext = () => {
        if (idx === data.length - 1) return;
        setIdx(idx + 1);
        setFlipped(false);
    }

    const handleFlip = () => {
        setFlipped(!flipped);
    }

    return (
        <div className="relative w-[300px] max-h-40vh bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 text-center text-white font-bold rounded-[10px] p-[20px] shadow-lg">
            <button className="absolute top-3 right-3 py-2 px-4 rounded bg-yellow-400 text-black hover:bg-yellow-300 shadow-md" onClick={handleFlip}>
                <div className="w-[25px] h-[25px] flex items-center justify-center">
                    <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-full h-full"
                    >
                        <path
                            d="M3.93751 7.996C5.41098 5.03473 8.46787 3 12 3C16.629 3 20.4418 6.49474 20.9439 10.9898M3.05493 13C3.55236 17.4999 7.36744 21 12 21C15.5328 21 18.5902 18.9645 20.0634 16.0023M3 4V8.5H7.5M21 20.5V16H16.5M11.5 9L10 12H14L12.5 15"
                            stroke="#000000"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                </div>
            </button>

            <div className="mt-8">
                {data.length > 0 ? (
                    !flipped ? (
                        <div>Q. {data[idx]?.question}</div>
                    ) : (
                        <div>Ans. {data[idx]?.answer}</div>
                    )
                ) : (
                    <div>Loading...</div>
                )}
            </div>

            <div className="flex justify-between w-full mt-4 pt-32">
                <Button className="text-white bg-blue-500 hover:bg-blue-400 shadow-md" variant="contained" onClick={handlePrev}>Prev</Button>
                <Button className="text-white bg-green-500 hover:bg-green-400 shadow-md" variant="contained" onClick={handleNext}>Next</Button>
            </div>
        </div>
    )
}

export default FlashCard;
