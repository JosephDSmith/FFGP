const Button = ({ onClick, children }) => {
  return (
    <button
      onClick={onClick}
      className="bg-blue-600 text-white py-2 px-4 rounded-lg inline-block hover:bg-blue-800"
    >
      {children}
    </button>
  )
}

export default Button;