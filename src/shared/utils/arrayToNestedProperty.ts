const arrayToNestedProperty = (obj:Record<string,any>, path:string[], value:string) => {
  path.reduce((acc, key, i) => {
    if (acc[key] === undefined) acc[key] = {};
    if (i === path.length - 1) acc[key] = value;
    return acc[key];
  }, obj);
};
export default arrayToNestedProperty;