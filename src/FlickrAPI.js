import Flickr from 'flickr-sdk'
import { decorate, computed, observable } from 'mobx'

const FLICKR_API_KEY = 'd5b502cd8d28ab103b7048c244cf3f56';
const flickr = new Flickr(FLICKR_API_KEY);
const toUrl = ({ farm, server, id, secret }) =>
  `https://farm${farm}.staticflickr.com/${server}/${id}_${secret}.jpg`

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
  async getNextPage() {
    this.page++
    this.pending=true
    const result = await flickr.photos.search({
      safe_search: 1,
      tags: this.query.split(' ').join(','),
      per_page: this.pageSize,
      page: this.page
    })
    this.pending=false
    const response = JSON.parse(result.text)
    this.photos = [...this.photos, ...response.photos.photo.map(p => ({ ...p, src: toUrl(p) }))]
  }
}
export default decorate(FlickrAPI, { photos: observable, query: observable, pending: observable })