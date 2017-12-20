/**
 * Created by Matteo on 30/11/2017.
 */
import request from 'axios'

export default {
  baseUrl: 'https://gest.studiomonocromo.it/wp-json/wp/v2',
  getPage (slug) {
    return new Promise((resolve, reject) => {
      request.defaults.baseURL = this.baseUrl
      request.get(`pages?slug=${slug}`, {
        auth: {
          oauth_consumer_key: 'cWsmy8BUTXHg',
          oauth_consumer_secret: 'la5Byw4E9UPzoHMXBvQDP2A7D3kdD2XksZEtvzkPfz5c7DqQ',
          oauth_token: '4Ta3LpETsZRY9kvjGLPESnR9',
          oauth_token_secret: 'Q1xCyd97kt0IUTJpXbNRItPOm5QYvz8dMSsP5ObGBQo7vg0I'
        }
      }).then(response => {
        const data = [...response.data][0]
        if (response.status === 200 && response.data.length > 0) {
          console.log(data)
          const filtered = {
            content: data.content.rendered,
            author: data.author,
            date: data.date,
            date_gmt: data.date_gmt,
            excerpt: data.excerpt.rendered,
            featured_media: data.featured_media,
            guid: data.guid.rendered,
            link: data.link,
            slug: data.slug,
            title: data.title.rendered,
            seoData: data.yoast_meta,
            acf: data.acf
          }
          resolve(filtered)
        } else {
          reject(response)
        }
      })
    })
  },
  getCaseStudies () {
    return new Promise((resolve, reject) => {
      request.defaults.baseURL = this.baseUrl
      request.get(`progetti?&_embed`, {
        auth: {
          oauth_consumer_key: 'cWsmy8BUTXHg',
          oauth_consumer_secret: 'la5Byw4E9UPzoHMXBvQDP2A7D3kdD2XksZEtvzkPfz5c7DqQ',
          oauth_token: '4Ta3LpETsZRY9kvjGLPESnR9',
          oauth_token_secret: 'Q1xCyd97kt0IUTJpXbNRItPOm5QYvz8dMSsP5ObGBQo7vg0I'
        }
      }).then(response => {
        const data = [...response.data]
        if (response.status === 200 && response.data.length > 0) {
          resolve(data)
        } else {
          reject(response)
        }
      })
    })
  }
}
