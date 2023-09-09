import React from 'react'
// import deflogo from "../logo.png"
import './main.css'
const DisplayPosts = (props) => {
    const { logo, image, prompt, user } = props.post;
    return (


        <div className="myposts_div">
            {
                props.post == null ? (
                    <>
                    No posts yet</>
                )
                    : (
                        <div className='postsframe'>
                            <img
                                className=' '
                                src={image}
                                alt={prompt}
                            />
                            <div className={"myposts_desc"}>
                                <div className="">
                                    {/* <img className='logo mr-2' src={logo? logo: deflogo} alt={prompt} /> */}
                                    <div>
                                        <span style={{ color: "#888", fontSize: "12px", textTransform: "lowercase" }}>{user}</span>



                                        <p style={{ "fontSize": "14px" }}>{prompt.split(' ').slice(0, 10).join(' ')}...</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
            }



        </div>
    )
}

export default DisplayPosts