import React from 'react';
import './App.css';
import FlickrPhoto from './FlickrPhoto';
import FlickrAPI from './FlickrAPI';
import { observer } from 'mobx-react'
import Spinner from  'react-spinkit'
const api = new FlickrAPI()

const onScroll = () => {
  const e = document.getElementsByTagName('html')[0];

  var scrollY = window.pageYOffset;

  const diff = Math.floor(Math.abs(e.scrollHeight - scrollY - e.clientHeight))
  const atBottom = diff === 0
  //console.log(diff, atBottom)
  if (atBottom) {
    api.getNextPage()
  }
}

const infiniteScrollEffect=() => {
  window.addEventListener('scroll', onScroll);
  return () => {
    window.removeEventListener('scroll', onScroll);
  }
}

const App = () => {
  React.useEffect(infiniteScrollEffect, [])
  const [query, setQuery] = React.useState('trees')
  return (
    <div className="App">
      <header className="App-header">
        <form onSubmit={(e) => {
          e.preventDefault()
          api.search(query);
          window.scrollTo(0,0)
        }}>
          <input style={{ width: '144px' }} type="text" value={query} onChange={e => setQuery(e.target.value)} />
          <div>
            <button className='search' type="submit"  >
              Flickr search!
            </button>
          </div>
        </form>
      </header>
      <div className="content-pane">
      {api.photos.map((p, i) => <FlickrPhoto selectTag={(tag)=>{
        //api.getProfile(p.owner)
        //api.getPhotoInfo(p)
        setQuery(tag)
        api.search(tag)
      }} key={i} {...p}></FlickrPhoto>)} 
      <div style={{visibility: api.pending?'visible':'hidden'}} className='loading'>
        
        <Spinner fadeIn='none' name='3-bounce' color='hotpink'/>
        </div>
           
      </div>
      
    </div>
  );
}
export default observer(App);
