import { Oval } from 'react-loader-spinner';


import React from 'react'

export const Loader = () => {
    return (
        <div style={{display: "flex", justifyContent: "center", alignItems: "center", height: "100vh"}}>
          <Oval 
          width={100}
          height={100}
          color="black"
          ariaLabel="Loading"
          />
      </div>
    )
};
