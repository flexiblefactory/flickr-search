import React from 'react';

const FlickrPhoto = ({ src, title, media, description, tags, author }) =>
  <div style={{
    display: 'inline-table',
    backgroundColor: 'black',
    width: '500px',
    height: '500px',
    backgroundImage: `url(${src})`,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    backgroundSize: 'contain',
    color: 'white',
    margin: '10px',
    position: 'relative'
  }}>
    <div style={{
      display: 'inline-table',
      backgroundColor: 'rgba(0,0,0,.5)',
      width: '460px',
      position: 'absolute',
      bottom: '0',
      padding:'20px'
    }}>
      {title}
    </div>
  </div>

{/* <i>by {author}</i>
<p dangerouslySetInnerHTML={{ __html: description }} ></p>
<h2>Tags:</h2>
{tags} */}

export default FlickrPhoto