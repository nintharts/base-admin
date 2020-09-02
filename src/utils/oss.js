// OSS 上传组件，使用于开放上传 OSS
import OSS from 'ali-oss';

const client = new OSS({
  // OSS 配置部分
  region: 'oss-cn-beijing',
  secure: true,
  accessKeyId: '',
  accessKeySecret: '',
  bucket: '',
});

function fileTransform(file) {
  const reader = new FileReader();
  reader.readAsDataURL(file.originFileObj);
  reader.onload = function (e) {
    console.log(this.result);
    return this.result;
  };
}

export function upload(file, dir) {
  // const binary = fileTransform(file);
  file = file.originFileObj;
  console.log(file);
  return new Promise((resolve, reject) => {
    let point = file.name.lastIndexOf('.'),
      suffix = file.name.substr(point),
      fileName = file.name.substr(0, point),
      date = Date.parse(new Date()),
      fileNames = `${dir}/${fileName}_$$_${date}${suffix}`;
    client
      .put(fileNames, file)
      .then(result => {
        resolve(result);
      })
      .catch(err => {
        reject(err);
      });
  });
}
