import React from 'react';
import styled from 'styled-components';
import { GithubContext } from '../context/context';
import { ExampleChart, Pie3D, Column3D, Bar3D, Doughnut2D } from './Charts';
const Repos = () => {
  const { repos } = React.useContext(GithubContext)

  //remember to add the {} at the end for the initial value of total
  const languages = repos.reduce((total, item) => {
    const { language, stargazers_count } = item
    if (!language) {
      total.other ?
        total.other = { ...total.other, value: total.other.value + 1, stars: total.other.stars + stargazers_count } :
        total.other = { label: 'Other', value: 1, stars : stargazers_count }
      return total;
    }
    total[language] ?
      total[language] = { ...total[language], value: total[language].value + 1, stars: total[language].stars + stargazers_count } :
      total[language] = { label: language, value: 1, stars : stargazers_count }
    return total
  }, {})

  
  //turns the object into an array
  //most used languages, fusion chart ignores everything but label and value so the stars don't effect this
  const mostUsed = Object.values(languages).sort((a,b)=>{
    return b.value - a.value
  }).slice(0,5)

  //most stars, we need to sort by stars and then replace then the values with the stars
  const mostStars = Object.values(languages).map((item)=>{
    return {...item, value:item.stars}
  }).sort((a,b)=>{
    return b.value - a.value
  }).slice(0,5)

  //most starred repo
  const mostStarred = repos.sort((a,b) => {
    return b.stargazers_count - a.stargazers_count
  }).slice(0, 5).map((item)=>{
    return {label: item.name.split('-').join(" "), value: item.stargazers_count}
  })

  //most Forked
  const mostForks = repos.sort((a,b) => {
    return b.forks - a.forks
  }).slice(0, 5).map((item)=>{
    return {label: item.name.split('-').join(" "), value: item.forks}
  })

  // console.log(mostStarred);

  return <section className="section">
    <Wrapper className='section-center'>
      <Pie3D data={mostUsed} />
      <Column3D data={mostStarred} />
      <Doughnut2D data={mostStars} />
      <Bar3D data={mostForks}/>
    </Wrapper>
  </section>
};

const Wrapper = styled.div`
  display: grid;
  justify-items: center;
  gap: 2rem;
  @media (min-width: 800px) {
    grid-template-columns: 1fr 1fr;
  }

  @media (min-width: 1200px) {
    grid-template-columns: 2fr 3fr;
  }

  div {
    width: 100% !important;
  }
  .fusioncharts-container {
    width: 100% !important;
  }
  svg {
    width: 100% !important;
    border-radius: var(--radius) !important;
  }
`;

export default Repos;
