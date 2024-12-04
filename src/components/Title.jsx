/* eslint-disable react/prop-types */

const Title = ({value}) => {
  return <h1 className="text-6xl">{ value? value : "Tic-Tac-Toe"}</h1>
}

export default Title
