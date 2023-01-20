import Navigation from '../Navigation/Navigation'

interface MainContainerPops {
  children: JSX.Element,
}


const MainContainer = ({
  children,
}: MainContainerPops): JSX.Element => (
  <>
    <Navigation />

    { children }
  </>
)


export default MainContainer
