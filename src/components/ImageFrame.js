import React from 'react'
import { useState } from 'react';
import img2 from '../assets/images/img2.png'
import Loader from './Loader';
import '../components/main.css'
import ImageCard from './ImageCard';

const RenderCards = ({ data, title }) => {
  if (data?.length > 0) {
    return (
      data.map((post) => <ImageCard key={post._id} {...post} />)
    );
  }

  return (
    <h2 className="mt-5 font-bold text-[#6469ff] text-xl uppercase">{title}</h2>
  );
};


const ImageFrame = () => {
  const [image_url, setimg_url] = useState("/");
  const [loading, setloading] = useState(false);
  const [searchText, setsearchText] = useState("");
  const [generatingImg, setGeneratingImg] = useState(false);
 
  const [form, setForm] = useState({
    name: '',
    prompt: '',
    photo: '',
  });

  return (
    <div>
      {image_url === "/" ?
        (
          <div>
            <div className='image-frame-head-title'>
              {/* <input
                className="typing-container"
                placeholder=" Image title will go here.. "
                 /> */}
              {searchText && (
                <label>{searchText}</label>
              )
              }
            </div>
            <div className='image-frame-head-imagear'>
            { form.photo ? (
              <img
                src={form.photo}
                alt={form.prompt}
                className="w-full h-full object-contain"
              />
            ) : (
              <img
                src={img2}
                alt="preview"
                className="w-9/12 h-9/12 object-contain opacity-40"
              />
            )}

            {generatingImg && (
              <div className="absolute inset-0 z-0 flex justify-center items-center bg-[rgba(0,0,0,0.5)] rounded-lg">
                <Loader />
              </div>
            )}


              {/* {loading ? (
                <div className='loading_images'>
                  <Loader />
                </div>
              ) : (
                <>
                  <img src={img2} />
                  <label>Images will be visible here..</label></>
              )} */}


            </div>

          </div>
        )
        :
        (<img src={image_url} />
        )}

    </div>
  )
}

export default ImageFrame
