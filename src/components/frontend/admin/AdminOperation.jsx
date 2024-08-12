import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import axios from 'axios';

function AdminOperation() {
    const [isClicked, setIsClicked] = useState(false);
    const [isQuestion, setIsquestion] = useState(true);
    const [id, setId] = useState(null);
    const [question, setQuestion] = useState("");
    const [answer, setAnswer] = useState("");
    const [clickedButton, setClickedButton] = useState("");
    const [showAll, setShowAll] = useState(false);
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('https://flashcard-backend-kd5h.onrender.com/flashcards');
                setData(response.data);
            } catch (error) {
                console.error('Error fetching flashcards:', error);
            }
        };

        fetchData();
    }, []);

    const handleForm = () => {
        setIsquestion(true);
    }

    const handleClick = (clickedBtn) => {
        setIsClicked(true);
        setIsquestion(false);
        setId(null);
        setQuestion("");
        setAnswer("");
        setClickedButton(clickedBtn);
        setShowAll(false);
    }

    const handleIdChange = (e) => {
        setId(e.target.value);
    }

    const handleQuestionChange = (e) => {
        setQuestion(e.target.value);
    }

    const handleAnswerChange = (e) => {
        setAnswer(e.target.value);
    }

    const addData = async () => {
        try {
            const obj = {
                "id": id,
                "question": question,
                "answer": answer
            }
            await axios.post("https://flashcard-backend-kd5h.onrender.com/flashcards", obj);
        } catch (err) {
            console.log("Error in adding new data");
        }
    }

    const deleteQuestion = async () => {
        try {
            await axios.delete(`https://flashcard-backend-kd5h.onrender.com/admin/${id}`);
        } catch (err) {
            console.log("Error in deleting the data");
        }
    }

    const updateQuestion = async () => {
        try {
            const obj = {
                "id": id,
                "question": question,
                "answer": answer
            }
            await axios.put(`https://flashcard-backend-kd5h.onrender.com/admin/${id}`, obj);
        } catch (err) {
            console.log("Error in updating the data");
        }
    }

    const handleSubmit = () => {
        if (clickedButton === "add") addData();
        else if (clickedButton === "delete") deleteQuestion();
        else if (clickedButton === "update") updateQuestion();
    }

    return (
        <div className='bg-black text-white'>
            <div className='text-[50px] font-bold m-8 text-center'>
                Admin
            </div>
            <div className='flex flex-wrap justify-center items-center gap-[20px]'>
                <Button variant="contained" onClick={() => { handleClick("add"); handleForm() }}>Add Question</Button>
                <Button variant="contained" onClick={() => handleClick("delete")}>Delete Question</Button>
                <Button variant="contained" onClick={() => { handleClick("update"); handleForm() }}>Update Question</Button>
                <Button variant="contained" onClick={() => { setShowAll(true); setIsClicked(false) }}>All Questions</Button>
            </div>

            {
                isClicked &&
                <form className='bg-gradient-to-r from-blue-500 to-teal-400 rounded-xl text-white p-[20px] w-[400px] flex justify-center flex-col mx-auto mt-[50px] shadow-lg'>
                    <label className='my-[10px] flex flex-col'>
                        Enter the ID:
                        <input
                            type="number"
                            placeholder='Enter ID'
                            value={id}
                            onChange={handleIdChange}
                            className='bg-white p-[10px] rounded-[10px] text-black my-[5px] focus:outline-none focus:ring-2 focus:ring-teal-300'
                        />
                    </label>

                    {isQuestion && (
                        <div>
                            <label className='flex flex-col'>
                                Enter Question:
                                <input
                                    type="text"
                                    placeholder='Enter question'
                                    value={question}
                                    onChange={handleQuestionChange}
                                    className='bg-white p-[10px] rounded-[10px] text-black my-[5px] focus:outline-none focus:ring-2 focus:ring-teal-300'
                                />
                            </label>
                            <label className='flex flex-col'>
                                Enter Answer:
                                <input
                                    type="text"
                                    placeholder='Enter answer'
                                    value={answer}
                                    onChange={handleAnswerChange}
                                    className='bg-white p-[10px] rounded-[10px] text-black my-[5px] focus:outline-none focus:ring-2 focus:ring-teal-300'
                                />
                            </label>
                        </div>
                    )}

                    <Button
                        variant="contained"
                        className='m-[20px] bg-yellow-500 hover:bg-yellow-600 text-black py-[10px] rounded-[10px] shadow-md'
                        onClick={handleSubmit}
                    >
                        Submit
                    </Button>
                </form>
            }

            {showAll &&
                <div className='flex flex-wrap gap-4 mt-8 p-4'>
                    {data.map((item) => (
                        <div
                            key={item.id}
                            className='bg-gradient-to-r from-green-400 to-blue-500 rounded-lg text-white p-4 shadow-lg w-full sm:w-[90%] md:w-[45%] lg:w-[30%] xl:w-[22%]'>
                            <div className='font-bold mb-2'>ID: {item.id}</div>
                            <div className='mb-2'>Question: {item.question}</div>
                            <div>Answer: {item.answer}</div>
                        </div>
                    ))}
                </div>
            }
        </div>
    )
}

export default AdminOperation;
