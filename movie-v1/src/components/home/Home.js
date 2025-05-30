import Hero from '../hero/Hero'

const Home = ({movies}) => {
  console.log("in home")
  return (
    <Hero movies={movies} />
  )
}

export default Home