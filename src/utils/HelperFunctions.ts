const denoDate = 1000*60*60*24;

const getDays = (val:number) => {
    const newDate = new Date();
    const date = val;
    const diff = newDate.getTime() - date;
    return Math.floor(diff/denoDate);
}

const getHours = (val:number) => {
    const newDate = new Date();
    const date = val;
    const diff = newDate.getTime() - date;
    let dd = Math.floor(diff/denoDate);
    let hh = diff - dd*denoDate;
    return Math.floor(hh/denoDate*24);
}

export {getDays,getHours};