import { useState } from "react";
import "./formInput.css"

export const FormInput = ({ template, toggleVisibility, Icon, onSubmit, error, loading }) => {

  const initialUserInfo = template.fields.reduce((acc, field) => {
    acc[field.name] = "";
    return acc;
  }, {});
  const [userInfo, setUserInfo] = useState({initialUserInfo});

  const { title, fields } = template;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserInfo((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const renderFields = (fields) => {
    return fields.map((field) => {
      let { type, name, placeholder } = field;

      return (
        <div key={name}>
            <div>
                <input
                    type={type}
                    name={name}
                    placeholder={placeholder}
                    value={userInfo[name] || ""}
                    onChange={handleInputChange}
                />
               {(name === 'password' || name === 'confirmPassword') && (
                <span className="eye" onClick={toggleVisibility}><Icon /></span>
               )}
            </div>
        </div>
      );
    });
  };

  //handle submit
  const hanldeSumbit = async (e) => {
    e.preventDefault();
    await onSubmit(userInfo);
    // resetForm();
  };

  //reset form
  // const resetForm = () => {
  //   setUserInfo({initialUserInfo});
  // }

  return (
    <form onSubmit={hanldeSumbit}>
      <h1>{title}</h1>

      <div className="fields">{renderFields(fields)}</div>

      {error && <p className="error">{error}</p>}

        <button type="submit" className="btn" disabled={loading}>
            {loading ? "Proceeding..." : "Submit"}      
        </button>
    </form>
  );
};
