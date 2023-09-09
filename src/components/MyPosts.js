import React from 'react'
import { useState, useEffect } from 'react'
import { getDocs, collection } from 'firebase/firestore';
import { db } from '../firebase-config';
import DisplayPosts from './DisplayPosts';
import Loader from './Loader';
// import FormField from "./FormField"

const MyPosts = () => {
  const [posts, setPost] = useState([])
  const [loading, setLoading] = useState(true);
  const postRef = collection(db, "posts")

  const [searchText, setSearchText] = useState('');
  const [searchTimeout, setSearchTimeout] = useState(null);
  const [searchedResults, setSearchedResults] = useState(null);

  const handleSearchChange = (e) => {
    clearTimeout(searchTimeout);
    setSearchText(e.target.value);

    setSearchTimeout(
      setTimeout(() => {
        const searchResult = posts.filter((item) => item.user.toLowerCase().includes(searchText.toLowerCase()) || item.prompt.toLowerCase().includes(searchText.toLowerCase()));
        setSearchedResults(searchResult);
      }, 500),
    );
  };

  useEffect(() => {
    setLoading(true)
    const getPost = () => {
      getDocs(postRef)
        .then(data => {
          setPost(data.docs.map((docs) => ({ ...docs.data(), id: docs.id })));
          setLoading(false)
        })
    }
    getPost()
  }, [])
  return (
    <section  className="mypost_tab">
    

      <div className="mt-16">
        {/* <FormField
          labelName="Search posts"
          type="text"
          name="text"
          placeholder="Search something..."
          value={searchText}
          handleChange={handleSearchChange}
        /> */}
      </div>

      <div>
      <h4 className="font-extrabold text-[#222328] text-[32px]">My posts</h4>
        {loading ? (
          <div className="loading_gen">
            <Loader />
            <br/><label>wait, getting your posts..</label>
          </div>
        ) : (
          <>
            {searchText && (
              <h2 className="font-medium text-[#666e75] text-xl mb-3">
                Showing Resuls for <span className="text-[#222328]">{searchText}</span>:
              </h2>
            )}
            <div  style={{ height:'76vh', display: 'grid', gridTemplateColumns: 'auto auto auto auto', gridColumnGap: '10px', overflow: "scroll"}}>
              {searchText && searchedResults ? (
                searchedResults.map(post=>(
                <DisplayPosts
                  post={post}
                />
                ))
              ) : (posts.map(post=>(
                <DisplayPosts
                  post={post}
                />


                ))
              )}
            </div>
          </>
        )}
      </div>
    </section>
  )
}

export default MyPosts

