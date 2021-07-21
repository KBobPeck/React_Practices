import React from 'react'
import Cocktail from './Cocktail'
import Loading from './Loading'
import { useGlobalContext } from '../context'

const CocktailList = () => {
  const { cocktails, loading } = useGlobalContext()
  console.log(loading);
  if (loading) {
    return <Loading />
  }

  if (cocktails.length < 1) {
    return <h2 className="section-title">
      no cocktails matched your search Criteria
    </h2>
  }

  return (<section className='section'>
    <h2 className="section-title">Cocktails</h2>
    <div className="cocktails-center">
      {cocktails.map((drink)=>{
        const {id} = drink
        return <Cocktail key={id} {...drink}/>
      })}
    </div>
  </section>
    
  )
}

export default CocktailList
