const denoDate = 1000*60*60*24;

const getDays = (val) => {
    const newDate = new Date();
    const date = parseInt(val);
    const diff = newDate.getTime() - date;
    return Math.floor(diff/denoDate);
}

const getHours = (val) => {
    const newDate = new Date();
    const date = parseInt(val);
    const diff = newDate.getTime() - date;
    let dd = Math.floor(diff/denoDate);
    let hh = diff - dd*denoDate;
    return Math.floor(hh/denoDate*24);
}

export {getDays,getHours};