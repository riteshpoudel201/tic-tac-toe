/* eslint-disable react/prop-types */

const Layout = ({children}) => {
  return (
    <div className="min-w-screen min-h-screen w-full h-full flex flex-col items-center justify-center bg-black text-gray-300">
      {children}
    </div>
  )
}

export default Layout
