import React from 'react';

export default function CategoryFilters(props){

  let categories = [];
  if(props.movies) {
    props.movies.forEach((movie) => {
      if(!categories.includes(movie.category)){
        categories.push(movie.category)
      }
    })
  }

  return(
    <form>
      <p>Pick your favourite categories : </p>

      {categories.map((elem, index) => (
        <p key={index} style={{display:"inline-block", margin: "10px"}} onClick={(e) => props.addFilter(elem, (`checkbox-${index}`))}>
          <label>{elem}</label>
          <input id={`checkbox-${index}`} type="checkbox" value={elem} />
        </p>
      ))}
    </form>
  )
}
