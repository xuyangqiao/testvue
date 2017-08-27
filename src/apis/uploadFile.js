import {getOSSConfig} from '@/apis/files'

// const client = new OSS.Wrapper({
//     region: "oss-cn-shanghai",
//     accessKeyId: "LTAIvIXv3DY45hNk",
//     accessKeySecret: "4SXh3kfC8vFIWR8CqnxISWgqE7x91V",
//     // stsToken: creds.SecurityToken,
//     bucket: "vswork"
// });

const client = getOSSConfig().then(data => {
    // return new OSS.Wrapper({
    //     region: "oss-cn-shanghai",
    //     accessKeyId: "LTAI6leHXQrWHqIK",
    //     accessKeySecret: "y9lMfdK78KEpAWBTClyBSHFPFf8Z4I",
    //     // stsToken: creds.SecurityToken,
    //     bucket: "limei"
    // })
    return new OSS.Wrapper({
        region: data.data.region,
        accessKeyId: data.data.accessKeyId,
        accessKeySecret: data.data.accessKeySecret,
        // stsToken: creds.SecurityToken,
        bucket: data.data.bucket
    })

    // return new OSS.Wrapper({
    //     region: "oss-cn-shanghai",
    //     accessKeyId: "LTAIvIXv3DY45hNk",
    //     accessKeySecret: "4SXh3kfC8vFIWR8CqnxISWgqE7x91V",
    //     // stsToken: creds.SecurityToken,
    //     bucket: "vswork"
    // })
});

function progress(p, barId) {
    return function (done) {
        if (barId) {
            const bar = document.getElementById(barId);
            bar.childNodes[0].style.width = Math.floor(p * 100) + '%';
            bar.childNodes[1].innerHTML = Math.floor(p * 100) + '%';
        }
        done();
    }
}

function uploadFile(file, path, barId) {
    const type = file.name.slice(file.name.lastIndexOf('.'));
    const fileName = newGuid() + type;
    return new Promise(function (resolve, reject) {
        client.then(oss => {
            oss.multipartUpload(`${path && path + '/'}${fileName}`, file, {
                progress: (p) => progress(p, barId)
            }).then(function (res) {
                resolve(res)
            });
        });//
    })
    // const key = document.getElementById('object-key-file').value.trim() || 'object';
    //console.log(file.name + ' => ' + "object");
}

function deleteOssFile(fileNameList) {
    return client.then(oss => {
        oss.deleteMulti(fileNameList).then(function (res) {
            // debugger
            return res
        })
    })
}

function newGuid() {
    var guid = "";
    for (var i = 1; i <= 32; i++) {
        var n = Math.floor(Math.random() * 16.0).toString(16);
        guid += n;
        if ((i == 8) || (i == 12) || (i == 16) || (i == 20))
            guid += "-";
    }
    return guid;
}

// async aaaa(){
//     var a= uploadFile();
//     var b=uploadFile();
//     Promise.all([a,b]).then(data=>{})
// }
export {uploadFile, deleteOssFile, client, newGuid, progress};
