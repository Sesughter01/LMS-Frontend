export const errorPropsGetter = (errors) => {
  let get = (name) => {
    let value = errors;

    for (let key of name.split(".")) {
      if (!value) break;
      value = value[key];
    }
    return {
      isInvalid: !!value,
      feedback: value?.message,
    };
  };

  return get;
};
