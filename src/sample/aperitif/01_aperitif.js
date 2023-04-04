import { setTimeout } from 'timers/promises'
import { promises as fs }  from 'fs'
import got from 'got'

const url_aperitif_token =  'https://image-stage.adobe.io/utils/aperitif/token'
const url_aperitif_storage = 'https://image-stage.adobe.io/utils/aperitif/storage'
const url_aperitif_cutout = 'https://image.adobe.io/utils/aperitif/operation/sensei/cutout'

const url_cutout = 'https://image-stage.adobe.io/sensei/cutout'

const src_image_path = '/Users/nbelofastow/Downloads/HawksFan1280.png'
const temp_output_image_path = '/Users/nbelofastow/Desktop/cut_out.png'

const sky_city_api_key = 'cis_skycity'
const recaptcha = ''
const regular_token = 'eyJhbGciOiJSUzI1NiIsIng1dSI6Imltc19uYTEtc3RnMS1rZXktYXQtMS5jZXIiLCJraWQiOiJpbXNfbmExLXN0ZzEta2V5LWF0LTEiLCJpdHQiOiJhdCJ9.eyJpZCI6IjE2ODAzNzc1MDkxMjNfZDlmNTg5NTQtMjdkOS00NWE0LWEwODEtYjRiYzc3ODY3NTNlX3V3MiIsInR5cGUiOiJhY2Nlc3NfdG9rZW4iLCJjbGllbnRfaWQiOiJjaXNfc2t5Y2l0eSIsInVzZXJfaWQiOiJFREI3NzczMjYxRTcxQ0M1MEE0OTQwMUZAZWRiNjc3MzI2MWU3MWNjNDQ5NDAxZi5lIiwiYXMiOiJpbXMtbmExLXN0ZzEiLCJhYV9pZCI6IkVGREM2QjVCNjFFNzFCRDUwQTQ5NDIxMEBBZG9iZUlEIiwiY3RwIjowLCJmZyI6IlhLTEhHWDRFNlI3WEM2REo3R1pNQzJZQVlVPT09PT09Iiwic2lkIjoiMTY4MDIxNDk5NjI0NF84YzQ4YzNhZC0xZjE0LTRhNDUtYWJiMy03ZDkzYzU5NTY4ZDdfdXcyIiwibW9pIjoiMzY5Mjk3YzQiLCJwYmEiOiJNZWRTZWNOb0VWLExvd1NlYyIsImV4cGlyZXNfaW4iOiI4NjQwMDAwMCIsImNyZWF0ZWRfYXQiOiIxNjgwMzc3NTA5MTIzIiwic2NvcGUiOiJvcGVuaWQsY3JlYXRpdmVfc2RrLEFkb2JlSUQifQ.RSOThY4qF229W7refwfrbuUCk3CQtqc6Lvqow94zCEoMflM2pDR10EtH3TU25xowBptMbFyBgFSfpyCdkhzunL2Ihneh4hqHgGaVrKBkaXfnoYc0bR6q9WmOVkCKGeaPhDZlkSrvFWrbeiScGEtZstqhvA-rTvaqCN2WOimOUJ_6LraSNu5TlkNEkjKV9sXAy_eFagwwl87rAyWH6oq9UTEILrQ-OPi8IreiYBB7913GzCfmWRlJGvMKJ_QTOOJvq18BjcdAQts5ZaAoADup5wq7DJ6b4UD1FMLqtQRgWfIy727NX0eBynN7FXiXiuMg0t0kZtSAeSGYy6YZFWmGZw'

const use_aperitif = true

async function main() {
  try {
      const anonymous_token = await get_anonymous_token(sky_city_api_key, recaptcha)
      console.log('Anonymouse token created')

      const urls = await get_presigned_urls(sky_city_api_key, anonymous_token, 2)
      console.log('Presigned URLs created')

      const upload_status = await upload_file_to_presigned_url(src_image_path, urls[0].put)
      console.log('Upload successful:', upload_status)

      const status_url = await image_cut_out(
          use_aperitif ? url_aperitif_cutout : url_cutout,
          urls,
          sky_city_api_key, 
          use_aperitif ? anonymous_token : regular_token
      )

      console.log('Image cutout:', status_url)

      await poll_job_completion(
        sky_city_api_key,
        use_aperitif ? anonymous_token: regular_token, 
        status_url, 
        10
      )

      console.log('Job completed')

      await download_file_from_presigned_url(urls[1].get, temp_output_image_path)

  } catch (e) {
    console.log(e)
  }
}

async function poll_job_completion(api_key, token, status_url, max_retries = 10) {
  const options_status = {
    headers: {
      'x-api-key': api_key,
      'Authorization': 'Bearer ' + token,
    },
    timeout: {
      send: 3500
    },
  }

  let retry_cnt = 1
  let status_response = await got(status_url, options_status).json()
  let stat = status_response.status
  while (stat === 'running' && max_retries < 100) {
    await setTimeout(100 * retry_cnt, 'result')
    status_response = await got(status_url, options_status).json()
    stat = status_response.status
    ++retry_cnt
  }

  if (stat !== 'succeeded') {
    throw new Error('Job status timeout')
  }
}


async function image_cut_out(service_url, urls, api_key, token) {
  const image_cut_out_body = {
    input: {
      storage: 'external',
      href: urls[0].get,
    },
    output: {
      storage: 'external',
      href: urls[1].put,
      mask: {
        format: 'soft',
      },
    }
  }

  const options_operation = {
    headers: {
      'x-api-key': api_key,
      'Authorization': `Bearer ${token}`,
    },
    json: image_cut_out_body,
    timeout: {
      send: 3500
    },
  }

  const cutout_data = await got.post(service_url, options_operation).json()
  return cutout_data._links.self.href
}

async function upload_file_to_presigned_url(src_image_path, upload_url) {
  const src_image_data = await fs.readFile(src_image_path)

  const upload_response = await got.put(upload_url, {
    body: src_image_data,
    headers: {
      'Content-Type': 'image/png',
      'Content-Length': src_image_data.length,
    },
    encoding: 'binary',
  })

  return upload_response.ok
}

async function get_presigned_urls(api_key, token, num) {
  const options_storage = {
    headers: {
      'x-api-key': api_key,
      'Authorization': `Bearer ${token}`,
    },
    timeout: {
      send: 3500
    },
  }

  const urls = await got(`${url_aperitif_storage}?num=${num}`, options_storage).json()
  return urls.outputs.urls
}

async function get_anonymous_token(api_key, recaptcha) {
  const options_token = {
    headers: {
      'x-api-key': api_key,
      'x-recaptcha-token': recaptcha,
    },
    timeout: {
      send: 3500
    },
  }

  const data1 = await got(url_aperitif_token, options_token).json()
  return data1.outputs.userToken
}

async function download_file_from_presigned_url(src_url, dst_local_path) {
  const download_response = await got.get(src_url, { responseType: 'buffer' })
  await fs.writeFile(dst_local_path, download_response.body)
  console.log('Download completed')
}

main()
