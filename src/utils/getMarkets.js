import axios from 'axios';
import qs from 'qs';

const getMarkets = () => {
  axios({
    method: 'post',
    url:
      'https://services.arcgis.com/fLeGjb7u4uXqeF9q/ArcGIS/rest/services/Farmers_Markets/FeatureServer/0/query',
    data: qs.stringify({
      f: 'json',
      where: '1=1',
      outSr: '4326',
      outFields: '*'
    }),
    headers: {
      'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
    }
  })
    .then(res => {
      console.log('res', res.data.features);
      cb1(res.data.features);
      cb2(res.data.features);
    })
    .catch(err => {
      console.log(err);
    });
};

export default getMarkets;
