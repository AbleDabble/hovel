
export const convertBytes = (bytes) => {
    const names = ["B", "KB", "MB", "GB", "TB"];
    let ind = Math.floor(Math.log10(bytes) / 3);
    if(ind < 0) ind = 0;
    console.log(`bytes ${bytes} with names ${ind}`);
    console.log(ind)
    let name = names[ind];
    let size = bytes / Math.pow(10, ind * 3);
    size = size.toFixed(2);
    return  `${size} ${name}`;
  }