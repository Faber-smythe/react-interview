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

      <div style={{display:"flex"}}>
        {categories.map((elem, index) => (
          <p key={index}  style={{display:"flex", alignItems:"center", width:"auto", margin: "15px 15px 15px 0px"}} onClick={(e) => props.addFilter(elem, (`checkbox-${index}`))}>
            <label>{elem}</label>
            <input id={`checkbox-${index}`} type="checkbox" value={elem} />
          </p>
        ))}
      </div>
      <hr style={{border: "none", borderBottom:"1px solid white", margin: "5px", width:"35%"}}/>
      <div>
        How many cards per page would you like ?
        <select style={{margin: "10px", cursor:"pointer"}} onChange={(e) => props.chosePaging(e)}>
          <option value="4">4</option>
          <option value="8">8</option>
          <option value="12">12</option>
        </select>
      </div>
    </form>
  )
}
