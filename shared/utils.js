import filter from 'lodash/filter';

let testDonut = (donut, search) => {
  let ret = false;
  Object.values(donut).map(d => {
    if (typeof d === "string") {
      if (d.toLowerCase().indexOf(search) > -1) {
        ret = true;
      }
    } else if (typeof d === "object") {
      if (Array.isArray(d)) {
        d.map(dd => {
          if (typeof dd === "string") {
            if (dd.toLowerCase().indexOf(search) > -1) {
              ret = true;
            }
          } else if (!Array.isArray(dd)) {
            Object.values(dd).map(dv => {
              if (testDonut(dv, search)) {
                ret = true;
              }
            });
          }
        });
      } else {
        Object.values(d).map(dv => {
          if (testDonut(dv, search)) {
            ret = true;
          }
        });
      }
    }
  });
  return ret;
};

let filterDonuts = (donuts, search, custom) => {
  return filter(donuts || [], donut => {
    if (custom && custom(donut)) {
      return true;
    } else {
      return testDonut(donut, search);
    }
  });
};

export {
  filterDonuts
};
