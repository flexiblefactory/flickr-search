import Flickr from 'flickr-sdk'
import { decorate, observable } from 'mobx'

const FLICKR_API_KEY = 'd5b502cd8d28ab103b7048c244cf3f56';
const flickr = new Flickr(FLICKR_API_KEY);

const toUrl = ({ farm, server, id, secret }) =>
  `https://farm${farm}.staticflickr.com/${server}/${id}_${secret}.jpg`

const clean = content => {
  //to keep things clean remove anything that looks like html or json, very long words, and anything beyond 300 characters
  if(content.includes('<') || content.includes('{') || RegExp(/&[^\s]*;/).test(content)) return ''
  if(content.length>300) return content.substr(0,300)+'…'
  return content.split(' ').filter(w=>w.length<60).join(' ')
}

const cleanPhoto = p => ({...p, description: {_content: clean(p.description._content)}})
class FlickrAPI {
  photos = []
  query = ''
  page = 0
  pageSize = 12
  pending = false
  search(query) {
    this.query = query
    this.page = 0
    this.photos = []
    this.getNextPage()
  }

/*   async getPhotoInfo({id, secret}){
    const result = await flickr.photos.getInfo({photo_id:id ,secret})
    const response = JSON.parse(result.text)
    console.log(response)

  }
  async getProfile(id){
    console.log(id)

    const result = await flickr.profile.getProfile({user_id:id})
    const response = JSON.parse(result.text)
    console.log(response)

  } */
  async getNextPage() {
    this.page++
    this.pending=true
    const result = await flickr.photos.search({
      safe_search: 1,
      tags: this.query.split(' ').join(','),
      tag_mode: 'all',
      per_page: this.pageSize,
      page: this.page,
      extras:'description,tags,owner_name'
    })
    this.pending=false
    const response = JSON.parse(result.text)
    this.photos = [...this.photos, ...response.photos.photo.map(cleanPhoto).map(p => ({ ...p, src: toUrl(p) }))]
  }
}
export default decorate(FlickrAPI, { photos: observable, query: observable, pending: observable })