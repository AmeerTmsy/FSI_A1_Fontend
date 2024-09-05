import React from 'react';
import { useLoaderData } from 'react-router-dom';
import BookCard from '../components/bookCard';

export async function loader(params) {
    // console.log(params)
    const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/authers/${params.params.autherId}`)
    const autherRsponse = await response.json()
    const auther = autherRsponse.auther
    const bookRouteResponse = await fetch(`${import.meta.env.VITE_API_BASE_URL}/books`)
    const books = await bookRouteResponse.json()

    return { auther , books}
}

function Auther(props) {

    const { auther, books} = useLoaderData()
    
    return (
        <main className='pt-28'>
            <section className='grid md:grid-cols-2'>
                <div className='p-7 pb-4 w-1/2'>
                    <img className='w-full object-cover object-center aspect-square rounded-full' src={auther.image} alt="" />
                </div>
                <div className='p-7 flex flex-col justify-center'>
                    <h2 className='text-2xl font-bold py-3'>{auther.name}</h2>
                    <p>{auther.bio}</p>
                </div>
            </section>
            <section className="container mx-auto">
                <h1 className='text-3xl font-medium py-10 p-3'>My Books</h1>
                <div className='flex flex-row justify-evenly flex-wrap gap-8 pt-6 '>
                    {
                        books.map( book => {
                            if( book.auther === auther._id ) return <BookCard key={book._id} book={book} fromAutherPage={true}/>
                            
                        })
                    }
                </div>
            </section>
        </main>
    );
}

export default Auther;