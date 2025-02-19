import { useState, useEffect } from "react";

const useForm = (callback, validate, redirect) => {
  const [values, setValues] = useState({
    username: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setErrors(validate(values));
    if (errors.username === undefined && errors.password === undefined) {
      console.log("calling");
      setIsSubmitting(true);
      callback(values)
        .then((res) => {
          redirect.push("/")
          console.log(redirect)
          console.log(res);
          setIsSubmitting(false);
        })
        .catch((err) => {
          let error = { username: "", password: "" };
          if (err.status === 401) {
            error.password = "password salah";
          } else if (err.status === 404) {
            error.username = "invalid username";
            
          }
          setErrors(error);
        });
    }
  };

  useEffect(() => {
    if (Object.keys(errors).length === 0 && isSubmitting) {
      console.log("call");
    }
  }, [errors]);

  return { handleChange, handleSubmit, values, errors };
};

export default useForm;
