const Button = ({ children, type, className, onClick = () => {} }) => (
  <button type={type} className={`ui button ${className}`} onClick={onClick}>
    {children}
  </button>
)
export default Button
