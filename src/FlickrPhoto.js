import React from 'react';

const FlickrPhoto = ({ src, title, media, description, tags, author }) =>
  <div style={{
    display: 'inline-table',
    backgroundColor: 'black',
    width: '500px',
    height: '500px',
    maxWidth:'100%',
    backgroundImage: `url(${src})`,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    backgroundSize: 'contain',
    color: 'white',
    position: 'relative',
    boxSizing:'border-box',
    marginBottom:'20px',
    marginRight:'20px'
  }}>
    <div style={{
      display: 'inline-table',
      backgroundColor: 'rgba(0,0,0,.5)',
      maxWidth:'100%',
width:'100%',
      position: 'absolute',
      bottom: '0',
      left:0,
      padding:'20px',
      boxSizing:'border-box'
          }}>
      {title}
    </div>
  </div>

{/* <i>by {author}</i>
<p dangerouslySetInnerHTML={{ __html: description }} ></p>
<h2>Tags:</h2>
{tags} */}

export default FlickrPhoto