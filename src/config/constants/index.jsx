const data = {
    API_URL : "https://api.am-arya.com",
    RESPONSIVE_CONFIG: {
        superLargeDesktop: {
          // the naming can be any, depends on you.
          breakpoint: { max: 4000, min: 3000 },
          items: 6,
        },
        desktop: {
          breakpoint: { max: 3000, min: 1024 },
          items: 4,
        },
        tablet: {
          breakpoint: { max: 1024, min: 464 },
          items: 1,
        },
        mobile: {
          breakpoint: { max: 464, min: 0 },
          items: 1,
        },
      },
    };

export const GetConstant = (name, defaultvalue = null) => {
  if (data[name] === undefined) {
    if (defaultvalue === null) {
      return null;
    }
    return defaultvalue;
  }
  return data[name];

};